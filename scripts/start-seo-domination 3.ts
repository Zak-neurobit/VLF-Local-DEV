#!/usr/bin/env ts-node

import { config } from 'dotenv';
import { logger } from '../src/lib/logger';
import { SEODominationOrchestrator } from '../src/lib/crewai/seo-domination/seo-domination-orchestrator';

// Load environment variables
config();

async function startSEODomination() {
  try {
    logger.info('🚀 Initializing SEO Domination System...');

    // Verify required environment variables
    const requiredEnvVars = [
      'DATABASE_URL',
      'OPENAI_API_KEY',
      'TWILIO_ACCOUNT_SID',
      'TWILIO_AUTH_TOKEN',
      'TWILIO_PHONE_NUMBER',
      'SMTP_HOST',
      'SMTP_USER',
      'SMTP_PASS',
      'GMB_ACCOUNT_ID',
      'GMB_LOCATION_CHARLOTTE',
      'FACEBOOK_PAGE_ID',
      'FACEBOOK_ACCESS_TOKEN',
    ];

    const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

    if (missingVars.length > 0) {
      logger.error('Missing required environment variables:', missingVars);
      logger.info('Please set these variables in your .env file');
      process.exit(1);
    }

    // Create and start the orchestrator
    const orchestrator = new SEODominationOrchestrator();

    logger.info('🔥 Starting total SEO domination...');
    await orchestrator.startTotalDomination();

    logger.info('✅ SEO Domination System is now running!');
    logger.info('📊 Monitor progress at: http://localhost:3000/admin/seo-domination');
    logger.info('🛑 Press Ctrl+C to stop');

    // Keep the process running
    process.on('SIGINT', async () => {
      logger.info('\n🛑 Shutting down SEO Domination System...');
      await orchestrator.stopDomination();
      logger.info('✅ System stopped gracefully');
      process.exit(0);
    });

    // Log performance every 5 minutes
    setInterval(
      async () => {
        const summary = await orchestrator.generateExecutiveSummary();
        logger.info('\n📊 PERFORMANCE UPDATE:\n' + summary);
      },
      5 * 60 * 1000
    );
  } catch (error) {
    logger.error('Failed to start SEO Domination System:', error);
    process.exit(1);
  }
}

// Run the system
startSEODomination().catch(error => {
  logger.error('Unhandled error:', error);
  process.exit(1);
});
