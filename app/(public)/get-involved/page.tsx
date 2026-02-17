'use client'

import Picture from '@/app/components/common/Picture'
import { motion } from 'framer-motion'
import { Heart, Users, Megaphone, BookOpen, Shield, Star, User, Zap, CheckCircle } from 'lucide-react'
import Link from 'next/link'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, easing: 'easeOut' } }
}

const waysToGive = [
  {
    icon: Heart,
    title: 'Donate',
    description:
      'Make a one-time or monthly gift to provide essential educational programs, tutoring, and resources to children in need.'
  },
  {
    icon: Users,
    title: 'Corporate Partnerships',
    description:
      'Partner with ECF through sponsorships, in-kind donations, matching gifts, or employee volunteer programs.'
  },
  {
    icon: Zap,
    title: 'Sponsor a Site',
    description:
      'Fund an ECF program in your community for a trimester or full year, ensuring local children receive resources.'
  },
  {
    icon: BookOpen,
    title: 'Grants & Foundations',
    description:
      'We welcome support from foundations and grant-makers to expand our programs and reach more young learners.'
  },
  {
    icon: Shield,
    title: 'Planned Giving',
    description: 'Include ECF in your will or estate planning to leave a lasting impact on future generations.'
  },
  {
    icon: Megaphone,
    title: 'Fundraise for ECF',
    description:
      'Host an event, run a fundraiser, or start a peer-to-peer campaign to help bring educational opportunities to children.'
  }
]

const waysToInvolve = [
  'Become a Volunteer – Share your skills and time to support local youth programs.',
  'Become a Corporate Partner – Engage your business in making a real difference.',
  'Start a Fundraiser – Create an online or community event to raise awareness and support.',
  'Spread the Word – Follow us on social media and share our mission with your network.'
]

const impact = [
  { icon: BookOpen, text: 'Provide tutoring and academic support in reading and math.' },
  { icon: Shield, text: 'Create safe and enriching out-of-school learning environments.' },
  { icon: Star, text: "Offer mental health resources to support students' well-being." },
  { icon: User, text: 'Expand our reach to underserved communities across the country.' }
]

