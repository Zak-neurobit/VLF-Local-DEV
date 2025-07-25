'use client';

import React from 'react';
import Script from 'next/script';
import Image from 'next/image';
import { Phone, ArrowRight, Users, Award, Heart, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const staffMembers = [
  {
    name: 'Carmen Vitela',
    role: 'Gerente de Oficina Principal',
    image: '/images/staff/carmen-vitela.png',
    quote:
      'Trabajar en Vasquez Law Firm significa ser parte de un equipo que brinda apoyo. Disfruto mucho de la cultura de la firma y la oportunidad de crecer profesionalmente mientras ayudo a nuestros clientes.',
  },
  {
    name: 'Daniela Patiño',
    role: 'Asistente Legal',
    image: '/images/staff/daniela-patino.png',
    quote:
      'He formado parte de Vasquez Law Firm durante dos años, y ha sido una de las experiencias más gratificantes de mi carrera. El ambiente de trabajo es excelente y me encanta poder ayudar a las familias.',
  },
  {
    name: 'Flor Velásquez',
    role: 'Especialista en Relaciones con Clientes',
    image: '/images/staff/flor-velasquez.png',
    quote:
      'Primero, doy gracias a Dios por la gran oportunidad que se me brindó hace 8 años. Ha sido un viaje increíble ser parte del crecimiento de esta firma y ayudar a tantas personas.',
  },
  {
    name: 'Gabys Rios',
    role: 'Paralegal',
    image: '/images/staff/gabys-rios.png',
    quote:
      'Ser paralegal en una firma de inmigración como VLF ha sido una de las experiencias más humanas y enriquecedoras. Cada caso es una oportunidad de cambiar vidas.',
  },
  {
    name: 'Jimmy Cárdenas',
    role: 'Líder del Equipo de Nuevas Contrataciones',
    image: '/images/staff/jimmy-cardenas.png',
    quote:
      'Para mí, formar parte de Vasquez Law Firm ha sido una experiencia transformadora. Me encanta poder desarrollar nuevos talentos y ver crecer a nuestro equipo.',
  },
  {
    name: 'Samantha Ortegón',
    role: 'Especialista de Admisión',
    image: '/images/staff/samantha-ortegon.png',
    quote:
      'Mi experiencia dentro de la firma Vasquez ha sido grandiosa, ha sido de los mejores trabajos que he tenido. El apoyo del equipo y la satisfacción de ayudar a los clientes es incomparable.',
  },
];

const teamValues = [
  {
    icon: Heart,
    title: 'Enfocados en el Cliente',
    description:
      'Cada miembro del equipo está dedicado a brindar un servicio compasivo y personalizado.',
  },
  {
    icon: Users,
    title: 'Colaborativos',
    description:
      'Trabajamos juntos sin problemas para garantizar los mejores resultados para nuestros clientes.',
  },
  {
    icon: Award,
    title: 'Excelencia',
    description:
      'Nuestro equipo busca la excelencia en todos los aspectos del servicio legal y la atención al cliente.',
  },
];

export default function NuestroEquipoPageClient() {
  return (
    <div>
      <Script
        id="structured-data-team"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LegalService',
            name: 'Vasquez Law Firm',
            employee: staffMembers.map(member => ({
              '@type': 'Person',
              name: member.name,
              jobTitle: member.role,
              worksFor: {
                '@type': 'LegalService',
                name: 'Vasquez Law Firm',
              },
            })),
          }),
        }}
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary-600 to-secondary py-24 overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-10"></div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        >
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-white/20 p-4 rounded-full backdrop-blur-sm">
                <Users className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Conozca a Nuestro Equipo Dedicado
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
              Detrás de cada caso exitoso hay un equipo de profesionales apasionados comprometidos a
              luchar por sus derechos. Conozca a las personas que hacen de YO PELEO POR TI™ más que
              un lema.
            </p>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="inline-flex gap-4"
            >
              <a
                href="/es/abogados"
                className="bg-white text-primary px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg flex items-center gap-2"
              >
                Conozca a Nuestros Abogados <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="/es/contacto"
                className="bg-transparent text-white border-2 border-white px-8 py-4 rounded-full font-bold hover:bg-white hover:text-primary transition-all"
              >
                Contáctenos
              </a>
            </motion.div>
          </div>
        </motion.div>

        {/* Decorative elements */}
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-secondary/20 rounded-full blur-3xl"></div>
      </section>

      {/* Team Values */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Nuestros Valores de Equipo
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Estos valores fundamentales guían todo lo que hacemos y cómo servimos a nuestros
              clientes.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamValues.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow text-center"
              >
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Staff Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Nuestro Personal de Apoyo
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Conozca a los profesionales dedicados que garantizan que cada cliente reciba el más
              alto nivel de servicio y apoyo.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {staffMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all group"
              >
                <div className="relative h-64 w-full bg-gradient-to-br from-primary to-secondary">
                  {member.image ? (
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <Users className="w-24 h-24 text-white/30" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-primary font-medium mb-4">{member.role}</p>
                  <div className="relative">
                    <div className="absolute -top-2 -left-2 text-4xl text-primary/20">"</div>
                    <p className="text-gray-600 italic pl-4">{member.quote}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Culture Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Una Cultura de Excelencia y Apoyo
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                En Vasquez Law Firm, creemos que nuestro equipo es nuestro mayor activo. Fomentamos
                un ambiente donde cada miembro del equipo puede crecer profesionalmente mientras
                hace un impacto significativo en las vidas de nuestros clientes.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Star className="w-5 h-5 text-yellow-500" />
                  <span className="text-gray-700">Desarrollo profesional continuo</span>
                </div>
                <div className="flex items-center gap-3">
                  <Star className="w-5 h-5 text-yellow-500" />
                  <span className="text-gray-700">Ambiente de trabajo colaborativo</span>
                </div>
                <div className="flex items-center gap-3">
                  <Star className="w-5 h-5 text-yellow-500" />
                  <span className="text-gray-700">Compromiso con el equilibrio trabajo-vida</span>
                </div>
                <div className="flex items-center gap-3">
                  <Star className="w-5 h-5 text-yellow-500" />
                  <span className="text-gray-700">Reconocimiento y recompensas por excelencia</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-primary rounded-xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Únase a Nuestro Equipo</h3>
                <p className="mb-6">
                  Siempre estamos buscando personas talentosas que compartan nuestra pasión por la
                  justicia y el servicio al cliente. Si está interesado en unirse a nuestro equipo,
                  nos encantaría saber de usted.
                </p>
                <a
                  href="/es/carreras"
                  className="inline-flex items-center gap-2 bg-white text-primary px-6 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors"
                >
                  Ver Posiciones Abiertas <ArrowRight className="w-5 h-5" />
                </a>
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-secondary/20 rounded-full blur-2xl"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-secondary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              ¿Listo para Trabajar con Nuestro Equipo?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Experimente la diferencia de trabajar con un equipo que realmente se preocupa por su
              éxito.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:1-844-967-3536"
                className="bg-white text-primary px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
              >
                <Phone className="w-5 h-5" />
                Llame al 1-844-YO-PELEO
              </a>
              <a
                href="/es/contacto"
                className="bg-transparent text-white border-2 border-white px-8 py-4 rounded-full font-bold hover:bg-white hover:text-primary transition-all"
              >
                Agendar Consulta
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
