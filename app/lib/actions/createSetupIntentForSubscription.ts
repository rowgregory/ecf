'use server'

import prisma from '@/prisma/client'
import { stripe } from '../stripe'
import { createLog } from './createLog'

interface SetupIntentParams {
  userId: string
  email: string
  name: string
  amount: number // in cents
  frequency: 'monthly' | 'yearly'
  coverFees?: boolean
  feesCovered?: number
}

export async function createSetupIntentForSubscription({
  userId,
  email,
  name,
  amount,
  frequency,
  coverFees,
  feesCovered
}: SetupIntentParams) {
  try {
    if (amount < 500) {
      throw new Error('Minimum donation is $5')
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { stripeCustomerId: true }
    })

    if (!user?.stripeCustomerId) {
      throw new Error('Account not linked to payments. Please sign out and back in.')
    }

    const setupIntent = await stripe.setupIntents.create({
      customer: user.stripeCustomerId,
      payment_method_types: ['card'],
      usage: 'off_session',
      metadata: {
        userId,
        email,
        name,
        frequency,
        amount: amount.toString(),
        type: 'recurring_donation',
        coverFees: coverFees ? 'true' : 'false',
        feesCovered: feesCovered?.toString() || '0'
      }
    })

    return {
      success: true,
      clientSecret: setupIntent.client_secret,
      setupIntentId: setupIntent.id,
      customerId: user.stripeCustomerId
    }
  } catch (error) {
    await createLog('error', 'SetupIntent creation error', {
      error: error instanceof Error ? error.message : 'Unknown error',
      email,
      name
    })

    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create setup intent'
    }
  }
}
