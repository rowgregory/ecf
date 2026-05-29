import prisma from '@/prisma/client'
import { User as NextAuthUser } from 'next-auth'
import { createLog } from '../actions/createLog'
import { Account } from 'next-auth'
import { User, Account as PrismaAccount } from '@prisma/client'
import { getOrCreateStripeCustomer } from '../actions/stripe/getOrCreateStripeCustomer'

// Google OAuth Profile type — match NextAuth's Profile structure
interface GoogleProfile {
  sub?: string | null
  name?: string | null
  given_name?: string | null
  family_name?: string | null
  email?: string | null
  email_verified?: boolean | null
  picture?: string | null
  locale?: string | null
}

type UserWithAccounts = User & {
  accounts: PrismaAccount[]
}

export async function handleGoogleCallback(
  user: NextAuthUser,
  account: Account,
  profile?: GoogleProfile
): Promise<boolean> {
  const existingUser = await prisma.user.findUnique({
    where: { email: user.email! },
    include: { accounts: true }
  })

  let dbUserId: string
  let dbUserEmail: string
  let dbUserFirstName: string | null
  let dbUserLastName: string | null

  if (existingUser) {
    await linkGoogleAccount(existingUser, account)
    await updateUserFromProfile(existingUser, profile)
    user.id = existingUser.id

    dbUserId = existingUser.id
    dbUserEmail = existingUser.email
    dbUserFirstName = existingUser.firstName
    dbUserLastName = existingUser.lastName
  } else {
    const newUser = await prisma.user.create({
      data: {
        email: user.email!,
        firstName: profile?.given_name || '',
        lastName: profile?.family_name || '',
        role: 'SUPPORTER'
      }
    })

    await linkGoogleAccount(newUser, account)
    user.id = newUser.id

    dbUserId = newUser.id
    dbUserEmail = newUser.email
    dbUserFirstName = newUser.firstName
    dbUserLastName = newUser.lastName

    await logNewGoogleUser(user, account)
  }

  // Ensure Stripe customer linkage for every login — handles three cases:
  //   - User already linked → returns existing ID (no-op)
  //   - Guest customer exists under this email → links it back
  //   - No customer anywhere → creates a fresh one
  try {
    await getOrCreateStripeCustomer({
      userId: dbUserId,
      email: dbUserEmail,
      name: `${dbUserFirstName || ''} ${dbUserLastName || ''}`.trim()
    })
  } catch (error) {
    await createLog('error', 'Stripe customer linkage failed during Google sign-in', {
      userId: dbUserId,
      email: dbUserEmail,
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }

  return true
}

async function linkGoogleAccount(existingUser: User | UserWithAccounts, account: Account): Promise<void> {
  const hasGoogleAccount =
    'accounts' in existingUser
      ? existingUser.accounts?.some(
          (acc) => acc.provider === 'google' && acc.providerAccountId === account.providerAccountId
        ) || false
      : false

  if (!hasGoogleAccount) {
    await prisma.account.create({
      data: {
        userId: existingUser.id,
        type: account.type,
        provider: account.provider,
        providerAccountId: account.providerAccountId,
        access_token: account.access_token,
        expires_at: account.expires_at,
        id_token: account.id_token,
        refresh_token: account.refresh_token,
        scope: account.scope,
        token_type: account.token_type
      }
    })
  }
}

async function updateUserFromProfile(user: User, profile?: GoogleProfile): Promise<void> {
  if (profile?.name && (!user.firstName || !user.lastName)) {
    const [firstName, lastName] = profile.name.split(' ')

    await prisma.user.update({
      where: { id: user.id },
      data: {
        firstName,
        lastName
      }
    })
  }
}

async function logNewGoogleUser(user: NextAuthUser, account: Account): Promise<void> {
  await createLog('info', 'New Google user', {
    location: ['googleProvider.ts'],
    provider: 'google',
    userEmail: user.email,
    accountId: account.providerAccountId
  })
}
