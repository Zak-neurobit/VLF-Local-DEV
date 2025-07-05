'use client';

import dynamic from 'next/dynamic';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Script from 'next/script';
import { MasterLayout } from '@/design-system/templates/MasterLayout';
import { Button } from '@/design-system/components/Button';
import { Heading, Text } from '@/design-system/components/Typography';
// Dynamic import for client-side only rendering
const ChatWidget = dynamic(() => import('@/components/ChatWidget').then(mod => mod.ChatWidget), {
  ssr: false,
});
import { generateAboutPageSchema, generateOrganizationSchema } from '@/components/SEO/schemas';

export default function AboutPage() {
  const [language, setLanguage] = useState<'en' | 'es'>('en');

  useEffect(() => {
    // Check user's browser language
    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith('es')) {
      setLanguage('es');
    }
  }, []);

  const content = {
    en: {
      title: 'About Vasquez Law Firm',
      subtitle: 'Fighting for You Since 1989',
      story: 'Our Story',
      storyText1:
        'Founded over three decades ago, Vasquez Law Firm has grown from a small family practice to one of the most innovative law firms in North Carolina and Florida. Our commitment to providing honest, reliable representation at an affordable price has never wavered.',
      storyText2:
        'Today, we combine our traditional values with cutting-edge AI technology to offer our clients the best of both worlds: experienced human attorneys backed by 24/7 intelligent assistance.',
      mission: 'Our Mission',
      missionText:
        'To provide accessible, high-quality legal representation to all members of our community, regardless of their background or circumstances. We leverage technology to break down barriers and ensure justice is available to everyone.',
      values: 'Our Values',
      value1: {
        title: 'Integrity',
        desc: 'We maintain the highest ethical standards in everything we do',
      },
      value2: { title: 'Innovation', desc: 'We embrace technology to better serve our clients' },
      value3: { title: 'Inclusion', desc: 'We serve all communities with respect and dignity' },
      value4: { title: 'Impact', desc: 'We measure success by the lives we change' },
      commitment: 'Our Commitment to Innovation',
      commitmentText:
        "As pioneers in AI-enhanced legal services, we're committed to using technology responsibly to improve access to justice. Our AI assistants work alongside our attorneys to provide faster responses, more accurate predictions, and better outcomes for our clients.",
      locations: 'Our Locations',
      serving: 'Proudly Serving',
      communities: 'communities across North Carolina and Florida',
      awards: 'Recognition & Awards',
      award1: 'Top Immigration Law Firm 2023',
      award2: 'Innovation in Legal Technology Award',
      award3: 'Community Service Excellence',
      award4: 'Client Choice Award 5 Years Running',
      associations: 'Professional Associations',
      association1: 'American Immigration Lawyers Association (AILA)',
      association2: 'North Carolina Bar Association',
      association3: 'Florida Bar Association',
      association4: 'National Association of Criminal Defense Lawyers',
      tagline: 'YO PELEO POR TI™',
      taglineDesc:
        'Our motto "I Fight For You" isn\'t just words - it\'s our promise to every client who walks through our doors.',
      getStarted: 'Ready to Get Started?',
      consultation: 'Schedule Your Free Consultation',
    },
    es: {
      title: 'Acerca de Vasquez Law Firm',
      subtitle: 'Luchando por Ti Desde 1989',
      story: 'Nuestra Historia',
      storyText1:
        'Fundada hace más de tres décadas, Vasquez Law Firm ha crecido de una pequeña práctica familiar a una de las firmas de abogados más innovadoras en Carolina del Norte y Florida. Nuestro compromiso de brindar representación honesta y confiable a un precio asequible nunca ha flaqueado.',
      storyText2:
        'Hoy, combinamos nuestros valores tradicionales con tecnología IA de vanguardia para ofrecer a nuestros clientes lo mejor de ambos mundos: abogados humanos experimentados respaldados por asistencia inteligente 24/7.',
      mission: 'Nuestra Misión',
      missionText:
        'Proporcionar representación legal accesible y de alta calidad a todos los miembros de nuestra comunidad, independientemente de su origen o circunstancias. Aprovechamos la tecnología para derribar barreras y garantizar que la justicia esté disponible para todos.',
      values: 'Nuestros Valores',
      value1: {
        title: 'Integridad',
        desc: 'Mantenemos los más altos estándares éticos en todo lo que hacemos',
      },
      value2: {
        title: 'Innovación',
        desc: 'Adoptamos la tecnología para servir mejor a nuestros clientes',
      },
      value3: {
        title: 'Inclusión',
        desc: 'Servimos a todas las comunidades con respeto y dignidad',
      },
      value4: { title: 'Impacto', desc: 'Medimos el éxito por las vidas que cambiamos' },
      commitment: 'Nuestro Compromiso con la Innovación',
      commitmentText:
        'Como pioneros en servicios legales mejorados con IA, estamos comprometidos a usar la tecnología de manera responsable para mejorar el acceso a la justicia. Nuestros asistentes de IA trabajan junto a nuestros abogados para brindar respuestas más rápidas, predicciones más precisas y mejores resultados para nuestros clientes.',
      locations: 'Nuestras Ubicaciones',
      serving: 'Sirviendo con Orgullo a',
      communities: 'comunidades en Carolina del Norte y Florida',
      awards: 'Reconocimientos y Premios',
      award1: 'Mejor Firma de Inmigración 2023',
      award2: 'Premio a la Innovación en Tecnología Legal',
      award3: 'Excelencia en Servicio Comunitario',
      award4: 'Premio Elección del Cliente 5 Años Consecutivos',
      associations: 'Asociaciones Profesionales',
      association1: 'Asociación Americana de Abogados de Inmigración (AILA)',
      association2: 'Colegio de Abogados de Carolina del Norte',
      association3: 'Colegio de Abogados de Florida',
      association4: 'Asociación Nacional de Abogados de Defensa Criminal',
      tagline: 'YO PELEO POR TI™',
      taglineDesc:
        'Nuestro lema "Yo Peleo Por Ti" no son solo palabras - es nuestra promesa a cada cliente que cruza nuestras puertas.',
      getStarted: '¿Listo para Comenzar?',
      consultation: 'Programe Su Free Consultation',
    },
  };

  const t = content[language];

  const locations = [
    {
      city: 'Raleigh',
      state: 'NC',
      address: '3737 Glenwood Ave, Suite 100',
      phone: '(919) 537-8722',
      lat: 35.8486,
      lng: -78.6948,
    },
    {
      city: 'Charlotte',
      state: 'NC',
      address: '4801 E Independence Blvd, Suite 714',
      phone: '(704) 246-0936',
      lat: 35.1924,
      lng: -80.7716,
    },
    {
      city: 'Smithfield',
      state: 'NC',
      address: '127 S Third St',
      phone: '(919) 800-0087',
      lat: 35.5082,
      lng: -78.3444,
    },
    {
      city: 'Orlando',
      state: 'FL',
      address: '1540 International Pkwy, Suite 2000',
      phone: '(689) 270-3636',
      lat: 28.4305,
      lng: -81.3089,
    },
  ];

  const stats = [
    { number: '60+', label: language === 'es' ? 'Años de Experiencia' : 'Years Experience' },
    { number: '5,000+', label: language === 'es' ? 'Clientes Satisfechos' : 'Satisfied Clients' },
    { number: '4', label: language === 'es' ? 'Ubicaciones' : 'Office Locations' },
    { number: '24/7', label: language === 'es' ? 'Asistencia IA' : 'AI Assistance' },
  ];

  return (
    <MasterLayout>
      <div className="min-h-screen bg-black">
        {/* Language Toggle - Fixed Position */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed right-2 sm:right-4 top-16 sm:top-20 z-40 flex gap-1 sm:gap-2 rounded-full bg-black/50 p-1 backdrop-blur-sm"
        >
          <button
            onClick={() => setLanguage('en')}
            className={`rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold transition-all ${
              language === 'en' ? 'bg-primary text-black' : 'text-white hover:text-primary'
            }`}
          >
            EN
          </button>
          <button
            onClick={() => setLanguage('es')}
            className={`rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold transition-all ${
              language === 'es' ? 'bg-primary text-black' : 'text-white hover:text-primary'
            }`}
          >
            ES
          </button>
        </motion.div>

        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          {/* Background Effect */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-b from-black via-neutral-950 to-black" />
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
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <Heading level={1} className="text-white mb-4">{t.title}</Heading>
              <Text size="xl" className="text-primary font-semibold mb-12">{t.subtitle}</Text>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-black/50 backdrop-blur-sm rounded-xl p-6 border border-primary/20"
                  >
                    <p className="text-4xl font-bold text-primary">{stat.number}</p>
                    <p className="text-sm text-gray-400 mt-2">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-20 bg-gradient-to-b from-black to-neutral-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Heading level={2} className="text-white mb-6">{t.story}</Heading>
                <Text className="mb-4 leading-relaxed">{t.storyText1}</Text>
                <Text className="mb-6 leading-relaxed">{t.storyText2}</Text>

                <div className="bg-primary/10 backdrop-blur-sm rounded-xl p-6 border border-primary/20">
                  <h3 className="text-2xl font-bold text-primary mb-3">{t.tagline}</h3>
                  <Text>{t.taglineDesc}</Text>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-primary/20 to-primary/10 backdrop-blur-sm rounded-xl h-48 flex items-center justify-center border border-primary/20">
                    <div className="text-center">
                      <div className="text-4xl mb-2">🏛️</div>
                      <p className="text-sm text-gray-300">Historic Office</p>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-secondary/20 to-secondary/10 backdrop-blur-sm rounded-xl h-48 flex items-center justify-center mt-8 border border-secondary/20">
                    <div className="text-center">
                      <div className="text-4xl mb-2">👥</div>
                      <p className="text-sm text-gray-300">Our Team</p>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-primary/20 to-primary/10 backdrop-blur-sm rounded-xl h-48 flex items-center justify-center border border-primary/20">
                    <div className="text-center">
                      <div className="text-4xl mb-2">🤝</div>
                      <p className="text-sm text-gray-300">Client Meeting</p>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-secondary/20 to-secondary/10 backdrop-blur-sm rounded-xl h-48 flex items-center justify-center mt-8 border border-secondary/20">
                    <div className="text-center">
                      <div className="text-4xl mb-2">🎉</div>
                      <p className="text-sm text-gray-300">Victory Celebration</p>
                    </div>
                  </div>
                </div>
              </motion.div>
          </div>
        </div>
      </section>

        {/* Mission & Values */}
        <section className="py-20 bg-neutral-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <Heading level={2} className="text-white mb-6">{t.mission}</Heading>
              <Text size="lg" className="max-w-3xl mx-auto">{t.missionText}</Text>
            </motion.div>

            {/* Values */}
            <div className="mb-16">
              <Heading level={2} className="text-center text-white mb-12">{t.values}</Heading>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[t.value1, t.value2, t.value3, t.value4].map((value, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-black/50 backdrop-blur-sm rounded-xl p-6 text-center border border-primary/20 hover:border-primary/40 transition-all"
                  >
                    <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <div className="text-2xl">
                        {index === 0 ? '⚖️' : index === 1 ? '💡' : index === 2 ? '🤝' : '🎯'}
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">{value.title}</h3>
                    <Text size="sm">{value.desc}</Text>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Innovation Commitment */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-r from-primary/20 to-secondary/20 backdrop-blur-sm rounded-2xl p-8 border border-primary/30"
            >
              <Heading level={2} className="text-white mb-6">{t.commitment}</Heading>
              <Text size="lg" className="leading-relaxed">{t.commitmentText}</Text>
            </motion.div>
          </div>
        </section>

        {/* Locations */}
        <section className="py-20 bg-gradient-to-b from-neutral-950 to-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Heading level={2} className="text-white mb-4">{t.locations}</Heading>
              <Text size="lg">
                {t.serving} <span className="font-semibold text-primary">50+</span> {t.communities}
              </Text>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {locations.map((location, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-black/50 backdrop-blur-sm rounded-xl p-6 border border-primary/20 hover:border-primary/40 transition-all"
                >
                  <div className="text-3xl mb-3">📍</div>
                  <h3 className="text-xl font-semibold text-white mb-1">
                    {location.city}, {location.state}
                  </h3>
                  <Text size="sm" className="mb-2">{location.address}</Text>
                  <p className="text-sm text-primary font-medium">{location.phone}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Awards & Recognition Section */}
        <section className="py-20 bg-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Heading level={2} className="text-center text-white mb-12">{t.awards}</Heading>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {[
                { title: t.award1, icon: '🏆', year: '2023' },
                { title: t.award2, icon: '🚀', year: '2023' },
                { title: t.award3, icon: '❤️', year: '2022-2023' },
                { title: t.award4, icon: '⭐', year: '2019-2023' },
              ].map((award, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center bg-gradient-to-b from-primary/10 to-transparent backdrop-blur-sm rounded-xl p-6 border border-primary/20 hover:border-primary/40 transition-all"
                >
                  <div className="text-5xl mb-4">{award.icon}</div>
                  <p className="text-lg font-semibold text-white">{award.title}</p>
                  <p className="text-sm text-primary mt-2">{award.year}</p>
                </motion.div>
              ))}
            </div>

            {/* Professional Associations */}
            <div>
              <h3 className="text-2xl font-bold text-center text-white mb-8">{t.associations}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[t.association1, t.association2, t.association3, t.association4].map(
                  (association, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-black/50 backdrop-blur-sm rounded-xl p-4 text-center border border-primary/20 hover:border-primary/40 transition-all"
                    >
                      <Text size="sm" className="font-medium">{association}</Text>
                    </motion.div>
                  )
                )}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary/20 to-secondary/20 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Heading level={2} className="text-white mb-6">{t.getStarted}</Heading>
            <Button href="/contact" size="lg" className="transform hover:scale-105 transition-all">
              {t.consultation}
            </Button>
          </div>
        </section>

        {/* Background Effects */}
        <div className="fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-secondary/10 blur-3xl" />
        </div>
      </div>

      <ChatWidget language={language} />

      {/* Structured Data for SEO */}
      <Script
        id="about-page-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateAboutPageSchema()),
        }}
      />
      <Script
        id="organization-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateOrganizationSchema()),
        }}
      />
    </MasterLayout>
  );
}
