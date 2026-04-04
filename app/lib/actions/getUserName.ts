import prisma from '@/prisma/client'
import { auth } from '../auth'
import { createLog } from './createLog'

export const getUserName = async () => {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return { firstName: null, lastName: null }
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { firstName: true, lastName: true }
    })

    return { success: true, data: user ?? { firstName: null, lastName: null }, error: null }
  } catch (error) {
    await createLog('error', 'Failed to get user name', {
      error: error instanceof Error ? error.message : 'Unknown error'
    })

    return { firstName: null, lastName: null }
  }
}
