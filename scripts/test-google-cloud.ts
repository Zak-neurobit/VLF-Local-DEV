#!/usr/bin/env node

import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs/promises';
import chalk from 'chalk';

// Load environment variables
dotenv.config({ path: path.join(process.cwd(), '.env.local') });

async function testGoogleCloud() {
  console.log(chalk.bold.blue('\n☁️  Google Cloud Configuration Test\n'));
  console.log('='.repeat(50));

  // Check environment variables
  const hasCredentials = !!process.env.GOOGLE_APPLICATION_CREDENTIALS;
  const hasProject = !!process.env.GOOGLE_CLOUD_PROJECT;

  console.log(chalk.bold.cyan('📋 Environment Variables:'));
  console.log(
    `- GOOGLE_APPLICATION_CREDENTIALS: ${hasCredentials ? chalk.green('✅ Set') : chalk.red('❌ Not set')}`
  );
  console.log(
    `- GOOGLE_CLOUD_PROJECT: ${hasProject ? chalk.green('✅ Set') : chalk.red('❌ Not set')}`
  );

  if (!hasCredentials) {
    console.log(chalk.red('\n❌ GOOGLE_APPLICATION_CREDENTIALS not set!'));
    console.log(chalk.yellow('\nPlease follow these steps:'));
    console.log('1. Complete the Google Cloud setup');
    console.log('2. Download your service account JSON key');
    console.log('3. Save it as google-credentials.json in the project root');
    console.log('4. Add to .env.local:');
    console.log(chalk.green('   GOOGLE_APPLICATION_CREDENTIALS=./google-credentials.json'));
    console.log(chalk.green('   GOOGLE_CLOUD_PROJECT=your-project-id'));
    return;
  }

  // Check if credentials file exists
  console.log(chalk.bold.cyan('\n📄 Credentials File:'));
  const credsPath = path.resolve(process.env.GOOGLE_APPLICATION_CREDENTIALS);

  try {
    await fs.access(credsPath);
    console.log(chalk.green('✅ File exists:'), credsPath);

    // Read and validate JSON
    const credsContent = await fs.readFile(credsPath, 'utf-8');
    const creds = JSON.parse(credsContent);

    console.log(chalk.bold.cyan('\n🔍 Credentials Validation:'));
    console.log(
      `- Type: ${creds.type === 'service_account' ? chalk.green('✅ service_account') : chalk.red('❌ ' + creds.type)}`
    );
    console.log(
      `- Project ID: ${creds.project_id ? chalk.green('✅ ' + creds.project_id) : chalk.red('❌ Missing')}`
    );
    console.log(
      `- Client Email: ${creds.client_email ? chalk.green('✅ ' + creds.client_email) : chalk.red('❌ Missing')}`
    );
    console.log(
      `- Private Key: ${creds.private_key ? chalk.green('✅ Present') : chalk.red('❌ Missing')}`
    );

    if (
      creds.project_id &&
      process.env.GOOGLE_CLOUD_PROJECT &&
      creds.project_id !== process.env.GOOGLE_CLOUD_PROJECT
    ) {
      console.log(chalk.yellow('\n⚠️  Warning: Project ID mismatch!'));
      console.log(`   Credentials: ${creds.project_id}`);
      console.log(`   Environment: ${process.env.GOOGLE_CLOUD_PROJECT}`);
    }
  } catch (error: any) {
    console.log(chalk.red('❌ File not found or invalid:'), error.message);
    return;
  }

  // Test API connections
  console.log(chalk.bold.cyan('\n🧪 Testing Google Cloud APIs...'));

  try {
    // Test 1: Translation API
    console.log(chalk.yellow('\n1. Testing Translation API...'));
    try {
      const { Translate } = await import('@google-cloud/translate').then(m => m.v2);
      const translate = new Translate({
        projectId: process.env.GOOGLE_CLOUD_PROJECT,
        keyFilename: credsPath,
      });

      const [translation] = await translate.translate('Hello', 'es');
      console.log(chalk.green('   ✅ Translation API working'));
      console.log(`   Test: "Hello" → "${translation}"`);
    } catch (error: any) {
      console.log(chalk.red('   ❌ Translation API failed:'), error.message);
      console.log(chalk.yellow('   Install with: npm install @google-cloud/translate'));
    }

    // Test 2: Natural Language API
    console.log(chalk.yellow('\n2. Testing Natural Language API...'));
    try {
      const language = await import('@google-cloud/language');
      const client = new language.LanguageServiceClient({
        projectId: process.env.GOOGLE_CLOUD_PROJECT,
        keyFilename: credsPath,
      });

      const document = {
        content: 'I need help with immigration law',
        type: 'PLAIN_TEXT' as const,
      };

      const [result] = await client.analyzeSentiment({ document });
      console.log(chalk.green('   ✅ Natural Language API working'));
      console.log(`   Sentiment score: ${result.documentSentiment?.score}`);
    } catch (error: any) {
      console.log(chalk.red('   ❌ Natural Language API failed:'), error.message);
      console.log(chalk.yellow('   Install with: npm install @google-cloud/language'));
    }

    // Test 3: Firestore
    console.log(chalk.yellow('\n3. Testing Firestore...'));
    try {
      const { Firestore } = await import('@google-cloud/firestore');
      const firestore = new Firestore({
        projectId: process.env.GOOGLE_CLOUD_PROJECT,
        keyFilename: credsPath,
      });

      // Try to read collections (won't fail if empty)
      const collections = await firestore.listCollections();
      console.log(chalk.green('   ✅ Firestore connection working'));
      console.log(`   Collections found: ${collections.length}`);
    } catch (error: any) {
      console.log(chalk.red('   ❌ Firestore failed:'), error.message);
      console.log(chalk.yellow('   Install with: npm install @google-cloud/firestore'));
    }

    // Test 4: Storage
    console.log(chalk.yellow('\n4. Testing Cloud Storage...'));
    try {
      const { Storage } = await import('@google-cloud/storage');
      const storage = new Storage({
        projectId: process.env.GOOGLE_CLOUD_PROJECT,
        keyFilename: credsPath,
      });

      const [buckets] = await storage.getBuckets();
      console.log(chalk.green('   ✅ Cloud Storage connection working'));
      console.log(`   Buckets found: ${buckets.length}`);
      if (buckets.length > 0) {
        console.log(`   First bucket: ${buckets[0].name}`);
      }
    } catch (error: any) {
      console.log(chalk.red('   ❌ Cloud Storage failed:'), error.message);
      console.log(chalk.yellow('   Install with: npm install @google-cloud/storage'));
    }
  } catch (error: any) {
    console.log(chalk.red('\n❌ API testing failed:'), error.message);
  }

  // Summary
  console.log(chalk.bold.blue('\n\n📊 Summary:'));
  console.log('='.repeat(50));

  console.log(chalk.bold.cyan('\n🎯 Next Steps:'));
  console.log('1. If any APIs failed, install the required packages:');
  console.log(
    chalk.yellow(
      '   npm install @google-cloud/translate @google-cloud/language @google-cloud/firestore @google-cloud/storage'
    )
  );
  console.log('\n2. Make sure all APIs are enabled in Google Cloud Console');
  console.log('\n3. Verify the service account has all required roles');
  console.log('\n4. Check that billing is enabled (you have $300 free credits)');

  console.log(chalk.bold.green('\n✨ Once everything is green, your CrewAI agents will have:'));
  console.log('- Document analysis capabilities');
  console.log('- Multi-language support');
  console.log('- Persistent memory');
  console.log('- Document storage');
  console.log('- Advanced NLP features');
}

// Run test
testGoogleCloud().catch(error => {
  console.error(chalk.red('\n❌ Test failed:'), error);
  process.exit(1);
});
