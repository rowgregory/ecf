'use client'

import Header from './components/Header'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'
import { HIDDEN_PATHS } from './lib/constants/navigation'
import { Provider } from 'react-redux'
import { store } from './lib/store/store'
import VideoLightbox from './components/modals/VideoLightbox'
import Footer from './components/Footer'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

const stripe = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export default function RootLayoutWrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  const show = !HIDDEN_PATHS.some((path: string) => pathname.startsWith(path))

  return (
    <Provider store={store}>
      <Elements stripe={stripe}>
        <VideoLightbox />
        {show && <Header />}
        {children}
        {show && <Footer />}
      </Elements>
    </Provider>
  )
}
