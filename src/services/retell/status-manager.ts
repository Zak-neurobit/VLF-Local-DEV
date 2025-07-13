import { logger } from '@/lib/logger';
import { getPrismaClient } from '@/lib/prisma';
import { ghlService } from '@/services/gohighlevel';
import type { VoiceCallStatus } from '@prisma/client';

interface CallStatus {
  callId: string;
  status:
    | 'queued'
    | 'ringing'
    | 'connected'
    | 'ended'
    | 'failed'
    | 'no_answer'
    | 'busy'
    | 'voicemail';
  timestamp: Date;
  metadata?: Record<string, any>;
}

interface StatusUpdate {
  callId: string;
  previousStatus: string;
  newStatus: string;
  timestamp: Date;
  duration?: number;
  reason?: string;
}

export class StatusManager {
  private static instance: StatusManager;
  private statusSubscribers: Map<string, ((status: CallStatus) => void)[]> = new Map();
  private callStatuses: Map<string, CallStatus> = new Map();

  static getInstance(): StatusManager {
    if (!StatusManager.instance) {
      StatusManager.instance = new StatusManager();
    }
    return StatusManager.instance;
  }

  // Subscribe to status updates for a specific call
  subscribeToCall(callId: string, callback: (status: CallStatus) => void): () => void {
    if (!this.statusSubscribers.has(callId)) {
      this.statusSubscribers.set(callId, []);
    }

    this.statusSubscribers.get(callId)!.push(callback);

    // Send current status if available
    const currentStatus = this.callStatuses.get(callId);
    if (currentStatus) {
      callback(currentStatus);
    }

    // Return unsubscribe function
    return () => {
      const subscribers = this.statusSubscribers.get(callId);
      if (subscribers) {
        const index = subscribers.indexOf(callback);
        if (index > -1) {
          subscribers.splice(index, 1);
        }
      }
    };
  }

  // Update call status
  async updateCallStatus(
    callId: string,
    status: CallStatus['status'],
    metadata?: Record<string, any>
  ): Promise<void> {
    try {
      const previousStatus = this.callStatuses.get(callId);
      const newStatus: CallStatus = {
        callId,
        status,
        timestamp: new Date(),
        metadata,
      };

      // Store status in memory
      this.callStatuses.set(callId, newStatus);

      // Store in database
      await this.persistStatusUpdate(callId, previousStatus?.status || 'unknown', status, metadata);

      // Notify subscribers
      await this.notifySubscribers(callId, newStatus);

      // Handle status-specific logic
      await this.handleStatusChange(callId, previousStatus?.status, status, metadata);

      // Update GHL if contact is available
      await this.updateGHLStatus(callId, status, metadata);

      logger.info('Call status updated', {
        callId,
        previousStatus: previousStatus?.status,
        newStatus: status,
        metadata,
      });
    } catch (error) {
      logger.error('Failed to update call status:', error, { callId, status });
    }
  }

  // Persist status update to database
  private async persistStatusUpdate(
    callId: string,
    previousStatus: string,
    newStatus: string,
    metadata?: Record<string, any>
  ): Promise<void> {
    try {
      const prisma = getPrismaClient();

      // Create status history record
      await prisma.callStatusHistory.create({
        data: {
          callId,
          previousStatus,
          newStatus,
          timestamp: new Date(),
          metadata: metadata || ({} as any),
        },
      });

      // Update the main voice call record
      await prisma.voiceCall.updateMany({
        where: { retellCallId: callId },
        data: {
          status: newStatus as VoiceCallStatus,
          lastStatusUpdate: new Date(),
          metadata: {
            ...metadata,
            lastStatusChange: {
              from: previousStatus,
              to: newStatus,
              timestamp: new Date().toISOString(),
            },
          } as any,
        },
      });
    } catch (error) {
      logger.error('Failed to persist status update:', error);
    }
  }

  // Notify all subscribers of status change
  private async notifySubscribers(callId: string, status: CallStatus): Promise<void> {
    const subscribers = this.statusSubscribers.get(callId);
    if (!subscribers || subscribers.length === 0) return;

    // Notify each subscriber
    subscribers.forEach(callback => {
      try {
        callback(status);
      } catch (error) {
        logger.error('Error notifying status subscriber:', error);
      }
    });

    // Cleanup old subscriptions if call is ended
    if (['ended', 'failed', 'no_answer', 'busy'].includes(status.status)) {
      setTimeout(
        () => {
          this.statusSubscribers.delete(callId);
          this.callStatuses.delete(callId);
        },
        5 * 60 * 1000
      ); // 5 minutes
    }
  }

