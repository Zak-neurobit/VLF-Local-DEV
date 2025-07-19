'use client';

import React from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useScrollReveal, useCascadeReveal } from '@/hooks/useScrollReveal';
// import { useAnimations } from '@/hooks/useAnimations';
import Image from 'next/image';

// Counter animation on scroll
export function AnimatedCounter({
  value,
  suffix = '',
  prefix = '',
  duration = 2000,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [displayValue, setDisplayValue] = React.useState(0);

  React.useEffect(() => {
    if (!isInView) return;

    const startTime = Date.now();

    const updateValue = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);

      // Easing function
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = Math.floor(value * easeOutQuart);

      setDisplayValue(currentValue);

      if (progress < 1) {
        requestAnimationFrame(updateValue);
      }
    };

    updateValue();
  }, [isInView, value, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {displayValue.toLocaleString()}
      {suffix}
    </span>
  );
}

// Progress bar that fills on scroll
export function ScrollProgressBar({
  height = 4,
  color = 'bg-gradient-to-r from-[#6B1F2E] to-[#C9974D]',
}: {
  height?: number;
  color?: string;
}) {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <motion.div
      className={`fixed left-0 right-0 top-0 z-50 origin-left ${color}`}
      style={{ height, scaleX }}
    />
  );
}

// Reveal animation with multiple effects
interface RevealProps {
  children: React.ReactNode;
  className?: string;
  effect?: 'fade' | 'slide' | 'scale' | 'rotate';
  delay?: number;
}

export function Reveal({
  children,
  className = '',
  effect: _effect = 'slide',
  delay = 0,
}: RevealProps) {
  const { ref, controls } = useScrollReveal({ delay });

  const _variants = {
    fade: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    },
    slide: {
      hidden: { opacity: 0, y: 50 },
      visible: { opacity: 1, y: 0 },
    },
    scale: {
      hidden: { opacity: 0, scale: 0.8 },
      visible: { opacity: 1, scale: 1 },
    },
    rotate: {
      hidden: { opacity: 0, rotate: -10 },
      visible: { opacity: 1, rotate: 0 },
    },
  };

  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className={className} style={controls}>
      {children}
    </div>
  );
}

// Staggered list reveal
export function StaggeredList({
  items,
  className = '',
  itemClassName = '',
  staggerDelay = 100,
}: {
  items: React.ReactNode[];
  className?: string;
  itemClassName?: string;
  staggerDelay?: number;
}) {
  const { containerRef, getItemProps } = useCascadeReveal(items.length, staggerDelay);

  return (
    <div ref={containerRef as React.RefObject<HTMLDivElement>} className={className}>
      {items.map((item, index) => (
        <div key={index} className={itemClassName} {...getItemProps(index)}>
          {item}
        </div>
      ))}
    </div>
  );
}

// Parallax image with zoom effect
export function ParallaxImage({
  src,
  alt,
  className = '',
  scale = 1.2,
}: {
  src: string;
  alt: string;
  className?: string;
  scale?: number;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const scaleValue = useTransform(scrollYProgress, [0, 0.5, 1], [scale, 1, scale]);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        className="h-full w-full object-cover"
        style={{ y, scale: scaleValue }}
      />
    </div>
  );
}

// Sticky scroll sections
export function StickyScrollSection({
  sections,
}: {
  sections: { title: string; content: React.ReactNode; image?: string }[];
}) {
  return (
    <div className="relative">
      {sections.map((section, index) => (
        <div key={index} className="flex min-h-screen items-center">
          <div className="sticky top-0 flex h-screen w-full items-center">
            <div className="container mx-auto grid grid-cols-1 gap-12 px-4 md:grid-cols-2">
              {/* Content */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: false, amount: 0.5 }}
              >
                <h2 className="mb-6 text-4xl font-bold text-[#6B1F2E]">{section.title}</h2>
                <div className="text-gray-600">{section.content}</div>
              </motion.div>

              {/* Image */}
              {section.image && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: false, amount: 0.5 }}
                  className="relative h-96 overflow-hidden rounded-xl"
                >
                  <Image
                    src={section.image}
                    alt={section.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </motion.div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Scroll-triggered morphing shape
export function ScrollMorphShape() {
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress: _scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // const morphProgress = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.5, 1]);

  return (
    <div ref={ref} className="flex h-96 items-center justify-center">
      <svg width="200" height="200" viewBox="0 0 200 200">
        <defs>
          <linearGradient id="morph-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6B1F2E" />
            <stop offset="100%" stopColor="#C9974D" />
          </linearGradient>
        </defs>
        <motion.path
          d="M100,20 C150,20 180,50 180,100 C180,150 150,180 100,180 C50,180 20,150 20,100 C20,50 50,20 100,20"
          fill="url(#morph-gradient)"
          animate={{
            d: [
              'M100,20 C150,20 180,50 180,100 C180,150 150,180 100,180 C50,180 20,150 20,100 C20,50 50,20 100,20',
              'M100,10 C160,40 190,70 190,100 C190,130 160,160 100,190 C40,160 10,130 10,100 C10,70 40,40 100,10',
              'M100,30 C140,20 170,60 180,100 C170,140 140,180 100,170 C60,180 30,140 20,100 C30,60 60,20 100,30',
            ],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
        />
      </svg>
    </div>
  );
}
