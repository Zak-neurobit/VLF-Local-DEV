#!/usr/bin/env tsx
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config({ path: path.join(process.cwd(), '.env') });
dotenv.config({ path: path.join(process.cwd(), '.env.local'), override: true });

// Set TLS for Neon
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

import { enhancedLegalBlogger } from '../src/agents/enhanced-legal-blogger';
import { logger } from '../src/lib/logger';
import { prisma } from '../src/lib/prisma';

async function startNewsMonitoring() {
  logger.info('Starting VLF News Monitoring System...');

  try {
    // Test database connection first
    const postCount = await prisma.blogPost.count();
    logger.info(`✅ Database connected. Current blog posts: ${postCount}`);

    // Start the enhanced legal blogger
    await enhancedLegalBlogger.start();
    logger.info('✅ Enhanced Legal Blogger started');

    console.log(`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🚨 YO PELEO™ NOTICIAS - VLF NEWS MONITORING ACTIVE 🚨

Monitoring Sources:
- Federal Register (DHS, USCIS, DOJ, State Dept)
- Immigration Policy Organizations
- Legal News Sources (Law360, JD Supra)
- Congress & Senate Immigration Bills
- NC & FL State Immigration News

Features:
✓ Zero hallucinations - only verified RSS feeds
✓ Auto-generate SEO-optimized blog posts
✓ Brand-compliant VLF formatting
✓ Urgent news prioritization
✓ Database storage for blog agents

Check Frequency: Every 30 minutes
Current Blog Posts: ${postCount}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    `);

    // Keep the process running
    process.on('SIGINT', async () => {
      logger.info('Shutting down news monitoring...');
      await enhancedLegalBlogger.stop();
      await prisma.$disconnect();
      process.exit(0);
    });

    // Log status every hour
    setInterval(
      async () => {
        const now = new Date().toLocaleString();
        const currentCount = await prisma.blogPost.count();
        console.log(`\n📡 [${now}] Monitor Status:`);
        console.log(`   • Status: Active`);
        console.log(`   • Blog posts: ${currentCount}`);
      },
      60 * 60 * 1000
    );
  } catch (error) {
    logger.error('Failed to start news monitoring:', error);
    process.exit(1);
  }
}

// Start the monitoring
startNewsMonitoring().catch(console.error);
