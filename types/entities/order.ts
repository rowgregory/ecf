import { IUser } from './user'

export interface IOrder {
  id: string
  createdAt: Date
  updatedAt: Date

  // Order details
  type: OrderType
  status: OrderStatus

  // Payment
  totalAmount: number
  paymentMethod: string | null
  paymentIntentId: string | null
  paidAt: Date | null

  // Customer info
  customerEmail: string
  customerName: string
  customerPhone: string | null

  // Billing info
  billingAddress: IBillingAddress | null
  coverFees: boolean
  feesCovered: number

  // User info
  userId: string | null
  user?: IUser | null

  // Payment method
  paymentMethodId: string | null

  // Recurring donation fields
  stripeSubscriptionId: string | null
  isRecurring: boolean
  recurringFrequency: RecurringFrequency | null
  nextBillingDate: Date | null
}

// Change from enum to type
export type OrderType = 'ONE_TIME_DONATION' | 'RECURRING_DONATION'

export type OrderStatus = 'PENDING' | 'PROCESSING' | 'CONFIRMED' | 'CANCELLED' | 'REFUNDED' | 'FAILED'

export type RecurringFrequency = 'monthly' | 'yearly'

export interface IBillingAddress {
  line1: string
  line2?: string
  city: string
  state: string
  postalCode: string
  country: string
}

// Optional: For creating orders (without generated fields)
export interface ICreateOrder {
  type: OrderType
  status?: OrderStatus
  totalAmount: number
  paymentMethod?: string | null
  paymentIntentId?: string | null
  paidAt?: Date | null
  customerEmail: string
  customerName: string
  customerPhone?: string | null
  billingAddress?: IBillingAddress | null
  coverFees?: boolean
  feesCovered?: number
  userId?: string | null
  paymentMethodId?: string | null
  stripeSubscriptionId?: string | null
  isRecurring?: boolean
  recurringFrequency?: RecurringFrequency | null
  nextBillingDate?: Date | null
}

// Optional: For updating orders (all fields optional except id)
export interface IUpdateOrder {
  status?: OrderStatus
  paymentMethod?: string | null
  paymentIntentId?: string | null
  paidAt?: Date | null
  billingAddress?: IBillingAddress | null
  coverFees?: boolean
  feesCovered?: number
  paymentMethodId?: string | null
  stripeSubscriptionId?: string | null
  nextBillingDate?: Date | null
}
