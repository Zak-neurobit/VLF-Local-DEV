#!/usr/bin/env node
/**
 * Build-time environment variable validation script
 * This runs during the build process to ensure all required
 * environment variables are present before deployment
 */

import { config } from 'dotenv';
import path from 'path';

// Load environment variables from .env.local
config({ path: path.resolve(process.cwd(), '.env.local') });

import { getEnvironmentSummary } from '../src/lib/env-validation';

console.log('\n🔍 Validating environment variables...\n');

try {
  // The validation happens on import
  const summary = getEnvironmentSummary();

  console.log('✅ Environment Validation Successful!\n');
  console.log('📊 Service Configuration Status:');
  console.log('================================');

  Object.entries(summary).forEach(([service, configured]) => {
    const status = configured ? '✅' : '❌';
    const label = service.charAt(0).toUpperCase() + service.slice(1);
    console.log(`${status} ${label}: ${configured ? 'Configured' : 'Not configured'}`);
  });

  console.log('\n');

  // Check for critical services
  const criticalServices = ['database', 'authentication', 'openai'];
  const missingCritical = criticalServices.filter(service => !summary[service]);

  if (missingCritical.length > 0) {
    console.error('❌ Critical services are not configured:', missingCritical.join(', '));
    process.exit(1);
  }

  // Warn about optional services
  const optionalServices = ['gohighlevel', 'email', 'googleMaps', 'monitoring'];
  const missingOptional = optionalServices.filter(service => !summary[service]);

  if (missingOptional.length > 0) {
    console.warn('⚠️  Optional services not configured:', missingOptional.join(', '));
    console.warn('   These services will operate in mock/fallback mode.\n');
  }

  console.log('🚀 Build can proceed!\n');
  process.exit(0);
} catch (error) {
  console.error('❌ Environment validation failed!');
  console.error(error);
  process.exit(1);
}
