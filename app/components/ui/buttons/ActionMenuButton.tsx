import { setOpenAdminActionMenu } from '@/app/lib/store/slices/uiSlice'
import { store, useUiSelector } from '@/app/lib/store/store'
import { motion } from 'framer-motion'
import { Plus, ChevronDown } from 'lucide-react'

const ActionMenuButton = () => {
  const { adminActionMenu } = useUiSelector()

  const handleOpenActionMenu = () => store.dispatch(setOpenAdminActionMenu())

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleOpenActionMenu}
      className="px-4 py-2 dark:bg-linear-to-r dark:from-cyan-600 dark:to-sky-600 bg-linear-to-r from-sky-500 to-sky-600 text-text-dark shadow-lg rounded-lg transition-all flex items-center space-x-2 font-medium text-sm cursor-pointer"
    >
      <Plus className="w-4 h-4" />
      <span>Actions</span>
      <ChevronDown className={`w-4 h-4 transition-transform ${adminActionMenu ? 'rotate-180' : ''}`} />
    </motion.button>
  )
}

export default ActionMenuButton
