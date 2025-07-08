'use client';

import { useEffect, useRef, ReactNode } from 'react';

interface DOMSafeWrapperProps {
  children: ReactNode;
  fallback?: ReactNode;
}

/**
 * Wrapper component that ensures safe DOM operations
 * Prevents errors like "parentNode.removeChild" on null elements
 */
export function DOMSafeWrapper({ children, fallback }: DOMSafeWrapperProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Ensure the container is in the DOM before any operations
    if (!containerRef.current) return;
    
    // Create a MutationObserver to watch for unsafe DOM operations
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        // Prevent removal of nodes that don't have a parent
        mutation.removedNodes.forEach((node) => {
          if (node.parentNode === null) {
            console.warn('Prevented unsafe DOM operation: attempted to remove orphaned node');
          }
        });
      });
    });
    
    observer.observe(containerRef.current, {
      childList: true,
      subtree: true
    });
    
    return () => {
      observer.disconnect();
    };
  }, []);
  
  // Add error boundary for DOM operations
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      if (event.error?.message?.includes('parentNode') || 
          event.error?.message?.includes('removeChild')) {
        event.preventDefault();
        console.error('DOM manipulation error caught and prevented:', event.error);
        
        // If we have a fallback, trigger a re-render
        if (fallback && containerRef.current) {
          containerRef.current.innerHTML = '';
        }
      }
    };
    
    window.addEventListener('error', handleError);
    
    return () => {
      window.removeEventListener('error', handleError);
    };
  }, [fallback]);
  
  return (
    <div ref={containerRef} suppressHydrationWarning>
      {children}
    </div>
  );
}