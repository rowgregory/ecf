'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { Mail, ArrowRight } from 'lucide-react'
import Picture from '@/app/components/common/Picture'
import LogoHorizontalDark from '@/public/svg/LogoHorizontalDark'
import { logAuthError } from '@/app/lib/actions/logAuthError'
import { store } from '@/app/lib/store/store'
import { showToast } from '@/app/lib/store/slices/toastSlice'
import { signIn } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import getAuthErrorMessage from '@/app/lib/utils/getAuthErrorMessage'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const searchParams = useSearchParams()
  const urlError = searchParams.get('error')
  const errorInfo = urlError ? getAuthErrorMessage(urlError) : null

  const handleGoogleSignIn = async (e: { preventDefault: () => void }) => {
    e.preventDefault()

    try {
      await signIn('google', {
        redirect: true,
        callbackUrl: '/auth/custom-callback'
      })
    } catch (error) {
      // Check for specific error types
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred'

      store.dispatch(
        showToast({
          message: 'Sign-in failed',
          description: errorMessage.includes('popup')
            ? 'Please allow popups and try again'
            : 'Unable to connect with Google. Please try again.',
          type: 'error'
        })
      )
    }
  }

  const handleMagicLink = async (e: { preventDefault: () => void }) => {
    e.preventDefault()

    if (!email) {
      setErrorMsg('Enter valid email')
      return
    }

    try {
      setIsSubmitting(true)
      localStorage.setItem('lastMagicLinkEmail', email)

      const result = await signIn('email', {
        email,
        redirect: false,
        callbackUrl: '/auth/custom-callback'
      })

      if (result?.ok) {
        store.dispatch(
          showToast({
            message: 'Magic link sent!',
            description: `Check ${email} for your sign-in link`,
            type: 'success'
          })
        )
        setEmail('')
        setErrorMsg('')
      } else if (result?.error) {
        store.dispatch(
          showToast({
            message: 'Failed to send magic link',
            description: result.error === 'EmailSignin' ? 'Invalid email address' : 'Please try again',
            type: 'error'
          })
        )
      }
    } catch {
      store.dispatch(
        showToast({
          message: 'Something went wrong',
          description: 'Unable to send magic link. Please try again.',
          type: 'error'
        })
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  useEffect(() => {
    // Skip false positives
    if (!urlError || urlError === 'undefined' || urlError === 'null') {
      return
    }

    // Only log if we have valid error info AND it's a real error code
    const knownErrors = [
      'AccessDenied',
      'Verification',
      'EmailSignin',
      'OAuthSignin',
      'OAuthCallback',
      'SessionRequired',
      'Configuration'
    ]

    if (errorInfo) {
      const savedEmail = localStorage.getItem('lastMagicLinkEmail')

      logAuthError({
        error: urlError,
        title: errorInfo.title,
        message: errorInfo.message,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        url: window.location.href,
        email: savedEmail || undefined,
        isKnownError: knownErrors.includes(urlError) // Helps you filter in DB
      })
    }
  }, [urlError, errorInfo])

  return (
    <div className="min-h-screen bg-bg-light dark:bg-bg-dark flex">
      {/* Left Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-4 sm:px-6 lg:px-12 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          {/* Logo */}
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

          {/* Header */}
          <div className="mb-8 mt-3">
            <p className="font-lato text-base text-text-light/60 dark:text-text-dark/60">
              Sign in to continue supporting students
            </p>
          </div>

          <motion.button
            type="button"
            onClick={handleGoogleSignIn}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center justify-center gap-3 bg-bg-light dark:bg-bg-dark border border-border-light dark:border-border-dark text-text-light dark:text-text-dark font-lato font-semibold px-6 py-4 rounded-[5px] hover:bg-accent dark:hover:bg-accent-dark transition-all shadow-sm hover:shadow-md mb-6 cursor-pointer"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </motion.button>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border-light dark:border-border-dark" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-bg-light dark:bg-bg-dark font-lato text-text-light/60 dark:text-text-dark/60">
                Or continue with email
              </span>
            </div>
          </div>

          {/* Success Banner */}
          <AnimatePresence>
            {errorMsg && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="mb-8 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg p-4 flex items-center gap-3"
              >
                <div className="shrink-0">
                  <svg className="w-5 h-5 text-red-600 dark:text-red-400" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-red-800 dark:text-red-200">Error</p>
                  <p className="text-xs text-red-700 dark:text-red-300">{errorMsg}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Magic Link Form */}
          <form onSubmit={handleMagicLink} className="space-y-6">
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block font-lato text-sm font-medium text-text-light dark:text-text-dark mb-2"
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-text-light/40 dark:text-text-dark/40" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="you@example.com"
                  className="w-full pl-12 pr-4 py-4 bg-bg-light dark:bg-bg-dark border-2 border-border-light dark:border-border-dark rounded-[5px] font-lato text-text-light dark:text-text-dark placeholder:text-text-light/40 dark:placeholder:text-text-dark/40 focus:outline-none focus:border-primary-light dark:focus:border-primary-dark transition-colors"
                />
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-center gap-2 bg-secondary-light dark:bg-secondary-dark text-white dark:text-text-dark font-lato font-semibold px-8 py-4 rounded-[5px] shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-text-light/30 dark:border-text-dark/30 border-t-text-light dark:border-t-text-dark rounded-full animate-spin" />
                  <span>Sending Magic Link...</span>
                </>
              ) : (
                <>
                  <span>Send Magic Link</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </motion.button>
          </form>

          {/* Terms */}
          <div className="mt-8 text-center">
            <p className="font-lato text-xs text-text-light/50 dark:text-text-dark/50">
              By continuing, you agree to our{' '}
              <Link href="/terms" className="underline hover:text-text-light dark:hover:text-text-dark">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="/privacy" className="underline hover:text-text-light dark:hover:text-text-dark">
                Privacy Policy
              </Link>
            </p>
          </div>
        </motion.div>
      </div>

      {/* Right Side - Hero Image/Gradient */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary-light dark:bg-primary-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_50%)]" />

        <div className="relative z-10 flex flex-col items-center justify-center p-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="font-kanit text-4xl md:text-5xl font-bold text-text-light dark:text-text-dark mb-4">
              Empowering Education
            </h2>

            <p className="font-lato text-lg text-text-light/90 dark:text-text-dark/90 max-w-md mx-auto mb-8">
              Join us in our mission to provide quality educational opportunities to underprivileged youth
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto">
              <div>
                <div className="font-kanit text-3xl font-bold text-text-light dark:text-text-dark mb-1">500+</div>
                <div className="font-lato text-sm text-text-light/80 dark:text-text-dark/80">Students</div>
              </div>
              <div>
                <div className="font-kanit text-3xl font-bold text-text-light dark:text-text-dark mb-1">$1M+</div>
                <div className="font-lato text-sm text-text-light/80 dark:text-text-dark/80">Awarded</div>
              </div>
              <div>
                <div className="font-kanit text-3xl font-bold text-text-light dark:text-text-dark mb-1">95%</div>
                <div className="font-lato text-sm text-text-light/80 dark:text-text-dark/80">Success</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
