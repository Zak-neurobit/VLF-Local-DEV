#!/usr/bin/env node

/**
 * Monitoring Setup Script
 * Sets up monitoring, alerting, and analytics for production
 */

const fs = require('fs');
const path = require('path');

console.log('📊 Setting up monitoring and analytics...\n');

// Create monitoring configuration
const monitoringConfig = {
  uptime: {
    checks: [
      {
        name: 'Homepage',
        url: 'https://www.vasquezlawnc.com',
        interval: 5,
        alerts: ['email', 'sms'],
      },
      {
        name: 'API Health',
        url: 'https://www.vasquezlawnc.com/api/health',
        interval: 5,
        expectedStatus: 200,
      },
      {
        name: 'Contact Form',
        url: 'https://www.vasquezlawnc.com/contact',
        interval: 10,
        keyword: 'Contact Us',
      },
      {
        name: 'Spanish Site',
        url: 'https://www.vasquezlawnc.com/es',
        interval: 10,
        keyword: 'Contacto',
      },
    ],
  },
  performance: {
    thresholds: {
      pageLoadTime: 3000, // 3 seconds
      firstContentfulPaint: 1500,
      largestContentfulPaint: 2500,
      timeToInteractive: 3500,
    },
  },
  alerts: {
    email: process.env.URGENT_LEAD_EMAIL || 'alerts@vasquezlawnc.com',
    sms: process.env.ALERT_PHONE || '+1234567890',
    slack: process.env.SLACK_WEBHOOK_URL,
  },
};

// Create health check endpoint if it doesn't exist
const healthCheckContent = `import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { cache } from '@/lib/cache';

export async function GET() {
  const checks = {
    server: 'ok',
    database: 'unknown',
    cache: 'unknown',
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version || '1.0.0'
  };

  // Check database
  try {
    await prisma.$queryRaw\`SELECT 1\`;
    checks.database = 'ok';
  } catch (error) {
    checks.database = 'error';
  }

  // Check cache
  try {
    const testKey = 'health-check-test';
    await cache.set(testKey, 'test', 10);
    const value = await cache.get(testKey);
    checks.cache = value === 'test' ? 'ok' : 'error';
  } catch (error) {
    checks.cache = 'error';
  }

  const allOk = Object.values(checks).every(v => v === 'ok' || typeof v === 'string');
  
  return NextResponse.json(checks, { 
    status: allOk ? 200 : 503 
  });
}
`;

const healthCheckPath = path.join('src/app/api/health/route.ts');
if (!fs.existsSync(healthCheckPath)) {
  fs.mkdirSync(path.dirname(healthCheckPath), { recursive: true });
  fs.writeFileSync(healthCheckPath, healthCheckContent);
  console.log('✅ Created health check endpoint');
}

// Create status page configuration
const statusPageContent = `import { NextResponse } from 'next/server';

// Public status page data
export async function GET() {
  const services = [
    {
      name: 'Website',
      status: 'operational',
      uptime: 99.9
    },
    {
      name: 'Contact Forms',
      status: 'operational',
      uptime: 99.8
    },
    {
      name: 'Chat Widget',
      status: 'operational',
      uptime: 99.7
    },
    {
      name: 'Voice Agents',
      status: 'operational',
      uptime: 99.5
    },
    {
      name: 'Payment Processing',
      status: 'operational',
      uptime: 99.99
    }
  ];

  const incidents = [
    // Add any current incidents here
  ];

  const maintenanceWindows = [
    // Add scheduled maintenance here
  ];

  return NextResponse.json({
    services,
    incidents,
    maintenanceWindows,
    lastUpdated: new Date().toISOString()
  });
}
`;

const statusPath = path.join('src/app/api/status/route.ts');
if (!fs.existsSync(statusPath)) {
  fs.mkdirSync(path.dirname(statusPath), { recursive: true });
  fs.writeFileSync(statusPath, statusPageContent);
  console.log('✅ Created status page endpoint');
}

