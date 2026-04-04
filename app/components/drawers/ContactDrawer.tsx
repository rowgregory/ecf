'use client'

import { setCloseContactDrawer } from '@/app/lib/store/slices/uiSlice'
import { store, useUiSelector } from '@/app/lib/store/store'
import { motion, AnimatePresence } from 'framer-motion'
import { X, MapPin, Mail, Phone } from 'lucide-react'
import Link from 'next/link'
import Picture from '../common/Picture'
import LogoHorizontalDark from '@/public/svg/LogoHorizontalDark'
import { useLockBodyScroll } from '@/app/lib/hooks/useLockBodyScroll'
import { useUserRole } from '@/app/lib/hooks/useUserRole'

const FacebookIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
      fill="currentColor"
    />
  </svg>
)

const LinkedInIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
      fill="currentColor"
    />
  </svg>
)

export default function ContactDrawer() {
  const { contactDrawer } = useUiSelector()
  const { isAdmin, isSupporter } = useUserRole()
  const onClose = () => store.dispatch(setCloseContactDrawer())
  useLockBodyScroll(contactDrawer)

  return (
    <AnimatePresence>
      {contactDrawer && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-white/50 dark:bg-black/50 z-50"
          />

          {/* Drawer Content */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full sm:w-80 bg-bg-light dark:bg-bg-dark z-50 shadow-2xl overflow-y-auto"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 bg-primary-light dark:bg-primary-dark rounded-lg hover:opacity-90 transition-opacity"
            >
              <X className="w-5 h-5 text-text-light dark:text-bg-dark" />
            </button>

            {/* Content */}
            <div className="px-8 pt-20 pb-8 space-y-8">
              {/* Logo/Name */}
              <Link href="/" className="">
                <div className="w-32 sm:w-40 md:w-48 lg:w-52">
                  <Picture
                    src="/svg/logo-horizontal-light.svg"
                    alt="Education Comes First"
                    className="dark:hidden block w-full h-full cursor-pointer hover:opacity-80 transition-opacity"
                    priority={true}
                  />
                  <LogoHorizontalDark />
                </div>
              </Link>

              {/* Description */}
              <p className="text-text-light/80 dark:text-text-dark/80 text-sm leading-relaxed">
                Empowering students through educational programs, mentorship, and community support. We believe in
                unlocking potential and building brighter futures for every student.
              </p>

              {/* Address */}
              <div>
                <h3 className="text-text-light dark:text-text-dark font-semibold text-xs uppercase tracking-wider mb-2">
                  Address
                </h3>
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-primary-light dark:text-primary-dark shrink-0 mt-1" />
                  <p className="text-text-light dark:text-text-dark">
                    123 Education Street
                    <br />
                    Your City, ST 12345
                  </p>
                </div>
              </div>

              {/* Email */}
              <div>
                <h3 className="text-text-light dark:text-text-dark font-semibold text-xs uppercase tracking-wider mb-2">
                  Email
                </h3>
                <a
                  href="mailto:info@educationcomesfirst.org"
                  className="flex items-center gap-2 text-text-light dark:text-text-dark hover:text-primary-light dark:hover:text-primary-dark transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  info@educationcomesfirst.org
                </a>
              </div>

              {/* Phone */}
              <div>
                <h3 className="text-text-light dark:text-text-dark font-semibold text-xs uppercase tracking-wider mb-2">
                  Call Now
                </h3>
                <a
                  href="tel:+11234567890"
                  className="flex items-center gap-2 text-text-light dark:text-text-dark hover:text-primary-light dark:hover:text-primary-dark transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  +1 (123) 456-7890
                </a>
              </div>

              {/* Social Icons */}
              <div className="flex items-center gap-3">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-primary-light dark:bg-primary-dark rounded-full flex items-center justify-center hover:opacity-90 transition-opacity text-text-light dark:text-bg-dark"
                >
                  <FacebookIcon />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-primary-light dark:bg-primary-dark rounded-full flex items-center justify-center hover:opacity-90 transition-opacity text-text-light dark:text-bg-dark"
                >
                  <LinkedInIcon />
                </a>
              </div>

              {/* CTA Button */}
              <Link
                href="/contact"
                onClick={onClose}
                className="block w-full bg-primary-light dark:bg-primary-dark text-text-light dark:text-bg-dark text-center py-4 rounded-lg font-semibold hover:opacity-90 transition-opacity"
              >
                Let&apos;s Talk →
              </Link>
              <div className="text-center">
                <Link
                  href="/auth/login"
                  onClick={onClose}
                  className="text-sm text-secondary-light dark:text-secondary-dark hover:underline"
                >
                  {isAdmin ? 'Dashboard' : isSupporter ? 'Supporter Overview' : 'Login'} →
                </Link>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
