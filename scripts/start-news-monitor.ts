#!/usr/bin/env tsx

/**
 * News Monitor Service
 * Starts the enhanced legal blogger agent to continuously monitor RSS feeds
 * and populate the database with SEO-optimized blog posts
 */

import { spawn } from 'child_process';
import { logger } from '../src/lib/safe-logger';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config({ path: path.join(__dirname, '..', '.env') });

// Verify database connection
import { prisma } from '../src/lib/prisma';

async function startNewsMonitor() {
  logger.info('🚀 Starting News Monitor Service...');

  try {
    // Test database connection
    await prisma.$connect();
    logger.info('✅ Database connection established');

    // Import and start the enhanced legal blogger
    const { EnhancedLegalBlogger } = await import('../src/agents/enhanced-legal-blogger');
    
    const blogger = new EnhancedLegalBlogger({
      checkInterval: 30 * 60 * 1000, // 30 minutes
      maxPostsPerDay: 10,
      categories: ['immigration', 'personal-injury', 'workers-compensation', 'criminal-defense', 'family-law'],
      targetLocales: ['en', 'es'],
    });

    // Start monitoring
    logger.info('📡 Starting RSS feed monitoring...');
    await blogger.start();

    // Log status every 5 minutes
    setInterval(() => {
      logger.info('📊 News Monitor Status: Active and monitoring feeds');
    }, 5 * 60 * 1000);

    // Handle graceful shutdown
    process.on('SIGINT', async () => {
      logger.info('⏹️  Shutting down News Monitor...');
      await blogger.stop();
      await prisma.$disconnect();
      process.exit(0);
    });

    process.on('SIGTERM', async () => {
      logger.info('⏹️  Shutting down News Monitor...');
      await blogger.stop();
      await prisma.$disconnect();
      process.exit(0);
    });

    logger.info('✨ News Monitor Service is running!');
    logger.info('📰 Monitoring RSS feeds every 30 minutes');
    logger.info('🌐 Creating bilingual content (EN/ES)');
    logger.info('Press Ctrl+C to stop');

  } catch (error) {
    logger.error('❌ Failed to start News Monitor:', error);
    process.exit(1);
  }
}

// Start the service
startNewsMonitor().catch(error => {
  logger.error('Fatal error:', error);
  process.exit(1);
});