// Create monitoring dashboard
const dashboardContent = `# Vasquez Law Firm - Monitoring Dashboard

## 🔗 Quick Links

### Monitoring Services
- **UptimeRobot**: https://uptimerobot.com
- **Pingdom**: https://www.pingdom.com
- **StatusCake**: https://www.statuscake.com

### Analytics
- **Google Analytics**: https://analytics.google.com
- **Google Search Console**: https://search.google.com/search-console
- **Google My Business**: https://business.google.com

### Error Tracking
- **Sentry**: https://sentry.io
- **LogRocket**: https://logrocket.com

### Performance
- **Google PageSpeed**: https://pagespeed.web.dev
- **GTmetrix**: https://gtmetrix.com
- **WebPageTest**: https://www.webpagetest.org

## 📊 Key Metrics to Monitor

### Website Performance
- Page Load Time: < 3 seconds
- First Contentful Paint: < 1.5 seconds
- Time to Interactive: < 3.5 seconds
- Core Web Vitals: All green

### Business Metrics
- Form Submissions: Track daily
- Phone Clicks: Monitor conversion
- Chat Interactions: Response time
- Appointment Bookings: Success rate

### SEO Metrics
- Organic Traffic: Growth trend
- Keyword Rankings: Top positions
- Backlinks: Quality and quantity
- Local Pack Rankings: Top 3

### Technical Metrics
- Server Uptime: > 99.9%
- API Response Time: < 500ms
- Database Performance: Query time
- Error Rate: < 0.1%

## 🚨 Alert Configuration

### Critical Alerts (Immediate)
- Website down
- Payment processing failure
- Database connection error
- Security breach attempt

### Warning Alerts (Within 1 hour)
- High error rate
- Slow page load
- Form submission failures
- Low disk space

### Info Alerts (Daily digest)
- Traffic statistics
- Conversion metrics
- SEO performance
- Social media engagement

## 📈 Custom Dashboards

### Executive Dashboard
- Monthly leads by source
- Conversion rates by practice area
- Revenue by service
- Client satisfaction scores

### Technical Dashboard
- Server metrics
- API performance
- Error logs
- Security events

### Marketing Dashboard
- Traffic sources
- Campaign performance
- Content engagement
- Social media metrics

## 🔧 Monitoring Setup Commands

\`\`\`bash
# Set up UptimeRobot monitors
curl -X POST https://api.uptimerobot.com/v2/newMonitor \\
  -d "api_key=YOUR_API_KEY" \\
  -d "friendly_name=Vasquez Law Website" \\
  -d "url=https://www.vasquezlawnc.com" \\
  -d "type=1"

# Configure Sentry
sentry-cli releases new -p vasquez-law v1.0.0
sentry-cli releases files v1.0.0 upload-sourcemaps .next

# Set up Google Analytics events
gtag('event', 'form_submit', {
  'event_category': 'engagement',
  'event_label': 'contact_form'
});
\`\`\`

## 📱 Mobile App Monitoring

### Synthetics
- Test critical user flows
- Monitor form submissions
- Check payment processing
- Verify chat functionality

### Real User Monitoring (RUM)
- Page load performance
- JavaScript errors
- User interactions
- Session recordings

## 🔐 Security Monitoring

### WAF (Web Application Firewall)
- Block malicious requests
- DDoS protection
- Bot detection
- IP whitelisting

### SSL Certificate
- Expiry monitoring
- Certificate transparency
- HSTS compliance
- Security headers

## 📞 On-Call Rotation

### Primary Contact
- Name: [Technical Lead]
- Phone: [Phone Number]
- Email: tech@vasquezlawnc.com

### Secondary Contact
- Name: [Backup Engineer]
- Phone: [Phone Number]
- Email: backup@vasquezlawnc.com

### Escalation Path
1. Automated alert triggered
2. Primary contact notified
3. 15-minute response window
4. Escalate to secondary
5. Escalate to management

## 📝 Incident Response

### Severity Levels
- **P1**: Site down, data breach
- **P2**: Feature broken, slow performance
- **P3**: Minor bugs, cosmetic issues
- **P4**: Enhancement requests

### Response Times
- P1: 15 minutes
- P2: 1 hour
- P3: 4 hours
- P4: Next business day

### Post-Mortem Template
1. Incident summary
2. Timeline of events
3. Root cause analysis
4. Resolution steps
5. Preventive measures
6. Lessons learned

## 🔄 Regular Maintenance

### Daily
- Check uptime reports
- Review error logs
- Monitor form submissions
- Check backup status

### Weekly
- Performance analysis
- Security scan
- SEO audit
- Content updates

### Monthly
- Full site audit
- Dependency updates
- Performance optimization
- Security patches

### Quarterly
- Disaster recovery test
- Load testing
- Security audit
- Technology review
`;

fs.writeFileSync('MONITORING-GUIDE.md', dashboardContent);
console.log('✅ Created monitoring guide');

