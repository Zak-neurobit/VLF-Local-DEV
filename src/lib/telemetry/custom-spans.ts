/**
 * Custom OpenTelemetry Spans for VLF Business Operations
 * Provides instrumentation for lead capture, payments, AI interactions, and legal processes
 */

import { trace, context, SpanStatusCode, SpanKind, Span, propagation, baggage } from '@opentelemetry/api';
import { SEMATTRS_HTTP_METHOD, SEMATTRS_HTTP_STATUS_CODE } from '@opentelemetry/semantic-conventions';

// VLF-specific semantic conventions
export const VLF_ATTRS = {
  // Lead capture attributes
  LEAD_SOURCE: 'vlf.lead.source',
  LEAD_TYPE: 'vlf.lead.type',
  LEAD_PRACTICE_AREA: 'vlf.lead.practice_area',
  LEAD_URGENCY: 'vlf.lead.urgency',
  LEAD_LANGUAGE: 'vlf.lead.language',
  LEAD_LOCATION: 'vlf.lead.location',
  LEAD_VALUE_SCORE: 'vlf.lead.value_score',

  // Payment attributes
  PAYMENT_METHOD: 'vlf.payment.method',
  PAYMENT_AMOUNT: 'vlf.payment.amount',
  PAYMENT_CURRENCY: 'vlf.payment.currency',
  PAYMENT_STATUS: 'vlf.payment.status',
  PAYMENT_GATEWAY: 'vlf.payment.gateway',
  PAYMENT_CASE_ID: 'vlf.payment.case_id',

  // AI agent attributes
  AI_AGENT_TYPE: 'vlf.ai.agent_type',
  AI_MODEL: 'vlf.ai.model',
  AI_TOKENS_USED: 'vlf.ai.tokens_used',
  AI_RESPONSE_TIME: 'vlf.ai.response_time_ms',
  AI_CONVERSATION_ID: 'vlf.ai.conversation_id',
  AI_LANGUAGE: 'vlf.ai.language',
  AI_INTENT: 'vlf.ai.intent',
  AI_CONFIDENCE: 'vlf.ai.confidence',

  // Legal case attributes
  CASE_TYPE: 'vlf.case.type',
  CASE_STATUS: 'vlf.case.status',
  CASE_PRIORITY: 'vlf.case.priority',
  CASE_ATTORNEY: 'vlf.case.attorney',
  CASE_CLIENT_ID: 'vlf.case.client_id',

  // User context
  USER_ROLE: 'vlf.user.role',
  USER_LANGUAGE: 'vlf.user.language',
  USER_LOCATION: 'vlf.user.location',
  USER_SESSION_ID: 'vlf.user.session_id',
  USER_ID: 'vlf.user.id',

  // Performance metrics
  OPERATION_P99_THRESHOLD: 'vlf.performance.p99_threshold_ms',
  OPERATION_TYPE: 'vlf.performance.operation_type',
  DATABASE_QUERY_TIME: 'vlf.db.query_time_ms',
  EXTERNAL_API_TIME: 'vlf.external_api.time_ms',
} as const;

interface UserContext {
  userId?: string;
  sessionId?: string;
  role?: string;
  language?: 'en' | 'es';
  location?: string;
}

interface LeadCaptureAttributes {
  source: string;
  type: string;
  practiceArea: string;
  urgency: 'low' | 'medium' | 'high' | 'emergency';
  language: 'en' | 'es';
  location?: string;
  valueScore?: number;
  formData?: Record<string, any>;
}

interface PaymentAttributes {
  method: string;
  amount: number;
  currency: string;
  gateway: 'stripe' | 'authorize_net' | 'lawpay';
  caseId?: string;
  clientId?: string;
}

interface AIAgentAttributes {
  agentType: string;
  model: string;
  conversationId?: string;
  language: 'en' | 'es';
  intent?: string;
  confidence?: number;
}

interface PerformanceThresholds {
  leadCapture: number;
  payment: number;
  aiResponse: number;
  databaseQuery: number;
  externalApi: number;
}

class VLFTelemetry {
  private tracer = trace.getTracer('vlf-business-operations', '1.0.0');
  private readonly performanceThresholds: PerformanceThresholds;

  constructor() {
    this.performanceThresholds = {
      leadCapture: 2000, // 2 seconds p99 target
      payment: 5000, // 5 seconds p99 target
      aiResponse: 3000, // 3 seconds p99 target
      databaseQuery: 500, // 500ms p99 target
      externalApi: 4000, // 4 seconds p99 target
    };
  }

