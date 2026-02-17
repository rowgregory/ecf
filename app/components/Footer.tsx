'use client'

import { motion } from 'framer-motion'
import { ArrowRight, ArrowUp } from 'lucide-react'

export default function Footer() {
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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="w-full pt-16 sm:pt-20 md:pt-24">
      <div className="max-w-container mx-auto px-3 sm:px-4 md:px-6">
        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          {/* Main Heading */}
          <motion.h2
            variants={itemVariants}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-[140px] text-center font-black text-text-light dark:text-white mb-16 md:mb-20 py-8 md:py-12 border border-border-light dark:border-white/10 rounded-[5px]"
          >
            GET IN TOUCH
          </motion.h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 mb-16 md:mb-20">
            {/* Left Content */}
            <motion.div variants={containerVariants}>
              <motion.p
                variants={itemVariants}
                className="text-lg sm:text-xl md:text-2xl mb-6 md:mb-8 leading-relaxed text-text-light/80 dark:text-white/90"
              >
                Education Comes First 501(C)(3) Nonprofit Organization EIN 87-3478137
              </motion.p>

              <motion.a
                variants={itemVariants}
                href="mailto:info@educationcomfirst.org"
                className="text-lg sm:text-xl md:text-2xl font-semibold underline hover:text-primary-light dark:hover:text-primary-dark transition-colors text-text-light dark:text-white"
                whileHover={{ x: 4 }}
              >
                info@educationcomfirst.org
              </motion.a>
            </motion.div>

            {/* Right Links Grid */}
            <motion.div variants={containerVariants} className="grid grid-cols-2 gap-6 md:gap-8">
              {[
                { label: 'Facebook', href: '#' },
                { label: 'Partners', href: '#' },
                { label: 'Donate', href: '#' }
              ].map((link, idx) => {
                return (
                  <motion.a
                    key={idx}
                    variants={itemVariants}
                    href={link.href}
                    className="border border-border-light dark:border-white/10 hover:border-border-light/50 dark:hover:border-white/30 rounded-lg p-6 sm:p-8 flex items-center justify-between group transition-all duration-300"
                    whileHover={{ y: -4 }}
                  >
                    <span className="text-base sm:text-lg md:text-xl font-semibold group-hover:text-primary-light dark:group-hover:text-primary-dark transition-colors text-text-light dark:text-white">
                      {link.label}
                    </span>
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </motion.a>
                )
              })}
            </motion.div>
          </div>

          {/* Divider */}
          <motion.div
            variants={itemVariants}
            className="h-px bg-linear-to-r from-border-light to-border-light dark:from-white/0 dark:via-white/20 dark:to-white/0 mb-12 md:mb-16"
          />
        </motion.div>
      </div>

      {/* Bottom Footer */}
      <motion.div
        variants={containerVariants}
        className="bg-bg-light dark:bg-bg-dark py-8 border-t border-border-light dark:border-border-dark"
      >
        <div className="max-w-container w-full mx-auto px-3 sm:px-4 md:px-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <motion.div variants={itemVariants} className="text-sm sm:text-base text-text-light dark:text-text-dark/70">
            <p>
              Copyright © 2026{' '}
              <span className="text-primary-light dark:text-primary-dark font-semibold">Education Comes First</span>.
              All rights reserved.
            </p>
            <p className="mt-2">
              Built by <span className="text-primary-light dark:text-primary-dark font-semibold">Sqysh</span>
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="flex gap-6 sm:gap-8">
            <a
              href="#"
              className="text-sm sm:text-base text-text-light dark:text-text-dark/70 hover:text-text-light/80 dark:hover:text-text-dark transition-colors"
            >
              Terms & Condition
            </a>
            <a
              href="#"
              className="text-sm sm:text-base text-text-light dark:text-text-dark/70 hover:text-text-light/80 dark:hover:text-text-dark transition-colors"
            >
              Privacy Policy
            </a>
          </motion.div>

          <motion.button
            variants={itemVariants}
            onClick={scrollToTop}
            className="w-10 h-10 sm:w-12 sm:h-12 bg-primary-light dark:bg-primary-dark text-black rounded-lg flex items-center justify-center transition-all duration-300 self-end sm:self-auto cursor-pointer"
            whileHover={{ scale: 1.1, y: -4 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Scroll to top"
          >
            <ArrowUp size={20} />
          </motion.button>
        </div>
      </motion.div>
    </footer>
  )
}
