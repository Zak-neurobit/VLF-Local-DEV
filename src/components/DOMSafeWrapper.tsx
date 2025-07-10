'use client';

import { useEffect, useRef, ReactNode, useState } from 'react';

interface DOMSafeWrapperProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error) => void;
}

/**
 * Wrapper component that ensures safe DOM operations
 * Prevents errors like "parentNode.removeChild" on null elements
 * Also handles hydration mismatches and other DOM-related errors
 */
export function DOMSafeWrapper({ children, fallback, onError }: DOMSafeWrapperProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasError, setHasError] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  
  // Mark component as hydrated
  useEffect(() => {
    setIsHydrated(true);
  }, []);
  
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
      const errorMessage = event.error?.message || event.message || '';
      
      // Check for DOM-related errors
      const isDOMError = errorMessage.includes('parentNode') || 
                        errorMessage.includes('removeChild') ||
                        errorMessage.includes('appendChild') ||
                        errorMessage.includes('insertBefore') ||
                        errorMessage.includes('replaceChild') ||
                        errorMessage.includes('Cannot read properties of null') ||
                        errorMessage.includes('Cannot read property') ||
                        errorMessage.includes('null is not an object');
      
      if (isDOMError) {
        event.preventDefault();
        console.error('DOM manipulation error caught and prevented:', event.error || event.message);
        
        // Call error handler if provided
        if (onError) {
          onError(new Error(errorMessage));
        }
        
        // Set error state to show fallback
        setHasError(true);
      }
    };
    
    window.addEventListener('error', handleError);
    
    return () => {
      window.removeEventListener('error', handleError);
    };
  }, [fallback, onError]);
  
  // Override native DOM methods to add safety checks
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Store original methods
    const originalRemoveChild = Node.prototype.removeChild;
    const originalAppendChild = Node.prototype.appendChild;
    const originalInsertBefore = Node.prototype.insertBefore;
    const originalReplaceChild = Node.prototype.replaceChild;
    const originalRemove = Element.prototype.remove;
    
    // Override removeChild
    Node.prototype.removeChild = function(child: Node) {
      // Skip safety checks for react-hot-toast elements
      if (child && child instanceof Element) {
        const element = child as Element;
        if (element.classList?.contains('react-hot-toast-notification') ||
            element.closest?.('[data-hot-toast-id]') ||
            element.id?.includes('_rht_')) {
          return originalRemoveChild.call(this, child);
        }
      }
      
      if (!child || !child.parentNode || child.parentNode !== this) {
        console.warn('Prevented unsafe removeChild operation');
        return child;
      }
      return originalRemoveChild.call(this, child);
    };
    
    // Override appendChild
    Node.prototype.appendChild = function(child: Node) {
      if (!child || !this) {
        console.warn('Prevented unsafe appendChild operation');
        return child;
      }
      return originalAppendChild.call(this, child);
    };
    
    // Override insertBefore
    Node.prototype.insertBefore = function(newNode: Node, referenceNode: Node | null) {
      if (!newNode || !this) {
        console.warn('Prevented unsafe insertBefore operation');
        return newNode;
      }
      return originalInsertBefore.call(this, newNode, referenceNode);
    };
    
    // Override replaceChild
    Node.prototype.replaceChild = function(newChild: Node, oldChild: Node) {
      if (!newChild || !oldChild || !oldChild.parentNode || oldChild.parentNode !== this) {
        console.warn('Prevented unsafe replaceChild operation');
        return oldChild;
      }
      return originalReplaceChild.call(this, newChild, oldChild);
    };
    
    // Override remove
    Element.prototype.remove = function() {
      // Skip safety checks for react-hot-toast elements
      if (this.classList?.contains('react-hot-toast-notification') ||
          this.closest?.('[data-hot-toast-id]') ||
          this.id?.includes('_rht_')) {
        return originalRemove.call(this);
      }
      
      if (!this.parentNode) {
        console.warn('Prevented unsafe remove operation on orphaned element');
        return;
      }
      return originalRemove.call(this);
    };
    
    // Cleanup: restore original methods
    return () => {
      Node.prototype.removeChild = originalRemoveChild;
      Node.prototype.appendChild = originalAppendChild;
      Node.prototype.insertBefore = originalInsertBefore;
      Node.prototype.replaceChild = originalReplaceChild;
      Element.prototype.remove = originalRemove;
    };
  }, []);
  
  // Show fallback if there's an error
  if (hasError && fallback) {
    return <div ref={containerRef}>{fallback}</div>;
  }
  
  return (
    <div ref={containerRef} suppressHydrationWarning>
      {children}
    </div>
  );
}