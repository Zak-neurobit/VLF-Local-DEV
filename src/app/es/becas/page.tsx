'use client';

import Script from 'next/script';
import Image from 'next/image';
import { GraduationCap, Calendar, Award, Mail, CheckCircle, ArrowRight } from 'lucide-react';
import { MasterLayout } from '@/design-system/templates/MasterLayout';
import { motion } from 'framer-motion';
import { TRADEMARK } from '@/lib/constants/trademark';
import { useState } from 'react';

export default function Page() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement email subscription logic
    setIsSubscribed(true);
    setTimeout(() => setIsSubscribed(false), 5000);
  };

  return (
    <MasterLayout variant="hero" showBreadcrumbs={false}>
      <div className="min-h-screen bg-black">
        {/* Hero Section */}
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
                <div className="inline-flex items-center px-6 py-3 bg-primary/20 backdrop-blur-sm rounded-full mb-6">
                  <GraduationCap className="w-5 h-5 text-primary mr-2" />
                  <span className="text-primary font-semibold">Apoyando a los Soñadores con DACA</span>
                </div>

                <h1 className="text-5xl md:text-7xl font-black mb-6 text-white">
                  Beca <span className="text-primary">DACA Dreamer</span> de Vasquez Law Firm
                </h1>
                <p className="text-xl md:text-2xl mb-8 font-semibold text-primary">
                  Empoderando Sueños a Través de la Educación
                </p>
                <p className="text-lg mb-8 max-w-3xl mx-auto text-gray-300">
                  En Vasquez Law Firm, creemos en el poder de la educación para transformar vidas. 
                  Nuestra Beca DACA Dreamer proporciona apoyo financiero a receptores excepcionales de DACA 
                  que buscan educación superior, ayudándoles a alcanzar sus sueños y construir futuros más brillantes.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <motion.a
                    href="#apply"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center px-8 py-4 bg-primary text-black font-bold rounded-full transition-all hover:bg-primary-300"
                  >
                    Aplicar Ahora
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </motion.a>
                  <motion.a
                    href="#requirements"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center px-8 py-4 bg-transparent text-white font-bold rounded-full border-2 border-white hover:bg-white hover:text-black transition-all"
                  >
                    Ver Requisitos
                  </motion.a>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Scholarship Details */}
        <section className="py-20 bg-gradient-to-b from-black to-neutral-950">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-black mb-6 text-white">
                Detalles de la <span className="text-primary">Beca</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Dos becas otorgadas cada semestre a receptores destacados de DACA
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  icon: <Award className="w-12 h-12" />,
                  title: 'Monto de la Beca',
                  description: '$1,000 por semestre',
                  details: 'Dos becas otorgadas cada semestre para ayudar a cubrir gastos educativos'
                },
                {
                  icon: <Calendar className="w-12 h-12" />,
                  title: 'Fecha Límite de Aplicación',
                  description: '27 de noviembre de 2024',
                  details: 'Los ganadores serán notificados antes del 8 de enero de 2025'
                },
                {
                  icon: <GraduationCap className="w-12 h-12" />,
                  title: 'Elegibilidad',
                  description: 'Receptores de DACA',
                  details: 'Debe estar inscrito o planeando inscribirse en una universidad acreditada'
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gradient-to-b from-neutral-900 to-neutral-950 rounded-2xl p-8 border border-primary/20 hover:border-primary/40 transition-all"
                >
                  <div className="text-primary mb-4">{item.icon}</div>
                  <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-primary font-bold mb-2">{item.description}</p>
                  <p className="text-gray-400">{item.details}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Requirements Section */}
        <section id="requirements" className="py-20 bg-black">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-black mb-6 text-white">
                Requisitos de <span className="text-primary">Elegibilidad</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Para calificar para la Beca DACA Dreamer de Vasquez Law Firm, los solicitantes deben cumplir con los siguientes criterios
              </p>
            </motion.div>

            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8">
                {[
                  'Debe ser un receptor de DACA que busca educación superior',
                  'GPA de 3.5 o superior',
                  'Inscrito o planeando inscribirse en una universidad acreditada para otoño 2024',
                  'Al menos 17 años de edad',
                ].map((requirement, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start"
                  >
                    <CheckCircle className="w-6 h-6 text-primary mr-3 flex-shrink-0 mt-1" />
                    <p className="text-lg text-gray-300">{requirement}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Application Requirements */}
        <section className="py-20 bg-gradient-to-b from-neutral-950 to-black">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-black mb-6 text-white">
                Requisitos de <span className="text-primary">Aplicación</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Complete su aplicación con los siguientes documentos y materiales
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  title: 'Aplicación en Línea',
                  description: 'Complete el formulario de aplicación en línea completo con toda la información requerida'
                },
                {
                  title: 'Transcripción Académica',
                  description: 'Envíe transcripción académica no oficial que muestre un GPA de 3.5 o superior'
                },
                {
                  title: 'Prueba de Inscripción',
                  description: 'Documentación que confirme inscripción o aceptación en una universidad acreditada'
                },
                {
                  title: 'Estatus DACA',
                  description: 'Documentación que pruebe el estatus actual de receptor de DACA'
                },
                {
                  title: 'Obra de Arte Original',
                  description: 'Envíe una obra de arte original que represente su experiencia de inmigración (pintura, escultura, poesía, etc.)'
                },
                {
                  title: 'Declaración Personal',
                  description: 'Comparta su historia y cómo esta beca ayudará a alcanzar sus metas educativas'
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gradient-to-b from-neutral-900 to-neutral-950 rounded-2xl p-6 border border-primary/20 hover:border-primary/40 transition-all"
                >
                  <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-gray-400">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Email Notification Section */}
        <section id="apply" className="py-20 bg-black">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto"
            >
              <div className="bg-gradient-to-b from-neutral-900 to-neutral-950 rounded-3xl p-12 border border-primary/20">
                <div className="text-center mb-8">
                  <h2 className="text-4xl md:text-5xl font-black mb-6 text-white">
                    Aplicación <span className="text-primary">Próximamente</span>
                  </h2>
                  <p className="text-xl text-gray-300 mb-8">
                    El formulario de aplicación para la beca aún no está abierto. Regístrese a continuación para 
                    recibir una notificación por correo electrónico cuando las aplicaciones estén disponibles.
                  </p>
                </div>

                <form onSubmit={handleSubscribe} className="max-w-md mx-auto">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Ingrese su correo electrónico"
                      required
                      className="flex-1 px-6 py-4 bg-black border border-primary/30 rounded-full text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors"
                    />
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-4 bg-primary text-black font-bold rounded-full hover:bg-primary-300 transition-all"
                    >
                      Notificarme
                    </motion.button>
                  </div>
                  {isSubscribed && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-green-400 text-center mt-4"
                    >
                      ¡Gracias! Le notificaremos cuando las aplicaciones estén abiertas.
                    </motion.p>
                  )}
                </form>

                <div className="text-center mt-8">
                  <p className="text-gray-400 mb-2">¿Preguntas sobre la beca?</p>
                  <a
                    href="mailto:scholarship@vasquezlawfirm.com"
                    className="inline-flex items-center text-primary hover:text-primary-300 transition-colors"
                  >
                    <Mail className="w-5 h-5 mr-2" />
                    scholarship@vasquezlawfirm.com
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Evaluation Criteria */}
        <section className="py-20 bg-gradient-to-b from-black to-neutral-950">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-black mb-6 text-white">
                Criterios de <span className="text-primary">Evaluación</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Las aplicaciones serán evaluadas basándose en los siguientes criterios
              </p>
            </motion.div>

            <div className="max-w-4xl mx-auto">
              <div className="space-y-6">
                {[
                  {
                    title: 'Documentación Completa',
                    description: 'Envío completo y preciso de todos los documentos y materiales requeridos'
                  },
                  {
                    title: 'Respuestas Detalladas en la Aplicación',
                    description: 'Respuestas detalladas y reflexivas a todas las preguntas de la aplicación'
                  },
                  {
                    title: 'Ideas Originales y Experiencia Personal',
                    description: 'Obra de arte creativa que refleje auténticamente su viaje y experiencias de inmigración'
                  }
                ].map((criteria, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gradient-to-r from-primary/10 to-transparent p-6 rounded-2xl border-l-4 border-primary"
                  >
                    <h3 className="text-xl font-bold text-white mb-2">{criteria.title}</h3>
                    <p className="text-gray-300">{criteria.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-black">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto text-center"
            >
              <h2 className="text-4xl md:text-5xl font-black mb-6 text-white">
                ¿Listo para <span className="text-primary">Aplicar?</span>
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Da el primer paso hacia el logro de tus sueños educativos
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  href="#apply"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center px-8 py-4 bg-primary text-black font-bold rounded-full transition-all hover:bg-primary-300"
                >
                  Recibir Notificación Cuando Abran las Aplicaciones
                  <ArrowRight className="ml-2 w-5 h-5" />
                </motion.a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Structured Data for SEO */}
        <Script
          id="scholarship-structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'ScholarshipProgram',
              name: 'Beca DACA Dreamer de Vasquez Law Firm',
              description: 'Apoyo financiero para receptores de DACA que buscan educación superior',
              provider: {
                '@type': 'LegalService',
                name: 'Vasquez Law Firm, PLLC',
                url: 'https://www.vasquezlawfirm.com',
              },
              amount: {
                '@type': 'MonetaryAmount',
                value: '1000',
                currency: 'USD',
              },
              educationalLevel: 'Educación Superior',
              applicationDeadline: '2024-11-27',
              url: 'https://www.vasquezlawfirm.com/es/becas',
            }),
          }}
        />
      </div>
    </MasterLayout>
  );
}