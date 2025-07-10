'use strict';
/**
 * API Safety utilities to handle missing API keys gracefully
 */
Object.defineProperty(exports, '__esModule', { value: true });
exports.APISafetyWrapper = void 0;
exports.checkRequiredAPIs = checkRequiredAPIs;
class APISafetyWrapper {
  constructor(config) {
    this.config = config;
    this.isConfigured = Boolean(config.key && config.key !== 'placeholder' && config.key !== '');
  }
  /**
   * Check if the API is properly configured
   */
  isAvailable() {
    return this.isConfigured;
  }
  /**
   * Execute a function only if the API is configured
   */
  async execute(fn, fallback) {
    if (!this.isConfigured) {
      if (this.config.required) {
        throw new Error(`${this.config.serviceName} API key is required but not configured`);
      }
      console.warn(`${this.config.serviceName} API is not configured - using fallback`);
      if (fallback !== undefined) {
        return fallback;
      }
      throw new Error(`${this.config.serviceName} API is not configured and no fallback provided`);
    }
    try {
      return await fn();
    } catch (error) {
      console.error(`${this.config.serviceName} API error:`, error);
      throw error;
    }
  }
  /**
   * Get a mock response for development/demo purposes
   */
  getMockResponse(mockData) {
    console.info(`${this.config.serviceName}: Using mock data (API not configured)`);
    return mockData;
  }
}
exports.APISafetyWrapper = APISafetyWrapper;
// Convenience function to check multiple APIs
function checkRequiredAPIs(apis) {
  const missing = [];
  const configured = [];
  apis.forEach(api => {
    const wrapper = new APISafetyWrapper(api);
    if (wrapper.isAvailable()) {
      configured.push(api.serviceName);
    } else if (api.required) {
      missing.push(api.serviceName);
    }
  });
  return { missing, configured };
}
