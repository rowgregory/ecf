import { AnimatePresence, motion } from 'framer-motion'
import { store, useUiSelector } from '@/app/lib/store/store'
import { setCloseAdminActionMenu } from '@/app/lib/store/slices/uiSlice'
import { useBodyScrollLock } from '@/app/lib/hooks/useBodyScrollLock'
import { Backdrop } from '../common/Backdrop'
import { IActionItem } from '@/types/common'
import { dropDownActionItems } from '@/app/lib/constants/dropdownActionItems'

export const ActionMenuDropdown = () => {
  const { adminActionMenu } = useUiSelector()
  const onClose = () => store.dispatch(setCloseAdminActionMenu())
  const handleActionClick = (item: IActionItem) => {
    store.dispatch(item.open())
    onClose()
  }
  useBodyScrollLock(adminActionMenu)

  return (
    <AnimatePresence>
      {adminActionMenu && (
        <>
          <Backdrop onClose={onClose} />
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="fixed z-50 right-4 top-20 w-64 bg-bg-light dark:bg-bg-dark border border-border-light dark:border-border-dark overflow-hidden"
          >
            <div className="overflow-y-auto max-h-[calc(100vh-150px)] sm:max-h-96">
              {dropDownActionItems?.map((item, i) => (
                <button
                  key={i}
                  onClick={() => handleActionClick(item)}
                  className="w-full px-4 py-3 text-left font-mono text-xs text-text-light/70 dark:text-text-dark/60 hover:bg-accent dark:hover:bg-accent-dark hover:text-text-light dark:hover:text-text-dark transition-colors duration-150 flex items-center gap-3 group border-b border-border-light dark:border-border-dark last:border-b-0"
                >
                  <item.icon className="w-3.5 h-3.5 shrink-0 group-hover:text-primary-light dark:group-hover:text-primary-dark transition-colors" />
                  <span className="group-hover:text-primary-light dark:group-hover:text-primary-dark transition-colors">
                    {item.label}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
