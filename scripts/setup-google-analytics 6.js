#!/usr/bin/env node

/**
 * Google Analytics Setup Script
 * This script helps set up Google Analytics 4 for the Vasquez Law Firm website
 */

const fs = require('fs');
const path = require('path');

console.log('📊 Setting up Google Analytics 4...\n');

// Check if GA measurement ID is set
const envPath = path.join(process.cwd(), '.env.production');
if (!fs.existsSync(envPath)) {
  console.error('❌ .env.production not found. Please create it from env.production.example');
  process.exit(1);
}

const envContent = fs.readFileSync(envPath, 'utf-8');
const gaIdMatch = envContent.match(/NEXT_PUBLIC_GA_MEASUREMENT_ID=(.+)/);

if (!gaIdMatch || gaIdMatch[1].startsWith('G-XXX')) {
  console.log('⚠️  Google Analytics Measurement ID not configured');
  console.log('\nTo set up Google Analytics:');
  console.log('1. Go to https://analytics.google.com');
  console.log('2. Create a new GA4 property for vasquezlawnc.com');
  console.log('3. Get your Measurement ID (starts with G-)');
  console.log('4. Add it to .env.production: NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX');
  console.log('\n');
} else {
  console.log('✅ Google Analytics Measurement ID found:', gaIdMatch[1]);
}

// Generate enhanced ecommerce events
const gaEventsContent = `// Google Analytics Events for Vasquez Law Firm

export const GA_EVENTS = {
  // Lead Generation Events
  FORM_START: 'form_start',
  FORM_SUBMIT: 'form_submit',
  LEAD_GENERATED: 'generate_lead',
  
  // Engagement Events
  CHAT_STARTED: 'chat_started',
  PHONE_CLICKED: 'phone_clicked',
  DOCUMENT_DOWNLOAD: 'file_download',
  VIDEO_PLAY: 'video_play',
  
  // Navigation Events
  PAGE_VIEW: 'page_view',
  SCROLL_DEPTH: 'scroll',
  SEARCH: 'search',
  
  // Conversion Events
  APPOINTMENT_SCHEDULED: 'appointment_scheduled',
  PAYMENT_INITIATED: 'begin_checkout',
  PAYMENT_COMPLETED: 'purchase',
  
  // Custom Events
  PRACTICE_AREA_SELECTED: 'practice_area_selected',
  LANGUAGE_CHANGED: 'language_changed',
  ATTORNEY_PROFILE_VIEW: 'attorney_profile_view',
  OFFICE_DIRECTIONS: 'office_directions_clicked',
};

// Helper function to track events
export const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, {
      ...parameters,
      send_to: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
    });
  }
};

// Track form submissions with enhanced data
export const trackFormSubmission = (formName: string, practiceArea?: string) => {
  trackEvent(GA_EVENTS.FORM_SUBMIT, {
    form_name: formName,
    practice_area: practiceArea,
    value: 100, // Estimated value of a lead
    currency: 'USD',
  });
};

// Track phone clicks with context
export const trackPhoneClick = (location: string, phoneNumber: string) => {
  trackEvent(GA_EVENTS.PHONE_CLICKED, {
    click_location: location,
    phone_number: phoneNumber,
  });
};

// Track conversion goals
export const trackConversion = (type: string, value?: number) => {
  trackEvent(GA_EVENTS.LEAD_GENERATED, {
    conversion_type: type,
    value: value || 100,
    currency: 'USD',
  });
};
`;

// Write GA events helper
const gaEventsPath = path.join(process.cwd(), 'src/lib/analytics.ts');
fs.writeFileSync(gaEventsPath, gaEventsContent);
console.log('✅ Created Google Analytics events helper at src/lib/analytics.ts');

