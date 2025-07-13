'use client';

import { useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { useDeviceCapabilities } from '@/lib/performance/device-detection';

interface ScrollRevealOptions {
  threshold?: number;
  delay?: number;
  duration?: number;
  distance?: string;
  origin?: 'bottom' | 'top' | 'left' | 'right';
  scale?: number;
  reset?: boolean;
  easing?: string;
  mobile?: boolean;
}

interface ScrollRevealReturn {
  ref: React.RefObject<HTMLElement>;
  isRevealed: boolean;
  controls: {
    opacity: number;
    transform: string;
    transition: string;
  };
}

export function useScrollReveal({
  threshold = 0.3,
  delay = 0,
  duration = 600,
  distance = '30px',
  origin = 'bottom',
  scale = 1,
  reset = false,
  easing = 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  mobile = true,
}: ScrollRevealOptions = {}): ScrollRevealReturn {
  const ref = useRef<HTMLElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const capabilities = useDeviceCapabilities();
  const isInView = useInView(ref, {
    once: !reset,
    amount: threshold,
  });

  // Disable on mobile if requested
  const shouldAnimate = mobile || !capabilities.isMobile;

  useEffect(() => {
    if (isInView && shouldAnimate) {
      const timer = setTimeout(() => {
        setIsRevealed(true);
      }, delay);
      return () => clearTimeout(timer);
    } else if (!isInView && reset) {
      setIsRevealed(false);
    }
  }, [isInView, delay, reset, shouldAnimate]);

  // Calculate initial transform based on origin
  const getInitialTransform = () => {
    const transforms = [];

    switch (origin) {
      case 'bottom':
        transforms.push(`translateY(${distance})`);
        break;
      case 'top':
        transforms.push(`translateY(-${distance})`);
        break;
      case 'left':
        transforms.push(`translateX(-${distance})`);
        break;
      case 'right':
        transforms.push(`translateX(${distance})`);
        break;
    }

    if (scale !== 1) {
      transforms.push(`scale(${scale})`);
    }

    return transforms.join(' ');
  };

  const controls = {
    opacity: isRevealed ? 1 : 0,
    transform: isRevealed ? 'none' : getInitialTransform(),
    transition: `all ${duration}ms ${easing}`,
  };

  return {
    ref,
    isRevealed,
    controls,
  };
}

// Cascade reveal for lists
export function useCascadeReveal(itemCount: number, baseDelay: number = 100) {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });
  const [revealedItems, setRevealedItems] = useState<boolean[]>(new Array(itemCount).fill(false));

  useEffect(() => {
    if (isInView) {
      revealedItems.forEach((_, index) => {
        setTimeout(() => {
          setRevealedItems(prev => {
            const next = [...prev];
            next[index] = true;
            return next;
          });
        }, index * baseDelay);
      });
    }
  }, [isInView, itemCount, baseDelay]);

  return {
    containerRef,
    revealedItems,
    getItemProps: (index: number) => ({
      style: {
        opacity: revealedItems[index] ? 1 : 0,
        transform: revealedItems[index] ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 600ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },
    }),
  };
}

// Text reveal animation (letter by letter)
export function useTextReveal(text: string, speed: number = 50) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true });
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    if (isInView) {
      let currentIndex = 0;
      const interval = setInterval(() => {
        if (currentIndex <= text.length) {
          setDisplayText(text.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(interval);
        }
      }, speed);

      return () => clearInterval(interval);
    }
  }, [isInView, text, speed]);

  return {
    ref,
    displayText,
  };
}
