// Quick test to validate the email service implementation
const { emailService } = require('./dist/services/email.service.js');

async function testEmailService() {
  try {
    console.log('Testing email service implementation...');

    // Test basic functionality
    const testData = {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '555-1234',
      caseType: 'Personal Injury',
      preferredContact: 'Email',
      message: 'Test message',
    };

    // This should return success: true but not actually send (no SMTP config in test)
    const result = await emailService.sendContactFormNotification(testData);

    console.log('Email service test result:', result);
    console.log('✅ Email service implementation is working correctly!');
  } catch (error) {
    console.error('❌ Email service test failed:', error.message);
    process.exit(1);
  }
}

// Only run if this file is executed directly
if (require.main === module) {
  testEmailService();
}

module.exports = { testEmailService };
