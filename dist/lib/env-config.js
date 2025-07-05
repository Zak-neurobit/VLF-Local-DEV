"use strict";
/**
 * Environment configuration management
 * Handles missing environment variables gracefully and logs warnings only once
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SERVICE_CONFIGS = exports.envConfig = void 0;
const logger_1 = require("@/lib/logger");
class EnvironmentConfig {
    constructor() {
        this.loggedWarnings = new Set();
        this.serviceStatuses = new Map();
    }
    static getInstance() {
        if (!EnvironmentConfig.instance) {
            EnvironmentConfig.instance = new EnvironmentConfig();
        }
        return EnvironmentConfig.instance;
    }
    /**
     * Check service configuration and log warnings only once
     */
    checkService(config) {
        const missingVars = [];
        const missingRequired = [];
        // Check each environment variable
        config.envVars.forEach(envVar => {
            const value = process.env[envVar.key];
            const isEmpty = !value || value === '' || value === 'placeholder' || value === 'your-' + envVar.key.toLowerCase().replace(/_/g, '-');
            if (isEmpty) {
                missingVars.push(envVar.key);
                if (envVar.required) {
                    missingRequired.push(envVar.key);
                }
            }
        });
        // Determine service status
        const isConfigured = missingRequired.length === 0;
        const serviceKey = config.name.toLowerCase();
        // Only log if status changed or first check
        const previousStatus = this.serviceStatuses.get(serviceKey);
        if (previousStatus === undefined || previousStatus !== isConfigured) {
            this.serviceStatuses.set(serviceKey, isConfigured);
            if (!isConfigured && config.onMissing !== 'silent') {
                const warningKey = `${serviceKey}-config`;
                if (!this.loggedWarnings.has(warningKey)) {
                    this.loggedWarnings.add(warningKey);
                    if (config.onMissing === 'error' && missingRequired.length > 0) {
                        logger_1.logger.error(`${config.name} service is missing required configuration`, {
                            missing: missingRequired,
                            service: config.name
                        });
                    }
                    else if (missingVars.length > 0) {
                        logger_1.logger.info(`${config.name} service not configured (operating in mock mode)`, {
                            missing: missingVars,
                            service: config.name,
                            message: 'Service will use mock responses in development'
                        });
                    }
                }
            }
        }
        return isConfigured;
    }
    /**
     * Get service configuration status without logging
     */
    isServiceConfigured(serviceName) {
        return this.serviceStatuses.get(serviceName.toLowerCase()) ?? false;
    }
    /**
     * Log environment summary (useful for startup)
     */
    logEnvironmentSummary() {
        const configured = [];
        const notConfigured = [];
        this.serviceStatuses.forEach((isConfigured, service) => {
            if (isConfigured) {
                configured.push(service);
            }
            else {
                notConfigured.push(service);
            }
        });
        if (configured.length > 0) {
            logger_1.logger.info('Configured services', { services: configured });
        }
        if (notConfigured.length > 0) {
            logger_1.logger.info('Services operating in mock mode', {
                services: notConfigured,
                note: 'This is normal for development. Configure environment variables to enable these services.'
            });
        }
    }
    /**
     * Reset warnings (useful for testing)
     */
    reset() {
        this.loggedWarnings.clear();
        this.serviceStatuses.clear();
    }
}
// Export singleton instance
exports.envConfig = EnvironmentConfig.getInstance();
// Service configurations
exports.SERVICE_CONFIGS = {
    GOHIGHLEVEL: {
        name: 'GoHighLevel',
        envVars: [
            { key: 'GHL_API_KEY', required: false, description: 'GoHighLevel API Key' },
            { key: 'GHL_LOCATION_ID', required: false, description: 'GoHighLevel Location ID' }
        ],
        onMissing: 'warn'
    },
    OPENAI: {
        name: 'OpenAI',
        envVars: [
            { key: 'OPENAI_API_KEY', required: true, description: 'OpenAI API Key for chatbot' }
        ],
        onMissing: 'error'
    },
    DATABASE: {
        name: 'Database',
        envVars: [
            { key: 'DATABASE_URL', required: true, description: 'PostgreSQL connection string' }
        ],
        onMissing: 'error'
    },
    EMAIL: {
        name: 'Email',
        envVars: [
            { key: 'SMTP_HOST', required: false, description: 'SMTP Host' },
            { key: 'SMTP_USER', required: false, description: 'SMTP Username' },
            { key: 'SMTP_PASSWORD', required: false, description: 'SMTP Password' }
        ],
        onMissing: 'warn'
    },
    REDIS: {
        name: 'Redis',
        envVars: [
            { key: 'REDIS_URL', required: false, description: 'Redis connection URL' }
        ],
        onMissing: 'silent' // Already handled by MOCK_REDIS flag
    },
    GOOGLE_MAPS: {
        name: 'Google Maps',
        envVars: [
            { key: 'NEXT_PUBLIC_GOOGLE_MAPS_API_KEY', required: false, description: 'Google Maps JavaScript API key' }
        ],
        onMissing: 'warn'
    },
    TWILIO: {
        name: 'Twilio',
        envVars: [
            { key: 'TWILIO_ACCOUNT_SID', required: false, description: 'Twilio Account SID' },
            { key: 'TWILIO_AUTH_TOKEN', required: false, description: 'Twilio Auth Token' },
            { key: 'TWILIO_PHONE_NUMBER', required: false, description: 'Twilio Phone Number' }
        ],
        onMissing: 'warn'
    }
};
