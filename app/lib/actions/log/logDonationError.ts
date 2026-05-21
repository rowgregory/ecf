'use server'

import prisma from '@/prisma/client'

export async function logDonationError(data: {
  error: string
  message: string
  stack?: string
  donationType?: string
  amount?: number
  feesCovered?: number
  usingSavedCard?: boolean
  email?: string
  userAgent?: string
  url?: string
}) {
  try {
    await prisma.log.create({
      data: {
        level: 'error',
        message: `Donation Error: ${data.message}`,
        metadata: {
          error: data.error,
          stack: data.stack,
          donationType: data.donationType,
          amount: data.amount,
          feesCovered: data.feesCovered,
          usingSavedCard: data.usingSavedCard,
          email: data.email,
          userAgent: data.userAgent,
          url: data.url,
          timestamp: new Date().toISOString()
        }
      }
    })

    return { success: true }
  } catch {
    return { success: false }
  }
}
