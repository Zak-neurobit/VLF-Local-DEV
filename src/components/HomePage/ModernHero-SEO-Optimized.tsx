'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';

// Particle Field Background
function ParticleField() {
  const count = 500;
  const mesh = useRef<THREE.Points>(null);
  // const fbxModel = useRef<THREE.Group>(null);

  const particles = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    particles[i * 3] = (Math.random() - 0.5) * 10;
    particles[i * 3 + 1] = (Math.random() - 0.5) * 10;
    particles[i * 3 + 2] = (Math.random() - 0.5) * 10;
  }

  useFrame(state => {
    if (mesh.current) {
      mesh.current.rotation.x = state.clock.elapsedTime * 0.05;
      mesh.current.rotation.y = state.clock.elapsedTime * 0.075;
    }
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.length / 3}
          array={particles}
          itemSize={3}
          args={[particles, 3]}
        />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="#C9974D" transparent opacity={0.8} />
    </points>
  );
}

interface ModernHeroProps {
  language: 'en' | 'es';
}

export default function ModernHero({ language }: ModernHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const content = {
    en: {
      badge: 'U.S. Air Force Veteran Attorney',
      title: 'Immigration Lawyer & Personal Injury Attorney',
      tagline: 'YO PELEO POR TI™',
      subtitle: 'I FIGHT FOR YOU',
      description:
        'Experienced immigration lawyers and personal injury attorneys serving North Carolina and Florida. When you need a fighter in your corner, our bilingual legal team brings military discipline and proven results to protect your rights.',
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
      title: 'Abogado de Inmigración y Lesiones Personales',
      tagline: 'YO PELEO POR TI™',
      subtitle: 'I FIGHT FOR YOU',
      description:
        'Abogados de inmigración y lesiones personales experimentados sirviendo Carolina del Norte y Florida. Cuando necesitas un luchador en tu esquina, nuestro equipo legal bilingüe trae disciplina militar y resultados comprobados para proteger tus derechos.',
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

  // Generate FAQ structured data for hero section
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What types of cases does Vasquez Law Firm handle?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Vasquez Law Firm specializes in immigration law, personal injury, workers compensation, criminal defense, and family law cases throughout North Carolina and Florida.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do you offer free consultations?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, we offer free case evaluations for all practice areas. Call 1-844-YO-PELEO (1-844-967-3536) to schedule your consultation.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is Vasquez Law Firm bilingual?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, our team is fully bilingual in English and Spanish. We proudly serve the Hispanic community with culturally sensitive legal representation.',
        },
      },
    ],
  };

  useEffect(() => {
    // Dynamically import gsap to avoid SSR issues
    const animateStats = async () => {
      const { gsap } = await import('gsap');

      // Animate stats on scroll
      const observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              gsap.to(entry.target, {
                scale: 1,
                opacity: 1,
                duration: 0.5,
                stagger: 0.1,
              });
            }
          });
        },
        { threshold: 0.1 }
      );

      const stats = document.querySelectorAll('.stat-card');
      stats.forEach(stat => observer.observe(stat));

      return observer;
    };

    let observer: IntersectionObserver | null = null;
    animateStats().then(obs => {
      observer = obs;
    });

    // Testimonial rotation
    const interval = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % t.testimonials.length);
    }, 5000);

    return () => {
      observer?.disconnect();
      clearInterval(interval);
    };
  }, [t.testimonials.length]);

  return (
    <>
      {/* FAQ Structured Data */}
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
        strategy="afterInteractive"
      />

      <section ref={containerRef} className="relative min-h-screen overflow-hidden bg-black">
        {/* 3D Background */}
        <div className="absolute inset-0 opacity-50">
          <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <ParticleField />
            <Environment preset="city" />
          </Canvas>
        </div>

        {/* Gradient Overlay with Burgundy theme */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#6B1F2E]/90 via-black/80 to-black" />

        {/* Main Content */}
        <motion.div
          style={{ y, opacity }}
          className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 text-center"
        >
          {/* Official Logo Banner */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <Image
              src="/images/BANNER_TRANS.PNG"
              alt="Vasquez Law Firm - Immigration Lawyers and Personal Injury Attorneys in NC and FL"
              width={800}
              height={200}
              className="max-w-full h-auto"
              priority
            />
          </motion.div>

          {/* Veteran Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-4"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-[#C9974D]/20 px-6 py-2 text-sm font-semibold text-[#C9974D] backdrop-blur-sm">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              {t.badge}
            </span>
          </motion.div>

          {/* William Vasquez as Main Featured Image */}
          <div className="relative mb-8">
            <motion.div
              initial={{ scale: 0, rotate: -180, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              transition={{ duration: 1.2, type: 'spring' }}
              className="relative z-20 mx-auto"
            >
              <div
                style={{
                  position: 'relative',
                  width: '400px',
                  height: '533px',
                  margin: '0 auto',
                  overflow: 'hidden',
                  borderRadius: '0 0 50% 50%',
                  maskImage: 'linear-gradient(to bottom, black 90%, transparent 100%)',
                }}
              >
                <Image
                  src="/william-vasquez-cutout.png"
                  alt="William Vasquez - Immigration Lawyer and Personal Injury Attorney - Founding Partner at Vasquez Law Firm"
                  width={400}
                  height={533}
                  className="relative z-10"
                  priority
                  style={{
                    filter: 'drop-shadow(0 25px 50px rgba(0, 0, 0, 0.7))',
                    objectFit: 'cover',
                    objectPosition: 'center',
                    backgroundColor: 'transparent',
                  }}
                />
              </div>

              {/* Glow effect behind William */}
              <div className="absolute inset-0 -z-10">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-[#C9974D]/20 blur-3xl animate-pulse" />
              </div>
            </motion.div>

            {/* Floating Logos on sides */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="absolute left-0 top-1/2 -translate-y-1/2 hidden lg:block"
            >
              <Image
                src="/images/LOGO_TRANS.PNG"
                alt="Vasquez Law Firm Logo"
                width={150}
                height={150}
                className="opacity-30"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="absolute right-0 top-1/2 -translate-y-1/2 hidden lg:block"
            >
              <Image
                src="/images/LOGO_TRANS.PNG"
                alt="Vasquez Law Firm Logo"
                width={150}
                height={150}
                className="opacity-30"
              />
            </motion.div>
          </div>

          {/* SEO-Optimized H1 Title */}
          <motion.header
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8 text-center"
          >
            <h1 className="mb-4">
              <span className="block text-3xl md:text-4xl font-bold text-white mb-2 font-serif">
                {t.title}
              </span>
              <span className="block bg-gradient-to-r from-[#C9974D] via-white to-[#C9974D] bg-clip-text text-5xl font-black tracking-tight text-transparent md:text-7xl font-display">
                {t.tagline}
              </span>
            </h1>
            <div className="h-1 w-32 mx-auto bg-gradient-to-r from-transparent via-[#C9974D] to-transparent" />
            <p className="mt-2 text-2xl font-bold text-white md:text-3xl">{t.subtitle}</p>
          </motion.header>

          {/* SEO-Optimized Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-12 max-w-3xl text-lg text-gray-300 md:text-xl"
          >
            {t.description}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mb-16 flex flex-col gap-4 sm:flex-row"
          >
            <Link
              href="/ai-consultation"
              className="group relative overflow-hidden rounded-full bg-gradient-to-r from-[#C9974D] to-[#E5B568] px-8 py-4 font-bold text-black transition-all hover:scale-105"
              aria-label="Get a free consultation with our immigration lawyers and personal injury attorneys"
            >
              <span className="relative z-10">{t.cta1}</span>
              <div className="absolute inset-0 bg-white opacity-0 transition-opacity group-hover:opacity-20" />
            </Link>

            <a
              href="tel:1-844-967-3536"
              className="group relative overflow-hidden rounded-full border-2 border-[#C9974D] px-8 py-4 font-bold text-[#C9974D] backdrop-blur-sm transition-all hover:bg-[#C9974D] hover:text-black"
              aria-label="Call Vasquez Law Firm now at 1-844-YO-PELEO"
            >
              <span className="relative z-10">{t.cta2}</span>
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="grid grid-cols-2 gap-6 md:grid-cols-4"
          >
            {t.stats.map((stat, index) => (
              <div key={index} className="stat-card transform scale-0 opacity-0 text-center">
                <div className="text-3xl font-black text-[#C9974D] md:text-4xl">{stat.value}</div>
                <div className="mt-1 text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* Testimonial Carousel */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="absolute bottom-8 left-0 right-0"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="mx-auto max-w-2xl px-4 text-center"
              >
                <p className="italic text-gray-300">
                  &quot;{t.testimonials[currentTestimonial].text}&quot;
                </p>
                <p className="mt-2 text-sm text-[#C9974D]">
                  - {t.testimonials[currentTestimonial].author}
                </p>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-gray-400">Scroll</span>
            <div className="h-12 w-6 rounded-full border-2 border-gray-400">
              <motion.div
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="mx-auto mt-2 h-2 w-1 rounded-full bg-[#C9974D]"
              />
            </div>
          </div>
        </motion.div>
      </section>
    </>
  );
}
