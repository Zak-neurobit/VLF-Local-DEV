#!/usr/bin/env node

import { logger } from '../src/lib/logger';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs/promises';

// Load environment variables
dotenv.config({ path: path.join(process.cwd(), '.env.local') });

async function setupGoogleCloud() {
  console.log('☁️  Google Cloud Setup for CrewAI Autonomous Agents\n');
  console.log('='.repeat(50));

  // Check current configuration
  const hasGoogleCreds = !!process.env.GOOGLE_APPLICATION_CREDENTIALS;
  const hasFirebaseConfig = !!process.env.FIREBASE_CONFIG;
  const hasGoogleMapsKey = !!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  console.log('\n📋 Current Configuration:');
  console.log(`- GOOGLE_APPLICATION_CREDENTIALS: ${hasGoogleCreds ? '✓ Set' : '✗ Not set'}`);
  console.log(`- FIREBASE_CONFIG: ${hasFirebaseConfig ? '✓ Set' : '✗ Not set'}`);
  console.log(`- NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: ${hasGoogleMapsKey ? '✓ Set' : '✗ Not set'}`);
  console.log(`- Environment: ${process.env.NODE_ENV || 'development'}`);

  if (!hasGoogleCreds) {
    console.log('\n⚠️  Google Cloud credentials not configured!');
    console.log('\nCrewAI autonomous agents need Google Cloud for:');
    console.log('- Document AI (analyzing legal documents)');
    console.log('- Natural Language API (understanding client needs)');
    console.log('- Translation API (multi-language support)');
    console.log('- Cloud Storage (document management)');
    console.log('- Firestore (agent memory and learning)');

    console.log('\n📚 Setup Instructions:');
    console.log('\n1. Create a Google Cloud Project:');
    console.log('   - Go to https://console.cloud.google.com');
    console.log('   - Create a new project or select existing');
    console.log('   - Note your Project ID');

    console.log('\n2. Enable Required APIs:');
    console.log('   - Document AI API');
    console.log('   - Natural Language API');
    console.log('   - Translation API');
    console.log('   - Cloud Storage API');
    console.log('   - Firestore API');
    console.log('   - Maps JavaScript API (for office locations)');

    console.log('\n3. Create Service Account:');
    console.log('   - Go to IAM & Admin > Service Accounts');
    console.log('   - Create a new service account');
    console.log('   - Grant roles:');
    console.log('     • Document AI API User');
    console.log('     • Cloud Natural Language API User');
    console.log('     • Cloud Translation API User');
    console.log('     • Storage Object Admin');
    console.log('     • Cloud Datastore User');

    console.log('\n4. Download Credentials:');
    console.log('   - Click on your service account');
    console.log('   - Go to Keys tab');
    console.log('   - Add Key > Create new key > JSON');
    console.log('   - Save as: google-credentials.json in project root');

    console.log('\n5. Get Google Maps API Key:');
    console.log('   - Go to APIs & Services > Credentials');
    console.log('   - Create credentials > API key');
    console.log('   - Restrict key to your domains');

    console.log('\n6. Add to .env.local:');
    console.log('\n   # Google Cloud Configuration');
    console.log('   GOOGLE_APPLICATION_CREDENTIALS=./google-credentials.json');
    console.log('   GOOGLE_CLOUD_PROJECT=your-project-id');
    console.log('   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-maps-api-key');
    console.log('\n   # Firebase Configuration (optional, for real-time features)');
    console.log('   FIREBASE_CONFIG={"apiKey":"...","authDomain":"...","projectId":"..."}');

    // Create placeholder credential file
    await createPlaceholderCredentials();

    console.log('\n✅ Created placeholder files:');
    console.log('   - google-credentials.json (replace with your actual credentials)');
    console.log('   - .gitignore updated to exclude credentials');
  } else {
    console.log('\n✅ Google Cloud is configured!');

    // Test Google Cloud connection
    console.log('\n🧪 Testing Google Cloud connection...');
    try {
      // Check if credentials file exists
      const credsPath = path.resolve(process.env.GOOGLE_APPLICATION_CREDENTIALS);
      await fs.access(credsPath);
      console.log('✅ Credentials file found');

      // Parse and validate credentials
      const credsContent = await fs.readFile(credsPath, 'utf-8');
      const creds = JSON.parse(credsContent);

      if (creds.type && creds.project_id && creds.private_key) {
        console.log(`✅ Valid service account for project: ${creds.project_id}`);
      } else {
        console.log('⚠️  Credentials file appears incomplete');
      }
    } catch (error: any) {
      console.log('❌ Could not validate credentials:', error.message);
    }
  }

  console.log('\n🤖 CrewAI Agent Requirements:');
  console.log('\nAgents that need Google Cloud:');
  console.log('- 📄 Document Analysis Agent (Document AI)');
  console.log('- 🌐 Translation Agent (Translation API)');
  console.log('- 📊 Competition Tracker (Natural Language API)');
  console.log('- 🗺️  Local SEO Agent (Maps API)');
  console.log('- 🧠 Learning System (Firestore for memory)');

  console.log('\n💡 Without Google Cloud:');
  console.log('- Agents will use OpenAI fallbacks (less specialized)');
  console.log('- No document OCR capabilities');
  console.log('- Limited multi-language support');
  console.log('- No persistent agent memory');
  console.log('- No Google Maps integration');

  console.log('\n📚 Resources:');
  console.log('- Google Cloud Console: https://console.cloud.google.com');
  console.log('- Document AI: https://cloud.google.com/document-ai');
  console.log('- Service Accounts: https://cloud.google.com/iam/docs/service-accounts');
  console.log('- API Keys: https://cloud.google.com/docs/authentication/api-keys');
}

async function createPlaceholderCredentials() {
  // Create placeholder google-credentials.json
  const placeholderCreds = {
    type: 'service_account',
    project_id: 'your-project-id',
    private_key_id: 'your-key-id',
    private_key: '-----BEGIN PRIVATE KEY-----\nYOUR-PRIVATE-KEY-HERE\n-----END PRIVATE KEY-----\n',
    client_email: 'your-service-account@your-project-id.iam.gserviceaccount.com',
    client_id: 'your-client-id',
    auth_uri: 'https://accounts.google.com/o/oauth2/auth',
    token_uri: 'https://oauth2.googleapis.com/token',
    auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
    client_x509_cert_url:
      'https://www.googleapis.com/robot/v1/metadata/x509/your-service-account%40your-project-id.iam.gserviceaccount.com',
  };

  const credsPath = path.join(process.cwd(), 'google-credentials.json');

  // Check if file already exists
  try {
    await fs.access(credsPath);
    console.log('\n⚠️  google-credentials.json already exists, not overwriting');
  } catch {
    // File doesn't exist, create it
    await fs.writeFile(credsPath, JSON.stringify(placeholderCreds, null, 2));
  }

  // Update .gitignore
  const gitignorePath = path.join(process.cwd(), '.gitignore');
  try {
    const gitignoreContent = await fs.readFile(gitignorePath, 'utf-8');
    if (!gitignoreContent.includes('google-credentials.json')) {
      await fs.appendFile(
        gitignorePath,
        '\n# Google Cloud credentials\ngoogle-credentials.json\n*-credentials.json\n'
      );
      console.log('✅ Updated .gitignore to exclude credentials');
    }
  } catch {
    // Create .gitignore if it doesn't exist
    await fs.writeFile(
      gitignorePath,
      '# Google Cloud credentials\ngoogle-credentials.json\n*-credentials.json\n'
    );
  }
}

// Run setup
setupGoogleCloud().catch(error => {
  console.error('Setup failed:', error);
  process.exit(1);
});
