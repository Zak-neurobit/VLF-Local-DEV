/**
 * Service Level Indicator (SLI) Tracker
 * Tracks p99 latency and business SLIs for performance monitoring
 */

import { metricsCollector } from '../telemetry/metrics';

// SLI Thresholds (in milliseconds)
export const SLI_THRESHOLDS = {
  // Critical p99 latency requirement
  P99_LATENCY_THRESHOLD: 50,
  
  // API endpoint thresholds
  API_RESPONSE_TIME: {
    CRITICAL: 50,    // p99 must be under 50ms
    WARNING: 30,     // p95 should be under 30ms
    GOOD: 20,        // p90 should be under 20ms
  },
  
  // Database query thresholds
  DATABASE_QUERY_TIME: {
    CRITICAL: 25,    // p99 must be under 25ms
    WARNING: 15,     // p95 should be under 15ms
    GOOD: 10,        // p90 should be under 10ms
  },
  
  // Business process thresholds
  LEAD_CAPTURE_TIME: {
    CRITICAL: 100,   // p99 must be under 100ms
    WARNING: 75,     // p95 should be under 75ms
    GOOD: 50,        // p90 should be under 50ms
  },
  
  PAYMENT_PROCESSING_TIME: {
    CRITICAL: 200,   // p99 must be under 200ms
    WARNING: 150,    // p95 should be under 150ms
    GOOD: 100,       // p90 should be under 100ms
  },
  
  // Web Vitals SLIs
  LARGEST_CONTENTFUL_PAINT: {
    GOOD: 2500,
    POOR: 4000,
  },
  
  FIRST_INPUT_DELAY: {
    GOOD: 100,
    POOR: 300,
  },
  
  CUMULATIVE_LAYOUT_SHIFT: {
    GOOD: 0.1,
    POOR: 0.25,
  },
} as const;

interface PercentileData {
  p50: number;
  p90: number;
  p95: number;
  p99: number;
  p99_9: number;
  count: number;
  sum: number;
  min: number;
  max: number;
}

interface SLIViolation {
  metric: string;
  endpoint?: string;
  threshold: number;
  actual: number;
  severity: 'critical' | 'warning';
  timestamp: Date;
  attributes: Record<string, string>;
}

interface BusinessSLI {
  name: string;
  value: number;
  target: number;
  status: 'good' | 'warning' | 'critical';
  timestamp: Date;
}

class SLITracker {
  private latencyData: Map<string, number[]> = new Map();
  private businessMetrics: Map<string, BusinessSLI> = new Map();
  private violations: SLIViolation[] = [];
  private lastCleanup = Date.now();
  private readonly CLEANUP_INTERVAL = 300000; // 5 minutes
  private readonly DATA_RETENTION = 3600000; // 1 hour

  constructor() {
    this.startPeriodicCleanup();
  }

  /**
   * Track API endpoint latency for p99 monitoring
   */
  public trackApiLatency(
    endpoint: string,
    duration: number,
    attributes: Record<string, string> = {}
  ): void {
    const key = `api:${endpoint}`;
    this.addLatencyData(key, duration);
    
    // Record to OpenTelemetry
    metricsCollector.recordApiEndpoint(duration, {
      endpoint,
      ...attributes,
    });

    // Check for p99 violations
    this.checkLatencyViolation(key, endpoint, duration, attributes);
  }

  /**
   * Track database query performance
   */
  public trackDatabaseQuery(
    query: string,
    duration: number,
    attributes: Record<string, string> = {}
  ): void {
    const key = `db:${query}`;
    this.addLatencyData(key, duration);
    
    // Record to OpenTelemetry
    metricsCollector.recordDatabaseQuery(duration, {
      query,
      ...attributes,
    });

    // Check for violations
    this.checkDatabaseViolation(key, query, duration, attributes);
  }

  /**
   * Track business process latency (lead capture, payment processing)
   */
  public trackBusinessProcess(
    processName: string,
    duration: number,
    success: boolean,
    attributes: Record<string, string> = {}
  ): void {
    const key = `business:${processName}`;
    this.addLatencyData(key, duration);
    
    // Record specific business metrics
    switch (processName) {
      case 'lead_capture':
        this.updateBusinessSLI('lead_capture_time', duration, SLI_THRESHOLDS.LEAD_CAPTURE_TIME.CRITICAL);
        if (success) {
          metricsCollector.recordLeadCapture(attributes.source || 'unknown', attributes.quality || 'unknown');
        }
        break;
      
      case 'payment_processing':
        this.updateBusinessSLI('payment_processing_time', duration, SLI_THRESHOLDS.PAYMENT_PROCESSING_TIME.CRITICAL);
        if (success && attributes.amount) {
          metricsCollector.recordPayment(
            parseFloat(attributes.amount),
            success,
            attributes.payment_method || 'unknown'
          );
        }
        break;
    }

    // Check for business process violations
    this.checkBusinessProcessViolation(processName, duration, attributes);
  }

