'use client'

import { motion } from 'framer-motion'

export default function RealStories() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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
    <section className="w-full py-12 sm:py-16 md:py-20 lg:py-24 px-3 sm:px-4 md:px-6">
      <div className="max-w-container mx-auto">
        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <div className="flex items-center">
            {/* Left Content */}
            <motion.div variants={containerVariants} className="flex flex-col justify-center">
              <motion.div variants={itemVariants} className="flex items-center mb-6 md:mb-8. gap-4">
                <motion.div
                  className="h-px flex-1 max-w-20 bg-primary-light dark:bg-primary-dark"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  style={{ originX: 'left' }}
                />
                <p className="text-primary-light dark:text-primary-dark font-semibold text-sm sm:text-base md:text-2xl tracking-wide uppercase mb-2 font-caveat">
                  Real Stories, Real Impact!
                </p>
              </motion.div>

              <motion.h2
                variants={itemVariants}
                className="text-4xl sm:text-5xl md:text-6xl font-black text-text-light dark:text-white mb-8 md:mb-10 leading-tight font-kanit"
              >
                Hear from the Oyster Bay ECF kids themselves how our reading and math programs are helping them grow!
              </motion.h2>

              <motion.a
                variants={itemVariants}
                href="#"
                className="inline-block bg-primary-light dark:bg-primary-dark text-black dark:text-black px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-sm sm:text-base hover:shadow-lg transition-all duration-300 w-fit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Watch the Video
              </motion.a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
