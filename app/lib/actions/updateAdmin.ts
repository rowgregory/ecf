'use server'

import prisma from '@/prisma/client'
import { TUser } from '@/types/entities/user'

export interface UpdateAdminInputs {
  id: string
  email?: string
  firstName?: string
  lastName?: string
  role?: 'ADMIN' | 'SUPPORTER'
}

export interface UpdateAdminResult {
  success: boolean
  data: TUser | null
  error: string | null
}

export const updateAdmin = async (input: UpdateAdminInputs): Promise<UpdateAdminResult> => {
  const { id, ...data } = input

  try {
    if (!id) return { success: false, data: null, error: 'User ID is required' }

    if (data.email) {
      const existing = await prisma.user.findFirst({
        where: { email: data.email, NOT: { id } }
      })
      if (existing) return { success: false, data: null, error: 'A user with this email already exists' }
    }

    const user = await prisma.user.update({
      where: { id },
      data
    })

    return { success: true, data: user as TUser, error: null }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return { success: false, data: null, error: `Failed to update admin: ${message}` }
  }
}
