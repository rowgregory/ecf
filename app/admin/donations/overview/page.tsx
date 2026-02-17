import DonationsOverviewClient from '@/app/components/pages/DonationsOverviewClient'
import { getDonations } from '@/app/lib/actions/getDonations'

export default async function DonationsPage() {
  const data = await getDonations()
  return <DonationsOverviewClient data={data} />
}
