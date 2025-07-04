'use client';

import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Script from 'next/script';
// Dynamic import for client-side only rendering
const ChatWidget = dynamic(() => import('@/components/ChatWidget').then(mod => mod.ChatWidget), {
  ssr: false,
});
import { generateAboutPageSchema, generateOrganizationSchema } from '@/components/SEO/schemas';

export default function AboutPage() {
  const [language, setLanguage] = useState<'en' | 'es'>('en');

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
    <div className="min-h-screen bg-white">
      {/* Top Bar */}
      <div className="bg-[#188bf6] text-white py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center gap-4 text-sm">
            <span>📞 1-844-YO-PELEO (967-3536)</span>
            <span className="hidden sm:inline">📧 info@vasquezlawnc.com</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setLanguage('en')}
              className={`px-2 py-1 text-xs rounded ${language === 'en' ? 'bg-white/20' : 'hover:bg-white/10'}`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('es')}
              className={`px-2 py-1 text-xs rounded ${language === 'es' ? 'bg-white/20' : 'hover:bg-white/10'}`}
            >
              ES
            </button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link href="/" className="flex items-center">
              <div>
                <h1 className="text-2xl font-bold text-[#188bf6]">Vasquez Law Firm, PLLC</h1>
                <p className="text-xs text-[#950e02] font-semibold">YO PELEO POR TI™</p>
              </div>
            </Link>
            <div className="hidden md:flex items-center space-x-6">
              <Link
                href="/practice-areas"
                className="text-gray-700 hover:text-[#188bf6] transition-colors font-medium"
              >
                {language === 'es' ? 'Practice Areas' : 'Practice Areas'}
              </Link>
              <Link
                href="/attorneys"
                className="text-gray-700 hover:text-[#188bf6] transition-colors font-medium"
              >
                {language === 'es' ? 'Attorneys' : 'Attorneys'}
              </Link>
              <Link href="/about" className="text-[#188bf6] font-medium">
                {language === 'es' ? 'Sobre Nosotros' : 'About Us'}
              </Link>
              <Link
                href="/contact"
                className="text-gray-700 hover:text-[#188bf6] transition-colors font-medium"
              >
                {language === 'es' ? 'Contacto' : 'Contact'}
              </Link>
              <button className="px-6 py-2 bg-[#950e02] text-white rounded-md hover:bg-[#6b0a01] transition-colors font-medium">
                {language === 'es' ? 'Consulta Gratis' : 'Free Consultation'}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{t.title}</h1>
            <p className="text-xl text-[#188bf6] font-semibold mb-8">{t.subtitle}</p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <p className="text-4xl font-bold text-[#188bf6]">{stat.number}</p>
                  <p className="text-sm text-gray-600 mt-2">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">{t.story}</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">{t.storyText1}</p>
              <p className="text-gray-600 mb-6 leading-relaxed">{t.storyText2}</p>

              <div className="bg-[#188bf6]/10 rounded-lg p-6">
                <h3 className="text-2xl font-bold text-[#950e02] mb-3">{t.tagline}</h3>
                <p className="text-gray-700">{t.taglineDesc}</p>
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
                <div className="bg-gray-200 rounded-lg h-48 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl mb-2">🏛️</div>
                    <p className="text-sm text-gray-600">Historic Office</p>
                  </div>
                </div>
                <div className="bg-gray-200 rounded-lg h-48 flex items-center justify-center mt-8">
                  <div className="text-center">
                    <div className="text-4xl mb-2">👥</div>
                    <p className="text-sm text-gray-600">Our Team</p>
                  </div>
                </div>
                <div className="bg-gray-200 rounded-lg h-48 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl mb-2">🤝</div>
                    <p className="text-sm text-gray-600">Client Meeting</p>
                  </div>
                </div>
                <div className="bg-gray-200 rounded-lg h-48 flex items-center justify-center mt-8">
                  <div className="text-center">
                    <div className="text-4xl mb-2">🎉</div>
                    <p className="text-sm text-gray-600">Victory Celebration</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">{t.mission}</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">{t.missionText}</p>
          </motion.div>

          {/* Values */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">{t.values}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[t.value1, t.value2, t.value3, t.value4].map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow"
                >
                  <div className="w-16 h-16 bg-[#188bf6]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="text-2xl">
                      {index === 0 ? '⚖️' : index === 1 ? '💡' : index === 2 ? '🤝' : '🎯'}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{value.title}</h3>
                  <p className="text-sm text-gray-600">{value.desc}</p>
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
            className="bg-gradient-to-r from-[#188bf6] to-[#0e5ca8] rounded-2xl p-8 text-white"
          >
            <h2 className="text-3xl font-bold mb-6">{t.commitment}</h2>
            <p className="text-lg leading-relaxed">{t.commitmentText}</p>
          </motion.div>
        </div>
      </section>

      {/* Locations */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t.locations}</h2>
            <p className="text-lg text-gray-600">
              {t.serving} <span className="font-semibold text-[#188bf6]">50+</span> {t.communities}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {locations.map((location, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
              >
                <div className="text-3xl mb-3">📍</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">
                  {location.city}, {location.state}
                </h3>
                <p className="text-sm text-gray-600 mb-2">{location.address}</p>
                <p className="text-sm text-[#188bf6] font-medium">{location.phone}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards & Recognition Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">{t.awards}</h2>
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
                className="text-center bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
              >
                <div className="text-5xl mb-4">{award.icon}</div>
                <p className="text-lg font-semibold text-gray-900">{award.title}</p>
                <p className="text-sm text-[#188bf6] mt-2">{award.year}</p>
              </motion.div>
            ))}
          </div>

          {/* Professional Associations */}
          <div>
            <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">{t.associations}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[t.association1, t.association2, t.association3, t.association4].map(
                (association, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white rounded-lg shadow p-4 text-center hover:shadow-lg transition-shadow"
                  >
                    <p className="text-sm font-medium text-gray-700">{association}</p>
                  </motion.div>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[#188bf6] to-[#0e5ca8]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">{t.getStarted}</h2>
          <button className="px-8 py-4 bg-white text-[#188bf6] rounded-md font-semibold hover:shadow-xl transition-all transform hover:scale-105">
            {t.consultation}
          </button>
        </div>
      </section>

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
    </div>
  );
}
