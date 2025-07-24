#!/usr/bin/env tsx

/**
 * SEO Automation Startup Script
 * Launches all content generation systems for Vasquez Law Firm
 */

import { spawn } from 'child_process';
import { logger } from '../src/lib/safe-logger';
import dotenv from 'dotenv';
import path from 'path';
import { prisma } from '../src/lib/prisma';

// Load environment variables
dotenv.config({ path: path.join(__dirname, '..', '.env.local') });
dotenv.config({ path: path.join(__dirname, '..', '.env') });

// Import all automation systems
import { EnhancedLegalBlogger } from '../src/agents/enhanced-legal-blogger';
import { ContentFactory } from '../src/services/content-factory';
import { initializeAgentOrchestrator } from '../src/lib/agents/agent-orchestrator';
import { startBullDashboard } from '../src/lib/queue/bull-dashboard';

// Color codes for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
  magenta: '\x1b[35m'
};

async function printBanner() {
  console.clear();
  console.log(`${colors.cyan}${colors.bright}
╔══════════════════════════════════════════════════════════════╗
║                                                              ║
║    🚀 VASQUEZ LAW FIRM - SEO AUTOMATION SYSTEM 🚀           ║
║                                                              ║
║    Content Generation | Bilingual | AI-Powered | 24/7       ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
${colors.reset}`);
}

async function checkDependencies() {
  logger.info('🔍 Checking dependencies...');
  
  // Check database connection
  try {
    await prisma.$connect();
    console.log(`${colors.green}✅ Database connection established${colors.reset}`);
  } catch (error) {
    console.log(`${colors.red}❌ Database connection failed${colors.reset}`);
    throw error;
  }

  // Check API keys
  const requiredEnvVars = [
    'OPENAI_API_KEY',
    'DATABASE_URL',
    'NEXT_PUBLIC_APP_URL'
  ];

  const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
  
  if (missingVars.length > 0) {
    console.log(`${colors.red}❌ Missing environment variables: ${missingVars.join(', ')}${colors.reset}`);
    console.log(`${colors.yellow}Please add them to your .env file${colors.reset}`);
    process.exit(1);
  }

  console.log(`${colors.green}✅ All required environment variables present${colors.reset}`);
}

async function startEnhancedLegalBlogger() {
  console.log(`\n${colors.blue}📰 Starting Enhanced Legal Blogger...${colors.reset}`);
  
  const blogger = new EnhancedLegalBlogger({
    checkInterval: 30 * 60 * 1000, // 30 minutes
    maxPostsPerDay: 10,
    categories: ['immigration', 'personal-injury', 'workers-compensation', 'criminal-defense', 'family-law'],
    targetLocales: ['en', 'es'],
  });

  await blogger.start();
  
  console.log(`${colors.green}✅ Enhanced Legal Blogger started${colors.reset}`);
  console.log(`   - Monitoring 30+ RSS feeds`);
  console.log(`   - Generating bilingual content`);
  console.log(`   - Max 10 posts per day`);
  
  return blogger;
}

async function startContentFactory() {
  console.log(`\n${colors.magenta}🏭 Starting Content Factory...${colors.reset}`);
  
  const factory = new ContentFactory({
    enableBlogGeneration: true,
    enableLandingPages: true,
    enableSocialMedia: true,
    enableEmailCampaigns: true,
    scheduleInterval: 60 * 60 * 1000, // 1 hour
  });

  await factory.start();
  
  console.log(`${colors.green}✅ Content Factory started${colors.reset}`);
  console.log(`   - Blog post generation`);
  console.log(`   - Landing page creation`);
  console.log(`   - Social media content`);
  console.log(`   - Email campaigns`);
  
  return factory;
}

async function startAgentOrchestrator() {
  console.log(`\n${colors.yellow}🤖 Starting Agent Orchestrator...${colors.reset}`);
  
  const orchestrator = await initializeAgentOrchestrator();
  
  console.log(`${colors.green}✅ Agent Orchestrator started${colors.reset}`);
  console.log(`   - Lead validation agent`);
  console.log(`   - Follow-up automation`);
  console.log(`   - Competition monitoring`);
  console.log(`   - Social media automation`);
  
  return orchestrator;
}

