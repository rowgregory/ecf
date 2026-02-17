'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Picture from '../common/Picture'
import LogoHorizontalDark from '@/public/svg/LogoHorizontalDark'
import { Heart, MessageSquare, Zap } from 'lucide-react'
import LogoutButton from '../ui/buttons/LogoutButton'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      easing: [0.22, 1, 0.36, 1]
    }
  }
}

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      easing: [0.22, 1, 0.36, 1]
    }
  }
}

export interface ISupporterOverviewClient {
  data: {
    supporter?: {
      name: string
      memberSince: string
      totalGiven: number
      nextRecurring: string | null
    }
    oneTimeDonations?: {
      id: string
      date: string
      amount: number
      status: string
    }[]
    recurringDonations?: {
      id: string
      amount: number
      frequency: string
      startDate: string
      status: string
      nextDate: string
    }[]
    contactSubmissions?: {
      id: string
      date: string
      subject: string
      status: string
      message: string
    }[]
    stats?: {
      label: string
      value: string
      subtext: string
      icon: string
      color: string
      bg: string
      border: string
    }[]
  }
  success?: boolean
  error?: string
}

const tabs = ['one-time', 'recurring', 'contacts']

const SupporterOverviewClient = ({ data }: ISupporterOverviewClient) => {
  const [activeTab, setActiveTab] = useState('one-time')

  return (
    <div>
      <div className="min-h-screen bg-accent dark:bg-bg-dark text-text-light dark:text-text-dark transition-colors duration-500">
        {/* Header */}
        <header className="border-b border-border-light dark:border-border-dark bg-accent dark:bg-accent-dark">
          <div className="max-w-container mx-auto px-6 py-4 flex items-center justify-between">
            <Link href="/" className="">
              <div className="w-32 sm:w-40 md:w-48 lg:w-52">
                <Picture
                  src="/svg/logo-horizontal-light.svg"
                  alt="Education Comes First"
                  className="dark:hidden block w-full h-full cursor-pointer hover:opacity-80 transition-opacity"
                  priority={true}
                />
                <LogoHorizontalDark />
              </div>
            </Link>

            <LogoutButton />
          </div>
        </header>

        {/* Main Content */}
        <main className="min-h-[calc(100vh-259px)] max-w-container mx-auto px-6 py-12">
          <motion.div variants={containerVariants} initial="hidden" animate="visible">
            {/* Welcome Section */}
            <motion.div variants={itemVariants} className="mb-12">
              <h1 className="font-kanit text-4xl md:text-5xl lg:text-6xl mb-3">Welcome, {data?.supporter?.name}</h1>
              <p className="text-lg text-text-light/70 dark:text-text-dark/70">
                Supporter since {data?.supporter?.memberSince}
              </p>
            </motion.div>

            {/* Stats Cards */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {data?.stats?.map(
                (stat: {
                  border: string
                  bg: string
                  color: string
                  label: string
                  value: string
                  subtext?: string
                }) => (
                  <motion.div
                    key={stat.label}
                    variants={cardVariants}
                    whileHover={{ y: -4 }}
                    className="bg-accent dark:bg-accent-dark border border-border-light dark:border-border-dark rounded-2xl p-6 relative overflow-hidden group"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-secondary-light/10 dark:bg-secondary-dark/10 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
                    <div className="relative">
                      <p className="text-sm uppercase tracking-wider text-text-light/60 dark:text-text-dark/60 mb-2">
                        {stat.label}
                      </p>
                      <p className="font-kanit text-4xl font-bold text-secondary-light dark:text-secondary-dark">
                        {stat.value}
                      </p>
                      {stat.subtext && (
                        <p className="text-xs text-text-light/50 dark:text-text-dark/50 mt-2">{stat.subtext}</p>
                      )}
                    </div>
                  </motion.div>
                )
              )}
            </motion.div>

            {/* Tab Navigation */}
            <motion.div variants={itemVariants} className="mb-8">
              <div className="flex gap-2 border-b border-border-light dark:border-border-dark">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className="relative px-6 py-3 font-medium capitalize transition-colors"
                  >
                    <span
                      className={
                        activeTab === tab
                          ? 'text-primary-light dark:text-primary-dark'
                          : 'text-text-light/60 dark:text-text-dark/60 hover:text-text-light dark:hover:text-text-dark'
                      }
                    >
                      {tab.replace('-', ' ')}
                    </span>
                    {activeTab === tab && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-light dark:bg-primary-dark"
                        transition={{
                          type: 'spring',
                          stiffness: 500,
                          damping: 30
                        }}
                      />
                    )}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
              {activeTab === 'one-time' && (
                <motion.div
                  key="one-time"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="space-y-3">
                    {data?.oneTimeDonations && data.oneTimeDonations.length > 0 ? (
                      <div className="space-y-3">
                        {data.oneTimeDonations.map(
                          (donation: { id: string; date: string; amount: number }, index: number) => (
                            <motion.div
                              key={donation.id}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="bg-accent dark:bg-accent-dark border border-border-light dark:border-border-dark rounded-xl p-5 flex items-center justify-between hover:border-primary-light dark:hover:border-primary-dark transition-colors"
                            >
                              <div>
                                <p className="text-sm text-text-light/60 dark:text-text-dark/60">{donation.date}</p>
                              </div>
                              <p className="font-kanit text-2xl font-bold text-primary-light dark:text-primary-dark">
                                ${donation.amount.toFixed(2)}
                              </p>
                            </motion.div>
                          )
                        )}
                      </div>
                    ) : (
                      <div className="bg-accent dark:bg-accent-dark border border-border-light dark:border-border-dark rounded-xl p-8 text-center">
                        <Heart className="w-12 h-12 mx-auto mb-3 text-text-light/30 dark:text-text-dark/30" />
                        <p className="text-text-light/60 dark:text-text-dark/60 mb-2">No one-time donations yet</p>
                        <p className="text-sm text-text-light/50 dark:text-text-dark/50">
                          Make your first donation to support our mission
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {activeTab === 'recurring' && (
                <motion.div
                  key="recurring"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="space-y-3">
                    {data?.recurringDonations && data.recurringDonations.length > 0 ? (
                      <div className="space-y-3">
                        {data.recurringDonations.map(
                          (
                            donation: {
                              id: string
                              frequency: string
                              amount: number
                              status: string
                              nextDate: string
                            },
                            index: number
                          ) => (
                            <motion.div
                              key={donation.id}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="bg-accent dark:bg-accent-dark border border-border-light dark:border-border-dark rounded-xl p-5 hover:border-secondary-light dark:hover:border-secondary-dark transition-colors"
                            >
                              <div className="flex items-center justify-between mb-2">
                                <p className="font-kanit font-semibold text-lg">
                                  ${donation.amount.toFixed(2)} / {donation.frequency}
                                </p>
                                <span className="px-3 py-1 rounded-full bg-secondary-light dark:bg-secondary-dark text-text-light text-xs font-semibold uppercase">
                                  {donation.status}
                                </span>
                              </div>
                              <p className="text-sm text-text-light/60 dark:text-text-dark/60">
                                Next payment: {donation.nextDate}
                              </p>
                            </motion.div>
                          )
                        )}
                      </div>
                    ) : (
                      <div className="bg-accent dark:bg-accent-dark border border-border-light dark:border-border-dark rounded-xl p-8 text-center">
                        <Zap className="w-12 h-12 mx-auto mb-3 text-text-light/30 dark:text-text-dark/30" />
                        <p className="text-text-light/60 dark:text-text-dark/60 mb-2">No recurring donations yet</p>
                        <p className="text-sm text-text-light/50 dark:text-text-dark/50">
                          Set up a monthly or yearly donation to provide ongoing support
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {activeTab === 'contacts' && (
                <motion.div
                  key="contacts"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {data?.contactSubmissions && data.contactSubmissions.length > 0 ? (
                    <div className="space-y-3">
                      {data.contactSubmissions.map(
                        (
                          contact: { id: string; subject: string; date: string; status: string; message: string },
                          index: number
                        ) => (
                          <motion.div
                            key={contact.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-accent dark:bg-accent-dark border border-border-light dark:border-border-dark rounded-xl p-6 hover:border-primary-light dark:hover:border-primary-dark transition-all hover:shadow-lg"
                          >
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex-1">
                                <p className="font-kanit font-bold text-xl mb-1">{contact.subject}</p>
                                <p className="text-text-light/60 dark:text-text-dark/60 text-sm mb-2">{contact.date}</p>
                              </div>
                              <span
                                className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${
                                  contact.status === 'responded'
                                    ? 'bg-secondary-light/20 dark:bg-secondary-dark/20 text-secondary-light dark:text-secondary-dark'
                                    : 'bg-border-light dark:bg-border-dark text-text-light/60 dark:text-text-dark/60'
                                }`}
                              >
                                {contact.status}
                              </span>
                            </div>
                            <p className="text-text-light/80 dark:text-text-dark/80">{contact.message}</p>
                          </motion.div>
                        )
                      )}
                    </div>
                  ) : (
                    <div className="bg-accent dark:bg-accent-dark border border-border-light dark:border-border-dark rounded-xl p-8 text-center">
                      <MessageSquare className="w-12 h-12 mx-auto mb-3 text-text-light/30 dark:text-text-dark/30" />
                      <p className="text-text-light/60 dark:text-text-dark/60 mb-2">No contact submissions yet</p>
                      <p className="text-sm text-text-light/50 dark:text-text-dark/50">
                        Your messages to us will appear here
                      </p>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </main>

        {/* Footer */}
        <footer className="border-t border-border-light dark:border-border-dark mt-20 py-8 bg-accent dark:bg-accent-dark">
          <div className="max-w-container mx-auto px-6 text-center text-sm text-text-light/60 dark:text-text-dark/60">
            <p>© 2026 Education Comes First. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default SupporterOverviewClient
