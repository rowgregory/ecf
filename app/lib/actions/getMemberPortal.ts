import prisma from '@/prisma/client'
import { auth } from '../auth'
import { createLog } from './createLog'

export async function getMemberPortal() {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      throw new Error('Not authenticated')
    }

    const orders = await prisma.order.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: 'desc' }
    })

    const contactSubmissions = await prisma.contactSubmission.findMany({
      where: { email: session.user.email },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        message: true,
        type: true,
        status: true,
        createdAt: true
      }
    })

    const donationOrders = orders.filter(
      (o) =>
        (o.type === 'ONE_TIME_DONATION' || o.type === 'RECURRING_DONATION') &&
        (o.status === 'CONFIRMED' || o.status === 'PROCESSING' || o.status === 'CANCELLED')
    )

    const oneTimeDonations = orders
      .filter((o) => o.type === 'ONE_TIME_DONATION' && o.status === 'CONFIRMED')
      .map((o) => ({
        id: o.id,
        date: o.createdAt.toISOString().split('T')[0],
        amount: o.totalAmount,
        status: o.status.toLowerCase()
      }))

    // One row per payment now — each recurring order is a discrete charge.
    const recurringDonations = orders
      .filter(
        (o) =>
          o.type === 'RECURRING_DONATION' &&
          (o.status === 'CONFIRMED' || o.status === 'PROCESSING' || o.status === 'CANCELLED')
      )
      .map((o) => ({
        id: o.id,
        amount: o.totalAmount,
        frequency: o.recurringFrequency === 'monthly' ? 'Monthly' : 'Yearly',
        startDate: o.createdAt.toISOString().split('T')[0],
        status: o.status === 'CONFIRMED' || o.status === 'PROCESSING' ? 'active' : 'cancelled',
        paidAt: o.paidAt,
        nextDate: o.nextBillingDate,
        stripeSubscriptionId: o.stripeSubscriptionId
      }))

    const totalDonated = donationOrders.reduce((sum, o) => sum + o.totalAmount, 0)

    // Subscription-level stats: dedupe by stripeSubscriptionId so we count
    // active SUBSCRIPTIONS, not individual payments. One $5/mo plan = 1 active
    // monthly, $5 — not N payments × $5.
    const activeRecurring = orders.filter(
      (o) =>
        o.type === 'RECURRING_DONATION' &&
        (o.status === 'CONFIRMED' || o.status === 'PROCESSING') &&
        o.stripeSubscriptionId
    )

    const subById = new Map<string, (typeof activeRecurring)[number]>()
    for (const o of activeRecurring) {
      // Keep the most recent payment per subscription (orders are desc by createdAt)
      if (!subById.has(o.stripeSubscriptionId!)) {
        subById.set(o.stripeSubscriptionId!, o)
      }
    }
    const activeSubs = [...subById.values()]

    const monthlySubs = activeSubs.filter((o) => o.recurringFrequency === 'monthly')
    const yearlySubs = activeSubs.filter((o) => o.recurringFrequency === 'yearly')

    const monthlyCount = monthlySubs.length
    const yearlyCount = yearlySubs.length
    const monthlyAmount = monthlySubs.reduce((sum, o) => sum + o.totalAmount, 0)
    const yearlyAmount = yearlySubs.reduce((sum, o) => sum + o.totalAmount, 0)

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { createdAt: true, firstName: true, lastName: true }
    })

    const joinYear = user?.createdAt ? new Date(user.createdAt).getFullYear().toString() : '2026'

    // Next charge across active subscriptions — soonest upcoming date.
    const nextRecurringDate =
      activeSubs
        .filter((o) => o.nextBillingDate !== null)
        .sort((a, b) => new Date(a.nextBillingDate!).getTime() - new Date(b.nextBillingDate!).getTime())[0]
        ?.nextBillingDate ?? null

    return JSON.parse(
      JSON.stringify({
        supporter: {
          name: `${user?.firstName} ${user?.lastName}` || session.user.name || 'Supporter',
          memberSince: joinYear,
          totalGiven: totalDonated,
          nextRecurring: nextRecurringDate
            ? new Date(nextRecurringDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })
            : null
        },
        oneTimeDonations,
        recurringDonations,
        // Raw next-charge date for the recurring section header (component formats it)
        nextRecurringDate,
        contactSubmissions: contactSubmissions.map((c) => ({
          id: c.id,
          date: c.createdAt.toISOString().split('T')[0],
          subject: c.type,
          status: c.status.toLowerCase(),
          message: c.message
        })),
        stats: [
          {
            label: 'Total Donated',
            value: `$${totalDonated.toFixed(2)}`,
            subtext: `${donationOrders.length} donations`,
            icon: 'Heart',
            color: 'text-red-400',
            bg: 'bg-red-500/10',
            border: 'border-red-500/30'
          },
          {
            label: 'Monthly Support',
            value: `$${monthlyAmount.toFixed(2)}`,
            subtext: `${monthlyCount} active ${monthlyCount === 1 ? 'plan' : 'plans'}`,
            icon: 'Zap',
            color: 'text-blue-400',
            bg: 'bg-blue-500/10',
            border: 'border-blue-500/30'
          },
          {
            label: 'Yearly Support',
            value: yearlyCount > 0 ? `$${yearlyAmount.toFixed(2)}` : '$0',
            subtext: `${yearlyCount} active`,
            icon: 'Zap',
            color: 'text-blue-400',
            bg: 'bg-blue-500/10',
            border: 'border-blue-500/30'
          },
          {
            label: 'Member Since',
            value: joinYear,
            subtext: 'Active supporter',
            icon: 'Calendar',
            color: 'text-green-400',
            bg: 'bg-green-500/10',
            border: 'border-green-500/30'
          }
        ]
      })
    )
  } catch (error) {
    await createLog('error', 'Failed to fetch member portal data', {
      error: error instanceof Error ? error.message : 'Unknown error'
    })

    return {
      success: false,
      error: 'Failed to fetch member portal data. Please try again.'
    }
  }
}
