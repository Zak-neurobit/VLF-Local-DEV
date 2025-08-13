'use client';

import React, { useState, useCallback } from 'react';
import dynamic from 'next/dynamic';

// Removed framer-motion for performance - using CSS transitions instead

// Import all components directly for SSR
import ModernHero from '../hero/ModernHero';
import FirmHighlights from './FirmHighlights';
import OfficeLocations from './OfficeLocations';
import ResultsShowcase from './ResultsShowcase';
import { TestimonialsSection } from './TestimonialsSection';
import PracticeAreasShowcase from './PracticeAreasShowcase';

// BACKUP: VirtualParalegal temporarily disabled - component saved in _backup_virtualparalegal/
// const VirtualParalegal = dynamic(() => import('../VirtualParalegal'), {
//   loading: () => null,
// });

interface HomePageProps {
  language?: 'en' | 'es';
}

const HomePage: React.FC<HomePageProps> = ({ language: initialLanguage = 'en' }) => {
  const [language, setLanguage] = useState<'en' | 'es'>(initialLanguage);
  // BACKUP: VirtualParalegal state disabled
  // const [showVirtualParalegal, setShowVirtualParalegal] = useState(false);

  // Memoize callbacks to prevent unnecessary re-renders
  const handleLanguageChange = useCallback((lang: 'en' | 'es') => {
    setLanguage(lang);
  }, []);

  // BACKUP: VirtualParalegal toggle disabled
  // const handleVirtualParalegalToggle = useCallback(() => {
  //   setShowVirtualParalegal(prev => !prev);
  // }, []);

  // Simple useEffect for language detection
  React.useEffect(() => {
    if (typeof window !== 'undefined' && initialLanguage === 'en') {
      const browserLang = navigator.language.toLowerCase();
      if (browserLang.startsWith('es')) {
        setLanguage('es');
      }
    }
  }, [initialLanguage]);

  return (
    <div className="min-h-screen bg-mesh-dark relative overflow-hidden">
      {/* Floating gradient orbs */}
      <div className="gradient-orb-gold w-96 h-96 top-20 left-10 animate-float-orb" />
      <div className="gradient-orb-burgundy w-80 h-80 bottom-20 right-10 animate-float-orb-reverse" />
      <div className="gradient-orb-mixed w-64 h-64 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      {/* Language Toggle - Fixed Position (hide on Spanish pages) */}
      {initialLanguage === 'en' && (
        <div
          className="fixed right-2 sm:right-4 top-24 sm:top-28 z-40 flex gap-1 sm:gap-2 rounded-full bg-black/70 p-1 backdrop-blur-md border border-gold-400/20 animate-fadeIn"
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
        </div>
      )}

      {/* Virtual Paralegal Trigger - Removed to prevent duplicate chat widgets */}

      {/* Page Sections */}
      <ModernHero language={language} />

      {/* Trust Indicators for Spanish */}
      {language === 'es' && (
        <section className="bg-gradient-to-b from-black/95 via-burgundy-950/10 to-black py-12 relative">
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

      {/* BACKUP: Virtual Paralegal Modal - temporarily disabled */}
      {/* {showVirtualParalegal && (
        <VirtualParalegal language={language} onClose={() => setShowVirtualParalegal(false)} />
      )} */}

      {/* Background Effects */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-secondary/10 blur-3xl" />
      </div>
    </div>
  );
};

export default HomePage;
