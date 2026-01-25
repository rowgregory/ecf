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
    <motion.div
      className="border border-border-light dark:border-border-dark rounded-lg p-4 hover:border-primary-dark/50 dark:hover:border-primary-light/50 transition-colors"
      whileHover={{ y: -2 }}
    >
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
        <div className="flex flex-wrap gap-2">
          <span className={`px-2 py-1 rounded text-xs font-semibold border ${typeConfig.color}`}>
            {typeConfig.label}
          </span>
          <span className={`px-2 py-1 rounded text-xs font-semibold ${impactConfig_.color}`}>
            {impactConfig_.label} Impact
          </span>
        </div>
      </div>

      <h4 className="text-lg font-bold text-text-light dark:text-text-dark mb-2">{change.title}</h4>
      <p className="text-text-light/80 dark:text-text-dark/80 text-sm leading-relaxed">{change.description}</p>
    </motion.div>
  )
}

function ChangelogVersion({ entry }: { entry: ChangelogEntry }) {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <motion.div
      className="mb-8 border-l-2 border-primary-dark/30 dark:border-primary-light/30 pl-6"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
    >
      <button onClick={() => setIsOpen(!isOpen)} className="flex items-center gap-3 mb-4 group">
        <motion.div animate={{ rotate: isOpen ? 0 : -90 }} transition={{ duration: 0.2 }}>
          <ChevronDown size={24} className="text-primary-dark dark:text-primary-light" />
        </motion.div>
        <div className="text-left">
          <h3 className="text-2xl font-bold text-text-light dark:text-text-dark">{entry.version}</h3>
          <p className="text-sm text-text-light/60 dark:text-text-dark/60">{entry.date}</p>
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            {entry.changes.map((change, idx) => (
              <ChangelogCard key={idx} change={change} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function Changelog() {
  return (
    <div className="bg-bg-light dark:bg-bg-dark min-h-screen py-12 md:py-16 px-3 sm:px-4 md:px-6">
      <div className="max-w-container mx-auto">
        {/* Header */}
        <motion.div className="mb-12" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl md:text-5xl font-black text-text-light dark:text-text-dark mb-3">Changelog</h1>
          <p className="text-text-light/80 dark:text-text-dark/80 text-lg max-w-2xl">
            Track all updates, improvements, and bug fixes to Education Comes First.
          </p>
        </motion.div>

        {/* Changelog Entries */}
        <div>
          {changelogData.map((entry, idx) => (
            <ChangelogVersion key={idx} entry={entry} />
          ))}
        </div>
      </div>
    </div>
  )
}
