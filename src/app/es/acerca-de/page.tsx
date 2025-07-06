'use client';

import dynamic from 'next/dynamic';
import React, { useState } from 'react';
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

export default function AcercaDePage() {
  const [language] = useState<'en' | 'es'>('es');

  const content = {
    title: 'Acerca de Vasquez Law Firm',
    subtitle: 'Luchando por Ti Desde 2011',
    story: 'Nuestra Historia',
    storyText1:
      'Fundada en 2011, Vasquez Law Firm ha crecido de una pequeña práctica familiar a una de las firmas de abogados más innovadoras en Carolina del Norte y Florida. Nuestro compromiso de brindar representación honesta y confiable a un precio asequible nunca ha flaqueado.',
    storyText2:
      'Hoy, combinamos nuestros valores tradicionales con tecnología IA de vanguardia para ofrecer a nuestros clientes lo mejor de ambos mundos: abogados humanos experimentados respaldados por asistencia inteligente 24/7.',
    mission: 'Nuestra Misión',
    missionText:
      'Proporcionar representación legal accesible y de alta calidad a todos los miembros de nuestra comunidad, independientemente de su origen o circunstancias. Aprovechamos la tecnología para derribar barreras y garantizar que la justicia esté disponible para todos.',
    values: 'Nuestros Valores',
    value1: {
      title: 'MI FAMILIA, TU FAMILIA',
      desc: 'Valoramos a nuestro equipo y clientes como familia, fomentando relaciones basadas en inversión mutua y cuidado',
    },
    value2: {
      title: 'HONESTIDAD',
      desc: 'Somos directos y honestos desde la primera consulta, asegurando confianza y transparencia',
    },
    value3: {
      title: 'DEDICACIÓN',
      desc: 'Estamos comprometidos con el crecimiento de todos en nuestra firma, ayudando a los empleados a desarrollar sus fortalezas',
    },
    value4: { 
      title: 'EXPERIENCIA DE CALIDAD', 
      desc: 'Nos esforzamos por crear un espacio de trabajo divertido y productivo que mejore la calidad de vida' 
    },
    value5: { 
      title: 'YO PELEO', 
      desc: 'Estamos dedicados a luchar por nuestros clientes y nuestro equipo con pasión y compromiso' 
    },
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
    consultation: 'Programe Su Consulta Gratuita',
  };

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
    { number: '60+', label: 'Años de Experiencia' },
    { number: '5,000+', label: 'Clientes Satisfechos' },
    { number: '4', label: 'Ubicaciones' },
    { number: '24/7', label: 'Asistencia IA' },
  ];

  return (
    <MasterLayout>
      <div className="min-h-screen bg-black">
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
              <Heading as="h1" className="text-white mb-4">{content.title}</Heading>
              <Text size="xl" className="text-primary font-semibold mb-12">{content.subtitle}</Text>

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
                <Heading as="h2" className="text-white mb-6">{content.story}</Heading>
                <Text className="mb-4 leading-relaxed">{content.storyText1}</Text>
                <Text className="mb-6 leading-relaxed">{content.storyText2}</Text>

                <div className="bg-primary/10 backdrop-blur-sm rounded-xl p-6 border border-primary/20">
                  <h3 className="text-2xl font-bold text-primary mb-3">{content.tagline}</h3>
                  <Text>{content.taglineDesc}</Text>
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
                      <p className="text-sm text-gray-300">Oficina Histórica</p>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-secondary/20 to-secondary/10 backdrop-blur-sm rounded-xl h-48 flex items-center justify-center mt-8 border border-secondary/20">
                    <div className="text-center">
                      <div className="text-4xl mb-2">👥</div>
                      <p className="text-sm text-gray-300">Nuestro Equipo</p>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-primary/20 to-primary/10 backdrop-blur-sm rounded-xl h-48 flex items-center justify-center border border-primary/20">
                    <div className="text-center">
                      <div className="text-4xl mb-2">🤝</div>
                      <p className="text-sm text-gray-300">Reunión con Cliente</p>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-secondary/20 to-secondary/10 backdrop-blur-sm rounded-xl h-48 flex items-center justify-center mt-8 border border-secondary/20">
                    <div className="text-center">
                      <div className="text-4xl mb-2">🎉</div>
                      <p className="text-sm text-gray-300">Celebración de Victoria</p>
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
              <Heading as="h2" className="text-white mb-6">{content.mission}</Heading>
              <Text size="lg" className="max-w-3xl mx-auto">{content.missionText}</Text>
            </motion.div>

            {/* Values */}
            <div className="mb-16">
              <Heading as="h2" className="text-center text-white mb-12">{content.values}</Heading>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                {[content.value1, content.value2, content.value3, content.value4, content.value5].map((value, index) => (
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
                        {index === 0 ? '👨‍👩‍👧‍👦' : index === 1 ? '🤝' : index === 2 ? '💪' : index === 3 ? '⭐' : '⚔️'}
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
              <Heading as="h2" className="text-white mb-6">{content.commitment}</Heading>
              <Text size="lg" className="leading-relaxed">{content.commitmentText}</Text>
            </motion.div>
          </div>
        </section>

        {/* Locations */}
        <section className="py-20 bg-gradient-to-b from-neutral-950 to-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Heading as="h2" className="text-white mb-4">{content.locations}</Heading>
              <Text size="lg">
                {content.serving} <span className="font-semibold text-primary">50+</span> {content.communities}
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
            <Heading as="h2" className="text-center text-white mb-12">{content.awards}</Heading>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {[
                { title: content.award1, icon: '🏆', year: '2023' },
                { title: content.award2, icon: '🚀', year: '2023' },
                { title: content.award3, icon: '❤️', year: '2022-2023' },
                { title: content.award4, icon: '⭐', year: '2019-2023' },
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
              <h3 className="text-2xl font-bold text-center text-white mb-8">{content.associations}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[content.association1, content.association2, content.association3, content.association4].map(
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
            <Heading as="h2" className="text-white mb-6">{content.getStarted}</Heading>
            <Button href="/es/consulta-gratuita" size="lg" className="transform hover:scale-105 transition-all">
              {content.consultation}
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