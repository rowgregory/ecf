'use server'

import prisma from '@/prisma/client'
import { TUser } from '@/types/entities/user'

export interface CreateAdminInputs {
  email: string
  firstName: string
  lastName: string
  role: 'ADMIN' | 'SUPPORTER'
}

export interface CreateAdminResult {
  success: boolean
  data: TUser | null
  error: string | null
}

export const createAdmin = async (input: CreateAdminInputs): Promise<CreateAdminResult> => {
  const { email, firstName, lastName, role } = input

  try {
    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) return { success: false, data: null, error: 'A user with this email already exists' }

    const user = await prisma.user.create({
      data: {
        email,
        firstName,
        lastName,
        role
      }
    })

    return { success: true, data: user as TUser, error: null }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return { success: false, data: null, error: `Failed to create admin: ${message}` }
  }
}
