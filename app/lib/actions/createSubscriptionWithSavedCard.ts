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
    // VALIDATE MINIMUM AMOUNT
    if (amount < 500) {
      // Stripe uses cents, so $5 = 500
      throw new Error('Minimum donation is $5')
    }

    if (!savedCardId || savedCardId.trim() === '') {
      return {
        success: false,
        error: 'No payment method selected. Please select a card or add a new one.'
      }
    }

    // Get the payment method to find the customer
    const paymentMethod = await stripe.paymentMethods.retrieve(savedCardId)

    if (!paymentMethod.customer) {
      throw new Error('Payment method is not attached to a customer')
    }

    const customerId = paymentMethod.customer as string

    // Create product for this recurring donation
    const product = await stripe.products.create({
      name: `${frequency === 'monthly' ? 'Monthly' : 'Yearly'} Donation`,
      description: `Recurring donation of $${(amount / 100).toFixed(2)}/${frequency === 'monthly' ? 'month' : 'year'}`,
      metadata: {
        userId: userId || 'guest',
        donorName: name || ''
      }
    })

    // Create price for the subscription
    const price = await stripe.prices.create({
      product: product.id,
      unit_amount: amount,
      currency: 'usd',
      recurring: {
        interval: frequency === 'monthly' ? 'month' : 'year',
        usage_type: 'licensed'
      },
      metadata: {
        frequency
      }
    })

    // Create subscription with the saved payment method
    const subscription = await stripe.subscriptions.create(
      {
        customer: customerId,
        items: [{ price: price.id }],
        default_payment_method: savedCardId,
        payment_settings: {
          save_default_payment_method: 'on_subscription'
        },
        metadata: {
          userId: userId || 'guest',
          email: email || '',
          name: name || '',
          frequency,
          coverFees: coverFees ? 'true' : 'false',
          feesCovered: feesCovered?.toString() || '0'
        }
      },
      {
        idempotencyKey: `sub_${customerId}_general_${Date.now()}`
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
