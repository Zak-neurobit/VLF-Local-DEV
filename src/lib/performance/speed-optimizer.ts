// Comprehensive speed optimization utilities
import { useEffect, useState } from 'react';

// Network status detection for adaptive loading
export type ConnectionType = '4g' | '3g' | '2g' | 'slow-2g' | 'offline';

export function useNetworkStatus() {
  const [connectionType, setConnectionType] = useState<ConnectionType>('4g');
  const [effectiveType, setEffectiveType] = useState<string>('4g');
  const [saveData, setSaveData] = useState(false);

  useEffect(() => {
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      
      const updateConnectionStatus = () => {
        setEffectiveType(connection.effectiveType || '4g');
        setSaveData(connection.saveData || false);
        
        // Map effective type to our connection types
        switch (connection.effectiveType) {
          case 'slow-2g':
          case '2g':
            setConnectionType('2g');
            break;
          case '3g':
            setConnectionType('3g');
            break;
          case '4g':
          default:
            setConnectionType('4g');
            break;
        }
      };

      updateConnectionStatus();
      connection.addEventListener('change', updateConnectionStatus);
      
      return () => {
        connection.removeEventListener('change', updateConnectionStatus);
      };
    }
  }, []);

  return {
    connectionType,
    effectiveType,
    saveData,
    isSlowNetwork: connectionType === '2g' || connectionType === '3g' || connectionType === 'slow-2g',
    isFastNetwork: connectionType === '4g',
  };
}

// Resource hints manager
export class ResourceHints {
  private static hints = new Set<string>();
  
  static addPreconnect(origin: string) {
    if (this.hints.has(origin)) return;
    
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = origin;
    link.crossOrigin = '';
    document.head.appendChild(link);
    this.hints.add(origin);
  }
  
  static addDnsPrefetch(origin: string) {
    if (this.hints.has(origin)) return;
    
    const link = document.createElement('link');
    link.rel = 'dns-prefetch';
    link.href = origin;
    document.head.appendChild(link);
    this.hints.add(origin);
  }
  
  static preloadResource(href: string, as: string, type?: string) {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = href;
    link.as = as;
    if (type) link.type = type;
    if (as === 'font') link.crossOrigin = '';
    document.head.appendChild(link);
  }
  
  static prefetchRoute(href: string) {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = href;
    document.head.appendChild(link);
  }
}

// Lazy load scripts with facade pattern
export function lazyLoadScript(src: string, attributes?: Record<string, string>): Promise<void> {
  return new Promise((resolve, reject) => {
    // Check if script already exists
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve();
      return;
    }
    
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    
    // Add custom attributes
    if (attributes) {
      Object.entries(attributes).forEach(([key, value]) => {
        script.setAttribute(key, value);
      });
    }
    
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
    
    document.body.appendChild(script);
  });
}

// Critical CSS extraction helper
export function extractCriticalCSS(css: string, viewport: { width: number; height: number }) {
  // This is a placeholder - in production, use a tool like critical or penthouse
  // For now, return CSS that affects above-the-fold content
  return css
    .split('}')
    .filter(rule => {
      // Keep rules that likely affect above-the-fold content
      return rule.includes('body') || 
             rule.includes('header') || 
             rule.includes('nav') || 
             rule.includes('hero') ||
             rule.includes('.above-fold') ||
             rule.includes('#root');
    })
    .join('}') + '}';
}

// Intersection Observer for lazy loading with network awareness
export function createAdaptiveIntersectionObserver(
  callback: IntersectionObserverCallback,
  options?: IntersectionObserverInit
) {
  const { isSlowNetwork } = useNetworkStatus();
  
  // Adjust root margin based on network speed
  const adaptiveOptions: IntersectionObserverInit = {
    ...options,
    rootMargin: isSlowNetwork ? '50px' : '200px', // Load earlier on fast networks
  };
  
  return new IntersectionObserver(callback, adaptiveOptions);
}

