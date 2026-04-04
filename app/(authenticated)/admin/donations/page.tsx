import AdminDonationsClient from '@/app/components/pages/AdminDonationsClient'
import { getDonations } from '@/app/lib/actions/getDonations'

export default async function AdminDonationsPage() {
  const result = await getDonations()
  return <AdminDonationsClient orders={result} />
}
