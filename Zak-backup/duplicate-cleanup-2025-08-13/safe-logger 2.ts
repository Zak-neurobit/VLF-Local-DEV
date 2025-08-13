/**
 * Unified Safe Logger for VLF Website
 * Works in all environments: Node.js, Edge Runtime, and Browser
 * Consolidates all logging functionality into a single module
 */

// Type definitions for better type safety
export interface LogContext {
  [key: string]: unknown;
}

interface BaseLogger {
  info: (message: string, ...args: any[]) => void;
  error: (message: string, ...args: any[]) => void;
  warn: (message: string, ...args: any[]) => void;
  debug: (message: string, ...args: any[]) => void;
  log: (message: string, ...args: any[]) => void;
}

// Check runtime environment
const isEdgeRuntime = (): boolean => {
  return (
    (typeof globalThis !== 'undefined' && 'EdgeRuntime' in globalThis) ||
    process.env.NEXT_RUNTIME === 'edge'
  );
};

const isBrowser = typeof window !== 'undefined';
const isDevelopment = process.env.NODE_ENV === 'development';
const isTest = process.env.NODE_ENV === 'test';

// Helper to format timestamps
const getTimestamp = (): string => {
  return new Date().toISOString();
};

// Helper to format log messages with consistent structure
const formatMessage = (prefix: string, level: string, message: string, context?: LogContext): string => {
  const timestamp = getTimestamp();
  const contextStr = context ? ` ${JSON.stringify(context)}` : '';
  return `[${timestamp}] [${prefix}:${level}] ${message}${contextStr}`;
};

// Helper to sanitize sensitive data
const sanitizePayload = (payload: unknown): unknown => {
  if (!payload || typeof payload !== 'object') return payload;

  const sensitiveFields = ['password', 'token', 'apiKey', 'ssn', 'creditCard', 'secret'];
  const sanitized = { ...(payload as Record<string, unknown>) };

  sensitiveFields.forEach(field => {
    if (field in sanitized) {
      sanitized[field] = '[REDACTED]';
    }
  });

  return sanitized;
};

// Helper to sanitize headers
const sanitizeHeaders = (headers: unknown): unknown => {
  if (!headers || typeof headers !== 'object') return headers;

  const sensitiveHeaders = ['authorization', 'cookie', 'x-api-key', 'api-key'];
  const sanitized = { ...(headers as Record<string, unknown>) };

  sensitiveHeaders.forEach(header => {
    const lowerHeader = header.toLowerCase();
    Object.keys(sanitized).forEach(key => {
      if (key.toLowerCase() === lowerHeader) {
        sanitized[key] = '[REDACTED]';
      }
    });
  });

  return sanitized;
};

