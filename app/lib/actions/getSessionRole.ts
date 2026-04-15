import { Role } from '@prisma/client'
import { auth } from '../auth'

export async function getSessionRole() {
  const session = await auth()
  return (session?.user?.role as Role) ?? null
}
