/**
 * Safe Winston Logger Wrapper
 * 
 * This module provides a safe way to use Winston that handles
 * missing dependencies gracefully and falls back to console
 * logging if needed.
 */

import type { Logger } from '../../types/logger';

export function createSafeWinstonLogger(): Logger | null {
  try {
    // Try to require Winston and its dependencies
    const winston = require('winston');
    
    // Verify all required modules are available
    require('@dabh/diagnostics');
    require('logform');
    require('winston-transport');
    require('triple-beam');
    
    const isDevelopment = process.env.NODE_ENV === 'development';
    const isProduction = process.env.NODE_ENV === 'production';
    
    // Create Winston logger
    const logger = winston.createLogger({
      level: isDevelopment ? 'debug' : 'info',
      format: winston.format.combine(
        winston.format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),
        winston.format.errors({ stack: true }),
        winston.format.splat(),
        winston.format.json()
      ),
      defaultMeta: { service: 'vasquez-law-website', component: 'winston' },
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple()
          ),
        }),
      ],
    });
    
    // Add file transport in production
    if (isProduction) {
      // Create logs directory if it doesn't exist
      const fs = require('fs');
      const path = require('path');
      const logsDir = path.join(process.cwd(), 'logs');
      
      if (!fs.existsSync(logsDir)) {
        fs.mkdirSync(logsDir, { recursive: true });
      }
      
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
    
    return logger as Logger;
    
  } catch (error) {
    console.warn('⚠️  Winston logger initialization failed:', error);
    console.warn('⚠️  Falling back to console logger');
    console.warn('⚠️  Run "npm run fix:winston" to fix this issue');
    
    // Return null to indicate Winston is not available
    return null;
  }
}

/**
 * Create a console-based fallback logger that matches Winston's interface
 */
export function createConsoleFallbackLogger(): Logger {
  const logLevels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    verbose: 4,
    debug: 5,
    silly: 6,
  };
  
  const currentLevel = process.env.NODE_ENV === 'development' ? 'debug' : 'info';
  const currentLevelValue = logLevels[currentLevel as keyof typeof logLevels] || 2;
  
  const shouldLog = (level: string) => {
    const levelValue = logLevels[level as keyof typeof logLevels];
    return levelValue !== undefined && levelValue <= currentLevelValue;
  };
  
  const formatMessage = (level: string, message: string, meta?: any) => {
    const timestamp = new Date().toISOString();
    const metaStr = meta ? ` ${JSON.stringify(meta)}` : '';
    return `[${timestamp}] [${level.toUpperCase()}] ${message}${metaStr}`;
  };
  
  return {
    error: (message: string, meta?: any) => {
      if (shouldLog('error')) {
        console.error(formatMessage('error', message, meta));
      }
    },
    warn: (message: string, meta?: any) => {
      if (shouldLog('warn')) {
        console.warn(formatMessage('warn', message, meta));
      }
    },
    info: (message: string, meta?: any) => {
      if (shouldLog('info')) {
        console.info(formatMessage('info', message, meta));
      }
    },
    http: (message: string, meta?: any) => {
      if (shouldLog('http')) {
        console.log(formatMessage('http', message, meta));
      }
    },
    verbose: (message: string, meta?: any) => {
      if (shouldLog('verbose')) {
        console.log(formatMessage('verbose', message, meta));
      }
    },
    debug: (message: string, meta?: any) => {
      if (shouldLog('debug')) {
        console.debug(formatMessage('debug', message, meta));
      }
    },
    silly: (message: string, meta?: any) => {
      if (shouldLog('silly')) {
        console.log(formatMessage('silly', message, meta));
      }
    },
    log: (level: string, message: string, meta?: any) => {
      if (shouldLog(level)) {
        const logFn = level === 'error' ? console.error :
                     level === 'warn' ? console.warn :
                     level === 'info' ? console.info :
                     level === 'debug' ? console.debug :
                     console.log;
        logFn(formatMessage(level, message, meta));
      }
    },
  } as Logger;
}