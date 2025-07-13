'use client';

import { useEffect } from 'react';
import { ensureDOMSafety } from '@/lib/dom/initialize-dom-safety';

/**
 * Client-side component that initializes DOM safety measures
 * This should be placed high in the component tree
 */
export function DOMSafetyInitializer() {
  useEffect(() => {
    // Initialize DOM safety measures
    const cleanup = ensureDOMSafety();
    
    // Log that DOM safety is active
    console.log('DOM safety measures initialized');
    
    // Return cleanup function
    return () => {
      if (cleanup) {
        cleanup();
      }
    };
  }, []);
  
  // This component doesn't render anything
  return null;
}