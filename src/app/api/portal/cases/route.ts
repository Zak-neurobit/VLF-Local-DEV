import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma-safe';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get('status')?.split(',') || [];
    const practiceArea = searchParams.get('practiceArea');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    const where: any = {
      clientId: session.user.id,
    };

    if (status.length > 0) {
      where.status = { in: status };
    }

    if (practiceArea) {
      where.practiceArea = practiceArea;
    }

    if (startDate || endDate) {
      where.createdAt = {};
      if (startDate) where.createdAt.gte = new Date(startDate);
      if (endDate) where.createdAt.lte = new Date(endDate);
    }

    const cases = await prisma.case.findMany({
      where,
      orderBy: { updatedAt: 'desc' },
      include: {
        attorney: {
          select: {
            name: true,
            email: true,
          },
        },
        _count: {
          select: {
            documents: true,
          },
        },
      },
    });

    // Transform the data
    const transformedCases = cases.map(c => {
      const metadata = (c.metadata as any) || {};
      return {
        id: c.id,
        caseNumber: c.caseNumber,
        title: metadata.title || `Case ${c.caseNumber}`,
        practiceArea: c.practiceArea,
        status: c.status,
        priority: metadata.priority || 'normal',
        attorney: c.attorney,
        createdAt: c.createdAt,
        updatedAt: c.updatedAt,
        unreadMessages: 0, // TODO: Implement when CaseMessage model is added
        documentCount: c._count.documents,
        lastActivity: c.updatedAt,
      };
    });

    return NextResponse.json({ success: true, cases: transformedCases });
  } catch (error) {
    console.error('Failed to fetch cases:', error);
    return NextResponse.json({ error: 'Failed to fetch cases' }, { status: 500 });
  }
}
