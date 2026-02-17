'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Shield, Home, ArrowLeft, Calendar, Lock, Eye, Database, UserCheck, Mail, Phone, MapPin } from 'lucide-react'

const sections = [
  {
    id: 'introduction',
    title: 'Introduction',
    icon: Shield,
    content: `Education Comes First ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.`
  },
  {
    id: 'information-we-collect',
    title: 'Information We Collect',
    icon: Database,
    content: `We may collect information about you in a variety of ways. The information we may collect on the website includes:`,
    subsections: [
      {
        title: 'Personal Data',
        content: `Personally identifiable information, such as your name, shipping address, email address, and telephone number, and demographic information, such as your age, gender, hometown, and interests, that you voluntarily give to us when you register with the website or when you choose to participate in various activities related to the website, such as making a donation or signing up for our newsletter.`
      },
      {
        title: 'Derivative Data',
        content: `Information our servers automatically collect when you access the website, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed directly before and after accessing the website.`
      },
      {
        title: 'Financial Data',
        content: `Financial information, such as data related to your payment method (e.g., valid credit card number, card brand, expiration date) that we may collect when you make a donation or purchase. We store only very limited, if any, financial information that we collect. Otherwise, all financial information is stored by our payment processor, Stripe, and you are encouraged to review their privacy policy and contact them directly for responses to your questions.`
      },
      {
        title: 'Data from Social Networks',
        content: `User information from social networking sites, such as Google, including your name, your social network username, location, gender, birth date, email address, profile picture, and public data for contacts, if you connect your account to such social networks.`
      }
    ]
  },
  {
    id: 'how-we-use-information',
    title: 'How We Use Your Information',
    icon: Eye,
    content: `Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the website to:`,
    list: [
      'Create and manage your account',
      'Process your donations and send you receipts',
      'Email you regarding your account or donations',
      'Send you our newsletter and updates about our programs (with your consent)',
      'Improve our website and services',
      'Monitor and analyze usage and trends to improve your experience',
      'Notify you of updates to our website and services',
      'Respond to product and customer service requests',
      'Fulfill and manage donations and other transactions',
      'Generate a personal profile about you to make future visits more personalized',
      'Compile anonymous statistical data and analysis for use internally',
      'Prevent fraudulent transactions and protect against criminal activity'
    ]
  },
  {
    id: 'disclosure-of-information',
    title: 'Disclosure of Your Information',
    icon: UserCheck,
    content: `We may share information we have collected about you in certain situations. Your information may be disclosed as follows:`,
    subsections: [
      {
        title: 'By Law or to Protect Rights',
        content: `If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others, we may share your information as permitted or required by any applicable law, rule, or regulation.`
      },
      {
        title: 'Third-Party Service Providers',
        content: `We may share your information with third parties that perform services for us or on our behalf, including payment processing, data analysis, email delivery, hosting services, customer service, and marketing assistance.`
      },
      {
        title: 'Business Transfers',
        content: `We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.`
      },
      {
        title: 'With Your Consent',
        content: `We may disclose your personal information for any other purpose with your consent.`
      }
    ]
  },
  {
    id: 'tracking-technologies',
    title: 'Tracking Technologies',
    icon: Eye,
    content: `We may use cookies, web beacons, tracking pixels, and other tracking technologies on the website to help customize the website and improve your experience. When you access the website, your personal information is not collected through the use of tracking technology. Most browsers are set to accept cookies by default. You can remove or reject cookies, but be aware that such action could affect the availability and functionality of the website.`
  },
  {
    id: 'third-party-websites',
    title: 'Third-Party Websites',
    icon: Link,
    content: `The website may contain links to third-party websites and applications of interest, including advertisements and external services, that are not affiliated with us. Once you have used these links to leave the website, any information you provide to these third parties is not covered by this Privacy Policy, and we cannot guarantee the safety and privacy of your information.`
  },
  {
    id: 'security',
    title: 'Security of Your Information',
    icon: Lock,
    content: `We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.`
  },
  {
    id: 'children-privacy',
    title: "Children's Privacy",
    icon: UserCheck,
    content: `We do not knowingly solicit information from or market to children under the age of 13. If you become aware of any data we have collected from children under age 13, please contact us using the contact information provided below.`
  },
  {
    id: 'your-rights',
    title: 'Your Privacy Rights',
    icon: Shield,
    content: `Depending on your location, you may have certain rights regarding your personal information:`,
    list: [
      'The right to access – You have the right to request copies of your personal data',
      'The right to rectification – You have the right to request that we correct any information you believe is inaccurate',
      'The right to erasure – You have the right to request that we erase your personal data, under certain conditions',
      'The right to restrict processing – You have the right to request that we restrict the processing of your personal data, under certain conditions',
      'The right to object to processing – You have the right to object to our processing of your personal data, under certain conditions',
      'The right to data portability – You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions'
    ]
  },
  {
    id: 'california-privacy',
    title: 'California Privacy Rights',
    icon: Shield,
    content: `California Civil Code Section 1798.83, also known as the "Shine The Light" law, permits our users who are California residents to request and obtain from us, once a year and free of charge, information about categories of personal information (if any) we disclosed to third parties for direct marketing purposes and the names and addresses of all third parties with which we shared personal information in the immediately preceding calendar year.`
  },
  {
    id: 'gdpr-compliance',
    title: 'GDPR Compliance',
    icon: Shield,
    content: `If you are from the European Economic Area (EEA), Education Comes First's legal basis for collecting and using the personal information described in this Privacy Policy depends on the personal information we collect and the specific context in which we collect it. We may process your personal information because:`,
    list: [
      'We need to perform a contract with you',
      'You have given us permission to do so',
      'The processing is in our legitimate interests and it is not overridden by your rights',
      'To comply with the law'
    ]
  },
  {
    id: 'do-not-track',
    title: 'Do Not Track',
    icon: Eye,
    content: `Most web browsers and some mobile operating systems include a Do-Not-Track ("DNT") feature or setting you can activate to signal your privacy preference not to have data about your online browsing activities monitored and collected. No uniform technology standard for recognizing and implementing DNT signals has been finalized. As such, we do not currently respond to DNT browser signals.`
  },
  {
    id: 'policy-updates',
    title: 'Changes to This Privacy Policy',
    icon: Calendar,
    content: `We may update this Privacy Policy from time to time in order to reflect, for example, changes to our practices or for other operational, legal, or regulatory reasons. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.`
  },
  {
    id: 'contact',
    title: 'Contact Us',
    icon: Shield,
    content: `If you have questions or comments about this Privacy Policy, please contact us at:`,
    contactInfo: {
      organization: 'Education Comes First',
      email: 'privacy@educationcomesfirst.org',
      address: 'Lynn, Massachusetts',
      phone: '(555) 123-4567'
    }
  }
]

