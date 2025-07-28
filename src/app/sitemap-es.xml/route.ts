import { NextResponse } from 'next/server';
import { FileSystemPageDiscovery, type DiscoveredPage } from '@/lib/sitemap/page-discovery';
import { headers } from 'next/headers';

export async function GET() {
  const headersList = await headers();
  const host = headersList.get('host') || 'vasquezlawfirm.com';
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
  const baseUrl = `${protocol}://${host}`;

  const discovery = new FileSystemPageDiscovery();
  const allPages = await discovery.discoverAllPages();

  // Collect all Spanish pages
  const spanishPages: DiscoveredPage[] = [];

  for (const [, pair] of allPages) {
    if (pair.es) {
      spanishPages.push(pair.es);
    }
  }

  const xml = await discovery.generateSitemapXML(spanishPages, baseUrl);

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
