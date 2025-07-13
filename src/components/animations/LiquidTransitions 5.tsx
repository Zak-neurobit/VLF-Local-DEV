'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface LiquidButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  color?: string;
}

export function LiquidButton({ 
  children, 
  onClick, 
  className = '',
  color = '#6B1F2E'
}: LiquidButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`group relative overflow-hidden rounded-lg px-8 py-4 font-semibold text-white transition-transform hover:scale-105 ${className}`}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#6B1F2E] to-[#8B2635]" />
      
      {/* Liquid effect */}
      <div className="absolute inset-0">
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <filter id="liquid">
              <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="3" result="turbulence" />
              <feColorMatrix in="turbulence" mode="saturate" values="2" result="saturate" />
              <feComponentTransfer in="saturate" result="discrete">
                <feFuncA type="discrete" tableValues="0 0.5 0.5 0.5 0.5 1" />
              </feComponentTransfer>
              <feGaussianBlur in="discrete" stdDeviation="1" result="blur" />
              <feComposite in="blur" in2="SourceGraphic" operator="over" />
            </filter>
          </defs>
          <motion.path
            d="M0,50 Q25,30 50,50 T100,50 L100,100 L0,100 Z"
            fill={color}
            filter="url(#liquid)"
            initial={{ d: "M0,50 Q25,50 50,50 T100,50 L100,100 L0,100 Z" }}
            whileHover={{ 
              d: "M0,20 Q25,10 50,20 T100,20 L100,100 L0,100 Z",
              transition: { duration: 0.3 }
            }}
          />
        </svg>
      </div>

      {/* Content */}
      <span className="relative z-10">{children}</span>
    </button>
  );
}

// Liquid reveal section
export function LiquidReveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  
  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      {/* Liquid mask */}
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <mask id="liquid-mask">
            <motion.rect
              x="0"
              y="0"
              width="100"
              height="100"
              fill="white"
              initial={{ y: 100 }}
              animate={inView ? { y: 0 } : { y: 100 }}
              transition={{ duration: 1.5, ease: 'easeInOut' }}
            />
          </mask>
        </defs>
        <motion.path
          d="M0,0 Q50,10 100,0 L100,100 L0,100 Z"
          fill="url(#liquid-gradient)"
          mask="url(#liquid-mask)"
          animate={inView ? {
            d: [
              "M0,0 Q50,10 100,0 L100,100 L0,100 Z",
              "M0,5 Q50,0 100,5 L100,100 L0,100 Z",
              "M0,0 Q50,10 100,0 L100,100 L0,100 Z",
            ]
          } : {}}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
        <defs>
          <linearGradient id="liquid-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6B1F2E" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#C9974D" stopOpacity="0.8" />
          </linearGradient>
        </defs>
      </svg>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        {children}
      </motion.div>
    </div>
  );
}

// Blob animation component
export function BlobAnimation() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute -left-20 -top-20 h-96 w-96 rounded-full bg-gradient-to-br from-[#6B1F2E]/30 to-[#C9974D]/30 blur-3xl"
        animate={{
          x: [0, 100, 0],
          y: [0, -100, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute -bottom-20 -right-20 h-96 w-96 rounded-full bg-gradient-to-br from-[#8B2635]/30 to-[#D4A574]/30 blur-3xl"
        animate={{
          x: [0, -100, 0],
          y: [0, 100, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
}

// Liquid morph shapes
export function LiquidMorph() {
  const paths = [
    "M40,20 Q80,20 80,40 Q80,80 40,80 Q0,80 0,40 Q0,20 40,20",
    "M30,10 Q70,30 90,50 Q70,70 30,90 Q10,70 10,50 Q10,30 30,10",
    "M50,10 Q90,30 90,50 Q90,70 50,90 Q10,70 10,50 Q10,30 50,10",
  ];

  return (
    <svg className="h-full w-full" viewBox="0 0 100 100">
      <defs>
        <linearGradient id="morph-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6B1F2E" />
          <stop offset="100%" stopColor="#C9974D" />
        </linearGradient>
      </defs>
      <motion.path
        d={paths[0]}
        fill="url(#morph-gradient)"
        animate={{ d: paths }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
        }}
      />
    </svg>
  );
}