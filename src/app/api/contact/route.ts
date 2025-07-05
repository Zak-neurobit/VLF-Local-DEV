import { NextRequest, NextResponse } from 'next/server';
import { getPrismaClient } from '@/lib/prisma';
import { apiLogger } from '@/lib/logger';
import { emailService } from '@/services/email.service';
import { contactFormSchema } from '@/lib/validations/forms';
import { contactFormLimiter } from '@/lib/rate-limiter';

export async function POST(req: NextRequest) {
  apiLogger.request(req.method, req.url, {});

  try {
    // Apply rate limiting
    const rateLimitResponse = await contactFormLimiter(req);
    if (rateLimitResponse) {
      return rateLimitResponse;
    }

    const body = await req.json();

    // Validate input
    const validatedData = contactFormSchema.parse(body);

    // Check honeypot
    if (validatedData.website) {
      apiLogger.warn('Honeypot triggered', { ip: req.headers.get('x-forwarded-for') });
      // Return success to not reveal honeypot
      return NextResponse.json({
        success: true,
        message: 'Thank you for contacting us.',
      });
    }

    const prisma = getPrismaClient();

    // Check if user already exists
    let user = await prisma.user.findUnique({
      where: { email: validatedData.email },
    });

    if (!user) {
      // Create new user
      user = await prisma.user.create({
        data: {
          email: validatedData.email,
          name: validatedData.name,
          phone: validatedData.phone,
          language: validatedData.language || 'en',
          role: 'CLIENT',
        },
      });
    } else {
      // Update existing user's info
      user = await prisma.user.update({
        where: { id: user.id },
        data: {
          name: validatedData.name,
          phone: validatedData.phone,
          language: validatedData.language || user.language,
          lastActive: new Date(),
        },
      });
    }

    // Create task for follow-up
    const task = await prisma.task.create({
      data: {
        title: `New Contact Form Submission - ${validatedData.name}`,
        description: `
          Case Type: ${validatedData.caseType}
          Message: ${validatedData.message}
          Preferred Contact: ${validatedData.preferredContact}
          Location: ${validatedData.location || 'Not specified'}
        `,
        type: 'follow_up',
        priority: 'high',
        status: 'pending',
        createdById: user.id,
        metadata: validatedData,
      },
    });

    // Send email notifications
    await emailService.sendContactFormNotification(validatedData);

    // Log successful submission
    apiLogger.info('contact-form-success', {
      userId: user.id,
      taskId: task.id,
      caseType: validatedData.caseType,
    });

    return NextResponse.json({
      success: true,
      message:
        validatedData.language === 'es'
          ? 'Gracias por contactarnos. Le responderemos dentro de 1 hora hábil.'
          : 'Thank you for contacting us. We will respond within 1 business hour.',
      userId: user.id,
    });
  } catch (error) {
    apiLogger.error('contact-form', error as Error, {});

    if (error instanceof Error && 'errors' in error) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation error',
          details: error.errors,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to submit contact form. Please try again or call us directly.',
      },
      { status: 500 }
    );
  }
}