  /**
   * Set user context in baggage for propagation across all spans
   */
  public setUserContext(userContext: UserContext): void {
    const currentBaggage = baggage.getActiveBaggage() || baggage.create();
    let updatedBaggage = currentBaggage;

    if (userContext.userId) {
      updatedBaggage = baggage.setEntry(updatedBaggage, 'vlf.user.id', { value: userContext.userId });
    }
    if (userContext.sessionId) {
      updatedBaggage = baggage.setEntry(updatedBaggage, 'vlf.user.session_id', { value: userContext.sessionId });
    }
    if (userContext.role) {
      updatedBaggage = baggage.setEntry(updatedBaggage, 'vlf.user.role', { value: userContext.role });
    }
    if (userContext.language) {
      updatedBaggage = baggage.setEntry(updatedBaggage, 'vlf.user.language', { value: userContext.language });
    }
    if (userContext.location) {
      updatedBaggage = baggage.setEntry(updatedBaggage, 'vlf.user.location', { value: userContext.location });
    }

    context.with(baggage.setActiveBaggage(context.active(), updatedBaggage), () => {
      // Context is now set for child operations
    });
  }

  /**
   * Create span for lead capture operations with business-critical tracking
   */
  public async traceLeadCapture<T>(
    operation: string,
    attributes: LeadCaptureAttributes,
    fn: () => Promise<T>
  ): Promise<T> {
    return this.tracer.startActiveSpan(
      `vlf.lead_capture.${operation}`,
      {
        kind: SpanKind.SERVER,
        attributes: {
          [VLF_ATTRS.LEAD_SOURCE]: attributes.source,
          [VLF_ATTRS.LEAD_TYPE]: attributes.type,
          [VLF_ATTRS.LEAD_PRACTICE_AREA]: attributes.practiceArea,
          [VLF_ATTRS.LEAD_URGENCY]: attributes.urgency,
          [VLF_ATTRS.LEAD_LANGUAGE]: attributes.language,
          [VLF_ATTRS.LEAD_LOCATION]: attributes.location || 'unknown',
          [VLF_ATTRS.LEAD_VALUE_SCORE]: attributes.valueScore || 0,
          [VLF_ATTRS.OPERATION_P99_THRESHOLD]: this.performanceThresholds.leadCapture,
          [VLF_ATTRS.OPERATION_TYPE]: 'lead_capture',
        },
      },
      async (span) => {
        const startTime = Date.now();
        
        try {
          // Add baggage context
          this.addBaggageToSpan(span);
          
          const result = await fn();
          
          const duration = Date.now() - startTime;
          span.setAttributes({
            [VLF_ATTRS.AI_RESPONSE_TIME]: duration,
            'vlf.lead.success': true,
          });

          // Check performance threshold
          if (duration > this.performanceThresholds.leadCapture) {
            span.setAttributes({
              'vlf.performance.exceeded_threshold': true,
              'vlf.performance.threshold_type': 'p99',
            });
          }

          span.setStatus({ code: SpanStatusCode.OK });
          return result;
        } catch (error) {
          const duration = Date.now() - startTime;
          span.setAttributes({
            [VLF_ATTRS.AI_RESPONSE_TIME]: duration,
            'vlf.lead.success': false,
            'vlf.error.type': error instanceof Error ? error.constructor.name : 'unknown',
            'vlf.error.message': error instanceof Error ? error.message : String(error),
          });
          
          span.recordException(error instanceof Error ? error : new Error(String(error)));
          span.setStatus({ code: SpanStatusCode.ERROR, message: String(error) });
          throw error;
        } finally {
          span.end();
        }
      }
    );
  }

