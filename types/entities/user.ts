// Enums
export type Role = 'ADMIN' | 'SUPERUSER' | 'SUPPORTER'

export interface IUser {
  accounts: []
  id: string
  email: string
  role: Role
  lastLoginAt: Date | null

  // Generic person info
  firstName: string | null
  lastName: string | null
  phone: string | null

  createdAt: Date
  updatedAt: Date
}
