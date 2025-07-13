#!/usr/bin/env tsx

import dotenv from 'dotenv';
import { logger } from '../src/lib/logger';

dotenv.config();

interface WebhookConfig {
  name: string;
  url: string;
  events: string[];
}

async function configureGHLWebhooks() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.vasquezlawnc.com';
  const apiKey = process.env.GHL_API_KEY;
  const locationId = process.env.GHL_LOCATION_ID;

  if (!apiKey || !locationId) {
    console.error('❌ GHL_API_KEY and GHL_LOCATION_ID must be set in .env');
    process.exit(1);
  }

  const webhooks: WebhookConfig[] = [
    {
      name: 'Contact Events',
      url: `${baseUrl}/api/webhooks/ghl`,
      events: ['ContactCreate', 'ContactUpdate', 'ContactDelete', 'ContactTagUpdate'],
    },
    {
      name: 'Message Events',
      url: `${baseUrl}/api/webhooks/ghl`,
      events: ['InboundMessage', 'OutboundMessage', 'MessageDelivered', 'MessageFailed'],
    },
    {
      name: 'Campaign Events',
      url: `${baseUrl}/api/webhooks/ghl`,
      events: ['CampaignStarted', 'CampaignCompleted', 'CampaignStopped'],
    },
    {
      name: 'Opportunity Events',
      url: `${baseUrl}/api/webhooks/ghl`,
      events: ['OpportunityCreate', 'OpportunityUpdate', 'OpportunityStageChange'],
    },
    {
      name: 'Appointment Events',
      url: `${baseUrl}/api/webhooks/ghl`,
      events: ['AppointmentCreate', 'AppointmentUpdate', 'AppointmentCancel', 'AppointmentNoShow'],
    },
  ];

  console.log('🔧 Configuring GoHighLevel Webhooks');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  for (const webhook of webhooks) {
    console.log(`\n📌 ${webhook.name}`);
    console.log(`   URL: ${webhook.url}`);
    console.log(`   Events: ${webhook.events.join(', ')}`);
  }

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('\n📝 To configure webhooks in GoHighLevel:');
  console.log('\n1. Log in to your GoHighLevel account');
  console.log('2. Go to Settings > Webhooks');
  console.log('3. Create a new webhook for each configuration above');
  console.log('4. Set the webhook secret in your .env as GHL_WEBHOOK_SECRET');
  console.log('\n🔐 Webhook Endpoint Security:');
  console.log('   - Webhooks will verify signatures in production');
  console.log('   - Make sure to set GHL_WEBHOOK_SECRET in .env');

  // Generate example campaign IDs for .env
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('\n📋 Add these campaign IDs to your .env file:');
  console.log('\n# GoHighLevel Campaign IDs');
  console.log('GHL_APPOINTMENT_REMINDER_CAMPAIGN_ID=');
  console.log('GHL_AUTO_RESPONSE_CAMPAIGN_ID=');
  console.log('GHL_SURVEY_CAMPAIGN_ID=');
  console.log('GHL_BIRTHDAY_CAMPAIGN_ID=');
  console.log('GHL_ANNIVERSARY_CAMPAIGN_ID=');
  console.log('GHL_REENGAGEMENT_CAMPAIGN_ID=');
  console.log('GHL_REVIEW_REQUEST_CAMPAIGN_ID=');
  console.log('GHL_WINBACK_CAMPAIGN_ID=');
  console.log('\n# Practice Area Nurture Campaigns');
  console.log('GHL_IMMIGRATION_NURTURE_EN=');
  console.log('GHL_IMMIGRATION_NURTURE_ES=');
  console.log('GHL_PERSONAL_INJURY_NURTURE_EN=');
  console.log('GHL_PERSONAL_INJURY_NURTURE_ES=');
  console.log('GHL_CRIMINAL_NURTURE_EN=');
  console.log('GHL_CRIMINAL_NURTURE_ES=');
  console.log('GHL_FAMILY_LAW_NURTURE_EN=');
  console.log('GHL_FAMILY_LAW_NURTURE_ES=');
  console.log('GHL_WORKERS_COMP_NURTURE_EN=');
  console.log('GHL_WORKERS_COMP_NURTURE_ES=');
  console.log('GHL_TRAFFIC_NURTURE_EN=');
  console.log('GHL_TRAFFIC_NURTURE_ES=');
  console.log('GHL_GENERIC_NURTURE_CAMPAIGN_ID=');
  console.log('\n# Holiday Campaigns');
  console.log('GHL_NEW_YEAR_CAMPAIGN_ID=');
  console.log('GHL_THANKSGIVING_CAMPAIGN_ID=');
  console.log('GHL_CHRISTMAS_CAMPAIGN_ID=');
  console.log('GHL_JULY4_CAMPAIGN_ID=');
  console.log('GHL_HISPANIC_HERITAGE_CAMPAIGN_ID=');
  console.log('\n# Educational Campaigns');
  console.log('GHL_EDUCATIONAL_IMMIGRATION_CAMPAIGN_ID=');
  console.log('GHL_EDUCATIONAL_PERSONALINJURY_CAMPAIGN_ID=');
  console.log('GHL_EDUCATIONAL_CRIMINAL_CAMPAIGN_ID=');
  console.log('GHL_EDUCATIONAL_FAMILY_CAMPAIGN_ID=');
  console.log('GHL_EDUCATIONAL_WORKERSCOMP_CAMPAIGN_ID=');
  console.log('\n# Other Campaigns');
  console.log('GHL_PHONE_LEAD_CAMPAIGN_ID=');
  console.log('GHL_LEAD_PIPELINE_ID=');
  console.log('GHL_NEW_LEAD_STAGE_ID=');

  console.log('\n✅ Configuration guide complete!');
}

// Run the configuration helper
configureGHLWebhooks().catch(console.error);