  /**
   * Create span for payment processing with fraud detection tracking
   */
  public async tracePayment<T>(
    operation: string,
    attributes: PaymentAttributes,
    fn: () => Promise<T>
  ): Promise<T> {
    return this.tracer.startActiveSpan(
      `vlf.payment.${operation}`,
      {
        kind: SpanKind.CLIENT,
        attributes: {
          [VLF_ATTRS.PAYMENT_METHOD]: attributes.method,
          [VLF_ATTRS.PAYMENT_AMOUNT]: attributes.amount,
          [VLF_ATTRS.PAYMENT_CURRENCY]: attributes.currency,
          [VLF_ATTRS.PAYMENT_GATEWAY]: attributes.gateway,
          [VLF_ATTRS.PAYMENT_CASE_ID]: attributes.caseId || 'unknown',
          [VLF_ATTRS.OPERATION_P99_THRESHOLD]: this.performanceThresholds.payment,
          [VLF_ATTRS.OPERATION_TYPE]: 'payment',
        },
      },
      async (span) => {
        const startTime = Date.now();
        
        try {
          this.addBaggageToSpan(span);
          
          const result = await fn();
          
          const duration = Date.now() - startTime;
          span.setAttributes({
            [VLF_ATTRS.EXTERNAL_API_TIME]: duration,
            [VLF_ATTRS.PAYMENT_STATUS]: 'success',
            'vlf.payment.processed': true,
          });

          if (duration > this.performanceThresholds.payment) {
            span.setAttributes({
              'vlf.performance.exceeded_threshold': true,
              'vlf.performance.slow_payment': true,
            });
          }

          span.setStatus({ code: SpanStatusCode.OK });
          return result;
        } catch (error) {
          const duration = Date.now() - startTime;
          span.setAttributes({
            [VLF_ATTRS.EXTERNAL_API_TIME]: duration,
            [VLF_ATTRS.PAYMENT_STATUS]: 'failed',
            'vlf.payment.processed': false,
            'vlf.payment.error_type': error instanceof Error ? error.constructor.name : 'unknown',
          });
          
          span.recordException(error instanceof Error ? error : new Error(String(error)));
          span.setStatus({ code: SpanStatusCode.ERROR, message: String(error) });
          throw error;
        } finally {
          span.end();
        }
      }
    );
  }

  /**
   * Create span for AI agent interactions with token usage tracking
   */
  public async traceAIAgent<T>(
    operation: string,
    attributes: AIAgentAttributes,
    fn: () => Promise<T>
  ): Promise<T & { tokensUsed?: number }> {
    return this.tracer.startActiveSpan(
      `vlf.ai.${operation}`,
      {
        kind: SpanKind.CLIENT,
        attributes: {
          [VLF_ATTRS.AI_AGENT_TYPE]: attributes.agentType,
          [VLF_ATTRS.AI_MODEL]: attributes.model,
          [VLF_ATTRS.AI_CONVERSATION_ID]: attributes.conversationId || 'unknown',
          [VLF_ATTRS.AI_LANGUAGE]: attributes.language,
          [VLF_ATTRS.AI_INTENT]: attributes.intent || 'unknown',
          [VLF_ATTRS.AI_CONFIDENCE]: attributes.confidence || 0,
          [VLF_ATTRS.OPERATION_P99_THRESHOLD]: this.performanceThresholds.aiResponse,
          [VLF_ATTRS.OPERATION_TYPE]: 'ai_interaction',
        },
      },
      async (span) => {
        const startTime = Date.now();
        
        try {
          this.addBaggageToSpan(span);
          
          const result = await fn();
          
          const duration = Date.now() - startTime;
          span.setAttributes({
            [VLF_ATTRS.AI_RESPONSE_TIME]: duration,
            'vlf.ai.success': true,
          });

          // Track token usage if available
          if (typeof result === 'object' && result && 'tokensUsed' in result) {
            span.setAttributes({
              [VLF_ATTRS.AI_TOKENS_USED]: (result as any).tokensUsed,
            });
          }

          if (duration > this.performanceThresholds.aiResponse) {
            span.setAttributes({
              'vlf.performance.exceeded_threshold': true,
              'vlf.performance.slow_ai_response': true,
            });
          }

          span.setStatus({ code: SpanStatusCode.OK });
          return result;
        } catch (error) {
          const duration = Date.now() - startTime;
          span.setAttributes({
            [VLF_ATTRS.AI_RESPONSE_TIME]: duration,
            'vlf.ai.success': false,
            'vlf.ai.error_type': error instanceof Error ? error.constructor.name : 'unknown',
          });
          
          span.recordException(error instanceof Error ? error : new Error(String(error)));
          span.setStatus({ code: SpanStatusCode.ERROR, message: String(error) });
          throw error;
        } finally {
          span.end();
        }
      }
    );
  }

