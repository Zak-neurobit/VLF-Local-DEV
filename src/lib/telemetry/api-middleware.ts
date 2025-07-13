/**
 * OpenTelemetry API Middleware for Next.js Routes
 * Automatically instruments API endpoints with tracing
 */

import { NextRequest, NextResponse } from 'next/server';
import { vlfTelemetry } from './custom-spans';
import { apiLogger } from '@/lib/logger';

interface RouteHandler {
  (request: NextRequest, context?: { params: Record<string, string> }): Promise<NextResponse>;
}

interface TracingOptions {
  operationName?: string;
  includeRequestBody?: boolean;
  includeResponseBody?: boolean;
  samplingRate?: number;
  isBusinessCritical?: boolean;
}

/**
 * Wrap Next.js API route handlers with OpenTelemetry tracing
 */
export function withTracing(
  handler: RouteHandler,
  options: TracingOptions = {}
): RouteHandler {
  const {
    operationName,
    includeRequestBody = false,
    includeResponseBody = false,
    samplingRate = 1.0,
    isBusinessCritical = false,
  } = options;

  return async (request: NextRequest, context?: { params: Record<string, string> }) => {
    const startTime = Date.now();
    const method = request.method || 'GET';
    const pathname = new URL(request.url).pathname;
    const spanName = operationName || `${method} ${pathname}`;

    // Set user context from request
    await setUserContextFromRequest(request);

    // Determine operation type for custom tracing
    const operationType = getOperationType(pathname);

    if (operationType === 'lead_capture') {
      return vlfTelemetry.traceLeadCapture(
        spanName,
        await extractLeadCaptureAttributes(request, pathname),
        () => executeHandler(handler, request, context, {
          includeRequestBody,
          includeResponseBody,
          startTime,
          method,
          pathname,
        })
      );
    } else if (operationType === 'payment') {
      return vlfTelemetry.tracePayment(
        spanName,
        await extractPaymentAttributes(request, pathname),
        () => executeHandler(handler, request, context, {
          includeRequestBody,
          includeResponseBody,
          startTime,
          method,
          pathname,
        })
      );
    } else if (operationType === 'ai_agent') {
      return vlfTelemetry.traceAIAgent(
        spanName,
        await extractAIAgentAttributes(request, pathname),
        () => executeHandler(handler, request, context, {
          includeRequestBody,
          includeResponseBody,
          startTime,
          method,
          pathname,
        })
      );
    } else if (operationType === 'database') {
      return vlfTelemetry.traceDatabase(
        spanName,
        `API ${method} ${pathname}`,
        () => executeHandler(handler, request, context, {
          includeRequestBody,
          includeResponseBody,
          startTime,
          method,
          pathname,
        })
      );
    } else {
      // Generic external API tracing for other endpoints
      return vlfTelemetry.traceExternalAPI(
        'vlf-api',
        spanName,
        request.url,
        () => executeHandler(handler, request, context, {
          includeRequestBody,
          includeResponseBody,
          startTime,
          method,
          pathname,
        })
      );
    }
  };
}

async function executeHandler(
  handler: RouteHandler,
  request: NextRequest,
  context: { params: Record<string, string> } | undefined,
  options: {
    includeRequestBody: boolean;
    includeResponseBody: boolean;
    startTime: number;
    method: string;
    pathname: string;
  }
): Promise<NextResponse> {
  const { includeRequestBody, includeResponseBody, startTime, method, pathname } = options;

  // Log API request
  const requestId = apiLogger.request(
    pathname,
    method,
    includeRequestBody ? await getRequestBody(request) : undefined,
    Object.fromEntries(request.headers.entries())
  );

  try {
    // Execute the handler
    const response = await handler(request, context);
    
    const duration = Date.now() - startTime;
    
    // Log successful response
    apiLogger.response(
      requestId,
      response.status,
      duration,
      includeResponseBody ? await getResponseBody(response) : undefined
    );

    // Add custom headers for tracing
    const traceContext = vlfTelemetry.getTraceContext();
    if (traceContext) {
      response.headers.set('x-trace-id', traceContext.traceId);
      response.headers.set('x-span-id', traceContext.spanId);
    }
    
    response.headers.set('x-request-id', requestId);
    response.headers.set('x-response-time', duration.toString());

    return response;
  } catch (error) {
    const duration = Date.now() - startTime;
    
    // Log error response
    apiLogger.error(requestId, error);

    // Create error response
    const errorResponse = NextResponse.json(
      { 
        error: 'Internal Server Error',
        requestId,
        ...(process.env.NODE_ENV === 'development' && { 
          message: error instanceof Error ? error.message : String(error) 
        })
      },
      { status: 500 }
    );

    // Add tracing headers even to error responses
    const traceContext = vlfTelemetry.getTraceContext();
    if (traceContext) {
      errorResponse.headers.set('x-trace-id', traceContext.traceId);
      errorResponse.headers.set('x-span-id', traceContext.spanId);
    }
    
    errorResponse.headers.set('x-request-id', requestId);
    errorResponse.headers.set('x-response-time', duration.toString());

    return errorResponse;
  }
}

