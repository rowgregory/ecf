'use server'

import prisma from '@/prisma/client'
import { TLog } from '@/types/entities/log'

interface GetLogsOptions {
  level?: string
  userId?: string
  limit?: number
  offset?: number
}

export const getLogs = async (options: GetLogsOptions = {}): Promise<TLog[]> => {
  const { level, userId, limit = 500, offset = 0 } = options

  try {
    const logs = await prisma.log.findMany({
      where: {
        ...(level && { level }),
        ...(userId && { userId })
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
      skip: offset
    })

    return logs as TLog[]
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    throw new Error(`Failed to fetch logs: ${message}`)
  }
}
