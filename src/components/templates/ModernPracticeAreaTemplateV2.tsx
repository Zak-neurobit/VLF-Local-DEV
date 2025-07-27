'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, MessageCircle, Shield, AlertCircle, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  EnhancedHero,
  EnhancedSection,
  EnhancedCTA,
  EnhancedCard,
  UrgencyBadge,
  AnimatedStats,
} from './EnhancedTemplates';

interface Service {
  title: string;
  description: string;
  icon?: string;
  features?: string[];
}

interface FAQ {
  question: string;
  answer: string;
}

interface ModernPracticeAreaTemplateV2Props {
  // Basic Info
  title: string;
  subtitle?: string;
  description: string;

  // Service Level
  urgencyLevel?: 'critical' | 'high' | 'medium' | 'low';

  // Content Sections
  services?: Service[];
  faqs?: FAQ[];
  content?: React.ReactNode;

  // Stats
  stats?: Array<{
    value: string;
    label: string;
    prefix?: string;
    suffix?: string;
  }>;

  // Additional Content
  process?: Array<{
    step: string;
    title: string;
    description: string;
  }>;

  whyChooseUs?: {
    title?: string;
    points: string[];
  };

  testimonials?: Array<{
    text: string;
    author: string;
    rating?: number;
  }>;

  // Page Type
  isSubpage?: boolean;
}

