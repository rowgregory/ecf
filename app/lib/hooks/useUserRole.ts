'use client'

import { useSession } from 'next-auth/react'

export function useUserRole() {
  const session = useSession()

  const isAdmin = session.data?.user?.role === 'ADMIN' || session.data?.user?.role === 'SUPERUSER'
  const isSupporter = session.data?.user?.role === 'SUPPORTER'

  return {
    isAdmin,
    isSupporter,
    role: session.data?.user?.role,
    user: session.data?.user,
    status: session.status
  }
}
