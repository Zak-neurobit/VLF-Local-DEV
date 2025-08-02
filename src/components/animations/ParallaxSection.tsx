'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useMultiLayerParallax } from '@/hooks/useParallax';

interface ParallaxSectionProps {
  children: React.ReactNode;
  className?: string;
  layers?: number;
}

export function ParallaxSection({ children, className = '', layers = 3 }: ParallaxSectionProps) {
  const { containerRef, layerEffects, scrollYProgress } = useMultiLayerParallax(layers);

  // Background gradient animation
  const gradientY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const gradientOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.6, 0.3]);

  return (
    <section ref={containerRef as React.RefObject<HTMLElement>} className={`relative overflow-hidden ${className}`}>
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-[#6B1F2E] via-[#8B2635] to-[#C9974D]"
        style={{
          y: gradientY,
          opacity: gradientOpacity,
        }}
      />

      {/* Parallax layers */}
      {React.Children.map(children, (child, index) => {
        if (index >= layers) return null;
        const effect = layerEffects[index];
        if (!effect) return null;

        return (
          <motion.div
            className="relative"
            style={{
              y: effect.y,
              scale: effect.scale,
              opacity: effect.opacity,
              filter: `blur(${effect.blur}px)`,
            }}
          >
            {child}
          </motion.div>
        );
      })}
    </section>
  );
}

// Advanced hero parallax component
export function ParallaxHero({
  title,
  subtitle,
  backgroundImage,
  overlayOpacity = 0.5,
}: {
  title: string;
  subtitle: string;
  backgroundImage: string;
  overlayOpacity?: number;
}) {
  const { scrollYProgress } = useScroll();

  // Parallax transforms
  const y = useTransform(scrollYProgress, [0, 1], [0, 500]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.5]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Background image with parallax */}
      <motion.div
        className="absolute inset-0"
        style={{
          y,
          scale,
        }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
        <div className="absolute inset-0 bg-black" style={{ opacity: overlayOpacity }} />
      </motion.div>

      {/* Content */}
      <motion.div
        className="relative z-10 flex h-full items-center justify-center text-center"
        style={{
          y: textY,
          opacity,
        }}
      >
        <div className="max-w-4xl px-4">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mb-6 text-5xl font-bold text-white md:text-7xl"
          >
            {title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="text-xl text-white/90 md:text-2xl"
          >
            {subtitle}
          </motion.p>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        <div className="h-16 w-8 rounded-full border-2 border-white/50">
          <motion.div
            className="mx-auto mt-2 h-3 w-3 rounded-full bg-white"
            animate={{ y: [0, 20, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          />
        </div>
      </motion.div>
    </div>
  );
}
