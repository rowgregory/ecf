'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, BookOpen, Users, Mic, Headphones, Puzzle, BookMarked } from 'lucide-react'
import { fadeUp } from '@/app/lib/constants/motion.constants'
import { PrimaryButton } from '@/app/components/ui/buttons/PrimaryButton'

// ─── Section heading ──────────────────────────────────────────────────────
interface SectionHeadingProps {
  label: string
  heading: string
  highlight?: string
  className?: string
}

function SectionHeading({ label, heading, highlight, className = '' }: SectionHeadingProps) {
  return (
    <div className={`${className} mb-8`}>
      <p className="font-mono text-[10px] tracking-[0.2em] uppercase font-bold text-secondary-light dark:text-secondary-dark mb-3">
        {`// ${label}`}
      </p>
      <h2 className="font-mono text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight mb-4 text-text-light dark:text-text-dark">
        {heading}
        {highlight && (
          <>
            {' '}
            <span className="text-secondary-light dark:text-primary-dark">{highlight}</span>
          </>
        )}
      </h2>
      <div aria-hidden="true" className="h-px w-20 bg-secondary-light dark:bg-primary-dark" />
    </div>
  )
}

// ─── Data ────────────────────────────────────────────────────────────────
const programs = [
  {
    icon: BookOpen,
    title: 'Book Clubs',
    description:
      'Small groups read and discuss stories together, helping members build comprehension and critical thinking skills.',
    index: '01'
  },
  {
    icon: Mic,
    title: "Storytelling & Reader's Theater",
    description:
      'Kids bring books to life by acting out scenes, making reading an interactive and unforgettable experience.',
    index: '02'
  },
  {
    icon: BookMarked,
    title: 'Author Visits & Creative Projects',
    description:
      'Hands-on activities encourage creativity while reinforcing literacy skills in a fun, engaging environment.',
    index: '03'
  },
  {
    icon: Headphones,
    title: 'Audiobooks & Read-Alouds',
    description:
      'Listening to books expands vocabulary and improves fluency, especially for emerging and developing readers.',
    index: '04'
  },
  {
    icon: Users,
    title: '"Reading Buddies" Program',
    description: 'Older members mentor younger readers, fostering confidence, connection, and leadership skills.',
    index: '05'
  },
  {
    icon: Puzzle,
    title: 'Literacy Games & Challenges',
    description:
      'Word puzzles, scavenger hunts, and interactive quizzes make reading exciting and genuinely rewarding.',
    index: '06'
  }
]

const challenges = [
  { month: 'October', name: 'Spooky Stories Challenge', emoji: '🎃' },
  { month: 'March', name: 'Read Across America Week', emoji: '📚' },
  { month: 'Summer', name: 'Summer Adventure Reading Quest', emoji: '☀️' }
]

const stats = [
  { value: '6', label: 'Reading Programs' },
  { value: '40–60', label: 'Min / Week' },
  { value: '26', label: 'Sites Nationwide' },
  { value: '∞', label: 'Love for Books' }
]

