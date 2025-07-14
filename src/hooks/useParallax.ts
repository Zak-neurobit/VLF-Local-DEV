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
    offset: offset as ['start end', 'end start'],
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

  // Create a fixed set of transform values (maximum 5 layers for hook consistency)
  const maxLayers = Math.min(layers, 5);

  // Layer 1
  const layer1Depth = 1 / maxLayers;
  const layer1Speed = 1 - layer1Depth * 0.8;
  const layer1Y = useTransform(scrollYProgress, [0, 1], [-200 * layer1Speed, 200 * layer1Speed]);
  const layer1Scale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [1 - layer1Depth * 0.2, 1, 1 + layer1Depth * 0.1]
  );
  const layer1Opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);
  const layer1Blur = useTransform(scrollYProgress, [0, 1], [layer1Depth * 2, 0]);

  // Layer 2
  const layer2Depth = 2 / maxLayers;
  const layer2Speed = 1 - layer2Depth * 0.8;
  const layer2Y = useTransform(scrollYProgress, [0, 1], [-200 * layer2Speed, 200 * layer2Speed]);
  const layer2Scale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [1 - layer2Depth * 0.2, 1, 1 + layer2Depth * 0.1]
  );
  const layer2Opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);
  const layer2Blur = useTransform(scrollYProgress, [0, 1], [layer2Depth * 2, 0]);

  // Layer 3
  const layer3Depth = 3 / maxLayers;
  const layer3Speed = 1 - layer3Depth * 0.8;
  const layer3Y = useTransform(scrollYProgress, [0, 1], [-200 * layer3Speed, 200 * layer3Speed]);
  const layer3Scale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [1 - layer3Depth * 0.2, 1, 1 + layer3Depth * 0.1]
  );
  const layer3Opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);
  const layer3Blur = useTransform(scrollYProgress, [0, 1], [layer3Depth * 2, 0]);

  const allLayers = [
    { y: layer1Y, scale: layer1Scale, opacity: layer1Opacity, blur: layer1Blur },
    { y: layer2Y, scale: layer2Scale, opacity: layer2Opacity, blur: layer2Blur },
    { y: layer3Y, scale: layer3Scale, opacity: layer3Opacity, blur: layer3Blur },
  ];

  const layerEffects = allLayers.slice(0, maxLayers);

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
