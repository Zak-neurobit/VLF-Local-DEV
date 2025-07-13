#!/usr/bin/env node
import 'dotenv/config';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

// Color helpers
const colors = {
  green: (text: string) => `\x1b[32m${text}\x1b[0m`,
  yellow: (text: string) => `\x1b[33m${text}\x1b[0m`,
  red: (text: string) => `\x1b[31m${text}\x1b[0m`,
  bold: (text: string) => `\x1b[1m${text}\x1b[0m`,
};

// API configurations to check
const API_CHECKS = [
  {
    name: 'Database (PostgreSQL)',
    required: true,
    vars: ['DATABASE_URL'],
  },
  {
    name: 'Authentication',
    required: true,
    vars: ['NEXTAUTH_URL', 'NEXTAUTH_SECRET'],
  },
  {
    name: 'OpenAI',
    required: true,
    vars: ['OPENAI_API_KEY'],
  },
  {
    name: 'GoHighLevel',
    required: true,
    vars: ['GHL_API_KEY', 'GHL_LOCATION_ID', 'GHL_CALENDAR_ID', 'GHL_MAIN_PIPELINE_ID'],
  },
  {
    name: 'Redis',
    required: false,
    vars: ['REDIS_URL', 'MOCK_REDIS'],
  },
  {
    name: 'Retell AI',
    required: false,
    vars: ['RETELL_API_KEY', 'RETELL_WEBHOOK_SECRET'],
  },
  {
    name: 'Email (SMTP)',
    required: false,
    vars: ['EMAIL_FROM', 'SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASSWORD'],
  },
  {
    name: 'Google Maps',
    required: false,
    vars: ['GOOGLE_MAPS_API_KEY', 'NEXT_PUBLIC_GOOGLE_MAPS_API_KEY'],
  },
  {
    name: 'Sentry',
    required: false,
    vars: ['SENTRY_DSN'],
  },
];

console.log(colors.bold('\n📊 Vasquez Law Firm - API Configuration Status\n'));

// Check .env.local file
const envFile = join(process.cwd(), '.env.local');
if (!existsSync(envFile)) {
  console.log(colors.red('❌ No .env.local file found!\n'));
  console.log('Run: npm run setup:apis\n');
  process.exit(1);
}

// Read current configuration
const envContent = readFileSync(envFile, 'utf-8');
const envVars = new Map<string, string>();

envContent.split('\n').forEach(line => {
  const match = line.match(/^([^#=]+)=(.*)$/);
  if (match) {
    envVars.set(match[1].trim(), match[2].trim());
  }
});

// Check each API
let hasAllRequired = true;
const missingRequired: string[] = [];

API_CHECKS.forEach(api => {
  const configured = api.vars.filter(v => {
    const value = envVars.get(v) || process.env[v];
    return value && !value.includes('your-') && value !== '';
  });

  const status = configured.length === api.vars.length
    ? colors.green('✓ Configured')
    : configured.length > 0
    ? colors.yellow(`⚠ Partial (${configured.length}/${api.vars.length})`)
    : colors.red('✗ Not configured');

  const requiredTag = api.required ? colors.red(' (Required)') : '';
  console.log(`${status} ${api.name}${requiredTag}`);

  if (api.required && configured.length < api.vars.length) {
    hasAllRequired = false;
    const missing = api.vars.filter(v => !configured.includes(v));
    missingRequired.push(`  - ${api.name}: ${missing.join(', ')}`);
  }

  // Show details
  api.vars.forEach(v => {
    const value = envVars.get(v) || process.env[v];
    const hasValue = value && !value.includes('your-') && value !== '';
    const icon = hasValue ? colors.green('  ✓') : colors.red('  ✗');
    const displayValue = hasValue
      ? value.includes('secret') || value.includes('key') || value.includes('password')
        ? '***' + value.slice(-4)
        : value.substring(0, 20) + (value.length > 20 ? '...' : '')
      : 'Not set';
    console.log(`${icon} ${v}: ${displayValue}`);
  });
  console.log('');
});

// Summary
console.log(colors.bold('Summary:\n'));

if (hasAllRequired) {
  console.log(colors.green('✅ All required APIs are configured!\n'));
  console.log('You can now run: npm run dev\n');
} else {
  console.log(colors.red('❌ Missing required API configurations:\n'));
  missingRequired.forEach(m => console.log(m));
  console.log('\nTo fix this, add the missing values to your .env.local file');
  console.log('or run: npm run setup:apis\n');
}

// Show example env vars for missing required ones
if (!hasAllRequired) {
  console.log(colors.bold('Example .env.local additions:\n'));
  console.log('```');
  if (!envVars.get('OPENAI_API_KEY')) {
    console.log('OPENAI_API_KEY=sk-your-openai-api-key');
  }
  if (!envVars.get('GHL_API_KEY')) {
    console.log('GHL_API_KEY=your-ghl-api-key');
    console.log('GHL_LOCATION_ID=your-location-id');
    console.log('GHL_CALENDAR_ID=your-calendar-id');
    console.log('GHL_MAIN_PIPELINE_ID=your-pipeline-id');
    console.log('GHL_NEW_LEADS_STAGE_ID=your-stage-id');
    console.log('GHL_DEFAULT_USER_ID=your-user-id');
  }
  console.log('```\n');
}

// Show docs
console.log(colors.bold('Resources:\n'));
console.log('📖 Full setup guide: API_SETUP_GUIDE.md');
console.log('✅ Checklist: API_CHECKLIST.md');
console.log('🧪 Test APIs: npm run test:apis\n');