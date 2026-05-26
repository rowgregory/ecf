export type Role = 'ADMIN' | 'SUPERUSER' | 'SUPPORTER'

export interface TUser {
  id: string
  email: string
  role: Role

  // Generic person info
  firstName: string | null
  lastName: string | null
  phone: string | null

  emailVerified: Date | null
  lastLoginAt: Date | null

  stripeCustomerId?: string | null
  accounts?: unknown

  createdAt: Date
  updatedAt: Date
}
