#!/usr/bin/env node

import * as Sentry from '@sentry/nextjs';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config({ path: path.join(process.cwd(), '.env.local') });

async function testSentry() {
  console.log('🐛 Testing Sentry Error Tracking\n');
  console.log('='.repeat(50));

  // Check configuration
  const hasDSN = !!process.env.SENTRY_DSN;
  const hasPublicDSN = !!process.env.NEXT_PUBLIC_SENTRY_DSN;

  console.log('\n📋 Configuration Status:');
  console.log(`- SENTRY_DSN: ${hasDSN ? '✅ Configured' : '❌ Not configured'}`);
  console.log(`- NEXT_PUBLIC_SENTRY_DSN: ${hasPublicDSN ? '✅ Configured' : '❌ Not configured'}`);
  console.log(`- Organization: ${process.env.SENTRY_ORG || 'Not set'}`);
  console.log(`- Project: ${process.env.SENTRY_PROJECT || 'Not set'}`);
  console.log(`- Environment: ${process.env.SENTRY_ENVIRONMENT || 'Not set'}`);

  if (!hasDSN) {
    console.log('\n❌ Sentry is not configured. Please add SENTRY_DSN to your .env.local');
    return;
  }

  // Initialize Sentry
  console.log('\n🔧 Initializing Sentry...');
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    environment: process.env.SENTRY_ENVIRONMENT || 'development',
    tracesSampleRate: 1.0,
    debug: true,
  });

  console.log('✅ Sentry initialized successfully');

  // Test different types of errors
  console.log('\n🧪 Sending test events to Sentry...\n');

  // 1. Test message
  console.log('1. Sending test message...');
  Sentry.captureMessage('Test message from Vasquez Law Firm setup', 'info');
  console.log('   ✅ Test message sent');

  // 2. Test error
  console.log('\n2. Sending test error...');
  try {
    throw new Error('Test error from Vasquez Law Firm setup');
  } catch (error) {
    Sentry.captureException(error);
    console.log('   ✅ Test error sent');
  }

  // 3. Test custom context
  console.log('\n3. Sending error with custom context...');
  Sentry.withScope(scope => {
    scope.setTag('test', true);
    scope.setContext('setup', {
      service: 'Vasquez Law Firm Website',
      environment: 'test',
      timestamp: new Date().toISOString(),
    });
    scope.setUser({
      id: 'test-user',
      email: 'test@vasquezlawnc.com',
    });

    Sentry.captureMessage('Test with context from setup script', 'warning');
  });
  console.log('   ✅ Contextual event sent');

  // 4. Test breadcrumbs
  console.log('\n4. Testing breadcrumbs...');
  Sentry.addBreadcrumb({
    message: 'User clicked test button',
    category: 'ui.click',
    level: 'info',
  });
  Sentry.addBreadcrumb({
    message: 'API request started',
    category: 'api',
    level: 'info',
  });
  Sentry.captureMessage('Event with breadcrumbs', 'info');
  console.log('   ✅ Breadcrumb event sent');

  // Wait for events to be sent
  console.log('\n⏳ Flushing events to Sentry...');
  await Sentry.flush(2000);

  console.log('\n✅ All test events sent successfully!');
  console.log('\n📊 Check your Sentry dashboard at:');
  console.log(
    `   https://${process.env.SENTRY_ORG}.sentry.io/projects/${process.env.SENTRY_PROJECT}/`
  );
  console.log('\nYou should see:');
  console.log('- 1 info message');
  console.log('- 1 error');
  console.log('- 1 warning with custom context');
  console.log('- 1 info message with breadcrumbs');

  console.log('\n🎯 Next Steps:');
  console.log('1. Verify events appear in your Sentry dashboard');
  console.log('2. Set up alerts and notifications');
  console.log('3. Configure release tracking');
  console.log('4. Enable performance monitoring');
  console.log('5. Set up user feedback widget');
}

// Run test
testSentry().catch(error => {
  console.error('\n❌ Test failed:', error);
  process.exit(1);
});
