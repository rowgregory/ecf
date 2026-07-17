import type { Metadata, Viewport } from 'next'
import { Caveat, Kanit, Lato, Lustria } from 'next/font/google'
import './globals.css'
import RootLayoutWrapper from './root-layout'
import { SessionProvider } from 'next-auth/react'
import { siteMetadata, siteViewport } from './metadata'

const lato = Lato({
  variable: '--font-lato',
  subsets: ['latin'],
  weight: ['400', '700']
})

const lustria = Lustria({
  variable: '--font-kanit',
  subsets: ['latin'],
  weight: ['400']
})

const kanit = Kanit({
  variable: '--font-kanit',
  subsets: ['latin'],
  weight: ['400', '600', '700']
})

const caveat = Caveat({
  variable: '--font-caveat',
  subsets: ['latin'],
  weight: ['400', '700']
})

export const metadata: Metadata = siteMetadata
export const viewport: Viewport = siteViewport

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`bg-accent dark:bg-accent-dark text-[#171717] dark:text-[#ededed] ${lato.variable} ${lustria.variable} ${kanit.variable} ${caveat.variable} antialiased`}
      >
        <SessionProvider>
          <RootLayoutWrapper>{children}</RootLayoutWrapper>
        </SessionProvider>
      </body>
    </html>
  )
}
