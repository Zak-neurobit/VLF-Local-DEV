#!/usr/bin/env node

import { logger } from '../src/lib/logger';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs/promises';

// Load environment variables
dotenv.config({ path: path.join(process.cwd(), '.env.local') });

async function setupSentry() {
  console.log('🔒 Sentry Error Tracking Setup\n');
  console.log('='.repeat(50));

  // Check current configuration
  const hasSentryDSN = !!process.env.SENTRY_DSN;
  const hasNextPublicSentryDSN = !!process.env.NEXT_PUBLIC_SENTRY_DSN;

  console.log('\n📋 Current Configuration:');
  console.log(`- SENTRY_DSN: ${hasSentryDSN ? '✓ Set' : '✗ Not set'}`);
  console.log(`- NEXT_PUBLIC_SENTRY_DSN: ${hasNextPublicSentryDSN ? '✓ Set' : '✗ Not set'}`);
  console.log(`- Environment: ${process.env.NODE_ENV || 'development'}`);

  if (!hasSentryDSN) {
    console.log('\n⚠️  Sentry is not configured!');
    console.log('\nTo set up Sentry error tracking:');
    console.log('\n1. Create a Sentry account at https://sentry.io');
    console.log('2. Create a new project for your Next.js app');
    console.log('3. Get your DSN from the project settings');
    console.log('4. Add these to your .env.local file:');
    console.log('\n   # Sentry Error Tracking');
    console.log('   SENTRY_DSN=your_sentry_dsn_here');
    console.log('   NEXT_PUBLIC_SENTRY_DSN=your_sentry_dsn_here');
    console.log('   SENTRY_ORG=your_organization_slug');
    console.log('   SENTRY_PROJECT=your_project_slug');
    console.log('   SENTRY_AUTH_TOKEN=your_auth_token_for_source_maps');
    console.log('\n5. Optional settings:');
    console.log('   SENTRY_ENVIRONMENT=production');
    console.log('   SENTRY_TRACES_SAMPLE_RATE=0.1');
    console.log('   SENTRY_REPLAY_SESSION_SAMPLE_RATE=0.1');
    console.log('   SENTRY_REPLAY_ON_ERROR_SAMPLE_RATE=1.0');

    // Create example Sentry configuration files
    await createSentryConfigs();

    console.log('\n✅ Created Sentry configuration files:');
    console.log('   - sentry.client.config.ts');
    console.log('   - sentry.server.config.ts');
    console.log('   - sentry.edge.config.ts');
    console.log('\nOnce you add your Sentry DSN, error tracking will be automatically enabled.');
  } else {
    console.log('\n✅ Sentry is configured!');
    console.log('\nSentry will automatically capture:');
    console.log('- JavaScript errors in the browser');
    console.log('- API route errors');
    console.log('- Server-side rendering errors');
    console.log('- Performance monitoring data');
    console.log('- User session replays (on errors)');

    // Test Sentry configuration
    console.log('\n🧪 Testing Sentry configuration...');
    try {
      const Sentry = await import('@sentry/nextjs');
      console.log('✅ Sentry SDK loaded successfully');
      console.log(`✅ DSN configured: ${process.env.SENTRY_DSN.substring(0, 30)}...`);
    } catch (error) {
      console.log('⚠️  Could not load Sentry SDK:', error);
    }
  }

  console.log('\n📚 Sentry Resources:');
  console.log('- Documentation: https://docs.sentry.io/platforms/javascript/guides/nextjs/');
  console.log('- Best Practices: https://docs.sentry.io/product/best-practices/');
  console.log('- Performance Monitoring: https://docs.sentry.io/product/performance/');
  console.log('- Session Replay: https://docs.sentry.io/product/session-replay/');
}

async function createSentryConfigs() {
  // Create sentry.client.config.ts
  const clientConfig = `// This file configures the initialization of Sentry on the client side
// See: https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  
  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
  
  // Setting this option to true will print useful information to the console while you're setting up Sentry
  debug: false,
  
  replaysOnErrorSampleRate: 1.0,
  replaysSessionSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 0,

  // You can remove this option if you're not planning to use the Sentry Session Replay feature
  integrations: [
    Sentry.replayIntegration({
      // Additional Replay configuration
      maskAllText: false,
      blockAllMedia: false,
    }),
  ],
  
  // Filter out specific errors
  beforeSend(event, hint) {
    // Filter out known non-critical errors
    if (event.exception?.values?.[0]?.type === 'ChunkLoadError') {
      return null;
    }
    return event;
  },
});
`;

  // Create sentry.server.config.ts
  const serverConfig = `// This file configures the initialization of Sentry on the server side
// See: https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  
  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
  
  // Setting this option to true will print useful information to the console while you're setting up Sentry
  debug: false,
  
  // Capture API route performance
  integrations: [
    Sentry.httpIntegration(),
  ],
  
  // Filter sensitive data
  beforeSend(event, hint) {
    // Remove sensitive headers
    if (event.request?.headers) {
      delete event.request.headers.cookie;
      delete event.request.headers.authorization;
    }
    return event;
  },
});
`;

  // Create sentry.edge.config.ts
  const edgeConfig = `// This file configures the initialization of Sentry for edge features (middleware, edge routes, etc.)
// See: https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  
  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
  
  // Setting this option to true will print useful information to the console while you're setting up Sentry
  debug: false,
});
`;

  // Write configuration files
  await fs.writeFile(path.join(process.cwd(), 'sentry.client.config.ts'), clientConfig);
  await fs.writeFile(path.join(process.cwd(), 'sentry.server.config.ts'), serverConfig);
  await fs.writeFile(path.join(process.cwd(), 'sentry.edge.config.ts'), edgeConfig);

  // Update next.config.js to include Sentry
  const nextConfigPath = path.join(process.cwd(), 'next.config.js');
  const nextConfig = await fs.readFile(nextConfigPath, 'utf-8');

  if (!nextConfig.includes('withSentryConfig')) {
    console.log(
      '\n📝 Note: To enable source map uploads, wrap your next.config.js with withSentryConfig:'
    );
    console.log('\nconst { withSentryConfig } = require("@sentry/nextjs");');
    console.log('module.exports = withSentryConfig(nextConfig, {');
    console.log('  silent: true,');
    console.log('  org: "your-org-slug",');
    console.log('  project: "your-project-slug",');
    console.log('});');
  }
}

// Run setup
setupSentry().catch(error => {
  console.error('Setup failed:', error);
  process.exit(1);
});
