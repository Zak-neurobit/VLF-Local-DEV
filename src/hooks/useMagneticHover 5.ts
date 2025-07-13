'use client';

import { useRef, useEffect, useState } from 'react';
import { useMotionValue, useSpring, useTransform } from 'framer-motion';

interface MagneticHoverOptions {
  strength?: number;
  radius?: number;
  damping?: number;
  stiffness?: number;
  mass?: number;
}

interface MagneticHoverReturn {
  ref: React.RefObject<HTMLElement>;
  x: any;
  y: any;
  scale: any;
  isHovered: boolean;
}

export function useMagneticHover({
  strength = 0.5,
  radius = 200,
  damping = 20,
  stiffness = 300,
  mass = 1,
}: MagneticHoverOptions = {}): MagneticHoverReturn {
  const ref = useRef<HTMLElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping, stiffness, mass };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  const scale = useTransform([x, y], ([latestX, latestY]: number[]) => {
    const distance = Math.sqrt(latestX * latestX + latestY * latestY);
    return 1 + (distance / radius) * 0.1;
  });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

      if (distance < radius) {
        const pullX = (distanceX / radius) * strength * 50;
        const pullY = (distanceY / radius) * strength * 50;

        mouseX.set(pullX);
        mouseY.set(pullY);
        x.set(pullX);
        y.set(pullY);
      } else {
        mouseX.set(0);
        mouseY.set(0);
        x.set(0);
        y.set(0);
      }
    };

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => {
      setIsHovered(false);
      mouseX.set(0);
      mouseY.set(0);
      x.set(0);
      y.set(0);
    };

    // Add global mouse move listener for magnetic effect
    window.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength, radius, mouseX, mouseY, x, y]);

  return {
    ref,
    x,
    y,
    scale,
    isHovered,
  };
}

// Advanced magnetic cursor
export function useMagneticCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', moveCursor);
    document.body.addEventListener('mouseenter', handleMouseEnter);
    document.body.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [cursorX, cursorY]);

  return {
    cursorRef,
    x: cursorXSpring,
    y: cursorYSpring,
    isVisible,
  };
}
