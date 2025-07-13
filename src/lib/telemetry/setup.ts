/**
 * OpenTelemetry SDK Setup for VLF Website
 * Comprehensive tracing infrastructure with auto-instrumentation
 * Integrates with existing Winston logging and Sentry
 */

import { NodeSDK } from '@opentelemetry/sdk-node';
import { securityLogger } from '@/lib/pino-logger';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { Resource } from '@opentelemetry/resources';
import { SEMRESATTRS_SERVICE_NAME, SEMRESATTRS_SERVICE_VERSION, SEMRESATTRS_DEPLOYMENT_ENVIRONMENT } from '@opentelemetry/semantic-conventions';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { BatchSpanProcessor, ConsoleSpanExporter, SpanProcessor } from '@opentelemetry/sdk-node';
import { B3Propagator } from '@opentelemetry/propagator-b3';
import { JaegerPropagator } from '@opentelemetry/propagator-jaeger';
import { CompositePropagator } from '@opentelemetry/core';
import { DiagConsoleLogger, DiagLogLevel, diag } from '@opentelemetry/api';

interface TelemetryConfig {
  serviceName: string;
  serviceVersion: string;
  environment: string;
  enableConsoleExporter: boolean;
  enableOTLPExporter: boolean;
  otlpEndpoint?: string;
  samplingRatio: number;
  debugMode: boolean;
}

class TelemetrySetup {
  private sdk?: NodeSDK;
  private initialized = false;
  private config: TelemetryConfig;

  constructor() {
    this.config = this.loadConfig();
    this.setupDiagnostics();
  }

  private loadConfig(): TelemetryConfig {
    const isDevelopment = process.env.NODE_ENV === 'development';
    const isProduction = process.env.NODE_ENV === 'production';

    return {
      serviceName: process.env.OTEL_SERVICE_NAME || 'vasquez-law-website',
      serviceVersion: process.env.OTEL_SERVICE_VERSION || '1.0.0',
      environment: process.env.OTEL_ENVIRONMENT || process.env.NODE_ENV || 'development',
      enableConsoleExporter: isDevelopment || process.env.OTEL_ENABLE_CONSOLE === 'true',
      enableOTLPExporter: isProduction || !!process.env.OTEL_EXPORTER_OTLP_ENDPOINT,
      otlpEndpoint: process.env.OTEL_EXPORTER_OTLP_ENDPOINT,
      samplingRatio: parseFloat(process.env.OTEL_SAMPLING_RATIO || '1.0'),
      debugMode: isDevelopment || process.env.OTEL_DEBUG === 'true',
    };
  }

