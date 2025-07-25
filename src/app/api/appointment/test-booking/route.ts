import { NextRequest, NextResponse } from 'next/server';
import { appointmentBookingHandler } from '@/lib/chat/appointment-booking-handler';
import { ghlService } from '@/services/gohighlevel';
import { logger } from '@/lib/safe-logger';
import { errorToLogMeta } from '@/lib/safe-logger';

export async function GET(request: NextRequest) {
  try {
    // Test GHL connection
    const ghlStatus = await ghlService.getServiceStatus();

    // Get available slots for the next 7 days
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 7);

    const availableSlots = await appointmentBookingHandler.getAvailableSlots(startDate, endDate);

    // Test appointment intent parsing
    const testMessages = {
      en: [
        'I need to schedule an appointment for immigration',
        'Can I book a consultation for tomorrow?',
        'I need urgent help with my visa',
      ],
      es: [
        'Necesito agendar una cita para inmigración',
        '¿Puedo reservar una consulta para mañana?',
        'Necesito ayuda urgente con mi visa',
      ],
    };

    const intentResults = {
      en: await Promise.all(
        testMessages.en.map(msg => appointmentBookingHandler.parseAppointmentIntent(msg, 'en'))
      ),
      es: await Promise.all(
        testMessages.es.map(msg => appointmentBookingHandler.parseAppointmentIntent(msg, 'es'))
      ),
    };

    return NextResponse.json({
      success: true,
      ghlStatus,
      availableSlots: {
        count: availableSlots.length,
        nextAvailable: availableSlots[0],
        sample: availableSlots.slice(0, 5),
      },
      intentParsing: {
        testMessages,
        results: intentResults,
      },
      configuration: {
        hasGHLApiKey: !!process.env.GHL_API_KEY,
        hasGHLLocationId: !!process.env.GHL_LOCATION_ID,
        hasGHLCalendarId: !!process.env.GHL_CALENDAR_ID,
        hasMainPipelineId: !!process.env.GHL_MAIN_PIPELINE_ID,
      },
    });
  } catch (error) {
    logger.error('Appointment booking test error:', errorToLogMeta(error));
    return NextResponse.json(
      {
        error: 'Test failed',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action } = body;

    if (action === 'test-booking') {
      // Test booking with mock data
      const testBooking = {
        userId: 'test-user-' + Date.now(),
        language: 'en' as const,
        contactInfo: {
          firstName: 'Test',
          lastName: 'User',
          email: 'test@example.com',
          phone: '+1234567890',
        },
        preferences: {
          practiceArea: 'immigration',
          urgency: 'normal' as const,
          notes: 'This is a test booking from the API',
        },
      };

      // Get available slots
      const startDate = new Date();
      const endDate = new Date();
      endDate.setDate(endDate.getDate() + 7);

      const availableSlots = await appointmentBookingHandler.getAvailableSlots(startDate, endDate);

      if (availableSlots.length === 0) {
        return NextResponse.json({
          success: false,
          error: 'No available slots found',
        });
      }

      // Try to book the first available slot
      const selectedSlot = availableSlots[0];
      const bookingResult = await appointmentBookingHandler.bookAppointment(
        testBooking,
        selectedSlot
      );

      return NextResponse.json({
        success: bookingResult.success,
        result: bookingResult,
        testData: {
          slot: selectedSlot,
          booking: testBooking,
        },
      });
    }

    if (action === 'test-conversation') {
      // Test the conversation flow
      const { message, sessionData, language = 'en' } = body;

      const result = await appointmentBookingHandler.handleAppointmentConversation(
        message,
        sessionData || { userId: 'test-user', bookingFlow: {} },
        language
      );

      return NextResponse.json({
        success: true,
        conversationResult: result,
      });
    }

    return NextResponse.json(
      { error: 'Invalid action. Use "test-booking" or "test-conversation"' },
      { status: 400 }
    );
  } catch (error) {
    logger.error('Appointment booking test error:', errorToLogMeta(error));
    return NextResponse.json(
      {
        error: 'Test failed',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