  /**
   * Track Web Vitals for user experience SLIs
   */
  public trackWebVitals(metric: {
    name: string;
    value: number;
    rating: 'good' | 'needs-improvement' | 'poor';
  }): void {
    // Record to OpenTelemetry
    metricsCollector.recordWebVitals(metric);

    // Update business SLI
    this.updateBusinessSLI(`web_vitals_${metric.name.toLowerCase()}`, metric.value, this.getWebVitalThreshold(metric.name));

    // Check for Web Vitals violations
    if (metric.rating === 'poor') {
      this.violations.push({
        metric: `web_vitals_${metric.name}`,
        threshold: this.getWebVitalThreshold(metric.name),
        actual: metric.value,
        severity: 'critical',
        timestamp: new Date(),
        attributes: { rating: metric.rating },
      });
    }
  }

  /**
   * Get current p99 latency for a specific metric
   */
  public getP99Latency(metricKey: string): number | null {
    const data = this.latencyData.get(metricKey);
    if (!data || data.length === 0) return null;

    return this.calculatePercentile(data, 99);
  }

  /**
   * Get percentile data for a metric
   */
  public getPercentileData(metricKey: string): PercentileData | null {
    const data = this.latencyData.get(metricKey);
    if (!data || data.length === 0) return null;

    const sorted = [...data].sort((a, b) => a - b);
    
    return {
      p50: this.calculatePercentile(sorted, 50),
      p90: this.calculatePercentile(sorted, 90),
      p95: this.calculatePercentile(sorted, 95),
      p99: this.calculatePercentile(sorted, 99),
      p99_9: this.calculatePercentile(sorted, 99.9),
      count: data.length,
      sum: data.reduce((a, b) => a + b, 0),
      min: Math.min(...data),
      max: Math.max(...data),
    };
  }

  /**
   * Get all SLI violations in the last period
   */
  public getViolations(since?: Date): SLIViolation[] {
    const cutoff = since || new Date(Date.now() - this.DATA_RETENTION);
    return this.violations.filter(v => v.timestamp >= cutoff);
  }

  /**
   * Get current business SLI status
   */
  public getBusinessSLIs(): BusinessSLI[] {
    return Array.from(this.businessMetrics.values());
  }

  /**
   * Get SLI health score (0-100)
   */
  public getHealthScore(): number {
    const slis = this.getBusinessSLIs();
    if (slis.length === 0) return 100;

    const weights = {
      good: 1.0,
      warning: 0.7,
      critical: 0.3,
    };

    const totalWeight = slis.reduce((sum, sli) => sum + weights[sli.status], 0);
    const maxWeight = slis.length;

    return Math.round((totalWeight / maxWeight) * 100);
  }

  /**
   * Check if p99 latency requirement is being met
   */
  public isP99RequirementMet(): {
    met: boolean;
    violations: { endpoint: string; p99: number; threshold: number }[];
  } {
    const violations: { endpoint: string; p99: number; threshold: number }[] = [];

    for (const [key, data] of this.latencyData.entries()) {
      if (key.startsWith('api:')) {
        const endpoint = key.substring(4);
        const p99 = this.calculatePercentile(data, 99);
        
        if (p99 > SLI_THRESHOLDS.P99_LATENCY_THRESHOLD) {
          violations.push({
            endpoint,
            p99,
            threshold: SLI_THRESHOLDS.P99_LATENCY_THRESHOLD,
          });
        }
      }
    }

    return {
      met: violations.length === 0,
      violations,
    };
  }

  // Private methods

  private addLatencyData(key: string, value: number): void {
    if (!this.latencyData.has(key)) {
      this.latencyData.set(key, []);
    }
    
    const data = this.latencyData.get(key)!;
    data.push(value);
    
    // Keep only recent data (last 1000 samples or 1 hour worth)
    if (data.length > 1000) {
      data.splice(0, data.length - 1000);
    }
  }

  private calculatePercentile(sortedData: number[], percentile: number): number {
    const index = (percentile / 100) * (sortedData.length - 1);
    const lower = Math.floor(index);
    const upper = Math.ceil(index);
    
    if (lower === upper) {
      return sortedData[lower];
    }
    
    const weight = index - lower;
    return sortedData[lower] * (1 - weight) + sortedData[upper] * weight;
  }

  private checkLatencyViolation(
    key: string,
    endpoint: string,
    duration: number,
    attributes: Record<string, string>
  ): void {
    const data = this.latencyData.get(key);
    if (!data || data.length < 10) return; // Need enough data for p99

    const p99 = this.calculatePercentile([...data].sort((a, b) => a - b), 99);
    
    if (p99 > SLI_THRESHOLDS.API_RESPONSE_TIME.CRITICAL) {
      this.violations.push({
        metric: 'api_p99_latency',
        endpoint,
        threshold: SLI_THRESHOLDS.API_RESPONSE_TIME.CRITICAL,
        actual: p99,
        severity: 'critical',
        timestamp: new Date(),
        attributes,
      });
    } else if (p99 > SLI_THRESHOLDS.API_RESPONSE_TIME.WARNING) {
      this.violations.push({
        metric: 'api_p99_latency',
        endpoint,
        threshold: SLI_THRESHOLDS.API_RESPONSE_TIME.WARNING,
        actual: p99,
        severity: 'warning',
        timestamp: new Date(),
        attributes,
      });
    }
  }

