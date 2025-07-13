# VLF OpenTelemetry Tracing Infrastructure

Comprehensive OpenTelemetry implementation for the Vasquez Law Firm website with business-specific instrumentation, trace correlation, and performance monitoring.

## Features

### 🔍 **Comprehensive Tracing**
- **Auto-instrumentation** for Node.js, HTTP, PostgreSQL, Redis
- **Custom business spans** for lead capture, payments, AI interactions
- **P99 latency tracking** with configurable thresholds
- **Smart sampling** strategies for high-volume endpoints

### 🔗 **Trace Correlation**
- **Winston logging** integration with trace IDs
- **Sentry error reporting** with trace context
- **Request/response headers** with trace information
- **Baggage propagation** for user context

### 📊 **Business Metrics**
- **Lead capture performance** with conversion tracking
- **Payment processing latency** and success rates
- **AI agent response times** and token usage
- **Database query optimization** insights

### 🎯 **Production Ready**
- **Environment-based configuration** (dev/prod exporters)
- **High-volume sampling** (10% for static assets, 100% for business operations)
- **Security-first** approach with sanitized logs
- **Zero-impact fallback** if telemetry fails

## Quick Start

### 1. Environment Setup

Copy environment variables from `.env.example.telemetry`:

```bash
cp .env.example.telemetry .env.local
```

Configure your telemetry provider:

```env
# Required
OTEL_SERVICE_NAME=vasquez-law-website
OTEL_SERVICE_VERSION=1.0.0
OTEL_ENVIRONMENT=production

# For development
OTEL_ENABLE_CONSOLE=true
OTEL_DEBUG=true

# For production (example with Honeycomb)
OTEL_EXPORTER_OTLP_ENDPOINT=https://api.honeycomb.io/v1/traces
OTEL_EXPORTER_OTLP_HEADERS_AUTH=x-honeycomb-team=your-api-key

# Performance thresholds
OTEL_SAMPLING_RATIO=1.0
```

### 2. API Route Integration

Wrap your API routes with business-specific tracing:

```typescript
import { withLeadCaptureTracing } from '@/lib/telemetry/api-middleware';

async function handlePOST(request: NextRequest) {
  // Your existing handler logic
}

export const POST = withLeadCaptureTracing(handlePOST);
```

### 3. Custom Business Operations

Instrument critical business operations:

```typescript
import { vlfTelemetry } from '@/lib/telemetry';

// Lead capture with business metrics
const result = await vlfTelemetry.traceLeadCapture(
  'contact_form_submission',
  {
    source: 'website',
    practiceArea: 'immigration',
    urgency: 'high',
    language: 'es',
  },
  async () => {
    return await leadCaptureService.captureWebLead(data);
  }
);

// Payment processing with fraud detection
const payment = await vlfTelemetry.tracePayment(
  'stripe_charge',
  {
    method: 'credit_card',
    amount: 1500,
    currency: 'USD',
    gateway: 'stripe',
  },
  async () => {
    return await stripeService.createCharge(chargeData);
  }
);

// AI agent interactions with token tracking
const response = await vlfTelemetry.traceAIAgent(
  'legal_consultation',
  {
    agentType: 'immigration_specialist',
    model: 'gpt-4',
    language: 'es',
    intent: 'visa_consultation',
  },
  async () => {
    return await aiService.processLegalQuery(query);
  }
);
```

## Architecture

### Components

```
src/lib/telemetry/
├── setup.ts              # Core SDK configuration
├── custom-spans.ts       # Business-specific instrumentation
├── api-middleware.ts     # Next.js API route wrapper
├── instrumentation.ts    # Next.js instrumentation hook
└── index.ts             # Main exports
```

### Auto-Initialization

OpenTelemetry is automatically initialized via Next.js instrumentation:

1. `instrumentation.ts` (root) → Next.js hook
2. `src/lib/telemetry/instrumentation.ts` → Setup logic
3. `src/lib/telemetry/setup.ts` → SDK initialization

### Trace Correlation Flow

```
Request → OpenTelemetry Span → Winston Logger → Sentry Error
   ↓           ↓                    ↓              ↓
TraceID    Custom Attrs        Log Entry      Error Context
```

## Business-Specific Attributes

### Lead Capture
```typescript
vlf.lead.source: 'website' | 'phone' | 'referral'
vlf.lead.practice_area: 'immigration' | 'personal_injury' | ...
vlf.lead.urgency: 'low' | 'medium' | 'high' | 'emergency'
vlf.lead.language: 'en' | 'es'
vlf.lead.value_score: number (0-100)
```

### Payment Processing
```typescript
vlf.payment.method: 'credit_card' | 'bank_transfer' | ...
vlf.payment.amount: number
vlf.payment.gateway: 'stripe' | 'authorize_net' | 'lawpay'
vlf.payment.status: 'success' | 'failed' | 'pending'
```

### AI Agents
```typescript
vlf.ai.agent_type: 'chat' | 'crewai' | 'paralegal'
vlf.ai.model: 'gpt-3.5-turbo' | 'gpt-4' | ...
vlf.ai.tokens_used: number
vlf.ai.confidence: number (0-1)
```

## Performance Monitoring

### P99 Thresholds

Default performance targets:
- **Lead Capture**: 2 seconds
- **Payment Processing**: 5 seconds  
- **AI Responses**: 3 seconds
- **Database Queries**: 500ms
- **External APIs**: 4 seconds

Spans exceeding thresholds are tagged with `vlf.performance.exceeded_threshold: true`.

