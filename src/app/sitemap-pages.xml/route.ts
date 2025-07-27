import { NextResponse } from 'next/server';
import { FileSystemPageDiscovery } from '@/lib/sitemap/page-discovery';
import { headers } from 'next/headers';

export async function GET() {
  const headersList = await headers();
  const host = headersList.get('host') || 'vasquezlawfirm.com';
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
  const baseUrl = `${protocol}://${host}`;

  const discovery = new FileSystemPageDiscovery();
  const allPages = await discovery.discoverAllPages();

  // Filter for static pages (not blog, attorneys, etc.)
  const staticPages: any[] = [];

  for (const [, pair] of allPages) {
    if (
      pair.en &&
      !pair.en.path.includes('/blog') &&
      !pair.en.path.includes('/attorneys') &&
      !pair.en.path.includes('/es/') &&
      pair.en.type === 'static'
    ) {
      staticPages.push(pair.en);
    }
  }

  const xml = await discovery.generateSitemapXML(staticPages, baseUrl);

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
