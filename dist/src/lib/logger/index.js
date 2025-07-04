'use strict';
var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.userFlowLogger =
  exports.requestLogger =
  exports.componentLogger =
  exports.dbLogger =
  exports.wsLogger =
  exports.performanceLogger =
  exports.securityLogger =
  exports.apiLogger =
  exports.logger =
    void 0;
// Dynamic logger that uses Winston on server and console on client
var logger;
var apiLogger;
var securityLogger;
var performanceLogger;
var wsLogger;
var dbLogger;
if (typeof window === 'undefined') {
  // Server-side: Use Winston
  var winston = require('winston');
  var isDevelopment = process.env.NODE_ENV === 'development';
  var isProduction = process.env.NODE_ENV === 'production';
  // Winston logger configuration
  exports.logger = logger = winston.createLogger({
    level: isDevelopment ? 'debug' : 'info',
    format: winston.format.combine(
      winston.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss',
      }),
      winston.format.errors({ stack: true }),
      winston.format.splat(),
      winston.format.json()
    ),
    defaultMeta: { service: 'vasquez-law-website' },
    transports: [
      new winston.transports.Console({
        format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
      }),
    ],
  });
  // Add file transport in production
  if (isProduction) {
    logger.add(
      new winston.transports.File({
        filename: 'logs/error.log',
        level: 'error',
        maxsize: 5242880, // 5MB
        maxFiles: 5,
      })
    );
    logger.add(
      new winston.transports.File({
        filename: 'logs/combined.log',
        maxsize: 5242880, // 5MB
        maxFiles: 5,
      })
    );
  }
  // API Logger
  exports.apiLogger = apiLogger = {
    request: function (endpoint, method, payload, headers) {
      var requestId = generateRequestId();
      logger.info('API Request', {
        requestId: requestId,
        endpoint: endpoint,
        method: method,
        payload: sanitizePayload(payload),
        headers: sanitizeHeaders(headers),
        timestamp: new Date().toISOString(),
      });
      return requestId;
    },
    response: function (requestId, status, duration, data) {
      logger.info('API Response', {
        requestId: requestId,
        status: status,
        duration: duration,
        responseSize: data ? JSON.stringify(data).length : 0,
        timestamp: new Date().toISOString(),
      });
    },
    error: function (requestId, error, retry) {
      logger.error('API Error', {
        requestId: requestId,
        error: {
          message: error.message,
          stack: error.stack,
          code: error.code,
        },
        retry: retry,
        timestamp: new Date().toISOString(),
      });
    },
    info: function (message, meta) {
      logger.info(message, meta);
    },
  };
  // Security Logger
  exports.securityLogger = securityLogger = {
    suspiciousActivity: function (activity, metadata) {
      logger.warn('Suspicious activity detected', {
        activity: activity,
        metadata: metadata,
        timestamp: new Date().toISOString(),
      });
    },
    accessDenied: function (resource, userId, reason) {
      logger.warn('Access denied', {
        resource: resource,
        userId: userId,
        reason: reason,
        timestamp: new Date().toISOString(),
      });
    },
    accessGranted: function (resource, userId) {
      logger.info('Access granted', {
        resource: resource,
        userId: userId,
        timestamp: new Date().toISOString(),
      });
    },
    authenticationFailure: function (method, identifier, reason) {
      logger.warn('Authentication failure', {
        method: method,
        identifier: identifier,
        reason: reason,
        timestamp: new Date().toISOString(),
      });
    },
    authenticationSuccess: function (method, userId) {
      logger.info('Authentication success', {
        method: method,
        userId: userId,
        timestamp: new Date().toISOString(),
      });
    },
  };
  // Performance Logger
  exports.performanceLogger = performanceLogger = {
    measure: function (operation, duration, metadata) {
      logger.info('Performance measurement', {
        operation: operation,
        duration: duration,
        metadata: metadata,
        timestamp: new Date().toISOString(),
      });
    },
    slowOperation: function (operation, duration, threshold) {
      logger.warn('Slow operation detected', {
        operation: operation,
        duration: duration,
        threshold: threshold,
        timestamp: new Date().toISOString(),
      });
    },
    memoryUsage: function () {
      var usage = process.memoryUsage();
      logger.info('Memory usage', {
        heapUsed: Math.round(usage.heapUsed / 1024 / 1024) + ' MB',
        heapTotal: Math.round(usage.heapTotal / 1024 / 1024) + ' MB',
        rss: Math.round(usage.rss / 1024 / 1024) + ' MB',
        timestamp: new Date().toISOString(),
      });
    },
    // Additional methods for component tracking
    stateChange: function (componentName, previousState, newState, trigger) {
      logger.debug('State change: '.concat(componentName), {
        previousState: previousState,
        newState: newState,
        trigger: trigger,
      });
    },
    mount: function (componentName, props) {
      logger.debug('Component mount: '.concat(componentName), { props: props });
    },
    unmount: function (componentName) {
      logger.debug('Component unmount: '.concat(componentName));
    },
    rerender: function (componentName, reason, changes) {
      logger.debug('Component rerender: '.concat(componentName), {
        reason: reason,
        changes: changes,
      });
    },
    propChange: function (componentName, propName, oldValue, newValue) {
      logger.debug('Prop change: '.concat(componentName, '.').concat(propName), {
        oldValue: oldValue,
        newValue: newValue,
      });
    },
    info: function (message, meta) {
      logger.info(message, meta);
    },
    error: function (message, meta) {
      logger.error(message, meta);
    },
  };
  // WebSocket Logger
  exports.wsLogger = wsLogger = {
    connection: function (clientId, metadata) {
      logger.info('WebSocket connection established', {
        clientId: clientId,
        metadata: metadata,
        timestamp: new Date().toISOString(),
      });
    },
    disconnection: function (clientId, reason, duration) {
      logger.info('WebSocket disconnected', {
        clientId: clientId,
        reason: reason,
        duration: duration,
        timestamp: new Date().toISOString(),
      });
    },
    message: function (clientId, type, direction, size) {
      logger.debug('WebSocket message', {
        clientId: clientId,
        type: type,
        direction: direction,
        size: size,
        timestamp: new Date().toISOString(),
      });
    },
    error: function (clientId, error) {
      logger.error('WebSocket error', {
        clientId: clientId,
        error: {
          message: error.message,
          code: error.code,
        },
        timestamp: new Date().toISOString(),
      });
    },
  };
  // Database Logger
  exports.dbLogger = dbLogger = {
    query: function (query, params, duration) {
      logger.debug('Database query', {
        query: query.substring(0, 500),
        paramCount: (params === null || params === void 0 ? void 0 : params.length) || 0,
        duration: duration,
        timestamp: new Date().toISOString(),
      });
    },
    error: function (operation, error) {
      logger.error('Database error', {
        operation: operation,
        error: {
          message: error.message,
          code: error.code,
          stack: error.stack,
        },
        timestamp: new Date().toISOString(),
      });
    },
    connection: function (status, metadata) {
      var level = status === 'error' ? 'error' : 'info';
      logger[level]('Database connection status', {
        status: status,
        metadata: metadata,
        timestamp: new Date().toISOString(),
      });
    },
    migration: function (name, status, error) {
      var level = status === 'error' ? 'error' : 'info';
      logger[level]('Database migration', {
        name: name,
        status: status,
        error: error ? { message: error.message, stack: error.stack } : null,
        timestamp: new Date().toISOString(),
      });
    },
    transaction: function (transactionId, status) {
      logger.info('Database transaction', {
        transactionId: transactionId,
        status: status,
        timestamp: new Date().toISOString(),
      });
    },
  };
} else {
  // Client-side: Use the client logger module
  var clientLogger = require('./client');
  exports.logger = logger = clientLogger.default;
  exports.apiLogger = apiLogger = clientLogger.apiLogger;
  exports.securityLogger = securityLogger = clientLogger.securityLogger;
  exports.performanceLogger = performanceLogger = clientLogger.performanceLogger;
  // Stub out server-only loggers
  exports.wsLogger = wsLogger = {
    connection: function () {},
    disconnection: function () {},
    message: function () {},
    error: function () {},
  };
  exports.dbLogger = dbLogger = {
    query: function () {},
    error: function () {},
    connection: function () {},
    migration: function () {},
    transaction: function () {},
  };
}
// Helper functions
function generateRequestId() {
  return 'req_'.concat(Date.now(), '_').concat(Math.random().toString(36).substr(2, 9));
}
function sanitizePayload(payload) {
  if (!payload) return null;
  var sensitiveFields = ['password', 'token', 'apiKey', 'ssn', 'creditCard'];
  var sanitized = __assign({}, payload);
  sensitiveFields.forEach(function (field) {
    if (sanitized[field]) {
      sanitized[field] = '[REDACTED]';
    }
  });
  return sanitized;
}
function sanitizeHeaders(headers) {
  if (!headers) return null;
  var sensitiveHeaders = ['authorization', 'cookie', 'x-api-key'];
  var sanitized = __assign({}, headers);
  sensitiveHeaders.forEach(function (header) {
    if (sanitized[header]) {
      sanitized[header] = '[REDACTED]';
    }
  });
  return sanitized;
}
// Additional exports for compatibility
var componentLogger = performanceLogger;
exports.componentLogger = componentLogger;
var requestLogger = apiLogger;
exports.requestLogger = requestLogger;
var userFlowLogger = {
  startFlow: function (flowName, userId) {
    logger.info('User flow started: '.concat(flowName), { userId: userId });
  },
  endFlow: function (flowName, userId, success) {
    logger.info('User flow ended: '.concat(flowName), { userId: userId, success: success });
  },
  flowStep: function (flowName, step, userId) {
    logger.info('User flow step: '.concat(flowName, ' - ').concat(step), { userId: userId });
  },
};
exports.userFlowLogger = userFlowLogger;
exports.default = logger;
