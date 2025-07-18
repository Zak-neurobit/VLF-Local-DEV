/**
 * Temporary stub implementations for models that don't exist in the Prisma schema
 * These are used to prevent runtime errors while the actual models are being implemented
 */

import { logger } from '@/lib/logger';

// Stub for review model operations
export const reviewStubs = {
  findMany: async (args?: any) => {
    logger.warn('Using stub for prisma.review.findMany - model not implemented');
    return [];
  },
  findUnique: async (args?: any) => {
    logger.warn('Using stub for prisma.review.findUnique - model not implemented');
    return null;
  },
  findFirst: async (args?: any) => {
    logger.warn('Using stub for prisma.review.findFirst - model not implemented');
    return null;
  },
  create: async (args?: any) => {
    logger.warn('Using stub for prisma.review.create - model not implemented');
    return { id: 'stub-id', ...args?.data };
  },
  update: async (args?: any) => {
    logger.warn('Using stub for prisma.review.update - model not implemented');
    return { id: args?.where?.id || 'stub-id', ...args?.data };
  },
  count: async (args?: any) => {
    logger.warn('Using stub for prisma.review.count - model not implemented');
    return 0;
  },
  aggregate: async (args?: any) => {
    logger.warn('Using stub for prisma.review.aggregate - model not implemented');
    return { _avg: { rating: 0 }, _count: 0 };
  },
  groupBy: async (args?: any) => {
    logger.warn('Using stub for prisma.review.groupBy - model not implemented');
    return [];
  },
};

// Stub for scheduledEmail model operations
export const scheduledEmailStubs = {
  create: async (args?: any) => {
    logger.warn('Using stub for prisma.scheduledEmail.create - model not implemented');
    return { id: 'stub-id', ...args?.data };
  },
  findMany: async (args?: any) => {
    logger.warn('Using stub for prisma.scheduledEmail.findMany - model not implemented');
    return [];
  },
  update: async (args?: any) => {
    logger.warn('Using stub for prisma.scheduledEmail.update - model not implemented');
    return { id: args?.where?.id || 'stub-id', ...args?.data };
  },
  updateMany: async (args?: any) => {
    logger.warn('Using stub for prisma.scheduledEmail.updateMany - model not implemented');
    return { count: 0 };
  },
};

// Stub for reviewSolicitationTracking model operations
export const reviewSolicitationTrackingStubs = {
  create: async (args?: any) => {
    logger.warn('Using stub for prisma.reviewSolicitationTracking.create - model not implemented');
    return { id: 'stub-id', ...args?.data };
  },
  findMany: async (args?: any) => {
    logger.warn(
      'Using stub for prisma.reviewSolicitationTracking.findMany - model not implemented'
    );
    return [];
  },
};

// Stub for reviewSolicitationOptOut model operations
export const reviewSolicitationOptOutStubs = {
  findUnique: async (args?: any) => {
    logger.warn(
      'Using stub for prisma.reviewSolicitationOptOut.findUnique - model not implemented'
    );
    return null;
  },
  create: async (args?: any) => {
    logger.warn('Using stub for prisma.reviewSolicitationOptOut.create - model not implemented');
    return { id: 'stub-id', ...args?.data };
  },
};

// Stub for voiceAgent model operations
export const voiceAgentStubs = {
  create: async (args?: any) => {
    logger.warn('Using stub for prisma.voiceAgent.create - model not implemented');
    return { id: 'stub-id', ...args?.data };
  },
  findMany: async (args?: any) => {
    logger.warn('Using stub for prisma.voiceAgent.findMany - model not implemented');
    return [];
  },
};

// Stub for voiceCallMetrics model operations
export const voiceCallMetricsStubs = {
  create: async (args?: any) => {
    logger.warn('Using stub for prisma.voiceCallMetrics.create - model not implemented');
    return { id: 'stub-id', ...args?.data };
  },
};

// Stub for voiceMetricEvent model operations
export const voiceMetricEventStubs = {
  create: async (args?: any) => {
    logger.warn('Using stub for prisma.voiceMetricEvent.create - model not implemented');
    return { id: 'stub-id', ...args?.data };
  },
};

// Stub for documentShare model operations
export const documentShareStubs = {
  count: async (args?: any) => {
    logger.warn('Using stub for prisma.documentShare.count - model not implemented');
    return 0;
  },
};

// Stub for complianceReport model operations
export const complianceReportStubs = {
  create: async (args?: any) => {
    logger.warn('Using stub for prisma.complianceReport.create - model not implemented');
    return { id: 'stub-id', ...args?.data };
  },
  findFirst: async (args?: any) => {
    logger.warn('Using stub for prisma.complianceReport.findFirst - model not implemented');
    return null;
  },
};

// Stub for securityReport model operations
export const securityReportStubs = {
  create: async (args?: any) => {
    logger.warn('Using stub for prisma.securityReport.create - model not implemented');
    return { id: 'stub-id', ...args?.data };
  },
};
