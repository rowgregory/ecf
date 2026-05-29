import prisma from '@/prisma/client'
import { stripe } from '../../stripe'

interface GetOrCreateCustomerParams {
  userId?: string
  email: string
  name: string
}

export async function getOrCreateStripeCustomer({ userId, email, name }: GetOrCreateCustomerParams): Promise<string> {
  // 1. If we have a userId, check if the user already has a stripeCustomerId
  if (userId) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { stripeCustomerId: true }
    })

    if (user?.stripeCustomerId) {
      // User already linked — make sure the customer still exists on Stripe's side.
      // (Edge case: customer was deleted from Stripe dashboard but the DB row remained.)
      try {
        const customer = await stripe.customers.retrieve(user.stripeCustomerId)
        if (!customer.deleted) return user.stripeCustomerId
      } catch {
        // Customer was deleted in Stripe — fall through to email lookup / create.
      }
    }
  }

  // 2. Try to find an existing customer by email
  const existing = await stripe.customers.list({ email, limit: 1 })

  if (existing.data.length > 0) {
    const customerId = existing.data[0].id

    // If we have a userId, link this customer to the user AND update Stripe's
    // metadata so it no longer reads "guest". This is what was missing.
    if (userId) {
      await Promise.all([
        prisma.user.update({
          where: { id: userId },
          data: { stripeCustomerId: customerId }
        }),
        stripe.customers.update(customerId, {
          name,
          description: 'Platform user',
          metadata: {
            userId,
            linkedFromGuestAt: new Date().toISOString()
          }
        })
      ])
    }

    return customerId
  }

  // 3. No existing customer — create a new one
  const customer = await stripe.customers.create({
    email,
    name,
    description: userId ? 'Platform user' : `Guest donor: ${name}`,
    metadata: {
      userId: userId || 'guest',
      createdAt: new Date().toISOString()
    }
  })

  // If authed, link immediately
  if (userId) {
    await prisma.user.update({
      where: { id: userId },
      data: { stripeCustomerId: customer.id }
    })
  }

  return customer.id
}
