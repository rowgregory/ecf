'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, AlertCircle } from 'lucide-react'
import Image from 'next/image'
import RightArrow from '@/public/svg/RightArrow'
import { store, useFormSelector } from '@/app/lib/store/store'
import { createFormActions, Errors, Inputs, resetForm } from '@/app/lib/store/slices/formSlice'
import { createContactSubmission } from '@/app/lib/actions/createContactSubmission'
import { useRouter } from 'next/navigation'
import { showToast } from '@/app/lib/store/slices/toastSlice'

const subjects = ['Support', 'Partner', 'Sponsor', 'Other']

const contactInfo = [
  {
    title: 'Address',
    details: '25 Henry Avenue\nLynn, MA 01902'
  },
  {
    title: 'Phone',
    details: '(781) 593-1772'
  },
  {
    title: 'Email',
    details: 'info@bgcl.org'
  },
  {
    title: 'Hours',
    details: 'Mon-Fri: 9:00 AM - 5:00 PM\nSat: 10:00 AM - 2:00 PM'
  }
]

const validateContactSubmissionForm = (inputs: Inputs, setErrors: (errors: Errors) => void) => {
  const newErrors: Record<string, string> = {}

  if (!inputs.firstName.trim()) newErrors.firstName = 'First name is required'
  if (!inputs.lastName.trim()) newErrors.lastName = 'Last name is required'
  if (!inputs.email.trim()) {
    newErrors.email = 'Email is required'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputs.email)) {
    newErrors.email = 'Invalid email address'
  }
  if (!inputs.message.trim()) newErrors.message = 'Message is required'

  setErrors(newErrors)
  return Object.keys(newErrors).length === 0
}

