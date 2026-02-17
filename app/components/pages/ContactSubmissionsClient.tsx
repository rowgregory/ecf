'use client'

import { IContactSubmission } from '@/types/entities/contact-submission'

const ContactSubmissionsClient = ({ data }: { data: IContactSubmission[] }) => {
  console.log('ContactSubmissionsClient: ', data)
  return <>ContactSubmissionsClient</>
}

export default ContactSubmissionsClient
