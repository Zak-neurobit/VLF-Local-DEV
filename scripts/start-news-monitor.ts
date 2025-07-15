#!/usr/bin/env node

import { enhancedLegalBlogger } from '../src/agents/enhanced-legal-blogger';
import { immigrationNewsMonitor } from '../src/agents/immigration-news-monitor';
import { logger } from '../src/lib/logger';

async function startNewsMonitoring() {
  logger.info('Starting VLF News Monitoring System...');

  try {
    // Start the enhanced legal blogger
    await enhancedLegalBlogger.start();
    logger.info('✅ Enhanced Legal Blogger started');

    // Start the immigration news monitor
    await immigrationNewsMonitor.start();
    logger.info('✅ Immigration News Monitor started');

    logger.info(`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🚨 VLF NEWS MONITORING ACTIVE 🚨

Monitoring Sources:
- USCIS News & Alerts
- EOIR (Immigration Courts)
- Federal Register (Immigration)
- NC State Bar Updates
- DHS Immigration News

Features:
✓ Zero hallucinations - only verified sources
✓ Auto-generate SEO-optimized blog posts
✓ Bilingual content support
✓ Urgent news prioritization
✓ Brand-compliant formatting

Check Frequency: Every 30 minutes
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    `);

    // Keep the process running
    process.on('SIGINT', async () => {
      logger.info('Shutting down news monitoring...');
      await enhancedLegalBlogger.stop();
      await immigrationNewsMonitor.stop();
      process.exit(0);
    });
  } catch (error) {
    logger.error('Failed to start news monitoring:', error);
    process.exit(1);
  }
}

// Start the monitoring
startNewsMonitoring().catch(console.error);
