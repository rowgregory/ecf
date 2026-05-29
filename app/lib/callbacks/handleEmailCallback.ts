import prisma from '@/prisma/client'
import type { User } from 'next-auth'
import { getOrCreateStripeCustomer } from '../actions/stripe/getOrCreateStripeCustomer'

export async function handleEmailCallback(user: User) {
  let dbUser = await prisma.user.findUnique({
    where: { email: user.email! },
    include: { accounts: true }
  })

  if (!dbUser) {
    const emailName = user.email!.split('@')[0]

    dbUser = await prisma.user.create({
      data: {
        email: user.email!,
        firstName: emailName.charAt(0).toUpperCase() + emailName.slice(1),
        role: 'SUPPORTER'
      },
      include: { accounts: true }
    })
  }

  const existing = await prisma.account.findFirst({
    where: { userId: dbUser.id, provider: 'email' }
  })

  if (!existing) {
    await prisma.account.create({
      data: {
        userId: dbUser.id,
        type: 'email',
        provider: 'email',
        providerAccountId: user.email!
      }
    })
  }

  // Ensure Stripe customer is linked. Handles three cases internally:
  //   - Already linked → returns existing ID
  //   - Guest customer exists under this email → links it back to the user
  //   - No customer anywhere → creates a fresh one
  // Wrapped in try/catch so a Stripe outage doesn't block sign-in.
  try {
    await getOrCreateStripeCustomer({
      userId: dbUser.id,
      email: dbUser.email,
      name: `${dbUser.firstName || ''} ${dbUser.lastName || ''}`.trim()
    })
  } catch (error) {
    console.error('[handleEmailCallback] Stripe customer linkage failed', error)
  }

  return true
}
