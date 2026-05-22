'use client'

import { CardElement } from '@stripe/react-stripe-js'
import { RootState, store, useAppSelector } from '@/app/lib/store/store'
import { FormName, setInputs } from '@/app/lib/store/slices/formSlice'
import { useFormSelector } from '@/app/lib/store/store'

export function CardElementField({ formName }: { formName: FormName }) {
  const isDark = useAppSelector((state: RootState) => state.ui.isDark)
  const { forms } = useFormSelector()
  const stripeError = (forms?.[formName]?.inputs as { error?: string | null })?.error ?? null
  const hasError = !!stripeError

  return (
    <div>
      <label
        id="card-label"
        htmlFor="stripe-card-element"
        className="block font-mono text-[10px] tracking-[0.14em] uppercase font-bold mb-1.5 text-text-light/80 dark:text-text-dark/80"
      >
        Card details
      </label>

      <div
        className={`w-full px-3.5 py-3.5 bg-white dark:bg-accent-dark border transition-all duration-200 focus-within:shadow-[0_0_0_3px_rgba(0,162,209,0.12)] min-h-11 ${
          hasError
            ? 'border-red-600 dark:border-red-400 shadow-[0_0_0_3px_rgba(220,38,38,0.12)]'
            : 'border-neutral-300 dark:border-border-dark focus-within:border-secondary-light dark:focus-within:border-primary-dark'
        }`}
      >
        <CardElement
          id="stripe-card-element"
          onChange={(e) =>
            store.dispatch(
              setInputs({
                formName,
                data: {
                  cardComplete: e.complete,
                  error: e.error?.message ?? null
                }
              })
            )
          }
          options={{
            style: {
              base: {
                color: isDark ? '#ffffff' : '#171717',
                backgroundColor: 'transparent',
                fontSize: '14px',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                '::placeholder': {
                  color: isDark ? '#a3a3a3' : '#737373'
                }
              },
              invalid: {
                color: isDark ? '#f87171' : '#b91c1c'
              }
            }
          }}
        />
      </div>

      {hasError && (
        <p
          id="card-error"
          role="alert"
          className="font-mono text-[11px] mt-1.5 tracking-wide font-bold text-red-700 dark:text-red-400"
        >
          {stripeError}
        </p>
      )}
    </div>
  )
}
