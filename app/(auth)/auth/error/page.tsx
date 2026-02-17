'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { AlertTriangle, Clock, Shield, Mail, Lock, Compass, Rocket, Star } from 'lucide-react'
import Picture from '@/app/components/common/Picture'
import { MotionLink } from '@/app/components/common/MotionLink'

const getAuthErrorMessage = (error: string | null) => {
  switch (error) {
    case 'AccessDenied':
      return {
        icon: Shield,
        title: 'Access Denied',
        message:
          "Your account isn't registered in our system. Only verified members of Education Comes First can access this area. Please contact us if you need assistance."
      }

    case 'Verification':
      return {
        icon: Clock,
        title: 'Link Expired',
        message: 'That verification link has expired or has already been used. Please request a new one to continue.'
      }

    case 'EmailSignin':
      return {
        icon: Mail,
        title: 'Email Failed to Send',
        message: "We couldn't send the verification email. Please double-check your email address and try again."
      }

    case 'OAuthSignin':
    case 'OAuthCallback':
      return {
        icon: AlertTriangle,
        title: 'Authentication Error',
        message: 'There was a problem connecting to the authentication provider. Please wait a moment and try again.'
      }

    case 'SessionRequired':
      return {
        icon: Lock,
        title: 'Sign In Required',
        message: 'You need to be signed in to access this page. Please authenticate to continue.'
      }

    case 'Configuration':
      return {
        icon: Compass,
        title: 'System Configuration Error',
        message: 'Our technical team at Education Comes First is working on this issue. Please try again later.'
      }

    default:
      return {
        icon: AlertTriangle,
        title: 'Unknown Error',
        message: 'Something unexpected happened. Please try again or contact us if the problem persists.'
      }
  }
}

export default function AuthError() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')
  const errorInfo = getAuthErrorMessage(error)
  const Icon = errorInfo.icon

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Visual/Branding */}
      <div className="hidden lg:flex lg:w-1/2 dark:bg-neutral-950 bg-neutral-50 relative overflow-hidden items-center justify-center p-12">
        {/* Animated linear orbs */}
        <motion.div
          className="absolute top-1/4 left-1/3 w-96 h-96 bg-red-600/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{
            duration: 10,
            repeat: Infinity
          }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-neutral-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.2, 0.4]
          }}
          transition={{
            duration: 8,
            repeat: Infinity
          }}
        />

        {/* Content */}
        <div className="relative z-10 text-center flex items-center justify-center flex-col">
          <MotionLink href="/" className="flex space-x-3 w-44 h-auto mb-4">
            <Picture
              src="/images/vertical-logo-light.png"
              alt="Education Comes First"
              className="dark:hidden block w-full h-full cursor-pointer hover:opacity-80 transition-opacity object-contain"
              priority
            />
            <Picture
              src="/images/vertical-logo-dark.png"
              alt="Education Comes First"
              className="dark:block hidden w-full h-full cursor-pointer hover:opacity-80 transition-opacity object-contain"
              priority
            />
          </MotionLink>

          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-red-500/10 dark:bg-red-500/20 rounded-full mb-6"
          >
            <Icon className="w-10 h-10 text-red-500 dark:text-red-400" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="dark:text-white text-neutral-900 text-4xl font-bold mb-4 tracking-tight"
          >
            HOUSTON, WE HAVE A PROBLEM
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="dark:text-neutral-400 text-neutral-600 flex items-center justify-center gap-8"
          >
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-red-500" />
              <span className="text-sm">Error Detected</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-red-500" />
              <span className="text-sm">Standing By</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right Side - Error Content */}
      <div className="w-full lg:w-1/2 dark:bg-neutral-900 bg-white flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          {/* Mobile header */}
          <div className="lg:hidden text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="inline-flex items-center justify-center w-16 h-16 bg-red-500/10 dark:bg-red-500/20 rounded-full mb-4"
            >
              <Icon className="w-8 h-8 text-red-500 dark:text-red-400" />
            </motion.div>
            <h1 className="dark:text-white text-neutral-900 text-2xl font-bold">Mission Interrupted</h1>
          </div>

          {/* Error Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="p-6 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 rounded-2xl backdrop-blur-sm mb-8"
          >
            <div className="flex items-start space-x-4">
              <div className="shrink-0 hidden lg:block">
                <div className="w-12 h-12 bg-red-100 dark:bg-red-500/20 rounded-full flex items-center justify-center">
                  <Icon className="w-6 h-6 text-red-500 dark:text-red-400" />
                </div>
              </div>
              <div>
                <h2 className="text-red-700 dark:text-red-400 font-bold text-xl mb-2">{errorInfo.title}</h2>
                <p className="text-red-600/80 dark:text-red-300/90 leading-relaxed">{errorInfo.message}</p>
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/auth/login"
                className="w-full dark:bg-linear-to-r dark:from-sky-600 dark:to-sky-700 dark:hover:from-sky-500 dark:hover:to-sky-600 bg-linear-to-r from-sky-600 to-sky-700 hover:from-sky-500 hover:to-sky-600 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all"
              >
                <Rocket className="w-5 h-5" />
                Return to Launch Pad
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/"
                className="w-full dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:text-white bg-neutral-100 hover:bg-neutral-200 text-neutral-900 font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
              >
                Back to Home Base
              </Link>
            </motion.div>
          </div>

          {/* Help Text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="dark:text-neutral-500 text-neutral-600 text-center text-sm mt-8"
          >
            Need assistance? Contact{' '}
            <a
              href="mailto:support@bgcl.org"
              className="dark:text-sky-400 dark:hover:text-sky-300 text-sky-600 hover:text-sky-500 transition-colors"
            >
              ground control
            </a>{' '}
            for help.
          </motion.p>

          {/* Error Code */}
          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-6 text-center"
            >
              <span className="dark:text-neutral-600 text-neutral-400 text-xs font-mono">Error Code: {error}</span>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
