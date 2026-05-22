'use client'

import { ChangeEvent } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

interface TextAreaProps {
  id: string
  name?: string
  label: string
  /** Hide label visually, keep for AT. */
  hideLabel?: boolean
  value: string
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
  placeholder?: string
  required?: boolean
  disabled?: boolean
  error?: string
  rows?: number
  /** Set to false to allow vertical resize. Default true (no resize). */
  noResize?: boolean
  ariaDescribedBy?: string
}

export function TextArea({
  id,
  name,
  label,
  hideLabel = false,
  value,
  onChange,
  placeholder,
  required = false,
  disabled = false,
  error,
  rows = 5,
  noResize = true,
  ariaDescribedBy
}: TextAreaProps) {
  const reduceMotion = useReducedMotion()
  const errorId = `${id}-error`
  const hasError = !!error

  return (
    <div>
      <label
        htmlFor={id}
        className={
          hideLabel
            ? 'sr-only'
            : 'block font-mono text-[10px] tracking-[0.14em] uppercase font-bold mb-1.5 text-text-light/80 dark:text-text-dark/80'
        }
      >
        {label}
        {required && !hideLabel && (
          <span aria-hidden="true" className="ml-0.5">
            *
          </span>
        )}
      </label>
      <textarea
        id={id}
        name={name ?? id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        aria-required={required}
        aria-invalid={hasError}
        aria-describedby={hasError ? errorId : ariaDescribedBy}
        disabled={disabled}
        className={`w-full px-3.5 py-3 font-mono text-[13px] outline-none transition-all duration-200 bg-white dark:bg-accent-dark text-text-light dark:text-text-dark placeholder:text-text-light/55 dark:placeholder:text-text-dark/55 border disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 ${
          noResize ? 'resize-none' : 'resize-y'
        } ${
          hasError
            ? 'border-red-600 dark:border-red-400 shadow-[0_0_0_3px_rgba(220,38,38,0.12)] focus-visible:outline-red-600 dark:focus-visible:outline-red-400'
            : 'border-neutral-300 dark:border-border-dark focus:border-secondary-light dark:focus:border-primary-dark focus:shadow-[0_0_0_3px_rgba(0,162,209,0.12)] focus-visible:outline-secondary-light dark:focus-visible:outline-primary-dark'
        }`}
      />
      <AnimatePresence>
        {hasError && (
          <motion.p
            id={errorId}
            role="alert"
            className="font-mono text-[11px] tracking-wide font-bold text-red-700 dark:text-red-400 mt-1.5"
            initial={reduceMotion ? false : { opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}
