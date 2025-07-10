'use strict';
// Edge-compatible logger for middleware
// This logger doesn't use any Node.js APIs
Object.defineProperty(exports, '__esModule', { value: true });
exports.edgeLogger = void 0;
const logLevels = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3,
};
const currentLevel = process.env.NODE_ENV === 'production' ? 'info' : 'debug';
function shouldLog(level) {
  return logLevels[level] <= logLevels[currentLevel];
}
function formatLog(level, message, meta) {
  const timestamp = new Date().toISOString();
  const metaStr = meta ? ` ${JSON.stringify(meta)}` : '';
  return `[${timestamp}] [${level.toUpperCase()}] ${message}${metaStr}`;
}
exports.edgeLogger = {
  error: (message, meta) => {
    if (shouldLog('error')) {
      console.error(formatLog('error', message, meta));
    }
  },
  warn: (message, meta) => {
    if (shouldLog('warn')) {
      console.warn(formatLog('warn', message, meta));
    }
  },
  info: (message, meta) => {
    if (shouldLog('info')) {
      console.info(formatLog('info', message, meta));
    }
  },
  debug: (message, meta) => {
    if (shouldLog('debug')) {
      console.log(formatLog('debug', message, meta));
    }
  },
};
exports.default = exports.edgeLogger;
