'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.getRetellClient = exports.RetellClient = void 0;
const index_1 = require('./index');
// Re-export the service as RetellClient for backward compatibility
class RetellClient {
  constructor() {
    try {
      this.service = (0, index_1.getRetellService)();
    } catch (error) {
      // If Retell is not configured, create a mock service
      console.warn('Retell service not configured, using mock implementation');
      this.service = null;
    }
  }
  async call(phoneNumber, agentId) {
    if (!this.service) {
      return { callId: 'mock-call-id', success: true };
    }
    try {
      const call = await this.service.createPhoneCall({
        agent_id: agentId,
        from_number: process.env.RETELL_PHONE_NUMBER || '+18449673536',
        to_number: phoneNumber,
        metadata: {
          source: 'website',
          timestamp: new Date().toISOString(),
        },
      });
      return {
        callId: call.call_id,
        success: true,
      };
    } catch (error) {
      console.error('Failed to create call:', error);
      return {
        callId: null,
        success: false,
        error: error instanceof Error ? error.message : 'Failed to create call',
      };
    }
  }
  async endCall(callId) {
    if (!this.service) {
      return { success: true };
    }
    try {
      await this.service.endCall(callId);
      return { success: true };
    } catch (error) {
      console.error('Failed to end call:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to end call',
      };
    }
  }
  async getCallDetails(callId) {
    if (!this.service) {
      return { callId, status: 'completed' };
    }
    try {
      const call = await this.service.getCall(callId);
      return {
        callId: call?.call_id || callId,
        status: call?.call_status || 'unknown',
        duration: call?.duration_ms,
        transcript: call?.transcript,
        recordingUrl: call?.recording_url,
      };
    } catch (error) {
      console.error('Failed to get call details:', error);
      return { callId, status: 'error' };
    }
  }
}
exports.RetellClient = RetellClient;
const getRetellClient = () => new RetellClient();
exports.getRetellClient = getRetellClient;
exports.default = RetellClient;
