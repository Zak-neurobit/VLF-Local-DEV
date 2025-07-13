#!/usr/bin/env node

/**
 * Test GoHighLevel Integration
 * Run this after adding GHL credentials to verify everything works
 */

require('dotenv').config();

async function testGHLIntegration() {
  console.log('🧪 Testing GoHighLevel Integration...\n');

  // Check environment variables
  const requiredVars = ['GHL_API_KEY', 'GHL_LOCATION_ID', 'GHL_API_URL'];
  const missing = requiredVars.filter(key => !process.env[key]);

  if (missing.length > 0) {
    console.error('❌ Missing environment variables:', missing.join(', '));
    console.log('\nPlease add these to your .env.local file:');
    missing.forEach(key => {
      console.log(`${key}=your-value-here`);
    });
    return;
  }

  console.log('✅ Environment variables found\n');

  // Test API connection
  console.log('📡 Testing API connection...');
  try {
    const response = await fetch(
      `${process.env.GHL_API_URL}/locations/${process.env.GHL_LOCATION_ID}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.GHL_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`API returned ${response.status}: ${response.statusText}`);
    }

    const location = await response.json();
    console.log('✅ API connection successful!');
    console.log(`📍 Location: ${location.name || 'Unknown'}`);
    console.log(`📧 Email: ${location.email || 'Not set'}\n`);
  } catch (error) {
    console.error('❌ API connection failed:', error.message);
    console.log('\nTroubleshooting:');
    console.log('1. Verify API key is correct');
    console.log('2. Check Location ID matches your GHL account');
    console.log('3. Ensure API key has full permissions\n');
    return;
  }

  // Test creating a test contact
  console.log('👤 Testing contact creation...');
  const testContact = {
    firstName: 'Test',
    lastName: 'Contact',
    email: `test-${Date.now()}@example.com`,
    phone: '+15555551234',
    tags: ['test-contact', 'website-lead'],
    source: 'API Test',
    locationId: process.env.GHL_LOCATION_ID,
  };

  try {
    const response = await fetch(`${process.env.GHL_API_URL}/contacts/`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.GHL_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testContact),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`API returned ${response.status}: ${error}`);
    }

    const contact = await response.json();
    console.log('✅ Contact created successfully!');
    console.log(`🆔 Contact ID: ${contact.id}`);
    console.log(`📧 Email: ${contact.email}\n`);

    // Clean up - delete test contact
    console.log('🧹 Cleaning up test contact...');
    await fetch(`${process.env.GHL_API_URL}/contacts/${contact.id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${process.env.GHL_API_KEY}`,
      },
    });
    console.log('✅ Test contact deleted\n');
  } catch (error) {
    console.error('❌ Contact creation failed:', error.message);
    console.log('\nThis might be due to:');
    console.log('1. Invalid phone number format');
    console.log('2. API permissions issue');
    console.log('3. Location ID mismatch\n');
  }

  // List campaigns
  console.log('📋 Fetching campaigns...');
  try {
    const response = await fetch(`${process.env.GHL_API_URL}/campaigns`, {
      headers: {
        Authorization: `Bearer ${process.env.GHL_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const data = await response.json();
      const campaigns = data.campaigns || [];
      console.log(`✅ Found ${campaigns.length} campaigns:`);

      campaigns.slice(0, 5).forEach(campaign => {
        console.log(`  - ${campaign.name} (ID: ${campaign.id})`);
      });

      if (campaigns.length > 5) {
        console.log(`  ... and ${campaigns.length - 5} more`);
      }

      if (campaigns.length === 0) {
        console.log('\n⚠️  No campaigns found. Create campaigns in GHL for:');
        console.log('  - Welcome series');
        console.log('  - Practice area nurturing');
        console.log('  - Appointment reminders');
      }
    }
  } catch (error) {
    console.error('❌ Failed to fetch campaigns:', error.message);
  }

  // Check pipelines
  console.log('\n📊 Checking pipelines...');
  try {
    const response = await fetch(`${process.env.GHL_API_URL}/pipelines`, {
      headers: {
        Authorization: `Bearer ${process.env.GHL_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const data = await response.json();
      const pipelines = data.pipelines || [];
      console.log(`✅ Found ${pipelines.length} pipelines:`);

      pipelines.forEach(pipeline => {
        console.log(`  - ${pipeline.name} (ID: ${pipeline.id})`);
        if (pipeline.stages) {
          pipeline.stages.slice(0, 3).forEach(stage => {
            console.log(`    • ${stage.name} (ID: ${stage.id})`);
          });
        }
      });

      if (pipelines.length === 0) {
        console.log('\n⚠️  No pipelines found. Create a "Website Leads" pipeline in GHL');
      }
    }
  } catch (error) {
    console.error('❌ Failed to fetch pipelines:', error.message);
  }

  console.log('\n🎉 Integration test complete!\n');
  console.log('Next steps:');
  console.log('1. Create campaigns in GHL for each practice area');
  console.log('2. Set up your lead pipeline');
  console.log('3. Add campaign and pipeline IDs to environment variables');
  console.log('4. Configure webhooks in GHL settings');
  console.log('5. Test with a real form submission\n');
}

// Run the test
testGHLIntegration().catch(console.error);
