'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

type ChangeType = 'feature' | 'improvement' | 'bug' | 'breaking'
type ImpactLevel = 'low' | 'medium' | 'high'

interface Change {
  type: ChangeType
  title: string
  description: string
  impact: ImpactLevel
}

interface ChangelogEntry {
  version: string
  date: string
  changes: Change[]
}

const changelogData: ChangelogEntry[] = [
  {
    version: '1.5.2',
    date: '2026-01-25',
    changes: [
      {
        type: 'feature',
        title: 'Out of School Learning Section',
        description:
          'Added comprehensive section highlighting the importance of out-of-school learning with modern card-based benefits layout. Includes responsive grid design with glassmorphic styling and hover animations.',
        impact: 'high'
      },
      {
        type: 'feature',
        title: 'Social Sidebar Navigation',
        description:
          'Implemented fixed social media sidebar for mobile/tablet (hidden on lg+). Features vertical "Follow Me" text with animated social icons (Facebook, Twitter, LinkedIn, Website, Instagram) and gradient line animation.',
        impact: 'medium'
      },
      {
        type: 'feature',
        title: 'Custom Facebook SVG Icon',
        description:
          'Created custom Facebook SVG component with dark/light mode support. Accepts size, className, and strokeWidth props for flexible usage throughout the app.',
        impact: 'low'
      },
      {
        type: 'feature',
        title: 'Sponsor Marquee with Custom Animation',
        description:
          'Built custom Framer Motion marquee component for 25 sponsors with integrated logo icons. Removes react-fast-marquee library dependency with smooth continuous scrolling and no gap issues.',
        impact: 'medium'
      },
      {
        type: 'feature',
        title: 'Logo Icon Component',
        description:
          'Created small icon version of ECF logo with tassel and person figure. Responsive sizing (sm, md, lg).',
        impact: 'low'
      },
      {
        type: 'improvement',
        title: 'Mobile Responsive to 330px',
        description:
          'Full responsive design across all new components down to 330px. Added base breakpoints for mobile, improved spacing, padding, and font scaling.',
        impact: 'medium'
      },
      {
        type: 'improvement',
        title: 'Modern Card Design System',
        description:
          'Implemented glassmorphic card styling with backdrop blur, subtle borders, and smooth hover effects. Applied to benefits section for modern aesthetic.',
        impact: 'low'
      }
    ]
  },
  {
    version: '0.1.1',
    date: '2026-01-25',
    changes: [
      {
        type: 'feature',
        title: 'Animated Hero Section with Play Button',
        description:
          'Implemented liquid-like pulsing play button with Framer Motion animations. Added responsive animated text fill effect that scales from 320px to 8rem. Integrated video lightbox modal with smooth spring transitions.',
        impact: 'high'
      },
      {
        type: 'feature',
        title: 'Dark & Light Mode Theme System',
        description:
          'Complete theme system using Tailwind @theme with CSS variables. Implemented colors for primary (yellow/green), secondary (blue/cyan), borders, backgrounds, and text. Added prefers-color-scheme media queries for automatic theme detection.',
        impact: 'high'
      },
      {
        type: 'feature',
        title: 'Mobile Responsive Design (320px+)',
        description:
          'Full responsive design supporting screens as small as 320px. Implemented clamp() for fluid scaling. Responsive typography with text-5xl to text-[128px] scaling. Mobile-first approach with sm, md, lg, xl breakpoints.',
        impact: 'high'
      },
      {
        type: 'feature',
        title: 'Header with Navigation & Dropdowns',
        description:
          'Built sticky header with responsive logo (32-52px widths), navigation links, donate button, and mobile menu. Created Dropdown component with light/dark mode support and smooth animations.',
        impact: 'medium'
      },
      {
        type: 'feature',
        title: 'Redux UI State Management',
        description:
          'Implemented Redux Toolkit with uiSlice for managing modals, lightboxes, and menu states. Created useUI hook for dispatching actions without circular dependencies. Added typed hooks for better TypeScript support.',
        impact: 'medium'
      },
      {
        type: 'improvement',
        title: 'Framer Motion Animations',
        description:
          'Extensive use of Framer Motion for staggered animations, spring transitions, and micro-interactions. Implemented AnimatePresence for smooth enter/exit animations on modals.',
        impact: 'medium'
      }
    ]
  },
  {
    version: '0.1.0',
    date: '2026-01-24',
    changes: [
      {
        type: 'feature',
        title: 'Project Planning & Design',
        description:
          'Defined project scope for Education Comes First website. Created design direction with typography, color palette, and component structure. Planned responsive breakpoints and accessibility features.',
        impact: 'medium'
      },
      {
        type: 'feature',
        title: 'Project Setup & Core Architecture',
        description:
          'Initialized Next.js project with TypeScript. Set up Redux Toolkit with configureStore, custom hooks, and typed selectors. Configured Tailwind CSS v4 with @theme support.',
        impact: 'high'
      },
      {
        type: 'feature',
        title: 'SVG Logo Dark/Light Mode',
        description:
          'Created Picture component to handle SVG logos with automatic dark/light mode switching. Implemented dark version of horizontal logo with lighter colors (#e8ddf5).',
        impact: 'medium'
      },
      {
        type: 'feature',
        title: 'Theme Configuration',
        description:
          'Set up comprehensive theme with color variables (primary, secondary, borders, backgrounds, text), breakpoint for 1150px, and max-width container (1350px).',
        impact: 'medium'
      }
    ]
  }
]

