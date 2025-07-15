'use client';

import { motion } from 'framer-motion';
import { ContactForm } from '@/components/forms/ContactForm';
import { Phone, Clock, CheckCircle, Shield, Users, Award } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function ConsultaGratisPage() {
  const benefits = [
    {
      icon: <CheckCircle className="w-6 h-6 text-green-500" />,
      title: '100% Gratis',
      description: 'Sin costo ni obligación de contratar',
    },
    {
      icon: <Shield className="w-6 h-6 text-blue-500" />,
      title: 'Confidencial',
      description: 'Toda información es protegida por ley',
    },
    {
      icon: <Clock className="w-6 h-6 text-purple-500" />,
      title: '30 Minutos',
      description: 'Evaluación completa de su caso',
    },
    {
      icon: <Users className="w-6 h-6 text-orange-500" />,
      title: 'En Español',
      description: 'Abogados que hablan su idioma',
    },
  ];

  const practiceAreas = [
    'Inmigración y Ciudadanía',
    'Lesiones Personales',
    'Compensación Laboral',
    'Defensa Criminal',
    'Derecho Familiar',
    'Accidentes de Auto',
  ];

  const faqs = [
    {
      question: '¿Realmente es gratis la consulta?',
      answer:
        'Sí, la consulta inicial es 100% gratuita y sin obligación. No hay costos ocultos ni le pediremos información de pago.',
    },
    {
      question: '¿Qué debo traer a la consulta?',
      answer:
        'Traiga cualquier documento relacionado con su caso: papeles de la corte, reportes policiales, documentos médicos, correspondencia legal, etc.',
    },
    {
      question: '¿Puedo hacer la consulta por teléfono?',
      answer:
        '¡Por supuesto! Ofrecemos consultas en persona, por teléfono y video llamada para su conveniencia.',
    },
    {
      question: '¿Cuánto tiempo dura la consulta?',
      answer:
        'Típicamente 30 minutos, pero tomamos el tiempo necesario para entender completamente su situación.',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 text-white py-20">
        <div className="absolute inset-0 bg-black/20" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              Consulta Legal <span className="text-secondary-400">GRATIS</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl md:text-2xl mb-8 text-gray-200"
            >
              Hable con un abogado experimentado sin costo ni obligación
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <a
                href="tel:1-844-967-3536"
                className="bg-secondary-500 hover:bg-secondary-600 text-black font-bold py-4 px-8 rounded-lg flex items-center justify-center gap-3 transition-all transform hover:scale-105"
              >
                <Phone className="w-5 h-5" />
                Llamar Ahora: 1-844-YO-PELEO
              </a>
              <a
                href="#form"
                className="bg-white hover:bg-gray-100 text-primary-900 font-bold py-4 px-8 rounded-lg transition-all"
              >
                Solicitar Consulta en Línea
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            ¿Por Qué Elegir Vasquez Law Firm?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Practice Areas */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Áreas de Práctica</h2>
            <p className="text-center text-gray-600 mb-12">
              Ofrecemos consultas gratuitas para todos estos casos legales:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {practiceAreas.map((area, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  <CheckCircle className="w-5 h-5 text-green-500 inline mr-3" />
                  <span className="text-lg font-medium">{area}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section id="form" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold mb-6">Solicite Su Consulta Gratuita</h2>
                <p className="text-gray-600 mb-8">
                  Complete el formulario y un miembro de nuestro equipo legal se comunicará con
                  usted dentro de 24 horas. Para asistencia inmediata, llámenos al{' '}
                  <a href="tel:1-844-967-3536" className="text-primary-600 font-semibold">
                    1-844-YO-PELEO
                  </a>
                </p>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <Award className="w-8 h-8 text-primary-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Más de 10 Años de Experiencia</h3>
                      <p className="text-gray-600">
                        Hemos ayudado a miles de familias como la suya
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Users className="w-8 h-8 text-primary-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Abogados Bilingües</h3>
                      <p className="text-gray-600">Todo nuestro equipo habla español fluido</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Shield className="w-8 h-8 text-primary-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Sin Riesgo</h3>
                      <p className="text-gray-600">
                        Muchos casos sin pago inicial - solo cobramos si ganamos
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-6 bg-secondary-50 rounded-lg">
                  <p className="text-lg font-semibold text-primary-900 mb-2">
                    ¿Necesita ayuda urgente?
                  </p>
                  <p className="text-gray-700 mb-4">Disponible 24/7 para emergencias legales</p>
                  <a
                    href="tel:1-844-967-3536"
                    className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                  >
                    <Phone className="w-5 h-5" />
                    Llamar Ahora
                  </a>
                </div>
              </div>

              <div className="bg-gray-50 p-8 rounded-lg">
                <ContactForm language="es" source="consulta-gratis" className="space-y-4" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Preguntas Frecuentes</h2>
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white p-6 rounded-lg shadow-md"
                >
                  <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">No Espere Más - Su Consulta es GRATIS</h2>
          <p className="text-xl mb-8 text-gray-200">
            Cada día que pasa puede afectar su caso. Hable con un abogado hoy.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:1-844-967-3536"
              className="bg-secondary-500 hover:bg-secondary-600 text-black font-bold py-4 px-8 rounded-lg flex items-center justify-center gap-3 transition-all transform hover:scale-105"
            >
              <Phone className="w-5 h-5" />
              1-844-YO-PELEO
            </a>
            <Link
              href="/es/contacto"
              className="bg-white hover:bg-gray-100 text-primary-900 font-bold py-4 px-8 rounded-lg transition-all"
            >
              Enviar Mensaje
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export const metadata = {
  title: 'Consulta Gratis | Abogados que Hablan Español | Vasquez Law Firm',
  description:
    'Obtenga una consulta legal GRATIS con abogados que hablan español. Sin costo, sin obligación. Inmigración, lesiones personales, defensa criminal. Llame 1-844-YO-PELEO.',
  keywords:
    'consulta gratis abogado, abogado español gratis, consulta legal gratuita, abogado hispano, consulta sin costo',
  openGraph: {
    title: 'Consulta Legal GRATIS en Español | Vasquez Law Firm',
    description:
      'Hable con un abogado experimentado sin costo. Inmigración, accidentes, defensa criminal. 100% en español.',
    url: 'https://www.vasquezlawnc.com/es/consulta-gratis',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/consulta-gratis-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Consulta Legal Gratis en Español',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/consulta-gratis',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/free-consultation',
      'es-ES': 'https://www.vasquezlawnc.com/es/consulta-gratis',
    },
  },
};
