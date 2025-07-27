'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';

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

export default function SpanishHomePage() {
  const [showVirtualParalegal, setShowVirtualParalegal] = useState(false);

  useEffect(() => {
    // Show virtual paralegal after 10 seconds
    const timer = setTimeout(() => {
      if (!sessionStorage.getItem('paralegal-shown')) {
        setShowVirtualParalegal(true);
        sessionStorage.setItem('paralegal-shown', 'true');
      }
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-black">
      {/* Virtual Paralegal Trigger - Fixed Position */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2 }}
        onClick={() => setShowVirtualParalegal(true)}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-gradient-to-r from-primary to-primary-300 shadow-2xl transition-all hover:scale-110"
        aria-label="Abrir Asistente de IA"
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

      {/* Page Sections */}
      <ModernHero language="es" />

      {/* Trust Indicators */}
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

      <FirmHighlights language="es" />
      <PracticeAreasShowcase language="es" />
      <OfficeLocations language="es" />
      <ResultsShowcase language="es" />
      <TestimonialsSection language="es" />

      {/* Virtual Paralegal Modal */}
      {showVirtualParalegal && (
        <VirtualParalegal language="es" onClose={() => setShowVirtualParalegal(false)} />
      )}

      {/* Background Effects */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-secondary/10 blur-3xl" />
      </div>
    </div>
  );
}