const changeTypeConfig = {
  feature: { color: 'bg-primary-dark/20 border-primary-dark/50 text-primary-dark', label: 'Feature' },
  improvement: { color: 'bg-secondary-dark/20 border-secondary-dark/50 text-secondary-dark', label: 'Improvement' },
  bug: { color: 'bg-red-500/20 border-red-500/50 text-red-400', label: 'Bug Fix' },
  breaking: { color: 'bg-orange-500/20 border-orange-500/50 text-orange-400', label: 'Breaking' }
}

const impactConfig = {
  low: { color: 'bg-green-500/20 text-green-400', label: 'Low' },
  medium: { color: 'bg-yellow-500/20 text-yellow-400', label: 'Medium' },
  high: { color: 'bg-red-500/20 text-red-400', label: 'High' }
}

function ChangelogCard({ change }: { change: Change }) {
  const typeConfig = changeTypeConfig[change.type]
  const impactConfig_ = impactConfig[change.impact]

  return (
    <div className="border-b border-border-subtle dark:border-border-dark py-4 last:border-b-0">
      <div className="flex flex-wrap items-center gap-2 mb-2">
        <span className={`font-mono text-[9px] tracking-[0.15em] uppercase px-2 py-0.5 border ${typeConfig.color}`}>
          {typeConfig.label}
        </span>
        <span className={`font-mono text-[9px] tracking-[0.15em] uppercase px-2 py-0.5 ${impactConfig_.color}`}>
          {impactConfig_.label} Impact
        </span>
      </div>
      <h4 className="font-mono text-sm font-medium text-text-light dark:text-text-dark mb-1">{change.title}</h4>
      <p className="font-mono text-xs text-text-light/55 dark:text-text-dark/50 leading-relaxed">
        {change.description}
      </p>
    </div>
  )
}

function ChangelogVersion({ entry }: { entry: ChangelogEntry }) {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <motion.div
      className="border-l border-border-subtle dark:border-border-dark pl-6 mb-10"
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <button onClick={() => setIsOpen(!isOpen)} className="flex items-center gap-3 mb-4 group">
        <motion.div animate={{ rotate: isOpen ? 0 : -90 }} transition={{ duration: 0.2 }}>
          <ChevronDown
            size={14}
            className="text-text-light/40 dark:text-text-dark/35 group-hover:text-text-light dark:group-hover:text-text-dark transition-colors"
          />
        </motion.div>
        <div className="text-left">
          <h3 className="font-mono text-base font-bold text-text-light dark:text-text-dark">{entry.version}</h3>
          <p className="font-mono text-[10px] text-text-light/40 dark:text-text-dark/35 mt-0.5">{entry.date}</p>
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="border border-border-subtle dark:border-border-dark overflow-hidden"
          >
            <div className="px-4">
              {entry.changes.map((change, idx) => (
                <ChangelogCard key={idx} change={change} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function Changelog() {
  return (
    <div className="bg-bg-light dark:bg-bg-dark min-h-screen">
      <div className="max-w-container mx-auto px-6 xs:px-10 sm:px-16 md:px-24 lg:px-32">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="py-16 xs:py-20 lg:py-24 border-b border-border-subtle dark:border-border-dark mb-12"
        >
          <p
            aria-hidden="true"
            className="font-mono text-[10px] tracking-[0.2em] uppercase text-secondary-light dark:text-secondary-dark mb-3"
          >
            {`// changelog`}
          </p>
          <h1
            className="font-mono font-bold text-text-light dark:text-text-dark leading-none mb-4"
            style={{ fontSize: 'clamp(2.5rem, 8vw, 6rem)' }}
          >
            Changelog
          </h1>
          <p className="font-mono text-[13px] xs:text-sm text-text-light/55 dark:text-text-dark/50 tracking-wide leading-relaxed max-w-md">
            Track all updates, improvements, and fixes to{' '}
            <span className="text-primary-light dark:text-primary-dark">Education Comes First.</span>
          </p>
        </motion.div>

        {/* Entries */}
        <div className="pb-24 xs:pb-32">
          {changelogData.map((entry, idx) => (
            <ChangelogVersion key={idx} entry={entry} />
          ))}
        </div>
      </div>
    </div>
  )
}
