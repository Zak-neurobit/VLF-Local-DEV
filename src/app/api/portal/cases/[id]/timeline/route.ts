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

    // Get all activities for the case
    const activities = await prisma.caseActivity.findMany({
      where: { caseId: params.id },
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: {
            name: true,
            role: true,
          },
        },
      },
    });

    // Transform activities into timeline events
    const events = activities.map((activity) => ({
      id: activity.id,
      type: activity.type as any,
      title: activity.title,
      description: activity.description,
      date: activity.createdAt,
      user: {
        name: activity.user.name || 'System',
        role: activity.user.role || 'system',
      },
      metadata: activity.metadata as any,
    }));

    return NextResponse.json({ success: true, events });
  } catch (error) {
    console.error('Failed to fetch timeline:', error);
    return NextResponse.json(
      { error: 'Failed to fetch timeline' },
      { status: 500 }
    );
  }
}