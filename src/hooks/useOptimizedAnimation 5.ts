'use client';

import { useEffect, useState } from 'react';
import { useDeviceCapabilities } from '@/lib/performance/device-detection';
import { MotionProps } from 'framer-motion';

interface OptimizedAnimationOptions {
  disableOnLowEnd?: boolean;
  respectReducedMotion?: boolean;
  delayUntilInView?: boolean;
}

export function useOptimizedAnimation(
  props: MotionProps,
  options: OptimizedAnimationOptions = {}
): MotionProps | {} {
  const { disableOnLowEnd = true, respectReducedMotion = true, delayUntilInView = false } = options;

  const capabilities = useDeviceCapabilities();
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    // Determine if animations should be enabled
    const canAnimate =
      (!disableOnLowEnd || !capabilities.isLowEnd) &&
      (!respectReducedMotion || !capabilities.hasReducedMotion);

    setShouldAnimate(canAnimate);
  }, [capabilities, disableOnLowEnd, respectReducedMotion]);

  // Return empty object if animations should be disabled
  if (!shouldAnimate) {
    return {};
  }

  // Add viewport-based animation if requested
  if (delayUntilInView) {
    return {
      ...props,
      viewport: { once: true, amount: 0.3, ...props.viewport },
    };
  }

  return props;
}

// Simplified animation variants for common patterns
export const optimizedVariants = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  },
  slideDown: {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
  },
  slideLeft: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  },
  slideRight: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
  },
  scale: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
  },
  // Stagger children animations
  staggerContainer: {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  },
  staggerItem: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  },
};

// Performance-optimized transition presets
export const optimizedTransitions = {
  fast: {
    duration: 0.2,
    ease: 'easeOut',
  },
  normal: {
    duration: 0.3,
    ease: 'easeInOut',
  },
  slow: {
    duration: 0.5,
    ease: 'easeInOut',
  },
  spring: {
    type: 'spring',
    stiffness: 300,
    damping: 30,
  },
  springGentle: {
    type: 'spring',
    stiffness: 100,
    damping: 20,
  },
};
