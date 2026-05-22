import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

export function NavAccordion({
  text,
  href,
  isActive,
  dropdown,
  onLinkClick,
  reduceMotion
}: {
  text: string
  href: string
  isActive: boolean
  dropdown?: { label: string; linkKey: string; isActive: boolean }[]
  onLinkClick: () => void
  reduceMotion: boolean
}) {
  // Auto-expand if any child route is active
  const childActive = dropdown?.some((d) => d.isActive) ?? false
  const [open, setOpen] = useState(childActive)
  const panelId = `nav-panel-${text.toLowerCase().replace(/\s+/g, '-')}`

  if (!dropdown) {
    return (
      <Link
        href={href}
        onClick={onLinkClick}
        className={`block py-2 font-mono text-sm tracking-wide transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-light dark:focus-visible:outline-secondary-dark ${
          isActive
            ? 'text-secondary-light dark:text-secondary-dark font-bold'
            : 'text-text-light dark:text-text-dark hover:text-secondary-light dark:hover:text-secondary-dark'
        }`}
        aria-current={isActive ? 'page' : undefined}
      >
        {text}
      </Link>
    )
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={panelId}
        className={`flex items-center justify-between w-full py-2 font-mono text-sm tracking-wide transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-light dark:focus-visible:outline-secondary-dark ${
          isActive || childActive
            ? 'text-secondary-light dark:text-secondary-dark font-bold'
            : 'text-text-light dark:text-text-dark hover:text-secondary-light dark:hover:text-secondary-dark'
        }`}
      >
        <span>{text}</span>
        <ChevronDown
          size={14}
          strokeWidth={2}
          aria-hidden="true"
          className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            role="region"
            aria-label={`${text} subpages`}
            initial={reduceMotion ? false : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="pl-3 ml-1 border-l border-neutral-200 dark:border-border-dark mt-1 mb-2 space-y-0.5">
              {dropdown.map((child) => (
                <Link
                  key={child.linkKey}
                  href={child.linkKey}
                  onClick={onLinkClick}
                  className={`flex items-center gap-2 py-1.5 font-mono text-[12px] tracking-wide transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-light dark:focus-visible:outline-secondary-dark ${
                    child.isActive
                      ? 'text-secondary-light dark:text-secondary-dark font-bold'
                      : 'text-text-light/85 dark:text-text-dark/80 hover:text-secondary-light dark:hover:text-secondary-dark'
                  }`}
                  aria-current={child.isActive ? 'page' : undefined}
                >
                  <ChevronRight
                    size={10}
                    strokeWidth={2}
                    aria-hidden="true"
                    className="text-text-light/55 dark:text-text-dark/50"
                  />
                  {child.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
