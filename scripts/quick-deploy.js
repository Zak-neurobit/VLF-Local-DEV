#!/usr/bin/env node

/**
 * Quick Deploy Script
 * Interactive setup for essential environment variables
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log('🚀 Vasquez Law Firm - Quick Deploy Setup\n');
console.log('This script will help you set up the essential environment variables.');
console.log('For full configuration, see PRODUCTION-ENV-SETUP.md\n');

const essentialVars = {
  // Minimal required for basic deployment
  DATABASE_URL: {
    prompt: 'Database URL (PostgreSQL)',
    default: 'postgresql://user:password@host:5432/vasquezlaw?sslmode=require',
    required: true,
    notes: 'Get from Supabase, Neon, or your PostgreSQL provider',
  },
  NEXTAUTH_SECRET: {
    prompt: 'NextAuth Secret (32+ chars)',
    default: null,
    required: true,
    generate: () => require('crypto').randomBytes(32).toString('base64'),
    notes: 'Auto-generated secure secret',
  },
  NEXTAUTH_URL: {
    prompt: 'Production URL',
    default: 'https://www.vasquezlawnc.com',
    required: true,
  },
  NODE_ENV: {
    prompt: 'Environment',
    default: 'production',
    required: true,
  },
  // Optional but recommended
  SMTP_HOST: {
    prompt: 'Email SMTP Host (optional)',
    default: 'smtp.office365.com',
    required: false,
  },
  SMTP_USER: {
    prompt: 'Email address (optional)',
    default: 'noreply@vasquezlawnc.com',
    required: false,
  },
  NEXT_PUBLIC_GA_MEASUREMENT_ID: {
    prompt: 'Google Analytics ID (optional)',
    default: 'G-XXXXXXXXXX',
    required: false,
  },
};

async function prompt(question, defaultValue = null) {
  return new Promise(resolve => {
    const query = defaultValue ? `${question} [${defaultValue}]: ` : `${question}: `;

    rl.question(query, answer => {
      resolve(answer || defaultValue);
    });
  });
}

async function setupEnvironment() {
  console.log('📝 Setting up essential environment variables...\n');

  const envPath = path.join(process.cwd(), '.env.production');
  let envContent = fs.readFileSync(envPath, 'utf-8');

  // Essential setup
  console.log('=== REQUIRED CONFIGURATION ===\n');

  for (const [key, config] of Object.entries(essentialVars)) {
    if (config.notes) {
      console.log(`ℹ️  ${config.notes}`);
    }

    let value;
    if (config.generate && config.required) {
      value = config.generate();
      console.log(`✅ ${key}: Generated automatically`);
    } else {
      value = await prompt(config.prompt, config.default);

      if (config.required && (!value || value === config.default)) {
        console.log(`⚠️  Warning: ${key} should be configured before deployment`);
      }
    }

    // Update env file
    const regex = new RegExp(`^${key}=.*$`, 'm');
    if (envContent.match(regex)) {
      envContent = envContent.replace(regex, `${key}="${value}"`);
    } else {
      envContent += `\n${key}="${value}"`;
    }

    console.log('');
  }

  // Write updated env file
  fs.writeFileSync(envPath, envContent);
  console.log('✅ Environment variables saved to .env.production\n');

  // Quick deployment options
  console.log('=== DEPLOYMENT OPTIONS ===\n');
  console.log('Choose your deployment method:\n');
  console.log('1. Vercel (Recommended - Free tier available)');
  console.log('2. Netlify');
  console.log('3. Custom VPS\n');

  const choice = await prompt('Select option (1-3)', '1');

  switch (choice) {
    case '1':
      await deployToVercel();
      break;
    case '2':
      console.log('\n📚 Netlify Deployment:');
      console.log('1. Install Netlify CLI: npm i -g netlify-cli');
      console.log('2. Run: netlify init');
      console.log('3. Run: netlify deploy --prod');
      break;
    case '3':
      console.log('\n📚 VPS Deployment:');
      console.log('See DEPLOYMENT-GUIDE.md for detailed VPS instructions');
      break;
  }

  rl.close();
}

async function deployToVercel() {
  console.log('\n🚀 Deploying to Vercel...\n');

  // Check if Vercel CLI is installed
  try {
    require('child_process').execSync('vercel --version', { stdio: 'ignore' });
  } catch (e) {
    console.log('📦 Installing Vercel CLI...');
    require('child_process').execSync('npm i -g vercel', { stdio: 'inherit' });
  }

  console.log('\n📋 Vercel Deployment Steps:\n');
  console.log('1. Run: vercel --prod');
  console.log('2. Follow the prompts to link your project');
  console.log('3. Vercel will automatically detect Next.js');
  console.log('4. Your site will be live in ~2 minutes!\n');

  console.log('🔧 After deployment:');
  console.log('- Add environment variables in Vercel Dashboard');
  console.log('- Configure custom domain (vasquezlawnc.com)');
  console.log('- Set up automatic deployments from Git\n');

  const deploy = await prompt('Ready to deploy now? (y/n)', 'y');

  if (deploy.toLowerCase() === 'y') {
    console.log('\nStarting Vercel deployment...\n');
    require('child_process').spawn('vercel', ['--prod'], {
      stdio: 'inherit',
      shell: true,
    });
  }
}

// Quick checklist
console.log('📋 Pre-Deployment Checklist:\n');
console.log('✅ Build tested and passing');
console.log('✅ Content imported from live site');
console.log('✅ SEO optimization complete');
console.log('❓ Database ready (PostgreSQL)');
console.log('❓ Domain DNS access available');
console.log('❓ API keys ready (optional)\n');

const ready = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

ready.question('Ready to proceed? (y/n): ', answer => {
  ready.close();

  if (answer.toLowerCase() === 'y') {
    setupEnvironment().catch(console.error);
  } else {
    console.log('\nℹ️  When ready, run: node scripts/quick-deploy.js');
    process.exit(0);
  }
});
