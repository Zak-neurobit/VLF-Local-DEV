'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

// Page transition wrapper
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={{
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
        }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

// Curtain transition
export function CurtainTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div key={pathname} className="relative">
        {/* Curtain overlay */}
        <motion.div
          className="pointer-events-none fixed inset-0 z-50 bg-gradient-to-br from-[#6B1F2E] to-[#8B2635]"
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          exit={{ scaleY: 1 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          style={{ originY: 0 }}
        />
        
        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// Slide transition
export function SlideTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '-100%' }}
        transition={{ type: 'tween', duration: 0.5, ease: 'easeInOut' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

// Zoom transition
export function ZoomTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 1.2, opacity: 0 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

// Morph transition with SVG masks
export function MorphTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div key={pathname} className="relative">
        {/* SVG Mask */}
        <svg className="pointer-events-none fixed inset-0 z-50 h-full w-full">
          <defs>
            <mask id="morph-mask">
              <motion.circle
                cx="50%"
                cy="50%"
                fill="white"
                initial={{ r: 0 }}
                animate={{ r: '150%' }}
                exit={{ r: 0 }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
              />
            </mask>
          </defs>
          <rect
            width="100%"
            height="100%"
            fill="url(#gradient)"
            mask="url(#morph-mask)"
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6B1F2E" />
              <stop offset="100%" stopColor="#C9974D" />
            </linearGradient>
          </defs>
        </svg>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
        >
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// Perspective page flip
export function FlipTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        className="relative"
        style={{ perspective: 1000 }}
      >
        <motion.div
          initial={{ rotateY: -90, opacity: 0 }}
          animate={{ rotateY: 0, opacity: 1 }}
          exit={{ rotateY: 90, opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// Liquid page transition
export function LiquidTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div key={pathname} className="relative">
        {/* Liquid overlay */}
        <svg className="pointer-events-none fixed inset-0 z-50 h-full w-full">
          <defs>
            <filter id="liquid-transition">
              <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="5" seed="2" />
              <feColorMatrix values="0 0 0 0 0.42 0 0 0 0 0.12 0 0 0 0 0.18 0 0 0 1 0" />
              <feComponentTransfer>
                <feFuncA type="discrete" tableValues="0 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 1" />
              </feComponentTransfer>
              <feGaussianBlur stdDeviation="1" />
            </filter>
          </defs>
          <motion.rect
            width="100%"
            height="100%"
            filter="url(#liquid-transition)"
            initial={{ y: '100%' }}
            animate={{ y: '-100%' }}
            exit={{ y: '100%' }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
          />
        </svg>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// Multi-layer transition
export function MultiLayerTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const layers = [
    { color: '#6B1F2E', delay: 0 },
    { color: '#8B2635', delay: 0.1 },
    { color: '#C9974D', delay: 0.2 },
  ];

  return (
    <AnimatePresence mode="wait">
      <motion.div key={pathname} className="relative">
        {/* Multiple sliding layers */}
        {layers.map((layer, index) => (
          <motion.div
            key={index}
            className="pointer-events-none fixed inset-0 z-50"
            style={{ backgroundColor: layer.color }}
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            exit={{ x: '-100%' }}
            transition={{
              duration: 0.8,
              delay: layer.delay,
              ease: 'easeInOut',
            }}
          />
        ))}

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}