'use client'

import { motion, useReducedMotion } from 'framer-motion'
import ScrollDown from '../ui/buttons/ScrollDown'
import SocialSidebar from '../features/home/SocialSidebar'
import { containerVariants, itemVariants } from '@/app/lib/constants/motion.constants'
import AnimatedTextFill from '../features/home/AnimatedTextFill'
import PlayButton from '../ui/buttons/PlayButton'

export const Hero = () => {
  const reduceMotion = useReducedMotion()
  return (
    <section
      className="
        w-full overflow-hidden relative flex justify-center
        min-h-[80svh] sm:min-h-[85svh] md:min-h-[90svh] lg:min-h-svh
        max-h-225
      "
      aria-label="Welcome to Education Comes First"
    >
      {/* Video background — decorative, marked accordingly */}
      <motion.video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
        tabIndex={-1}
        className="
          absolute inset-0 w-full h-full object-cover pointer-events-none
          scale-110 sm:scale-115 md:scale-125 lg:scale-130
        "
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <source src="/videos/ecf-hero.mp4" type="video/mp4" />
      </motion.video>

      {/* Overlay gradient — improves contrast of foreground text over video */}
      <motion.div
        aria-hidden="true"
        className="
          absolute inset-0 pointer-events-none
          bg-linear-to-b sm:bg-linear-to-r
          from-black/60 via-black/30 to-black/60
          dark:from-black/70 dark:via-black/50 dark:to-black/70
        "
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />

      {/* Decorative sidebars — hidden on very small screens to avoid overlapping text */}
      <div className="hidden md:block">
        <ScrollDown />
        <SocialSidebar />
      </div>

      {/* Content */}
      <div className="max-w-container w-full px-4 xs:px-5 sm:px-6 md:px-8 lg:px-10 relative z-10">
        <motion.div
          className="
            flex flex-col justify-center items-start
            min-h-[80svh] sm:min-h-[85svh] md:min-h-[90svh] lg:min-h-svh
            max-h-225
            py-12 xs:py-16 sm:py-20 md:py-24
            gap-6 xs:gap-7 sm:gap-8 md:gap-10
          "
          variants={reduceMotion ? undefined : containerVariants}
          initial={reduceMotion ? false : 'hidden'}
          animate="visible"
        >
          {/* Text block */}
          <motion.div variants={reduceMotion ? undefined : itemVariants} className="w-full">
            <motion.h1
              className="
                text-white font-black text-balance
                text-[clamp(2rem,9vw,8rem)]
                leading-[1.05] sm:leading-[1.08] md:leading-[1.1]
                tracking-tight
                mb-4 xs:mb-5 sm:mb-6
              "
              variants={reduceMotion ? undefined : itemVariants}
            >
              Empowering Youth through{' '}
              <motion.span
                className="inline-block align-baseline"
                initial={reduceMotion ? false : { opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.5, ease: 'easeOut' }}
              >
                <AnimatedTextFill />
              </motion.span>
            </motion.h1>

            <motion.p
              className="
                text-white/95
                text-sm xs:text-base sm:text-lg md:text-xl
                max-w-[40ch] sm:max-w-xl md:max-w-2xl
                leading-relaxed
              "
              variants={reduceMotion ? undefined : itemVariants}
            >
              Education Comes First partners with nonprofit youth organizations to ensure learning continues beyond the
              classroom.
            </motion.p>
          </motion.div>

          {/* Play button */}
          <motion.div
            variants={reduceMotion ? undefined : itemVariants}
            whileHover={reduceMotion ? undefined : { scale: 1.05 }}
            whileTap={reduceMotion ? undefined : { scale: 0.95 }}
          >
            <PlayButton />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
