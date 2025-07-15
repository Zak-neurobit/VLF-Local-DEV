import { NextRequest, NextResponse } from 'next/server';
import { getCrewCoordinator } from '@/lib/crewai/crew-coordinator';
import { AppointmentRequest } from '@/lib/crewai/agents/appointment-scheduling-agent';
import { logger } from '@/lib/logger';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action } = body;

    if (action === 'find-slots') {
      return await handleFindSlots(body);
    } else if (action === 'book-appointment') {
      return await handleBookAppointment(body);
    } else {
      return NextResponse.json(
        { error: 'Invalid action. Use "find-slots" or "book-appointment"' },
        { status: 400 }
      );
    }
  } catch (error) {
    logger.error('Appointment scheduling API error:', error);
    return NextResponse.json({ error: 'Failed to process appointment request' }, { status: 500 });
  }
}

async function handleFindSlots(body: {
  userId: string;
  preferredDates?: string[];
  preferredTimeSlots?: string[];
  appointmentType?: string;
  attorneyId?: string;
  practiceArea: string;
  duration?: number;
  isUrgent?: boolean;
  language?: string;
  location?: string;
  notes?: string;
  clientInfo?: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    source?: string;
  };
}) {
  const appointmentRequest: AppointmentRequest = {
    userId: body.userId,
    preferredDates: body.preferredDates?.map((date: string) => new Date(date)) || [],
    preferredTimeSlots: body.preferredTimeSlots || [],
    appointmentType:
      (body.appointmentType as
        | 'consultation'
        | 'follow_up'
        | 'document_review'
        | 'court'
        | 'other') || 'consultation',
    attorneyId: body.attorneyId,
    practiceArea: body.practiceArea,
    duration: body.duration || 60,
    isUrgent: body.isUrgent || false,
    language: (body.language as 'en' | 'es') || 'en',
    location: (body.location as 'in-person' | 'virtual' | 'phone') || 'virtual',
    notes: body.notes,
    clientInfo: body.clientInfo || {
      firstName: 'Unknown',
      lastName: 'Client',
      email: 'unknown@example.com',
      phone: 'Unknown',
      source: 'API Request',
    },
  };

  // Validate required fields
  if (!appointmentRequest.userId || !appointmentRequest.practiceArea) {
    return NextResponse.json(
      { error: 'Missing required fields: userId, practiceArea' },
      { status: 400 }
    );
  }

  // Create task
  const taskId = await getCrewCoordinator().createAppointmentSchedulingTask(
    appointmentRequest.userId,
    appointmentRequest,
    appointmentRequest.isUrgent ? 'urgent' : 'medium'
  );

  logger.info(
    `Created appointment scheduling task ${taskId} for user ${appointmentRequest.userId}`
  );

  return NextResponse.json({
    taskId,
    status: 'created',
    message: 'Appointment scheduling has been queued',
  });
}

async function handleBookAppointment(body: {
  userId: string;
  slot: {
    date: string;
    time: string;
    attorneyId: string;
    attorneyName: string;
    location: string;
  };
  appointmentRequest: AppointmentRequest;
}) {
  const { userId, slot, appointmentRequest } = body;

  if (!userId || !slot || !appointmentRequest) {
    return NextResponse.json(
      { error: 'Missing required fields: userId, slot, appointmentRequest' },
      { status: 400 }
    );
  }

  // Validate client information is present
  if (
    !appointmentRequest.clientInfo ||
    !appointmentRequest.clientInfo.email ||
    !appointmentRequest.clientInfo.firstName
  ) {
    return NextResponse.json(
      { error: 'Client information (firstName, lastName, email, phone) is required for booking' },
      { status: 400 }
    );
  }

  try {
    // Import the appointment scheduling agent
    const { AppointmentSchedulingAgent } = await import(
      '@/lib/crewai/agents/appointment-scheduling-agent'
    );
    const agent = new AppointmentSchedulingAgent();

    // Convert slot to proper format
    const appointmentSlot = {
      date: new Date(slot.date),
      time: slot.time,
      attorneyId: slot.attorneyId,
      attorneyName: slot.attorneyName,
      available: true,
      location: slot.location,
    };

    // Book appointment with GHL integration
    const result = await agent.bookAppointment(userId, appointmentSlot, appointmentRequest);

    if (result.success) {
      logger.info(
        `Successfully booked appointment for ${appointmentRequest.clientInfo.firstName} ${appointmentRequest.clientInfo.lastName}`,
        {
          confirmationNumber: result.confirmationNumber,
          ghlContactId: result.ghlContactId,
        }
      );

      return NextResponse.json({
        success: true,
        confirmationNumber: result.confirmationNumber,
        ghlContactId: result.ghlContactId,
        message:
          'Appointment successfully booked in GoHighLevel calendar and contact added to Main Pipeline',
        appointmentDetails: {
          date: slot.date,
          time: slot.time,
          attorney: slot.attorneyName,
          location: slot.location,
          clientName: `${appointmentRequest.clientInfo.firstName} ${appointmentRequest.clientInfo.lastName}`,
          practiceArea: appointmentRequest.practiceArea,
        },
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          error: result.error || 'Failed to book appointment',
        },
        { status: 400 }
      );
    }
  } catch (error) {
    logger.error('Appointment booking error:', error);
    return NextResponse.json({ error: 'Failed to book appointment' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const taskId = searchParams.get('taskId');
    const action = searchParams.get('action');

    if (action === 'queue-status') {
      const queueStatus = getCrewCoordinator().getQueueStatus();
      return NextResponse.json(queueStatus);
    }

    if (!taskId) {
      return NextResponse.json({ error: 'Task ID is required for status check' }, { status: 400 });
    }

    const task = getCrewCoordinator().getTaskStatus(taskId);

    if (!task) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }

    return NextResponse.json({
      taskId: task.id,
      status: task.status,
      result: task.result,
      error: task.error,
      createdAt: task.createdAt,
      completedAt: task.completedAt,
    });
  } catch (error) {
    logger.error('Appointment scheduling status check error:', error);
    return NextResponse.json({ error: 'Failed to check task status' }, { status: 500 });
  }
}
