'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';

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
      {/* Virtual Paralegal Trigger - Removed to prevent duplicate chat widgets */}

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
