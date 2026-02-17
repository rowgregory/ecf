import { motion } from 'framer-motion'
import { store } from '@/app/lib/store/store'
import { Menu } from 'lucide-react'
import { setOpenMobileNavigation } from '@/app/lib/store/slices/uiSlice'

export const MobileMenuButton = () => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => store.dispatch(setOpenMobileNavigation())}
      className="block lg:hidden relative p-2 bg-accent dark:bg-accent-dark border border-border-light dark:border-border-dark hover:bg-primary-light/10 dark:hover:bg-primary-dark/10 rounded-lg transition-all"
    >
      <Menu className="w-5 h-5 text-text-light dark:text-text-dark" />
    </motion.button>
  )
}