async function setUserContextFromRequest(request: NextRequest): Promise<void> {
  try {
    // Extract user context from various sources
    const userAgent = request.headers.get('user-agent') || 'unknown';
    const acceptLanguage = request.headers.get('accept-language') || 'unknown';
    const sessionId = request.headers.get('x-session-id') || request.cookies.get('session-id')?.value;
    const userId = request.headers.get('x-user-id') || request.cookies.get('user-id')?.value;
    
    // Determine language preference
    let language: 'en' | 'es' = 'en';
    if (acceptLanguage.includes('es') || request.url.includes('/es/')) {
      language = 'es';
    }

    // Set user context in baggage
    vlfTelemetry.setUserContext({
      userId,
      sessionId,
      language,
      location: request.geo?.country || 'unknown',
    });
  } catch (error) {
    // Silently continue if user context extraction fails
  }
}

function getOperationType(pathname: string): string {
  if (pathname.includes('/api/leads/') || pathname.includes('/api/contact')) {
    return 'lead_capture';
  }
  if (pathname.includes('/api/payment') || pathname.includes('/api/stripe') || pathname.includes('/api/lawpay')) {
    return 'payment';
  }
  if (pathname.includes('/api/chat') || pathname.includes('/api/ai') || pathname.includes('/api/crewai') || pathname.includes('/api/agents')) {
    return 'ai_agent';
  }
  if (pathname.includes('/api/cases') || pathname.includes('/api/dashboard') || pathname.includes('/api/auth')) {
    return 'database';
  }
  return 'generic';
}

async function extractLeadCaptureAttributes(request: NextRequest, pathname: string): Promise<any> {
  try {
    const body = await getRequestBody(request);
    return {
      source: body?.source || 'website',
      type: body?.type || 'contact_form',
      practiceArea: body?.practiceArea || 'general',
      urgency: body?.urgency || 'medium',
      language: body?.language || 'en',
      location: body?.location || request.geo?.country || 'unknown',
      valueScore: body?.valueScore || 50,
    };
  } catch (error) {
    return {
      source: 'website',
      type: 'contact_form',
      practiceArea: 'general',
      urgency: 'medium' as const,
      language: 'en' as const,
    };
  }
}

async function extractPaymentAttributes(request: NextRequest, pathname: string): Promise<any> {
  try {
    const body = await getRequestBody(request);
    return {
      method: body?.paymentMethod || 'unknown',
      amount: body?.amount || 0,
      currency: body?.currency || 'USD',
      gateway: pathname.includes('stripe') ? 'stripe' : pathname.includes('lawpay') ? 'lawpay' : 'authorize_net',
      caseId: body?.caseId,
      clientId: body?.clientId,
    };
  } catch (error) {
    return {
      method: 'unknown',
      amount: 0,
      currency: 'USD',
      gateway: 'unknown' as const,
    };
  }
}

async function extractAIAgentAttributes(request: NextRequest, pathname: string): Promise<any> {
  try {
    const body = await getRequestBody(request);
    return {
      agentType: pathname.includes('chat') ? 'chat' : pathname.includes('crewai') ? 'crewai' : 'agent',
      model: body?.model || 'gpt-3.5-turbo',
      conversationId: body?.sessionId || body?.conversationId,
      language: body?.language || 'en',
      intent: body?.intent,
      confidence: body?.confidence,
    };
  } catch (error) {
    return {
      agentType: 'unknown',
      model: 'unknown',
      language: 'en' as const,
    };
  }
}

async function getRequestBody(request: NextRequest): Promise<any> {
  try {
    // Clone the request to avoid consuming the body
    const clonedRequest = request.clone();
    const contentType = clonedRequest.headers.get('content-type') || '';
    
    if (contentType.includes('application/json')) {
      return await clonedRequest.json();
    } else if (contentType.includes('application/x-www-form-urlencoded')) {
      const formData = await clonedRequest.formData();
      return Object.fromEntries(formData.entries());
    }
    
    return null;
  } catch (error) {
    return null;
  }
}

async function getResponseBody(response: NextResponse): Promise<any> {
  try {
    // Clone the response to avoid consuming the body
    const clonedResponse = response.clone();
    const contentType = clonedResponse.headers.get('content-type') || '';
    
    if (contentType.includes('application/json')) {
      return await clonedResponse.json();
    }
    
    return null;
  } catch (error) {
    return null;
  }
}

/**
 * Convenience decorators for specific operation types
 */
export const withLeadCaptureTracing = (handler: RouteHandler) =>
  withTracing(handler, {
    operationName: 'lead_capture',
    includeRequestBody: true,
    isBusinessCritical: true,
  });

export const withPaymentTracing = (handler: RouteHandler) =>
  withTracing(handler, {
    operationName: 'payment_processing',
    includeRequestBody: true,
    isBusinessCritical: true,
  });

export const withAIAgentTracing = (handler: RouteHandler) =>
  withTracing(handler, {
    operationName: 'ai_agent_interaction',
    includeRequestBody: true,
    includeResponseBody: true,
    isBusinessCritical: true,
  });

export const withDatabaseTracing = (handler: RouteHandler) =>
  withTracing(handler, {
    operationName: 'database_operation',
    isBusinessCritical: true,
  });

export default withTracing;