'use client';

import React, { useState, useEffect } from 'react';
import { MasterLayout } from '@/design-system/templates/MasterLayout';
import { Button } from '@/design-system/components/Button';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, MessageCircle, ChevronRight, Shield, Award, Clock, Users } from 'lucide-react';
import Link from 'next/link';
import { COLORS } from '@/design-system/constants';

interface ModernPracticeAreaTemplateProps {
  title: string;
  subtitle?: string;
  description: string;
  content: React.ReactNode;
  services?: string[];
  faqs?: Array<{
    question: string;
    answer: string;
  }>;
  metadata?: {
    title: string;
    description: string;
  };
}

export const ModernPracticeAreaTemplate: React.FC<ModernPracticeAreaTemplateProps> = ({
  title,
  subtitle,
  description,
  content,
  services = [],
  faqs = [],
}) => {
  const [language, setLanguage] = useState<'en' | 'es'>('en');
  const [activeService, setActiveService] = useState(0);

  useEffect(() => {
    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith('es')) {
      setLanguage('es');
    }
  }, []);

  const stats = [
    { icon: Shield, value: '60+', label: language === 'en' ? 'Years Experience' : 'Años de Experiencia' },
    { icon: Users, value: '30K+', label: language === 'en' ? 'Clients Helped' : 'Clientes Ayudados' },
    { icon: Award, value: '98%', label: language === 'en' ? 'Success Rate' : 'Tasa de Éxito' },
    { icon: Clock, value: '24/7', label: language === 'en' ? 'Available' : 'Disponible' },
  ];

  return (
    <MasterLayout variant="hero" showBreadcrumbs={true}>
      <div className="min-h-screen bg-black">
        {/* Language Toggle */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed right-4 top-20 z-40 flex gap-2 rounded-full bg-black/50 p-1 backdrop-blur-sm"
        >
          <button
            onClick={() => setLanguage('en')}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${
              language === 'en' ? 'bg-primary text-black' : 'text-white hover:text-primary'
            }`}
          >
            EN
          </button>
          <button
            onClick={() => setLanguage('es')}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${
              language === 'es' ? 'bg-primary text-black' : 'text-white hover:text-primary'
            }`}
          >
            ES
          </button>
        </motion.div>

        {/* Hero Section */}
        <section className="relative overflow-hidden py-24">
          {/* Animated Background */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 via-black to-primary/10" />
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
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
                {title}
              </h1>
              {subtitle && (
                <h2 className="text-2xl md:text-3xl text-primary mb-6">
                  {subtitle}
                </h2>
              )}
              <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
                {description}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  href="/contact" 
                  size="lg"
                  className="bg-primary text-black hover:bg-primary-300 transition-all transform hover:scale-105"
                >
                  {language === 'en' ? 'Free Case Evaluation' : 'Evaluación Gratuita'}
                </Button>
                <Button 
                  href="tel:1-844-967-3536" 
                  variant="outline" 
                  size="lg"
                  className="border-primary text-primary hover:bg-primary hover:text-black transition-all"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  1-844-YO-PELEO
                </Button>
              </div>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="bg-white/5 backdrop-blur-sm rounded-lg p-6 text-center border border-primary/20"
                >
                  <stat.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                  <div className="text-3xl font-black text-primary">{stat.value}</div>
                  <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Services Section */}
        {services.length > 0 && (
          <section className="py-20 bg-gradient-to-b from-black to-neutral-950">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.h2
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-black text-center text-white mb-12"
              >
                {language === 'en' ? 'Our Services' : 'Nuestros Servicios'}
              </motion.h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setActiveService(index)}
                    className={`cursor-pointer p-6 rounded-lg border transition-all ${
                      activeService === index
                        ? 'bg-primary/10 border-primary'
                        : 'bg-white/5 border-white/10 hover:border-primary/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-white">{service}</h3>
                      <ChevronRight className={`w-5 h-5 transition-transform ${
                        activeService === index ? 'rotate-90 text-primary' : 'text-gray-400'
                      }`} />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Main Content */}
        <section className="py-20 bg-neutral-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="prose prose-lg prose-invert max-w-none"
            >
              {content}
            </motion.div>
          </div>
        </section>

        {/* FAQ Section */}
        {faqs.length > 0 && (
          <section className="py-20 bg-gradient-to-b from-neutral-950 to-black">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.h2
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-black text-center text-white mb-12"
              >
                {language === 'en' ? 'Frequently Asked Questions' : 'Preguntas Frecuentes'}
              </motion.h2>

              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10"
                  >
                    <h3 className="text-xl font-semibold text-primary mb-3">{faq.question}</h3>
                    <p className="text-gray-300">{faq.answer}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary to-primary-300">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-black text-black mb-6">
                {language === 'en' 
                  ? 'Get Your FREE Consultation Today' 
                  : 'Obtenga Su Consulta GRATIS Hoy'}
              </h2>
              <p className="text-xl text-black/80 mb-8">
                {language === 'en'
                  ? 'Call 1-844-YO-PELEO or chat with our AI assistant 24/7'
                  : 'Llame al 1-844-YO-PELEO o chatee con nuestro asistente AI 24/7'}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  href="tel:1-844-967-3536"
                  size="lg"
                  className="bg-black text-primary hover:bg-gray-900 transition-all"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  {language === 'en' ? 'Call Now' : 'Llame Ahora'}: 1-844-YO-PELEO
                </Button>
                <Button
                  href="/contact"
                  size="lg"
                  variant="outline"
                  className="border-black text-black hover:bg-black hover:text-primary transition-all"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  {language === 'en' ? 'Start Live Chat' : 'Iniciar Chat en Vivo'}
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Background Effects */}
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-secondary/10 blur-3xl" />
        </div>
      </div>
    </MasterLayout>
  );
};

export default ModernPracticeAreaTemplate;