'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Shield, User } from 'lucide-react'
import { store, useFormSelector, useUiSelector } from '@/app/lib/store/store'
import { createFormActions, Inputs, resetForm } from '@/app/lib/store/slices/formSlice'
import { EMAIL_REGEX } from '@/app/lib/regex'
import { createAdmin, CreateAdminInputs } from '@/app/lib/actions/createAdmin'
import { showToast } from '@/app/lib/store/slices/toastSlice'
import { setCreateAdminForm as setForm } from '@/app/lib/utils/setCreateAdminForm'
import { setCloseCreateAdminModal } from '@/app/lib/store/slices/uiSlice'
import { useRouter } from 'next/navigation'
import { updateAdmin, UpdateAdminInputs } from '@/app/lib/actions/updateAdmin'

// ─── Types ────────────────────────────────────────────────────────────────────
type Role = 'ADMIN' | 'SUPPORTER'

interface Errors {
  email?: string
  firstName?: string
  lastName?: string
  password?: string
}

const validateCreateAdminForm = (inputs: Inputs, setErrors: any): boolean => {
  const e: Errors = {}
  if (!inputs.firstName.trim()) e.firstName = 'Required'
  if (!inputs.lastName.trim()) e.lastName = 'Required'
  if (!inputs.email.trim()) e.email = 'Required'
  else if (!EMAIL_REGEX.test(inputs.email)) e.email = 'Invalid email'
  setErrors(e)
  return Object.keys(e).length === 0
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function CreateAdminModal() {
  const { forms } = useFormSelector()
  const router = useRouter()
  const { createAdminModal, item } = useUiSelector()
  const { handleInput, setErrors } = createFormActions('createAdminForm', store.dispatch)
  const [loading, setLoading] = useState(false)

  const inputs = forms.createAdminForm?.inputs
  const errors = forms.createAdminForm?.errors

  const onClose = () => store.dispatch(setCloseCreateAdminModal())

  const handleSubmit = async () => {
    if (!validateCreateAdminForm(inputs, setErrors)) return
    setLoading(true)
    try {
      if (item) {
        await updateAdmin(inputs as UpdateAdminInputs)
      } else {
        await createAdmin(inputs as CreateAdminInputs)
      }
      router.refresh()
      store.dispatch(
        showToast({
          type: 'success',
          message: item ? 'Admin updated' : 'Admin created',
          description: item
            ? `${inputs?.firstName} ${inputs?.lastName}'s account has been updated successfully.`
            : `${inputs?.firstName} ${inputs?.lastName} has been added as ${inputs?.role === 'ADMIN' ? 'an Admin' : 'a Supporter'}.`
        })
      )
      onClose()
      store.dispatch(resetForm('createAdminForm'))
    } catch (error) {
      store.dispatch(
        showToast({
          type: 'error',
          message: 'Failed to create admin',
          description: error instanceof Error ? error.message : 'Unknown error'
        })
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (item) {
      setForm(item)
    }
  }, [item])

  const inputClass = (err?: string) =>
    `w-full px-3 py-2.5 bg-accent dark:bg-accent-dark border ${
      err ? 'border-red-500' : 'border-border-subtle dark:border-border-dark'
    } font-mono text-xs text-text-light dark:text-text-dark placeholder-text-light/25 dark:placeholder-text-dark/25 focus:outline-none focus:border-secondary-light dark:focus:border-secondary-dark transition-colors`

  const labelClass =
    'font-mono text-[9px] tracking-[0.2em] uppercase text-text-light/35 dark:text-text-dark/30 mb-1.5 block'

  return (
    <AnimatePresence>
      {createAdminModal && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40 dark:bg-black/60" onClick={onClose} />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-md bg-bg-light dark:bg-bg-dark border border-border-subtle dark:border-border-dark overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-start justify-between px-6 py-5 border-b border-border-subtle dark:border-border-dark">
              <div>
                <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-secondary-light dark:text-secondary-dark mb-1">
                  {`// admin`}
                </p>
                <h2 className="font-mono text-sm font-bold text-text-light dark:text-text-dark">
                  {`${item ? 'Update' : 'Create'}`} Admin
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 bg-accent dark:bg-accent-dark border border-border-subtle dark:border-border-dark hover:border-secondary-light dark:hover:border-secondary-dark transition-colors"
              >
                <X className="w-3.5 h-3.5 text-text-light/50 dark:text-text-dark/40" />
              </button>
            </div>

            {/* Form */}
            <div className="px-6 py-5 space-y-4">
              {/* Role toggle */}
              <div>
                <p className={labelClass}>Role</p>
                <div className="flex border border-border-subtle dark:border-border-dark">
                  {(['ADMIN', 'SUPPORTER'] as Role[]).map((r) => (
                    <button
                      key={r}
                      onClick={() => setForm({ role: r })}
                      className={`flex-1 flex items-center justify-center gap-1.5 py-2 font-mono text-[10px] tracking-widest uppercase transition-colors duration-150 ${
                        inputs?.role === r
                          ? 'bg-primary-light dark:bg-primary-dark text-black'
                          : 'text-text-light/50 dark:text-text-dark/40 hover:text-text-light dark:hover:text-text-dark'
                      }`}
                    >
                      {r === 'ADMIN' ? <Shield className="w-3 h-3" /> : <User className="w-3 h-3" />}
                      {r.toLowerCase()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Name row */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelClass}>First Name</label>
                  <input
                    name="firstName"
                    value={inputs?.firstName}
                    onChange={handleInput}
                    placeholder="Jane"
                    className={inputClass(errors.firstName)}
                  />
                  {errors.firstName && <p className="font-mono text-[10px] text-red-500 mt-1">{errors.firstName}</p>}
                </div>
                <div>
                  <label className={labelClass}>Last Name</label>
                  <input
                    name="lastName"
                    value={inputs?.lastName}
                    onChange={handleInput}
                    placeholder="Doe"
                    className={inputClass(errors.lastName)}
                  />
                  {errors.lastName && <p className="font-mono text-[10px] text-red-500 mt-1">{errors.lastName}</p>}
                </div>
              </div>

              {/* Email */}
              <div>
                <label className={labelClass}>Email</label>
                <input
                  name="email"
                  type="email"
                  value={inputs?.email}
                  onChange={handleInput}
                  placeholder="jane@example.com"
                  className={inputClass(errors.email)}
                />
                {errors.email && <p className="font-mono text-[10px] text-red-500 mt-1">{errors.email}</p>}
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-2 px-6 py-4 border-t border-border-subtle dark:border-border-dark">
              <button
                onClick={onClose}
                className="px-4 py-2 font-mono text-[10px] tracking-widest uppercase text-text-light/50 dark:text-text-dark/40 border border-border-subtle dark:border-border-dark hover:text-text-light dark:hover:text-text-dark hover:border-text-light/30 dark:hover:border-text-dark/30 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="px-4 py-2 font-mono text-[10px] tracking-widest uppercase bg-primary-light dark:bg-primary-dark text-black font-medium hover:opacity-85 transition-opacity disabled:opacity-45 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {loading && (
                  <div className="w-3 h-3 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                )}
                {loading ? (item ? 'Updating...' : 'Creating...') : item ? 'Update Admin' : 'Create Admin'}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
