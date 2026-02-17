import { AnimatePresence, motion } from 'framer-motion'
import { store, useUiSelector } from '@/app/lib/store/store'
import { setCloseAdminActionMenu } from '@/app/lib/store/slices/uiSlice'
import { useBodyScrollLock } from '@/app/lib/hooks/useBodyScrollLock'
import Backdrop from '../common/Backdrop'
import { IActionItem } from '@/types/common'
import { dropDownActionItems } from '@/app/lib/constants/dropdownActionItems'

export const ActionMenuDropdown = () => {
  const { adminActionMenu } = useUiSelector()
  const onClose = () => store.dispatch(setCloseAdminActionMenu())
  const handleActionClick = (item: IActionItem) => store.dispatch(item.open())
  useBodyScrollLock(adminActionMenu)

  return (
    <AnimatePresence>
      {adminActionMenu && (
        <>
          <Backdrop onClose={onClose} />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{
              duration: 0.2,
              ease: [0.4, 0, 0.2, 1]
            }}
            className="fixed z-50 right-4 top-20 w-64 bg-bg-light dark:bg-bg-dark border border-border-light dark:border-border-dark rounded-lg shadow-xl overflow-hidden"
          >
            <div className="py-2 overflow-y-auto max-h-[calc(100vh-150px)] sm:max-h-96">
              {dropDownActionItems?.map((item, i) => (
                <div key={i} className="relative">
                  <motion.button
                    onClick={() => handleActionClick(item)}
                    whileHover={{ backgroundColor: 'rgba(253, 221, 88, 0.1)' }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full px-4 py-3 text-left text-text-light dark:text-text-dark transition-colors flex items-center justify-between group"
                  >
                    <div className="flex items-center space-x-3">
                      <item.icon
                        className={`w-5 h-5 transition-colors text-gray-400 dark:text-gray-500 group-hover:text-primary-light dark:group-hover:text-primary-dark`}
                      />
                      <div className="flex flex-col">
                        <span className="font-medium text-sm group-hover:text-primary-light dark:group-hover:text-primary-dark transition-colors">
                          {item.label}
                        </span>
                      </div>
                    </div>
                  </motion.button>
                </div>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
