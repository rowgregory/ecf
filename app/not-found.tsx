'use client'

import { motion } from 'framer-motion'
import { Home, ArrowLeft, Search } from 'lucide-react'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 pb-12 dark:bg-bg-dark bg-bg-light">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl w-full text-center space-y-6 sm:space-y-8"
      >
        {/* 404 Number */}
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="relative"
        >
          <h1 className="text-[100px] xs:text-[120px] sm:text-[150px] md:text-[180px] font-black leading-none">
            <span className="text-secondary-light dark:text-secondary-dark">404</span>
          </h1>
        </motion.div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="space-y-3 sm:space-y-4 px-4"
        >
          <h2 className="text-2xl xs:text-3xl sm:text-4xl font-bold dark:text-text-dark text-text-light">
            Page Not Found
          </h2>
          <p className="text-base sm:text-lg dark:text-text-dark/70 text-text-light/70 max-w-lg mx-auto">
            The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get you back on track.
          </p>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4"
        >
          <Link
            href="/"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 dark:bg-primary-dark bg-primary-light dark:text-bg-dark text-text-light rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            <Home className="w-4 h-4 sm:w-5 sm:h-5" />
            Go Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 dark:bg-border-dark bg-border-light dark:text-text-dark text-text-light rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            Go Back
          </button>
        </motion.div>

        {/* Helpful Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="pt-6 sm:pt-8 border-t dark:border-border-dark border-border-light px-4"
        >
          <p className="text-xs sm:text-sm dark:text-text-dark/60 text-text-light/60 mb-3 sm:mb-4">
            You might be looking for:
          </p>
          <div className="flex flex-wrap gap-2 sm:gap-3 justify-center text-xs sm:text-sm">
            <Link href="/about" className="dark:text-secondary-dark text-secondary-light hover:underline">
              About Us
            </Link>
            <span className="dark:text-text-dark/30 text-text-light/30">•</span>
            <Link href="/programs" className="dark:text-secondary-dark text-secondary-light hover:underline">
              Programs
            </Link>
            <span className="dark:text-text-dark/30 text-text-light/30">•</span>
            <Link href="/donate" className="dark:text-secondary-dark text-secondary-light hover:underline">
              Donate
            </Link>
            <span className="dark:text-text-dark/30 text-text-light/30">•</span>
            <Link href="/contact" className="dark:text-secondary-dark text-secondary-light hover:underline">
              Contact
            </Link>
          </div>
        </motion.div>

        {/* Search Suggestion (Optional) */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="pt-4 px-4">
          <div className="max-w-md mx-auto bg-accent dark:bg-accent-dark border border-border-light dark:border-border-dark rounded-lg p-4 sm:p-6">
            <div className="flex items-center gap-3 mb-3">
              <Search className="w-5 h-5 text-secondary-light dark:text-secondary-dark shrink-0" />
              <p className="text-sm dark:text-text-dark text-text-light font-semibold">
                Can&apos;t find what you need?
              </p>
            </div>
            <Link
              href="/contact"
              className="text-xs sm:text-sm dark:text-secondary-dark text-secondary-light hover:underline"
            >
              Contact us and we&apos;ll help you out →
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
