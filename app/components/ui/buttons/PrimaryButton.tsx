import { motion } from 'framer-motion'

// ─── Primary button ───────────────────────────────────────────────────────────
export function PrimaryButton({
  onClick,
  children,
  'aria-label': ariaLabel,
  disabled
}: {
  onClick: () => void
  children: React.ReactNode
  'aria-label'?: string
  disabled?: boolean
}) {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className="flex items-center justify-center gap-2 px-4 py-2.5 font-mono text-[11px] font-bold tracking-widest uppercase border border-primary-light dark:border-primary-dark bg-primary-light dark:bg-primary-dark text-accent-dark transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light dark:focus-visible:outline-primary-dark min-h-10"
      whileHover={{ y: -1, boxShadow: '0 4px 16px rgba(201,243,31,0.18)' }}
      whileTap={{ y: 0 }}
      transition={{ duration: 0.15 }}
    >
      {children}
    </motion.button>
  )
}