  // Handle status-specific logic
  private async handleStatusChange(
    callId: string,
    previousStatus: string | undefined,
    newStatus: string,
    metadata?: Record<string, any>
  ): Promise<void> {
    try {
      switch (newStatus) {
        case 'queued':
          await this.handleCallQueued(callId, metadata);
          break;

        case 'ringing':
          await this.handleCallRinging(callId, metadata);
          break;

        case 'connected':
          await this.handleCallConnected(callId, metadata);
          break;

        case 'ended':
          await this.handleCallEnded(callId, metadata);
          break;

        case 'failed':
          await this.handleCallFailed(callId, metadata);
          break;

        case 'no_answer':
          await this.handleNoAnswer(callId, metadata);
          break;

        case 'busy':
          await this.handleBusy(callId, metadata);
          break;

        case 'voicemail':
          await this.handleVoicemail(callId, metadata);
          break;
      }
    } catch (error) {
      logger.error('Failed to handle status change:', error);
    }
  }

  // Update GoHighLevel with status
  private async updateGHLStatus(
    callId: string,
    status: string,
    metadata?: Record<string, any>
  ): Promise<void> {
    try {
      // Get call record to find GHL contact ID
      const prisma = getPrismaClient();
      const call = await prisma.voiceCall.findFirst({
        where: { retellCallId: callId },
      });

      if (!call?.ghlContactId) return;

      // Update contact with call status
      await ghlService.updateContact(call.ghlContactId, {
        customFields: {
          lastCallStatus: status,
          lastCallStatusUpdate: new Date().toISOString(),
          callInProgress: ['queued', 'ringing', 'connected'].includes(status),
        },
      });

      // Add activity note for major status changes
      if (['connected', 'ended', 'failed', 'no_answer'].includes(status)) {
        const statusMessage = this.getStatusMessage(status, metadata);
        await ghlService.addNote(call.ghlContactId, statusMessage);
      }
    } catch (error) {
      logger.error('Failed to update GHL status:', error);
    }
  }

  // Get human-readable status message
  private getStatusMessage(status: string, metadata?: Record<string, any>): string {
    const timestamp = new Date().toLocaleString();

    switch (status) {
      case 'connected':
        return `Call connected at ${timestamp}`;
      case 'ended':
        const duration = metadata?.duration ? ` (${Math.round(metadata.duration / 1000)}s)` : '';
        return `Call ended at ${timestamp}${duration}`;
      case 'failed':
        const reason = metadata?.reason ? ` - ${metadata.reason}` : '';
        return `Call failed at ${timestamp}${reason}`;
      case 'no_answer':
        return `No answer at ${timestamp}`;
      case 'busy':
        return `Phone busy at ${timestamp}`;
      case 'voicemail':
        return `Voicemail detected at ${timestamp}`;
      default:
        return `Call status: ${status} at ${timestamp}`;
    }
  }

  // Handle specific status changes
  private async handleCallQueued(callId: string, metadata?: Record<string, any>): Promise<void> {
    logger.info('Call queued', { callId });

    // Set timeout to detect stuck calls
    setTimeout(
      async () => {
        const currentStatus = this.callStatuses.get(callId);
        if (currentStatus?.status === 'queued') {
          await this.updateCallStatus(callId, 'failed', {
            reason: 'Call stuck in queue',
            timeout: true,
          });
        }
      },
      2 * 60 * 1000
    ); // 2 minutes
  }

  private async handleCallRinging(callId: string, metadata?: Record<string, any>): Promise<void> {
    logger.info('Call ringing', { callId });

    // Set timeout for ringing calls
    setTimeout(async () => {
      const currentStatus = this.callStatuses.get(callId);
      if (currentStatus?.status === 'ringing') {
        await this.updateCallStatus(callId, 'no_answer', {
          reason: 'Ringing timeout',
        });
      }
    }, 30 * 1000); // 30 seconds
  }

  private async handleCallConnected(callId: string, metadata?: Record<string, any>): Promise<void> {
    logger.info('Call connected', { callId });

    // Update database with connection time
    const prisma = getPrismaClient();
    await prisma.voiceCall.updateMany({
      where: { retellCallId: callId },
      data: {
        connectedAt: new Date(),
      },
    });
  }

