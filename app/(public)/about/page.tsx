'use client'

import Picture from '@/app/components/common/Picture'
import { motion } from 'framer-motion'
import { Book, Calculator, Users, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const focusAreas = [
  {
    icon: Book,
    title: 'Literacy',
    number: '01',
    description: 'Learning to read is a critical milestone that serves as the foundation for academic success.',
    bullets: [
      'Ensure literacy achievement by age 10',
      'Foster a lifelong love of learning through reading',
      'Help children discover diverse interests'
    ]
  },
  {
    icon: Calculator,
    title: 'Mathematics',
    number: '02',
    description: 'Mathematical education develops essential analytical and reasoning skills for critical thinking.',
    bullets: [
      'Develop analytical thinking and reasoning abilities',
      'Build critical thinking skills about the world',
      'Teach logical problem-solving approaches'
    ]
  },
  {
    icon: Users,
    title: 'Social Skills',
    number: '03',
    description:
      'Social development enables children to build meaningful relationships and maintain positive mental health.',
    bullets: [
      'Learn and practice healthy social behaviors',
      'Support mental health and personal interests',
      'Develop strong, positive relationship skills'
    ]
  }
]

const AboutECF = () => {
  return (
    <div className="min-h-screen text-text-light dark:text-text-dark">
      {/* Hero Section - Seamless */}
      <section className="relative py-16 sm:py-20 lg:py-24">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-12">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="font-kanit text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 text-text-light dark:text-text-dark"
            >
              About Us
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center justify-center gap-2 sm:gap-3 text-base sm:text-lg"
            >
              <Link
                href="/"
                className="font-lato text-text-light/60 dark:text-text-dark/60 hover:text-text-light dark:hover:text-text-dark transition-colors"
              >
                Home
              </Link>
              <span className="text-text-light/40 dark:text-text-dark/40">/</span>
              <span className="font-caveat text-xl sm:text-2xl text-secondary-light dark:text-secondary-dark">
                About Us
              </span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 sm:py-20 lg:py-32 bg-bg-light dark:bg-bg-dark">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-start">
            {/* Left - Title & Label */}
            <div className="lg:col-span-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="lg:sticky lg:top-24"
              >
                <span className="font-caveat text-xl sm:text-2xl text-secondary-light dark:text-secondary-dark block mb-3">
                  Our Mission
                </span>
                <h2 className="font-kanit text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4">
                  Inspiring Potential,{' '}
                  <span className="bg-linear-to-r from-primary-light to-secondary-light dark:from-primary-dark dark:to-secondary-dark bg-clip-text text-transparent">
                    Building Futures
                  </span>
                </h2>
                <div className="h-1 w-20 bg-primary-light dark:bg-primary-dark" />
                <div className="relative w-fit h-fit group">
                  <motion.div
                    whileTap={{ scale: 0.95 }}
                    className="w-40 h-40 sm:w-48 sm:h-48 rounded-full bg-primary-light dark:bg-primary-dark flex items-center justify-center cursor-pointer group relative z-10 overflow-hidden shadow-lg mt-12"
                  >
                    {' '}
                    <div className="relative z-10 text-center">
                      <ArrowRight className="w-6 h-6 text-text-light mx-auto mb-2 transition-transform" />
                      <span className="font-lato font-semibold text-text-light text-sm">Learn More</span>
                    </div>
                  </motion.div>
                  <motion.div
                    whileTap={{ scale: 0.95 }}
                    className="w-40 h-40 sm:w-48 sm:h-48 absolute -bottom-2 -left-2 rounded-full border-2 border-primary-light dark:border-primary-dark shadow-lg group-hover:-translate-y-5 duration-500 ease-in-out"
                  ></motion.div>
                </div>
              </motion.div>
            </div>

            {/* Right - Content */}
            <div className="lg:col-span-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-6 sm:space-y-8"
              >
                <div className="space-y-4 sm:space-y-6">
                  <p className="font-lato text-base sm:text-lg lg:text-xl leading-relaxed text-text-light/80 dark:text-text-dark/80">
                    We at Education Comes First firmly stand by this. ECF is fueled with a passionate intent to provide
                    the highest quality educational opportunities to underprivileged youth.
                  </p>
                  <p className="font-lato text-base sm:text-lg lg:text-xl leading-relaxed text-text-light/80 dark:text-text-dark/80">
                    Our mission is to work with and support organizations with grant funding whose target is ending
                    learning poverty.
                  </p>
                  <p className="font-lato text-base sm:text-lg lg:text-xl leading-relaxed text-text-light/80 dark:text-text-dark/80">
                    Education Comes First&apos;s mission is to inspire kids to realize the depth of their potential by
                    providing all the tools needed to further both their academic and social education outside of the
                    classroom, seeing them achieve their full potential.
                  </p>
                </div>

                {/* Quote Callout */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="relative pl-6 sm:pl-8 py-6 sm:py-8 border-l-4 border-primary-light dark:border-primary-dark bg-accent dark:bg-accent-dark rounded-r-xl"
                >
                  <div className="absolute -left-3 top-4 w-6 h-6 rounded-full bg-primary-light dark:bg-primary-dark" />
                  <p className="font-kanit text-xl sm:text-2xl italic text-text-light dark:text-text-dark mb-3">
                    &quot;Ending Learning Poverty&quot;
                  </p>
                  <p className="font-lato text-sm text-text-light/60 dark:text-text-dark/60 uppercase tracking-wider">
                    Our guiding principle
                  </p>
                </motion.div>

                {/* Stats Row */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8 pt-8 border-t border-border-light dark:border-border-dark"
                >
                  <div>
                    <div className="font-kanit text-3xl sm:text-4xl font-bold text-secondary-light dark:text-secondary-dark mb-2">
                      500+
                    </div>
                    <div className="font-lato text-sm text-text-light/60 dark:text-text-dark/60">
                      Students Supported
                    </div>
                  </div>
                  <div>
                    <div className="font-kanit text-3xl sm:text-4xl font-bold text-secondary-light dark:text-secondary-dark mb-2">
                      $1M+
                    </div>
                    <div className="font-lato text-sm text-text-light/60 dark:text-text-dark/60">Grants Awarded</div>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <div className="font-kanit text-3xl sm:text-4xl font-bold text-secondary-light dark:text-secondary-dark mb-2">
                      95%
                    </div>
                    <div className="font-lato text-sm text-text-light/60 dark:text-text-dark/60">Success Rate</div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Opportunities Section - Modern List Style */}
      <section className="py-16 sm:py-20 lg:py-32 bg-accent dark:bg-accent-dark relative overflow-hidden">
        <div className="max-w-container mx-auto flex items-center flex-col px-4 sm:px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center flex-col mb-20"
          >
            <span className="font-caveat text-xl sm:text-2xl text-secondary-light dark:text-secondary-dark block mb-3">
              What We Offer
            </span>
            <h2 className="font-kanit text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4">
              Opportunities Rise,{' '}
              <span className="bg-linear-to-r from-primary-light to-secondary-light dark:from-primary-dark dark:to-secondary-dark bg-clip-text text-transparent">
                Where Kids Thrive
              </span>
            </h2>
            <div className="h-1 w-20 bg-primary-light dark:bg-primary-dark" />
          </motion.div>

          <div className="grid grid-cols-3 gap-7">
            {focusAreas.map((area, index) => (
              <motion.div
                key={area.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative overflow-hidden group border border-border-light dark:border-border-dark py-5 hover:bg-bg-light/50 dark:hover:bg-bg-dark/50 transition-colors px-4.5 rounded-lg group hover:border-secondary-light hover:dark:border-secondary-dark"
              >
                <div className="flex flex-col relative overflow-hidden">
                  {/* Title */}
                  <h3 className="mb-6 font-kanit text-2xl sm:text-3xl md:text-[40px] font-bold text-text-light dark:text-text-dark group-hover:text-secondary-light dark:group-hover:text-secondary-dark transition-colors">
                    {area.title}
                  </h3>

                  {/* Description */}
                  <p className="mb-7.5 font-lato text-base sm:text-lg leading-relaxed text-text-light/70 dark:text-text-dark/70 max-w-2xl">
                    {area.description}
                  </p>

                  {/* Bullet Points */}
                  <ul className="space-y-3">
                    {area.bullets.map((bullet, bulletIndex) => (
                      <li key={bulletIndex} className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-secondary-light dark:bg-secondary-dark mt-2 shrink-0" />
                        <span className="font-lato text-sm text-text-light/70 dark:text-text-dark/70">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                {/* View Icon */}
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="absolute -bottom-5 -right-5 z-100 w-12 h-12 sm:w-14 sm:h-14 bg-white dark:bg-border-dark rounded-full flex items-center justify-center cursor-pointer group-hover:bg-secondary-light dark:group-hover:bg-secondary-dark transition-all"
                ></motion.div>
              </motion.div>
            ))}
          </div>

          {/* Bottom Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 lg:mt-16 max-w-3xl lg:ml-[calc(33.333%+2rem)]"
          >
            <p className="font-lato text-base sm:text-lg leading-relaxed text-text-light/70 dark:text-text-dark/70">
              Education Comes First offers a wide variety of resources such as supplemental education, additional
              funding to enhance learning spaces with literary tools, advanced technology, and educational equipment.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Learning Poverty Section */}
      <section className="py-16 sm:py-20 lg:py-32 bg-accent dark:bg-accent-dark relative overflow-hidden">
        {/* Decorative Background Element */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-linear-to-l from-primary-light/10 to-transparent dark:from-primary-dark/5 pointer-events-none" />

        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-12 relative">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-center">
            {/* Image - Larger, more prominent */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-7 order-2 lg:order-1"
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-linear-to-br from-primary-light/30 to-secondary-light/30 dark:from-primary-dark/20 dark:to-secondary-dark/20 rounded-3xl blur-2xl" />
                <div className="relative aspect-16/10 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">
                  <Picture
                    priority={false}
                    src="https://cdn.prod.website-files.com/64d30483ab274b8194387d0b/64ffa31dd2ad81a9d4102fdf_bgcl-kids-playing.jpg"
                    alt="Kids playing math game with teacher"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />

                  {/* Floating Stat Card */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="absolute bottom-6 left-6 bg-bg-light dark:bg-bg-dark backdrop-blur-sm rounded-xl p-4 sm:p-6 shadow-xl border border-border-light dark:border-border-dark"
                  >
                    <div className="font-kanit text-3xl sm:text-4xl font-bold mb-1">10 yrs</div>
                    <div className="font-lato text-sm text-text-light/70 dark:text-text-dark/70">
                      Critical Reading Age
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Text Content - Compact, powerful */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-5 order-1 lg:order-2 space-y-6"
            >
              <div>
                <span className="font-caveat text-xl sm:text-2xl text-secondary-light dark:text-secondary-dark block mb-3">
                  The Challenge
                </span>
                <h2 className="font-kanit text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4">
                  Ending Learning{' '}
                  <span className="bg-linear-to-r from-primary-light to-secondary-light dark:from-primary-dark dark:to-secondary-dark bg-clip-text text-transparent">
                    Poverty
                  </span>
                </h2>
                <div className="h-1 w-20 bg-primary-light dark:bg-primary-dark" />
              </div>

              <p className="font-lato text-base sm:text-lg leading-relaxed text-text-light/80 dark:text-text-dark/80">
                Learning poverty means being unable to read and understand a simple text by age 10. We believe we can
                help fill the opportunity gap by supporting out-of-school organizations that are established as youth
                development professionals.
              </p>

              {/* Stats Mini Grid */}
              <div className="grid grid-cols-2 gap-4 py-6 border-y border-border-light dark:border-border-dark">
                <div>
                  <div className="font-kanit text-2xl sm:text-3xl font-bold text-text-light dark:text-text-dark mb-1">
                    60%
                  </div>
                  <div className="font-lato text-xs sm:text-sm text-text-light/60 dark:text-text-dark/60">
                    Global Rate
                  </div>
                </div>
                <div>
                  <div className="font-kanit text-2xl sm:text-3xl font-bold text-text-light dark:text-text-dark mb-1">
                    100K+
                  </div>
                  <div className="font-lato text-xs sm:text-sm text-text-light/60 dark:text-text-dark/60">
                    Kids Affected
                  </div>
                </div>
              </div>

              <motion.a
                href="/contact-us"
                whileHover={{ scale: 1.02, x: 4 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-3 bg-secondary-light dark:bg-secondary-dark text-white font-lato font-semibold text-sm sm:text-base px-8 py-4 rounded-[5px] shadow-lg hover:shadow-xl transition-all group"
              >
                <span>Help Fill the Gap</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-accent/30 dark:bg-accent-dark/30">
        <div className="mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-linear-to-br from-primary-light to-secondary-light dark:from-primary-dark dark:to-secondary-dark p-8 sm:p-12 lg:p-20 text-center"
          >
            <h2 className="font-kanit text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-text-light dark:text-text-dark mb-4 sm:mb-6">
              Want to get involved with ECF?
            </h2>
            <p className="font-lato text-base sm:text-lg md:text-xl text-text-light/90 dark:text-text-dark/90 mb-6 sm:mb-8 max-w-2xl mx-auto">
              Contact us if you&apos;d like to support, partner, or become a sponsor.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 sm:gap-3 bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark font-lato font-semibold text-sm sm:text-base md:text-lg px-6 sm:px-10 py-3 sm:py-4 md:py-5 rounded-full shadow-xl hover:shadow-2xl transition-all"
              >
                <span>Contact Us</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default AboutECF