async function startDashboard() {
  console.log(`\n${colors.cyan}📊 Starting Monitoring Dashboard...${colors.reset}`);
  
  try {
    await startBullDashboard();
    console.log(`${colors.green}✅ Bull Dashboard started at http://localhost:3001${colors.reset}`);
  } catch (error) {
    console.log(`${colors.yellow}⚠️  Dashboard startup failed (non-critical)${colors.reset}`);
  }
}

async function displayStatus() {
  console.log(`\n${colors.bright}═══════════════════════════════════════════════════════════════${colors.reset}`);
  console.log(`${colors.green}${colors.bright}✨ ALL SYSTEMS OPERATIONAL ✨${colors.reset}`);
  console.log(`${colors.bright}═══════════════════════════════════════════════════════════════${colors.reset}\n`);
  
  console.log(`${colors.bright}📋 Active Systems:${colors.reset}`);
  console.log(`   ${colors.green}●${colors.reset} Enhanced Legal Blogger - Monitoring RSS feeds`);
  console.log(`   ${colors.green}●${colors.reset} Content Factory - Generating SEO content`);
  console.log(`   ${colors.green}●${colors.reset} Agent Orchestrator - Managing AI agents`);
  console.log(`   ${colors.green}●${colors.reset} Bilingual Generation - EN/ES content`);
  
  console.log(`\n${colors.bright}📊 Monitoring:${colors.reset}`);
  console.log(`   - RSS Feeds: 30+ sources`);
  console.log(`   - Check Interval: Every 30 minutes`);
  console.log(`   - Max Posts/Day: 10`);
  console.log(`   - Languages: English & Spanish`);
  
  console.log(`\n${colors.bright}🔗 Useful Links:${colors.reset}`);
  console.log(`   - Dashboard: http://localhost:3001`);
  console.log(`   - Blog Admin: http://localhost:3000/admin/blog`);
  console.log(`   - Analytics: http://localhost:3000/admin/analytics`);
  
  console.log(`\n${colors.yellow}Press Ctrl+C to stop all systems${colors.reset}`);
}

async function startAllSystems() {
  try {
    await printBanner();
    await checkDependencies();
    
    // Start all systems
    const blogger = await startEnhancedLegalBlogger();
    const factory = await startContentFactory();
    const orchestrator = await startAgentOrchestrator();
    await startDashboard();
    
    // Display status
    await displayStatus();
    
    // Log status every 30 minutes
    setInterval(() => {
      logger.info('🔄 SEO Automation Status Check', {
        uptime: process.uptime(),
        memory: process.memoryUsage(),
        timestamp: new Date().toISOString()
      });
    }, 30 * 60 * 1000);
    
    // Handle graceful shutdown
    process.on('SIGINT', async () => {
      console.log(`\n${colors.yellow}⏹️  Shutting down SEO Automation...${colors.reset}`);
      
      try {
        await blogger.stop();
        await factory.stop();
        await orchestrator.stop();
        await prisma.$disconnect();
        
        console.log(`${colors.green}✅ All systems stopped gracefully${colors.reset}`);
        process.exit(0);
      } catch (error) {
        console.error(`${colors.red}❌ Error during shutdown:${colors.reset}`, error);
        process.exit(1);
      }
    });
    
    process.on('SIGTERM', async () => {
      console.log(`\n${colors.yellow}⏹️  Received SIGTERM, shutting down...${colors.reset}`);
      process.exit(0);
    });
    
  } catch (error) {
    console.error(`${colors.red}${colors.bright}❌ Failed to start SEO Automation:${colors.reset}`, error);
    process.exit(1);
  }
}

// Error handling
process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection at:', { promise, reason });
});

process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception:', error);
  process.exit(1);
});

// Start everything
startAllSystems().catch(error => {
  console.error(`${colors.red}Fatal error:${colors.reset}`, error);
  process.exit(1);
});