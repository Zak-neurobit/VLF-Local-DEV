/**
 * Performance Metrics Implementation
 * Comprehensive metrics collection for p99 <50ms monitoring
 */

import { metrics } from '@opentelemetry/api';

// Metric instruments
interface MetricInstruments {
  // API Response Time Histograms
  httpRequestDuration: any;
  databaseQueryDuration: any;
  apiEndpointDuration: any;
  
  // Business Event Counters
  formSubmissions: any;
  conversions: any;
  leadCaptures: any;
  paymentProcessed: any;
  appointments: any;
  consultations: any;
  
  // System Health Gauges
  memoryUsage: any;
  cpuUsage: any;
  diskUsage: any;
  activeConnections: any;
  errorRate: any;
  
  // Performance Gauges
  performanceScore: any;
  webVitalsLCP: any;
  webVitalsFCP: any;
  webVitalsCLS: any;
  webVitalsINP: any;
}

class MetricsCollector {
  private meter: ReturnType<typeof metrics.getMeter>;
  private instruments: MetricInstruments;
  private initialized = false;

  constructor() {
    this.meter = metrics.getMeter('vlf-website', '1.0.0');
    this.instruments = this.initializeInstruments();
  }

  private initializeInstruments(): MetricInstruments {
    return {
      // API Response Time Histograms with percentile tracking
      httpRequestDuration: this.meter.createHistogram('http_request_duration_ms', {
        description: 'HTTP request duration in milliseconds',
        unit: 'ms',
        boundaries: [1, 5, 10, 25, 50, 75, 100, 250, 500, 1000, 2500, 5000],
      }),

      databaseQueryDuration: this.meter.createHistogram('db_query_duration_ms', {
        description: 'Database query duration in milliseconds',
        unit: 'ms',
        boundaries: [1, 5, 10, 25, 50, 100, 250, 500, 1000],
      }),

      apiEndpointDuration: this.meter.createHistogram('api_endpoint_duration_ms', {
        description: 'API endpoint response time in milliseconds',
        unit: 'ms',
        boundaries: [1, 5, 10, 25, 50, 75, 100, 250, 500],
      }),

      // Business Event Counters
      formSubmissions: this.meter.createCounter('form_submissions_total', {
        description: 'Total number of form submissions',
      }),

      conversions: this.meter.createCounter('conversions_total', {
        description: 'Total number of conversions',
      }),

      leadCaptures: this.meter.createCounter('lead_captures_total', {
        description: 'Total number of lead captures',
      }),

      paymentProcessed: this.meter.createCounter('payments_processed_total', {
        description: 'Total number of processed payments',
      }),

      appointments: this.meter.createCounter('appointments_scheduled_total', {
        description: 'Total number of scheduled appointments',
      }),

      consultations: this.meter.createCounter('consultations_started_total', {
        description: 'Total number of started consultations',
      }),

      // System Health Gauges
      memoryUsage: this.meter.createObservableGauge('memory_usage_bytes', {
        description: 'Current memory usage in bytes',
        unit: 'By',
      }),

      cpuUsage: this.meter.createObservableGauge('cpu_usage_percent', {
        description: 'Current CPU usage percentage',
        unit: '%',
      }),

      diskUsage: this.meter.createObservableGauge('disk_usage_percent', {
        description: 'Current disk usage percentage',
        unit: '%',
      }),

      activeConnections: this.meter.createUpDownCounter('active_connections', {
        description: 'Number of active connections',
      }),

      errorRate: this.meter.createObservableGauge('error_rate_percent', {
        description: 'Error rate percentage',
        unit: '%',
      }),

      // Performance Gauges
      performanceScore: this.meter.createObservableGauge('performance_score', {
        description: 'Overall performance score (0-100)',
        unit: '1',
      }),

      webVitalsLCP: this.meter.createHistogram('web_vitals_lcp_ms', {
        description: 'Largest Contentful Paint in milliseconds',
        unit: 'ms',
        boundaries: [1000, 1500, 2000, 2500, 3000, 4000, 5000],
      }),

      webVitalsFCP: this.meter.createHistogram('web_vitals_fcp_ms', {
        description: 'First Contentful Paint in milliseconds',
        unit: 'ms',
        boundaries: [800, 1200, 1800, 2400, 3000],
      }),

      webVitalsCLS: this.meter.createHistogram('web_vitals_cls', {
        description: 'Cumulative Layout Shift score',
        unit: '1',
        boundaries: [0.05, 0.1, 0.15, 0.2, 0.25, 0.3],
      }),

      webVitalsINP: this.meter.createHistogram('web_vitals_inp_ms', {
        description: 'Interaction to Next Paint in milliseconds',
        unit: 'ms',
        boundaries: [100, 150, 200, 300, 500, 800],
      }),
    };
  }

  public initialize(): void {
    if (this.initialized) return;

    // Setup system metrics collection
    this.setupSystemMetrics();
    this.initialized = true;
  }