export default function ContactForm() {
  const router = useRouter()
  const { handleInput, setErrors } = createFormActions('contactSubmissionForm', store.dispatch)
  const { forms } = useFormSelector()
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const inputs = forms.contactSubmissionForm.inputs
  const errors = forms.contactSubmissionForm.errors

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateContactSubmissionForm(inputs, setErrors)) return

    try {
      setStatus('loading')

      await createContactSubmission({
        firstName: inputs.firstName,
        lastName: inputs.lastName,
        email: inputs.email,
        message: inputs.message,
        type: inputs.type,
        status: 'NEW'
      })

      router.refresh()
      store.dispatch(showToast({ message: 'Successfully sent message' }))
      setStatus('success')
      setTimeout(() => setStatus('idle'), 3000)
      resetForm('contactSubmissionForm')
    } catch (error: unknown) {
      store.dispatch(
        showToast({
          message: 'Failed message.',
          description: error instanceof Error ? error.message : 'An error occurred',
          type: 'error'
        })
      )
      setStatus('error')
    }
  }

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 pb-40">
      <div className="max-w-container mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-30">
          <h1 className="text-5xl sm:text-6xl font-semibold font-kanit text-neutral-900 dark:text-white mb-10">
            Contact Us
          </h1>
          <p className="text-2xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto font-caveat font-medium">
            We&apos;d love to hear from you.{' '}
            <span className="text-sky-600 dark:text-primary-dark">Get in touch with us today.</span>
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6 items-start">
          {/* Left Side - Image & Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2 relative"
          >
            <form
              onSubmit={handleSubmit}
              className="bg-white dark:bg-[#161616] rounded-lg p-15 relative overflow-hidden"
            >
              <h3 className="font-kanit text-[32px] dark:text-white font-semibold mb-7.5">Leave a Message</h3>
              <div className="relative space-y-6">
                {/* First Name Field */}
                <div className="flex flex-col lg:flex-row gap-y-6 lg:gap-x-6 items-center">
                  <div className="flex flex-col w-full">
                    <input
                      type="text"
                      name="firstName"
                      value={inputs.firstName || ''}
                      onChange={handleInput}
                      className={`w-full px-5 py-4.5 bg-neutral-50 dark:bg-[#1d1d1d] border ${
                        errors.firstName ? 'border-red-500' : 'border-transparent'
                      } rounded-lg text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none transition-all duration-200`}
                      placeholder="First name*"
                    />
                    {errors.firstName && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-2 text-sm text-red-500 flex items-center gap-1"
                      >
                        <AlertCircle className="w-4 h-4" />
                        {errors.firstName}
                      </motion.p>
                    )}
                  </div>
                  <div className="flex flex-col w-full">
                    <input
                      type="text"
                      name="lastName"
                      value={inputs.lastName}
                      onChange={handleInput}
                      className={`w-full px-5 py-4.5 bg-neutral-50 dark:bg-[#1d1d1d] border ${
                        errors.lastName ? 'border-red-500' : 'border-transparent'
                      } rounded-lg text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none transition-all duration-200`}
                      placeholder="Last name*"
                    />
                    {errors.lastName && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-2 text-sm text-red-500 flex items-center gap-1"
                      >
                        <AlertCircle className="w-4 h-4" />
                        {errors.lastName}
                      </motion.p>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div>
                  <input
                    type="email"
                    name="email"
                    value={inputs.email}
                    onChange={handleInput}
                    className={`w-full px-5 py-4.5 bg-neutral-50 dark:bg-[#1d1d1d] border ${
                      errors.email ? 'border-red-500' : 'border-transparent'
                    } rounded-lg text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none transition-all duration-200`}
                    placeholder="Email*"
                  />
                  {errors.email && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-2 text-sm text-red-500 flex items-center gap-1"
                    >
                      <AlertCircle className="w-4 h-4" />
                      {errors.email}
                    </motion.p>
                  )}
                </div>

                <div>
                  <div className="space-y-3">
                    {subjects.map((type) => (
                      <label
                        key={type}
                        className="flex items-center gap-3 p-4 bg-neutral-50 dark:bg-[#1d1d1d] border border-transparent hover:border-secondary-light dark:hover:border-secondary-dark rounded-lg cursor-pointer transition-all duration-200 group"
                      >
                        <input
                          type="radio"
                          name="type"
                          value={type}
                          checked={inputs.type === type}
                          onChange={handleInput}
                          className="sr-only"
                        />
                        {/* Custom radio button */}
                        <div className="relative shrink-0">
                          <div className="w-5 h-5 rounded-full border-2 border-neutral-300 dark:border-neutral-600 group-hover:border-secondary-light dark:group-hover:border-secondary-dark transition-colors" />
                          {inputs.type === type && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="absolute inset-0 m-1 rounded-full bg-secondary-light dark:bg-secondary-dark"
                            />
                          )}
                        </div>
                        <span className="text-neutral-900 dark:text-white font-medium">{type}</span>
                      </label>
                    ))}
                  </div>
                  {errors.type && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-2 text-sm text-red-500 flex items-center gap-1"
                    >
                      <AlertCircle className="w-4 h-4" />
                      {errors.type}
                    </motion.p>
                  )}
                </div>

                {/* Message Field */}
                <div>
                  <textarea
                    name="message"
                    value={inputs.message}
                    onChange={handleInput}
                    rows={10}
                    className={`w-full px-5 py-4.5 bg-neutral-50 dark:bg-[#1d1d1d] border ${
                      errors.message ? 'border-red-500' : 'border-transparent'
                    } rounded-lg text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none transition-all duration-200 resize-none`}
                    placeholder="Tell us how we can help..."
                  />
                  {errors.message && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-2 text-sm text-red-500 flex items-center gap-1"
                    >
                      <AlertCircle className="w-4 h-4" />
                      {errors.message}
                    </motion.p>
                  )}
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={status === 'loading' || status === 'success'}
                  className={`w-fit px-8 py-4 rounded-[5px] text-neutral-950 shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-kanit text-lg cursor-pointer ${
                    status === 'success'
                      ? 'bg-linear-to-r from-green-600 to-green-700 text-white'
                      : 'bg-primary-light dark:bg-primary-dark hover:opacity-90'
                  }`}
                >
                  {status === 'loading' && (
                    <>
                      <div className="w-5 h-5 border-2 border-neutral-900 border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </>
                  )}
                  {status === 'success' && (
                    <>
                      <CheckCircle2 className="w-5 h-5" />
                      Message Sent!
                    </>
                  )}
                  {status === 'idle' && (
                    <>
                      Send Message
                      {/* <Send className="w-5 h-5" /> */}
                      <RightArrow />
                    </>
                  )}
                </motion.button>

                {status === 'success' && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center text-sm text-green-600 dark:text-green-400"
                  >
                    Thank you! We&apos;ll get back to you soon.
                  </motion.p>
                )}
              </div>
            </form>
          </motion.div>

          {/* Right Side - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-[#161616] rounded-lg py-15 px-7.5 lg:col-span-1 space-y-8"
          >
            {/* Image */}
            <div className="relative h-100 rounded-lg overflow-hidden">
              <Image
                src="/images/img-16.jpg" // Replace with your image path
                alt="Education Comes First"
                fill
                className="object-cover"
                priority
              />
              {/* linear overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-neutral-900/80 via-neutral-900/40 to-transparent" />

              {/* Text overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <h3 className="text-3xl font-bold mb-2">Visit Our Club</h3>
                <p className="text-white/90">Come see what we&apos;re all about</p>
              </div>
            </div>

            {/* Contact Info Cards */}
            <div className="grid grid-cols-1 gap-4">
              {contactInfo.map((info, index) => {
                return (
                  <motion.div
                    key={info.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="bg-neutral-50 dark:bg-[#1d1d1d] rounded-lg p-6"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-1">
                        <h4 className="text-neutral-900 font-kanit dark:text-neutral-400 mb-3.5">{info.title}</h4>
                        <p className="text-xl text-neutral-600 font-kanit dark:text-white whitespace-pre-line">
                          {info.details}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
