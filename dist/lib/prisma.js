"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
exports.getPrismaClient = getPrismaClient;
exports.withTransaction = withTransaction;
const client_1 = require("@prisma/client");
// Use console logging in edge runtime
const dbLogger = {
    query: (query, params, duration) => {
        if (process.env.NODE_ENV === 'development') {
            console.log(`[DB Query] ${duration}ms - ${query.substring(0, 100)}...`);
        }
    },
    error: (operation, error) => {
        console.error(`[DB Error] ${operation}:`, error);
    },
    transaction: (id, status) => {
        console.log(`[DB Transaction] ${id}: ${status}`);
    },
};
const prismaClientSingleton = () => {
    // Check if DATABASE_URL is available
    if (!process.env.DATABASE_URL) {
        console.warn('DATABASE_URL not found, returning mock Prisma client for build');
        return null;
    }
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
        dbLogger.query(e.query, e.params.split(','), e.duration);
    });
    // Log errors
    prisma.$on('error', e => {
        dbLogger.error(e.message, e);
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
// Helper to ensure prisma is available
function getPrismaClient() {
    if (!exports.prisma) {
        throw new Error('Database connection not available. Please ensure DATABASE_URL is set.');
    }
    return exports.prisma;
}
// Transaction helper with logging
async function withTransaction(fn) {
    const client = getPrismaClient();
    const transactionId = `tx_${Date.now()}`;
    dbLogger.transaction(transactionId, 'start');
    try {
        const result = await client.$transaction(async (tx) => {
            return await fn(tx);
        });
        dbLogger.transaction(transactionId, 'commit');
        return result;
    }
    catch (error) {
        dbLogger.transaction(transactionId, 'rollback');
        throw error;
    }
}
