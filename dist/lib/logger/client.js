'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.requestLogger =
  exports.componentLogger =
  exports.userFlowLogger =
  exports.securityLogger =
  exports.apiLogger =
  exports.performanceLogger =
    void 0;
// Client-safe logger that doesn't use filesystem APIs
const isDevelopment = process.env.NODE_ENV === 'development';
const logLevels = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3,
};
class ClientLogger {
  constructor() {
    this.level = isDevelopment ? 'debug' : 'warn';
  }
  shouldLog(level) {
    return logLevels[level] <= logLevels[this.level];
  }
  formatMessage(level, message, meta) {
    const timestamp = new Date().toISOString();
    const metaStr = meta ? ` ${JSON.stringify(meta)}` : '';
    return `[${timestamp}] [${level.toUpperCase()}] ${message}${metaStr}`;
  }
  error(message, meta) {
    if (this.shouldLog('error')) {
      console.error(this.formatMessage('error', message, meta));
    }
  }
  warn(message, meta) {
    if (this.shouldLog('warn')) {
      console.warn(this.formatMessage('warn', message, meta));
    }
  }
  info(message, meta) {
    if (this.shouldLog('info')) {
      console.info(this.formatMessage('info', message, meta));
    }
  }
  debug(message, meta) {
    if (this.shouldLog('debug')) {
      console.log(this.formatMessage('debug', message, meta));
    }
  }
  // Child logger for compatibility
  child(meta) {
    return this; // In client, we don't need separate child loggers
  }
}
// Export singleton instance
const logger = new ClientLogger();
exports.default = logger;
// Also export specific logging utilities for compatibility
exports.performanceLogger = {
  logRender: (componentName, duration, meta) => {
    logger.debug(`Component render: ${componentName}`, { duration, ...(meta || {}) });
  },
  logMount: (componentName, meta) => {
    logger.debug(`Component mount: ${componentName}`, meta);
  },
  logUnmount: (componentName, meta) => {
    logger.debug(`Component unmount: ${componentName}`, meta);
  },
  logStateChange: (componentName, prevState, nextState) => {
    logger.debug(`State change: ${componentName}`, { prevState, nextState });
  },
  logPropChange: (componentName, propName, prevValue, nextValue) => {
    logger.debug(`Prop change: ${componentName}.${propName}`, { prevValue, nextValue });
  },
  logRerender: (componentName, reason, meta) => {
    logger.debug(`Component rerender: ${componentName}`, { reason, ...(meta || {}) });
  },
  stateChange: (componentName, previousState, newState, trigger) => {
    logger.debug(`State change: ${componentName}`, { previousState, newState, trigger });
  },
  mount: (componentName, props) => {
    logger.debug(`Component mount: ${componentName}`, { props });
  },
  unmount: componentName => {
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
exports.apiLogger = {
  request: (endpoint, method, payload, headers) => {
    const requestId = Math.random().toString(36).substring(7);
    logger.info(`API Request: ${method} ${endpoint}`, { requestId, payload, headers });
    return requestId;
  },
  response: (requestId, status, duration, data) => {
    logger.info(`API Response`, { requestId, status, duration, data });
  },
  error: (requestId, error, retry) => {
    logger.error(`API Error`, { requestId, error: error.message || error, retry });
  },
  info: (message, meta) => {
    logger.info(message, meta);
  },
};
exports.securityLogger = {
  logAccess: (userId, resource, action, allowed) => {
    logger.info(`Access attempt`, { userId, resource, action, allowed });
  },
  logSuspiciousActivity: (userId, activity, metadata) => {
    logger.warn(`Suspicious activity`, { userId, activity, ...(metadata || {}) });
  },
  suspiciousActivity: (activity, metadata) => {
    logger.warn(`Suspicious activity: ${activity}`, metadata);
  },
  accessDenied: (resource, userId, reason) => {
    logger.warn(`Access denied`, { resource, userId, reason });
  },
  accessGranted: (resource, userId) => {
    logger.info(`Access granted`, { resource, userId });
  },
  authenticationFailure: (method, identifier, reason) => {
    logger.warn(`Authentication failure`, { method, identifier, reason });
  },
  authenticationSuccess: (method, userId) => {
    logger.info(`Authentication success`, { method, userId });
  },
};
exports.userFlowLogger = {
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
// Additional exports for compatibility
exports.componentLogger = exports.performanceLogger;
exports.requestLogger = exports.apiLogger;
