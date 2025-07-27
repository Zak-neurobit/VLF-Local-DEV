#!/usr/bin/env node

/**
 * Email Configuration Test Script
 *
 * This script tests your email configuration to ensure emails can be sent properly.
 *
 * Usage:
 *   npm run test:email -- recipient@example.com
 *   node scripts/test-email-config.js recipient@example.com
 */

require('dotenv').config({ path: '.env.local' });
const nodemailer = require('nodemailer');

async function testEmailConfig() {
  console.log('🔧 Testing Email Configuration...\n');

  // Get recipient from command line or use default
  const recipient = process.argv[2] || process.env.CONTACT_EMAIL || 'test@example.com';

  // Check if email is mocked
  if (process.env.MOCK_EMAIL === 'true') {
    console.log('⚠️  MOCK_EMAIL is set to true. Emails will be logged but not sent.');
    console.log('   To send real emails, set MOCK_EMAIL=false in your .env.local\n');
  }

  // Check required environment variables
  const requiredVars = {
    EMAIL_FROM: process.env.EMAIL_FROM,
    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_PORT: process.env.SMTP_PORT,
    SMTP_USER: process.env.SMTP_USER,
    SMTP_PASSWORD: process.env.SMTP_PASSWORD || process.env.SMTP_PASS,
  };

  console.log('📋 Environment Check:');
  let hasAllRequired = true;

  for (const [key, value] of Object.entries(requiredVars)) {
    if (!value) {
      console.log(`   ❌ ${key}: Not set`);
      hasAllRequired = false;
    } else {
      // Mask sensitive values
      const displayValue = key.includes('PASSWORD') ? '****' + value.slice(-4) : value;
      console.log(`   ✅ ${key}: ${displayValue}`);
    }
  }

  console.log('\n📋 Email Routing Configuration:');
  console.log(`   CONTACT_EMAIL: ${process.env.CONTACT_EMAIL || 'Not set (using default)'}`);
  console.log(`   ATTORNEY_EMAIL: ${process.env.ATTORNEY_EMAIL || 'Not set (using default)'}`);
  console.log(`   URGENT_LEAD_EMAILS: ${process.env.URGENT_LEAD_EMAILS || 'Not set'}`);

  if (!hasAllRequired) {
    console.log('\n❌ Missing required environment variables!');
    console.log(
      '   Please check your .env.local file and ensure all SMTP settings are configured.'
    );
    console.log('   See docs/EMAIL-SETUP.md for detailed instructions.');
    process.exit(1);
  }

  // Create transporter
  console.log('\n🔌 Creating SMTP connection...');

  const transportConfig = {
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD || process.env.SMTP_PASS,
    },
    logger: true,
    debug: true,
  };

  // Office 365 specific settings
  if (process.env.SMTP_HOST === 'smtp.office365.com') {
    transportConfig.tls = {
      ciphers: 'SSLv3',
      rejectUnauthorized: false,
    };
  }

  const transporter = nodemailer.createTransporter(transportConfig);

  try {
    // Verify connection
    console.log('\n🔍 Verifying SMTP connection...');
    await transporter.verify();
    console.log('✅ SMTP connection verified successfully!\n');

    // Send test email
    console.log(`📧 Sending test email to: ${recipient}`);

    const mailOptions = {
      from: `"Vasquez Law Firm Test" <${process.env.EMAIL_FROM}>`,
      to: recipient,
      subject: 'Email Configuration Test - Vasquez Law Firm',
      text: `This is a test email from the Vasquez Law Firm website.

If you received this email, your email configuration is working correctly!

Configuration Details:
- SMTP Host: ${process.env.SMTP_HOST}
- SMTP Port: ${process.env.SMTP_PORT}
- From Address: ${process.env.EMAIL_FROM}
- Sent at: ${new Date().toLocaleString()}

This is an automated test email.`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #C9974D;">Email Configuration Test</h2>
          <p>This is a test email from the Vasquez Law Firm website.</p>
          <p><strong>✅ If you received this email, your email configuration is working correctly!</strong></p>
          
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>Configuration Details:</h3>
            <ul>
              <li><strong>SMTP Host:</strong> ${process.env.SMTP_HOST}</li>
              <li><strong>SMTP Port:</strong> ${process.env.SMTP_PORT}</li>
              <li><strong>From Address:</strong> ${process.env.EMAIL_FROM}</li>
              <li><strong>Sent at:</strong> ${new Date().toLocaleString()}</li>
            </ul>
          </div>
          
          <p style="color: #666; font-size: 12px;">This is an automated test email.</p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log('\n✅ Test email sent successfully!');
    console.log(`   Message ID: ${info.messageId}`);
    console.log(`   Response: ${info.response}`);
    console.log(`\n📬 Check the inbox for: ${recipient}`);
  } catch (error) {
    console.error('\n❌ Email test failed!');
    console.error('   Error:', error.message);

    if (error.message.includes('auth')) {
      console.log('\n💡 Authentication Tips:');
      console.log('   - For Gmail: Use an app password, not your regular password');
      console.log('   - For Office 365: Enable 2FA and use an app password');
      console.log('   - For SendGrid: Use "apikey" as username and your API key as password');
    }

    if (error.message.includes('ECONNREFUSED')) {
      console.log('\n💡 Connection Tips:');
      console.log('   - Check if your firewall is blocking the SMTP port');
      console.log('   - Verify the SMTP host and port are correct');
      console.log('   - Try using port 587 (TLS) or 465 (SSL)');
    }

    process.exit(1);
  } finally {
    transporter.close();
  }
}

// Run the test
testEmailConfig().catch(console.error);
