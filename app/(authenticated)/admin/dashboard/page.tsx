import DashboardClient from '@/app/components/pages/DashboardClient'
import { getContactSubmissions } from '@/app/lib/actions/getContactSubmissions'
import { getDonations } from '@/app/lib/actions/getDonations'
import { getSessionRole } from '@/app/lib/actions/getSessionRole'
import { getUsers } from '@/app/lib/actions/getUsers'

export default async function DashboardPage() {
  const [contactSubmissions, donations, users, role] = await Promise.all([
    getContactSubmissions(),
    getDonations(),
    getUsers(),
    getSessionRole()
  ])
  return <DashboardClient contactSubmissions={contactSubmissions} donations={donations} users={users} role={role} />
}
