'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { FileText, Home, ArrowLeft, Calendar, Scale } from 'lucide-react'

export default function TermsConditionsPage() {
  const lastUpdated = 'February 9, 2026'

  const sections = [
    {
      id: 'acceptance',
      title: 'Acceptance of Terms',
      content: `By accessing and using the Education Comes First website and services, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to these terms, please do not use our services.`
    },
    {
      id: 'use-license',
      title: 'Use License',
      content: `Permission is granted to temporarily download one copy of the materials on Education Comes First's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:`,
      list: [
        'Modify or copy the materials',
        'Use the materials for any commercial purpose or for any public display',
        'Attempt to reverse engineer any software contained on our website',
        'Remove any copyright or other proprietary notations from the materials',
        'Transfer the materials to another person or "mirror" the materials on any other server'
      ]
    },
    {
      id: 'donations',
      title: 'Donations and Payments',
      content: `All donations made through our website are processed securely through our payment partners. By making a donation, you agree to:`,
      list: [
        'Provide accurate payment information',
        'Ensure you have authorization to use the payment method provided',
        'Understand that all donations are final and non-refundable unless otherwise required by law',
        'Receive receipts and communications related to your donation',
        'Allow us to use your donation for our educational programs and operational costs'
      ]
    },
    {
      id: 'user-accounts',
      title: 'User Accounts',
      content: `When creating an account on our platform, you agree to:`,
      list: [
        'Provide accurate and complete information',
        'Maintain the security of your account credentials',
        'Notify us immediately of any unauthorized use of your account',
        'Accept responsibility for all activities that occur under your account',
        'Not share your account with others'
      ]
    },
    {
      id: 'privacy',
      title: 'Privacy and Data Protection',
      content: `Your privacy is important to us. Our collection and use of personal information is described in our Privacy Policy. By using our services, you consent to our collection and use of your data as outlined in that policy.`
    },
    {
      id: 'intellectual-property',
      title: 'Intellectual Property',
      content: `All content on this website, including but not limited to text, graphics, logos, images, and software, is the property of Education Comes First or its content suppliers and is protected by international copyright laws.`
    },
    {
      id: 'prohibited-uses',
      title: 'Prohibited Uses',
      content: `You may not use our website:`,
      list: [
        'In any way that violates any applicable federal, state, local, or international law',
        'To transmit any advertising or promotional material without our prior written consent',
        'To impersonate or attempt to impersonate Education Comes First or its employees',
        `To engage in any conduct that restricts or inhibits anyone's use of the website`,
        'To introduce viruses, trojans, worms, or other malicious code'
      ]
    },
    {
      id: 'disclaimer',
      title: 'Disclaimer',
      content: `The materials on Education Comes First's website are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim all other warranties including, without limitation, implied warranties of merchantability, fitness for a particular purpose, or non-infringement.`
    },
    {
      id: 'limitations',
      title: 'Limitations of Liability',
      content: `In no event shall Education Comes First or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use our website.`
    },
    {
      id: 'modifications',
      title: 'Modifications to Terms',
      content: `Education Comes First may revise these terms of service at any time without notice. By using this website, you agree to be bound by the current version of these terms and conditions.`
    },
    {
      id: 'governing-law',
      title: 'Governing Law',
      content: `These terms and conditions are governed by and construed in accordance with the laws of the State of Massachusetts, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.`
    },
    {
      id: 'contact',
      title: 'Contact Information',
      content: `If you have any questions about these Terms and Conditions, please contact us:`,
      contactInfo: {
        organization: 'Education Comes First',
        email: 'info@educationcomesfirst.org',
        address: 'Lynn, Massachusetts'
      }
    }
  ]

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
            <span className="font-caveat text-lg text-secondary-light dark:text-secondary-dark">
              Terms & Conditions
            </span>
          </motion.div>

          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-4"
            >
              <div className="w-12 h-12 rounded-xl bg-primary-light/10 dark:bg-primary-dark/10 flex items-center justify-center">
                <Scale className="w-6 h-6 text-primary-light dark:text-primary-dark" />
              </div>
              <h1 className="font-kanit text-4xl sm:text-5xl md:text-6xl font-bold text-text-light dark:text-text-dark">
                Terms & Conditions
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
                    <FileText className="w-5 h-5 text-primary-light dark:text-primary-dark" />
                    <h2 className="font-kanit text-lg font-bold text-text-light dark:text-text-dark">
                      Table of Contents
                    </h2>
                  </div>
                  <nav className="space-y-2">
                    {sections.map((section, index) => (
                      <a
                        key={section.id}
                        href={`#${section.id}`}
                        className="block font-lato text-sm text-text-light/70 dark:text-text-dark/70 hover:text-primary-light dark:hover:text-primary-dark transition-colors py-1.5 px-3 rounded-lg hover:bg-bg-light dark:hover:bg-bg-dark"
                      >
                        <span className="text-xs text-text-light/40 dark:text-text-dark/40 mr-2">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        {section.title}
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
                {/* Introduction */}
                <div className="mb-12 p-6 bg-accent dark:bg-accent-dark border-l-4 border-primary-light dark:border-primary-dark rounded-r-xl">
                  <p className="font-lato text-base text-text-light/80 dark:text-text-dark/80 leading-relaxed m-0">
                    Please read these Terms and Conditions carefully before using the Education Comes First website and
                    services. These terms govern your access to and use of our services, and by accessing or using our
                    services, you agree to be bound by these terms.
                  </p>
                </div>

                {/* Sections */}
                <div className="space-y-12">
                  {sections.map((section, index) => (
                    <div key={section.id} id={section.id} className="scroll-mt-24">
                      <div className="flex items-start gap-4 mb-4">
                        <span className="shrink-0 w-8 h-8 rounded-lg bg-primary-light/10 dark:bg-primary-dark/10 flex items-center justify-center font-kanit text-sm font-bold text-primary-light dark:text-primary-dark">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <h2 className="font-kanit text-2xl sm:text-3xl font-bold text-text-light dark:text-text-dark">
                          {section.title}
                        </h2>
                      </div>

                      <div className="pl-12">
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

                        {section.contactInfo && (
                          <div className="mt-4 p-4 bg-accent dark:bg-accent-dark rounded-xl border border-border-light dark:border-border-dark">
                            <p className="font-lato text-base text-text-light/80 dark:text-text-dark/80 mb-2">
                              <strong className="text-text-light dark:text-text-dark">
                                {section.contactInfo.organization}
                              </strong>
                            </p>
                            <p className="font-lato text-base text-text-light/70 dark:text-text-dark/70">
                              Email:{' '}
                              <a
                                href={`mailto:${section.contactInfo.email}`}
                                className="text-secondary-light dark:text-secondary-dark hover:underline"
                              >
                                {section.contactInfo.email}
                              </a>
                            </p>
                            <p className="font-lato text-base text-text-light/70 dark:text-text-dark/70">
                              {section.contactInfo.address}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer CTA */}
                <div className="mt-16 pt-8 border-t border-border-light dark:border-border-dark">
                  <div className="bg-linear-to-br from-primary-light/10 to-secondary-light/10 dark:from-primary-dark/10 dark:to-secondary-dark/10 rounded-2xl p-8 text-center">
                    <h3 className="font-kanit text-2xl font-bold text-text-light dark:text-text-dark mb-3">
                      Questions About Our Terms?
                    </h3>
                    <p className="font-lato text-base text-text-light/70 dark:text-text-dark/70 mb-6 max-w-2xl mx-auto">
                      If you have any questions or concerns about these Terms and Conditions, please don&apos;t hesitate
                      to reach out to us.
                    </p>
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 bg-linear-to-r from-primary-light to-secondary-light dark:from-primary-dark dark:to-secondary-dark text-text-light dark:text-text-dark font-lato font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all"
                    >
                      Contact Us
                    </Link>
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
