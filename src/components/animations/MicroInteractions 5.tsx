'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import confetti from 'canvas-confetti';

// Ripple effect button
export function RippleButton({ 
  children, 
  onClick,
  className = '',
  color = 'rgba(255, 255, 255, 0.5)'
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  color?: string;
}) {
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();

    setRipples([...ripples, { x, y, id }]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((ripple) => ripple.id !== id));
    }, 1000);

    onClick?.();
  };

  return (
    <button
      onClick={handleClick}
      className={`relative overflow-hidden ${className}`}
    >
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            className="absolute rounded-full"
            style={{
              left: ripple.x,
              top: ripple.y,
              backgroundColor: color,
            }}
            initial={{ width: 0, height: 0, x: 0, y: 0 }}
            animate={{ width: 300, height: 300, x: -150, y: -150 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
        ))}
      </AnimatePresence>
      <span className="relative z-10">{children}</span>
    </button>
  );
}

// Success animation with confetti
export function SuccessAnimation({ 
  trigger, 
  message = 'Success!',
  onComplete
}: {
  trigger: boolean;
  message?: string;
  onComplete?: () => void;
}) {
  React.useEffect(() => {
    if (trigger) {
      // Trigger confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#6B1F2E', '#C9974D', '#8B2635'],
      });

      // Call onComplete after animation
      setTimeout(() => {
        onComplete?.();
      }, 2000);
    }
  }, [trigger, onComplete]);

  return (
    <AnimatePresence>
      {trigger && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="rounded-lg bg-white p-8 text-center shadow-2xl"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            transition={{ type: 'spring', duration: 0.5 }}
          >
            <motion.div
              className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500 text-white"
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              transition={{ delay: 0.3 }}
            >
              <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </motion.div>
            <h3 className="text-2xl font-bold text-gray-800">{message}</h3>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Loading spinner with morphing shapes
export function MorphingLoader() {
  return (
    <div className="flex space-x-2">
      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          className="h-3 w-3 bg-gradient-to-br from-[#6B1F2E] to-[#C9974D]"
          animate={{
            scale: [1, 1.5, 1],
            rotate: [0, 180, 360],
            borderRadius: ['0%', '50%', '0%'],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: index * 0.2,
          }}
        />
      ))}
    </div>
  );
}

// Elastic input field
export function ElasticInput({ 
  placeholder = '',
  type = 'text',
  className = ''
}: {
  placeholder?: string;
  type?: string;
  className?: string;
}) {
  const [isFocused, setIsFocused] = useState(false);
  const controls = useAnimation();

  const handleFocus = () => {
    setIsFocused(true);
    controls.start({
      scale: [1, 1.02, 1],
      transition: { duration: 0.3, type: 'spring' },
    });
  };

  return (
    <motion.div animate={controls} className="relative">
      <input
        type={type}
        placeholder={placeholder}
        onFocus={handleFocus}
        onBlur={() => setIsFocused(false)}
        className={`w-full rounded-lg border-2 px-4 py-3 transition-colors ${
          isFocused ? 'border-[#6B1F2E]' : 'border-gray-300'
        } ${className}`}
      />
      <motion.div
        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#6B1F2E] to-[#C9974D]"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isFocused ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}

// Toggle switch with smooth animation
export function AnimatedToggle({ 
  checked = false, 
  onChange,
  label = ''
}: {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
}) {
  return (
    <label className="flex cursor-pointer items-center space-x-3">
      <div className="relative">
        <motion.div
          className="h-8 w-14 rounded-full"
          animate={{ backgroundColor: checked ? '#6B1F2E' : '#e5e7eb' }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="absolute top-1 h-6 w-6 rounded-full bg-white shadow-md"
            animate={{ x: checked ? 32 : 2 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          />
        </motion.div>
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange?.(e.target.checked)}
          className="absolute inset-0 opacity-0"
        />
      </div>
      {label && <span className="text-gray-700">{label}</span>}
    </label>
  );
}

// Hover card with 3D tilt
export function HoverCard({ 
  children,
  className = ''
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    setRotateX((y - 0.5) * -20);
    setRotateY((x - 0.5) * 20);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      className={`relative transform-gpu ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ rotateX, rotateY }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div className="relative z-10" style={{ transform: 'translateZ(50px)' }}>
        {children}
      </div>
      <motion.div
        className="absolute inset-0 rounded-lg bg-gradient-to-br from-[#6B1F2E]/20 to-[#C9974D]/20 blur-xl"
        animate={{ opacity: rotateX !== 0 || rotateY !== 0 ? 1 : 0 }}
        style={{ transform: 'translateZ(-50px)' }}
      />
    </motion.div>
  );
}

// Skeleton loader with shimmer effect
export function SkeletonLoader({ 
  width = '100%', 
  height = 20,
  className = ''
}: {
  width?: string | number;
  height?: number;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded bg-gray-200 ${className}`}
      style={{ width, height }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"
        animate={{ x: ['-100%', '100%'] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  );
}

// Notification toast with slide and fade
export function NotificationToast({ 
  message, 
  type = 'info',
  isVisible,
  onClose
}: {
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  isVisible: boolean;
  onClose?: () => void;
}) {
  const colors = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    warning: 'bg-yellow-500',
    info: 'bg-blue-500',
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={`fixed right-4 top-4 z-50 rounded-lg px-6 py-4 text-white shadow-lg ${colors[type]}`}
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 300, opacity: 0 }}
          transition={{ type: 'spring', damping: 25 }}
        >
          <div className="flex items-center justify-between">
            <span>{message}</span>
            <button
              onClick={onClose}
              className="ml-4 text-white/80 hover:text-white"
            >
              ×
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}