import { store } from '@/app/lib/store/store'
import { Menu } from 'lucide-react'
import { setOpenMobileNavigation } from '@/app/lib/store/slices/uiSlice'

export const MobileMenuButton = () => {
  return (
    <button
      onClick={() => store.dispatch(setOpenMobileNavigation())}
      className="block lg:hidden relative p-2 bg-accent dark:bg-accent-dark border border-border-light dark:border-border-dark hover:border-secondary-light dark:hover:border-secondary-dark transition-colors"
    >
      <Menu className="w-5 h-5 text-text-light dark:text-text-dark" />
    </button>
  )
}
