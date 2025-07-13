'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useMagneticHover, useMagneticCursor } from '@/hooks/useMagneticHover';

interface MagneticButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  strength?: number;
}

export function MagneticButton({
  children,
  onClick,
  className = '',
  strength = 0.5,
}: MagneticButtonProps) {
  const { ref, x, y, scale, isHovered } = useMagneticHover({ strength });

  return (
    <motion.button
      ref={ref as any}
      onClick={onClick}
      className={`relative overflow-hidden rounded-lg bg-gradient-to-r from-[#6B1F2E] to-[#8B2635] px-8 py-4 font-semibold text-white ${className}`}
      style={{ x, y, scale }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Ripple effect on hover */}
      <motion.div
        className="absolute inset-0 bg-white"
        initial={{ scale: 0, opacity: 0.3 }}
        animate={{
          scale: isHovered ? 2 : 0,
          opacity: isHovered ? 0 : 0.3,
        }}
        transition={{ duration: 0.5 }}
        style={{ borderRadius: '50%' }}
      />

      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}

// Magnetic icon with rotation
export function MagneticIcon({
  icon: Icon,
  size = 24,
  className = '',
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  size?: number;
  className?: string;
}) {
  const { ref, x, y, scale, isHovered } = useMagneticHover({ strength: 0.3 });

  return (
    <motion.div
      ref={ref as any}
      className={`inline-flex items-center justify-center rounded-full p-3 ${className}`}
      style={{ x, y, scale }}
      whileHover={{ rotate: 360 }}
      transition={{ rotate: { duration: 0.6 } }}
    >
      <Icon size={size} className={isHovered ? 'text-[#C9974D]' : 'text-[#6B1F2E]'} />
    </motion.div>
  );
}

// Magnetic card with depth effect
export function MagneticCard({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { ref, x, y, scale, isHovered } = useMagneticHover({ strength: 0.2, radius: 300 });

  return (
    <motion.div
      ref={ref as any}
      className={`relative overflow-hidden rounded-xl bg-white shadow-lg ${className}`}
      style={{ x, y, scale }}
    >
      {/* Background gradient that follows mouse */}
      <motion.div
        className="absolute inset-0 bg-gradient-radial from-[#6B1F2E]/10 to-transparent"
        animate={{
          opacity: isHovered ? 1 : 0,
        }}
        style={{
          background: isHovered
            ? `radial-gradient(circle at ${x.get() + 50}% ${y.get() + 50}%, rgba(107, 31, 46, 0.1) 0%, transparent 70%)`
            : undefined,
        }}
      />

      {children}

      {/* Border glow effect */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-xl"
        initial={{ opacity: 0 }}
        animate={{
          opacity: isHovered ? 1 : 0,
          boxShadow: isHovered ? '0 0 30px rgba(107, 31, 46, 0.3)' : '0 0 0px rgba(107, 31, 46, 0)',
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}

// Custom magnetic cursor
export function MagneticCursor() {
  const { cursorRef, x, y, isVisible } = useMagneticCursor();

  return (
    <>
      {/* Main cursor */}
      <motion.div
        ref={cursorRef}
        className="pointer-events-none fixed z-50 h-4 w-4 rounded-full bg-[#6B1F2E] mix-blend-difference"
        style={{
          x: x,
          y: y,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isVisible ? 1 : 0,
        }}
      />

      {/* Cursor trail */}
      <motion.div
        className="pointer-events-none fixed z-40 h-8 w-8 rounded-full border-2 border-[#6B1F2E]/30"
        style={{
          x: x,
          y: y,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isVisible ? 1 : 0,
        }}
        transition={{ delay: 0.05 }}
      />
    </>
  );
}

// Magnetic navigation menu
export function MagneticNav({
  items,
}: {
  items: { label: string; href: string; icon?: React.ComponentType<any> }[];
}) {
  return (
    <nav className="flex space-x-8">
      {items.map((item, index) => {
        const { ref, x, y, isHovered } = useMagneticHover({ strength: 0.3 });

        return (
          <motion.a
            key={index}
            ref={ref as any}
            href={item.href}
            className="group relative flex items-center space-x-2 text-gray-700 transition-colors hover:text-[#6B1F2E]"
            style={{ x, y }}
          >
            {item.icon && (
              <motion.span animate={{ rotate: isHovered ? 360 : 0 }} transition={{ duration: 0.5 }}>
                <item.icon className="h-5 w-5" />
              </motion.span>
            )}
            <span className="font-medium">{item.label}</span>

            {/* Underline effect */}
            <motion.div
              className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-[#6B1F2E] to-[#C9974D]"
              initial={{ width: '0%' }}
              animate={{ width: isHovered ? '100%' : '0%' }}
              transition={{ duration: 0.3 }}
            />
          </motion.a>
        );
      })}
    </nav>
  );
}
