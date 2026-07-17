import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.prod.website-files.com' },
      { protocol: 'https', hostname: 'firebasestorage.googleapis.com' },
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' }
    ]
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.stripe.com https://www.googletagmanager.com https://maps.googleapis.com https://translate.google.com https://translate.googleapis.com https://translate-pa.googleapis.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://www.gstatic.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: blob: https://firebasestorage.googleapis.com https://lh3.googleusercontent.com https://platform-lookaside.fbsbx.com https://www.gstatic.com https://fonts.gstatic.com",
              "frame-src 'self' https://js.stripe.com https://hooks.stripe.com https://translate.google.com",
              "connect-src 'self' https://api.stripe.com https://firebasestorage.googleapis.com wss://ws-mt1.pusher.com https://sockjs-mt1.pusher.com https://www.google-analytics.com",
              "media-src 'self' https://firebasestorage.googleapis.com"
            ].join('; ')
          }
        ]
      }
    ]
  }
}

export default nextConfig
