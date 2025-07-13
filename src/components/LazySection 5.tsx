'use client';

import { useEffect, useRef, useState, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LazySectionProps {
  children: ReactNode;
  threshold?: number;
  rootMargin?: string;
  fallback?: ReactNode;
  className?: string;
  animateIn?: boolean;
  onInView?: () => void;
}

export default function LazySection({
  children,
  threshold = 0.1,
  rootMargin = '50px',
  fallback = <div className="h-96 animate-pulse bg-gray-100" />,
  className = '',
  animateIn = true,
  onInView,
}: LazySectionProps) {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isInView) {
          setIsInView(true);
          onInView?.();
          observer.disconnect();
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [isInView, threshold, rootMargin, onInView]);

  return (
    <div ref={ref} className={className}>
      <AnimatePresence mode="wait">
        {!isInView ? (
          <motion.div
            key="fallback"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {fallback}
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={animateIn ? { opacity: 0, y: 20 } : false}
            animate={animateIn ? { opacity: 1, y: 0 } : false}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Hook for manual lazy loading control
export function useLazyLoad(options?: IntersectionObserverInit) {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
        ...options,
      }
    );

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [options]);

  return { ref, isInView };
}

// Utility for lazy loading multiple sections
export function LazyContainer({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      {Array.isArray(children) ? (
        children.map((child, index) => (
          <LazySection key={index} threshold={0.05} rootMargin="100px" animateIn={true}>
            {child}
          </LazySection>
        ))
      ) : (
        <LazySection threshold={0.05} rootMargin="100px" animateIn={true}>
          {children}
        </LazySection>
      )}
    </div>
  );
}
