// Logger type definitions

export interface LogMeta {
  [key: string]: unknown;
  traceId?: string;
  spanId?: string;
  timestamp?: string;
  requestId?: string;
  component?: string;
  category?: string;
}

export interface Logger {
  error(message: string, meta?: LogMeta): void;
  warn(message: string, meta?: LogMeta): void;
  info(message: string, meta?: LogMeta): void;
  http?(message: string, meta?: LogMeta): void;
  verbose?(message: string, meta?: LogMeta): void;
  debug(message: string, meta?: LogMeta): void;
  silly?(message: string, meta?: LogMeta): void;
}

export interface APILogger {
  request(
    endpoint: string,
    method: string,
    payload?: unknown,
    headers?: Record<string, unknown>
  ): string;
  response(
    requestId: string,
    statusCode: number,
    responseTime: number,
    data?: unknown,
    error?: unknown
  ): void;
  error(error: Error, context?: LogMeta): void;
}

export interface SecurityLogger {
  accessGranted(userId: string, resource: string, action: string, metadata?: LogMeta): void;
  accessDenied(userId: string, resource: string, action: string, reason: string, metadata?: LogMeta): void;
  authFailure(username: string, reason: string, ipAddress?: string, metadata?: LogMeta): void;
  authSuccess(userId: string, method: string, metadata?: LogMeta): void;
  suspiciousActivity(description: string, severity: 'low' | 'medium' | 'high' | 'critical', metadata?: LogMeta): void;
  ipBlocked(ipAddress: string, reason: string, duration?: number): void;
  rateLimitExceeded(identifier: string, limit: number, window: string): void;
}

export interface PerformanceLogger {
  operationStart(operationName: string, metadata?: LogMeta): string;
  operationEnd(operationId: string, duration?: number, metadata?: LogMeta): void;
  dbQuery(query: string, duration: number, metadata?: LogMeta): void;
  apiCall(endpoint: string, method: string, duration: number, statusCode?: number, metadata?: LogMeta): void;
  slowOperation(operationName: string, duration: number, threshold: number, metadata?: LogMeta): void;
  resourceUsage(cpu: number, memory: number, metadata?: LogMeta): void;
}

export interface WSLogger {
  connection(clientId: string, metadata?: LogMeta): void;
  disconnect(clientId: string, reason?: string, metadata?: LogMeta): void;
  message(clientId: string, type: string, direction: 'in' | 'out', size?: number, metadata?: LogMeta): void;
  error(clientId: string, error: Error, metadata?: LogMeta): void;
  broadcast(eventType: string, recipientCount: number, metadata?: LogMeta): void;
}

export interface DBLogger {
  query(sql: string, params?: unknown[], duration?: number, metadata?: LogMeta): void;
  connection(event: 'opened' | 'closed' | 'error', metadata?: LogMeta): void;
  transaction(action: 'start' | 'commit' | 'rollback', transactionId?: string, metadata?: LogMeta): void;
  migration(name: string, direction: 'up' | 'down', duration?: number, metadata?: LogMeta): void;
  error(error: Error, query?: string, metadata?: LogMeta): void;
}

export interface ComponentLogger {
  info(component: string, message: string, data?: LogMeta): void;
  error(component: string, error: Error | string, data?: LogMeta): void;
  warn(component: string, message: string, data?: LogMeta): void;
  debug(component: string, message: string, data?: LogMeta): void;
}

// Winston-specific types
export interface WinstonLogInfo {
  level: string;
  message: string;
  [key: string]: unknown;
}

export interface WinstonFormat {
  (info: WinstonLogInfo): WinstonLogInfo;
}