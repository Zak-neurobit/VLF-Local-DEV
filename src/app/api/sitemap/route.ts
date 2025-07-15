import { NextRequest, NextResponse } from 'next/server';
import { apiLogger } from '@/lib/pino-logger';
import { SEOOptimizationService } from '@/services/seo-optimization';

export async function GET(_req: NextRequest) {
  try {
    const sitemap = await SEOOptimizationService.generateSitemap();

    return new NextResponse(sitemap, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    });
  } catch (error) {
    apiLogger.error('Error generating sitemap:', error);
    return new NextResponse('Error generating sitemap', { status: 500 });
  }
}