// Create GA configuration checklist
const gaChecklist = `# Google Analytics 4 Setup Checklist

## 1. Create GA4 Property
- [ ] Go to https://analytics.google.com
- [ ] Click "Create Property"
- [ ] Name: "Vasquez Law Firm"
- [ ] Time zone: Eastern Time
- [ ] Currency: USD

## 2. Configure Data Streams
- [ ] Add web data stream
- [ ] URL: https://www.vasquezlawnc.com
- [ ] Stream name: "Main Website"
- [ ] Enable enhanced measurement

## 3. Set Up Conversions
Mark these events as conversions:
- [ ] form_submit
- [ ] generate_lead
- [ ] appointment_scheduled
- [ ] phone_clicked
- [ ] chat_started

## 4. Create Audiences
- [ ] Spanish speakers (language = 'es')
- [ ] High-intent visitors (>3 pages, >2 min)
- [ ] Practice area interest (by page views)
- [ ] Geographic (North Carolina)

## 5. Set Up Goals
- [ ] Contact form submissions
- [ ] Phone call clicks
- [ ] Chat interactions
- [ ] Appointment bookings
- [ ] Document downloads

## 6. Configure Reports
- [ ] Traffic acquisition report
- [ ] User acquisition report
- [ ] Landing page report
- [ ] Conversion paths report
- [ ] Practice area performance

## 7. Link Other Services
- [ ] Link Google Ads account
- [ ] Link Search Console
- [ ] Set up Google Signals

## 8. Custom Dimensions
- [ ] Practice Area
- [ ] Language Preference
- [ ] Office Location
- [ ] Lead Source
- [ ] Form Type

## 9. Testing
- [ ] Install GA Debugger Chrome extension
- [ ] Verify real-time data
- [ ] Test all conversion events
- [ ] Check demographic data
- [ ] Verify e-commerce tracking

## 10. Reporting Dashboard
Create custom dashboard with:
- [ ] Daily leads by source
- [ ] Practice area performance
- [ ] Language breakdown
- [ ] Geographic heat map
- [ ] Conversion funnel
`;

fs.writeFileSync('GA4-SETUP-CHECKLIST.md', gaChecklist);
console.log('✅ Created GA4 setup checklist');

// Create GTM container export
const gtmConfig = {
  exportFormatVersion: 2,
  containerVersion: {
    tag: [
      {
        name: 'GA4 Configuration',
        type: 'gaawc',
        parameter: [
          {
            type: 'TEMPLATE',
            key: 'measurementId',
            value: '{{GA Measurement ID}}',
          },
        ],
      },
      {
        name: 'Phone Click Tracking',
        type: 'ua',
        parameter: [
          {
            type: 'TEMPLATE',
            key: 'trackType',
            value: 'TRACK_EVENT',
          },
          {
            type: 'TEMPLATE',
            key: 'eventCategory',
            value: 'Contact',
          },
          {
            type: 'TEMPLATE',
            key: 'eventAction',
            value: 'Phone Click',
          },
        ],
      },
    ],
    trigger: [
      {
        name: 'Phone Link Click',
        type: 'linkClick',
        filter: [
          {
            type: 'contains',
            parameter: [
              {
                type: 'TEMPLATE',
                key: 'arg0',
                value: '{{Click URL}}',
              },
              {
                type: 'TEMPLATE',
                key: 'arg1',
                value: 'tel:',
              },
            ],
          },
        ],
      },
    ],
    variable: [
      {
        name: 'GA Measurement ID',
        type: 'c',
        parameter: [
          {
            type: 'TEMPLATE',
            key: 'value',
            value: 'G-XXXXXXXXXX',
          },
        ],
      },
    ],
  },
};

fs.writeFileSync('gtm-container-config.json', JSON.stringify(gtmConfig, null, 2));
console.log('✅ Created GTM container configuration');

console.log('\n📊 Google Analytics setup files created!');
console.log('\nNext steps:');
console.log('1. Get your GA4 Measurement ID from Google Analytics');
console.log('2. Add it to .env.production');
console.log('3. Follow the checklist in GA4-SETUP-CHECKLIST.md');
console.log('4. Import gtm-container-config.json to Google Tag Manager (optional)');
console.log('\n✨ Once configured, analytics will automatically track:');
console.log('   - Page views');
console.log('   - Form submissions');
console.log('   - Phone clicks');
console.log('   - Chat interactions');
console.log('   - Conversion goals');
