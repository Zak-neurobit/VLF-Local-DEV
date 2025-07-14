'use client';

import { logger } from '@/lib/logger';

export interface PerformanceMetrics {
  fcp?: number; // First Contentful Paint
  lcp?: number; // Largest Contentful Paint
  fid?: number; // First Input Delay
  cls?: number; // Cumulative Layout Shift
  ttfb?: number; // Time to First Byte
  domInteractive?: number;
  domComplete?: number;
  loadEventEnd?: number;
  memoryUsage?: number;
  jsHeapSize?: number;
  totalJSHeapSize?: number;
  usedJSHeapSize?: number;
}

export interface ResourceTiming {
  name: string;
  startTime: number;
  duration: number;
  transferSize?: number;
  decodedBodySize?: number;
  encodedBodySize?: number;
  type: string;
}

class EnhancedPerformanceMonitor {
  private metrics: PerformanceMetrics = {};
  private resourceTimings: ResourceTiming[] = [];
  private observers: PerformanceObserver[] = [];
  private startTime: number;

  constructor() {
    this.startTime = performance.now();
    this.initializeObservers();
  }

  private initializeObservers() {
    // Web Vitals Observer
    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      this.setupWebVitalsObserver();
      this.setupResourceObserver();
      this.setupNavigationObserver();
      this.setupMemoryObserver();
    }
  }

  private setupWebVitalsObserver() {
    try {
      // Paint timing (FCP, LCP)
      const paintObserver = new PerformanceObserver(list => {
        for (const entry of list.getEntries()) {
          if (entry.name === 'first-contentful-paint') {
            this.metrics.fcp = entry.startTime;
          }
        }
      });
      paintObserver.observe({ entryTypes: ['paint'] });
      this.observers.push(paintObserver);

      // LCP Observer
      const lcpObserver = new PerformanceObserver(list => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        this.metrics.lcp = lastEntry.startTime;
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
      this.observers.push(lcpObserver);

      // FID Observer
      const fidObserver = new PerformanceObserver(list => {
        for (const entry of list.getEntries()) {
          if (entry.name === 'first-input') {
            this.metrics.fid = (entry as unknown).processingStart - entry.startTime;
          }
        }
      });
      fidObserver.observe({ entryTypes: ['first-input'] });
      this.observers.push(fidObserver);

      // CLS Observer
      const clsObserver = new PerformanceObserver(list => {
        let clsValue = 0;
        for (const entry of list.getEntries()) {
          if (!(entry as unknown).hadRecentInput) {
            clsValue += (entry as unknown).value;
          }
        }
        this.metrics.cls = clsValue;
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });
      this.observers.push(clsObserver);
    } catch (error) {
      logger.warn('Web Vitals observer setup failed', { error });
    }
  }

  private setupResourceObserver() {
    try {
      const resourceObserver = new PerformanceObserver(list => {
        for (const entry of list.getEntries()) {
          const resource = entry as PerformanceResourceTiming;

          this.resourceTimings.push({
            name: resource.name,
            startTime: resource.startTime,
            duration: resource.duration,
            transferSize: resource.transferSize,
            decodedBodySize: resource.decodedBodySize,
            encodedBodySize: resource.encodedBodySize,
            type: this.getResourceType(resource.name),
          });

          // Alert for slow resources
          if (resource.duration > 1000) {
            logger.warn('Slow resource detected', {
              name: resource.name,
              duration: resource.duration,
              size: resource.transferSize,
            });
          }
        }
      });
      resourceObserver.observe({ entryTypes: ['resource'] });
      this.observers.push(resourceObserver);
    } catch (error) {
      logger.warn('Resource observer setup failed', { error });
    }
  }

  private setupNavigationObserver() {
    try {
      const navigationObserver = new PerformanceObserver(list => {
        for (const entry of list.getEntries()) {
          const nav = entry as PerformanceNavigationTiming;
          this.metrics.ttfb = nav.responseStart - nav.requestStart;
          this.metrics.domInteractive = nav.domInteractive;
          this.metrics.domComplete = nav.domComplete;
          this.metrics.loadEventEnd = nav.loadEventEnd;
        }
      });
      navigationObserver.observe({ entryTypes: ['navigation'] });
      this.observers.push(navigationObserver);
    } catch (error) {
      logger.warn('Navigation observer setup failed', { error });
    }
  }

  private setupMemoryObserver() {
    // Memory usage monitoring
    const checkMemory = () => {
      if ('memory' in performance) {
        const memory = (performance as unknown).memory;
        this.metrics.jsHeapSize = memory.jsHeapSizeLimit;
        this.metrics.totalJSHeapSize = memory.totalJSHeapSize;
        this.metrics.usedJSHeapSize = memory.usedJSHeapSize;
        this.metrics.memoryUsage = (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100;
      }
    };

    checkMemory();
    const memoryInterval = setInterval(checkMemory, 30000); // Check every 30 seconds

    // Store interval ID for cleanup
    (this as unknown).memoryInterval = memoryInterval;
  }

  private getResourceType(url: string): string {
    if (url.includes('.css')) return 'css';
    if (url.includes('.js')) return 'js';
    if (url.match(/\.(jpg|jpeg|png|gif|webp|svg|avif)$/i)) return 'image';
    if (url.match(/\.(woff|woff2|ttf|otf)$/i)) return 'font';
    if (url.includes('api/')) return 'api';
    return 'other';
  }

  public getMetrics(): PerformanceMetrics {
    return { ...this.metrics };
  }

  public getResourceTimings(): ResourceTiming[] {
    return [...this.resourceTimings];
  }

  public getPerformanceScore(): number {
    const { fcp, lcp, fid, cls, ttfb } = this.metrics;

    let score = 100;

    // FCP scoring (good < 1800ms)
    if (fcp && fcp > 1800) score -= 10;
    if (fcp && fcp > 3000) score -= 10;

    // LCP scoring (good < 2500ms)
    if (lcp && lcp > 2500) score -= 15;
    if (lcp && lcp > 4000) score -= 15;

    // FID scoring (good < 100ms)
    if (fid && fid > 100) score -= 10;
    if (fid && fid > 300) score -= 10;

    // CLS scoring (good < 0.1)
    if (cls && cls > 0.1) score -= 15;
    if (cls && cls > 0.25) score -= 15;

    // TTFB scoring (good < 600ms)
    if (ttfb && ttfb > 600) score -= 10;
    if (ttfb && ttfb > 1000) score -= 10;

    return Math.max(0, score);
  }

  public generateReport(): string {
    const score = this.getPerformanceScore();
    const { fcp, lcp, fid, cls, ttfb } = this.metrics;

    return `
Performance Report:
- Score: ${score}/100
- First Contentful Paint: ${fcp ? `${fcp.toFixed(0)}ms` : 'N/A'}
- Largest Contentful Paint: ${lcp ? `${lcp.toFixed(0)}ms` : 'N/A'}
- First Input Delay: ${fid ? `${fid.toFixed(0)}ms` : 'N/A'}
- Cumulative Layout Shift: ${cls ? cls.toFixed(3) : 'N/A'}
- Time to First Byte: ${ttfb ? `${ttfb.toFixed(0)}ms` : 'N/A'}
- Memory Usage: ${this.metrics.memoryUsage ? `${this.metrics.memoryUsage.toFixed(1)}%` : 'N/A'}
    `.trim();
  }

  public logMetrics() {
    logger.info('Performance Metrics', {
      ...this.metrics,
      score: this.getPerformanceScore(),
      resourceCount: this.resourceTimings.length,
    });
  }

  public cleanup() {
    this.observers.forEach(observer => {
      try {
        observer.disconnect();
      } catch (error) {
        logger.warn('Failed to disconnect observer', { error });
      }
    });

    if ((this as unknown).memoryInterval) {
      clearInterval((this as unknown).memoryInterval);
    }
  }

  // Real-time monitoring
  public startRealTimeMonitoring() {
    const interval = setInterval(() => {
      this.logMetrics();

      // Alert for performance issues
      const score = this.getPerformanceScore();
      if (score < 70) {
        logger.warn('Performance degradation detected', {
          score,
          report: this.generateReport(),
        });
      }
    }, 60000); // Every minute

    return () => clearInterval(interval);
  }
}

export default EnhancedPerformanceMonitor;