export const ModernPracticeAreaTemplateV2: React.FC<ModernPracticeAreaTemplateV2Props> = ({
  title,
  subtitle,
  description,
  urgencyLevel = 'medium',
  services = [],
  faqs = [],
  content,
  stats,
  process,
  whyChooseUs,
  testimonials,
  isSubpage = false,
}) => {
  const [language, setLanguage] = useState<'en' | 'es'>('en');

  // Determine theme based on urgency
  const isUrgent = urgencyLevel === 'critical' || urgencyLevel === 'high';
  const pageVariant = isSubpage ? 'practiceSubpage' : 'practiceArea';

  // Default stats if none provided
  const defaultStats = stats || [
    { value: '60+', label: language === 'en' ? 'Years Experience' : 'Años de Experiencia' },
    { value: '30K+', label: language === 'en' ? 'Clients Helped' : 'Clientes Ayudados' },
    { value: '98%', label: language === 'en' ? 'Success Rate' : 'Tasa de Éxito' },
    { value: '24/7', label: language === 'en' ? 'Available' : 'Disponible' },
  ];

  return (
    <>
      {/* Language Toggle - Fixed Position */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="fixed right-4 top-24 z-40 flex gap-2 rounded-full bg-black/80 backdrop-blur-sm p-1"
      >
        <button
          onClick={() => setLanguage('en')}
          className={cn(
            'rounded-full px-4 py-2 text-sm font-semibold transition-all',
            language === 'en' ? 'bg-gold-500 text-black' : 'text-white hover:text-gold-400'
          )}
        >
          EN
        </button>
        <button
          onClick={() => setLanguage('es')}
          className={cn(
            'rounded-full px-4 py-2 text-sm font-semibold transition-all',
            language === 'es' ? 'bg-gold-500 text-black' : 'text-white hover:text-gold-400'
          )}
        >
          ES
        </button>
      </motion.div>

      {/* Sticky Emergency CTA Bar for Urgent Services */}
      {isUrgent && (
        <div className="sticky top-0 z-50 bg-red-600 text-white py-3">
          <div className="container mx-auto px-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 animate-pulse" />
              <span className="font-semibold">
                {language === 'en'
                  ? 'Time is critical! Free emergency consultation available 24/7'
                  : '¡El tiempo es crítico! Consulta de emergencia gratuita 24/7'}
              </span>
            </div>
            <EnhancedCTA variant="primary" size="sm" href="tel:1-844-967-3536">
              {language === 'en' ? 'Call Now' : 'Llame Ahora'}
            </EnhancedCTA>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <EnhancedHero
        variant={pageVariant}
        title={title}
        subtitle={subtitle}
        description={description}
      >
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <EnhancedCTA variant="primary" size="lg" href="/contact">
            {language === 'en' ? 'Get Free Consultation' : 'Consulta Gratuita'}
          </EnhancedCTA>
          <EnhancedCTA variant="secondary" size="lg" href="tel:1-844-967-3536">
            <Phone className="w-5 h-5 mr-2" />
            1-844-YO-PELEO
          </EnhancedCTA>
        </div>

        {urgencyLevel !== 'low' && (
          <div className="mt-6 flex justify-center">
            <UrgencyBadge level={urgencyLevel} />
          </div>
        )}
      </EnhancedHero>

      {/* Stats Section */}
      <EnhancedSection variant={pageVariant} className="bg-neutral-950">
        <AnimatedStats stats={defaultStats} variant="dark" />
      </EnhancedSection>

      {/* Services Grid */}
      {services.length > 0 && (
        <EnhancedSection variant={pageVariant} className="bg-neutral-900">
          <h2 className="text-3xl md:text-4xl font-black text-center text-white mb-12">
            {language === 'en' ? 'How We Can Help' : 'Cómo Podemos Ayudar'}
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <EnhancedCard key={index} variant="service">
                <div className="flex items-start gap-4">
                  {service.icon && <span className="text-3xl flex-shrink-0">{service.icon}</span>}
                  <div>
                    <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                    <p className="text-gray-300 mb-4">{service.description}</p>

                    {service.features && service.features.length > 0 && (
                      <ul className="space-y-2">
                        {service.features.map((feature, fIndex) => (
                          <li key={fIndex} className="flex items-start text-sm">
                            <CheckCircle className="w-4 h-4 text-gold-400 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-400">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </EnhancedCard>
            ))}
          </div>
        </EnhancedSection>
      )}

      {/* Process Timeline */}
      {process && process.length > 0 && (
        <EnhancedSection variant={pageVariant} className="bg-neutral-950">
          <h2 className="text-3xl md:text-4xl font-black text-center text-white mb-12">
            {language === 'en' ? 'Our Proven Process' : 'Nuestro Proceso Comprobado'}
          </h2>

          <div className="max-w-4xl mx-auto">
            {process.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-6 mb-8"
              >
                <div className="w-12 h-12 bg-gold-500 text-black rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
                  {step.step}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-gray-300">{step.description}</p>
                  {index < process.length - 1 && (
                    <div className="w-0.5 h-16 bg-gold-500/30 ml-6 mt-4" />
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </EnhancedSection>
      )}

      {/* Main Content Area */}
      {content && (
        <EnhancedSection variant={pageVariant} className="bg-neutral-900">
          <div className="prose prose-lg prose-invert max-w-none">{content}</div>
        </EnhancedSection>
      )}

      {/* Why Choose Us */}
      {whyChooseUs && (
        <EnhancedSection variant={pageVariant} className="bg-neutral-950">
          <h2 className="text-3xl md:text-4xl font-black text-center text-white mb-12">
            {whyChooseUs.title || (language === 'en' ? 'Why Choose Us' : 'Por Qué Elegirnos')}
          </h2>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {whyChooseUs.points.map((point, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-4"
              >
                <Shield className="w-6 h-6 text-gold-400 flex-shrink-0 mt-1" />
                <p className="text-gray-300">{point}</p>
              </motion.div>
            ))}
          </div>
        </EnhancedSection>
      )}

      {/* Testimonials */}
      {testimonials && testimonials.length > 0 && (
        <EnhancedSection variant={pageVariant} className="bg-neutral-900">
          <h2 className="text-3xl md:text-4xl font-black text-center text-white mb-12">
            {language === 'en' ? 'Client Success Stories' : 'Historias de Éxito'}
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <EnhancedCard key={index} variant="testimonial">
                <div className="mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-gold-400">
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-gray-300 mb-4">&ldquo;{testimonial.text}&rdquo;</p>
                <p className="text-gold-400 font-semibold">- {testimonial.author}</p>
              </EnhancedCard>
            ))}
          </div>
        </EnhancedSection>
      )}

      {/* FAQ Section */}
      {faqs.length > 0 && (
        <EnhancedSection variant={pageVariant} className="bg-neutral-950">
          <h2 className="text-3xl md:text-4xl font-black text-center text-white mb-12">
            {language === 'en' ? 'Frequently Asked Questions' : 'Preguntas Frecuentes'}
          </h2>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10"
              >
                <h3 className="text-xl font-semibold text-gold-400 mb-3">{faq.question}</h3>
                <p className="text-gray-300">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </EnhancedSection>
      )}

      {/* Final CTA */}
      <EnhancedSection variant={pageVariant} className="bg-gradient-to-r from-gold-600 to-gold-500">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-black text-black mb-6">
            {isUrgent
              ? language === 'en'
                ? 'Don&apos;t Wait - Your Case Needs Immediate Attention'
                : 'No Espere - Su Caso Necesita Atención Inmediata'
              : language === 'en'
                ? 'Ready to Get Started?'
                : '¿Listo para Comenzar?'}
          </h2>

          <p className="text-xl text-black/80 mb-8 max-w-2xl mx-auto">
            {language === 'en'
              ? 'Free consultation available. We speak Spanish. Available 24/7 for emergencies.'
              : 'Consulta gratuita disponible. Hablamos español. Disponible 24/7 para emergencias.'}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <EnhancedCTA
              variant={isUrgent ? 'emergency' : 'primary'}
              size="lg"
              href="tel:1-844-967-3536"
              className={isUrgent ? 'bg-black text-white hover:bg-gray-900' : ''}
            >
              <Phone className="w-5 h-5 mr-2" />
              {language === 'en' ? 'Call Now' : 'Llame Ahora'}: 1-844-YO-PELEO
            </EnhancedCTA>

            <EnhancedCTA
              variant="secondary"
              size="lg"
              href="/contact"
              className="border-black text-black hover:bg-black hover:text-gold-400"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              {language === 'en' ? 'Start Chat' : 'Iniciar Chat'}
            </EnhancedCTA>
          </div>
        </div>
      </EnhancedSection>

      {/* Floating Chat Button */}
      <EnhancedCTA variant="chat" size="lg" onClick={() => {}}>
        <MessageCircle className="w-6 h-6" />
      </EnhancedCTA>
    </>
  );
};

export default ModernPracticeAreaTemplateV2;