  private setupDiagnostics(): void {
    if (this.config.debugMode) {
      diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.DEBUG);
    } else {
      diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.WARN);
    }
  }

  private createResource(): Resource {
    return Resource.default().merge(
      new Resource({
        [SEMRESATTRS_SERVICE_NAME]: this.config.serviceName,
        [SEMRESATTRS_SERVICE_VERSION]: this.config.serviceVersion,
        [SEMRESATTRS_DEPLOYMENT_ENVIRONMENT]: this.config.environment,
        // VLF-specific attributes
        'vlf.website.version': this.config.serviceVersion,
        'vlf.legal.practice_areas': 'immigration,personal_injury,workers_compensation,criminal_defense,family_law',
        'vlf.locations': 'charlotte_nc,atlanta_ga',
        'vlf.languages': 'en,es',
      })
    );
  }

  private createSpanProcessors(): SpanProcessor[] {
    const processors: SpanProcessor[] = [];

    // Console exporter for development
    if (this.config.enableConsoleExporter) {
      processors.push(new BatchSpanProcessor(new ConsoleSpanExporter()));
    }

    // OTLP exporter for production monitoring
    if (this.config.enableOTLPExporter && this.config.otlpEndpoint) {
      const otlpExporter = new OTLPTraceExporter({
        url: this.config.otlpEndpoint,
        headers: {
          'Authorization': process.env.OTEL_EXPORTER_OTLP_HEADERS_AUTH || '',
          'Content-Type': 'application/json',
        },
        timeoutMillis: 5000, // 5-second timeout for high-volume endpoints
      });

      processors.push(new BatchSpanProcessor(otlpExporter, {
        maxQueueSize: 2048,
        maxExportBatchSize: 512,
        exportTimeoutMillis: 5000,
        scheduledDelayMillis: 1000,
      }));
    }

    return processors;
  }

  private createInstrumentations() {
    return getNodeAutoInstrumentations({
      // Disable instrumentations that might be too noisy
      '@opentelemetry/instrumentation-fs': {
        enabled: false, // File system operations can be very noisy
      },
      '@opentelemetry/instrumentation-http': {
        enabled: true,
        requestHook: (span, request) => {
          // Add VLF-specific HTTP attributes
          span.setAttributes({
            'vlf.http.user_agent': request.headers['user-agent'] || 'unknown',
            'vlf.http.language': request.headers['accept-language'] || 'unknown',
            'vlf.http.is_mobile': this.isMobileUserAgent(request.headers['user-agent']),
          });
        },
        responseHook: (span, response) => {
          // Track response characteristics
          span.setAttributes({
            'vlf.http.response_size': response.headers['content-length'] || 0,
            'vlf.http.cache_status': response.headers['cache-control'] || 'unknown',
          });
        },
        ignoreIncomingRequestHook: (req) => {
          // Ignore health checks and static assets for high-volume filtering
          const url = req.url || '';
          return (
            url.includes('/health') ||
            url.includes('/_next/static') ||
            url.includes('/favicon') ||
            url.includes('/images/') ||
            url.includes('.css') ||
            url.includes('.js') ||
            url.includes('.map')
          );
        },
      },
      '@opentelemetry/instrumentation-express': {
        enabled: true,
      },
      '@opentelemetry/instrumentation-pg': {
        enabled: true,
        enhancedDatabaseReporting: true,
      },
      '@opentelemetry/instrumentation-redis': {
        enabled: true,
        dbStatementSerializer: (cmdName, cmdArgs) => {
          // Sanitize Redis commands for security
          return `${cmdName} ${cmdArgs.length} args`;
        },
      },
    });
  }

  private createPropagators() {
    return new CompositePropagator({
      propagators: [
        new B3Propagator(),
        new JaegerPropagator(),
      ],
    });
  }

  private isMobileUserAgent(userAgent?: string): boolean {
    if (!userAgent) return false;
    return /Mobile|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
  }

  public initialize(): void {
    if (this.initialized) {
      securityLogger.warn('[Telemetry] Already initialized, skipping');
      return;
    }

    try {
      const resource = this.createResource();
      const spanProcessors = this.createSpanProcessors();
      const instrumentations = this.createInstrumentations();
      const textMapPropagator = this.createPropagators();

      this.sdk = new NodeSDK({
        resource,
        spanProcessors,
        instrumentations,
        textMapPropagator,
        // Custom sampling strategy for high-volume endpoints
        sampler: this.createCustomSampler(),
      });

      this.sdk.start();
      this.initialized = true;

      securityLogger.info(`[Telemetry] OpenTelemetry initialized successfully`);
      securityLogger.info(`[Telemetry] Service: ${this.config.serviceName}@${this.config.serviceVersion}`);
      securityLogger.info(`[Telemetry] Environment: ${this.config.environment}`);
      securityLogger.info(`[Telemetry] Console Exporter: ${this.config.enableConsoleExporter}`);
      securityLogger.info(`[Telemetry] OTLP Exporter: ${this.config.enableOTLPExporter}`);
      securityLogger.info(`[Telemetry] Sampling Ratio: ${this.config.samplingRatio}`);

    } catch (error) {
      securityLogger.error('[Telemetry] Failed to initialize OpenTelemetry:', error);
      // Don't throw - allow application to continue without tracing
    }
  }

  private createCustomSampler() {
    return {
      shouldSample: (context: any, traceId: string, spanName: string) => {
        // High-volume endpoint sampling strategy
        const isHighVolumeEndpoint = this.isHighVolumeEndpoint(spanName);
        const isBusinessCritical = this.isBusinessCriticalOperation(spanName);

        // Always sample business-critical operations
        if (isBusinessCritical) {
          return {
            decision: 1, // RECORD_AND_SAMPLE
            attributes: { 'vlf.sampling.reason': 'business_critical' },
          };
        }

        // Reduced sampling for high-volume endpoints
        if (isHighVolumeEndpoint) {
          const shouldSample = Math.random() < 0.1; // 10% sampling for high-volume
          return {
            decision: shouldSample ? 1 : 0,
            attributes: { 'vlf.sampling.reason': 'high_volume_reduced' },
          };
        }

        // Standard sampling for other operations
        const shouldSample = Math.random() < this.config.samplingRatio;
        return {
          decision: shouldSample ? 1 : 0,
          attributes: { 'vlf.sampling.reason': 'standard' },
        };
      },
    };
  }

  private isHighVolumeEndpoint(spanName: string): boolean {
    const highVolumePatterns = [
      '/api/health',
      '/api/analytics',
      '/_next',
      '/images',
      '/favicon',
      'static',
    ];
    return highVolumePatterns.some(pattern => spanName.includes(pattern));
  }

  private isBusinessCriticalOperation(spanName: string): boolean {
    const criticalPatterns = [
      '/api/leads/capture',
      '/api/payment',
      '/api/chat',
      '/api/contact',
      '/api/crewai',
      '/api/agents',
      'database',
      'prisma',
      'payment',
      'lead_capture',
    ];
    return criticalPatterns.some(pattern => spanName.toLowerCase().includes(pattern));
  }

  public shutdown(): Promise<void> {
    if (!this.sdk) {
      return Promise.resolve();
    }

    return this.sdk.shutdown().then(() => {
      securityLogger.info('[Telemetry] OpenTelemetry shut down successfully');
      this.initialized = false;
    });
  }

  public isInitialized(): boolean {
    return this.initialized;
  }

  public getConfig(): TelemetryConfig {
    return { ...this.config };
  }
}

// Export singleton instance
export const telemetrySetup = new TelemetrySetup();

// Auto-initialize if not in test environment
if (process.env.NODE_ENV !== 'test') {
  telemetrySetup.initialize();
}

export default telemetrySetup;