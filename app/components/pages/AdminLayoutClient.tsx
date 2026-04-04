'use client'

import { ActionMenuDropdown } from '../admin/ActionMenuDropdown'
import ActionMenuButton from '../ui/buttons/ActionMenuButton'
import { MobileMenuButton } from '../ui/buttons/MobileMenuButton'
import LogoutButton from '../ui/buttons/LogoutButton'
import { FC, ReactNode } from 'react'
import { store, useUiSelector } from '@/app/lib/store/store'
import { setCloseAdminSidebar, setToggleAdminSidebar } from '@/app/lib/store/slices/uiSlice'
import { motion } from 'framer-motion'
import { Menu } from 'lucide-react'
import CreateAdminModal from '../modals/CreateAdminModal'

export const AdminLayoutClient: FC<{
  children: ReactNode
  sidebar: ReactNode
}> = ({ children, sidebar }) => {
  const onClose = () => store.dispatch(setCloseAdminSidebar())
  const { adminSidebar } = useUiSelector()

  return (
    <>
      <ActionMenuDropdown />
      <CreateAdminModal />

      {/* Desktop Fixed Header */}
      <header className="hidden lg:block fixed top-0 left-64 right-0 bg-bg-light dark:bg-bg-dark border-b border-border-subtle dark:border-border-dark py-2.5 px-6 z-30 h-15.25">
        <div className="flex items-center justify-between h-full">
          <h1 className="font-mono text-xs font-bold tracking-[0.15em] uppercase text-text-light dark:text-text-dark">
            Admin
          </h1>
          <div className="flex items-center gap-2 md:gap-4 h-full">
            <ActionMenuButton />
            <MobileMenuButton />
            <LogoutButton />
          </div>
        </div>
      </header>

      <div className="min-h-screen bg-bg-light dark:bg-bg-dark flex">
        {/* Mobile Sidebar Overlay */}
        {adminSidebar && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/30 dark:bg-black/50 z-40 lg:hidden"
          />
        )}

        {/* Desktop Sidebar - Fixed */}
        <div className="hidden lg:block fixed left-0 top-0 h-screen w-64 z-20">{sidebar}</div>

        {/* Mobile Sidebar */}
        <motion.div
          initial={false}
          animate={{ x: adminSidebar ? 0 : '-100%' }}
          transition={{ duration: 0.3 }}
          className="fixed lg:hidden inset-y-0 left-0 z-50 w-64"
        >
          {sidebar}
        </motion.div>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto flex flex-col lg:ml-64 lg:mt-15">
          {/* Mobile Header */}
          <div className="lg:hidden flex items-center justify-between bg-bg-light dark:bg-bg-dark border-b border-border-subtle dark:border-border-dark px-4 py-4">
            <button
              onClick={() => store.dispatch(setToggleAdminSidebar(adminSidebar))}
              className="p-2 hover:bg-accent dark:hover:bg-accent-dark transition-colors"
            >
              <Menu className="w-5 h-5 text-text-light dark:text-text-dark" />
            </button>
            <h1 className="font-mono text-xs font-bold tracking-[0.15em] uppercase text-text-light dark:text-text-dark">
              Admin
            </h1>
            <div className="w-9" />
          </div>

          {/* Content */}
          {children}
        </main>
      </div>
    </>
  )
}
