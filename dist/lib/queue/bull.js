"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.documentQueue = exports.seoQueue = exports.emailQueue = exports.notificationQueue = exports.transcriptionQueue = exports.callAnalysisQueue = void 0;
exports.handleWebhookAsync = handleWebhookAsync;
exports.setupQueueMonitoring = setupQueueMonitoring;
exports.clearAllQueues = clearAllQueues;
exports.pauseAllQueues = pauseAllQueues;
exports.resumeAllQueues = resumeAllQueues;
const bull_1 = __importDefault(require("bull"));
const logger_1 = require("@/lib/logger");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// Shared Redis configuration for all queues
const redisConfig = {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379'),
    password: process.env.REDIS_PASSWORD,
};
// Job queues for different tasks
exports.callAnalysisQueue = new bull_1.default('call-analysis', {
    redis: redisConfig,
    defaultJobOptions: {
        removeOnComplete: 100,
        removeOnFail: 50,
        attempts: 3,
        backoff: {
            type: 'exponential',
            delay: 2000,
        },
    },
});
exports.transcriptionQueue = new bull_1.default('transcription', {
    redis: redisConfig,
    defaultJobOptions: {
        removeOnComplete: 50,
        removeOnFail: 25,
        attempts: 3,
        backoff: {
            type: 'exponential',
            delay: 3000,
        },
    },
});
exports.notificationQueue = new bull_1.default('notifications', {
    redis: redisConfig,
    defaultJobOptions: {
        removeOnComplete: 200,
        removeOnFail: 100,
        attempts: 5,
        backoff: {
            type: 'exponential',
            delay: 1000,
        },
    },
});
exports.emailQueue = new bull_1.default('email', {
    redis: redisConfig,
    defaultJobOptions: {
        removeOnComplete: 100,
        removeOnFail: 50,
        attempts: 3,
        backoff: {
            type: 'exponential',
            delay: 5000,
        },
    },
});
exports.seoQueue = new bull_1.default('seo-tasks', {
    redis: redisConfig,
    defaultJobOptions: {
        removeOnComplete: 50,
        removeOnFail: 25,
        attempts: 2,
    },
});
exports.documentQueue = new bull_1.default('document-processing', {
    redis: redisConfig,
    defaultJobOptions: {
        removeOnComplete: 50,
        removeOnFail: 25,
        attempts: 3,
        timeout: 300000, // 5 minutes
    },
});
// Queue processors
exports.callAnalysisQueue.process(async (job) => {
    const start = Date.now();
    const { callId, transcript, metadata } = job.data;
    try {
        // Process call analysis asynchronously
        // This prevents webhook blocking
        const analysis = await analyzeCallWithAI(transcript, metadata);
        // Store results
        await prisma?.callAnalysis.create({
            data: {
                callId,
                ...analysis,
            },
        });
        logger_1.performanceLogger.measure('call-analysis-job', Date.now() - start, { callId });
        // Trigger follow-up actions
        if (analysis.sentiment === 'negative') {
            await exports.notificationQueue.add('urgent-notification', {
                type: 'negative-sentiment',
                callId,
                analysis,
            });
        }
        return analysis;
    }
    catch (error) {
        console.error('Call analysis failed:', error);
        throw error;
    }
});
// Enhanced webhook handler using queues
async function handleWebhookAsync(event) {
    // Instead of processing synchronously, queue the job
    switch (event.type) {
        case 'call.ended':
            await exports.callAnalysisQueue.add('analyze-call', {
                callId: event.callId,
                transcript: event.transcript,
                metadata: event.metadata,
            });
            break;
        case 'recording.ready':
            await exports.transcriptionQueue.add('transcribe-recording', {
                callId: event.callId,
                recordingUrl: event.recordingUrl,
            });
            break;
    }
    // Return immediately to avoid webhook timeout
    return { queued: true };
}
// Email queue processor
exports.emailQueue.process(async (job) => {
    const emailData = job.data;
    try {
        // Import email service dynamically to avoid circular dependencies
        const { emailService } = await Promise.resolve().then(() => __importStar(require('@/services/email.service')));
        logger_1.logger.info(`Processing email job`, {
            to: emailData.to,
            subject: emailData.subject,
            template: emailData.template,
        });
        // Send email
        const result = await emailService.sendEmail(emailData);
        if (!result.success) {
            throw new Error(result.error || 'Email send failed');
        }
        return result;
    }
    catch (error) {
        logger_1.logger.error('Email queue processor error:', error);
        throw error;
    }
});
// SEO queue processor
exports.seoQueue.process(async (job) => {
    const { type, data } = job.data;
    try {
        switch (type) {
            case 'analyze-post':
                // TODO: Implement SEO analysis
                break;
            case 'generate-sitemap':
                // TODO: Implement sitemap generation
                break;
            case 'check-backlinks':
                // TODO: Implement backlink checking
                break;
        }
        return { success: true };
    }
    catch (error) {
        logger_1.logger.error('SEO task failed:', error);
        throw error;
    }
});
// Document queue processor
exports.documentQueue.process(async (job) => {
    const { type, documentId, data } = job.data;
    try {
        switch (type) {
            case 'generate-pdf':
                // TODO: Implement PDF generation
                break;
            case 'extract-text':
                // TODO: Implement text extraction
                break;
            case 'translate':
                // TODO: Implement document translation
                break;
        }
        return { success: true };
    }
    catch (error) {
        logger_1.logger.error('Document processing failed:', error);
        throw error;
    }
});
// Monitor queue health
function setupQueueMonitoring() {
    const queues = [
        { name: 'call-analysis', queue: exports.callAnalysisQueue },
        { name: 'transcription', queue: exports.transcriptionQueue },
        { name: 'notifications', queue: exports.notificationQueue },
        { name: 'email', queue: exports.emailQueue },
        { name: 'seo-tasks', queue: exports.seoQueue },
        { name: 'document-processing', queue: exports.documentQueue },
    ];
    // Set up event listeners for all queues
    queues.forEach(({ name, queue }) => {
        queue.on('completed', (job, result) => {
            logger_1.performanceLogger.measure('queue-job-completed', job.processedOn - job.timestamp, {
                queue: name,
                jobId: job.id,
            });
        });
        queue.on('failed', (job, err) => {
            logger_1.logger.error(`Job ${job.id} in queue ${name} failed:`, err);
        });
        queue.on('stalled', job => {
            logger_1.logger.warn(`Job ${job.id} in queue ${name} stalled`);
        });
    });
    // Health check endpoint data
    return async () => {
        const health = {};
        for (const { name, queue } of queues) {
            const [waiting, active, completed, failed, delayed, paused] = await Promise.all([
                queue.getWaitingCount(),
                queue.getActiveCount(),
                queue.getCompletedCount(),
                queue.getFailedCount(),
                queue.getDelayedCount(),
                queue.isPaused(),
            ]);
            health[name] = {
                waiting,
                active,
                completed,
                failed,
                delayed,
                paused,
                isReady: !paused && active < 100, // Consider queue ready if not paused and not overloaded
            };
        }
        return health;
    };
}
// Queue utilities
async function clearAllQueues() {
    const queues = [
        exports.callAnalysisQueue,
        exports.transcriptionQueue,
        exports.notificationQueue,
        exports.emailQueue,
        exports.seoQueue,
        exports.documentQueue,
    ];
    await Promise.all(queues.map(queue => queue.empty()));
    logger_1.logger.info('All queues cleared');
}
async function pauseAllQueues() {
    const queues = [
        exports.callAnalysisQueue,
        exports.transcriptionQueue,
        exports.notificationQueue,
        exports.emailQueue,
        exports.seoQueue,
        exports.documentQueue,
    ];
    await Promise.all(queues.map(queue => queue.pause()));
    logger_1.logger.info('All queues paused');
}
async function resumeAllQueues() {
    const queues = [
        exports.callAnalysisQueue,
        exports.transcriptionQueue,
        exports.notificationQueue,
        exports.emailQueue,
        exports.seoQueue,
        exports.documentQueue,
    ];
    await Promise.all(queues.map(queue => queue.resume()));
    logger_1.logger.info('All queues resumed');
}
async function analyzeCallWithAI(transcript, metadata) {
    // Implement AI analysis
    return {
        summary: 'Call summary...',
        sentiment: 'positive',
        actionItems: [],
        extractedInfo: {},
    };
}
