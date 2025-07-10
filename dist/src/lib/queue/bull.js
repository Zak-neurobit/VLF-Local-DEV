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
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g = Object.create((typeof Iterator === 'function' ? Iterator : Object).prototype);
    return (
      (g.next = verb(0)),
      (g['throw'] = verb(1)),
      (g['return'] = verb(2)),
      typeof Symbol === 'function' &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError('Generator is already executing.');
      while ((g && ((g = 0), op[0] && (_ = 0)), _))
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y['return']
                  : op[0]
                    ? y['throw'] || ((t = y['return']) && t.call(y), 0)
                    : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.documentQueue =
  exports.seoQueue =
  exports.emailQueue =
  exports.notificationQueue =
  exports.transcriptionQueue =
  exports.callAnalysisQueue =
    void 0;
exports.handleWebhookAsync = handleWebhookAsync;
exports.setupQueueMonitoring = setupQueueMonitoring;
exports.clearAllQueues = clearAllQueues;
exports.pauseAllQueues = pauseAllQueues;
exports.resumeAllQueues = resumeAllQueues;
var bull_1 = require('bull');
var logger_1 = require('../../lib/logger');
var client_1 = require('@prisma/client');
var prisma = new client_1.PrismaClient();
// Shared Redis configuration for all queues
var redisConfig = {
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
exports.callAnalysisQueue.process(function (job) {
  return __awaiter(void 0, void 0, void 0, function () {
    var start, _a, callId, transcript, metadata, analysis, error_1;
    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          start = Date.now();
          (_a = job.data),
            (callId = _a.callId),
            (transcript = _a.transcript),
            (metadata = _a.metadata);
          _b.label = 1;
        case 1:
          _b.trys.push([1, 6, , 7]);
          return [4 /*yield*/, analyzeCallWithAI(transcript, metadata)];
        case 2:
          analysis = _b.sent();
          // Store results
          return [
            4 /*yield*/,
            prisma === null || prisma === void 0
              ? void 0
              : prisma.callAnalysis.create({
                  data: __assign({ callId: callId }, analysis),
                }),
          ];
        case 3:
          // Store results
          _b.sent();
          logger_1.performanceLogger.measure('call-analysis-job', Date.now() - start, {
            callId: callId,
          });
          if (!(analysis.sentiment === 'negative')) return [3 /*break*/, 5];
          return [
            4 /*yield*/,
            exports.notificationQueue.add('urgent-notification', {
              type: 'negative-sentiment',
              callId: callId,
              analysis: analysis,
            }),
          ];
        case 4:
          _b.sent();
          _b.label = 5;
        case 5:
          return [2 /*return*/, analysis];
        case 6:
          error_1 = _b.sent();
          console.error('Call analysis failed:', error_1);
          throw error_1;
        case 7:
          return [2 /*return*/];
      }
    });
  });
});
// Enhanced webhook handler using queues
function handleWebhookAsync(event) {
  return __awaiter(this, void 0, void 0, function () {
    var _a;
    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          _a = event.type;
          switch (_a) {
            case 'call.ended':
              return [3 /*break*/, 1];
            case 'recording.ready':
              return [3 /*break*/, 3];
          }
          return [3 /*break*/, 5];
        case 1:
          return [
            4 /*yield*/,
            exports.callAnalysisQueue.add('analyze-call', {
              callId: event.callId,
              transcript: event.transcript,
              metadata: event.metadata,
            }),
          ];
        case 2:
          _b.sent();
          return [3 /*break*/, 5];
        case 3:
          return [
            4 /*yield*/,
            exports.transcriptionQueue.add('transcribe-recording', {
              callId: event.callId,
              recordingUrl: event.recordingUrl,
            }),
          ];
        case 4:
          _b.sent();
          return [3 /*break*/, 5];
        case 5:
          // Return immediately to avoid webhook timeout
          return [2 /*return*/, { queued: true }];
      }
    });
  });
}
// Email queue processor
exports.emailQueue.process(function (job) {
  return __awaiter(void 0, void 0, void 0, function () {
    var emailData, emailService, result, error_2;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          emailData = job.data;
          _a.label = 1;
        case 1:
          _a.trys.push([1, 4, , 5]);
          return [
            4 /*yield*/,
            Promise.resolve().then(function () {
              return require('../../services/email');
            }),
          ];
        case 2:
          emailService = _a.sent().emailService;
          logger_1.logger.info('Processing email job', {
            to: emailData.to,
            subject: emailData.subject,
            template: emailData.template,
          });
          return [4 /*yield*/, emailService.send(emailData)];
        case 3:
          result = _a.sent();
          if (!result.success) {
            throw new Error(result.error || 'Email send failed');
          }
          return [2 /*return*/, result];
        case 4:
          error_2 = _a.sent();
          logger_1.logger.error('Email queue processor error:', error_2);
          throw error_2;
        case 5:
          return [2 /*return*/];
      }
    });
  });
});
// SEO queue processor
exports.seoQueue.process(function (job) {
  return __awaiter(void 0, void 0, void 0, function () {
    var _a, type, data;
    return __generator(this, function (_b) {
      (_a = job.data), (type = _a.type), (data = _a.data);
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
        return [2 /*return*/, { success: true }];
      } catch (error) {
        logger_1.logger.error('SEO task failed:', error);
        throw error;
      }
      return [2 /*return*/];
    });
  });
});
// Document queue processor
exports.documentQueue.process(function (job) {
  return __awaiter(void 0, void 0, void 0, function () {
    var _a, type, documentId, data;
    return __generator(this, function (_b) {
      (_a = job.data), (type = _a.type), (documentId = _a.documentId), (data = _a.data);
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
        return [2 /*return*/, { success: true }];
      } catch (error) {
        logger_1.logger.error('Document processing failed:', error);
        throw error;
      }
      return [2 /*return*/];
    });
  });
});
// Monitor queue health
function setupQueueMonitoring() {
  var _this = this;
  var queues = [
    { name: 'call-analysis', queue: exports.callAnalysisQueue },
    { name: 'transcription', queue: exports.transcriptionQueue },
    { name: 'notifications', queue: exports.notificationQueue },
    { name: 'email', queue: exports.emailQueue },
    { name: 'seo-tasks', queue: exports.seoQueue },
    { name: 'document-processing', queue: exports.documentQueue },
  ];
  // Set up event listeners for all queues
  queues.forEach(function (_a) {
    var name = _a.name,
      queue = _a.queue;
    queue.on('completed', function (job, result) {
      logger_1.performanceLogger.measure('queue-job-completed', job.processedOn - job.timestamp, {
        queue: name,
        jobId: job.id,
      });
    });
    queue.on('failed', function (job, err) {
      logger_1.logger.error('Job '.concat(job.id, ' in queue ').concat(name, ' failed:'), err);
    });
    queue.on('stalled', function (job) {
      logger_1.logger.warn('Job '.concat(job.id, ' in queue ').concat(name, ' stalled'));
    });
  });
  // Health check endpoint data
  return function () {
    return __awaiter(_this, void 0, void 0, function () {
      var health,
        _i,
        queues_1,
        _a,
        name_1,
        queue,
        _b,
        waiting,
        active,
        completed,
        failed,
        delayed,
        paused;
      return __generator(this, function (_c) {
        switch (_c.label) {
          case 0:
            health = {};
            (_i = 0), (queues_1 = queues);
            _c.label = 1;
          case 1:
            if (!(_i < queues_1.length)) return [3 /*break*/, 4];
            (_a = queues_1[_i]), (name_1 = _a.name), (queue = _a.queue);
            return [
              4 /*yield*/,
              Promise.all([
                queue.getWaitingCount(),
                queue.getActiveCount(),
                queue.getCompletedCount(),
                queue.getFailedCount(),
                queue.getDelayedCount(),
                queue.isPaused(),
              ]),
            ];
          case 2:
            (_b = _c.sent()),
              (waiting = _b[0]),
              (active = _b[1]),
              (completed = _b[2]),
              (failed = _b[3]),
              (delayed = _b[4]),
              (paused = _b[5]);
            health[name_1] = {
              waiting: waiting,
              active: active,
              completed: completed,
              failed: failed,
              delayed: delayed,
              paused: paused,
              isReady: !paused && active < 100, // Consider queue ready if not paused and not overloaded
            };
            _c.label = 3;
          case 3:
            _i++;
            return [3 /*break*/, 1];
          case 4:
            return [2 /*return*/, health];
        }
      });
    });
  };
}
// Queue utilities
function clearAllQueues() {
  return __awaiter(this, void 0, void 0, function () {
    var queues;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          queues = [
            exports.callAnalysisQueue,
            exports.transcriptionQueue,
            exports.notificationQueue,
            exports.emailQueue,
            exports.seoQueue,
            exports.documentQueue,
          ];
          return [
            4 /*yield*/,
            Promise.all(
              queues.map(function (queue) {
                return queue.empty();
              })
            ),
          ];
        case 1:
          _a.sent();
          logger_1.logger.info('All queues cleared');
          return [2 /*return*/];
      }
    });
  });
}
function pauseAllQueues() {
  return __awaiter(this, void 0, void 0, function () {
    var queues;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          queues = [
            exports.callAnalysisQueue,
            exports.transcriptionQueue,
            exports.notificationQueue,
            exports.emailQueue,
            exports.seoQueue,
            exports.documentQueue,
          ];
          return [
            4 /*yield*/,
            Promise.all(
              queues.map(function (queue) {
                return queue.pause();
              })
            ),
          ];
        case 1:
          _a.sent();
          logger_1.logger.info('All queues paused');
          return [2 /*return*/];
      }
    });
  });
}
function resumeAllQueues() {
  return __awaiter(this, void 0, void 0, function () {
    var queues;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          queues = [
            exports.callAnalysisQueue,
            exports.transcriptionQueue,
            exports.notificationQueue,
            exports.emailQueue,
            exports.seoQueue,
            exports.documentQueue,
          ];
          return [
            4 /*yield*/,
            Promise.all(
              queues.map(function (queue) {
                return queue.resume();
              })
            ),
          ];
        case 1:
          _a.sent();
          logger_1.logger.info('All queues resumed');
          return [2 /*return*/];
      }
    });
  });
}
function analyzeCallWithAI(transcript, metadata) {
  return __awaiter(this, void 0, void 0, function () {
    return __generator(this, function (_a) {
      // Implement AI analysis
      return [
        2 /*return*/,
        {
          summary: 'Call summary...',
          sentiment: 'positive',
          actionItems: [],
          extractedInfo: {},
        },
      ];
    });
  });
}