  private async handleCallEnded(callId: string, metadata?: Record<string, any>): Promise<void> {
    logger.info('Call ended', { callId, metadata });

    // Update database with end time
    const prisma = getPrismaClient();
    await prisma.voiceCall.updateMany({
      where: { retellCallId: callId },
      data: {
        endedAt: new Date(),
        duration: metadata?.duration ? Math.round(metadata.duration / 1000) : null,
      },
    });

    // Trigger post-call processing
    await this.triggerPostCallProcessing(callId, metadata);
  }

  private async handleCallFailed(callId: string, metadata?: Record<string, any>): Promise<void> {
    logger.warn('Call failed', { callId, reason: metadata?.reason });

    // Update database with failure reason
    const prisma = getPrismaClient();
    await prisma.voiceCall.updateMany({
      where: { retellCallId: callId },
      data: {
        status: 'failed',
        error: metadata?.reason || 'Unknown error',
        endedAt: new Date(),
      },
    });

    // Create follow-up task
    await this.createFailureFollowUp(callId, metadata);
  }

  private async handleNoAnswer(callId: string, metadata?: Record<string, any>): Promise<void> {
    logger.info('No answer', { callId });

    // Schedule follow-up call or SMS
    await this.scheduleNoAnswerFollowUp(callId, metadata);
  }

  private async handleBusy(callId: string, metadata?: Record<string, any>): Promise<void> {
    logger.info('Phone busy', { callId });

    // Schedule retry after delay
    await this.scheduleBusyRetry(callId, metadata);
  }

  private async handleVoicemail(callId: string, metadata?: Record<string, any>): Promise<void> {
    logger.info('Voicemail detected', { callId });

    // Trigger voicemail follow-up campaign
    await this.triggerVoicemailFollowUp(callId, metadata);
  }

  // Trigger post-call processing
  private async triggerPostCallProcessing(
    callId: string,
    metadata?: Record<string, any>
  ): Promise<void> {
    try {
      // Import recording manager to avoid circular dependency
      const { recordingManager } = await import('./recording-manager');

      // Process recording if available
      setTimeout(async () => {
        try {
          await recordingManager.processRecording(callId);
        } catch (error) {
          logger.error('Failed to process recording:', error);
        }
      }, 5000); // 5 second delay to ensure recording is available

      // Send post-call SMS if configured
      const call = await this.getCallWithContact(callId);
      if (call?.ghlContactId) {
        const campaignId = process.env.GHL_POST_CALL_SMS_CAMPAIGN_ID;
        if (campaignId) {
          await ghlService.triggerCampaign({
            contactId: call.ghlContactId,
            campaignId,
          });
        }
      }
    } catch (error) {
      logger.error('Failed to trigger post-call processing:', error);
    }
  }

  // Create follow-up for failed calls
  private async createFailureFollowUp(
    callId: string,
    metadata?: Record<string, any>
  ): Promise<void> {
    try {
      const call = await this.getCallWithContact(callId);
      if (!call?.ghlContactId) return;

      await ghlService.createTask({
        contactId: call.ghlContactId,
        title: 'Call Failed - Manual Follow-up Required',
        body: `Automated call failed: ${metadata?.reason || 'Unknown error'}. Please contact manually.`,
        dueDate: new Date(Date.now() + 60 * 60 * 1000), // 1 hour
      });
    } catch (error) {
      logger.error('Failed to create failure follow-up:', error);
    }
  }

  // Schedule no-answer follow-up
  private async scheduleNoAnswerFollowUp(
    callId: string,
    metadata?: Record<string, any>
  ): Promise<void> {
    try {
      const call = await this.getCallWithContact(callId);
      if (!call?.ghlContactId) return;

      // Trigger no-answer campaign
      const campaignId = process.env.GHL_NO_ANSWER_FOLLOWUP_CAMPAIGN_ID;
      if (campaignId) {
        await ghlService.triggerCampaign({
          contactId: call.ghlContactId,
          campaignId,
        });
      }

      // Create task for manual follow-up
      await ghlService.createTask({
        contactId: call.ghlContactId,
        title: 'No Answer - Follow-up Required',
        body: 'No answer on automated call. Consider sending SMS or scheduling callback.',
        dueDate: new Date(Date.now() + 4 * 60 * 60 * 1000), // 4 hours
      });
    } catch (error) {
      logger.error('Failed to schedule no-answer follow-up:', error);
    }
  }

