import { EMAIL_REGEX } from '../regex'
import { Errors, Inputs } from '../store/slices/formSlice'

export type TUserName = {
  firstName: string
  lastName: string
}

export function validateNameForm(inputs: TUserName, setErrors: (arg0: Partial<TUserName>) => void): boolean {
  const newErrors: Partial<TUserName> = {}
  if (!inputs?.firstName?.trim()) newErrors.firstName = 'First name is required'
  if (!inputs?.lastName?.trim()) newErrors.lastName = 'Last name is required'
  setErrors(newErrors)
  return Object.keys(newErrors).length === 0
}

export const validateContactSubmissionForm = (inputs: Inputs, setErrors: (errors: Errors) => void) => {
  const newErrors: Record<string, string> = {}

  if (!inputs.firstName.trim()) newErrors.firstName = 'First name is required'
  if (!inputs.lastName.trim()) newErrors.lastName = 'Last name is required'
  if (!inputs.email.trim()) {
    newErrors.email = 'Email is required'
  } else if (!EMAIL_REGEX.test(inputs.email)) {
    newErrors.email = 'Invalid email address'
  }
  if (!inputs.message.trim()) newErrors.message = 'Message is required'

  setErrors(newErrors)
  return Object.keys(newErrors).length === 0
}

export const validatePaymentMethodForm = (inputs: any, setErrors: (newErrors: Record<string, string>) => void) => {
  const newErrors: Record<string, string> = {}

  // Card details (Stripe Element completeness)
  if (!inputs?.cardComplete) {
    newErrors.card = 'Please complete your card details'
  }

  // Cardholder name
  if (!inputs?.cardholderName?.trim()) {
    newErrors.cardholderName = 'Cardholder name is required'
  }

  setErrors(newErrors)

  return Object.keys(newErrors).length === 0
}
