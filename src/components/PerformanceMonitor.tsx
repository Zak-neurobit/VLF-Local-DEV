'use client';

import { useEffect } from 'react';
import { reportWebVitals, observePerformance } from '@/lib/performance/web-vitals';
import { logger } from '@/lib/logger';

export default function PerformanceMonitor() {
  useEffect(() => {
    // Report Web Vitals
    reportWebVitals(metric => {
      // Log to monitoring service in production
      if (process.env.NODE_ENV === 'production') {
        logger.info('Web Vitals', {
          metric: metric.name,
          value: metric.value,
          rating: metric.rating,
        });
      }
    });

    // Start performance observation
    observePerformance();

    // Monitor resource loading
    if ('PerformanceObserver' in window) {
      const resourceObserver = new PerformanceObserver(list => {
        for (const entry of list.getEntries()) {
          if (entry.duration > 1000) {
            logger.warn('Slow resource detected', {
              name: entry.name,
              duration: entry.duration,
              type: entry.entryType,
            });
          }
        }
      });

      try {
        resourceObserver.observe({ entryTypes: ['resource'] });
      } catch (e) {
        // Resource timing not supported
      }
    }

    // Monitor first input delay
    if ('PerformanceEventTiming' in window) {
      let firstInputDetected = false;

      const inputObserver = new PerformanceObserver(list => {
        if (firstInputDetected) return;

        const entries = list.getEntries();
        if (entries.length > 0) {
          const firstInput = entries[0];
          logger.info('First Input Delay', {
            delay: (firstInput as any).processingStart - firstInput.startTime,
            duration: firstInput.duration,
          });
          firstInputDetected = true;
        }
      });

      try {
        inputObserver.observe({ entryTypes: ['event'], buffered: true });
      } catch (e) {
        // Event timing not supported
      }
    }
  }, []);

  return null;
}
