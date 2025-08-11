'use client';

import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { useLanguage } from '@/hooks/useLanguage';

// Dynamically import the VirtualAssistant component with no SSR
const ModernVirtualAssistant = dynamic(
  () => import('./ModernVirtualAssistant').then(mod => ({ default: mod.ModernVirtualAssistant })),
  { 
    ssr: false,
    loading: () => null // Silent loading
  }
);

export function VirtualAssistantSSRSafe() {
  const { language } = useLanguage();
  
  // Only render on client side
  if (typeof window === 'undefined') {
    return null;
  }
  
  return (
    <Suspense fallback={null}>
      <ModernVirtualAssistant language={language} />
    </Suspense>
  );
}