// ═══════════════════════════════════════════════════════════════════════════
export default function ReadingPage() {
  const reduceMotion = useReducedMotion()

  return (
    <div className="min-h-screen text-text-light dark:text-text-dark bg-bg-light dark:bg-bg-dark">
      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <section
        className="relative py-16 sm:py-20 lg:py-24 border-b border-neutral-200 dark:border-border-dark"
        aria-label="Reading programs"
      >
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-12">
          <div className="text-center">
            <motion.p
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="font-mono text-[10px] tracking-[0.2em] uppercase font-bold text-secondary-light dark:text-secondary-dark mb-4"
            >
              {'// reading'}
            </motion.p>

            <motion.h1
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="font-mono text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
            >
              Reading
            </motion.h1>

            <motion.nav
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              aria-label="Breadcrumb"
              className="flex items-center justify-center gap-2 sm:gap-3 font-mono text-[11px] tracking-wide"
            >
              <Link
                href="/"
                className="text-text-light/85 dark:text-text-dark/80 underline underline-offset-2 hover:no-underline transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-light dark:focus-visible:outline-secondary-dark"
              >
                Home
              </Link>
              <span aria-hidden="true" className="text-text-light/55 dark:text-text-dark/50">
                /
              </span>
              <span aria-current="page" className="font-bold text-secondary-light dark:text-secondary-dark">
                Reading
              </span>
            </motion.nav>
          </div>
        </div>
      </section>

      {/* ── Ticker ──────────────────────────────────────────────────────── */}
      <section className="bg-secondary-light dark:bg-primary-dark py-4 overflow-hidden" aria-hidden="true">
        <motion.div
          animate={reduceMotion ? undefined : { x: ['0%', '-50%'] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="flex whitespace-nowrap"
        >
          {[...Array(6)].map((_, i) => (
            <span
              key={i}
              className="font-mono font-bold text-xs uppercase tracking-widest text-white dark:text-accent-dark px-8 flex items-center gap-6"
            >
              Book Clubs <span className="opacity-50">✦</span> Reader&apos;s Theater{' '}
              <span className="opacity-50">✦</span> Author Visits <span className="opacity-50">✦</span> Audiobooks{' '}
              <span className="opacity-50">✦</span> Reading Buddies <span className="opacity-50">✦</span> Literacy Games{' '}
              <span className="opacity-50">✦</span>
            </span>
          ))}
        </motion.div>
      </section>

      {/* ── How we make reading fun ────────────────────────────────────── */}
      <section
        className="px-4 sm:px-6 lg:px-12 py-16 sm:py-20 lg:py-24 border-b border-neutral-200 dark:border-border-dark"
        aria-labelledby="approach-heading"
      >
        <div className="max-w-container mx-auto grid grid-cols-1 1150:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <SectionHeading label="our approach" heading="How we make" highlight="Reading Fun" />
            <h3 id="approach-heading" className="sr-only">
              Our approach
            </h3>
            <p className="font-mono text-sm sm:text-base text-text-light/85 dark:text-text-dark/80 leading-relaxed mb-8">
              ECF members participate in exciting, themed reading challenges throughout the year — aligned with
              holidays, special events, and cultural celebrations. Our goal is to make reading a joyful experience every
              single time.
            </p>

            {/* Challenge cards */}
            <div className="space-y-2">
              {challenges.map((c, i) => (
                <motion.div
                  key={c.name}
                  custom={i}
                  initial={reduceMotion ? false : 'hidden'}
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={reduceMotion ? undefined : fadeUp}
                  className="flex items-center gap-4 px-4 py-3 border border-neutral-200 dark:border-border-dark bg-white/50 dark:bg-accent-dark/40 hover:border-secondary-light dark:hover:border-primary-dark transition-colors duration-200"
                >
                  <div
                    aria-hidden="true"
                    className="w-10 h-10 bg-secondary-light/10 dark:bg-primary-dark/10 border border-secondary-light/40 dark:border-primary-dark/40 flex items-center justify-center shrink-0 text-lg"
                  >
                    {c.emoji}
                  </div>
                  <div className="min-w-0">
                    <p className="font-mono text-[10px] tracking-widest uppercase font-bold text-text-light/65 dark:text-text-dark/65">
                      {c.month}
                    </p>
                    <p className="font-mono font-bold text-sm sm:text-base text-text-light dark:text-text-dark">
                      {c.name}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Stat card */}
          <motion.div
            className="relative h-64 sm:h-80"
            initial={reduceMotion ? false : { opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <div
              aria-hidden="true"
              className="absolute inset-0 border border-secondary-light/50 dark:border-primary-dark/50 bg-secondary-light/8 dark:bg-primary-dark/8 flex flex-col items-center justify-center p-8 text-center"
            >
              <span className="font-mono text-5xl sm:text-6xl font-bold text-secondary-light dark:text-primary-dark leading-none">
                40–60
              </span>
              <span className="font-mono text-[11px] font-bold uppercase tracking-widest mt-3 text-text-light dark:text-text-dark">
                Minutes Per Week
              </span>
              <p className="font-mono text-xs text-text-light/85 dark:text-text-dark/80 mt-3 max-w-xs leading-relaxed">
                Every ECF site dedicates out-of-school reading time each week to build lasting literacy habits.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Programs grid ──────────────────────────────────────────────── */}
      <section
        className="py-16 sm:py-20 lg:py-24 border-b border-neutral-200 dark:border-border-dark"
        aria-labelledby="programs-heading"
      >
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-12">
          <motion.div
            className="mb-12 sm:mb-16"
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <SectionHeading label="programs" heading="More ways we" highlight="Engage Readers" />
            <h3 id="programs-heading" className="sr-only">
              Reading programs
            </h3>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-neutral-200 dark:bg-border-dark border border-neutral-200 dark:border-border-dark">
            {programs.map((program, i) => {
              const Icon = program.icon
              return (
                <motion.div
                  key={program.title}
                  custom={i}
                  initial={reduceMotion ? false : 'hidden'}
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={reduceMotion ? undefined : fadeUp}
                  className="bg-bg-light dark:bg-bg-dark p-7 sm:p-10 group hover:bg-white dark:hover:bg-accent-dark/40 transition-colors duration-200 flex flex-col gap-5"
                >
                  <div className="flex items-start justify-between">
                    <div
                      aria-hidden="true"
                      className="w-11 h-11 flex items-center justify-center bg-secondary-light/10 dark:bg-primary-dark/10 border border-secondary-light/40 dark:border-primary-dark/40"
                    >
                      <Icon className="w-5 h-5 text-secondary-light dark:text-primary-dark" aria-hidden="true" />
                    </div>
                    <span
                      aria-hidden="true"
                      className="font-mono text-xs font-bold text-text-light/65 dark:text-text-dark/65 tracking-widest"
                    >
                      {program.index}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-mono text-lg sm:text-xl font-bold mb-2 leading-tight text-text-light dark:text-text-dark group-hover:text-secondary-light dark:group-hover:text-primary-dark transition-colors duration-200">
                      {program.title}
                    </h3>
                    <p className="font-mono text-sm text-text-light/85 dark:text-text-dark/80 leading-relaxed">
                      {program.description}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Lifelong readers ───────────────────────────────────────────── */}
      <section
        className="px-4 sm:px-6 lg:px-12 py-16 sm:py-20 lg:py-24 border-b border-neutral-200 dark:border-border-dark"
        aria-labelledby="mission-heading"
      >
        <div className="max-w-container mx-auto grid grid-cols-1 1150:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Stat cards */}
          <motion.div
            className="grid grid-cols-2 gap-3"
            initial={reduceMotion ? false : { opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            {stats.map((item, i) => (
              <motion.div
                key={item.label}
                custom={i}
                initial={reduceMotion ? false : 'hidden'}
                whileInView="visible"
                viewport={{ once: true }}
                variants={reduceMotion ? undefined : fadeUp}
                className="p-5 border border-neutral-200 dark:border-border-dark hover:border-secondary-light dark:hover:border-primary-dark transition-colors duration-200"
              >
                <span className="font-mono text-3xl sm:text-4xl font-bold block mb-1 text-secondary-light dark:text-primary-dark">
                  {item.value}
                </span>
                <span className="font-mono text-[10px] text-text-light/80 dark:text-text-dark/75 font-bold uppercase tracking-widest">
                  {item.label}
                </span>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <SectionHeading label="our mission" heading="Creating" highlight="Lifelong Readers" />
            <h3 id="mission-heading" className="sr-only">
              Our mission
            </h3>
            <p className="font-mono text-sm sm:text-base text-text-light/85 dark:text-text-dark/80 leading-relaxed mb-5">
              At Education Comes First, we firmly believe that reading should be accessible, empowering, and a lifelong
              joy for every child.
            </p>
            <p className="font-mono text-sm sm:text-base text-text-light/85 dark:text-text-dark/80 leading-relaxed mb-8">
              By combining structured reading time with activities that genuinely engage students, we help members build
              strong literacy skills, expand their imaginations, and fall in love with books.
            </p>

            <Link href="/who-we-are/about" className="inline-block">
              <PrimaryButton type="button" loading={false} trailingIcon={ArrowRight} aria-label="See our impact">
                See Our Impact
              </PrimaryButton>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────────── */}
      <section className="bg-white/50 dark:bg-accent-dark/40" aria-labelledby="cta-heading">
        <motion.div
          className="max-w-container mx-auto px-4 sm:px-6 lg:px-12 py-16 sm:py-20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8"
          initial={reduceMotion ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <h3 id="cta-heading" className="font-mono text-2xl sm:text-3xl font-bold leading-tight mb-3">
              Join us in building a
              <br />
              <span className="text-secondary-light dark:text-primary-dark">culture of reading</span>
            </h3>
            <p className="font-mono text-sm text-text-light/85 dark:text-text-dark/80 max-w-md leading-relaxed">
              Through weekly reading time, themed challenges, and creative literacy activities — we&apos;re fostering a
              love for books that will last a lifetime.
            </p>
          </div>

          <Link href="/contact" className="shrink-0">
            <PrimaryButton
              type="button"
              loading={false}
              trailingIcon={ArrowRight}
              aria-label="Get involved with Education Comes First"
            >
              Get Involved
            </PrimaryButton>
          </Link>
        </motion.div>
      </section>
    </div>
  )
}
