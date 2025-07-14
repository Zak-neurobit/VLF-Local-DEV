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

    const searchParams = request.nextUrl.searchParams;
    const filter = searchParams.get('filter');

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

    let where: any = { caseId: params.id };

    if (filter === 'pending_signature') {
      where.signatureRequired = true;
      where.signedAt = null;
    } else if (filter === 'recent') {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      where.uploadedAt = { gte: sevenDaysAgo };
    }

    const documents = await prisma.document.findMany({
      where,
      orderBy: { uploadedAt: 'desc' },
      include: {
        uploadedBy: {
          select: {
            name: true,
            role: true,
          },
        },
      },
    });

    // Transform documents
    const transformedDocuments = documents.map((doc) => ({
      id: doc.id,
      name: doc.name,
      type: doc.type,
      size: doc.size,
      uploadedAt: doc.uploadedAt,
      uploadedBy: {
        name: doc.uploadedBy.name || 'Unknown',
        role: doc.uploadedBy.role || 'client',
      },
      status: doc.status,
      category: doc.category,
      description: doc.description,
      downloadUrl: `/api/portal/documents/${doc.id}/download`,
      signatureRequired: doc.signatureRequired,
      signedAt: doc.signedAt,
    }));

    return NextResponse.json({ success: true, documents: transformedDocuments });
  } catch (error) {
    console.error('Failed to fetch documents:', error);
    return NextResponse.json(
      { error: 'Failed to fetch documents' },
      { status: 500 }
    );
  }
}