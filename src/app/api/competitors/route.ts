import { NextRequest, NextResponse } from 'next/server';
import { competitorMonitoringSystem } from '@/lib/crewai/competitor-monitoring-system';
import { logger } from '@/lib/logger';
import { prisma } from '@/lib/prisma-safe';
import { withAuth } from '@/lib/auth/middleware';

/**
 * GET /api/competitors - List all competitors
 */
export async function GET(request: NextRequest) {
  try {
    const competitors = await prisma.competitor.findMany({
      orderBy: { name: 'asc' },
      include: {
        activities: {
          take: 5,
          orderBy: { timestamp: 'desc' },
        },
        _count: {
          select: { activities: true },
        },
      },
    });

    return NextResponse.json({
      success: true,
      competitors,
    });
  } catch (error) {
    logger.error('Failed to fetch competitors', { error });
    return NextResponse.json(
      { success: false, error: 'Failed to fetch competitors' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/competitors - Register new competitor
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.name || !body.website) {
      return NextResponse.json(
        { success: false, error: 'Name and website are required' },
        { status: 400 }
      );
    }

    // Register with monitoring system
    await competitorMonitoringSystem.registerCompetitor(body);

    // Store in database
    const competitor = await prisma.competitor.create({
      data: {
        name: body.name,
        website: body.website,
        practiceAreas: body.practiceAreas || [],
        locations: body.locations || [],
        socialMedia: body.socialMedia || {},
        trackingConfig: body.trackingConfig || {
          enabled: true,
          frequency: 'daily',
          priority: 'medium',
          trackContent: true,
          trackRankings: true,
          trackSocial: true,
          trackAds: true,
          trackReviews: true,
        },
      },
    });

    logger.info('Competitor registered', { 
      competitorId: competitor.id,
      name: competitor.name 
    });

    return NextResponse.json({
      success: true,
      competitor,
    });
  } catch (error) {
    logger.error('Failed to register competitor', { error });
    return NextResponse.json(
      { success: false, error: 'Failed to register competitor' },
      { status: 500 }
    );
  }
}

// Apply authentication middleware
export const runtime = 'nodejs';