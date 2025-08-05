/**
 * Netlify Function: Contact Form Handler
 * Replaces /api/contact for static export
 */

const { z } = require('zod');

// Contact form validation schema
const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  caseType: z.string().min(1, 'Please select a case type'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  preferredContact: z.enum(['email', 'phone', 'text']).default('email'),
  location: z.string().optional(),
  language: z.enum(['en', 'es']).default('en'),
  website: z.string().optional(), // Honeypot field
});

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: {
        'Allow': 'POST',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json',
  };

  // Handle OPTIONS request for CORS
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  try {
    const body = JSON.parse(event.body);
    
    // Validate input
    const validatedData = contactFormSchema.parse(body);

    // Check honeypot
    if (validatedData.website) {
      console.log('Honeypot triggered');
      // Return success to not reveal honeypot
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          message: 'Thank you for contacting us.',
        }),
      };
    }

    // In a real implementation, you would:
    // 1. Save to database (Supabase, FaunaDB, etc.)
    // 2. Send email notification
    // 3. Create lead in CRM (GoHighLevel)
    
    // For now, log the submission and return success
    console.log('Contact form submission:', {
      name: validatedData.name,
      email: validatedData.email,
      caseType: validatedData.caseType,
      language: validatedData.language,
      timestamp: new Date().toISOString(),
    });

    // TODO: Integrate with external services
    // - Send email via SendGrid/Mailgun
    // - Save to external database
    // - Create CRM lead

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: validatedData.language === 'es'
          ? 'Gracias por contactarnos. Le responderemos dentro de 1 hora hábil.'
          : 'Thank you for contacting us. We will respond within 1 business hour.',
      }),
    };

  } catch (error) {
    console.error('Contact form error:', error);

    if (error.errors) {
      // Zod validation error
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          error: 'Validation error',
          details: error.errors,
        }),
      };
    }

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        error: 'Failed to submit contact form. Please try again or call us directly.',
      }),
    };
  }
};