'use client'

import { motion } from 'framer-motion'
import Picture from '@/app/components/common/Picture'
import { MotionLink } from '@/app/components/common/MotionLink'
import DonationForm from '@/app/components/forms/DonationForm'
import LogoHorizontalDark from '@/public/svg/LogoHorizontalDark'

export default function DonateClient() {
  return (
    <div className="pb-20 sm:pb-0">
      {/* Header */}
      <div className="px-4 sm:px-6 md:px-12 py-8 sm:py-10 dark:border-border-dark border-b border-border-light">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col space-y-4 sm:space-y-5"
          >
            {/* Logo */}
            <MotionLink href="/" className="flex space-x-3 w-60 h-auto">
              <Picture
                src="/svg/logo-horizontal-light.svg"
                alt="Education Comes First"
                className="dark:hidden block w-full h-full cursor-pointer hover:opacity-80 transition-opacity"
                priority={true}
              />
              <LogoHorizontalDark />
            </MotionLink>

            {/* Heading */}
            <div className="max-w-2xl space-y-2 sm:space-y-3">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black dark:text-text-dark text-text-light leading-tight">
                Empower Students
              </h1>
              <p className="text-base sm:text-lg dark:text-text-dark/70 text-text-light/70 leading-relaxed">
                Support Education Comes First programs that unlock potential and build brighter futures.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="min-h-[calc(100vh-493px)] h-full max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column - Impact Stats */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1 space-y-6"
          >
            <div className="space-y-4">
              <h2 className="text-2xl font-bold dark:text-text-dark text-text-light">Your Impact</h2>
              <div className="space-y-4">
                <div className="dark:bg-bg-dark dark:border-border-dark bg-accent border-border-light rounded-lg border p-4">
                  <p className="text-3xl font-bold dark:text-primary-dark text-primary-light">$25</p>
                  <p className="text-sm dark:text-text-dark/60 text-text-light/60 mt-1">
                    Provides school supplies for a student
                  </p>
                </div>
                <div className="dark:bg-bg-dark dark:border-border-dark bg-accent border-border-light rounded-lg border p-4">
                  <p className="text-3xl font-bold dark:text-primary-dark text-primary-light">$75</p>
                  <p className="text-sm dark:text-text-dark/60 text-text-light/60 mt-1">
                    Funds educational materials for a semester
                  </p>
                </div>
                <div className="dark:bg-bg-dark dark:border-border-dark bg-accent border-border-light rounded-lg border p-4">
                  <p className="text-3xl font-bold dark:text-primary-dark text-primary-light">$150</p>
                  <p className="text-sm dark:text-text-dark/60 text-text-light/60 mt-1">Sponsors a tutoring workshop</p>
                </div>
                <div className="dark:bg-bg-dark dark:border-border-dark bg-accent border-border-light rounded-lg border p-4">
                  <p className="text-3xl font-bold dark:text-primary-dark text-primary-light">$300+</p>
                  <p className="text-sm dark:text-text-dark/60 text-text-light/60 mt-1">
                    Transforms a student&apos;s future
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Donation Form */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-2">
            <div className="dark:bg-bg-dark dark:border-border-dark bg-accent border-border-light rounded-lg border p-4 sm:p-6 md:p-8 shadow-sm">
              <h2 className="text-xl sm:text-2xl font-bold dark:text-text-dark text-text-light mb-4 sm:mb-6">
                Make Your Donation
              </h2>

              <DonationForm />
            </div>

            {/* Trust Badge */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-6 text-center text-sm dark:text-text-dark/60 text-text-light/60"
            >
              <p>501(c)(3) Nonprofit Organization</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
