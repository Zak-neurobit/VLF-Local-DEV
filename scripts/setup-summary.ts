#!/usr/bin/env node

import dotenv from 'dotenv';
import path from 'path';
import chalk from 'chalk';

// Load environment variables
dotenv.config({ path: path.join(process.cwd(), '.env.local') });

interface ServiceStatus {
  name: string;
  configured: boolean;
  required: boolean;
  notes?: string;
}

async function displaySetupSummary() {
  console.log(chalk.bold.cyan('\n🚀 Vasquez Law Firm Website - Setup Summary\n'));
  console.log('='.repeat(60));

  const services: ServiceStatus[] = [
    // Required Services
    {
      name: 'Database (Neon PostgreSQL)',
      configured: !!process.env.DATABASE_URL,
      required: true,
    },
    {
      name: 'OpenAI API',
      configured: !!process.env.OPENAI_API_KEY,
      required: true,
      notes: 'Required for AI chat functionality',
    },
    {
      name: 'GoHighLevel CRM',
      configured: !!process.env.GHL_API_KEY,
      required: true,
      notes: 'For SMS and lead management',
    },
    {
      name: 'Retell AI Voice',
      configured: !!process.env.RETELL_API_KEY,
      required: true,
      notes: 'For voice agent functionality',
    },
    {
      name: 'Office 365 Email',
      configured: !!process.env.SMTP_HOST && !!process.env.SMTP_PASSWORD,
      required: true,
    },
    {
      name: 'LawPay Webhooks',
      configured: !!process.env.LAWPAY_SECRET_KEY && !!process.env.LAWPAY_PUBLIC_KEY,
      required: true,
      notes: 'Webhook URL: https://www.vasquezlawnc.com/api/webhooks/lawpay',
    },
    // Optional Services
    {
      name: 'Sentry Error Tracking',
      configured: !!process.env.SENTRY_DSN,
      required: false,
      notes: 'Configuration files created, add DSN when ready',
    },
    {
      name: 'Google Cloud (CrewAI)',
      configured: !!process.env.GOOGLE_APPLICATION_CREDENTIALS,
      required: false,
      notes: 'For advanced document AI and agent memory',
    },
    {
      name: 'Redis Cache',
      configured: process.env.MOCK_REDIS === 'true' || !!process.env.REDIS_URL,
      required: false,
      notes: process.env.MOCK_REDIS === 'true' ? 'Using mock Redis' : 'Real Redis instance',
    },
    {
      name: 'Google Maps',
      configured: !!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
      required: false,
      notes: 'For office location maps',
    },
  ];

  // Display Required Services
  console.log(chalk.bold.yellow('\n📋 Required Services:\n'));
  const requiredServices = services.filter(s => s.required);
  requiredServices.forEach(service => {
    const status = service.configured
      ? chalk.green('✅ Configured')
      : chalk.red('❌ Not Configured');
    console.log(`${status} - ${chalk.bold(service.name)}`);
    if (service.notes) {
      console.log(chalk.gray(`   ${service.notes}`));
    }
  });

  // Display Optional Services
  console.log(chalk.bold.blue('\n🔧 Optional Services:\n'));
  const optionalServices = services.filter(s => !s.required);
  optionalServices.forEach(service => {
    const status = service.configured
      ? chalk.green('✅ Configured')
      : chalk.yellow('⚠️  Not Configured');
    console.log(`${status} - ${chalk.bold(service.name)}`);
    if (service.notes) {
      console.log(chalk.gray(`   ${service.notes}`));
    }
  });

  // Check readiness
  const allRequiredConfigured = requiredServices.every(s => s.configured);
  const configuredCount = services.filter(s => s.configured).length;
  const totalCount = services.length;

  console.log('\n' + '='.repeat(60));
  console.log(chalk.bold.cyan('\n📊 Configuration Status:\n'));
  console.log(`Total Services: ${totalCount}`);
  console.log(`Configured: ${chalk.green(configuredCount)} / ${totalCount}`);
  console.log(
    `Required Services: ${requiredServices.filter(s => s.configured).length} / ${requiredServices.length}`
  );
  console.log(
    `Optional Services: ${optionalServices.filter(s => s.configured).length} / ${optionalServices.length}`
  );

  if (allRequiredConfigured) {
    console.log(chalk.bold.green('\n✅ ALL REQUIRED SERVICES CONFIGURED - READY FOR LAUNCH! 🚀'));

    console.log(chalk.bold.cyan('\n🎯 Next Steps:\n'));
    console.log('1. Test all services: ' + chalk.yellow('npm run test:apis'));
    console.log('2. Build for production: ' + chalk.yellow('npm run build'));
    console.log('3. Start production server: ' + chalk.yellow('npm start'));
    console.log('4. Deploy to Vercel: ' + chalk.yellow('vercel --prod'));
  } else {
    console.log(chalk.bold.red('\n❌ MISSING REQUIRED SERVICES - NOT READY FOR LAUNCH'));
    console.log(chalk.yellow('\nPlease configure all required services before launching.'));
  }

  // Optional enhancements
  if (!services.find(s => s.name.includes('Sentry'))?.configured) {
    console.log(chalk.yellow('\n💡 Tip: Configure Sentry for production error tracking'));
  }
  if (!services.find(s => s.name.includes('Google Cloud'))?.configured) {
    console.log(chalk.yellow('💡 Tip: Add Google Cloud for enhanced AI capabilities'));
  }

  console.log('\n' + '='.repeat(60));
  console.log(chalk.gray('\nRun specific setup scripts:'));
  console.log(chalk.gray('- Sentry: npx tsx scripts/setup-sentry.ts'));
  console.log(chalk.gray('- Google Cloud: npx tsx scripts/setup-google-cloud.ts'));
  console.log(chalk.gray('- Test connections: npx tsx scripts/test-all-connections.ts'));
  console.log(chalk.gray('- Test Redis: npx tsx scripts/test-redis-connection.ts'));
}

// Run summary
displaySetupSummary().catch(error => {
  console.error('Error:', error);
  process.exit(1);
});
