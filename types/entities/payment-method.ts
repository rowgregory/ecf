export interface IPaymentMethod {
  id: string
  stripePaymentId: string
  cardholderName: string | null
  cardBrand: string
  cardLast4: string
  cardExpMonth: number
  cardExpYear: number
  isDefault: boolean
  userId: string
  createdAt: Date
  updatedAt: Date
}
