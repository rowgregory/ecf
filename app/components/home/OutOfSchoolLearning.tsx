'use client'

import { motion } from 'framer-motion'
import { Scale, TrendingUp, Brain, Users } from 'lucide-react'

interface BenefitItem {
  icon: React.ReactNode
  title: string
  description: string
}

const benefits: BenefitItem[] = [
  {
    icon: <Scale className="w-8 h-8 sm:w-10 sm:h-10" strokeWidth={1.5} />,
    title: 'Closes Achievement Gaps',
    description: ''
  },
  {
    icon: <TrendingUp className="w-8 h-8 sm:w-10 sm:h-10" strokeWidth={1.5} />,
    title: 'Prevents Learning Loss',
    description: ''
  },
  {
    icon: <Brain className="w-8 h-8 sm:w-10 sm:h-10" strokeWidth={1.5} />,
    title: 'Inspires a Love of Learning',
    description: ''
  },
  {
    icon: <Users className="w-8 h-8 sm:w-10 sm:h-10" strokeWidth={1.5} />,
    title: 'Builds Confidence & Social Skills',
    description: ''
  }
]

export default function OutOfSchoolLearning() {
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
    <section className="w-full py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="max-w-container mx-auto bg-bg-light dark:bg-bg-dark p-15 rounded-[5px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
          {/* Left Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col justify-center"
          >
            <motion.h2
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-6xl font-black text-text-light dark:text-text-dark mb-6 md:mb-8 leading-tight font-kanit"
            >
              Out of School Learning Matters
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-text-light/80 dark:text-text-dark/80 text-base sm:text-lg leading-relaxed mb-6"
            >
              Education doesn&apos;t end after the school day is over, children are always learning. Quality after
              school programs alongside summer camp day programs help students excel academically, build confidence in
              themselves, and develop essential life skills. Research has shown that students in these programs have
              better academic performance, graduate at a higher rate, and build a love of life long learning.
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="text-text-light/80 dark:text-text-dark/80 text-base sm:text-lg leading-relaxed mb-8"
            >
              When we invest in after school learning, we are building a brighter future for our youth.
            </motion.p>

            <motion.a
              variants={itemVariants}
              href="#"
              className="inline-block text-text-light dark:text-text-dark font-bold text-base sm:text-lg border-b-2 border-primary-light dark:border-primary-dark hover:text-primary-light dark:hover:text-primary-dark transition-colors w-fit"
            >
              More about Education Comes First
            </motion.a>
          </motion.div>

          {/* Right Benefits */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6"
          >
            {benefits.map((benefit, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ y: -4 }}
                className="bg-white/5 dark:bg-white/5 backdrop-blur-sm border border-border-light/20 dark:border-border-dark/20 hover:border-primary-light/50 dark:hover:border-primary-dark/50 rounded-xl p-5 sm:p-6 transition-all duration-300"
              >
                <motion.div
                  className="text-primary-light dark:text-primary-dark mb-4 inline-block p-2.5 sm:p-3 bg-primary-light/10 dark:bg-primary-dark/10 rounded-lg"
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  {benefit.icon}
                </motion.div>

                <h3 className="text-base sm:text-lg font-bold text-text-light dark:text-text-dark mb-2">
                  {benefit.title}
                </h3>
                {benefit.description && (
                  <p className="text-text-light/70 dark:text-text-dark/70 text-sm">{benefit.description}</p>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
