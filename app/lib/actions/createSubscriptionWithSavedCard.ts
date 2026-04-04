'use server'

import { stripe } from '../stripe'
import { createLog } from './createLog'

interface CreateSubscriptionWithSavedCardParams {
  userId: string
  email: string
  name: string
  amount: number // in cents
  frequency: 'monthly' | 'yearly'
  coverFees?: boolean
  feesCovered?: number
  savedCardId?: string
}

export async function createSubscriptionWithSavedCard({
  userId,
  email,
  name,
  amount,
  frequency,
  coverFees,
  feesCovered,
  savedCardId
}: CreateSubscriptionWithSavedCardParams) {
  try {
    if (amount < 500) throw new Error('Minimum donation is $5')

    const interval = frequency === 'monthly' ? 'month' : 'year'

    const [paymentMethod, product] = await Promise.all([
      stripe.paymentMethods.retrieve(savedCardId!),
      stripe.products.create({
        name: `${interval === 'month' ? 'Monthly' : 'Yearly'} Recurring Donation`,
        metadata: { type: 'recurring_donation' }
      })
    ])

    if (!paymentMethod.customer) {
      throw new Error('Payment method is not attached to a customer')
    }

    const price = await stripe.prices.create({
      product: product.id,
      unit_amount: amount,
      currency: 'usd',
      recurring: { interval, usage_type: 'licensed' },
      metadata: { frequency }
    })

    const subscription = await stripe.subscriptions.create(
      {
        customer: paymentMethod.customer as string,
        items: [{ price: price.id }],
        default_payment_method: savedCardId,
        payment_settings: { save_default_payment_method: 'on_subscription' },
        metadata: {
          userId,
          email: email || '',
          name: name || '',
          frequency,
          orderType: 'RECURRING_DONATION',
          coverFees: coverFees ? 'true' : 'false',
          feesCovered: feesCovered?.toString() || '0'
        }
      },
      {
        idempotencyKey: `sub_${paymentMethod.customer}_${amount}_${frequency}_${Date.now()}`
      }
    )

    return {
      success: true,
      subscriptionId: subscription.id,
      status: subscription.status
    }
  } catch (error) {
    await createLog('error', 'Subscription creation with saved card error', {
      error: error instanceof Error ? error.message : 'Unknown error',
      email
    })

    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create subscription with saved card'
    }
  }
}
