'use client';

import React, { useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { useSafeEffect } from '@/lib/react-fixes/useEffectFix';
import { withErrorBoundary } from '@/components/ErrorBoundary';

// Lazy load framer-motion to prevent SSR issues
const motion = typeof window !== 'undefined' ? require('framer-motion').motion : null;

// Dynamic imports for performance
const ModernHero = dynamic(() => import('../hero/ModernHero'), {
  loading: () => <div className="h-screen bg-black" />,
  ssr: false,
});

const OfficeLocations = dynamic(() => import('./OfficeLocations'), {
  loading: () => <div className="h-96 bg-black" />,
});

const ResultsShowcase = dynamic(() => import('./ResultsShowcase'), {
  loading: () => <div className="h-96 bg-black" />,
});

const FirmHighlights = dynamic(() => import('./FirmHighlights'), {
  loading: () => <div className="h-96 bg-black" />,
});

const TestimonialsSection = dynamic(
  () => import('./TestimonialsSection').then(mod => ({ default: mod.TestimonialsSection })),
  {
    loading: () => <div className="h-96 bg-black" />,
  }
);

const PracticeAreasShowcase = dynamic(() => import('./PracticeAreasShowcase'), {
  loading: () => <div className="h-96 bg-black" />,
});

const VirtualParalegal = dynamic(() => import('../VirtualParalegal'), {
  loading: () => null,
});

interface HomePageProps {
  language?: 'en' | 'es';
}

const HomePage: React.FC<HomePageProps> = ({ language: initialLanguage = 'en' }) => {
  const [language, setLanguage] = useState<'en' | 'es'>(initialLanguage);
  const [showVirtualParalegal, setShowVirtualParalegal] = useState(false);

  // Memoize callbacks to prevent unnecessary re-renders
  const handleLanguageChange = useCallback((lang: 'en' | 'es') => {
    setLanguage(lang);
  }, []);

  const handleVirtualParalegalToggle = useCallback(() => {
    setShowVirtualParalegal(prev => !prev);
  }, []);

  useSafeEffect(
    isMounted => {
      // Only run client-side checks after hydration
      if (typeof window !== 'undefined') {
        // Only check browser language if no initial language provided and we're on English version
        if (initialLanguage === 'en') {
          const browserLang = navigator.language.toLowerCase();
          if (browserLang.startsWith('es') && isMounted()) {
            setLanguage('es');
          }
        }

        // Show virtual paralegal after 10 seconds
        const timer = setTimeout(() => {
          if (!sessionStorage.getItem('paralegal-shown') && isMounted()) {
            setShowVirtualParalegal(true);
            sessionStorage.setItem('paralegal-shown', 'true');
          }
        }, 10000);

        return () => clearTimeout(timer);
      }
    },
    [initialLanguage]
  );

  return (
    <div className="min-h-screen bg-black">
      {/* Language Toggle - Fixed Position (hide on Spanish pages) */}
      {initialLanguage === 'en' && motion && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed right-2 sm:right-4 top-16 sm:top-20 z-40 flex gap-1 sm:gap-2 rounded-full bg-black/50 p-1 backdrop-blur-sm"
        >
          <button
            onClick={() => handleLanguageChange('en')}
            className={`rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold transition-all ${
              language === 'en' ? 'bg-primary text-black' : 'text-white hover:text-primary'
            }`}
            aria-pressed={language === 'en'}
            aria-label="Switch to English"
          >
            EN
          </button>
          <button
            onClick={() => handleLanguageChange('es')}
            className={`rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold transition-all ${
              language === 'es' ? 'bg-primary text-black' : 'text-white hover:text-primary'
            }`}
            aria-pressed={language === 'es'}
            aria-label="Cambiar a Español"
          >
            ES
          </button>
        </motion.div>
      )}

      {/* Virtual Paralegal Trigger - Fixed Position */}
      {motion ? (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2 }}
          onClick={handleVirtualParalegalToggle}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-gradient-to-r from-primary to-primary-300 shadow-2xl transition-all hover:scale-110"
          aria-label={language === 'es' ? 'Abrir Asistente de IA' : 'Open AI Assistant'}
        >
          <svg
            className="h-6 w-6 sm:h-8 sm:w-8 text-black"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-white"></span>
          </span>
        </motion.button>
      ) : (
        <button
          onClick={handleVirtualParalegalToggle}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-gradient-to-r from-primary to-primary-300 shadow-2xl transition-all hover:scale-110"
          aria-label={language === 'es' ? 'Abrir Asistente de IA' : 'Open AI Assistant'}
        >
          <svg
            className="h-6 w-6 sm:h-8 sm:w-8 text-black"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-white"></span>
          </span>
        </button>
      )}

      {/* Page Sections */}
      <ModernHero language={language} />

      {/* Trust Indicators for Spanish */}
      {language === 'es' && motion && (
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="bg-gradient-to-b from-black to-neutral-950 py-12"
        >
          <div className="mx-auto max-w-7xl px-4">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              {[
                {
                  number: '60+',
                  label: 'Años de Experiencia',
                },
                { number: '30K+', label: 'Clientes Ayudados' },
                { number: '4', label: 'Ubicaciones' },
                { number: '24/7', label: 'Disponible' },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-2xl sm:text-3xl md:text-4xl font-black text-primary">
                    {stat.number}
                  </div>
                  <div className="mt-2 text-xs sm:text-sm text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      )}
      {language === 'es' && !motion && (
        <section className="bg-gradient-to-b from-black to-neutral-950 py-12">
          <div className="mx-auto max-w-7xl px-4">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              {[
                {
                  number: '60+',
                  label: 'Años de Experiencia',
                },
                { number: '30K+', label: 'Clientes Ayudados' },
                { number: '4', label: 'Ubicaciones' },
                { number: '24/7', label: 'Disponible' },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="text-center"
                >
                  <div className="text-2xl sm:text-3xl md:text-4xl font-black text-primary">
                    {stat.number}
                  </div>
                  <div className="mt-2 text-xs sm:text-sm text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <FirmHighlights language={language} />
      {language === 'es' && <PracticeAreasShowcase language={language} />}
      <OfficeLocations language={language} />
      <ResultsShowcase language={language} />
      <TestimonialsSection language={language} />

      {/* Virtual Paralegal Modal */}
      {showVirtualParalegal && (
        <VirtualParalegal language={language} onClose={() => setShowVirtualParalegal(false)} />
      )}

      {/* Background Effects */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-secondary/10 blur-3xl" />
      </div>
    </div>
  );
};

export default withErrorBoundary(HomePage);
