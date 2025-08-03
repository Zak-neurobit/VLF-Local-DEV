#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Categories for environment variables
const categories = {
  core: [
    'NODE_ENV',
    'NEXT_PUBLIC_APP_URL',
    'NEXTAUTH_URL',
    'NEXTAUTH_SECRET',
    'SKIP_ENV_VALIDATION',
    'NEXT_TELEMETRY_DISABLED',
  ],
  database: ['DATABASE_URL', 'DIRECT_URL'],
  redis: ['REDIS_', 'MOCK_REDIS'],
  openai: ['OPENAI_'],
  ghl: ['GHL_'],
  retell: ['RETELL_'],
  email: ['EMAIL_', 'SMTP_', 'SENDGRID_', 'RESEND_', 'OFFICE365_'],
  payment: ['LAWPAY_', 'STRIPE_', 'AUTHORIZENET_'],
  google: ['GOOGLE_', 'GA_', 'GTM_', 'NEXT_PUBLIC_GA', 'NEXT_PUBLIC_GTM', 'NEXT_PUBLIC_GOOGLE'],
  social: ['FACEBOOK_', 'INSTAGRAM_', 'TWITTER_', 'LINKEDIN_'],
  seo: ['MOZ_', 'ADSY_', 'AP_NEWS_'],
  twilio: ['TWILIO_'],
  sentry: ['SENTRY_'],
  crewai: ['CREWAI_'],
  hodos: ['HODOS_'],
  other: [],
};

console.log('🔍 Extracting environment variables from codebase...\n');

// Find all environment variable references
const envVarPattern = /process\.env\.(\w+)/g;
const importMetaPattern = /import\.meta\.env\.(\w+)/g;

// Get all TypeScript and JavaScript files
const files = execSync(
  'find src -type f \\( -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" \\)',
  { encoding: 'utf8' }
)
  .split('\n')
  .filter(Boolean);

const foundVars = new Set();
const varUsage = {};

// Process each file
files.forEach(file => {
  try {
    const content = fs.readFileSync(file, 'utf8');

    // Find process.env references
    let match;
    while ((match = envVarPattern.exec(content)) !== null) {
      const varName = match[1];
      foundVars.add(varName);
      if (!varUsage[varName]) {
        varUsage[varName] = [];
      }
      varUsage[varName].push(file);
    }

    // Reset regex
    envVarPattern.lastIndex = 0;

    // Find import.meta.env references
    while ((match = importMetaPattern.exec(content)) !== null) {
      const varName = match[1];
      foundVars.add(varName);
      if (!varUsage[varName]) {
        varUsage[varName] = [];
      }
      varUsage[varName].push(file);
    }

    importMetaPattern.lastIndex = 0;
  } catch (error) {
    // Skip files that can't be read
  }
});

// Read existing .env files to get current values
const envFiles = ['.env', '.env.local', '.env.production', '.env.development'];
const currentValues = {};

envFiles.forEach(envFile => {
  const envPath = path.join(__dirname, '..', envFile);
  if (fs.existsSync(envPath)) {
    const content = fs.readFileSync(envPath, 'utf8');
    content.split('\n').forEach(line => {
      if (line && !line.startsWith('#') && line.includes('=')) {
        const [key, ...valueParts] = line.split('=');
        currentValues[key.trim()] = valueParts
          .join('=')
          .trim()
          .replace(/^["']|["']$/g, '');
      }
    });
  }
});

// Categorize variables
const categorizedVars = {};
Object.keys(categories).forEach(cat => {
  categorizedVars[cat] = [];
});

foundVars.forEach(varName => {
  let categorized = false;
  for (const [category, patterns] of Object.entries(categories)) {
    if (category === 'other') continue;

    for (const pattern of patterns) {
      if (varName.startsWith(pattern)) {
        categorizedVars[category].push(varName);
        categorized = true;
        break;
      }
    }
    if (categorized) break;
  }

  if (!categorized) {
    categorizedVars.other.push(varName);
  }
});

// Generate comprehensive environment variables file
const output = [
  `# Complete Environment Variables for Vasquez Law Firm Website
# Generated on ${new Date().toISOString()}
# Total unique variables found: ${foundVars.size}

# INSTRUCTIONS:
# 1. Copy this file to .env.production
# 2. Fill in all empty values with actual API keys and secrets
# 3. Add these to Netlify dashboard under Environment Variables
# 4. NEVER commit this file with real values to Git

`,
];

// Output by category
Object.entries(categorizedVars).forEach(([category, vars]) => {
  if (vars.length === 0) return;

  output.push(`# ${'='.repeat(50)}`);
  output.push(`# ${category.toUpperCase()} CONFIGURATION`);
  output.push(`# ${'='.repeat(50)}`);

  vars.sort().forEach(varName => {
    const value = currentValues[varName] || '';
    const usageCount = varUsage[varName].length;

    // Add usage comment
    output.push(`# Used in ${usageCount} file(s)`);
    if (usageCount <= 3) {
      varUsage[varName].slice(0, 3).forEach(file => {
        output.push(`# - ${file}`);
      });
    }

    // Add the variable
    if (value && !value.includes('placeholder') && !value.includes('your-')) {
      output.push(`${varName}="${value}"`);
    } else {
      output.push(`${varName}=`);
    }
    output.push('');
  });
  output.push('');
});

// Write the comprehensive env file
const outputPath = path.join(__dirname, '..', 'COMPLETE_ENV_VARS.env');
fs.writeFileSync(outputPath, output.join('\n'));

console.log(`✅ Found ${foundVars.size} unique environment variables`);
console.log(`📄 Complete list saved to: COMPLETE_ENV_VARS.env`);
console.log('\nBreakdown by category:');
Object.entries(categorizedVars).forEach(([category, vars]) => {
  if (vars.length > 0) {
    console.log(`  ${category}: ${vars.length} variables`);
  }
});

// Also create a minimal required env file
const requiredVars = [
  'NODE_ENV',
  'NEXT_PUBLIC_APP_URL',
  'DATABASE_URL',
  'DIRECT_URL',
  'NEXTAUTH_URL',
  'NEXTAUTH_SECRET',
  'OPENAI_API_KEY',
  'GHL_API_KEY',
  'GHL_LOCATION_ID',
  'EMAIL_FROM',
  'EMAIL_REPLY_TO',
];

const minimalOutput = [
  `# Minimal Required Environment Variables for Build
# These are the absolute minimum needed to build the site

`,
];

requiredVars.forEach(varName => {
  const value = currentValues[varName] || '';
  minimalOutput.push(`${varName}="${value}"`);
});

fs.writeFileSync(path.join(__dirname, '..', 'MINIMAL_ENV_VARS.env'), minimalOutput.join('\n'));
console.log('\n📄 Minimal required variables saved to: MINIMAL_ENV_VARS.env');

// Check for missing critical variables
console.log('\n⚠️  Critical variables that need values:');
requiredVars.forEach(varName => {
  if (!currentValues[varName] || currentValues[varName].includes('placeholder')) {
    console.log(`  ❌ ${varName}`);
  }
});
