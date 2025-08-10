'use client';

import React, { useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { useSafeEffect } from '@/lib/react-fixes/useEffectFix';
import { withErrorBoundary } from '@/components/ErrorBoundary';
import {
  QwikHeroWrapper,
  QwikFirmHighlightsWrapper,
  QwikPerformanceMonitor,
} from '@/components/qwik';

// Lazy load only interactive components with React
const OfficeLocations = dynamic(() => import('./OfficeLocations'), {
  loading: () => <div className="h-96 bg-black" />,
});

const ResultsShowcase = dynamic(() => import('./ResultsShowcase'), {
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

// VirtualParalegal component removed - no longer needed

interface QwikOptimizedHomePageProps {
  language?: 'en' | 'es';
}

const QwikOptimizedHomePage: React.FC<QwikOptimizedHomePageProps> = ({
  language: initialLanguage = 'en',
}) => {
  const [language, setLanguage] = useState<'en' | 'es'>(initialLanguage);
  // VirtualParalegal state removed

  // Memoize callbacks to prevent unnecessary re-renders
  const handleLanguageChange = useCallback((lang: 'en' | 'es') => {
    setLanguage(lang);
  }, []);

  // VirtualParalegal toggle handler removed

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

        // VirtualParalegal auto-show logic removed
      }
    },
    [initialLanguage]
  );

  return (
    <div className="min-h-screen bg-black">
      {/* Performance Monitor */}
      <QwikPerformanceMonitor />

      {/* Language Toggle - Fixed Position (hide on Spanish pages) */}
      {initialLanguage === 'en' && (
        <div className="fixed right-2 sm:right-4 top-16 sm:top-20 z-40 flex gap-1 sm:gap-2 rounded-full bg-black/50 p-1 backdrop-blur-sm">
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
        </div>
      )}

      {/* Virtual Paralegal Trigger - Removed to prevent duplicate chat widgets */}

      {/* Page Sections - Using Qwik components for static content */}
      <QwikHeroWrapper language={language} />

      {/* Trust Indicators for Spanish */}
      {language === 'es' && (
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
                <div key={index} className="text-center">
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

      <QwikFirmHighlightsWrapper language={language} />
      {language === 'es' && <PracticeAreasShowcase language={language} />}
      <OfficeLocations language={language} />
      <ResultsShowcase language={language} />
      <TestimonialsSection language={language} />

      {/* Virtual Paralegal Modal - removed */}

      {/* Background Effects */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-secondary/10 blur-3xl" />
      </div>
    </div>
  );
};

export default withErrorBoundary(QwikOptimizedHomePage);
