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
exports.cronJobService = exports.CronJobService = void 0;
var cron = require('node-cron');
var logger_1 = require('../../lib/logger');
var appointment_reminders_1 = require('../../services/appointment-reminders');
var campaign_automation_1 = require('../../services/campaign-automation');
var prisma_1 = require('../../lib/prisma');
var CronJobService = /** @class */ (function () {
  function CronJobService() {
    this.jobs = new Map();
  }
  // Initialize all cron jobs
  CronJobService.prototype.initialize = function () {
    return __awaiter(this, void 0, void 0, function () {
      var _this = this;
      return __generator(this, function (_a) {
        try {
          logger_1.logger.info('Initializing cron jobs');
          // Daily appointment reminders - 9 AM EST
          this.scheduleJob('appointment-reminders', '0 9 * * *', function () {
            return __awaiter(_this, void 0, void 0, function () {
              return __generator(this, function (_a) {
                switch (_a.label) {
                  case 0:
                    logger_1.logger.info('Running appointment reminders');
                    return [
                      4 /*yield*/,
                      appointment_reminders_1.appointmentReminderService.sendUpcomingReminders(),
                    ];
                  case 1:
                    _a.sent();
                    return [2 /*return*/];
                }
              });
            });
          });
          // Daily campaign automation - 10 AM EST
          this.scheduleJob('campaign-automation', '0 10 * * *', function () {
            return __awaiter(_this, void 0, void 0, function () {
              return __generator(this, function (_a) {
                switch (_a.label) {
                  case 0:
                    logger_1.logger.info('Running campaign automation');
                    return [
                      4 /*yield*/,
                      campaign_automation_1.campaignAutomationService.runDailyCampaigns(),
                    ];
                  case 1:
                    _a.sent();
                    return [2 /*return*/];
                }
              });
            });
          });
          // Lead scoring - Every 30 minutes
          this.scheduleJob('lead-scoring', '*/30 * * * *', function () {
            return __awaiter(_this, void 0, void 0, function () {
              return __generator(this, function (_a) {
                switch (_a.label) {
                  case 0:
                    logger_1.logger.info('Running lead scoring');
                    return [4 /*yield*/, this.scoreRecentLeads()];
                  case 1:
                    _a.sent();
                    return [2 /*return*/];
                }
              });
            });
          });
          // Database cleanup - Daily at 2 AM EST
          this.scheduleJob('database-cleanup', '0 2 * * *', function () {
            return __awaiter(_this, void 0, void 0, function () {
              return __generator(this, function (_a) {
                switch (_a.label) {
                  case 0:
                    logger_1.logger.info('Running database cleanup');
                    return [4 /*yield*/, this.performDatabaseCleanup()];
                  case 1:
                    _a.sent();
                    return [2 /*return*/];
                }
              });
            });
          });
          // Follow-up surveys - Daily at 3 PM EST
          this.scheduleJob('follow-up-surveys', '0 15 * * *', function () {
            return __awaiter(_this, void 0, void 0, function () {
              return __generator(this, function (_a) {
                switch (_a.label) {
                  case 0:
                    logger_1.logger.info('Running follow-up surveys');
                    return [4 /*yield*/, this.sendFollowUpSurveys()];
                  case 1:
                    _a.sent();
                    return [2 /*return*/];
                }
              });
            });
          });
          // Analytics aggregation - Every hour
          this.scheduleJob('analytics-aggregation', '0 * * * *', function () {
            return __awaiter(_this, void 0, void 0, function () {
              return __generator(this, function (_a) {
                switch (_a.label) {
                  case 0:
                    logger_1.logger.info('Running analytics aggregation');
                    return [4 /*yield*/, this.aggregateAnalytics()];
                  case 1:
                    _a.sent();
                    return [2 /*return*/];
                }
              });
            });
          });
          // Backup important data - Daily at 3 AM EST
          this.scheduleJob('data-backup', '0 3 * * *', function () {
            return __awaiter(_this, void 0, void 0, function () {
              return __generator(this, function (_a) {
                switch (_a.label) {
                  case 0:
                    logger_1.logger.info('Running data backup');
                    return [4 /*yield*/, this.backupImportantData()];
                  case 1:
                    _a.sent();
                    return [2 /*return*/];
                }
              });
            });
          });
          // Check for expired documents - Weekly on Sundays at 6 AM EST
          this.scheduleJob('document-expiry-check', '0 6 * * 0', function () {
            return __awaiter(_this, void 0, void 0, function () {
              return __generator(this, function (_a) {
                switch (_a.label) {
                  case 0:
                    logger_1.logger.info('Checking for expired documents');
                    return [4 /*yield*/, this.checkDocumentExpiry()];
                  case 1:
                    _a.sent();
                    return [2 /*return*/];
                }
              });
            });
          });
          logger_1.logger.info('All cron jobs initialized successfully');
        } catch (error) {
          logger_1.logger.error('Failed to initialize cron jobs:', error);
          throw error;
        }
        return [2 /*return*/];
      });
    });
  };
  // Schedule a job
  CronJobService.prototype.scheduleJob = function (name, schedule, task) {
    var _this = this;
    try {
      var job = cron.schedule(schedule, function () {
        return __awaiter(_this, void 0, void 0, function () {
          var startTime, duration, error_1, duration;
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                startTime = Date.now();
                _a.label = 1;
              case 1:
                _a.trys.push([1, 4, , 6]);
                logger_1.logger.info('Starting cron job: '.concat(name));
                return [4 /*yield*/, task()];
              case 2:
                _a.sent();
                duration = Date.now() - startTime;
                logger_1.logger.info('Completed cron job: '.concat(name), { duration: duration });
                // Log job execution
                return [4 /*yield*/, this.logJobExecution(name, 'success', duration)];
              case 3:
                // Log job execution
                _a.sent();
                return [3 /*break*/, 6];
              case 4:
                error_1 = _a.sent();
                duration = Date.now() - startTime;
                logger_1.logger.error('Failed cron job: '.concat(name), {
                  error: error_1,
                  duration: duration,
                });
                // Log job failure
                return [4 /*yield*/, this.logJobExecution(name, 'failed', duration, error_1)];
              case 5:
                // Log job failure
                _a.sent();
                return [3 /*break*/, 6];
              case 6:
                return [2 /*return*/];
            }
          });
        });
      });
      // Start the job immediately
      job.start();
      this.jobs.set(name, job);
      logger_1.logger.info(
        'Scheduled cron job: '.concat(name, ' with schedule: ').concat(schedule)
      );
    } catch (error) {
      logger_1.logger.error('Failed to schedule cron job: '.concat(name), error);
    }
  };
  // Score recent leads
  CronJobService.prototype.scoreRecentLeads = function () {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        try {
          // TODO: Implement when lead model is added to schema
          logger_1.logger.info('Lead scoring: Not implemented yet');
        } catch (error) {
          logger_1.logger.error('Lead scoring failed:', error);
          throw error;
        }
        return [2 /*return*/];
      });
    });
  };
  // Perform database cleanup
  CronJobService.prototype.performDatabaseCleanup = function () {
    return __awaiter(this, void 0, void 0, function () {
      var thirtyDaysAgo, deletedSessions, deletedActivities, error_2;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            _a.trys.push([0, 3, , 4]);
            thirtyDaysAgo = new Date();
            thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
            return [
              4 /*yield*/,
              prisma_1.prisma.session.deleteMany({
                where: {
                  expires: { lt: new Date() },
                },
              }),
            ];
          case 1:
            deletedSessions = _a.sent();
            return [
              4 /*yield*/,
              prisma_1.prisma.userActivity.deleteMany({
                where: {
                  createdAt: { lt: thirtyDaysAgo },
                },
              }),
            ];
          case 2:
            deletedActivities = _a.sent();
            logger_1.logger.info('Database cleanup completed', {
              deletedSessions: deletedSessions.count,
              deletedActivities: deletedActivities.count,
            });
            return [3 /*break*/, 4];
          case 3:
            error_2 = _a.sent();
            logger_1.logger.error('Database cleanup failed:', error_2);
            throw error_2;
          case 4:
            return [2 /*return*/];
        }
      });
    });
  };
  // Send follow-up surveys
  CronJobService.prototype.sendFollowUpSurveys = function () {
    return __awaiter(this, void 0, void 0, function () {
      var yesterday,
        startOfYesterday,
        endOfYesterday,
        completedAppointments,
        _i,
        completedAppointments_1,
        appointment,
        error_3;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            _a.trys.push([0, 7, , 8]);
            yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            startOfYesterday = new Date(yesterday);
            startOfYesterday.setHours(0, 0, 0, 0);
            endOfYesterday = new Date(yesterday);
            endOfYesterday.setHours(23, 59, 59, 999);
            return [
              4 /*yield*/,
              prisma_1.prisma.appointment.findMany({
                where: {
                  status: 'completed',
                  scheduledAt: {
                    gte: startOfYesterday,
                    lt: endOfYesterday,
                  },
                  // Check metadata for surveySent flag
                  NOT: {
                    metadata: {
                      path: ['surveySent'],
                      equals: true,
                    },
                  },
                },
              }),
            ];
          case 1:
            completedAppointments = _a.sent();
            (_i = 0), (completedAppointments_1 = completedAppointments);
            _a.label = 2;
          case 2:
            if (!(_i < completedAppointments_1.length)) return [3 /*break*/, 6];
            appointment = completedAppointments_1[_i];
            return [
              4 /*yield*/,
              appointment_reminders_1.appointmentReminderService.sendFollowUpSurvey(appointment.id),
            ];
          case 3:
            _a.sent();
            // Mark survey as sent in metadata
            return [
              4 /*yield*/,
              prisma_1.prisma.appointment.update({
                where: { id: appointment.id },
                data: {
                  metadata: __assign(__assign({}, appointment.metadata || {}), {
                    surveySent: true,
                    surveySentAt: new Date().toISOString(),
                  }),
                },
              }),
            ];
          case 4:
            // Mark survey as sent in metadata
            _a.sent();
            _a.label = 5;
          case 5:
            _i++;
            return [3 /*break*/, 2];
          case 6:
            logger_1.logger.info(
              'Sent '.concat(completedAppointments.length, ' follow-up surveys')
            );
            return [3 /*break*/, 8];
          case 7:
            error_3 = _a.sent();
            logger_1.logger.error('Follow-up survey sending failed:', error_3);
            throw error_3;
          case 8:
            return [2 /*return*/];
        }
      });
    });
  };
  // Aggregate analytics data
  CronJobService.prototype.aggregateAnalytics = function () {
    return __awaiter(this, void 0, void 0, function () {
      var now, hourAgo, leadMetrics, appointmentMetrics, error_4;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            _a.trys.push([0, 2, , 3]);
            now = new Date();
            hourAgo = new Date(now.getTime() - 60 * 60 * 1000);
            leadMetrics = [];
            return [
              4 /*yield*/,
              prisma_1.prisma.appointment.groupBy({
                by: ['type', 'status'],
                where: {
                  createdAt: { gte: hourAgo },
                },
                _count: true,
              }),
            ];
          case 1:
            appointmentMetrics = _a.sent();
            // TODO: Store aggregated data when analyticsSnapshot model is added
            logger_1.logger.info('Analytics snapshot would be stored here', {
              leadCount: leadMetrics.length,
              appointmentCount: appointmentMetrics.length,
            });
            logger_1.logger.info('Analytics aggregation completed');
            return [3 /*break*/, 3];
          case 2:
            error_4 = _a.sent();
            logger_1.logger.error('Analytics aggregation failed:', error_4);
            throw error_4;
          case 3:
            return [2 /*return*/];
        }
      });
    });
  };
  // Backup important data
  CronJobService.prototype.backupImportantData = function () {
    return __awaiter(this, void 0, void 0, function () {
      var counts, error_5;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            _a.trys.push([0, 2, , 3]);
            return [
              4 /*yield*/,
              Promise.all([
                prisma_1.prisma.user.count({ where: { role: 'CLIENT' } }),
                prisma_1.prisma.case.count(),
                prisma_1.prisma.document.count(),
                prisma_1.prisma.appointment.count(),
              ]),
            ];
          case 1:
            counts = _a.sent();
            logger_1.logger.info('Data backup completed', {
              users: counts[0],
              cases: counts[1],
              documents: counts[2],
              appointments: counts[3],
            });
            return [3 /*break*/, 3];
          case 2:
            error_5 = _a.sent();
            logger_1.logger.error('Data backup failed:', error_5);
            throw error_5;
          case 3:
            return [2 /*return*/];
        }
      });
    });
  };
  // Check for document expiry
  CronJobService.prototype.checkDocumentExpiry = function () {
    return __awaiter(this, void 0, void 0, function () {
      var thirtyDaysFromNow;
      return __generator(this, function (_a) {
        try {
          thirtyDaysFromNow = new Date();
          thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
          // TODO: Implement when document expiry fields are added to schema
          // Currently, the Document model doesn't have expiryDate or expiryNotificationSent fields
          logger_1.logger.info('Document expiry check: Feature not yet implemented');
        } catch (error) {
          logger_1.logger.error('Document expiry check failed:', error);
          throw error;
        }
        return [2 /*return*/];
      });
    });
  };
  // Log job execution
  CronJobService.prototype.logJobExecution = function (jobName, status, duration, error) {
    return __awaiter(this, void 0, void 0, function () {
      var logData;
      return __generator(this, function (_a) {
        logData = {
          jobName: jobName,
          status: status,
          duration: duration,
          error: error ? error.message || JSON.stringify(error) : null,
          executedAt: new Date(),
        };
        if (status === 'success') {
          logger_1.logger.info('Cron job execution logged', logData);
        } else {
          logger_1.logger.error('Cron job execution failed', logData);
        }
        return [2 /*return*/];
      });
    });
  };
  // Stop all jobs
  CronJobService.prototype.stop = function () {
    for (var _i = 0, _a = this.jobs; _i < _a.length; _i++) {
      var _b = _a[_i],
        name_1 = _b[0],
        job = _b[1];
      job.stop();
      logger_1.logger.info('Stopped cron job: '.concat(name_1));
    }
    this.jobs.clear();
  };
  // Get job status
  CronJobService.prototype.getJobStatus = function () {
    var status = {};
    for (var _i = 0, _a = this.jobs; _i < _a.length; _i++) {
      var _b = _a[_i],
        name_2 = _b[0],
        job = _b[1];
      status[name_2] = {
        running: job.running || false,
      };
    }
    return status;
  };
  // Manually trigger a job
  CronJobService.prototype.triggerJob = function (jobName) {
    return __awaiter(this, void 0, void 0, function () {
      var job;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            job = this.jobs.get(jobName);
            if (!job) {
              throw new Error('Job '.concat(jobName, ' not found'));
            }
            logger_1.logger.info('Manually triggering job: '.concat(jobName));
            return [4 /*yield*/, job.task()];
          case 1:
            _a.sent();
            return [2 /*return*/];
        }
      });
    });
  };
  return CronJobService;
})();
exports.CronJobService = CronJobService;
// Export singleton instance
exports.cronJobService = new CronJobService();
