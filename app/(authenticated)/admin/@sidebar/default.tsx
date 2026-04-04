'use client'

import { LogOut, X } from 'lucide-react'
import Link from 'next/link'
import { store } from '@/app/lib/store/store'
import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { signOut } from 'next-auth/react'
import { setCloseAdminSidebar, setIsLoading, setIsNotLoading } from '@/app/lib/store/slices/uiSlice'
import { showToast } from '@/app/lib/store/slices/toastSlice'
import { adminNavigationLinkData } from '@/app/lib/constants/navigation'

const AdminSidebar = () => {
  const pathname = usePathname()
  const session = useSession()
  const onClose = () => store.dispatch(setCloseAdminSidebar())

  const handleLogout = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    try {
      store.dispatch(setIsLoading())
      await signOut({ callbackUrl: '/auth/login?logout=success' })
    } catch (error) {
      store.dispatch(
        showToast({
          type: 'error',
          message: 'Logout Fail',
          description: error instanceof Error ? error.message : 'An error occurred'
        })
      )
    } finally {
      store.dispatch(setIsNotLoading())
    }
  }

  return (
    <aside className="w-64 bg-bg-light dark:bg-bg-dark border-r border-border-subtle dark:border-border-dark h-screen flex flex-col">
      {/* Header */}
      <div className="border-b border-border-subtle dark:border-border-dark shrink-0">
        <div className="flex items-center justify-between py-4 px-6">
          <Link
            href="/"
            className="font-mono text-[11px] font-bold tracking-[0.15em] uppercase text-text-light dark:text-text-dark"
          >
            Education<span className="text-secondary-light dark:text-secondary-dark"> Comes First</span>
          </Link>
          <button
            onClick={onClose}
            className="lg:hidden p-2 hover:bg-accent dark:hover:bg-accent-dark transition-colors"
          >
            <X className="w-4 h-4 text-text-light dark:text-text-dark" />
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="space-y-6 px-4 py-6 flex-1 overflow-y-auto">
        {adminNavigationLinkData(pathname, true).map((group) => (
          <div key={group.title}>
            <h3 className="font-mono text-[9px] tracking-[0.2em] uppercase text-text-light/35 dark:text-text-dark/30 mb-3 px-2">
              {group.title}
            </h3>
            <div className="space-y-px">
              {group.items.map((item) => {
                const IconComponent = item.icon
                const activeClass = 'bg-primary-light dark:bg-primary-dark text-black'
                const inactiveClass =
                  'text-text-light/60 dark:text-text-dark/50 hover:bg-accent dark:hover:bg-accent-dark hover:text-text-light dark:hover:text-text-dark'
                const baseClass =
                  'w-full flex items-center gap-3 px-3 py-2 font-mono text-xs transition-colors duration-150 text-left'

                if (item.isDrawer) {
                  return (
                    <button
                      key={item.label}
                      onClick={onClose}
                      className={`${baseClass} ${item.active ? activeClass : inactiveClass}`}
                    >
                      <IconComponent className="w-3.5 h-3.5 shrink-0" />
                      {item.label}
                    </button>
                  )
                }

                return (
                  <Link
                    key={item.path}
                    href={item.path || ''}
                    className={`${baseClass} ${item.active ? activeClass : inactiveClass}`}
                  >
                    <IconComponent className="w-3.5 h-3.5 shrink-0" />
                    {item.label}
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* User Section */}
      <div className="shrink-0 border-t border-border-subtle dark:border-border-dark p-4">
        <div className="flex items-center gap-3 mb-3 px-1">
          <div className="w-7 h-7 bg-secondary-light dark:bg-secondary-dark flex items-center justify-center shrink-0">
            <span className="font-mono text-[10px] font-bold text-white">
              {session.data?.user?.name
                ?.split(' ')
                .map((n) => n[0])
                .join('')
                .slice(0, 2) ||
                session.data?.user?.email?.[0]?.toUpperCase() ||
                '?'}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-mono text-xs font-medium text-text-light dark:text-text-dark truncate">
              {session.data?.user?.name || 'User'}
            </p>
            <p className="font-mono text-[10px] text-text-light/40 dark:text-text-dark/35 truncate">
              {session.data?.user?.email}
            </p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 font-mono text-xs border border-border-subtle dark:border-border-dark text-text-light/50 dark:text-text-dark/40 hover:text-text-light dark:hover:text-text-dark hover:border-text-light/30 dark:hover:border-text-dark/30 transition-colors duration-150"
        >
          <LogOut className="w-3.5 h-3.5" />
          Sign Out
        </button>
      </div>
    </aside>
  )
}

export default AdminSidebar
