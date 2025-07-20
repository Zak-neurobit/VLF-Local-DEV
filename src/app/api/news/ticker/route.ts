import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { logger } from '@/lib/logger';
import { createErrorLogMeta } from '@/lib/logger/utils';
import RssParser from 'rss-parser';

// Working RSS feeds for live news
const liveFeeds = [
  {
    name: 'Federal Register - DHS',
    url: 'https://www.federalregister.gov/api/v1/documents.rss?conditions[agencies][]=homeland-security-department',
    category: 'immigration',
    priority: 1,
  },
  {
    name: 'Federal Register - USCIS',
    url: 'https://www.federalregister.gov/api/v1/documents.rss?conditions[agencies][]=citizenship-and-immigration-services',
    category: 'immigration',
    priority: 1,
  },
  {
    name: 'Immigration Impact - News',
    url: 'https://immigrationimpact.com/feed/',
    category: 'immigration',
    priority: 2,
  },
];

async function fetchLiveNews(category: string, limit: number): Promise<any[]> {
  const parser = new RssParser({
    timeout: 5000,
    headers: {
      'User-Agent': 'Vasquez Law Firm News Monitor/1.0',
    },
  });

  const newsItems: any[] = [];

  for (const feed of liveFeeds) {
    if (feed.category !== category && category !== 'all') continue;

    try {
      const feedData = await parser.parseURL(feed.url);

      if (feedData.items && feedData.items.length > 0) {
        const items = feedData.items.slice(0, Math.min(3, limit)).map(item => ({
          id: `live-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          title: item.title || 'Immigration News Update',
          titleEs: null, // Would need translation service
          url: item.link || '#',
          date: item.pubDate || new Date().toISOString(),
          category: feed.category,
          urgent: isUrgent(item.title || ''),
          excerpt: (item.contentSnippet || item.summary || '').substring(0, 150) + '...',
          source: feed.name,
          live: true,
        }));

        newsItems.push(...items);
      }
    } catch (error) {
      logger.warn(`Failed to fetch from ${feed.name}:`, createErrorLogMeta(error) as any);
    }
  }

  return newsItems.slice(0, limit);
}

function isUrgent(title: string): boolean {
  const urgentKeywords = [
    'breaking',
    'urgent',
    'immediate',
    'deadline',
    'expires',
    'emergency',
    'alert',
  ];
  return urgentKeywords.some(keyword => title.toLowerCase().includes(keyword));
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') || 'immigration';
    const limit = parseInt(searchParams.get('limit') || '10');
    const locale = searchParams.get('locale') || 'en';

    logger.info(`News ticker request: category=${category}, limit=${limit}, locale=${locale}`);

    let newsItems: any[] = [];

    // Try to get from database first
    try {
      const posts = await prisma.blogPost.findMany({
        where: {
          category: category,
          publishedAt: {
            lte: new Date(),
            not: null,
          },
          status: 'published',
        },
        select: {
          id: true,
          title: true,
          titleEs: true,
          slug: true,
          excerpt: true,
          excerptEs: true,
          publishedAt: true,
          category: true,
          metadata: true,
        },
        orderBy: [
          {
            publishedAt: 'desc',
          },
        ],
        take: limit,
      });

      // Format for news ticker
      newsItems = posts.map(post => ({
        id: post.id,
        title: post.title,
        titleEs: post.titleEs,
        url: `/blog/${post.slug}`,
        date: post.publishedAt ? post.publishedAt.toISOString() : new Date().toISOString(),
        category: post.category,
        urgent: (post.metadata as any)?.urgent || false,
        excerpt: locale === 'es' ? post.excerptEs || post.excerpt : post.excerpt,
      }));

      logger.info(`Fetched ${newsItems.length} news items from database`);
    } catch (dbError) {
      logger.warn('Database unavailable, fetching live news:', createErrorLogMeta(dbError) as any);

      // If database fails, fetch live news from RSS feeds
      newsItems = await fetchLiveNews(category, limit);
      logger.info(`Fetched ${newsItems.length} live news items from RSS feeds`);
    }

    // If we still don't have news, use static fallback
    if (newsItems.length === 0) {
      logger.info('Using static news items');
      const staticNews = [
        {
          id: 'static-1',
          title: 'New USCIS Fee Schedule Takes Effect April 2024',
          titleEs: 'Nuevo Programa de Tarifas del USCIS Entra en Vigor en Abril 2024',
          url: '/blog/uscis-fee-changes-2024',
          date: new Date().toISOString(),
          category: 'immigration',
          urgent: true,
          excerpt: 'Important changes to immigration application fees',
        },
        {
          id: 'static-2',
          title: 'Extended TPS Designation for Venezuelan Nationals',
          titleEs: 'Designación de TPS Extendida para Nacionales Venezolanos',
          url: '/blog/tps-venezuela-extension',
          date: new Date().toISOString(),
          category: 'immigration',
          urgent: false,
          excerpt: 'Temporary Protected Status extended through 2025',
        },
        {
          id: 'static-3',
          title: 'H-1B Registration Period Opens March 2024',
          titleEs: 'Período de Registro H-1B Abre en Marzo 2024',
          url: '/blog/h1b-registration-2024',
          date: new Date().toISOString(),
          category: 'immigration',
          urgent: true,
          excerpt: 'Annual H-1B visa lottery registration now open',
        },
        {
          id: 'static-4',
          title: 'New Immigration Court Procedures in North Carolina',
          titleEs: 'Nuevos Procedimientos en la Corte de Inmigración en Carolina del Norte',
          url: '/blog/nc-immigration-court-updates',
          date: new Date().toISOString(),
          category: 'immigration',
          urgent: false,
          excerpt: 'Important changes for immigration court proceedings',
        },
        {
          id: 'static-5',
          title: 'DACA Renewal Applications - Act Now',
          titleEs: 'Solicitudes de Renovación de DACA - Actúe Ahora',
          url: '/blog/daca-renewal-reminder',
          date: new Date().toISOString(),
          category: 'immigration',
          urgent: true,
          excerpt: 'Critical deadline approaching for DACA renewals',
        },
      ];

      return NextResponse.json(
        {
          posts: staticNews.slice(0, limit),
          source: 'static',
          total: staticNews.length,
        },
        {
          headers: {
            'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
          },
        }
      );
    }

    // Determine data source for response
    const isLive = newsItems.some(item => item.live);
    const source = isLive ? 'live-rss' : 'database';

    return NextResponse.json({
      posts: newsItems,
      source: source,
      total: newsItems.length,
    });
  } catch (error) {
    logger.error('Error fetching news ticker items:', createErrorLogMeta(error) as any);

    // Return static fallback on error
    const fallbackNews = [
      {
        id: 'fallback-1',
        title: 'Immigration Law Updates - Call 1-844-YO-PELEO',
        titleEs: 'Actualizaciones de Inmigración - Llame 1-844-YO-PELEO',
        url: '/contact',
        date: new Date().toISOString(),
        category: 'immigration',
        urgent: true,
        excerpt: 'Get the latest immigration updates',
      },
    ];

    return NextResponse.json({
      posts: fallbackNews,
      source: 'fallback',
      error: 'Using fallback data',
    });
  }
}
