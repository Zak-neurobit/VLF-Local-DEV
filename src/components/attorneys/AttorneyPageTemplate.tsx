'use client';

import Script from 'next/script';
import Image from 'next/image';
import { Phone, ArrowRight, Globe, Award, Scale, GraduationCap, MapPin, Shield, Users, Briefcase } from 'lucide-react';
import { MasterLayout } from '@/design-system/templates/MasterLayout';
import { motion } from 'framer-motion';
import { TRADEMARK } from '@/lib/constants/trademark';
import { Attorney } from '@/data/attorneys';

interface AttorneyPageTemplateProps {
  attorney: Attorney;
  language?: 'en' | 'es';
}

export function AttorneyPageTemplate({ attorney, language = 'en' }: AttorneyPageTemplateProps) {
  const isSpanish = language === 'es';
  
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
                <h1 className="text-5xl md:text-7xl font-black mb-6 text-white">{attorney.name}</h1>
                <p className="text-xl md:text-2xl mb-8 font-semibold text-primary">
                  {isSpanish ? attorney.titleEs : attorney.title}
                </p>
                <p className="text-lg mb-8 max-w-3xl mx-auto text-gray-300">
                  {attorney.practiceAreas.join(' • ')} {attorney.languages.includes('Spanish') && '• Bilingual Services'}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <motion.a
                    href="/contact"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-primary text-black font-bold rounded-lg shadow-lg hover:bg-primary-300 transition-all inline-flex items-center justify-center"
                  >
                    {isSpanish ? 'Agendar Consulta' : 'Schedule Consultation'}
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
                    <h2 className="text-3xl font-bold mb-6 text-primary">
                      {isSpanish ? `Acerca de ${attorney.name}` : `About ${attorney.name}`}
                    </h2>
                    <div className="prose prose-lg prose-invert max-w-none">
                      <p className="text-gray-300 leading-relaxed">
                        {isSpanish ? attorney.bioEs : attorney.bio}
                      </p>
                    </div>
                  </motion.div>

                  {/* Military Service (if applicable) */}
                  {attorney.militaryService && (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 }}
                      className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
                    >
                      <h3 className="text-2xl font-bold mb-6 text-primary flex items-center">
                        <Shield className="mr-3 h-8 w-8" />
                        {isSpanish ? 'Servicio Militar y Premios' : 'Military Service & Awards'}
                      </h3>
                      <div className="space-y-4">
                        <div className="flex items-start space-x-3">
                          <div className="mt-1 w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                          <div>
                            <p className="text-white font-semibold">{attorney.militaryService.branch} ({attorney.militaryService.years})</p>
                            {attorney.militaryService.role && (
                              <p className="text-gray-400">{attorney.militaryService.role}</p>
                            )}
                          </div>
                        </div>
                        {attorney.militaryService.awards?.map((award, index) => (
                          <div key={index} className="flex items-start space-x-3">
                            <div className="mt-1 w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                            <div>
                              <p className="text-white font-semibold">{award}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Practice Areas Expertise */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
                  >
                    <h3 className="text-2xl font-bold mb-6 text-primary flex items-center">
                      <Briefcase className="mr-3 h-8 w-8" />
                      {isSpanish ? 'Áreas de Experiencia' : 'Areas of Expertise'}
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      {attorney.practiceAreas.map((area, index) => (
                        <div key={index} className="flex items-start">
                          <span className="text-primary mr-2">▸</span>
                          <span className="text-gray-300">{area}</span>
                        </div>
                      ))}
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
                      src={attorney.image}
                      alt={attorney.name}
                      width={300}
                      height={360}
                      className="rounded-xl mb-6 w-full object-cover"
                    />
                    <h3 className="text-2xl font-bold mb-4 text-white">
                      {isSpanish ? `Contacta a ${attorney.name.split(' ')[0]}` : `Contact ${attorney.name.split(' ')[0]}`}
                    </h3>
                    <div className="space-y-4">
                      <a
                        href="tel:1-844-967-3536"
                        className="flex items-center text-gray-300 hover:text-primary transition-colors"
                      >
                        <Phone className="mr-3 h-5 w-5 text-primary" />
                        1-844-YO-PELEO
                      </a>
                      {attorney.offices && attorney.offices.length > 0 && (
                        <div className="flex items-start text-gray-300">
                          <MapPin className="mr-3 h-5 w-5 text-primary mt-1 flex-shrink-0" />
                          <div>
                            <p>{isSpanish ? 'Oficinas' : 'Offices'}: {attorney.offices.join(', ')}</p>
                          </div>
                        </div>
                      )}
                    </div>
                    <a
                      href="/contact"
                      className="mt-6 w-full bg-primary text-black font-bold py-3 px-6 rounded-lg hover:bg-primary-300 transition-colors flex items-center justify-center"
                    >
                      {isSpanish ? 'Agendar Consulta' : 'Schedule Consultation'}
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
                      {isSpanish ? 'Educación' : 'Education'}
                    </h3>
                    <div className="space-y-6">
                      {attorney.education.map((edu, index) => (
                        <div key={index}>
                          <h4 className="font-semibold text-white">{edu.institution}</h4>
                          <p className="text-gray-400">{edu.degree}</p>
                          {edu.year && <p className="text-sm text-gray-500">{edu.year}</p>}
                        </div>
                      ))}
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
                      {isSpanish ? 'Admisiones al Colegio de Abogados' : 'Bar Admissions'}
                    </h3>
                    <div className="space-y-3">
                      {attorney.barAdmissions.map((bar, index) => (
                        <div key={index} className="flex items-start">
                          <div className="mt-1.5 w-2 h-2 bg-primary rounded-full mr-3 flex-shrink-0"></div>
                          <div>
                            <p className="text-white font-semibold">{bar.state}</p>
                            {bar.description && <p className="text-sm text-gray-400">{bar.description}</p>}
                            {bar.year && <p className="text-sm text-gray-400">{isSpanish ? `Admitido en ${bar.year}` : `Admitted in ${bar.year}`}</p>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Professional Associations */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
                  >
                    <h3 className="text-xl font-bold mb-6 text-primary flex items-center">
                      <Users className="mr-3 h-6 w-6" />
                      {isSpanish ? 'Asociaciones Profesionales' : 'Professional Associations'}
                    </h3>
                    <div className="space-y-4">
                      {attorney.associations.map((assoc, index) => (
                        <div key={index}>
                          <h4 className="font-semibold text-white">{assoc.name}</h4>
                          {assoc.role && <p className="text-gray-400">{assoc.role}</p>}
                          {assoc.years && <p className="text-sm text-gray-500">{assoc.years}</p>}
                        </div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Languages */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
                  >
                    <h3 className="text-xl font-bold mb-6 text-primary flex items-center">
                      <Globe className="mr-3 h-6 w-6" />
                      {isSpanish ? 'Idiomas' : 'Languages'}
                    </h3>
                    <div className="space-y-3">
                      {attorney.languages.map((lang, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="text-white font-semibold">{lang}</span>
                          <span className="text-gray-400">{isSpanish ? 'Fluidez Nativa' : 'Native Fluency'}</span>
                        </div>
                      ))}
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
                {isSpanish ? '¿Listo para Luchar por Sus Derechos?' : 'Ready to Fight for Your Rights?'}
              </h2>
              <p className="text-xl mb-8 text-black/80">
                {isSpanish 
                  ? `${attorney.name} está listo para ser su defensor. ${TRADEMARK.YO_PELEO_POR_TI}™`
                  : `${attorney.name} is ready to be your advocate. ${TRADEMARK.YO_PELEO_POR_TI}™`
                }
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  href="/contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-black text-primary font-bold rounded-lg shadow-lg hover:bg-gray-900 transition-all inline-flex items-center justify-center"
                >
                  {isSpanish ? 'Agende Su Consulta' : 'Schedule Your Consultation'}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </motion.a>
                <motion.a
                  href="tel:1-844-967-3536"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white text-black font-bold rounded-lg shadow-lg hover:bg-gray-100 transition-all inline-flex items-center justify-center"
                >
                  <Phone className="mr-2 h-5 w-5" />
                  {isSpanish ? 'Llame Ahora' : 'Call Now'}: 1-844-YO-PELEO
                </motion.a>
              </div>
            </div>
          </div>
        </section>

        {/* Structured Data for SEO */}
        <Script
          id={`${attorney.slug}-structured-data`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: attorney.name,
              honorificPrefix: "Attorney",
              jobTitle: attorney.title,
              description: attorney.bio,
              url: `https://www.vasquezlawfirm.com/attorneys/${attorney.slug}`,
              image: `https://www.vasquezlawfirm.com${attorney.image}`,
              telephone: "+1-844-967-3536",
              email: attorney.email || "leads@vasquezlawfirm.com",
              address: {
                "@type": "PostalAddress",
                addressLocality: attorney.offices?.[0] || "Charlotte",
                addressRegion: "NC",
                addressCountry: "US"
              },
              alumniOf: attorney.education.map(edu => ({
                "@type": "EducationalOrganization",
                name: edu.institution
              })),
              memberOf: attorney.associations.map(assoc => ({
                "@type": "Organization",
                name: assoc.name
              })),
              worksFor: {
                "@type": "LegalService",
                name: "Vasquez Law Firm, PLLC",
                url: "https://www.vasquezlawfirm.com"
              },
              knowsLanguage: attorney.languages.map(lang => lang === 'English' ? 'en' : lang === 'Spanish' ? 'es' : lang),
              award: attorney.militaryService?.awards || [],
              hasOccupation: {
                "@type": "Occupation",
                name: attorney.title,
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