  /**
   * Create span for database operations with query performance tracking
   */
  public async traceDatabase<T>(
    operation: string,
    query: string,
    fn: () => Promise<T>
  ): Promise<T> {
    return this.tracer.startActiveSpan(
      `vlf.database.${operation}`,
      {
        kind: SpanKind.CLIENT,
        attributes: {
          'db.system': 'postgresql',
          'db.operation': operation,
          'db.statement': query.substring(0, 500), // Truncate for security
          [VLF_ATTRS.OPERATION_P99_THRESHOLD]: this.performanceThresholds.databaseQuery,
          [VLF_ATTRS.OPERATION_TYPE]: 'database',
        },
      },
      async (span) => {
        const startTime = Date.now();
        
        try {
          this.addBaggageToSpan(span);
          
          const result = await fn();
          
          const duration = Date.now() - startTime;
          span.setAttributes({
            [VLF_ATTRS.DATABASE_QUERY_TIME]: duration,
            'vlf.db.success': true,
          });

          if (duration > this.performanceThresholds.databaseQuery) {
            span.setAttributes({
              'vlf.performance.exceeded_threshold': true,
              'vlf.performance.slow_query': true,
            });
          }

          span.setStatus({ code: SpanStatusCode.OK });
          return result;
        } catch (error) {
          const duration = Date.now() - startTime;
          span.setAttributes({
            [VLF_ATTRS.DATABASE_QUERY_TIME]: duration,
            'vlf.db.success': false,
            'vlf.db.error_type': error instanceof Error ? error.constructor.name : 'unknown',
          });
          
          span.recordException(error instanceof Error ? error : new Error(String(error)));
          span.setStatus({ code: SpanStatusCode.ERROR, message: String(error) });
          throw error;
        } finally {
          span.end();
        }
      }
    );
  }

  /**
   * Create span for external API calls with retry tracking
   */
  public async traceExternalAPI<T>(
    service: string,
    operation: string,
    url: string,
    fn: () => Promise<T>
  ): Promise<T> {
    return this.tracer.startActiveSpan(
      `vlf.external_api.${service}.${operation}`,
      {
        kind: SpanKind.CLIENT,
        attributes: {
          'http.url': url,
          'vlf.external_api.service': service,
          [VLF_ATTRS.OPERATION_P99_THRESHOLD]: this.performanceThresholds.externalApi,
          [VLF_ATTRS.OPERATION_TYPE]: 'external_api',
        },
      },
      async (span) => {
        const startTime = Date.now();
        
        try {
          this.addBaggageToSpan(span);
          
          const result = await fn();
          
          const duration = Date.now() - startTime;
          span.setAttributes({
            [VLF_ATTRS.EXTERNAL_API_TIME]: duration,
            'vlf.external_api.success': true,
          });

          if (duration > this.performanceThresholds.externalApi) {
            span.setAttributes({
              'vlf.performance.exceeded_threshold': true,
              'vlf.performance.slow_external_api': true,
            });
          }

          span.setStatus({ code: SpanStatusCode.OK });
          return result;
        } catch (error) {
          const duration = Date.now() - startTime;
          span.setAttributes({
            [VLF_ATTRS.EXTERNAL_API_TIME]: duration,
            'vlf.external_api.success': false,
            'vlf.external_api.error_type': error instanceof Error ? error.constructor.name : 'unknown',
          });
          
          span.recordException(error instanceof Error ? error : new Error(String(error)));
          span.setStatus({ code: SpanStatusCode.ERROR, message: String(error) });
          throw error;
        } finally {
          span.end();
        }
      }
    );
  }

  /**
   * Add baggage context to span attributes
   */
  private addBaggageToSpan(span: Span): void {
    const activeBaggage = baggage.getActiveBaggage();
    if (activeBaggage) {
      activeBaggage.getAllEntries().forEach(([key, entry]) => {
        span.setAttributes({ [key]: entry.value });
      });
    }
  }

  /**
   * Get current trace and span IDs for correlation with logs
   */
  public getTraceContext(): { traceId: string; spanId: string } | null {
    const activeSpan = trace.getActiveSpan();
    if (!activeSpan) return null;

    const spanContext = activeSpan.spanContext();
    return {
      traceId: spanContext.traceId,
      spanId: spanContext.spanId,
    };
  }

  /**
   * Update performance thresholds dynamically
   */
  public updatePerformanceThresholds(thresholds: Partial<PerformanceThresholds>): void {
    Object.assign(this.performanceThresholds, thresholds);
  }
}

// Export singleton instance
export const vlfTelemetry = new VLFTelemetry();

export default vlfTelemetry;