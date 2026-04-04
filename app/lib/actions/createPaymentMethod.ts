'use server'

import { auth } from '../auth'
import { createLog } from './createLog'
import prisma from '@/prisma/client'
import { stripe } from '../stripe'

export async function createPaymentMethod(stripePaymentMethodId: string) {
  const session = await auth()
  if (!session?.user?.id) {
    return { success: false, error: 'Unauthorized' }
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { stripeCustomerId: true }
  })

  if (!user?.stripeCustomerId) {
    return { success: false, error: 'Stripe customer not found' }
  }

  try {
    // Attach to Stripe customer — webhook handles the rest
    await stripe.paymentMethods.attach(stripePaymentMethodId, {
      customer: user.stripeCustomerId
    })

    await stripe.customers.update(user.stripeCustomerId, {
      invoice_settings: {
        default_payment_method: stripePaymentMethodId
      }
    })

    return { success: true }
  } catch (error) {
    await createLog('error', 'Failed to attach payment method', {
      stripePaymentMethodId,
      userId: session.user.id,
      error: error instanceof Error ? error.message : 'Unknown error'
    })

    return { success: false, error: 'Failed to save payment method. Please try again.' }
  }
}