  // Schedule retry for busy calls
  private async scheduleBusyRetry(callId: string, metadata?: Record<string, any>): Promise<void> {
    try {
      const call = await this.getCallWithContact(callId);
      if (!call?.ghlContactId) return;

      // Schedule retry after 15 minutes
      setTimeout(
        async () => {
          try {
            // Import call router to avoid circular dependency
            const { callRouter } = await import('./call-router');

            await callRouter.createRoutedCall({
              phoneNumber: call.phoneNumber,
              practiceArea: call.practiceArea || undefined,
              metadata: {
                retryReason: 'busy',
                originalCallId: callId,
              },
            });
          } catch (error) {
            logger.error('Failed to retry busy call:', error);
          }
        },
        15 * 60 * 1000
      ); // 15 minutes
    } catch (error) {
      logger.error('Failed to schedule busy retry:', error);
    }
  }

  // Trigger voicemail follow-up
  private async triggerVoicemailFollowUp(
    callId: string,
    metadata?: Record<string, any>
  ): Promise<void> {
    try {
      const call = await this.getCallWithContact(callId);
      if (!call?.ghlContactId) return;

      // Trigger voicemail campaign
      const campaignId = process.env.GHL_VOICEMAIL_FOLLOWUP_CAMPAIGN_ID;
      if (campaignId) {
        await ghlService.triggerCampaign({
          contactId: call.ghlContactId,
          campaignId,
        });
      }
    } catch (error) {
      logger.error('Failed to trigger voicemail follow-up:', error);
    }
  }

  // Get call with contact information
  private async getCallWithContact(callId: string) {
    try {
      const prisma = getPrismaClient();
      return await prisma.voiceCall.findFirst({
        where: { retellCallId: callId },
      });
    } catch (error) {
      logger.error('Failed to get call with contact:', error);
      return null;
    }
  }

  // Get current status of a call
  getCurrentStatus(callId: string): CallStatus | null {
    return this.callStatuses.get(callId) || null;
  }

  // Get status history for a call
  async getStatusHistory(callId: string) {
    try {
      const prisma = getPrismaClient();

      const history = await prisma.callStatusHistory.findMany({
        where: { callId },
        orderBy: { timestamp: 'asc' },
      });

      return history;
    } catch (error) {
      logger.error('Failed to get status history:', error);
      throw error;
    }
  }

  // Get active calls
  getActiveCalls(): CallStatus[] {
    return Array.from(this.callStatuses.values()).filter(status =>
      ['queued', 'ringing', 'connected'].includes(status.status)
    );
  }

  // Get status analytics
  async getStatusAnalytics(timeRange?: { start: Date; end: Date }) {
    try {
      const prisma = getPrismaClient();

      const where: any = {};
      if (timeRange) {
        where.timestamp = {
          gte: timeRange.start,
          lte: timeRange.end,
        };
      }

      const statusUpdates = await prisma.callStatusHistory.findMany({
        where,
        select: {
          newStatus: true,
          timestamp: true,
        },
      });

      const analytics = {
        total: statusUpdates.length,
        statusDistribution: {} as Record<string, number>,
        trendsOverTime: [] as any[],
      };

      statusUpdates.forEach(update => {
        analytics.statusDistribution[update.newStatus] =
          (analytics.statusDistribution[update.newStatus] || 0) + 1;
      });

      return analytics;
    } catch (error) {
      logger.error('Failed to get status analytics:', error);
      throw error;
    }
  }

  // Clean up old status data
  async cleanupOldStatuses(daysToKeep: number = 30) {
    try {
      const cutoffDate = new Date(Date.now() - daysToKeep * 24 * 60 * 60 * 1000);

      const prisma = getPrismaClient();
      const deletedCount = await prisma.callStatusHistory.deleteMany({
        where: {
          timestamp: {
            lt: cutoffDate,
          },
        },
      });

      // Clean up memory cache for old calls
      const currentTime = Date.now();
      for (const [callId, status] of this.callStatuses.entries()) {
        if (currentTime - status.timestamp.getTime() > daysToKeep * 24 * 60 * 60 * 1000) {
          this.callStatuses.delete(callId);
          this.statusSubscribers.delete(callId);
        }
      }

      logger.info('Old status data cleaned up', {
        deletedCount: deletedCount.count,
        cutoffDate,
      });

      return deletedCount.count;
    } catch (error) {
      logger.error('Failed to cleanup old statuses:', error);
      throw error;
    }
  }
}

// Export singleton instance
export const statusManager = StatusManager.getInstance();
