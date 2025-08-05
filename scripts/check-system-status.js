#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const { execSync } = require('child_process');

console.log(chalk.bold.cyan('🔍 Vasquez Law Firm - System Status Check'));
console.log(chalk.gray('='.repeat(60)));

// Check Node.js version
const nodeVersion = process.version;
const requiredNodeVersion = 'v18.0.0';
const nodeOk = nodeVersion >= requiredNodeVersion;

console.log(chalk.blue('\n📦 Environment:'));
console.log(
  `   Node.js: ${nodeOk ? chalk.green('✓') : chalk.red('✗')} ${nodeVersion} ${nodeOk ? '' : `(need ${requiredNodeVersion}+)`}`
);

// Check pnpm
let pnpmVersion = 'Not installed';
try {
  pnpmVersion = execSync('pnpm --version', { encoding: 'utf8' }).trim();
  console.log(`   pnpm: ${chalk.green('✓')} ${pnpmVersion}`);
} catch (e) {
  console.log(`   pnpm: ${chalk.red('✗')} Not installed`);
}

// Check critical files
console.log(chalk.blue('\n📁 Critical Files:'));
const criticalFiles = [
  '.env.local',
  'prisma/schema.prisma',
  'next.config.js',
  'tailwind.config.ts',
  'package.json',
];

criticalFiles.forEach(file => {
  const exists = fs.existsSync(path.join(process.cwd(), file));
  console.log(
    `   ${file}: ${exists ? chalk.green('✓') : chalk.red('✗')} ${exists ? 'Present' : 'Missing'}`
  );
});

// Check database connection
console.log(chalk.blue('\n🗄️  Database:'));
if (process.env.DATABASE_URL) {
  const dbUrl = process.env.DATABASE_URL;
  const isNeon = dbUrl.includes('neon.tech');
  console.log(`   Type: ${chalk.green('✓')} ${isNeon ? 'Neon PostgreSQL' : 'PostgreSQL'}`);
  console.log(
    `   SSL: ${chalk.green('✓')} ${dbUrl.includes('sslmode=require') ? 'Enabled' : 'Warning: Not configured'}`
  );
} else {
  console.log(`   Connection: ${chalk.red('✗')} DATABASE_URL not configured`);
}

// Check Redis/Cache
console.log(chalk.blue('\n💾 Cache:'));
const mockRedis = process.env.MOCK_REDIS === 'true';
console.log(`   Type: ${chalk.green('✓')} ${mockRedis ? 'MockRedis (In-memory)' : 'Redis'}`);

// Check API Keys
console.log(chalk.blue('\n🔑 API Keys:'));
const apiKeys = [
  { name: 'OpenAI', env: 'OPENAI_API_KEY', required: true },
  { name: 'Google Maps', env: 'NEXT_PUBLIC_GOOGLE_MAPS_API_KEY', required: true },
  { name: 'Retell AI', env: 'RETELL_API_KEY', required: false },
  { name: 'GoHighLevel', env: 'GHL_API_KEY', required: false },
  { name: 'Stripe', env: 'STRIPE_SECRET_KEY', required: false },
  { name: 'SendGrid', env: 'SENDGRID_API_KEY', required: false },
];

apiKeys.forEach(({ name, env, required }) => {
  const configured = !!process.env[env];
  const icon = configured ? chalk.green('✓') : required ? chalk.red('✗') : chalk.yellow('○');
  const status = configured ? 'Configured' : required ? 'Missing (Required)' : 'Not configured';
  console.log(`   ${name}: ${icon} ${status}`);
});

// Check directories
console.log(chalk.blue('\n📂 Project Structure:'));
const directories = ['src/app', 'src/components', 'src/lib', 'src/agents', 'public', '.next'];

directories.forEach(dir => {
  const exists = fs.existsSync(path.join(process.cwd(), dir));
  const status =
    dir === '.next' ? (exists ? 'Built' : 'Not built') : exists ? 'Present' : 'Missing';
  console.log(
    `   ${dir}: ${exists ? chalk.green('✓') : dir === '.next' ? chalk.yellow('○') : chalk.red('✗')} ${status}`
  );
});

// Check for Twilio references (should be none)
console.log(chalk.blue('\n🚫 Removed Services:'));
try {
  const twilioRefs = execSync(
    'grep -r "twilio" src/ --include="*.ts" --include="*.tsx" 2>/dev/null | wc -l',
    { encoding: 'utf8' }
  ).trim();
  const twilioCount = parseInt(twilioRefs);
  console.log(
    `   Twilio references: ${twilioCount === 0 ? chalk.green('✓') : chalk.red('✗')} ${twilioCount === 0 ? 'None found (Good!)' : `${twilioCount} references found`}`
  );
} catch (e) {
  console.log(`   Twilio references: ${chalk.green('✓')} None found`);
}

// Check features
console.log(chalk.blue('\n🚀 Features Status:'));
const features = [
  { name: 'AI Chat', env: 'ENABLE_AI_CHAT', default: true },
  { name: 'Voice Agents', env: 'ENABLE_VOICE_AGENTS', default: true },
  { name: 'CrewAI Agents', env: 'ENABLE_CREWAI_AGENTS', default: true },
  { name: 'News Ticker', env: 'ENABLE_NEWS_TICKER', default: true },
  { name: 'Competitor Monitoring', env: 'ENABLE_COMPETITOR_MONITORING', default: true },
];

features.forEach(({ name, env, default: def }) => {
  const enabled = process.env[env] === 'true' || (process.env[env] === undefined && def);
  console.log(`   ${name}: ${enabled ? chalk.green('✓ Enabled') : chalk.yellow('○ Disabled')}`);
});

// Summary
console.log(chalk.blue('\n📊 Summary:'));
const issues = [];

if (!nodeOk) issues.push('Node.js version too old');
if (!fs.existsSync('.env.local')) issues.push('.env.local missing');
if (!process.env.DATABASE_URL) issues.push('Database not configured');
if (!process.env.OPENAI_API_KEY) issues.push('OpenAI API key missing');

if (issues.length === 0) {
  console.log(chalk.green('   ✅ System ready for development!'));
  console.log(chalk.gray('\n   Run "npm run test:local" to test all pages'));
  console.log(chalk.gray('   Run "npm run dev" to start development'));
} else {
  console.log(chalk.red(`   ❌ ${issues.length} issue(s) found:`));
  issues.forEach(issue => console.log(chalk.red(`      - ${issue}`)));
  console.log(chalk.yellow('\n   Please fix these issues before proceeding'));
}

console.log(chalk.gray('\n' + '='.repeat(60)));
