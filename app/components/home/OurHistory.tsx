'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Picture from '../common/Picture'

export default function OurHistory() {
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

  const stats = [
    { number: '20+', label: 'Years of Vision' },
    { number: '2,800+', label: 'Youth Served' },
    { number: '26', label: 'Partner Sites' }
  ]

  return (
    <section className="w-full bg-bg-light dark:bg-bg-dark py-12 sm:py-16 md:py-40 px-3 sm:px-4 md:px-6">
      <div className="max-w-container mx-auto">
        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          {/* Header */}
          <motion.div variants={itemVariants} className="mb-12 md:mb-16 text-center">
            <motion.div className="flex items-center justify-center gap-4 mb-6">
              <motion.div
                className="h-px flex-1 max-w-20 bg-primary-light dark:bg-primary-dark"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }}
                style={{ originX: 'left' }}
              />
              <p className="text-primary-light dark:text-primary-dark font-bold text-2xl uppercase tracking-widest whitespace-nowrap font-caveat">
                Since 2021
              </p>
              <motion.div
                className="h-px flex-1 max-w-20 bg-primary-light dark:bg-primary-dark"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.6 }}
                style={{ originX: 'right' }}
              />
            </motion.div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-text-light dark:text-text-dark font-kanit">
              Our Story
            </h2>
          </motion.div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
            {/* Large Image - Spans 2 columns on desktop */}
            <motion.div
              variants={itemVariants}
              className="lg:col-span-2 relative overflow-hidden rounded-3xl shadow-xl h-80 sm:h-96 lg:h-full min-h-96"
              whileHover={{ y: -4 }}
            >
              <Picture
                src="/images/img-12.jpg"
                alt="Conway Family"
                className="w-full h-full object-cover"
                priority={false}
                width={800}
                height={600}
              />
            </motion.div>

            {/* Stats Column */}
            <motion.div variants={containerVariants} className="flex flex-col gap-4">
              {stats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="bg-white/50 dark:bg-white/5 backdrop-blur-sm border border-border-light dark:border-border-dark rounded-2xl p-6 sm:p-8 hover:bg-white/60 dark:hover:bg-white/10 transition-all"
                  whileHover={{ y: -4 }}
                >
                  <div className="text-3xl sm:text-4xl font-black text-primary-light dark:text-primary-dark mb-2">
                    {stat.number}
                  </div>
                  <p className="text-text-light/70 dark:text-text-dark/70 text-sm sm:text-base font-semibold">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Content Section */}
          <motion.div
            variants={containerVariants}
            className="bg-white/50 dark:bg-white/5 backdrop-blur-sm border border-border-light dark:border-border-dark rounded-3xl p-8 sm:p-10 md:p-12"
          >
            <motion.p
              variants={itemVariants}
              className="text-text-light/80 dark:text-text-dark/80 text-sm sm:text-base md:text-lg leading-relaxed mb-6 max-w-3xl"
            >
              The vision for Education Comes First began over 20 years ago with Mike, Phyllis, and Christian Conway, who
              dreamed of creating equal educational opportunities for children in under-resourced communities. In 2021,
              with Brian and Grace, that dream became reality.
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="text-text-light/80 dark:text-text-dark/80 text-sm sm:text-base md:text-lg leading-relaxed mb-8 max-w-3xl"
            >
              Today, we empower 2,800+ youth across 26 partner sites in five states, helping them become leaders, stay
              on track to graduate, and explore meaningful futures through college, trades, or other pathways.
            </motion.p>

            <motion.a
              variants={itemVariants}
              href="/our-history"
              className="inline-flex items-center gap-2 text-primary-light dark:text-primary-dark font-bold hover:text-primary-dark dark:hover:text-primary-light transition-colors group"
              whileHover={{ x: 4 }}
            >
              Explore Our Full History
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
