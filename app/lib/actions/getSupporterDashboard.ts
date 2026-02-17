import prisma from '@/prisma/client'
import { auth } from '../auth'
import { createLog } from './createLog'

export async function getSupporterDashboard() {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      throw new Error('Not authenticated')
    }

    // Get all orders for this user
    const orders = await prisma.order.findMany({
      where: {
        OR: [{ userId: session.user.id }, { customerEmail: session.user.email }]
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    // Get contact submissions for this user
    const contactSubmissions = await prisma.contactSubmission.findMany({
      where: {
        email: session.user.email
      },
      orderBy: {
        createdAt: 'desc'
      },
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

    // Filter by type and status
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

    const recurringDonations = orders
      .filter((o) => o.type === 'RECURRING_DONATION' && (o.status === 'CONFIRMED' || o.status === 'PROCESSING'))
      .map((o) => ({
        id: o.id,
        amount: o.totalAmount,
        frequency: o.recurringFrequency === 'monthly' ? 'Monthly' : 'Yearly',
        startDate: o.createdAt.toISOString().split('T')[0],
        status: o.status === 'CONFIRMED' || o.status === 'PROCESSING' ? 'active' : 'cancelled',
        nextDate: calculateNextRecurringDate(o.createdAt, o.recurringFrequency)
      }))

    // Calculate totals
    const totalDonated = donationOrders.reduce((sum, o) => sum + o.totalAmount, 0)

    const monthlyCount = donationOrders.filter((o) => o.recurringFrequency === 'monthly').length
    const yearlyCount = donationOrders.filter((o) => o.recurringFrequency === 'yearly').length

    const monthlyAmount =
      monthlyCount > 0
        ? donationOrders.filter((o) => o.recurringFrequency === 'monthly').reduce((sum, o) => sum + o.totalAmount, 0)
        : 0

    const yearlyAmount =
      yearlyCount > 0
        ? donationOrders.filter((o) => o.recurringFrequency === 'yearly').reduce((sum, o) => sum + o.totalAmount, 0)
        : 0

    // Get user's join date and name
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { createdAt: true, firstName: true, lastName: true }
    })

    const joinYear = user?.createdAt ? new Date(user.createdAt).getFullYear().toString() : '2026'

    // Calculate next recurring donation date
    const nextRecurringDate =
      recurringDonations.length > 0
        ? recurringDonations.sort((a, b) => new Date(a.nextDate).getTime() - new Date(b.nextDate).getTime())[0].nextDate
        : null

    return {
      supporter: {
        name: `${user?.firstName} ${user?.lastName}` || session.user.name || 'Supporter',
        memberSince: joinYear,
        totalGiven: totalDonated,
        nextRecurring: nextRecurringDate
          ? new Date(nextRecurringDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
          : null
      },
      oneTimeDonations,
      recurringDonations,
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
          subtext: `${monthlyCount} active plans`,
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
    }
  } catch (error) {
    await createLog('error', 'Failed to fetch supporter dashboard data', {
      error: error instanceof Error ? error.message : 'Unknown error'
    })

    return {
      success: false,
      error: 'Failed to fetch supporter dashboard data. Please try again.'
    }
  }
}

// Helper function to calculate next recurring date
function calculateNextRecurringDate(startDate: Date, frequency: string | null): string {
  const now = new Date()
  const start = new Date(startDate)

  if (frequency === 'monthly') {
    const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, start.getDate())
    return nextMonth.toISOString().split('T')[0]
  } else if (frequency === 'yearly') {
    const nextYear = new Date(now.getFullYear() + 1, start.getMonth(), start.getDate())
    return nextYear.toISOString().split('T')[0]
  }

  return now.toISOString().split('T')[0]
}
