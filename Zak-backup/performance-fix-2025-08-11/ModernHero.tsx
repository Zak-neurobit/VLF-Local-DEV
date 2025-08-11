'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/design-system/Button';
import { Heading, Text } from '@/components/design-system/Typography';
import { TRADEMARK } from '@/lib/constants/trademark';

interface ModernHeroProps {
  language: 'en' | 'es';
}

export default function ModernHero({ language }: ModernHeroProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  const content = {
    en: {
      badge: 'U.S. Air Force Veteran Attorney',
      title: TRADEMARK.YO_PELEO_POR_TI,
      rotatingWords: ['Immigration', 'Personal Injury', 'Workers Comp', 'Criminal Defense'],
      intro: 'Fighting for your',
      description:
        'When you need a fighter in your corner, I bring military discipline and legal expertise to protect your rights and secure your future.',
      cta1: 'Free Case Evaluation',
      cta2: 'Call Now: 1-844-YO-PELEO',
      stats: [
        { value: '60+', label: 'Years Experience' },
        { value: '30K+', label: 'Clients Helped' },
        { value: '98%', label: 'Success Rate' },
        { value: '24/7', label: 'Available' },
      ],
    },
    es: {
      badge: 'Abogado Veterano de la Fuerza Aérea',
      title: TRADEMARK.YO_PELEO_POR_TI,
      rotatingWords: [
        'Inmigración',
        'Lesiones Personales',
        'Compensación Laboral',
        'Defensa Criminal',
      ],
      intro: 'Luchando por tu',
      description:
        'Cuando necesitas un luchador en tu esquina, traigo disciplina militar y experiencia legal para proteger tus derechos y asegurar tu futuro.',
      cta1: 'Evaluación Gratuita',
      cta2: 'Llame Ahora: 1-844-YO-PELEO',
      stats: [
        { value: '60+', label: 'Años de Experiencia' },
        { value: '30K+', label: 'Clientes Ayudados' },
        { value: '98%', label: 'Tasa de Éxito' },
        { value: '24/7', label: 'Disponible' },
      ],
    },
  };

  const t = content[language];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex(prev => (prev + 1) % t.rotatingWords.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [t.rotatingWords.length]);

  return (
    <section className="relative min-h-screen overflow-hidden bg-mesh-dark pt-[92px]">
      {/* Floating gradient orbs background */}
      <div className="gradient-orb-burgundy w-96 h-96 top-0 right-0 animate-float-orb opacity-60" />
      <div className="gradient-orb-gold w-80 h-80 bottom-20 left-10 animate-float-orb-reverse opacity-50" />
      <div className="gradient-orb-mixed w-72 h-72 top-1/2 right-1/3 opacity-40" />
      
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-burgundy-900/10 via-transparent to-gold-900/10" />
        <motion.div
          className="absolute inset-0"
          animate={{ opacity: 1 }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      {/* Particles Effect */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-primary/20"
            initial={{
              x: Math.random() * 1920,
              y: Math.random() * 1080,
            }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: 'linear',
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex min-h-screen items-center">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-6 inline-flex items-center gap-2 rounded-full bg-secondary/20 px-4 py-2 backdrop-blur-sm"
              >
                <span className="text-sm font-medium text-primary">{t.badge}</span>
              </motion.div>

              {/* Title */}
              <Heading level={1} className="mb-6 text-white">
                {t.title}
              </Heading>

              {/* Rotating Text */}
              <div className="mb-8 flex items-baseline gap-3 text-2xl sm:text-3xl">
                <span className="text-gray-300">{t.intro}</span>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={currentWordIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="font-bold text-primary"
                  >
                    {t.rotatingWords[currentWordIndex]}
                  </motion.span>
                </AnimatePresence>
              </div>

              {/* Description */}
              <Text size="lg" className="mb-10 max-w-xl">
                {t.description}
              </Text>

              {/* CTAs */}
              <div className="flex flex-col gap-4 sm:flex-row">
                <Button href="/contact" size="lg">
                  {t.cta1}
                </Button>
                <Button href="tel:1-844-965-3536" variant="outline" size="lg">
                  {t.cta2}
                </Button>
              </div>

              {/* Stats */}
              <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4">
                {t.stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    className="text-center"
                  >
                    <div className="text-3xl font-black text-primary">{stat.value}</div>
                    <div className="mt-1 text-sm text-gray-400">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right Content - Attorney Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative hidden lg:block"
            >
              <div className="relative">
                <Image
                  src="/william-vasquez-cutout.png"
                  alt="William Vasquez"
                  width={500}
                  height={600}
                  className="relative z-10"
                  priority
                />
                {/* Glow Effect */}
                <div className="absolute inset-0 blur-3xl">
                  <div className="h-full w-full bg-gradient-to-t from-primary/20 to-transparent" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-primary/50 p-2">
          <motion.div
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="h-3 w-1 rounded-full bg-primary"
          />
        </div>
      </motion.div>
    </section>
  );
}
