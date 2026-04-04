import AdminUsersClient from '@/app/components/pages/AdminUsersClient'
import { getUsers } from '@/app/lib/actions/getUsers'

export default async function UsersPage() {
  const data = await getUsers()
  return <AdminUsersClient users={data} />
}