export default function PrivacyPolicyPage() {
  const lastUpdated = 'February 9, 2026'

  return (
    <div className="min-h-screen bg-bg-light dark:bg-bg-dark">
      {/* Hero Section */}
      <section className="relative py-16 sm:py-20 lg:py-24 border-b border-border-light dark:border-border-dark">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-12">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-2 text-sm mb-6"
          >
            <Link
              href="/"
              className="font-lato text-text-light/60 dark:text-text-dark/60 hover:text-text-light dark:hover:text-text-dark transition-colors flex items-center gap-1"
            >
              <Home className="w-4 h-4" />
              Home
            </Link>
            <span className="text-text-light/40 dark:text-text-dark/40">/</span>
            <span className="font-caveat text-lg text-secondary-light dark:text-secondary-dark">Privacy Policy</span>
          </motion.div>

          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-4"
            >
              <div className="w-12 h-12 rounded-xl bg-primary-light/10 dark:bg-primary-dark/10 flex items-center justify-center">
                <Shield className="w-6 h-6 text-primary-light dark:text-primary-dark" />
              </div>
              <h1 className="font-kanit text-4xl sm:text-5xl md:text-6xl font-bold text-text-light dark:text-text-dark">
                Privacy Policy
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex items-center gap-2 text-text-light/60 dark:text-text-dark/60"
            >
              <Calendar className="w-4 h-4" />
              <span className="font-lato text-sm">Last updated: {lastUpdated}</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Sidebar - Table of Contents */}
            <motion.aside
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-4"
            >
              <div className="lg:sticky lg:top-24">
                <div className="bg-accent dark:bg-accent-dark border border-border-light dark:border-border-dark rounded-2xl p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Lock className="w-5 h-5 text-primary-light dark:text-primary-dark" />
                    <h2 className="font-kanit text-lg font-bold text-text-light dark:text-text-dark">
                      Quick Navigation
                    </h2>
                  </div>
                  <nav className="space-y-1">
                    {sections.map((section) => (
                      <a
                        href={`#${section.id}`}
                        key={section.id}
                        className="group flex items-center gap-3 font-lato text-sm text-text-light/70 dark:text-text-dark/70 hover:text-primary-light dark:hover:text-primary-dark transition-colors py-2 px-3 rounded-lg hover:bg-bg-light dark:hover:bg-bg-dark"
                      >
                        <span className="flex-1">{section.title}</span>
                      </a>
                    ))}
                  </nav>

                  <div className="mt-6 pt-6 border-t border-border-light dark:border-border-dark">
                    <Link
                      href="/"
                      className="inline-flex items-center gap-2 font-lato text-sm text-secondary-light dark:text-secondary-dark hover:underline"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Back to Home
                    </Link>
                  </div>

                  {/* Privacy Badge */}
                  <div className="mt-6 p-4 bg-primary-light/5 dark:bg-primary-dark/5 rounded-xl border border-primary-light/20 dark:border-primary-dark/20">
                    <div className="flex items-start gap-3">
                      <Shield className="w-5 h-5 text-primary-light dark:text-primary-dark shrink-0 mt-0.5" />
                      <div>
                        <p className="font-lato text-xs font-semibold text-text-light dark:text-text-dark mb-1">
                          Your Privacy Matters
                        </p>
                        <p className="font-lato text-xs text-text-light/60 dark:text-text-dark/60">
                          We are committed to protecting your personal information and being transparent about how we
                          use it.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.aside>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="lg:col-span-8"
            >
              <div className="prose prose-lg max-w-none">
                {/* Introduction Banner */}
                <div className="mb-12 p-6 bg-linear-to-br from-primary-light/10 to-secondary-light/10 dark:from-primary-dark/10 dark:to-secondary-dark/10 border border-primary-light/20 dark:border-primary-dark/20 rounded-2xl">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary-light dark:bg-primary-dark flex items-center justify-center shrink-0">
                      <Shield className="w-6 h-6 text-text-light dark:text-text-dark" />
                    </div>
                    <div>
                      <h3 className="font-kanit text-xl font-bold text-text-light dark:text-text-dark mb-2">
                        Your Privacy is Our Priority
                      </h3>
                      <p className="font-lato text-base text-text-light/80 dark:text-text-dark/80 leading-relaxed m-0">
                        At Education Comes First, we respect your privacy and are committed to protecting your personal
                        information. This policy explains how we collect, use, and safeguard your data when you interact
                        with our services.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Sections */}
                <div className="space-y-12">
                  {sections.map((section) => (
                    <div key={section.id} id={section.id} className="scroll-mt-24">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-primary-light/10 dark:bg-primary-dark/10 flex items-center justify-center shrink-0">
                          {/* <section.icon className="w-5 h-5 text-primary-light dark:text-primary-dark" /> */}
                        </div>
                        <div className="flex-1">
                          <h2 className="font-kanit text-2xl sm:text-3xl font-bold text-text-light dark:text-text-dark">
                            {section.title}
                          </h2>
                        </div>
                      </div>

                      <div className="pl-14">
                        <p className="font-lato text-base sm:text-lg leading-relaxed text-text-light/80 dark:text-text-dark/80 mb-4">
                          {section.content}
                        </p>

                        {section.list && (
                          <ul className="space-y-3 mb-6">
                            {section.list.map((item, i) => (
                              <li key={i} className="flex items-start gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary-light dark:bg-primary-dark mt-2.5 shrink-0" />
                                <span className="font-lato text-base text-text-light/70 dark:text-text-dark/70">
                                  {item}
                                </span>
                              </li>
                            ))}
                          </ul>
                        )}

                        {section.subsections && (
                          <div className="space-y-6 mt-6">
                            {section.subsections.map((subsection, i) => (
                              <div
                                key={i}
                                className="pl-4 border-l-2 border-primary-light/20 dark:border-primary-dark/20"
                              >
                                <h4 className="font-kanit text-lg font-bold text-text-light dark:text-text-dark mb-2">
                                  {subsection.title}
                                </h4>
                                <p className="font-lato text-base text-text-light/70 dark:text-text-dark/70">
                                  {subsection.content}
                                </p>
                              </div>
                            ))}
                          </div>
                        )}

                        {section.contactInfo && (
                          <div className="mt-4 p-6 bg-accent dark:bg-accent-dark rounded-xl border border-border-light dark:border-border-dark">
                            <p className="font-lato text-base text-text-light/80 dark:text-text-dark/80 mb-3">
                              <strong className="text-text-light dark:text-text-dark">
                                {section.contactInfo.organization}
                              </strong>
                            </p>
                            <div className="space-y-2 text-text-light/70 dark:text-text-dark/70">
                              <p className="font-lato text-base flex items-center gap-2">
                                <Mail className="w-4 h-4" />
                                Email:{' '}
                                <a
                                  href={`mailto:${section.contactInfo.email}`}
                                  className="text-secondary-light dark:text-secondary-dark hover:underline"
                                >
                                  {section.contactInfo.email}
                                </a>
                              </p>
                              {section.contactInfo.phone && (
                                <p className="font-lato text-base flex items-center gap-2">
                                  <Phone className="w-4 h-4" />
                                  Phone: {section.contactInfo.phone}
                                </p>
                              )}
                              <p className="font-lato text-base flex items-center gap-2">
                                <MapPin className="w-4 h-4" />
                                {section.contactInfo.address}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer CTA */}
                <div className="mt-16 pt-8 border-t border-border-light dark:border-border-dark">
                  <div className="bg-linear-to-br from-primary-light/10 to-secondary-light/10 dark:from-primary-dark/10 dark:to-secondary-dark/10 rounded-2xl p-8 text-center">
                    <div className="w-16 h-16 rounded-2xl bg-primary-light dark:bg-primary-dark flex items-center justify-center mx-auto mb-4">
                      <Shield className="w-8 h-8 text-text-light dark:text-text-dark" />
                    </div>
                    <h3 className="font-kanit text-2xl font-bold text-text-light dark:text-text-dark mb-3">
                      Have Privacy Questions?
                    </h3>
                    <p className="font-lato text-base text-text-light/70 dark:text-text-dark/70 mb-6 max-w-2xl mx-auto">
                      If you have any questions or concerns about how we handle your personal information, we&apos;re
                      here to help.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-4">
                      <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 bg-linear-to-r from-primary-light to-secondary-light dark:from-primary-dark dark:to-secondary-dark text-text-light dark:text-text-dark font-lato font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all"
                      >
                        Contact Us
                      </Link>
                      <Link
                        href="/terms"
                        className="inline-flex items-center gap-2 border-2 border-border-light dark:border-border-dark text-text-light dark:text-text-dark font-lato font-semibold px-8 py-4 rounded-full hover:bg-accent dark:hover:bg-accent-dark transition-all"
                      >
                        View Terms & Conditions
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
