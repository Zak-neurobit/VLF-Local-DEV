"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userFlowLogger = exports.requestLogger = exports.componentLogger = exports.dbLogger = exports.wsLogger = exports.performanceLogger = exports.securityLogger = exports.apiLogger = exports.logger = void 0;
// Dynamic logger that uses Winston on server and console on client
let logger;
let apiLogger;
let securityLogger;
let performanceLogger;
let wsLogger;
let dbLogger;
// Check if we're in Edge runtime (middleware)
const isEdgeRuntime = typeof globalThis.EdgeRuntime !== 'undefined' ||
    globalThis.EdgeRuntime !== undefined;
if (typeof window === 'undefined' && !isEdgeRuntime) {
    // Server-side (Node.js): Use Winston
    const winston = require('winston');
    const isDevelopment = process.env.NODE_ENV === 'development';
    const isProduction = process.env.NODE_ENV === 'production';
    // Winston logger configuration
    exports.logger = logger = winston.createLogger({
        level: isDevelopment ? 'debug' : 'info',
        format: winston.format.combine(winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss',
        }), winston.format.errors({ stack: true }), winston.format.splat(), winston.format.json()),
        defaultMeta: { service: 'vasquez-law-website' },
        transports: [
            new winston.transports.Console({
                format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
            }),
        ],
    });
    // Add file transport in production
    if (isProduction) {
        logger.add(new winston.transports.File({
            filename: 'logs/error.log',
            level: 'error',
            maxsize: 5242880, // 5MB
            maxFiles: 5,
        }));
        logger.add(new winston.transports.File({
            filename: 'logs/combined.log',
            maxsize: 5242880, // 5MB
            maxFiles: 5,
        }));
    }
    // API Logger
    exports.apiLogger = apiLogger = {
        request: (endpoint, method, payload, headers) => {
            const requestId = generateRequestId();
            logger.info('API Request', {
                requestId,
                endpoint,
                method,
                payload: sanitizePayload(payload),
                headers: sanitizeHeaders(headers),
                timestamp: new Date().toISOString(),
            });
            return requestId;
        },
        response: (requestId, status, duration, data) => {
            logger.info('API Response', {
                requestId,
                status,
                duration,
                responseSize: data ? JSON.stringify(data).length : 0,
                timestamp: new Date().toISOString(),
            });
        },
        error: (requestId, error, retry) => {
            logger.error('API Error', {
                requestId,
                error: {
                    message: error.message,
                    stack: error.stack,
                    code: error.code,
                },
                retry,
                timestamp: new Date().toISOString(),
            });
        },
        info: (message, meta) => {
            logger.info(message, meta);
        },
    };
    // Security Logger
    exports.securityLogger = securityLogger = {
        suspiciousActivity: (activity, metadata) => {
            logger.warn('Suspicious activity detected', {
                activity,
                metadata,
                timestamp: new Date().toISOString(),
            });
        },
        accessDenied: (resource, userId, reason) => {
            logger.warn('Access denied', {
                resource,
                userId,
                reason,
                timestamp: new Date().toISOString(),
            });
        },
        accessGranted: (resource, userId) => {
            logger.info('Access granted', {
                resource,
                userId,
                timestamp: new Date().toISOString(),
            });
        },
        authenticationFailure: (method, identifier, reason) => {
            logger.warn('Authentication failure', {
                method,
                identifier,
                reason,
                timestamp: new Date().toISOString(),
            });
        },
        authenticationSuccess: (method, userId) => {
            logger.info('Authentication success', {
                method,
                userId,
                timestamp: new Date().toISOString(),
            });
        },
    };
    // Performance Logger
    exports.performanceLogger = performanceLogger = {
        measure: (operation, duration, metadata) => {
            logger.info('Performance measurement', {
                operation,
                duration,
                metadata,
                timestamp: new Date().toISOString(),
            });
        },
        slowOperation: (operation, duration, threshold) => {
            logger.warn('Slow operation detected', {
                operation,
                duration,
                threshold,
                timestamp: new Date().toISOString(),
            });
        },
        memoryUsage: () => {
            const usage = process.memoryUsage();
            logger.info('Memory usage', {
                heapUsed: Math.round(usage.heapUsed / 1024 / 1024) + ' MB',
                heapTotal: Math.round(usage.heapTotal / 1024 / 1024) + ' MB',
                rss: Math.round(usage.rss / 1024 / 1024) + ' MB',
                timestamp: new Date().toISOString(),
            });
        },
        // Additional methods for component tracking
        stateChange: (componentName, previousState, newState, trigger) => {
            logger.debug(`State change: ${componentName}`, { previousState, newState, trigger });
        },
        mount: (componentName, props) => {
            logger.debug(`Component mount: ${componentName}`, { props });
        },
        unmount: (componentName) => {
            logger.debug(`Component unmount: ${componentName}`);
        },
        rerender: (componentName, reason, changes) => {
            logger.debug(`Component rerender: ${componentName}`, { reason, changes });
        },
        propChange: (componentName, propName, oldValue, newValue) => {
            logger.debug(`Prop change: ${componentName}.${propName}`, { oldValue, newValue });
        },
        info: (message, meta) => {
            logger.info(message, meta);
        },
        error: (message, meta) => {
            logger.error(message, meta);
        },
    };
    // WebSocket Logger
    exports.wsLogger = wsLogger = {
        connection: (clientId, metadata) => {
            logger.info('WebSocket connection established', {
                clientId,
                metadata,
                timestamp: new Date().toISOString(),
            });
        },
        disconnection: (clientId, reason, duration) => {
            logger.info('WebSocket disconnected', {
                clientId,
                reason,
                duration,
                timestamp: new Date().toISOString(),
            });
        },
        message: (clientId, type, direction, size) => {
            logger.debug('WebSocket message', {
                clientId,
                type,
                direction,
                size,
                timestamp: new Date().toISOString(),
            });
        },
        error: (clientId, error) => {
            logger.error('WebSocket error', {
                clientId,
                error: error instanceof Error
                    ? {
                        message: error.message,
                        code: error.code,
                    }
                    : { message: String(error) },
                timestamp: new Date().toISOString(),
            });
        },
        info: (clientId, message) => {
            logger.info('WebSocket info', {
                clientId,
                message,
                timestamp: new Date().toISOString(),
            });
        },
        warn: (clientId, message) => {
            logger.warn('WebSocket warning', {
                clientId,
                message,
                timestamp: new Date().toISOString(),
            });
        },
    };
    // Database Logger
    exports.dbLogger = dbLogger = {
        query: (query, params, duration) => {
            logger.debug('Database query', {
                query: query.substring(0, 500),
                paramCount: params?.length || 0,
                duration,
                timestamp: new Date().toISOString(),
            });
        },
        error: (operation, error) => {
            logger.error('Database error', {
                operation,
                error: error instanceof Error
                    ? {
                        message: error.message,
                        code: error.code,
                        stack: error.stack,
                    }
                    : { message: String(error) },
                timestamp: new Date().toISOString(),
            });
        },
        connection: (status, metadata) => {
            const level = status === 'error' ? 'error' : 'info';
            logger[level]('Database connection status', {
                status,
                metadata,
                timestamp: new Date().toISOString(),
            });
        },
        migration: (name, status, error) => {
            const level = status === 'error' ? 'error' : 'info';
            logger[level]('Database migration', {
                name,
                status,
                error: error instanceof Error
                    ? { message: error.message, stack: error.stack }
                    : error
                        ? { message: String(error) }
                        : null,
                timestamp: new Date().toISOString(),
            });
        },
        transaction: (transactionId, status) => {
            logger.info('Database transaction', {
                transactionId,
                status,
                timestamp: new Date().toISOString(),
            });
        },
    };
}
else if (isEdgeRuntime) {
    // Edge runtime: Use edge-compatible logger
    const edgeLogger = require('./edge');
    exports.logger = logger = edgeLogger.default || edgeLogger.edgeLogger;
    // Create compatible API interfaces
    exports.apiLogger = apiLogger = {
        request: (endpoint, method, payload, headers) => {
            const requestId = `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
            logger.info(`API Request: ${method} ${endpoint}`, { requestId });
            return requestId;
        },
        response: (requestId, status, duration, data) => {
            logger.info(`API Response: ${status} in ${duration}ms`, { requestId });
        },
        error: (requestId, error, retry) => {
            logger.error(`API Error`, { requestId, error: error.message || error });
        },
        info: (message, meta) => logger.info(message, meta),
    };
    exports.securityLogger = securityLogger = {
        suspiciousActivity: (activity, metadata) => logger.warn(`Suspicious activity: ${activity}`, metadata),
        accessDenied: (resource, userId, reason) => logger.warn(`Access denied: ${resource}`, { userId, reason }),
        accessGranted: (resource, userId) => logger.info(`Access granted: ${resource}`, { userId }),
        authenticationFailure: (method, identifier, reason) => logger.warn(`Auth failure: ${method}`, { identifier, reason }),
        authenticationSuccess: (method, userId) => logger.info(`Auth success: ${method}`, { userId }),
    };
    exports.performanceLogger = performanceLogger = {
        measure: (operation, duration, metadata) => logger.info(`Performance: ${operation} took ${duration}ms`, metadata),
        slowOperation: (operation, duration, threshold) => logger.warn(`Slow operation: ${operation} took ${duration}ms (threshold: ${threshold}ms)`),
        memoryUsage: () => { },
        stateChange: () => { },
        mount: () => { },
        unmount: () => { },
        rerender: () => { },
        propChange: () => { },
        info: (message, meta) => logger.info(message, meta),
        error: (message, meta) => logger.error(message, meta),
    };
    // Stub out server-only loggers
    exports.wsLogger = wsLogger = {
        connection: () => { },
        disconnection: () => { },
        message: () => { },
        error: () => { },
    };
    exports.dbLogger = dbLogger = {
        query: () => { },
        error: () => { },
        connection: () => { },
        migration: () => { },
        transaction: () => { },
    };
}
else {
    // Client-side: Use the client logger module
    const clientLogger = require('./client');
    exports.logger = logger = clientLogger.default;
    exports.apiLogger = apiLogger = clientLogger.apiLogger;
    exports.securityLogger = securityLogger = clientLogger.securityLogger;
    exports.performanceLogger = performanceLogger = clientLogger.performanceLogger;
    // Stub out server-only loggers
    exports.wsLogger = wsLogger = {
        connection: () => { },
        disconnection: () => { },
        message: () => { },
        error: () => { },
    };
    exports.dbLogger = dbLogger = {
        query: () => { },
        error: () => { },
        connection: () => { },
        migration: () => { },
        transaction: () => { },
    };
}
// Helper functions
function generateRequestId() {
    return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}
function sanitizePayload(payload) {
    if (!payload)
        return null;
    const sensitiveFields = ['password', 'token', 'apiKey', 'ssn', 'creditCard'];
    const sanitized = { ...payload };
    sensitiveFields.forEach(field => {
        if (sanitized[field]) {
            sanitized[field] = '[REDACTED]';
        }
    });
    return sanitized;
}
function sanitizeHeaders(headers) {
    if (!headers)
        return null;
    const sensitiveHeaders = ['authorization', 'cookie', 'x-api-key'];
    const sanitized = { ...headers };
    sensitiveHeaders.forEach(header => {
        if (sanitized[header]) {
            sanitized[header] = '[REDACTED]';
        }
    });
    return sanitized;
}
// Additional exports for compatibility
const componentLogger = performanceLogger;
exports.componentLogger = componentLogger;
const requestLogger = apiLogger;
exports.requestLogger = requestLogger;
const userFlowLogger = {
    startFlow: (flowName, userId) => {
        logger.info(`User flow started: ${flowName}`, { userId });
    },
    endFlow: (flowName, userId, success) => {
        logger.info(`User flow ended: ${flowName}`, { userId, success });
    },
    flowStep: (flowName, step, userId) => {
        logger.info(`User flow step: ${flowName} - ${step}`, { userId });
    },
};
exports.userFlowLogger = userFlowLogger;
exports.default = logger;
