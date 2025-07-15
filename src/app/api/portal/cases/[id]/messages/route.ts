import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma-safe';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Verify case belongs to user
    const caseData = await prisma.case.findFirst({
      where: {
        id: params.id,
        clientId: session.user.id,
      },
    });

    if (!caseData) {
      return NextResponse.json({ error: 'Case not found' }, { status: 404 });
    }

    const messages = await prisma.message.findMany({
      where: { caseId: params.id },
      orderBy: { sentAt: 'asc' },
      include: {
        sender: {
          select: {
            id: true,
            name: true,
            role: true,
          },
        },
        attachments: {
          select: {
            name: true,
            url: true,
          },
        },
      },
    });

    // Mark messages as read
    await prisma.message.updateMany({
      where: {
        caseId: params.id,
        senderId: { not: session.user.id },
        readAt: null,
      },
      data: {
        readAt: new Date(),
      },
    });

    // Transform messages
    const transformedMessages = messages.map((msg) => ({
      id: msg.id,
      content: msg.content,
      sentAt: msg.sentAt,
      sender: {
        id: msg.sender.id,
        name: msg.sender.name || 'Unknown',
        role: msg.sender.role || 'client',
      },
      attachments: msg.attachments,
      readAt: msg.readAt,
    }));

    return NextResponse.json({ success: true, messages: transformedMessages });
  } catch (error) {
    console.error('Failed to fetch messages:', error);
    return NextResponse.json(
      { error: 'Failed to fetch messages' },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { content } = await request.json();

    if (!content?.trim()) {
      return NextResponse.json(
        { error: 'Message content is required' },
        { status: 400 }
      );
    }

    // Verify case belongs to user
    const caseData = await prisma.case.findFirst({
      where: {
        id: params.id,
        clientId: session.user.id,
      },
    });

    if (!caseData) {
      return NextResponse.json({ error: 'Case not found' }, { status: 404 });
    }

    // Create message
    const message = await prisma.message.create({
      data: {
        caseId: params.id,
        senderId: session.user.id,
        content,
        sentAt: new Date(),
      },
      include: {
        sender: {
          select: {
            id: true,
            name: true,
            role: true,
          },
        },
      },
    });

    // Create activity log
    await prisma.caseActivity.create({
      data: {
        caseId: params.id,
        userId: session.user.id,
        type: 'message_sent',
        title: 'New Message',
        description: 'Client sent a message',
        metadata: { messageId: message.id },
      },
    });

    // TODO: Send notification to attorney

    return NextResponse.json({
      success: true,
      message: {
        id: message.id,
        content: message.content,
        sentAt: message.sentAt,
        sender: {
          id: message.sender.id,
          name: message.sender.name || 'Unknown',
          role: message.sender.role || 'client',
        },
      },
    });
  } catch (error) {
    console.error('Failed to send message:', error);
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    );
  }
}