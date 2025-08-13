'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useDeviceCapabilities } from '@/lib/performance/device-detection';
import dynamic from 'next/dynamic';

// Lazy load Three.js components only when needed
const ThreeScene = dynamic(() => import('./HeroScene'), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 via-black to-primary/10" />
  ),
});

export default function OptimizedHeroScene() {
  const capabilities = useDeviceCapabilities();
  const [shouldRender3D, setShouldRender3D] = useState(false);

  useEffect(() => {
    // Only render 3D on capable devices
    if (!capabilities.isLowEnd && !capabilities.hasReducedMotion && capabilities.supportWebGL) {
      // Delay 3D loading until after initial page load
      const timer = setTimeout(() => {
        setShouldRender3D(true);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [capabilities]);

  // Fallback gradient for low-end devices or reduced motion
  if (capabilities.isLowEnd || capabilities.hasReducedMotion || capabilities.isMobile) {
    return (
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 via-black to-primary/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />
        {/* Simple CSS animation for subtle movement */}
        {!capabilities.hasReducedMotion && (
          <div className="absolute inset-0">
            <div className="absolute h-full w-full bg-gradient-to-r from-transparent via-primary/10 to-transparent animate-shimmer" />
          </div>
        )}
      </div>
    );
  }

  // Progressive enhancement - show gradient first, then load 3D
  return (
    <>
      {/* Base gradient always visible */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 via-black to-primary/10" />

      {/* 3D scene loads on top when ready */}
      {shouldRender3D && (
        <Suspense fallback={null}>
          <ThreeScene />
        </Suspense>
      )}
    </>
  );
}
