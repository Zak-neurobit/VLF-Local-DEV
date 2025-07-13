'use client';

import { useScroll, useTransform, MotionValue } from 'framer-motion';
import { useRef, RefObject } from 'react';

interface ParallaxOptions {
  offset?: [string, string];
  speed?: number;
  easing?: (t: number) => number;
  clamp?: boolean;
}

interface ParallaxReturn {
  ref: RefObject<HTMLElement>;
  y: MotionValue<number>;
  scale: MotionValue<number>;
  opacity: MotionValue<number>;
  rotateY: MotionValue<number>;
  rotateX: MotionValue<number>;
}

export function useParallax({
  offset = ['start end', 'end start'],
  speed = 0.5,
  easing = t => t,
  clamp = true,
}: ParallaxOptions = {}): ParallaxReturn {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: offset as any,
  });

  // Calculate parallax values
  const yRange = [-100 * speed, 100 * speed];
  const y = useTransform(scrollYProgress, [0, 1], yRange, {
    clamp,
    ease: easing,
  });

  // Scale effect for depth
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 1.2], {
    clamp,
    ease: easing,
  });

  // Opacity fade for smooth entrance/exit
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0], {
    clamp,
    ease: easing,
  });

  // 3D rotation effects
  const rotateY = useTransform(scrollYProgress, [0, 1], [-20, 20], {
    clamp,
    ease: easing,
  });

  const rotateX = useTransform(scrollYProgress, [0, 1], [10, -10], {
    clamp,
    ease: easing,
  });

  return {
    ref,
    y,
    scale,
    opacity,
    rotateY,
    rotateX,
  };
}

// Advanced multi-layer parallax hook
export function useMultiLayerParallax(layers: number = 3) {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const layerEffects = Array.from({ length: layers }, (_, index) => {
    const depth = (index + 1) / layers;
    const speed = 1 - depth * 0.8; // Closer layers move faster

    return {
      y: useTransform(scrollYProgress, [0, 1], [-200 * speed, 200 * speed]),
      scale: useTransform(scrollYProgress, [0, 0.5, 1], [1 - depth * 0.2, 1, 1 + depth * 0.1]),
      opacity: useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]),
      blur: useTransform(scrollYProgress, [0, 1], [depth * 2, 0]),
    };
  });

  return {
    containerRef,
    layerEffects,
    scrollYProgress,
  };
}

// Perspective parallax for 3D card effects
export function usePerspectiveParallax() {
  const cardRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  });

  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [30, 0, -30]);
  const rotateY = useTransform(scrollYProgress, [0, 0.5, 1], [-30, 0, 30]);
  const z = useTransform(scrollYProgress, [0, 0.5, 1], [-100, 0, -100]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.1, 0.8]);

  return {
    cardRef,
    rotateX,
    rotateY,
    z,
    scale,
  };
}
