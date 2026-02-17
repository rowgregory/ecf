'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

interface StatItem {
  title: string
  number: string
  description: string
}

const stats: StatItem[] = [
  {
    title: '$367,500',
    number: 'In grants have gone out to ECF partner sites in the fall of 2024',
    description: ''
  },
  {
    title: '2,894',
    number: 'Total members in ECF',
    description: ''
  },
  {
    title: '35,461',
    number: 'Total hours read by members in the fall of 2024',
    description: ''
  },
  {
    title: '33,172',
    number: 'Total hours spent on math by members in the fall of 2024',
    description: ''
  }
]

export default function ByTheNumbers() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, easing: 'easeOut' }
    }
  }

  return (
    <section className="w-full bg-bg-light dark:bg-bg-dark py-12 sm:py-16 md:py-20 lg:py-24 px-3 sm:px-4 md:px-6">
      <div className="max-w-container mx-auto">
        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-12 md:mb-16 pb-8 md:pb-12 border-b border-border-light dark:border-border-dark">
            <motion.h2
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-6xl font-black text-text-light dark:text-white font-kanit"
            >
              By the Numbers
            </motion.h2>
            <motion.a
              variants={itemVariants}
              href="#"
              className="inline-flex items-center gap-2 text-primary-light dark:text-primary-dark transition-colors font-bold text-sm sm:text-base group"
              whileHover={{ x: 4 }}
            >
              See Our Impact
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform font-lato" />
            </motion.a>
          </div>

          {/* Stats List */}
          <motion.div variants={containerVariants} className="space-y-0">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 py-6 md:py-8 px-0 border-b border-border-light/50 dark:border-border-dark/50 last:border-b-0 group hover:bg-black/5 dark:hover:bg-white/5 hover:-mx-4 hover:px-4 transition-all duration-300"
                whileHover={{ paddingLeft: 8, paddingRight: 8 }}
              >
                <motion.div
                  className="text-text-light dark:text-white text-3xl sm:text-4xl md:text-5xl font-black group-hover:text-primary-light dark:group-hover:text-primary-dark transition-colors font-kanit"
                  whileHover={{ x: 4 }}
                >
                  {stat.title}
                </motion.div>

                <div className="text-text-light/70 dark:text-text-dark/70 text-base sm:text-lg col-span-1 sm:col-span-2 font-kanit">
                  {stat.number}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
