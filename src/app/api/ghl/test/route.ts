import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/pino-logger';
import { testGHLConnection, createGHLContact } from '@/lib/ghl';

export async function GET() {
  try {
    const connectionTest = await testGHLConnection();

    return NextResponse.json({
      success: true,
      connectionTest,
      environment: {
        hasApiKey: !!process.env.GHL_API_KEY,
        hasLocationId: !!process.env.GHL_LOCATION_ID,
        apiUrl: process.env.GHL_API_URL || 'https://rest.gohighlevel.com/v1',
      },
    });
  } catch (error) {
    logger.error('Error testing GHL connection:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to test GHL connection',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, firstName, lastName, email, phone, practiceArea, message } = body;

    // Validate required fields
    if (!email && !phone) {
      return NextResponse.json(
        {
          success: false,
          error: 'Either email or phone is required',
        },
        { status: 400 }
      );
    }

    // Prepare contact data
    const contactData = {
      firstName: firstName || name?.split(' ')[0] || 'Test',
      lastName: lastName || name?.split(' ').slice(1).join(' ') || 'Contact',
      email,
      phone,
      source: 'Website Test',
      tags: ['Website Lead', 'Test Contact'],
      customFields: {
        practice_area: practiceArea || 'General',
        initial_message: message || 'Test contact creation',
        lead_source: 'API Test',
      },
    };

    // Create contact in GHL
    const result = await createGHLContact(contactData);

    return NextResponse.json({
      success: true,
      result,
      contactData: {
        ...contactData,
        // Don't return sensitive data in test response
        customFields: Object.keys(contactData.customFields || {}),
      },
    });
  } catch (error) {
    logger.error('Error creating test contact:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create test contact',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