export default function HowToGetInvolved() {
  return (
    <div className="w-full bg-bg-light dark:bg-bg-dark">
      {/* Hero Section */}
      <section className="w-full bg-white dark:bg-black py-16 sm:py-20 md:py-24 lg:py-30 px-3 sm:px-4 md:px-6">
        <div className="max-w-container mx-auto">
          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <div className="flex flex-col items-center justify-center text-center">
              <motion.h1
                variants={itemVariants}
                className="text-5xl sm:text-6xl font-black text-text-light dark:text-white leading-tight"
              >
                How to Get Involved
              </motion.h1>

              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-base sm:text-lg md:text-2xl"
              >
                <span className="text-text-light/70 dark:text-white/70">
                  <Link href="/">Home /</Link>
                </span>
                <span className="text-primary-light dark:text-primary-dark font-caveat italic text-2xl">
                  How to Get Involved
                </span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Support & Impact Section */}
      <section className="w-full py-12 sm:py-16 md:py-20 px-3 sm:px-4 md:px-6">
        <div className="max-w-container mx-auto">
          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {/* Split Hero */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center mb-20 md:mb-32">
              {/* Left - Text */}
              <motion.div variants={containerVariants} className="flex flex-col justify-center">
                <motion.p
                  variants={itemVariants}
                  className="text-primary-light dark:text-primary-dark font-bold text-sm uppercase tracking-widest mb-4"
                >
                  Make an Impact
                </motion.p>

                <motion.h2
                  variants={itemVariants}
                  className="text-5xl sm:text-6xl md:text-7xl font-black text-text-light dark:text-text-dark mb-6 leading-tight"
                >
                  Support Education Comes First
                </motion.h2>

                <motion.p
                  variants={itemVariants}
                  className="text-text-light/80 dark:text-text-dark/80 text-lg sm:text-xl leading-relaxed mb-8"
                >
                  At ECF, we believe every child deserves quality education. We partner with nonprofit youth
                  organizations to uphold high educational standards, boosting confidence, social-emotional well-being,
                  and a love for learning—especially in reading and math.
                </motion.p>

                <motion.p
                  variants={itemVariants}
                  className="text-text-light/80 dark:text-text-dark/80 text-lg sm:text-xl leading-relaxed mb-10"
                >
                  With your support, we can expand our reach and impact more young lives across the United States.
                </motion.p>

                <motion.div variants={containerVariants} className="flex flex-col sm:flex-row gap-4 w-fit">
                  <motion.a
                    variants={itemVariants}
                    href="/contact-us"
                    className="inline-block bg-primary-light dark:bg-primary-dark text-black px-8 py-4 rounded-xl font-bold text-base hover:shadow-lg transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Donate Now
                  </motion.a>
                  <motion.a
                    variants={itemVariants}
                    href="#ways-to-give"
                    className="inline-block border-2 border-text-light/30 dark:border-text-dark/30 text-text-light dark:text-text-dark px-8 py-4 rounded-xl font-bold text-base hover:border-primary-light dark:hover:border-primary-dark transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Learn More
                  </motion.a>
                </motion.div>
              </motion.div>

              {/* Right - Image */}
              <motion.div
                variants={itemVariants}
                className="relative overflow-hidden rounded-2xl h-96 md:h-full min-h-96"
                whileHover={{ y: -8 }}
              >
                <Picture
                  src="/images/img-17.jpg"
                  alt="Kids Learning"
                  className="w-full h-full object-cover"
                  priority={false}
                  width={800}
                  height={800}
                />
              </motion.div>
            </div>

            {/* Impact Stats Grid */}
            <motion.div variants={containerVariants} className="mb-20 md:mb-32">
              <motion.h2
                variants={itemVariants}
                className="text-4xl sm:text-5xl md:text-6xl font-black text-text-light dark:text-text-dark mb-16 text-center"
              >
                Your Impact
              </motion.h2>

              <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                {impact.map((item, idx) => {
                  const Icon = item.icon
                  return (
                    <motion.div
                      key={idx}
                      variants={itemVariants}
                      className="group bg-white/40 dark:bg-white/5 backdrop-blur-md border border-border-light/50 dark:border-border-dark/50 rounded-xl p-8 sm:p-10 hover:bg-white/60 dark:hover:bg-white/10 hover:border-primary-light/50 dark:hover:border-primary-dark/50 transition-all"
                      whileHover={{ y: -6 }}
                    >
                      <Icon
                        className="w-10 h-10 text-primary-light dark:text-primary-dark mb-4 group-hover:scale-110 transition-transform"
                        strokeWidth={1.5}
                      />
                      <p className="text-text-light/90 dark:text-text-dark/90 text-lg leading-relaxed font-medium">
                        {item.text}
                      </p>
                    </motion.div>
                  )
                })}
              </motion.div>
            </motion.div>

            {/* Bold CTA */}
            <motion.div
              variants={itemVariants}
              className="text-center py-16 md:py-20 px-8 sm:px-12 md:px-16 rounded-2xl bg-linear-to-br from-primary-light via-primary-light/80 to-primary-dark dark:from-primary-dark dark:via-primary-dark/80 dark:to-primary-light"
            >
              <motion.h3
                variants={itemVariants}
                className="text-4xl sm:text-5xl md:text-6xl font-black text-black mb-6"
              >
                Transform Lives Today
              </motion.h3>

              <motion.p
                variants={itemVariants}
                className="text-black/80 text-lg sm:text-xl mb-10 max-w-2xl mx-auto leading-relaxed"
              >
                Every donation directly supports programs that empower young learners and create meaningful
                opportunities for children across the nation.
              </motion.p>

              <motion.a
                variants={itemVariants}
                href="/contact-us"
                className="inline-block bg-black text-white px-10 py-5 rounded-xl font-bold text-lg hover:shadow-2xl transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Make Your Donation
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Ways to Give */}
      <section id="ways-to-give" className="py-12 sm:py-16 md:py-20 px-3 sm:px-4 md:px-6">
        <div className="max-w-container mx-auto">
          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.h2
              variants={itemVariants}
              className="text-3xl sm:text-4xl md:text-5xl font-black text-text-light dark:text-text-dark mb-12 md:mb-16 text-center"
            >
              Ways to Give
            </motion.h2>

            <motion.div
              variants={containerVariants}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            >
              {waysToGive.map((way, idx) => {
                const Icon = way.icon
                return (
                  <motion.div
                    key={idx}
                    variants={itemVariants}
                    className="bg-white/50 dark:bg-white/5 backdrop-blur-sm border border-border-light dark:border-border-dark rounded-2xl p-8 hover:bg-white/70 dark:hover:bg-white/10 transition-all"
                    whileHover={{ y: -4 }}
                  >
                    <Icon className="w-12 h-12 text-primary-light dark:text-primary-dark mb-4" strokeWidth={1.5} />
                    <h3 className="text-xl font-bold text-text-light dark:text-text-dark mb-3">{way.title}</h3>
                    <p className="text-text-light/70 dark:text-text-dark/70 text-sm leading-relaxed">
                      {way.description}
                    </p>
                  </motion.div>
                )
              })}
            </motion.div>

            <motion.div variants={itemVariants} className="text-center mt-12 md:mt-16">
              <motion.a
                href="/contact"
                className="inline-block bg-primary-light dark:bg-primary-dark text-black px-8 py-4 rounded-full font-bold text-base hover:shadow-lg transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Contact Us to Get Involved
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Ways to Involve */}
      <section className="py-12 sm:py-16 md:py-20 px-3 sm:px-4 md:px-6 bg-white/30 dark:bg-white/5">
        <div className="max-w-container mx-auto">
          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.h2
              variants={itemVariants}
              className="text-3xl sm:text-4xl md:text-5xl font-black text-text-light dark:text-text-dark mb-12 md:mb-16 text-center"
            >
              Ways to Get Involved
            </motion.h2>

            <motion.div variants={containerVariants} className="space-y-4 max-w-2xl mx-auto">
              {waysToInvolve.map((way, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="flex gap-4 items-start bg-white/50 dark:bg-white/5 backdrop-blur-sm border border-border-light dark:border-border-dark rounded-xl p-6 sm:p-8 hover:bg-white/70 dark:hover:bg-white/10 transition-all"
                  whileHover={{ x: 4 }}
                >
                  <CheckCircle
                    className="w-6 h-6 text-primary-light dark:text-primary-dark shrink-0 mt-1"
                    strokeWidth={1.5}
                  />
                  <p className="text-text-light/80 dark:text-text-dark/80 text-base sm:text-lg">{way}</p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div variants={itemVariants} className="text-center mt-12 md:mt-16">
              <motion.a
                href="/contact"
                className="inline-block bg-primary-light dark:bg-primary-dark text-black px-8 py-4 rounded-full font-bold text-base hover:shadow-lg transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Contact Us to Get Involved
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
