import UsersClient from '@/app/components/pages/UsersClient'
import { getUsers } from '@/app/lib/actions/getUsers'

export default async function UsersPage() {
  const data = await getUsers()
  return <UsersClient data={data} />
}
