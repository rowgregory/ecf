'use client'

import { ExternalLink, Key, User, Check, Copy, EyeOff, Eye } from 'lucide-react'
import { useState } from 'react'

interface AnalyticsCredentials {
  analyticsId: string
  email: string
  password: string
  gcpUrl: string
}

export default function GoogleAnalyticsCard() {
  const [showPassword, setShowPassword] = useState(false)
  const [copiedEmail, setCopiedEmail] = useState(false)
  const [copiedPassword, setCopiedPassword] = useState(false)

  const credentials: AnalyticsCredentials = {
    analyticsId: 'G-XXXXXXXXXX',
    email: 'dev.ecf@gmail.com',
    password: process.env.GOOGLE_ANALYRICS_PASSWORD!,
    gcpUrl:
      'https://analytics.google.com/analytics/web/#/a337968536p518966189/reports/intelligenthome?params=_u..nav%3Dmaui'
  }

  const handleCopy = async (text: string, type: 'email' | 'password') => {
    await navigator.clipboard.writeText(text)
    if (type === 'email') {
      setCopiedEmail(true)
      setTimeout(() => setCopiedEmail(false), 2000)
    } else {
      setCopiedPassword(true)
      setTimeout(() => setCopiedPassword(false), 2000)
    }
  }

  const fieldClass =
    'flex-1 px-3 py-2 bg-accent dark:bg-accent-dark border border-border-subtle dark:border-border-dark'
  const btnClass =
    'flex items-center justify-center px-3 py-2 bg-accent dark:bg-accent-dark border border-border-subtle dark:border-border-dark hover:border-secondary-light dark:hover:border-secondary-dark transition-colors'
  const labelClass =
    'font-mono text-[9px] tracking-[0.2em] uppercase text-text-light/35 dark:text-text-dark/30 mb-2 flex items-center gap-1'

  return (
    <div className="bg-bg-light dark:bg-bg-dark border border-border-subtle dark:border-border-dark p-6">
      {/* Header */}
      <div className="mb-6 pb-6 border-b border-border-subtle dark:border-border-dark">
        <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-secondary-light dark:text-secondary-dark mb-1">
          {`// credentials`}
        </p>
        <h3 className="font-mono text-sm font-bold text-text-light dark:text-text-dark">Google Analytics</h3>
        <p className="font-mono text-[10px] text-text-light/40 dark:text-text-dark/35 mt-0.5">
          Analytics & Cloud Platform Access
        </p>
      </div>

      {/* Credentials */}
      <div className="space-y-4 mb-6">
        {/* Analytics ID */}
        <div>
          <p className={labelClass}>Analytics ID</p>
          <div className={fieldClass}>
            <code className="font-mono text-xs text-text-light dark:text-text-dark">{credentials.analyticsId}</code>
          </div>
        </div>

        {/* Email */}
        <div>
          <p className={labelClass}>
            <User className="w-3 h-3" />
            Email
          </p>
          <div className="flex items-stretch gap-2">
            <div className={fieldClass}>
              <code className="font-mono text-xs text-text-light dark:text-text-dark">{credentials.email}</code>
            </div>
            <button onClick={() => handleCopy(credentials.email, 'email')} className={btnClass} title="Copy email">
              {copiedEmail ? (
                <Check className="w-3.5 h-3.5 text-green-600 dark:text-green-400" />
              ) : (
                <Copy className="w-3.5 h-3.5 text-text-light/40 dark:text-text-dark/35" />
              )}
            </button>
          </div>
        </div>

        {/* Password */}
        <div>
          <p className={labelClass}>
            <Key className="w-3 h-3" />
            Password
          </p>
          <div className="flex flex-col sm:flex-row items-stretch gap-2">
            <div className={`${fieldClass} flex-1`}>
              <code className="font-mono text-xs text-text-light dark:text-text-dark break-all">
                {showPassword ? credentials.password : '••••••••••••••••••'}
              </code>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowPassword(!showPassword)}
                className={btnClass}
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <EyeOff className="w-3.5 h-3.5 text-text-light/40 dark:text-text-dark/35" />
                ) : (
                  <Eye className="w-3.5 h-3.5 text-text-light/40 dark:text-text-dark/35" />
                )}
              </button>
              <button
                onClick={() => handleCopy(credentials.password, 'password')}
                className={btnClass}
                title="Copy password"
              >
                {copiedPassword ? (
                  <Check className="w-3.5 h-3.5 text-green-600 dark:text-green-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5 text-text-light/40 dark:text-text-dark/35" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Action */}

      <a
        href={credentials.gcpUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#E37400] text-white font-mono text-xs font-medium hover:opacity-85 transition-opacity"
      >
        Open Google Analytics Platform
        <ExternalLink className="w-3.5 h-3.5" />
      </a>

      {/* Footer */}
      <p className="font-mono text-[10px] text-text-light/30 dark:text-text-dark/25 text-center mt-4">
        {`// keep these credentials secure — do not share publicly`}
      </p>
    </div>
  )
}
