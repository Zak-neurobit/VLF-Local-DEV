'use client';

import Script from 'next/script';
import Image from 'next/image';
import { Phone, ArrowRight, Users, Award, Heart, Star } from 'lucide-react';
import { MasterLayout } from '@/design-system/templates/MasterLayout';
import { motion } from 'framer-motion';
import { TRADEMARK } from '@/lib/constants/trademark';

const staffMembers = [
  {
    name: 'Carmen Vitela',
    role: 'Chief Office Manager',
    image: '/images/staff/carmen-vitela.png',
    quote: 'Trabajar en Vasquez Law Firm significa ser parte de un equipo que brinda apoyo. Disfruto mucho de la cultura de la firma y la oportunidad de crecer profesionalmente mientras ayudo a nuestros clientes.',
  },
  {
    name: 'Daniela Patiño',
    role: 'Legal Assistant',
    image: '/images/staff/daniela-patino.png',
    quote: 'He formado parte de Vasquez Law Firm durante dos años, y ha sido una de las experiencias más gratificantes de mi carrera. El ambiente de trabajo es excelente y me encanta poder ayudar a las familias.',
  },
  {
    name: 'Flor Velásquez',
    role: 'Client Relation Specialist',
    image: '/images/staff/flor-velasquez.png',
    quote: 'Primero, doy gracias a Dios por la gran oportunidad que se me brindó hace 8 años. Ha sido un viaje increíble ser parte del crecimiento de esta firma y ayudar a tantas personas.',
  },
  {
    name: 'Gabys Rios',
    role: 'Paralegal',
    image: '/images/staff/gabys-rios.png',
    quote: 'Ser paralegal en una firma de inmigración como VLF ha sido una de las experiencias más humanas y enriquecedoras. Cada caso es una oportunidad de cambiar vidas.',
  },
  {
    name: 'Jimmy Cárdenas',
    role: 'New Hires Team Leader',
    image: '/images/staff/jimmy-cardenas.png',
    quote: 'Para mí, formar parte de Vasquez Law Firm ha sido una experiencia transformadora. Me encanta poder desarrollar nuevos talentos y ver crecer a nuestro equipo.',
  },
  {
    name: 'Samantha Ortegón',
    role: 'Intake Specialist',
    image: '/images/staff/samantha-ortegon.png',
    quote: 'Mi experiencia dentro de la firma Vasquez ha sido grandiosa, ha sido de los mejores trabajos que he tenido. El apoyo del equipo y la satisfacción de ayudar a los clientes es incomparable.',
  },
];

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
                <h1 className="text-5xl md:text-7xl font-black mb-6 text-white">
                  Voces de <span className="text-primary">Nuestro Equipo</span>
                </h1>
                <p className="text-xl md:text-2xl mb-8 font-semibold text-primary">
                  The Heart of Vasquez Law Firm
                </p>
                <p className="text-lg mb-8 max-w-3xl mx-auto text-gray-300">
                  Meet the dedicated professionals who make our firm exceptional. 
                  Their passion, expertise, and commitment to our clients drive our success every day.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Core Values Section */}
        <section className="py-20 bg-gradient-to-b from-black to-neutral-950">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-black mb-6 text-white">
                Our Core <span className="text-primary">Values</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                These values guide everything we do and shape how we serve our clients
              </p>
            </motion.div>

            <div className="grid md:grid-cols-5 gap-8 mb-20">
              {[
                { icon: <Heart className="w-8 h-8" />, title: 'MY FAMILY, YOUR FAMILY', desc: 'We treat clients and team as family' },
                { icon: <Award className="w-8 h-8" />, title: 'HONESTY', desc: 'Straightforward and transparent always' },
                { icon: <Star className="w-8 h-8" />, title: 'DEDICATION', desc: 'Committed to everyone\'s growth' },
                { icon: <Users className="w-8 h-8" />, title: 'QUALITY EXPERIENCE', desc: 'Creating a productive workspace' },
                { icon: <Award className="w-8 h-8" />, title: 'I FIGHT - YO PELEO', desc: 'Fighting with passion for all' },
              ].map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="bg-gradient-to-b from-primary/20 to-transparent p-6 rounded-2xl mb-4">
                    <div className="text-primary">{value.icon}</div>
                  </div>
                  <h3 className="font-bold text-white mb-2">{value.title}</h3>
                  <p className="text-sm text-gray-400">{value.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Staff Members Grid */}
        <section className="py-20 bg-black">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-black mb-6 text-white">
                Meet Our <span className="text-primary">Amazing Team</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Each member brings unique talents and perspectives that strengthen our firm
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {staffMembers.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gradient-to-b from-neutral-900 to-neutral-950 rounded-2xl overflow-hidden border border-primary/20 hover:border-primary/40 transition-all"
                >
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                  </div>
                  
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-white mb-2">{member.name}</h3>
                    <p className="text-primary font-semibold mb-4">{member.role}</p>
                    <p className="text-gray-300 italic">"{member.quote}"</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Join Our Team Section */}
        <section className="py-20 bg-gradient-to-b from-neutral-950 to-black">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto text-center"
            >
              <h2 className="text-4xl md:text-5xl font-black mb-6 text-white">
                Join Our <span className="text-primary">Growing Team</span>
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                We're always looking for talented individuals who share our passion for helping others 
                and our commitment to excellence. If you want to be part of a team that makes a real 
                difference in people's lives, we'd love to hear from you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  href="/contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center px-8 py-4 bg-primary text-black font-bold rounded-full transition-all hover:bg-primary-300"
                >
                  View Career Opportunities
                  <ArrowRight className="ml-2 w-5 h-5" />
                </motion.a>
                <motion.a
                  href="tel:1-844-967-3536"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center px-8 py-4 bg-transparent text-white font-bold rounded-full border-2 border-white hover:bg-white hover:text-black transition-all"
                >
                  <Phone className="mr-2 w-5 h-5" />
                  Contact HR
                </motion.a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Team Stats */}
        <section className="py-20 bg-black">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { value: '50+', label: 'Team Members' },
                { value: '8+', label: 'Years Average Tenure' },
                { value: '95%', label: 'Employee Satisfaction' },
                { value: '24/7', label: 'Client Support' },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <p className="text-4xl md:text-5xl font-bold text-primary mb-2">{stat.value}</p>
                  <p className="text-gray-400">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Structured Data for SEO */}
        <Script
          id="team-structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'AboutPage',
              name: 'Our Team - Vasquez Law Firm',
              description: 'Meet the dedicated professionals at Vasquez Law Firm who make our firm exceptional.',
              url: 'https://www.vasquezlawfirm.com/our-team',
              mainEntity: {
                '@type': 'LegalService',
                name: 'Vasquez Law Firm, PLLC',
                url: 'https://www.vasquezlawfirm.com',
                employee: staffMembers.map(member => ({
                  '@type': 'Person',
                  name: member.name,
                  jobTitle: member.role,
                  worksFor: {
                    '@type': 'LegalService',
                    name: 'Vasquez Law Firm, PLLC',
                  },
                })),
              },
            }),
          }}
        />
      </div>
    </MasterLayout>
  );
}