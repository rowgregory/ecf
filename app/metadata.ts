import type { Metadata, Viewport } from 'next'

const siteUrl = 'https://educationcomesfirst.org'
const siteName = 'Education Comes First'
const description =
  'Education Comes First is a 501(c)(3) nonprofit empowering youth through quality out-of-school programs — mentorship, tutoring, and community initiatives that help students reach their full potential.'
const themeColorLight = '#fcf7f2'
const themeColorDark = '#0a0a0a'
const brandColor = '#00a2d1'

// ─── Viewport (separate export in Next.js 15+) ─────────────────────────────
export const siteViewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: themeColorLight },
    { media: '(prefers-color-scheme: dark)', color: themeColorDark }
  ],
  colorScheme: 'light dark'
}

// ─── Metadata ──────────────────────────────────────────────────────────────
export const siteMetadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: `${siteName} — Empowering the next generation`,
    template: `%s — ${siteName}`
  },
  description,

  applicationName: siteName,
  authors: [{ name: siteName, url: siteUrl }],
  creator: siteName,
  publisher: siteName,

  keywords: [
    'nonprofit',
    'education',
    'youth programs',
    'mentorship',
    'tutoring',
    'after school',
    'community',
    '501(c)(3)'
  ],
  category: 'nonprofit',

  formatDetection: {
    email: false,
    address: false,
    telephone: false
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },

  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/'
    }
  },

  openGraph: {
    title: `${siteName} — Empowering the next generation`,
    description,
    url: siteUrl,
    siteName,
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: `${siteName} — Empowering the next generation`,
        type: 'image/png'
      }
    ]
  },

  twitter: {
    card: 'summary_large_image',
    title: `${siteName} — Empowering the next generation`,
    description,
    images: [
      {
        url: '/og-image.png',
        alt: `${siteName} — Empowering the next generation`
      }
    ]
    // creator: '@educationcomes1st',
  },

  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32', type: 'image/x-icon' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/favicon-512x512.png', sizes: '512x512', type: 'image/png' }
    ],

    shortcut: '/favicon.ico',

    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
      { url: '/apple-touch-icon-152x152.png', sizes: '152x152', type: 'image/png' },
      { url: '/apple-touch-icon-120x120.png', sizes: '120x120', type: 'image/png' },
      { url: '/apple-touch-icon-76x76.png', sizes: '76x76', type: 'image/png' }
    ],

    other: [
      {
        rel: 'mask-icon',
        url: '/safari-pinned-tab.svg',
        color: brandColor
      },
      {
        rel: 'msapplication-TileImage',
        url: '/mstile-144x144.png'
      }
    ]
  },

  manifest: '/site.webmanifest',

  other: {
    'application-name': siteName,
    'apple-mobile-web-app-title': siteName,
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'mobile-web-app-capable': 'yes',
    'msapplication-TileColor': brandColor,
    'msapplication-config': '/browserconfig.xml'
  },

  verification: {
    // Fill in after setting up Google Search Console + Bing Webmaster
    // google: 'your-google-search-console-code',
    // other: { 'msvalidate.01': 'your-bing-webmaster-code' },
  }
}
