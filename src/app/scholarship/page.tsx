'use client';

import Script from 'next/script';
import { GraduationCap, Calendar, Award, Mail, CheckCircle, ArrowRight } from 'lucide-react';
import { MasterLayout } from '@/design-system/templates/MasterLayout';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function Page() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement email subscription logic
    setIsSubscribed(true);
    setTimeout(() => setIsSubscribed(false), 5000);
  };

  return (
    <MasterLayout variant="hero" showBreadcrumbs={false}>
      <div className="min-h-screen bg-black">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-black py-24">
          {/* Animated Background */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-black to-secondary/10" />
            <motion.div
              className="absolute inset-0"
              animate={{
                background: [
                  'radial-gradient(circle at 20% 50%, rgba(201, 151, 77, 0.15) 0%, transparent 50%)',
                  'radial-gradient(circle at 80% 50%, rgba(107, 31, 46, 0.15) 0%, transparent 50%)',
                  'radial-gradient(circle at 20% 50%, rgba(201, 151, 77, 0.15) 0%, transparent 50%)',
                ],
              }}
              transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
            />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-flex items-center px-6 py-3 bg-primary/20 backdrop-blur-sm rounded-full mb-6">
                  <GraduationCap className="w-5 h-5 text-primary mr-2" />
                  <span className="text-primary font-semibold">Supporting DACA Dreamers</span>
                </div>

                <h1 className="text-5xl md:text-7xl font-black mb-6 text-white">
                  Vasquez Law Firm <span className="text-primary">DACA Dreamer Scholarship</span>
                </h1>
                <p className="text-xl md:text-2xl mb-8 font-semibold text-primary">
                  Empowering Dreams Through Education
                </p>
                <p className="text-lg mb-8 max-w-3xl mx-auto text-gray-300">
                  At Vasquez Law Firm, we believe in the power of education to transform lives. Our
                  DACA Dreamer Scholarship provides financial support to exceptional DACA recipients
                  pursuing higher education, helping them achieve their dreams and build brighter
                  futures.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <motion.a
                    href="#apply"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center px-8 py-4 bg-primary text-black font-bold rounded-full transition-all hover:bg-primary-300"
                  >
                    Apply Now
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </motion.a>
                  <motion.a
                    href="#requirements"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center px-8 py-4 bg-transparent text-white font-bold rounded-full border-2 border-white hover:bg-white hover:text-black transition-all"
                  >
                    View Requirements
                  </motion.a>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Scholarship Details */}
        <section className="py-20 bg-gradient-to-b from-black to-neutral-950">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-black mb-6 text-white">
                Scholarship <span className="text-primary">Details</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Two scholarships awarded each semester to outstanding DACA recipients
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  icon: <Award className="w-12 h-12" />,
                  title: 'Award Amount',
                  description: '$1,000 per semester',
                  details:
                    'Two scholarships awarded each semester to help cover educational expenses',
                },
                {
                  icon: <Calendar className="w-12 h-12" />,
                  title: 'Application Deadline',
                  description: 'November 27, 2024',
                  details: 'Winners will be notified by January 8, 2025',
                },
                {
                  icon: <GraduationCap className="w-12 h-12" />,
                  title: 'Eligibility',
                  description: 'DACA Recipients',
                  details: 'Must be enrolled or planning to enroll in an accredited university',
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gradient-to-b from-neutral-900 to-neutral-950 rounded-2xl p-8 border border-primary/20 hover:border-primary/40 transition-all"
                >
                  <div className="text-primary mb-4">{item.icon}</div>
                  <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-primary font-bold mb-2">{item.description}</p>
                  <p className="text-gray-400">{item.details}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Requirements Section */}
        <section id="requirements" className="py-20 bg-black">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-black mb-6 text-white">
                Eligibility <span className="text-primary">Requirements</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                To qualify for the Vasquez Law Firm DACA Dreamer Scholarship, applicants must meet
                the following criteria
              </p>
            </motion.div>

            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8">
                {[
                  'Must be a DACA recipient pursuing higher education',
                  'GPA of 3.5 or higher',
                  'Enrolled or planning to enroll in an accredited university for Fall 2024',
                  'At least 17 years old',
                ].map((requirement, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start"
                  >
                    <CheckCircle className="w-6 h-6 text-primary mr-3 flex-shrink-0 mt-1" />
                    <p className="text-lg text-gray-300">{requirement}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Application Requirements */}
        <section className="py-20 bg-gradient-to-b from-neutral-950 to-black">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-black mb-6 text-white">
                Application <span className="text-primary">Requirements</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Complete your application with the following documents and materials
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  title: 'Online Application',
                  description:
                    'Complete the comprehensive online application form with all required information',
                },
                {
                  title: 'Academic Transcript',
                  description: 'Submit unofficial academic transcript showing GPA of 3.5 or higher',
                },
                {
                  title: 'Proof of Enrollment',
                  description:
                    'Documentation confirming enrollment or acceptance to an accredited university',
                },
                {
                  title: 'DACA Status',
                  description: 'Documentation proving current DACA recipient status',
                },
                {
                  title: 'Original Artwork',
                  description:
                    'Submit original artwork depicting your immigration experience (painting, sculpture, poetry, etc.)',
                },
                {
                  title: 'Personal Statement',
                  description:
                    'Share your story and how this scholarship will help achieve your educational goals',
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gradient-to-b from-neutral-900 to-neutral-950 rounded-2xl p-6 border border-primary/20 hover:border-primary/40 transition-all"
                >
                  <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-gray-400">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Email Notification Section */}
        <section id="apply" className="py-20 bg-black">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto"
            >
              <div className="bg-gradient-to-b from-neutral-900 to-neutral-950 rounded-3xl p-12 border border-primary/20">
                <div className="text-center mb-8">
                  <h2 className="text-4xl md:text-5xl font-black mb-6 text-white">
                    Application <span className="text-primary">Coming Soon</span>
                  </h2>
                  <p className="text-xl text-gray-300 mb-8">
                    The scholarship application form is not yet open. Sign up below to receive an
                    email notification when applications become available.
                  </p>
                </div>

                <form onSubmit={handleSubscribe} className="max-w-md mx-auto">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                      className="flex-1 px-6 py-4 bg-black border border-primary/30 rounded-full text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors"
                    />
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-4 bg-primary text-black font-bold rounded-full hover:bg-primary-300 transition-all"
                    >
                      Notify Me
                    </motion.button>
                  </div>
                  {isSubscribed && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-green-400 text-center mt-4"
                    >
                      Thank you! We&apos;ll notify you when applications open.
                    </motion.p>
                  )}
                </form>

                <div className="text-center mt-8">
                  <p className="text-gray-400 mb-2">Questions about the scholarship?</p>
                  <a
                    href="mailto:scholarship@vasquezlawfirm.com"
                    className="inline-flex items-center text-primary hover:text-primary-300 transition-colors"
                  >
                    <Mail className="w-5 h-5 mr-2" />
                    scholarship@vasquezlawfirm.com
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Evaluation Criteria */}
        <section className="py-20 bg-gradient-to-b from-black to-neutral-950">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-black mb-6 text-white">
                Evaluation <span className="text-primary">Criteria</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Applications will be evaluated based on the following criteria
              </p>
            </motion.div>

            <div className="max-w-4xl mx-auto">
              <div className="space-y-6">
                {[
                  {
                    title: 'Comprehensive Documentation',
                    description:
                      'Complete and accurate submission of all required documents and materials',
                  },
                  {
                    title: 'Thorough Application Responses',
                    description: 'Detailed and thoughtful answers to all application questions',
                  },
                  {
                    title: 'Original Ideas & Personal Experience',
                    description:
                      'Creative artwork that authentically reflects your immigration journey and experiences',
                  },
                ].map((criteria, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gradient-to-r from-primary/10 to-transparent p-6 rounded-2xl border-l-4 border-primary"
                  >
                    <h3 className="text-xl font-bold text-white mb-2">{criteria.title}</h3>
                    <p className="text-gray-300">{criteria.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-black">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto text-center"
            >
              <h2 className="text-4xl md:text-5xl font-black mb-6 text-white">
                Ready to <span className="text-primary">Apply?</span>
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Take the first step towards achieving your educational dreams
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  href="#apply"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center px-8 py-4 bg-primary text-black font-bold rounded-full transition-all hover:bg-primary-300"
                >
                  Get Notified When Applications Open
                  <ArrowRight className="ml-2 w-5 h-5" />
                </motion.a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Structured Data for SEO */}
        <Script
          id="scholarship-structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'ScholarshipProgram',
              name: 'Vasquez Law Firm DACA Dreamer Scholarship',
              description: 'Financial support for DACA recipients pursuing higher education',
              provider: {
                '@type': 'LegalService',
                name: 'Vasquez Law Firm, PLLC',
                url: 'https://www.vasquezlawfirm.com',
              },
              amount: {
                '@type': 'MonetaryAmount',
                value: '1000',
                currency: 'USD',
              },
              educationalLevel: 'Higher Education',
              applicationDeadline: '2024-11-27',
              url: 'https://www.vasquezlawfirm.com/scholarship',
            }),
          }}
        />
      </div>
    </MasterLayout>
  );
}
