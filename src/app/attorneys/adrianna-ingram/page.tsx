'use client';

import Script from 'next/script';
import Image from 'next/image';
import { Phone, ArrowRight, Globe, Scale, GraduationCap, MapPin, Briefcase } from 'lucide-react';
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
                <h1 className="text-5xl md:text-7xl font-black mb-6 text-white">Adrianna Ingram</h1>
                <p className="text-xl md:text-2xl mb-8 font-semibold text-primary">
                  Immigration Attorney
                </p>
                <p className="text-lg mb-8 max-w-3xl mx-auto text-gray-300">
                  &quot;{TRADEMARK.YO_PELEO_POR_TI}&quot; - Dedicated Advocate for Immigrant Rights
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <motion.a
                    href="/contact"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-primary text-black font-bold rounded-lg shadow-lg hover:bg-primary-300 transition-all inline-flex items-center justify-center"
                  >
                    Schedule Consultation
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </motion.a>
                  <motion.a
                    href="tel:1-844-967-3536"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-bold rounded-lg shadow-lg hover:bg-white/20 transition-all inline-flex items-center justify-center border border-white/20"
                  >
                    <Phone className="mr-2 h-5 w-5" />
                    1-844-YO-PELEO
                  </motion.a>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-20 bg-neutral-950">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <div className="grid lg:grid-cols-3 gap-12">
                {/* Bio Section - 2 columns wide */}
                <div className="lg:col-span-2 space-y-8">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
                  >
                    <h2 className="text-3xl font-bold mb-6 text-primary">About Adrianna Ingram</h2>
                    <div className="prose prose-lg prose-invert max-w-none">
                      <p className="text-gray-300 leading-relaxed mb-6">
                        Adrianna Ingram is a dedicated immigration attorney with a passion for helping individuals and families navigate the complex U.S. immigration system. Her commitment to immigrant rights and social justice drives her practice, where she provides compassionate and effective legal representation.
                      </p>
                      <p className="text-gray-300 leading-relaxed mb-6">
                        With extensive experience in family-based immigration, deportation defense, and asylum cases, Adrianna has successfully helped countless clients achieve their American dream. She is known for her thorough approach to each case and her ability to find creative solutions to complex immigration challenges.
                      </p>
                      <p className="text-gray-300 leading-relaxed">
                        As a graduate of North Carolina Central University School of Law, Adrianna brings both legal expertise and cultural understanding to her practice. Her bilingual abilities allow her to better serve North Carolina&apos;s diverse immigrant communities, ensuring that language is never a barrier to quality legal representation.
                      </p>
                    </div>
                  </motion.div>

                  {/* Practice Areas Expertise */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
                  >
                    <h3 className="text-2xl font-bold mb-6 text-primary flex items-center">
                      <Briefcase className="mr-3 h-8 w-8" />
                      Areas of Expertise
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h4 className="text-xl font-semibold text-white">Immigration Law</h4>
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <span className="text-primary mr-2">▸</span>
                            <span className="text-gray-300">Family-Based Immigration</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-primary mr-2">▸</span>
                            <span className="text-gray-300">Green Cards & Visas</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-primary mr-2">▸</span>
                            <span className="text-gray-300">Deportation Defense</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-primary mr-2">▸</span>
                            <span className="text-gray-300">Asylum & Refugee Cases</span>
                          </li>
                        </ul>
                      </div>
                      <div className="space-y-4">
                        <h4 className="text-xl font-semibold text-white">Additional Services</h4>
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <span className="text-primary mr-2">▸</span>
                            <span className="text-gray-300">VAWA Applications</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-primary mr-2">▸</span>
                            <span className="text-gray-300">U & T Visas</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-primary mr-2">▸</span>
                            <span className="text-gray-300">Citizenship & Naturalization</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-primary mr-2">▸</span>
                            <span className="text-gray-300">Employment Authorization</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Sidebar - 1 column wide */}
                <div className="space-y-8">
                  {/* Contact Card */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-br from-primary/10 to-secondary/10 backdrop-blur-sm rounded-2xl p-8 border border-primary/20"
                  >
                    <Image
                      src="/images/attorneys/adrianna-ingram.jpg"
                      alt="Adrianna Ingram"
                      width={300}
                      height={360}
                      className="rounded-xl mb-6 w-full object-cover"
                    />
                    <h3 className="text-2xl font-bold mb-4 text-white">Contact Adrianna</h3>
                    <div className="space-y-4">
                      <a
                        href="tel:1-844-967-3536"
                        className="flex items-center text-gray-300 hover:text-primary transition-colors"
                      >
                        <Phone className="mr-3 h-5 w-5 text-primary" />
                        1-844-YO-PELEO
                      </a>
                      <div className="flex items-start text-gray-300">
                        <MapPin className="mr-3 h-5 w-5 text-primary mt-1 flex-shrink-0" />
                        <div>
                          <p>Charlotte Office</p>
                          <p className="text-sm text-gray-400">5701 Executive Center Dr, Suite 103</p>
                          <p className="text-sm text-gray-400">Charlotte, NC 28212</p>
                        </div>
                      </div>
                    </div>
                    <a
                      href="/contact"
                      className="mt-6 w-full bg-primary text-black font-bold py-3 px-6 rounded-lg hover:bg-primary-300 transition-colors flex items-center justify-center"
                    >
                      Schedule Consultation
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </a>
                  </motion.div>

                  {/* Education */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
                  >
                    <h3 className="text-xl font-bold mb-6 text-primary flex items-center">
                      <GraduationCap className="mr-3 h-6 w-6" />
                      Education
                    </h3>
                    <div>
                      <h4 className="font-semibold text-white">North Carolina Central University School of Law</h4>
                      <p className="text-gray-400">J.D. | Juris Doctor</p>
                    </div>
                  </motion.div>

                  {/* Bar Admissions */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
                  >
                    <h3 className="text-xl font-bold mb-6 text-primary flex items-center">
                      <Scale className="mr-3 h-6 w-6" />
                      Bar Admissions
                    </h3>
                    <div className="flex items-start">
                      <div className="mt-1.5 w-2 h-2 bg-primary rounded-full mr-3 flex-shrink-0"></div>
                      <div>
                        <p className="text-white font-semibold">North Carolina</p>
                        <p className="text-sm text-gray-400">Member in Good Standing</p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Languages */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
                  >
                    <h3 className="text-xl font-bold mb-6 text-primary flex items-center">
                      <Globe className="mr-3 h-6 w-6" />
                      Languages
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-white font-semibold">English</span>
                        <span className="text-gray-400">Native Fluency</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-white font-semibold">Spanish</span>
                        <span className="text-gray-400">Professional Fluency</span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary to-primary-300">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl font-bold mb-6 text-black">
                Ready to Start Your Immigration Journey?
              </h2>
              <p className="text-xl mb-8 text-black/80">
                Let Adrianna Ingram guide you through the immigration process with expertise and compassion.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  href="/contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-black text-primary font-bold rounded-lg shadow-lg hover:bg-gray-900 transition-all inline-flex items-center justify-center"
                >
                  Schedule Your Consultation
                  <ArrowRight className="ml-2 h-5 w-5" />
                </motion.a>
                <motion.a
                  href="tel:1-844-967-3536"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white text-black font-bold rounded-lg shadow-lg hover:bg-gray-100 transition-all inline-flex items-center justify-center"
                >
                  <Phone className="mr-2 h-5 w-5" />
                  Call Now: 1-844-YO-PELEO
                </motion.a>
              </div>
            </div>
          </div>
        </section>

        {/* Structured Data for SEO */}
        <Script
          id="adrianna-ingram-structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Adrianna Ingram",
              jobTitle: "Immigration Attorney",
              description: "Dedicated immigration attorney specializing in family-based immigration, deportation defense, and asylum cases in North Carolina.",
              url: "https://www.vasquezlawfirm.com/attorneys/adrianna-ingram",
              image: "https://www.vasquezlawfirm.com/images/attorneys/adrianna-ingram.jpg",
              telephone: "+1-844-967-3536",
              email: "leads@vasquezlawfirm.com",
              address: {
                "@type": "PostalAddress",
                streetAddress: "5701 Executive Center Dr, Suite 103",
                addressLocality: "Charlotte",
                addressRegion: "NC",
                postalCode: "28212",
                addressCountry: "US"
              },
              alumniOf: {
                "@type": "EducationalOrganization",
                name: "North Carolina Central University School of Law",
                url: "https://law.nccu.edu/"
              },
              memberOf: {
                "@type": "Organization",
                name: "North Carolina State Bar",
                url: "https://www.ncbar.gov/"
              },
              worksFor: {
                "@type": "LegalService",
                name: "Vasquez Law Firm, PLLC",
                url: "https://www.vasquezlawfirm.com"
              },
              knowsLanguage: ["en", "es"],
              hasOccupation: {
                "@type": "Occupation",
                name: "Immigration Attorney",
                educationRequirements: "Juris Doctor",
                occupationalCategory: "23-1011.00"
              }
            })
          }}
        />
      </div>
    </MasterLayout>
  );
}