  private checkDatabaseViolation(
    key: string,
    query: string,
    duration: number,
    attributes: Record<string, string>
  ): void {
    if (duration > SLI_THRESHOLDS.DATABASE_QUERY_TIME.CRITICAL) {
      this.violations.push({
        metric: 'database_query_latency',
        endpoint: query,
        threshold: SLI_THRESHOLDS.DATABASE_QUERY_TIME.CRITICAL,
        actual: duration,
        severity: 'critical',
        timestamp: new Date(),
        attributes,
      });
    }
  }

  private checkBusinessProcessViolation(
    processName: string,
    duration: number,
    attributes: Record<string, string>
  ): void {
    const thresholds = this.getBusinessProcessThresholds(processName);
    if (!thresholds) return;

    if (duration > thresholds.CRITICAL) {
      this.violations.push({
        metric: `business_process_${processName}`,
        threshold: thresholds.CRITICAL,
        actual: duration,
        severity: 'critical',
        timestamp: new Date(),
        attributes,
      });
    }
  }

  private getBusinessProcessThresholds(processName: string) {
    switch (processName) {
      case 'lead_capture':
        return SLI_THRESHOLDS.LEAD_CAPTURE_TIME;
      case 'payment_processing':
        return SLI_THRESHOLDS.PAYMENT_PROCESSING_TIME;
      default:
        return null;
    }
  }

  private getWebVitalThreshold(metricName: string): number {
    switch (metricName.toUpperCase()) {
      case 'LCP':
        return SLI_THRESHOLDS.LARGEST_CONTENTFUL_PAINT.POOR;
      case 'FID':
      case 'INP':
        return SLI_THRESHOLDS.FIRST_INPUT_DELAY.POOR;
      case 'CLS':
        return SLI_THRESHOLDS.CUMULATIVE_LAYOUT_SHIFT.POOR;
      default:
        return 1000;
    }
  }

  private updateBusinessSLI(name: string, value: number, target: number): void {
    const ratio = value / target;
    let status: 'good' | 'warning' | 'critical';
    
    if (ratio <= 0.8) status = 'good';
    else if (ratio <= 1.0) status = 'warning';
    else status = 'critical';

    this.businessMetrics.set(name, {
      name,
      value,
      target,
      status,
      timestamp: new Date(),
    });
  }

  private startPeriodicCleanup(): void {
    setInterval(() => {
      this.cleanup();
    }, this.CLEANUP_INTERVAL);
  }

  private cleanup(): void {
    const now = Date.now();
    const cutoff = now - this.DATA_RETENTION;

    // Clean up old violations
    this.violations = this.violations.filter(v => v.timestamp.getTime() > cutoff);

    // Clean up old latency data (keep recent samples)
    for (const [key, data] of this.latencyData.entries()) {
      if (data.length > 500) {
        this.latencyData.set(key, data.slice(-500));
      }
    }

    this.lastCleanup = now;
  }
}

// Singleton instance
export const sliTracker = new SLITracker();

// Convenience functions for common tracking scenarios

/**
 * Track API endpoint with automatic timing
 */
export function trackApiCall<T>(
  endpoint: string,
  fn: () => Promise<T>,
  attributes?: Record<string, string>
): Promise<T> {
  const startTime = Date.now();
  
  return fn()
    .then(result => {
      const duration = Date.now() - startTime;
      sliTracker.trackApiLatency(endpoint, duration, attributes);
      return result;
    })
    .catch(error => {
      const duration = Date.now() - startTime;
      sliTracker.trackApiLatency(endpoint, duration, { 
        ...attributes, 
        error: 'true',
        error_type: error.constructor.name 
      });
      throw error;
    });
}

/**
 * Track database query with automatic timing
 */
export function trackDatabaseQuery<T>(
  queryName: string,
  fn: () => Promise<T>,
  attributes?: Record<string, string>
): Promise<T> {
  const startTime = Date.now();
  
  return fn()
    .then(result => {
      const duration = Date.now() - startTime;
      sliTracker.trackDatabaseQuery(queryName, duration, attributes);
      return result;
    })
    .catch(error => {
      const duration = Date.now() - startTime;
      sliTracker.trackDatabaseQuery(queryName, duration, { 
        ...attributes, 
        error: 'true',
        error_type: error.constructor.name 
      });
      throw error;
    });
}

/**
 * Track business process with automatic timing
 */
export function trackBusinessProcess<T>(
  processName: string,
  fn: () => Promise<T>,
  attributes?: Record<string, string>
): Promise<T> {
  const startTime = Date.now();
  
  return fn()
    .then(result => {
      const duration = Date.now() - startTime;
      sliTracker.trackBusinessProcess(processName, duration, true, attributes);
      return result;
    })
    .catch(error => {
      const duration = Date.now() - startTime;
      sliTracker.trackBusinessProcess(processName, duration, false, { 
        ...attributes, 
        error: 'true',
        error_type: error.constructor.name 
      });
      throw error;
    });
}

// Export types
export type { PercentileData, SLIViolation, BusinessSLI };