  private setupSystemMetrics(): void {
    // Memory usage monitoring
    this.instruments.memoryUsage.addCallback((result) => {
      if (typeof process !== 'undefined' && process.memoryUsage) {
        const memUsage = process.memoryUsage();
        result.observe(memUsage.heapUsed, {
          type: 'heap_used',
        });
        result.observe(memUsage.heapTotal, {
          type: 'heap_total',
        });
        result.observe(memUsage.rss, {
          type: 'rss',
        });
      }
    });

    // CPU usage monitoring (simplified)
    this.instruments.cpuUsage.addCallback((result) => {
      if (typeof process !== 'undefined' && process.cpuUsage) {
        const cpuUsage = process.cpuUsage();
        const cpuPercent = (cpuUsage.user + cpuUsage.system) / 1000000; // Convert to ms
        result.observe(cpuPercent, {
          type: 'total',
        });
      }
    });

    // Performance score monitoring
    this.instruments.performanceScore.addCallback((result) => {
      // This would be calculated based on various performance metrics
      const score = this.calculatePerformanceScore();
      result.observe(score, {
        component: 'overall',
      });
    });
  }

  private calculatePerformanceScore(): number {
    // Simplified performance score calculation
    // In reality, this would aggregate various performance metrics
    return 85; // Placeholder
  }

  // Public methods for recording metrics

  /**
   * Record HTTP request duration with p99 tracking
   */
  public recordHttpRequest(duration: number, attributes: Record<string, string>): void {
    this.instruments.httpRequestDuration.record(duration, attributes);
  }

  /**
   * Record database query duration
   */
  public recordDatabaseQuery(duration: number, attributes: Record<string, string>): void {
    this.instruments.databaseQueryDuration.record(duration, attributes);
  }

  /**
   * Record API endpoint duration
   */
  public recordApiEndpoint(duration: number, attributes: Record<string, string>): void {
    this.instruments.apiEndpointDuration.record(duration, attributes);
  }

  /**
   * Record form submission
   */
  public recordFormSubmission(formType: string, success: boolean): void {
    this.instruments.formSubmissions.add(1, {
      form_type: formType,
      success: success.toString(),
    });
  }

  /**
   * Record conversion event
   */
  public recordConversion(conversionType: string, value?: number): void {
    this.instruments.conversions.add(1, {
      type: conversionType,
      value: value?.toString() || '0',
    });
  }

  /**
   * Record lead capture
   */
  public recordLeadCapture(source: string, quality: string): void {
    this.instruments.leadCaptures.add(1, {
      source,
      quality,
    });
  }

  /**
   * Record payment processing
   */
  public recordPayment(amount: number, success: boolean, paymentMethod: string): void {
    this.instruments.paymentProcessed.add(1, {
      success: success.toString(),
      payment_method: paymentMethod,
      amount_range: this.getAmountRange(amount),
    });
  }

  /**
   * Record appointment scheduling
   */
  public recordAppointment(type: string, success: boolean): void {
    this.instruments.appointments.add(1, {
      type,
      success: success.toString(),
    });
  }

  /**
   * Record consultation start
   */
  public recordConsultation(type: string, duration?: number): void {
    this.instruments.consultations.add(1, {
      type,
      duration_range: duration ? this.getDurationRange(duration) : 'unknown',
    });
  }

  /**
   * Record Web Vitals metrics
   */
  public recordWebVitals(metric: {
    name: string;
    value: number;
    rating: 'good' | 'needs-improvement' | 'poor';
  }): void {
    const attributes = {
      rating: metric.rating,
    };

    switch (metric.name) {
      case 'LCP':
        this.instruments.webVitalsLCP.record(metric.value, attributes);
        break;
      case 'FCP':
        this.instruments.webVitalsFCP.record(metric.value, attributes);
        break;
      case 'CLS':
        this.instruments.webVitalsCLS.record(metric.value, attributes);
        break;
      case 'INP':
        this.instruments.webVitalsINP.record(metric.value, attributes);
        break;
    }
  }

  /**
   * Update active connections count
   */
  public updateActiveConnections(delta: number): void {
    this.instruments.activeConnections.add(delta);
  }

  // Helper methods
  private getAmountRange(amount: number): string {
    if (amount < 100) return '0-100';
    if (amount < 500) return '100-500';
    if (amount < 1000) return '500-1000';
    if (amount < 5000) return '1000-5000';
    return '5000+';
  }

  private getDurationRange(duration: number): string {
    if (duration < 300) return '0-5min';
    if (duration < 900) return '5-15min';
    if (duration < 1800) return '15-30min';
    if (duration < 3600) return '30-60min';
    return '60min+';
  }
}

// Singleton instance
export const metricsCollector = new MetricsCollector();

// Initialize on import
if (typeof window === 'undefined') {
  // Server-side initialization
  metricsCollector.initialize();
}

// Middleware for automatic HTTP request timing
export function createMetricsMiddleware() {
  return (req: any, res: any, next: any) => {
    const startTime = Date.now();
    
    res.on('finish', () => {
      const duration = Date.now() - startTime;
      metricsCollector.recordHttpRequest(duration, {
        method: req.method,
        route: req.route?.path || req.path,
        status_code: res.statusCode.toString(),
        status_class: `${Math.floor(res.statusCode / 100)}xx`,
      });
    });
    
    next();
  };
}

// Types for external use
export interface MetricAttributes {
  [key: string]: string;
}

export interface WebVitalMetric {
  name: 'LCP' | 'FCP' | 'CLS' | 'INP';
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
}

export type BusinessEvent = 
  | 'form_submission'
  | 'conversion'
  | 'lead_capture'
  | 'payment'
  | 'appointment'
  | 'consultation';