// Service Worker registration with update handling
export async function registerServiceWorker() {
  if (!('serviceWorker' in navigator)) {
    console.log('Service Worker not supported');
    return;
  }
  
  try {
    const registration = await navigator.serviceWorker.register('/sw.js', {
      scope: '/',
    });
    
    console.log('Service Worker registered:', registration);
    
    // Handle updates
    registration.addEventListener('updatefound', () => {
      const newWorker = registration.installing;
      if (newWorker) {
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            // New service worker available
            if (confirm('New version available! Reload to update?')) {
              window.location.reload();
            }
          }
        });
      }
    });
    
    return registration;
  } catch (error) {
    console.error('Service Worker registration failed:', error);
  }
}

// Defer non-critical JavaScript
export function deferNonCriticalJS() {
  // Move non-critical inline scripts to defer
  const scripts = document.querySelectorAll('script:not([src]):not([type="application/ld+json"])');
  scripts.forEach(script => {
    const newScript = document.createElement('script');
    newScript.textContent = script.textContent;
    newScript.defer = true;
    script.parentNode?.replaceChild(newScript, script);
  });
}

// Progressive Image Loading
export function progressiveImageLoading(imgElement: HTMLImageElement) {
  const lowQualitySrc = imgElement.dataset.lowSrc;
  const highQualitySrc = imgElement.dataset.src || imgElement.src;
  
  if (!lowQualitySrc) return;
  
  // Load low quality first
  const lowQualityImg = new Image();
  lowQualityImg.src = lowQualitySrc;
  lowQualityImg.onload = () => {
    imgElement.src = lowQualitySrc;
    imgElement.classList.add('loaded-low');
    
    // Load high quality
    const highQualityImg = new Image();
    highQualityImg.src = highQualitySrc;
    highQualityImg.onload = () => {
      imgElement.src = highQualitySrc;
      imgElement.classList.remove('loaded-low');
      imgElement.classList.add('loaded-high');
    };
  };
}

// Bundle size monitoring
export function monitorBundleSize() {
  if (typeof window === 'undefined') return;
  
  // Get all script tags
  const scripts = Array.from(document.getElementsByTagName('script'));
  const totalSize = scripts.reduce((acc, script) => {
    if (script.src) {
      // This is approximate - in production, use actual file sizes
      return acc + (script.src.length * 10); // Rough estimate
    }
    return acc + (script.textContent?.length || 0);
  }, 0);
  
  console.log(`Total JavaScript size: ~${(totalSize / 1024).toFixed(2)}KB`);
  
  // Warn if bundle is too large
  if (totalSize > 500 * 1024) { // 500KB
    console.warn('Bundle size exceeds recommended limit!');
  }
}

// Route prefetching based on user behavior
export class RoutePrefetcher {
  private static prefetchedRoutes = new Set<string>();
  private static observer: IntersectionObserver;
  
  static init() {
    if (this.observer) return;
    
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const link = entry.target as HTMLAnchorElement;
            const href = link.href;
            
            if (!this.prefetchedRoutes.has(href) && this.shouldPrefetch(href)) {
              ResourceHints.prefetchRoute(href);
              this.prefetchedRoutes.add(href);
            }
          }
        });
      },
      { rootMargin: '50px' }
    );
    
    // Observe all internal links
    document.querySelectorAll('a[href^="/"]').forEach(link => {
      this.observer.observe(link);
    });
  }
  
  private static shouldPrefetch(href: string): boolean {
    // Don't prefetch external links, downloads, or already visited
    return !href.includes('http') && 
           !href.includes('.pdf') && 
           !href.includes('#') &&
           !this.prefetchedRoutes.has(href);
  }
}

// Initialize speed optimizations
export function initializeSpeedOptimizations() {
  // Add critical resource hints
  ResourceHints.addPreconnect('https://fonts.googleapis.com');
  ResourceHints.addPreconnect('https://fonts.gstatic.com');
  ResourceHints.addDnsPrefetch('https://www.google-analytics.com');
  ResourceHints.addDnsPrefetch('https://www.googletagmanager.com');
  
  // Preload critical fonts
  ResourceHints.preloadResource('/fonts/inter-var.woff2', 'font', 'font/woff2');
  
  // Register service worker
  if (process.env.NODE_ENV === 'production') {
    registerServiceWorker();
  }
  
  // Initialize route prefetching
  if (typeof window !== 'undefined') {
    window.addEventListener('load', () => {
      RoutePrefetcher.init();
      deferNonCriticalJS();
      monitorBundleSize();
    });
  }
}