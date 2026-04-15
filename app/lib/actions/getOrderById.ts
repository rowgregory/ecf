import prisma from '@/prisma/client'

export async function getOrderById(id: string) {
  return prisma.order.findUnique({
    where: { id }
  })
}
