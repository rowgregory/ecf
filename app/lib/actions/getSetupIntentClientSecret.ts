'use server'

import prisma from '@/prisma/client'
import { stripe } from '@/app/lib/stripe'
import { createLog } from './createLog'
import { auth } from '../auth'

export async function getSetupIntentClientSecret() {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      throw new Error('Unauthorized')
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { stripeCustomerId: true }
    })

    if (!user?.stripeCustomerId) {
      // Linkage was supposed to happen at login. If it didn't, the user record
      // is out of sync — surface to support rather than silently healing here.
      throw new Error('Account not linked to payments. Please sign out and back in.')
    }

    const setupIntent = await stripe.setupIntents.create({
      customer: user.stripeCustomerId,
      payment_method_types: ['card'],
      usage: 'off_session'
    })

    return {
      success: true,
      clientSecret: setupIntent.client_secret
    }
  } catch (error) {
    await createLog('error', 'Failed to create setup intent', {
      error: error instanceof Error ? error.message : 'Unknown error'
    })

    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to get client secret'
    }
  }
}
