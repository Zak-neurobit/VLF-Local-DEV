import { logger } from '@/lib/pino-logger';

/**
 * Initialize global DOM safety measures
 * This should be called early in the application lifecycle
 */

export function initializeDOMSafety(): (() => void) | undefined {
  if (typeof window === 'undefined') return;

  // Global error handler for DOM errors
  const originalError = window.onerror;
  window.onerror = function (message, source, lineno, colno, error) {
    const errorMessage = error?.message || String(message);

    // Check for DOM-related errors
    const isDOMError =
      errorMessage.includes('null is not an object') ||
      errorMessage.includes('Cannot read properties of null') ||
      errorMessage.includes('Cannot read property') ||
      errorMessage.includes('parentNode') ||
      errorMessage.includes('removeChild') ||
      errorMessage.includes('appendChild') ||
      errorMessage.includes('insertBefore') ||
      errorMessage.includes('replaceChild');

    if (isDOMError) {
      logger.error('DOM Error intercepted:', {
        message: errorMessage,
        source,
        line: lineno,
        column: colno,
        stack: error?.stack,
      });

      // Prevent the error from propagating
      return true;
    }

    // Call original error handler if it exists
    if (originalError) {
      return originalError.call(window, message, source, lineno, colno, error);
    }

    return false;
  };

  // Add unhandled rejection handler for Promise-based DOM errors
  window.addEventListener('unhandledrejection', event => {
    const reason = event.reason;
    if (reason instanceof Error) {
      const errorMessage = reason.message;

      if (
        errorMessage.includes('null is not an object') ||
        errorMessage.includes('Cannot read properties of null') ||
        errorMessage.includes('parentNode') ||
        errorMessage.includes('removeChild')
      ) {
        logger.error('Unhandled DOM Promise rejection:', reason);
        event.preventDefault();
      }
    }
  });

  // Monitor DOM mutations for orphaned nodes
  if (typeof MutationObserver !== 'undefined') {
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        // Check for nodes being removed
        mutation.removedNodes.forEach(node => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as Element;
            // Mark the element to prevent future operations
            element.setAttribute('data-dom-removed', 'true');
          }
        });
      });
    });

    // Observe the entire document
    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
    });
  }

  // Patch console.error to catch DOM errors in third-party libraries
  const originalConsoleError = console.error;
  console.error = function (...args) {
    const firstArg = args[0];
    if (typeof firstArg === 'string') {
      const isDOMError =
        firstArg.includes('null is not an object') ||
        firstArg.includes('Cannot read properties of null') ||
        firstArg.includes('parentNode') ||
        firstArg.includes('removeChild');

      if (isDOMError) {
        logger.warn('DOM error in console.error intercepted:', ...args);
        // Still log it but as a warning
        return;
      }
    }

    // Call original console.error
    originalConsoleError.apply(console, args);
  };

  // Add safety checks to native DOM methods
  const safetyPatches = {
    removeChild: {
      original: Node.prototype.removeChild,
      patch: function (this: Node, child: Node) {
        if (!child || !child.parentNode || child.parentNode !== this) {
          logger.warn('Prevented unsafe DOM operation: attempted to remove orphaned node');
          return child;
        }
        return safetyPatches.removeChild.original.call(this, child);
      },
    },
    appendChild: {
      original: Node.prototype.appendChild,
      patch: function (this: Node, child: Node) {
        if (!child || !this) {
          logger.warn('Unsafe appendChild prevented:', { parent: this, child });
          return child;
        }
        return safetyPatches.appendChild.original.call(this, child);
      },
    },
    insertBefore: {
      original: Node.prototype.insertBefore,
      patch: function (this: Node, newNode: Node, referenceNode: Node | null) {
        if (!newNode || !this) {
          logger.warn('Unsafe insertBefore prevented:', { parent: this, newNode, referenceNode });
          return newNode;
        }
        return safetyPatches.insertBefore.original.call(this, newNode, referenceNode);
      },
    },
    replaceChild: {
      original: Node.prototype.replaceChild,
      patch: function (this: Node, newChild: Node, oldChild: Node) {
        if (!newChild || !oldChild || !oldChild.parentNode || oldChild.parentNode !== this) {
          logger.warn('Unsafe replaceChild prevented:', { parent: this, newChild, oldChild });
          return oldChild;
        }
        return safetyPatches.replaceChild.original.call(this, newChild, oldChild);
      },
    },
    remove: {
      original: Element.prototype.remove,
      patch: function (this: Element) {
        if (!this.parentNode) {
          logger.warn('Prevented unsafe DOM operation: attempted to remove orphaned node');
          return;
        }
        // Check if element was already marked as removed
        if (this.hasAttribute('data-dom-removed')) {
          logger.warn('Prevented unsafe DOM operation: attempted to remove orphaned node');
          return;
        }
        return safetyPatches.remove.original.call(this);
      },
    },
  };

  // Apply patches
  Node.prototype.removeChild = safetyPatches.removeChild.patch as typeof Node.prototype.removeChild;
  Node.prototype.appendChild = safetyPatches.appendChild.patch as typeof Node.prototype.appendChild;
  Node.prototype.insertBefore = safetyPatches.insertBefore.patch as typeof Node.prototype.insertBefore;
  Node.prototype.replaceChild = safetyPatches.replaceChild.patch as typeof Node.prototype.replaceChild;
  Element.prototype.remove = safetyPatches.remove.patch;

  // Return cleanup function
  return () => {
    // Restore original methods
    Node.prototype.removeChild = safetyPatches.removeChild.original;
    Node.prototype.appendChild = safetyPatches.appendChild.original;
    Node.prototype.insertBefore = safetyPatches.insertBefore.original;
    Node.prototype.replaceChild = safetyPatches.replaceChild.original;
    Element.prototype.remove = safetyPatches.remove.original;

    // Restore console.error
    console.error = originalConsoleError;
  };
}

/**
 * Check if DOM safety is already initialized
 */
let isInitialized = false;

export function ensureDOMSafety(): (() => void) | undefined {
  if (!isInitialized && typeof window !== 'undefined') {
    isInitialized = true;
    return initializeDOMSafety();
  }
  return undefined;
}
