import prisma from '@/prisma/client'
import { createLog } from './createLog'
import { IOrder } from '@/types/entities/order'

export const getOrder = async (id: string): Promise<IOrder | null> => {
  if (!id) {
    throw new Error('Order ID is required')
  }

  try {
    const order = await prisma.order.findUnique({
      where: { id }
    })

    return order as IOrder | null
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'

    await createLog('error', 'Failed to fetch order', {
      orderId: id,
      error: message,
      timestamp: new Date().toISOString()
    }).catch((logError) => {
      console.error('Failed to create error log:', logError)
    })

    throw new Error(`Failed to fetch order: ${message}`)
  }
}
