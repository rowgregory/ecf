export interface IContactSubmission {
  id?: string
  firstName: string
  lastName: string
  email: string
  message: string
  type: 'SUPPORT' | 'PARTNER' | 'SPONSOR' | 'OTHER'
  status: 'NEW' | 'READ' | 'ARCHIVED'

  createdAt?: Date
}
