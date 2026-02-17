import ContactSubmissionsClient from '@/app/components/pages/ContactSubmissionsClient'
import { getContactSubmissions } from '@/app/lib/actions/getContactSubmissions'

export default async function ContactSubmissionPage() {
  const data = await getContactSubmissions()
  return <ContactSubmissionsClient data={data} />
}