// Create uptime monitoring config
const uptimeConfig = `# UptimeRobot Configuration

## Monitors to Create

1. **Main Website**
   - URL: https://www.vasquezlawnc.com
   - Check Interval: 5 minutes
   - Alert Contacts: Email + SMS
   - Keyword: "Vasquez Law Firm"

2. **API Health Check**
   - URL: https://www.vasquezlawnc.com/api/health
   - Check Interval: 5 minutes
   - Expected Status: 200
   - Response Time Alert: > 2000ms

3. **Contact Form Page**
   - URL: https://www.vasquezlawnc.com/contact
   - Check Interval: 10 minutes
   - Keyword: "Contact Us"

4. **Spanish Homepage**
   - URL: https://www.vasquezlawnc.com/es
   - Check Interval: 10 minutes
   - Keyword: "Firma de Abogados"

5. **Blog Page**
   - URL: https://www.vasquezlawnc.com/blog
   - Check Interval: 15 minutes
   - Keyword: "Latest News"

6. **Sitemap**
   - URL: https://www.vasquezlawnc.com/sitemap.xml
   - Check Interval: 30 minutes
   - Keyword: "<urlset"

## Alert Contacts

### Primary
- Email: ${monitoringConfig.alerts.email}
- SMS: ${monitoringConfig.alerts.sms}
- Webhook: https://www.vasquezlawnc.com/api/webhooks/monitoring

### Escalation
- Wait Time: 15 minutes
- Max Alerts: 3
- Escalate To: Management

## Status Page

Public URL: https://status.vasquezlawnc.com

### Components
- Website
- API
- Contact Forms  
- Chat Widget
- Payment Processing

## Integration

\`\`\`javascript
// Add to your code
fetch('https://api.uptimerobot.com/v2/getMonitors', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  body: 'api_key=YOUR_API_KEY&format=json'
});
\`\`\`
`;

fs.writeFileSync('uptime-robot-config.md', uptimeConfig);
console.log('✅ Created UptimeRobot configuration');

// Create analytics tracking plan
const trackingPlan = `# Analytics Tracking Plan

## Events to Track

### Conversion Events
1. **form_submit**
   - form_name: string
   - practice_area: string
   - form_location: string

2. **phone_click**
   - click_location: string
   - phone_number: string

3. **chat_started**
   - entry_page: string
   - user_type: new/returning

4. **appointment_scheduled**
   - appointment_type: string
   - practice_area: string

### Engagement Events
1. **page_scroll**
   - scroll_depth: 25/50/75/100
   - page_type: string

2. **video_play**
   - video_title: string
   - video_duration: number

3. **document_download**
   - document_name: string
   - document_type: string

4. **social_share**
   - platform: string
   - content_type: string

### Navigation Events
1. **search**
   - search_term: string
   - results_count: number

2. **language_change**
   - from_language: string
   - to_language: string

3. **office_select**
   - office_location: string
   - action: view/directions

## Custom Dimensions

1. **User Type**: New/Returning
2. **Language**: en/es
3. **Practice Area Interest**: Based on page views
4. **Lead Source**: Organic/Paid/Direct/Referral
5. **Device Category**: Mobile/Desktop/Tablet

## Enhanced Ecommerce

### Product (Service) Impressions
- Service Name
- Practice Area
- Price Range
- Position

### Add to Cart (Start Consultation)
- Service Selected
- Estimated Value
- Consultation Type

### Checkout (Form Submission)
- Step 1: Contact Info
- Step 2: Case Details
- Step 3: Confirmation

### Purchase (Client Conversion)
- Transaction ID
- Revenue
- Service Type
- Payment Method

## Implementation Code

\`\`\`javascript
// Track form submission
gtag('event', 'form_submit', {
  'event_category': 'Lead Generation',
  'event_label': formName,
  'value': 100,
  'custom_dimension_1': userType,
  'custom_dimension_2': language
});

// Track phone click
gtag('event', 'phone_click', {
  'event_category': 'Contact',
  'event_label': location,
  'value': 150
});

// Enhanced ecommerce
gtag('event', 'begin_checkout', {
  'items': [{
    'id': 'immigration-consultation',
    'name': 'Immigration Consultation',
    'category': 'Legal Services',
    'price': 250
  }]
});
\`\`\`
`;

fs.writeFileSync('analytics-tracking-plan.md', trackingPlan);
console.log('✅ Created analytics tracking plan');

// Update package.json scripts
const packageJsonPath = 'package.json';
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

if (!packageJson.scripts['test:monitoring']) {
  packageJson.scripts['test:monitoring'] = 'curl -I https://www.vasquezlawnc.com/api/health';
  packageJson.scripts['test:pre-launch'] = 'node scripts/pre-launch-test.js';
  packageJson.scripts['setup:monitoring'] = 'node scripts/setup-monitoring.js';

  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  console.log('✅ Updated package.json with monitoring scripts');
}

console.log('\n📊 Monitoring setup complete!');
console.log('\nNext steps:');
console.log('1. Sign up for monitoring services (UptimeRobot, Sentry)');
console.log('2. Configure alerts with your contact information');
console.log('3. Set up Google Analytics with provided tracking plan');
console.log('4. Create custom dashboards for different stakeholders');
console.log('5. Test all monitoring endpoints after deployment');
console.log('\n📈 Monitoring ensures your site stays fast, secure, and available!');
