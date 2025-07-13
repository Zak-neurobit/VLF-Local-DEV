'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface SimpleHeroProps {
  language: 'en' | 'es';
}

export default function SimpleHero({ language }: SimpleHeroProps) {
  const content = {
    en: {
      badge: 'U.S. Air Force Veteran Attorney',
      title: 'YO PELEO POR TI™',
      subtitle: 'I FIGHT FOR YOU',
      description:
        'When you need a fighter in your corner, I bring military discipline and legal expertise to protect your rights and secure your future.',
      cta1: 'Free Case Evaluation',
      cta2: 'Call Now: 1-844-YO-PELEO',
    },
    es: {
      badge: 'Abogado Veterano de la Fuerza Aérea',
      title: 'YO PELEO POR TI™',
      subtitle: 'YO PELEO POR TI™',
      description:
        'Cuando necesitas un luchador en tu esquina, traigo disciplina militar y experiencia legal para proteger tus derechos y asegurar tu futuro.',
      cta1: 'Evaluación Gratuita',
      cta2: 'Llame Ahora: 1-844-YO-PELEO',
    },
  };

  const t = content[language];

  return (
    <section className="relative min-h-screen bg-black">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/90 via-black/80 to-black" />
      
      {/* Simple animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 via-black to-primary/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-secondary/20 px-4 py-2 backdrop-blur-sm">
            <span className="text-sm font-medium text-primary">{t.badge}</span>
          </div>

          {/* Title */}
          <h1 className="mb-4 text-5xl font-black tracking-tight text-white sm:text-6xl md:text-7xl">
            {t.title}
          </h1>

          {/* Subtitle */}
          <p className="mb-6 text-xl font-semibold text-primary sm:text-2xl">{t.subtitle}</p>

          {/* Description */}
          <p className="mx-auto mb-10 max-w-2xl text-lg text-gray-300">{t.description}</p>

          {/* CTAs */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="rounded-md bg-primary px-8 py-4 text-lg font-semibold text-black transition-all hover:bg-primary/90"
            >
              {t.cta1}
            </Link>
            <a
              href="tel:1-844-965-3536"
              className="rounded-md border-2 border-primary px-8 py-4 text-lg font-semibold text-primary transition-all hover:bg-primary hover:text-black"
            >
              {t.cta2}
            </a>
          </div>

          {/* Attorney Image */}
          <div className="mt-12">
            <Image
              src="/william-vasquez-cutout.png"
              alt="William Vasquez"
              width={300}
              height={400}
              className="mx-auto"
              priority
            />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-primary/50 p-2">
          <div className="h-3 w-1 animate-bounce rounded-full bg-primary" />
        </div>
      </div>
    </section>
  );
}