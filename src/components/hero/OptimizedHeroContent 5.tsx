'use client';

import React from 'react';
import { motion, MotionProps } from 'framer-motion';
import Link from 'next/link';
import OptimizedImage from '@/components/ui/optimized-image';
import { useDeviceCapabilities } from '@/lib/performance/device-detection';

interface HeroContentProps {
  title: string;
  subtitle: string;
  description: string;
  cta1: string;
  cta2: string;
}

// Conditional motion wrapper that respects reduced motion
function ConditionalMotion({
  children,
  className,
  ...props
}: { children: React.ReactNode; className?: string } & MotionProps) {
  const { hasReducedMotion } = useDeviceCapabilities();

  if (hasReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div className={className} {...props}>
      {children}
    </motion.div>
  );
}

export default function OptimizedHeroContent({
  title,
  subtitle,
  description,
  cta1,
  cta2,
}: HeroContentProps) {
  const { isMobile, hasReducedMotion } = useDeviceCapabilities();

  return (
    <>
      {/* Official Logo Banner */}
      <ConditionalMotion
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="mb-8"
      >
        <OptimizedImage
          src="/images/BANNER_TRANS.PNG"
          alt="Vasquez Law Firm"
          width={800}
          height={200}
          className="max-w-full h-auto"
          priority
          critical
          sizes="(max-width: 768px) 100vw, 800px"
        />
      </ConditionalMotion>

      {/* William Vasquez as Main Featured Image */}
      <div className="relative mb-8">
        <ConditionalMotion
          initial={{ scale: 0, rotate: -180, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{ duration: 1.2, type: 'spring' }}
          className="relative z-20 mx-auto"
        >
          <div
            style={{
              position: 'relative',
              width: isMobile ? '300px' : '400px',
              height: isMobile ? '400px' : '533px',
              margin: '0 auto',
              overflow: 'hidden',
              borderRadius: '0 0 50% 50%',
              maskImage: 'linear-gradient(to bottom, black 90%, transparent 100%)',
            }}
          >
            <OptimizedImage
              src="/william-vasquez-cutout.png"
              alt="William Vasquez - Managing Attorney"
              width={isMobile ? 300 : 400}
              height={isMobile ? 400 : 533}
              className="relative z-10"
              priority
              critical
              sizes="(max-width: 768px) 300px, 400px"
              style={{
                filter: 'drop-shadow(0 25px 50px rgba(0, 0, 0, 0.7))',
                objectFit: 'cover',
                objectPosition: 'center',
                backgroundColor: 'transparent',
              }}
            />
          </div>

          {/* Glow effect behind William - reduced for performance */}
          {!hasReducedMotion && (
            <div className="absolute inset-0 -z-10">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-[#C9974D]/20 blur-3xl" />
            </div>
          )}
        </ConditionalMotion>

        {/* Floating Logos on sides - only on desktop */}
        {!isMobile && (
          <>
            <ConditionalMotion
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="absolute left-0 top-1/2 -translate-y-1/2 hidden lg:block"
            >
              <OptimizedImage
                src="/images/LOGO_TRANS.PNG"
                alt="Vasquez Law Firm"
                width={150}
                height={150}
                className="opacity-30"
                loading="lazy"
              />
            </ConditionalMotion>

            <ConditionalMotion
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="absolute right-0 top-1/2 -translate-y-1/2 hidden lg:block"
            >
              <OptimizedImage
                src="/images/LOGO_TRANS.PNG"
                alt="Vasquez Law Firm"
                width={150}
                height={150}
                className="opacity-30"
                loading="lazy"
              />
            </ConditionalMotion>
          </>
        )}
      </div>

      {/* Main Title - YO PELEO POR TI™ */}
      <ConditionalMotion
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mb-8 text-center"
      >
        <h1 className="mb-2 bg-gradient-to-r from-[#C9974D] via-white to-[#C9974D] bg-clip-text text-6xl font-black tracking-tight text-transparent md:text-8xl">
          {title}
        </h1>
        <div className="h-1 w-32 mx-auto bg-gradient-to-r from-transparent via-[#C9974D] to-transparent" />
        <p className="mt-2 text-2xl font-bold text-white md:text-3xl">{subtitle}</p>
      </ConditionalMotion>

      {/* Description */}
      <ConditionalMotion
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="mb-12 max-w-3xl text-lg text-gray-300 md:text-xl"
      >
        {description}
      </ConditionalMotion>

      {/* CTA Buttons */}
      <ConditionalMotion
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="mb-16 flex flex-col gap-4 sm:flex-row"
      >
        <Link
          href="/ai-consultation"
          className="group relative overflow-hidden rounded-full bg-gradient-to-r from-[#C9974D] to-[#E5B568] px-8 py-4 font-bold text-black transition-all hover:scale-105"
        >
          <span className="relative z-10">{cta1}</span>
          <div className="absolute inset-0 bg-white opacity-0 transition-opacity group-hover:opacity-20" />
        </Link>

        <a
          href="tel:1-844-967-3536"
          className="group relative overflow-hidden rounded-full border-2 border-[#C9974D] px-8 py-4 font-bold text-[#C9974D] backdrop-blur-sm transition-all hover:bg-[#C9974D] hover:text-black"
        >
          <span className="relative z-10">{cta2}</span>
        </a>
      </ConditionalMotion>
    </>
  );
}
