'use client'

import { ExternalLink } from 'lucide-react'

export default function GoogleSearchConsoleCard() {
  return (
    <div className="bg-bg-light dark:bg-bg-dark border border-border-subtle dark:border-border-dark p-6 flex flex-col justify-between">
      {/* Header */}
      <div className="mb-6 pb-6 border-b border-border-subtle dark:border-border-dark">
        <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-secondary-light dark:text-secondary-dark mb-1">
          {`// search`}
        </p>
        <h3 className="font-mono text-sm font-bold text-text-light dark:text-text-dark">Google Search Console</h3>
        <p className="font-mono text-[10px] text-text-light/40 dark:text-text-dark/35 mt-0.5">
          Search Performance & Site Health
        </p>
      </div>

      {/* Access Info */}
      <div className="flex-1 mb-6">
        <div className="p-4 bg-accent dark:bg-accent-dark border border-border-subtle dark:border-border-dark">
          <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-text-light/35 dark:text-text-dark/30 mb-2">
            Your Access Email
          </p>
          <code className="font-mono text-xs text-text-light dark:text-text-dark break-all">dev.educf@gmail.com</code>
          <p className="font-mono text-[10px] text-text-light/40 dark:text-text-dark/35 mt-1">
            You have access to this property via your Google account
          </p>
        </div>
      </div>

      {/* Action */}

      <a
        href="https://search.google.com/search-console?resource_id=https://www.bgcl.org"
        target="_blank"
        rel="noopener noreferrer"
        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#1a73e8] text-white font-mono text-xs font-medium hover:opacity-85 transition-opacity"
      >
        Open Search Console
        <ExternalLink className="w-3.5 h-3.5" />
      </a>

      {/* Footer */}
      <p className="font-mono text-[10px] text-text-light/30 dark:text-text-dark/25 text-center mt-4">
        {`// monitor search performance, indexing, and site health`}
      </p>
    </div>
  )
}
