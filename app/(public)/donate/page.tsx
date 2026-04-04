import DonateCheckoutClient from '@/app/components/pages/DonateCheckoutClient'
import { getSavedPaymentMethods } from '@/app/lib/actions/getSavedPaymentMethods'
import { getUserName } from '@/app/lib/actions/getUserName'

export default async function DonateCheckoutPage() {
  const [nameResult, savedPayments] = await Promise.all([getUserName(), getSavedPaymentMethods()])

  return <DonateCheckoutClient name={nameResult?.data} savedCards={savedPayments?.data} />
}
