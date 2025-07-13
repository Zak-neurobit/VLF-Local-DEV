import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/logger';
import { SEODominationOrchestrator } from '@/lib/crewai/seo-domination/seo-domination-orchestrator';

// Global instance to maintain state
let orchestrator: SEODominationOrchestrator | null = null;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');

    switch (action) {
      case 'status':
        return NextResponse.json({
          running: orchestrator !== null,
          message: orchestrator ? 'SEO Domination System is ACTIVE 🔥' : 'System is offline',
        });

      case 'metrics':
        if (!orchestrator) {
          return NextResponse.json({ error: 'System not running' }, { status: 400 });
        }

        // Get current metrics
        const summary = await orchestrator.generateExecutiveSummary();
        return NextResponse.json({ summary });

      default:
        return NextResponse.json(
          {
            error: 'Invalid action',
            availableActions: ['status', 'metrics'],
          },
          { status: 400 }
        );
    }
  } catch (error) {
    logger.error('SEO Domination API Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action } = body;

    switch (action) {
      case 'start':
        if (orchestrator) {
          return NextResponse.json({
            message: 'SEO Domination System is already running!',
          });
        }

        orchestrator = new SEODominationOrchestrator();
        await orchestrator.startTotalDomination();

        return NextResponse.json({
          success: true,
          message: '🚀💥 SEO DOMINATION SYSTEM ACTIVATED! Competitors will tremble! 🔥',
        });

      case 'stop':
        if (!orchestrator) {
          return NextResponse.json({
            message: 'System is not running',
          });
        }

        await orchestrator.stopDomination();
        orchestrator = null;

        return NextResponse.json({
          success: true,
          message: 'SEO Domination System stopped',
        });

      case 'emergency':
        if (!orchestrator) {
          return NextResponse.json({ error: 'System not running' }, { status: 400 });
        }

        const { situation } = body;
        await orchestrator.triggerEmergencyResponse(situation);

        return NextResponse.json({
          success: true,
          message: `Emergency response activated for: ${situation}`,
        });

      default:
        return NextResponse.json(
          {
            error: 'Invalid action',
            availableActions: ['start', 'stop', 'emergency'],
          },
          { status: 400 }
        );
    }
  } catch (error) {
    logger.error('SEO Domination API Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
