'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.prisma = void 0;
exports.withTransaction = withTransaction;
const client_1 = require('@prisma/client');
const logger_1 = require('./logger');
const prismaClientSingleton = () => {
  const prisma = new client_1.PrismaClient({
    log: [
      {
        emit: 'event',
        level: 'query',
      },
      {
        emit: 'event',
        level: 'error',
      },
      {
        emit: 'event',
        level: 'warn',
      },
    ],
  });
  // Log queries
  prisma.$on('query', e => {
    logger_1.dbLogger.query(e.query, e.params.split(','), e.duration);
  });
  // Log errors
  prisma.$on('error', e => {
    logger_1.dbLogger.error(e.message, e);
  });
  // Log warnings
  prisma.$on('warn', e => {
    console.warn('Prisma warning:', e.message);
  });
  return prisma;
};
exports.prisma = global.prisma ?? prismaClientSingleton();
if (process.env.NODE_ENV !== 'production') {
  global.prisma = exports.prisma;
}
// Transaction helper with logging
async function withTransaction(fn) {
  const transactionId = `tx_${Date.now()}`;
  logger_1.dbLogger.transaction(transactionId, 'start');
  try {
    const result = await exports.prisma.$transaction(async tx => {
      return await fn(tx);
    });
    logger_1.dbLogger.transaction(transactionId, 'commit');
    return result;
  } catch (error) {
    logger_1.dbLogger.transaction(transactionId, 'rollback');
    throw error;
  }
}
