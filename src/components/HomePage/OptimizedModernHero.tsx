'use client';

import React, { useRef } from 'react';
import dynamic from 'next/dynamic';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useDeviceCapabilities } from '@/lib/performance/device-detection';
import { LazyLoadWrapper } from '@/components/ui/loading-states';
import ErrorBoundary from '@/components/ErrorBoundary';

// Lazy load heavy components
const OptimizedHeroScene = dynamic(() => import('@/components/hero/OptimizedHeroScene'), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 via-black to-primary/10" />
  ),
});

const HeroStats = dynamic(() => import('@/components/hero/HeroStats'), {
  loading: () => <div className="h-20" />,
});

const HeroTestimonials = dynamic(() => import('@/components/hero/HeroTestimonials'), {
  loading: () => <div className="h-32" />,
});

const VeteranBadge = dynamic(() => import('@/components/hero/VeteranBadge'));
const ScrollIndicator = dynamic(() => import('@/components/hero/ScrollIndicator'));
const OptimizedHeroContent = dynamic(() => import('@/components/hero/OptimizedHeroContent'));

interface OptimizedModernHeroProps {
  language: 'en' | 'es';
}

export default function OptimizedModernHero({ language }: OptimizedModernHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { y, opacity } = useScrollAnimation();
  const capabilities = useDeviceCapabilities();

  const content = {
    en: {
      badge: 'U.S. Air Force Veteran Attorney',
      title: 'YO PELEO POR TI™',
      subtitle: 'I FIGHT FOR YOU',
      description:
        'When you need a fighter in your corner, I bring military discipline and legal expertise to protect your rights and secure your future.',
      cta1: 'Free Case Evaluation',
      cta2: 'Call Now: 1-844-YO-PELEO',
      stats: [
        { value: '60+', label: 'Years Collective Experience' },
        { value: '30,000+', label: 'Clients Helped' },
        { value: '4', label: 'Office Locations' },
        { value: '24/7', label: 'Available' },
      ],
      testimonials: [
        {
          text: "Mr. Vasquez fought tirelessly for my family's immigration case. His dedication changed our lives.",
          author: 'Sofia R., Charlotte',
        },
        {
          text: 'After my accident, Vasquez Law Firm got me the compensation I deserved. True advocates!',
          author: 'Michael T., Raleigh',
        },
        {
          text: 'They helped me when I needed it most. Professional, caring, and effective.',
          author: 'Maria G., Smithfield',
        },
        {
          text: "Outstanding representation for my workers' comp case. Highly recommend!",
          author: 'James P., Orlando',
        },
      ],
    },
    es: {
      badge: 'Abogado Veterano de la Fuerza Aérea',
      title: 'YO PELEO POR TI™',
      subtitle: 'I FIGHT FOR YOU',
      description:
        'Cuando necesitas un luchador en tu esquina, traigo disciplina militar y experiencia legal para proteger tus derechos y asegurar tu futuro.',
      cta1: 'Evaluación Gratuita',
      cta2: 'Llame Ahora: 1-844-YO-PELEO',
      stats: [
        { value: '60+', label: 'Años de Experiencia Colectiva' },
        { value: '30,000+', label: 'Clientes Ayudados' },
        { value: '4', label: 'Oficinas' },
        { value: '24/7', label: 'Disponible' },
      ],
      testimonials: [
        {
          text: 'El Sr. Vasquez luchó incansablemente por el caso de inmigración de mi familia. Su dedicación cambió nuestras vidas.',
          author: 'Sofia R., Charlotte',
        },
        {
          text: 'Después de mi accidente, Vasquez Law Firm me consiguió la compensación que merecía. ¡Verdaderos defensores!',
          author: 'Michael T., Raleigh',
        },
        {
          text: 'Me ayudaron cuando más lo necesitaba. Profesionales, atentos y efectivos.',
          author: 'Maria G., Smithfield',
        },
        {
          text: '¡Excelente representación para mi caso de compensación laboral. Los recomiendo mucho!',
          author: 'James P., Orlando',
        },
      ],
    },
  };

  const t = content[language];

  // Apply reduced motion styles
  const motionStyle = capabilities.hasReducedMotion
    ? {}
    : { transform: `translateY(${y}px)`, opacity: opacity.get() };

  return (
    <ErrorBoundary>
      <section
        ref={containerRef}
        className="relative min-h-screen overflow-hidden bg-black contain-layout"
      >
        {/* 3D Background */}
        <LazyLoadWrapper minHeight="100vh">
          <OptimizedHeroScene />
        </LazyLoadWrapper>

        {/* Gradient Overlay with Burgundy theme */}
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/90 via-black/80 to-black" />

        {/* Main Content */}
        <div
          style={motionStyle}
          className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 text-center"
        >
          {/* Veteran Badge */}
          <LazyLoadWrapper>
            <VeteranBadge text={t.badge} />
          </LazyLoadWrapper>

          {/* Main Hero Content */}
          <ErrorBoundary>
            <OptimizedHeroContent
              title={t.title}
              subtitle={t.subtitle}
              description={t.description}
              cta1={t.cta1}
              cta2={t.cta2}
            />
          </ErrorBoundary>

          {/* Stats - Only load on viewport */}
          {!capabilities.isLowEnd && (
            <LazyLoadWrapper>
              <HeroStats stats={t.stats} />
            </LazyLoadWrapper>
          )}

          {/* Testimonial Carousel - Only load on viewport */}
          {!capabilities.isLowEnd && (
            <LazyLoadWrapper>
              <HeroTestimonials testimonials={t.testimonials} />
            </LazyLoadWrapper>
          )}
        </div>

        {/* Scroll Indicator */}
        {!capabilities.hasReducedMotion && (
          <LazyLoadWrapper>
            <ScrollIndicator />
          </LazyLoadWrapper>
        )}
      </section>
    </ErrorBoundary>
  );
}
