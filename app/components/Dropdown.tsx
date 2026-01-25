import { ChevronDown } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'

interface DropdownItem {
  label: string
  linkKey: string
  isActive?: boolean
}

interface DropdownProps {
  trigger: string
  items: DropdownItem[]
  isActive?: boolean
}

export default function Dropdown({ trigger, items, isActive }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`${isActive || isOpen ? 'dark:text-primary-dark text-sky-500' : ''} flex items-center gap-1 font-kanit font-medium uppercase text-xs sm:text-sm md:text-base dark:hover:text-primary-dark hover:text-sky-500 duration-200 transition-colors`}
      >
        {trigger}
        <ChevronDown size={14} className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 min-w-48 bg-bg-light dark:bg-bg-dark border border-border-light dark:border-border-dark rounded-[5px] shadow-lg overflow-hidden z-50">
          {items.map((item, index) => (
            <Link
              key={index}
              href={item.linkKey}
              onClick={() => setIsOpen(false)}
              className={`block px-4 py-3 font-kanit font-medium text-sm transition-colors duration-150 border-b border-border-light dark:border-border-dark last:border-b-0 ${
                item.isActive
                  ? 'bg-primary-light dark:bg-primary-dark text-text-light dark:text-text-dark'
                  : 'text-text-light dark:text-text-dark hover:bg-primary-light/10 dark:hover:bg-primary-dark/10'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
