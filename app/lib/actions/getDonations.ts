'use server'

import prisma from '@/prisma/client'
import { createLog } from './createLog'
import { IBillingAddress, RecurringFrequency } from '@/types/entities/order'

export const getDonations = async () => {
  try {
    const donations = await prisma.order.findMany({
      where: {
        type: {
          in: ['ONE_TIME_DONATION', 'RECURRING_DONATION']
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return donations.map((donation) => ({
      ...donation,
      billingAddress: donation.billingAddress as IBillingAddress | null,
      recurringFrequency: donation.recurringFrequency as RecurringFrequency | null
    }))
  } catch (error) {
    await createLog('error', 'Failed to fetch donations', {
      error: error instanceof Error ? error.message : 'Unknown error'
    })

    throw error
  }
}
