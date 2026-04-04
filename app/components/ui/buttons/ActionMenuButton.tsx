import { setOpenAdminActionMenu } from '@/app/lib/store/slices/uiSlice'
import { store, useUiSelector } from '@/app/lib/store/store'
import { Plus, ChevronDown } from 'lucide-react'

const ActionMenuButton = () => {
  const { adminActionMenu } = useUiSelector()

  const handleOpenActionMenu = () => store.dispatch(setOpenAdminActionMenu())

  return (
    <button
      onClick={handleOpenActionMenu}
      className="flex items-center gap-2 px-4 py-2 bg-primary-light dark:bg-primary-dark text-black font-mono text-xs font-medium hover:opacity-85 transition-opacity cursor-pointer"
    >
      <Plus className="w-3.5 h-3.5" />
      <span>Actions</span>
      <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${adminActionMenu ? 'rotate-180' : ''}`} />
    </button>
  )
}

export default ActionMenuButton
