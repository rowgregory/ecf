'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, AlertCircle } from 'lucide-react'
import Image from 'next/image'
import RightArrow from '@/public/svg/RightArrow'

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

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Support',
    message: ''
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const validate = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email address'
    }
    if (!formData.subject) newErrors.subject = 'Please select a subject'
    if (!formData.message.trim()) newErrors.message = 'Message is required'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validate()) return

    setStatus('loading')

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setStatus('success')
    setTimeout(() => {
      setStatus('idle')
      setFormData({ name: '', email: '', subject: '', message: '' })
    }, 3000)
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
                {/* Name Field */}
                <div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-5 py-4.5 bg-neutral-50 dark:bg-[#1d1d1d] border ${
                      errors.name ? 'border-red-500' : 'border-transparent'
                    } rounded-lg text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none transition-all duration-200`}
                    placeholder="Name*"
                  />
                  {errors.name && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-2 text-sm text-red-500 flex items-center gap-1"
                    >
                      <AlertCircle className="w-4 h-4" />
                      {errors.name}
                    </motion.p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
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
                    {subjects.map((subject) => (
                      <label
                        key={subject}
                        className="flex items-center gap-3 p-4 bg-neutral-50 dark:bg-[#1d1d1d] border border-transparent hover:border-primary-light dark:hover:border-primary-dark rounded-lg cursor-pointer transition-all duration-200 group"
                      >
                        <input
                          type="radio"
                          name="subject"
                          value={subject}
                          checked={formData.subject === subject}
                          onChange={handleChange}
                          className="sr-only"
                        />
                        {/* Custom radio button */}
                        <div className="relative shrink-0">
                          <div className="w-5 h-5 rounded-full border-2 border-neutral-300 dark:border-neutral-600 group-hover:border-primary-light dark:group-hover:border-primary-dark transition-colors" />
                          {formData.subject === subject && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="absolute inset-0 m-1 rounded-full bg-primary-light dark:bg-primary-dark"
                            />
                          )}
                        </div>
                        <span className="text-neutral-900 dark:text-white font-medium">{subject}</span>
                      </label>
                    ))}
                  </div>
                  {errors.subject && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-2 text-sm text-red-500 flex items-center gap-1"
                    >
                      <AlertCircle className="w-4 h-4" />
                      {errors.subject}
                    </motion.p>
                  )}
                </div>

                {/* Message Field */}
                <div>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
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
                alt="Boys & Girls Club of Lynn"
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
