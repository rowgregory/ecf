import DonateCheckoutClient from '@/app/(public)/donate/DonateCheckoutClient'
import { getSavedPaymentMethods } from '@/app/lib/actions/getSavedPaymentMethods'
import { getUserName } from '@/app/lib/actions/getUserName'
import { auth } from '@/app/lib/auth'

export default async function DonateCheckoutPage() {
  const [nameResult, savedPayments, session] = await Promise.all([getUserName(), getSavedPaymentMethods(), auth()])

  return <DonateCheckoutClient name={nameResult?.data} savedCards={savedPayments?.data} isAuthed={!!session?.user} />
}
