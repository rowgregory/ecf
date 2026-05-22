'use client'

import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'
import { LayoutDashboard, LogOut, User } from 'lucide-react'

export function MemberPortalHeader() {
  const session = useSession()
  const role = session.data?.user.role
  const email = session.data?.user.email

  return (
    <header className="sticky top-0 z-10 border-b border-neutral-200 dark:border-border-dark bg-bg-light/90 dark:bg-bg-dark/90 backdrop-blur-md transition-colors duration-300">
      <div className="max-w-container mx-auto px-4 xs:px-6 h-14 flex items-center justify-between gap-4">
        <Link
          href="/"
          aria-label="Education Comes First — home"
          className="shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-light dark:focus-visible:outline-primary-dark"
        >
          <span className="font-mono text-[11px] font-bold tracking-[0.15em] uppercase text-text-light dark:text-text-dark">
            Education
            <span className="text-secondary-light dark:text-primary-dark"> Comes First</span>
          </span>
        </Link>

        <div className="flex items-center gap-2 min-w-0">
          {email && (
            <div
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 font-mono text-[10px] tracking-wide text-text-light/85 dark:text-text-dark/80 min-w-0"
              aria-label={`Signed in as ${email}${role ? `, role ${role.toLowerCase()}` : ''}`}
            >
              <User
                size={12}
                strokeWidth={2}
                aria-hidden="true"
                className="text-text-light/65 dark:text-text-dark/65 shrink-0"
              />
              <span className="truncate max-w-45 md:max-w-65">{email}</span>
              {role && (
                <span
                  aria-hidden="true"
                  className="shrink-0 font-mono text-[9px] font-bold tracking-widest uppercase px-1.5 py-0.5 border border-secondary-light/60 dark:border-primary-dark/60 text-secondary-light dark:text-primary-dark bg-secondary-light/10 dark:bg-primary-dark/10"
                >
                  {role.toLowerCase()}
                </span>
              )}
            </div>
          )}

          {(role === 'ADMIN' || role === 'SUPERUSER') && (
            <Link
              href="/admin/dashboard"
              className="flex items-center gap-1.5 px-3 py-1.5 font-mono text-[10px] font-bold tracking-widest uppercase border border-secondary-light dark:border-primary-dark bg-secondary-light dark:bg-primary-dark text-white dark:text-accent-dark hover:bg-secondary-light/90 dark:hover:bg-primary-dark/90 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-light dark:focus-visible:outline-primary-dark min-h-9"
            >
              <LayoutDashboard size={13} aria-hidden="true" />
              <span className="hidden xs:inline">Dashboard</span>
            </Link>
          )}

          <button
            type="button"
            onClick={() => signOut({ redirectTo: '/login' })}
            aria-label="Sign out"
            className="flex items-center gap-1.5 px-3 py-1.5 font-mono text-[10px] font-bold tracking-widest uppercase border border-neutral-300 dark:border-border-dark text-text-light dark:text-text-dark hover:border-text-light/60 dark:hover:border-text-dark/60 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-light dark:focus-visible:outline-primary-dark min-h-9"
          >
            <LogOut size={13} aria-hidden="true" />
            <span className="hidden xs:inline">Sign out</span>
          </button>
        </div>
      </div>
    </header>
  )
}
