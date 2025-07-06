'use client';

import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Script from 'next/script';
import Image from 'next/image';
const ChatWidget = dynamic(() => import('@/components/ChatWidget').then(mod => mod.ChatWidget), {
  ssr: false,
});
import { Globe, Scale, Phone, ArrowRight, Award, Users, Shield, Star, Briefcase } from 'lucide-react';
import { generateAttorneySchema } from '@/components/SEO/schemas';
import { attorneys } from '@/data/attorneys';
import { TRADEMARK } from '@/lib/constants/trademark';

interface AttorneysPageContentProps {
  language: 'en' | 'es';
}

export default function AttorneysPageContent({ language }: AttorneysPageContentProps) {
  const [hoveredAttorney, setHoveredAttorney] = useState<string | null>(null);

  const content = {
    en: {
      title: 'Our Elite Legal Team',
      subtitle: 'Experienced Attorneys Fighting for Your Rights',
      description:
        'Meet our dedicated team of attorneys who combine decades of legal expertise with compassionate client service to deliver exceptional results.',
      viewProfile: 'View Full Profile',
      specialties: 'Practice Areas',
      languages: 'Languages',
      barAdmissions: 'Bar Admissions',
      education: 'Education',
      schedule: 'Schedule Consultation',
      teamApproach: 'Our Team Approach',
      teamDescription:
        "At Vasquez Law Firm, we believe in collaborative representation. Our attorneys work together, leveraging each other's strengths to provide comprehensive legal solutions for our clients throughout North Carolina and Florida.",
      whyChoose: 'Why Choose Our Attorneys?',
      experience: '35+ Years of Excellence',
      technology: 'Cutting-Edge Legal Strategies',
      bilingual: 'Bilingual Team (English & Spanish)',
      results: 'Thousands of Successful Cases',
      cta: {
        title: 'Ready to Fight for Your Rights?',
        description: `Contact our experienced attorneys today for a free consultation. ${TRADEMARK.YO_PELEO_POR_TI}™`,
        button1: 'Free Case Evaluation',
        button2: 'Call: 1-844-YO-PELEO',
      },
    },
    es: {
      title: 'Nuestro Equipo Legal Elite',
      subtitle: 'Abogados Experimentados Luchando por Sus Derechos',
      description:
        'Conozca a nuestro dedicado equipo de abogados que combinan décadas de experiencia legal con servicio compasivo al cliente para ofrecer resultados excepcionales.',
      viewProfile: 'Ver Perfil Completo',
      specialties: 'Áreas de Práctica',
      languages: 'Idiomas',
      barAdmissions: 'Admisiones al Colegio de Abogados',
      education: 'Educación',
      schedule: 'Agendar Consulta',
      teamApproach: 'Nuestro Enfoque de Equipo',
      teamDescription:
        'En Vasquez Law Firm, creemos en la representación colaborativa. Nuestros abogados trabajan juntos, aprovechando las fortalezas de cada uno para brindar soluciones legales integrales a nuestros clientes en Carolina del Norte y Florida.',
      whyChoose: '¿Por Qué Elegir a Nuestros Abogados?',
      experience: 'Más de 35 Años de Excelencia',
      technology: 'Estrategias Legales de Vanguardia',
      bilingual: 'Equipo Bilingüe (Inglés y Español)',
      results: 'Miles de Casos Exitosos',
      cta: {
        title: '¿Listo para Luchar por Sus Derechos?',
        description: `Contáctenos hoy para una consulta gratuita con nuestros abogados experimentados. ${TRADEMARK.YO_PELEO_POR_TI}™`,
        button1: 'Evaluación Gratuita',
        button2: 'Llame: 1-844-YO-PELEO',
      },
    },
  };

  const t = content[language];
  const isSpanish = language === 'es';

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section with Modern Design */}
      <section className="relative overflow-hidden bg-black py-32">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-black to-secondary/10" />
          <motion.div
            className="absolute inset-0"
            animate={{
              background: [
                'radial-gradient(circle at 20% 50%, rgba(201, 151, 77, 0.1) 0%, transparent 50%)',
                'radial-gradient(circle at 80% 50%, rgba(107, 31, 46, 0.1) 0%, transparent 50%)',
                'radial-gradient(circle at 20% 50%, rgba(201, 151, 77, 0.1) 0%, transparent 50%)',
              ],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
          />
          {/* Floating particles */}
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-1 w-1 bg-primary/30 rounded-full"
              initial={{
                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
                y: Math.random() * 600,
              }}
              animate={{
                y: [null, -200],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                delay: Math.random() * 5,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-black mb-6">
              <span className="bg-gradient-to-r from-primary to-primary-300 bg-clip-text text-transparent">
                {t.title}
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-primary font-semibold mb-6">{t.subtitle}</p>
            <p className="max-w-3xl mx-auto text-lg text-gray-300">{t.description}</p>
          </motion.div>
        </div>
      </section>

      {/* Attorneys Grid with Modern Cards */}
      <section className="py-20 bg-gradient-to-b from-black to-neutral-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {attorneys.map((attorney, index) => (
              <motion.div
                key={attorney.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onMouseEnter={() => setHoveredAttorney(attorney.id)}
                onMouseLeave={() => setHoveredAttorney(null)}
                className="group relative"
              >
                <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-primary/20 hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20">
                  {/* Glow Effect */}
                  <AnimatePresence>
                    {hoveredAttorney === attorney.id && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent pointer-events-none"
                      />
                    )}
                  </AnimatePresence>

                  <div className="h-80 relative overflow-hidden">
                    <Image
                      src={attorney.image}
                      alt={attorney.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-2xl font-bold text-white">{attorney.name}</h3>
                      <p className="text-primary font-semibold">{isSpanish ? attorney.titleEs : attorney.title}</p>
                    </div>
                  </div>
                  
                  <div className="p-6 relative">
                    <p className="text-gray-400 mb-4 line-clamp-3">{isSpanish ? attorney.bioEs : attorney.bio}</p>

                    {/* Practice Areas with Modern Pills */}
                    <div className="mb-4">
                      <h4 className="font-semibold text-white mb-2 flex items-center">
                        <Scale className="w-4 h-4 mr-2 text-primary" />
                        {t.specialties}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {attorney.practiceAreas.slice(0, 3).map(specialty => (
                          <span
                            key={specialty}
                            className="px-3 py-1 bg-primary/10 text-xs text-primary rounded-full border border-primary/20"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Languages */}
                    {attorney.languages.length > 0 && (
                      <div className="mb-6">
                        <h4 className="font-semibold text-white mb-1 flex items-center">
                          <Globe className="w-4 h-4 mr-2 text-primary" />
                          {t.languages}
                        </h4>
                        <p className="text-sm text-gray-400">{attorney.languages.join(', ')}</p>
                      </div>
                    )}

                    <Link
                      href={`/attorneys/${attorney.slug}`}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-black rounded-full hover:bg-primary-300 transition-all font-bold group-hover:scale-105"
                    >
                      {t.viewProfile}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Approach Section with Modern Stats */}
      <section className="py-20 bg-black relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              <span className="bg-gradient-to-r from-primary to-primary-300 bg-clip-text text-transparent">
                {t.teamApproach}
              </span>
            </h2>
            <p className="max-w-3xl mx-auto text-lg text-gray-300">{t.teamDescription}</p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: <Award className="w-8 h-8" />, text: t.experience, value: '35+', metric: 'Years' },
              { icon: <Shield className="w-8 h-8" />, text: t.technology, value: 'Elite', metric: 'Status' },
              { icon: <Globe className="w-8 h-8" />, text: t.bilingual, value: '2', metric: 'Languages' },
              { icon: <Users className="w-8 h-8" />, text: t.results, value: '30K+', metric: 'Cases Won' },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative group"
              >
                <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-primary/20 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/20 text-center">
                  <div className="text-primary mb-4 flex justify-center">{item.icon}</div>
                  <div className="text-4xl font-black text-primary mb-1">{item.value}</div>
                  <div className="text-xs text-primary uppercase tracking-wider mb-2">{item.metric}</div>
                  <h3 className="font-bold text-white">{item.text}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-20 bg-gradient-to-b from-neutral-950 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              <span className="bg-gradient-to-r from-primary to-primary-300 bg-clip-text text-transparent">
                {t.whyChoose}
              </span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Star className="w-12 h-12" />,
                title: isSpanish ? 'Reconocimiento Elite' : 'Elite Recognition',
                description: isSpanish 
                  ? 'Abogados de primera categoría con premios prestigiosos y reconocimiento de pares'
                  : 'Top-rated attorneys with prestigious awards and peer recognition',
              },
              {
                icon: <Briefcase className="w-12 h-12" />,
                title: isSpanish ? 'Historial Comprobado' : 'Proven Track Record',
                description: isSpanish
                  ? 'Miles de casos exitosos con millones recuperados para clientes'
                  : 'Thousands of successful cases with millions recovered for clients',
              },
              {
                icon: <Users className="w-12 h-12" />,
                title: isSpanish ? 'Enfoque al Cliente' : 'Client-First Approach',
                description: isSpanish
                  ? 'Disponibilidad 24/7 con atención personalizada a cada caso'
                  : '24/7 availability with personalized attention to every case',
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center mb-6 text-primary">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                <p className="text-gray-400">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section with Modern Design */}
      <section className="py-20 bg-gradient-to-b from-black to-neutral-950 relative overflow-hidden">
        <div className="absolute inset-0">
          <motion.div
            animate={{
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-secondary/10"
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              <span className="bg-gradient-to-r from-primary to-primary-300 bg-clip-text text-transparent">
                {t.cta.title}
              </span>
            </h2>
            <p className="text-xl text-gray-300 mb-8">{t.cta.description}</p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-black rounded-full font-bold hover:bg-primary-300 transition-all transform hover:scale-105"
              >
                {t.cta.button1}
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="tel:18449673536"
                className="inline-flex items-center gap-2 px-8 py-4 bg-transparent text-white rounded-full font-bold border-2 border-white hover:bg-white hover:text-black transition-all transform hover:scale-105"
              >
                <Phone className="w-5 h-5" />
                {t.cta.button2}
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <ChatWidget language={language} />

      {/* Structured Data for Attorneys */}
      {attorneys.map(attorney => (
        <Script
          key={attorney.id}
          id={`attorney-${attorney.id}-structured-data`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              generateAttorneySchema({
                name: attorney.name,
                jobTitle: attorney.title,
                image: `https://www.vasquezlawfirm.com${attorney.image}`,
                telephone: '1-844-967-3536',
                email: attorney.email || 'leads@vasquezlawfirm.com',
                education: attorney.education.map(edu => ({
                  name: edu.institution,
                  degree: edu.degree,
                })),
                knowsAbout: attorney.practiceAreas,
                memberOf: attorney.associations.map(assoc => assoc.name),
                award: attorney.specialAchievements || [],
              })
            ),
          }}
        />
      ))}
    </div>
  );
}