### Sampling Strategy

- **Business Critical**: 100% sampling (lead capture, payments, AI)
- **High Volume**: 10% sampling (health checks, static assets)
- **Standard Operations**: Configurable via `OTEL_SAMPLING_RATIO`

## Supported Providers

### Honeycomb.io (Recommended)
```env
OTEL_EXPORTER_OTLP_ENDPOINT=https://api.honeycomb.io/v1/traces
OTEL_EXPORTER_OTLP_HEADERS_AUTH=x-honeycomb-team=YOUR_API_KEY
```

### Jaeger
```env
OTEL_EXPORTER_OTLP_ENDPOINT=http://jaeger-collector:14268/api/traces
```

### Datadog
```env
OTEL_EXPORTER_OTLP_ENDPOINT=https://trace.agent.datadoghq.com/v0.4/traces
OTEL_EXPORTER_OTLP_HEADERS_AUTH=DD-API-KEY=YOUR_API_KEY
```

### New Relic
```env
OTEL_EXPORTER_OTLP_ENDPOINT=https://otlp.nr-data.net:4318/v1/traces
OTEL_EXPORTER_OTLP_HEADERS_AUTH=api-key=YOUR_API_KEY
```

## API Middleware Usage

### Available Wrappers

```typescript
import { 
  withTracing,           // Generic tracing
  withLeadCaptureTracing, // Lead capture operations
  withPaymentTracing,     // Payment processing
  withAIAgentTracing,     // AI agent interactions
  withDatabaseTracing     // Database operations
} from '@/lib/telemetry/api-middleware';
```

### Example Implementation

```typescript
// Lead capture endpoint
async function handleLeadCapture(request: NextRequest) {
  const data = await request.json();
  return await leadService.capture(data);
}

export const POST = withLeadCaptureTracing(handleLeadCapture);

// Chat endpoint
async function handleChat(request: NextRequest) {
  const { message } = await request.json();
  return await aiService.processMessage(message);
}

export const POST = withAIAgentTracing(handleChat);
```

## Development vs Production

### Development
- Console exporter enabled by default
- Debug logging enabled
- 100% sampling ratio
- Detailed span attributes

### Production  
- OTLP exporter to monitoring service
- Error/warning logging only
- Smart sampling strategy
- Optimized span attributes

## Integration with Existing Systems

### Winston Logging
All log entries automatically include:
```json
{
  "message": "API Request",
  "traceId": "1234567890abcdef",
  "spanId": "abcdef1234567890",
  "traceUrl": "https://trace.vasquezlaw.com/trace/1234567890abcdef"
}
```

### Sentry Error Reporting
Errors include trace context:
```json
{
  "tags": { "traceId": "1234567890abcdef" },
  "contexts": {
    "trace": {
      "trace_id": "1234567890abcdef",
      "span_id": "abcdef1234567890"
    }
  }
}
```

### Response Headers
API responses include tracing headers:
```
x-trace-id: 1234567890abcdef
x-span-id: abcdef1234567890
x-request-id: req_timestamp_random
x-response-time: 150
```

## Troubleshooting

### Common Issues

#### 1. Traces Not Appearing
- Check `OTEL_EXPORTER_OTLP_ENDPOINT` configuration
- Verify authentication headers
- Ensure sampling ratio > 0

#### 2. Performance Impact
- Reduce sampling ratio for high-volume endpoints
- Disable detailed request/response logging
- Check exporter batch configuration

#### 3. Missing Trace Context
- Ensure API routes use middleware wrappers
- Check baggage propagation in async operations
- Verify instrumentation hook is enabled

### Debug Mode

Enable detailed logging:
```env
OTEL_DEBUG=true
OTEL_ENABLE_CONSOLE=true
```

### Health Check

Check telemetry configuration:
```typescript
import { checkTelemetryConfig } from '@/lib/telemetry';

const config = checkTelemetryConfig();
console.log(config);
// {
//   isConfigured: true,
//   exporters: ['console', 'otlp'],
//   warnings: []
// }
```

## Best Practices

### 1. Span Naming
- Use descriptive, consistent names
- Include operation type and resource
- Example: `vlf.lead_capture.contact_form`

### 2. Attribute Usage
- Use semantic conventions when possible
- Sanitize sensitive data
- Include business context

### 3. Error Handling
- Always record exceptions in spans
- Include error context and recovery info
- Don't throw if telemetry fails

### 4. Performance
- Use sampling for high-volume operations
- Batch span exports
- Monitor exporter performance

## Monitoring Dashboards

Recommended queries for observability:

### Lead Conversion Funnel
```
vlf.lead.source | group by vlf.lead.practice_area 
| count where vlf.lead.success = true
```

### Payment Processing Health
```
vlf.payment.gateway | group by vlf.payment.status
| avg(duration) | p99(duration)
```

### AI Agent Performance
```
vlf.ai.agent_type | group by vlf.ai.model
| avg(vlf.ai.response_time) | sum(vlf.ai.tokens_used)
```

### Performance SLA Tracking
```
vlf.performance.operation_type 
| count where vlf.performance.exceeded_threshold = true
| ratio vs total requests
```

## Compliance & Security

- **No PII in traces**: All sensitive data is sanitized
- **Secure transport**: OTLP over HTTPS only
- **Retention policies**: Configure based on data requirements
- **Access control**: Limit trace access to authorized personnel

## Support

For issues or questions:
1. Check the troubleshooting section
2. Review configuration in `.env.local`
3. Enable debug mode for detailed logging
4. Contact the development team with trace IDs