'use client';

import Script from 'next/script';
import Image from 'next/image';
import { Phone, ArrowRight, Globe, Award, Scale, GraduationCap, MapPin } from 'lucide-react';
import { MasterLayout } from '@/design-system/templates/MasterLayout';
import { motion } from 'framer-motion';
import { TRADEMARK } from '@/lib/constants/trademark';

export default function Page() {
  return (
    <MasterLayout variant="hero" showBreadcrumbs={false}>
      <div className="min-h-screen bg-black">
        {/* Hero Section with Modern Design */}
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
                <h1 className="text-5xl md:text-7xl font-black mb-6 text-white">William G. Vasquez</h1>
                <p className="text-xl md:text-2xl mb-8 font-semibold text-primary">
                  Founding Partner - Fighting for Your Rights Since 2003
                </p>
                <p className="text-lg mb-8 max-w-3xl mx-auto text-gray-300">
                  "{TRADEMARK.YO_PELEO_POR_TI}" - Over 20 years defending immigrants and injury victims
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <motion.a
                    href="/contact"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center px-8 py-4 bg-primary text-black font-bold rounded-full transition-all hover:bg-primary-300"
                  >
                    Free Consultation
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </motion.a>
                  <motion.a
                    href="tel:1-844-967-3536"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center px-8 py-4 bg-transparent text-white font-bold rounded-full border-2 border-white hover:bg-white hover:text-black transition-all"
                  >
                    <Phone className="mr-2 w-5 h-5" />
                    1-844-YO-PELEO
                  </motion.a>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-20 bg-gradient-to-b from-black to-neutral-950">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              {/* Attorney Photo and Bio */}
              <div className="grid md:grid-cols-2 gap-12 mb-20">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <div className="relative h-[500px] rounded-2xl overflow-hidden border border-primary/20">
                    <Image
                      src="/images/attorneys/william-vasquez.jpg"
                      alt="William Vasquez, Attorney at Vasquez Law Firm"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="flex flex-col justify-center"
                >
                  <h2 className="text-3xl md:text-4xl font-black mb-6 text-white">
                    Founding Partner & Lead Attorney
                  </h2>
                  <p className="text-lg mb-6 text-gray-300">
                    William G. Vasquez is the founding partner of Vasquez Law Firm, PLLC, and a
                    passionate advocate for immigrant rights and injury victims throughout North
                    Carolina and Florida. With over two decades of legal experience, he has built a
                    reputation as a fierce litigator who truly fights for his clients.
                  </p>
                  <p className="text-lg mb-8 text-gray-300">
                    Born in El Salvador and raised in the United States, William understands firsthand
                    the immigrant experience and the challenges faced by those seeking a better life
                    in America. As a U.S. Air Force veteran, he brings military discipline and
                    strategic thinking to every case.
                  </p>
                  
                  {/* Quick Info */}
                  <div className="grid grid-cols-2 gap-6">
                    <div className="bg-neutral-900/50 p-4 rounded-xl border border-primary/20">
                      <Globe className="w-6 h-6 text-primary mb-2" />
                      <h4 className="font-bold mb-1 text-white">Languages</h4>
                      <p className="text-gray-400">English, Spanish (Native)</p>
                    </div>
                    <div className="bg-neutral-900/50 p-4 rounded-xl border border-primary/20">
                      <Award className="w-6 h-6 text-primary mb-2" />
                      <h4 className="font-bold mb-1 text-white">Experience</h4>
                      <p className="text-gray-400">20+ Years</p>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Credentials Grid */}
              <div className="grid md:grid-cols-3 gap-8 mb-20">
                {/* Education */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="bg-gradient-to-b from-neutral-900 to-neutral-950 p-8 rounded-2xl border border-primary/20"
                >
                  <GraduationCap className="w-8 h-8 text-primary mb-4" />
                  <h3 className="text-2xl font-bold mb-6 text-white">Education</h3>
                  <ul className="space-y-4">
                    <li className="border-l-2 border-primary pl-4">
                      <p className="font-semibold text-white">J.D., Law</p>
                      <p className="text-gray-400 text-sm">
                        North Carolina Central University School of Law, 2003
                      </p>
                    </li>
                    <li className="border-l-2 border-primary pl-4">
                      <p className="font-semibold text-white">B.A., Political Science</p>
                      <p className="text-gray-400 text-sm">
                        University of North Carolina at Chapel Hill, 2000
                      </p>
                    </li>
                  </ul>
                </motion.div>

                {/* Bar Admissions */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="bg-gradient-to-b from-neutral-900 to-neutral-950 p-8 rounded-2xl border border-primary/20"
                >
                  <MapPin className="w-8 h-8 text-primary mb-4" />
                  <h3 className="text-2xl font-bold mb-6 text-white">Bar Admissions</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center text-gray-300">
                      <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                      North Carolina State Bar
                    </li>
                    <li className="flex items-center text-gray-300">
                      <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                      Florida State Bar
                    </li>
                    <li className="flex items-center text-gray-300">
                      <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                      U.S. District Court, Eastern NC
                    </li>
                    <li className="flex items-center text-gray-300">
                      <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                      U.S. District Court, Middle NC
                    </li>
                  </ul>
                </motion.div>

                {/* Practice Areas */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="bg-gradient-to-b from-neutral-900 to-neutral-950 p-8 rounded-2xl border border-primary/20"
                >
                  <Scale className="w-8 h-8 text-primary mb-4" />
                  <h3 className="text-2xl font-bold mb-6 text-white">Practice Areas</h3>
                  <div className="flex flex-wrap gap-2">
                    {[
                      'Immigration Law',
                      'Personal Injury',
                      'Workers Compensation',
                      'Criminal Defense',
                      'Family Law',
                      'DWI/DUI Defense',
                    ].map((area) => (
                      <span
                        key={area}
                        className="px-3 py-1 bg-primary/10 text-xs text-primary rounded-full border border-primary/20"
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Achievements Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-gradient-to-r from-primary/10 to-secondary/10 p-12 rounded-3xl border border-primary/20 mb-20"
              >
                <h3 className="text-3xl font-black mb-8 text-white text-center">Notable Achievements</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    'Successfully defended thousands of clients facing deportation',
                    'Recovered millions of dollars for injury victims',
                    'Featured legal analyst on Despierta Raleigh and Spanish media',
                    'Active member of the American Immigration Lawyers Association (AILA)',
                    'U.S. Air Force veteran - bringing military discipline to legal practice',
                    'Recognized as a Top Immigration Attorney in North Carolina',
                  ].map((achievement, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start"
                    >
                      <span className="text-primary mr-3 mt-1">✓</span>
                      <span className="text-gray-300">{achievement}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-black relative overflow-hidden">
          <div className="absolute inset-0">
            <motion.div
              animate={{
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-secondary/10"
            />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl md:text-5xl font-black mb-4 text-white">
                  Ready to Get Started?
                </h2>
                <p className="text-xl mb-8 text-gray-300">
                  Contact our experienced attorneys today for a free consultation.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <motion.a
                    href="/contact"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center px-8 py-4 bg-primary text-black font-bold rounded-full transition-all hover:bg-primary-300"
                  >
                    Schedule Consultation
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </motion.a>
                  <motion.a
                    href="tel:1-844-967-3536"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center px-8 py-4 bg-transparent text-white font-bold rounded-full border-2 border-white hover:bg-white hover:text-black transition-all"
                  >
                    <Phone className="mr-2 w-5 h-5" />
                    Call Now
                  </motion.a>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Structured Data for SEO */}
        <Script
          id="attorney-structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'William Vasquez',
              jobTitle: 'Attorney',
              image: 'https://www.vasquezlawfirm.com/images/attorneys/william-vasquez.jpg',
              worksFor: {
                '@type': 'LegalService',
                name: 'Vasquez Law Firm, PLLC',
                url: 'https://www.vasquezlawfirm.com',
                telephone: '+1-919-537-8722',
                priceRange: '$$',
              },
              url: 'https://www.vasquezlawfirm.com/attorneys/william-vasquez/page',
              sameAs: [
                'https://www.linkedin.com/company/vasquez-law-firm',
                'https://www.facebook.com/vasquezlawfirm',
              ],
            }),
          }}
        />
      </div>
    </MasterLayout>
  );
}