// Enhanced logger factory with all features
const createLogger = (prefix: string) => {
  // Determine appropriate log level
  const shouldLog = (level: string): boolean => {
    if (isTest) return false;
    if (isDevelopment) return true;
    
    const logLevels = { error: 0, warn: 1, info: 2, debug: 3 };
    const currentLevel = process.env.LOG_LEVEL || 'info';
    const levelValue = logLevels[level as keyof typeof logLevels] ?? 2;
    const currentValue = logLevels[currentLevel as keyof typeof logLevels] ?? 2;
    
    return levelValue <= currentValue;
  };

  // Base logging methods with enhanced formatting
  const baseLogger: BaseLogger = {
    info: (message: string, ...args: any[]) => {
      if (shouldLog('info')) {
        console.log(formatMessage(prefix, 'INFO', message), ...args);
      }
    },
    error: (message: string, ...args: any[]) => {
      if (shouldLog('error')) {
        // Handle Error objects specially
        if (args[0] instanceof Error) {
          const error = args[0];
          console.error(formatMessage(prefix, 'ERROR', message, {
            name: error.name,
            message: error.message,
            stack: error.stack,
          }));
        } else {
          console.error(formatMessage(prefix, 'ERROR', message), ...args);
        }
      }
    },
    warn: (message: string, ...args: any[]) => {
      if (shouldLog('warn')) {
        console.warn(formatMessage(prefix, 'WARN', message), ...args);
      }
    },
    debug: (message: string, ...args: any[]) => {
      if (shouldLog('debug')) {
        console.debug(formatMessage(prefix, 'DEBUG', message), ...args);
      }
    },
    log: (message: string, ...args: any[]) => {
      console.log(`[${prefix}] ${message}`, ...args);
    },
  };

  // Return full-featured logger
  return {
    ...baseLogger,
    
    // Performance monitoring
    measure: (label: string, duration: number, metadata?: any) => {
      baseLogger.info(`Performance: ${label}`, { duration: `${duration}ms`, metadata });
    },
    
    slowOperation: (operation: string, duration: number, threshold: number, metadata?: any) => {
      baseLogger.warn(`Slow operation: ${operation}`, { 
        duration: `${duration}ms`, 
        threshold: `${threshold}ms`, 
        metadata 
      });
    },
    
    memoryUsage: () => {
      if (!isBrowser && process?.memoryUsage) {
        const usage = process.memoryUsage();
        baseLogger.info('Memory usage', {
          heapUsed: Math.round(usage.heapUsed / 1024 / 1024) + ' MB',
          heapTotal: Math.round(usage.heapTotal / 1024 / 1024) + ' MB',
          rss: Math.round(usage.rss / 1024 / 1024) + ' MB',
        });
      }
    },
    
    // WebSocket operations
    connection: (clientId: string, metadata?: any) => {
      baseLogger.info('WebSocket connection', { clientId, metadata });
    },
    
    disconnection: (clientId: string, reason: string, duration?: number) => {
      baseLogger.info('WebSocket disconnection', { clientId, reason, duration });
    },
    
    message: (clientId: string, type: string, direction: 'inbound' | 'outbound', size?: number) => {
      baseLogger.debug('WebSocket message', { clientId, type, direction, size });
    },
    
    // Security operations
    suspiciousActivity: (activity: string, metadata?: any) => {
      baseLogger.warn('Suspicious activity', { activity, metadata });
    },
    
    authenticationSuccess: (method: string, userId: string) => {
      baseLogger.info('Authentication success', { method, userId });
    },
    
    authenticationFailure: (method: string, identifier?: string, reason?: string) => {
      baseLogger.warn('Authentication failure', { method, identifier, reason });
    },
    
    accessGranted: (resource: string, userId?: string) => {
      baseLogger.info('Access granted', { resource, userId });
    },
    
    accessDenied: (resource: string, userId?: string, reason?: string) => {
      baseLogger.warn('Access denied', { resource, userId, reason });
    },
    
    // User flow tracking
    flowStep: (flowName: string, step: string, userId?: string) => {
      baseLogger.info('User flow step', { flowName, step, userId });
    },
    
    // Component lifecycle (React)
    mount: (component: string, props?: any) => {
      baseLogger.debug('Component mount', { component, props: sanitizePayload(props) });
    },
    
    unmount: (component: string) => {
      baseLogger.debug('Component unmount', { component });
    },
    
    stateChange: (component: string, state: string, value: any, reason?: string) => {
      baseLogger.debug('State change', { component, state, value: sanitizePayload(value), reason });
    },
    
    event: (component: string, event: string, data?: any) => {
      baseLogger.debug('Component event', { component, event, data: sanitizePayload(data) });
    },
    
    rerender: (component: string, reason: string, changes?: any) => {
      baseLogger.debug('Component rerender', { component, reason, changes });
    },
    
    propChange: (component: string, propName: string, oldValue: any, newValue: any) => {
      baseLogger.debug('Prop change', { 
        component, 
        propName, 
        oldValue: sanitizePayload(oldValue), 
        newValue: sanitizePayload(newValue) 
      });
    },
    
    // Database operations
    query: (query: string, params?: any[], duration?: number) => {
      baseLogger.debug('Database query', { 
        query: query.substring(0, 500), 
        paramCount: params?.length || 0, 
        duration: duration ? `${duration}ms` : undefined 
      });
    },
    
    transaction: (transactionId: string, status: string) => {
      baseLogger.info('Database transaction', { transactionId, status });
    },
    
    migration: (name: string, status: string, error?: any) => {
      const level = status === 'error' ? 'error' : 'info';
      baseLogger[level]('Database migration', { name, status, error });
    },
    
    // API operations
    request: (endpoint: string, method: string, payload?: any, headers?: any) => {
      const requestId = `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      baseLogger.info('API request', { 
        requestId, 
        method, 
        endpoint, 
        payload: sanitizePayload(payload), 
        headers: sanitizeHeaders(headers) 
      });
      return requestId;
    },
    
    response: (requestId: string, status: number, duration: number, data?: any) => {
      baseLogger.info('API response', { 
        requestId, 
        status, 
        duration: `${duration}ms`, 
        dataSize: data ? JSON.stringify(data).length : 0 
      });
    },
    
    // Business events
    businessEvent: (event: string, details: Record<string, unknown>) => {
      baseLogger.info(`Business event: ${event}`, sanitizePayload(details));
    },
    
    // Create child logger with additional context
    child: (childPrefix: string) => createLogger(`${prefix}:${childPrefix}`),
  };
};

// Pre-configured loggers for different components
export const logger = createLogger('GENERAL');
export const apiLogger = createLogger('API');
export const securityLogger = createLogger('SECURITY');
export const performanceLogger = createLogger('PERFORMANCE');
export const wsLogger = createLogger('WEBSOCKET');
export const dbLogger = createLogger('DATABASE');
export const componentLogger = createLogger('COMPONENT');
export const userFlowLogger = createLogger('USER_FLOW');
export const paymentLogger = createLogger('PAYMENT');
export const requestLogger = apiLogger; // Alias for compatibility
export const aiLogger = createLogger('AI');
export const leadLogger = createLogger('LEAD');

// Extend LogContext with specific fields for helper functions
export interface ExtendedLogContext extends LogContext {
  userId?: string;
  requestId?: string;
  sessionId?: string;
  leadId?: string;
  paymentId?: string;
}

export const createContextualLogger = (context: LogContext) => {
  const contextStr = Object.entries(context)
    .map(([key, value]) => `${key}=${value}`)
    .join(' ');
  return createLogger(`CONTEXT[${contextStr}]`);
};

export const logApiRequest = (req: Request, res: Response, duration: number) => {
  apiLogger.info('API request completed', {
    method: req.method,
    url: req.url,
    status: res.status,
    duration: `${duration}ms`,
    userAgent: req.headers.get('user-agent'),
    ip: req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip'),
  });
};

export const logDatabaseQuery = (query: string, duration: number, params?: unknown[]) => {
  dbLogger.query(query, params as any[], duration);
};

export const logSecurityEvent = (event: string, details: Record<string, unknown>) => {
  securityLogger.warn(event, sanitizePayload(details));
};

export const logPerformanceMetric = (metric: string, value: number, unit: string = 'ms') => {
  performanceLogger.measure(metric, value, { unit });
};

export const logError = (error: Error, context?: Record<string, unknown>) => {
  logger.error('Application error', error, context);
};

export const logBusinessEvent = (event: string, details: Record<string, unknown>) => {
  logger.businessEvent(event, details);
};

// Error to log metadata helper
export const errorToLogMeta = (error: unknown): Record<string, unknown> => {
  if (error instanceof Error) {
    return {
      message: error.message,
      name: error.name,
      stack: error.stack,
      // Include any custom error properties
      ...(error as any),
    };
  }
  
  if (typeof error === 'object' && error !== null) {
    return error as Record<string, unknown>;
  }
  
  return {
    message: String(error),
    type: typeof error,
  };
};

// Export enhanced version for compatibility
export const createErrorLogMeta = (error: unknown, context?: Record<string, unknown>): Record<string, unknown> => {
  const errorMeta = errorToLogMeta(error);
  return context ? { ...errorMeta, ...context } : errorMeta;
};

// Export default logger
export default logger;