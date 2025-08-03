import { NextResponse } from 'next/server';
import { headers } from 'next/headers';

export const dynamic = 'force-static';

export async function GET() {
  const headersList = await headers();
  const host = headersList.get('host') || 'vasquezlawfirm.com';
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
  const baseUrl = `${protocol}://${host}`;

  // Sub-sitemaps for better organization and performance
  const sitemaps = [
    { loc: `${baseUrl}/sitemap-pages.xml`, lastmod: new Date().toISOString() },
    { loc: `${baseUrl}/sitemap-blog.xml`, lastmod: new Date().toISOString() },
    { loc: `${baseUrl}/sitemap-attorneys.xml`, lastmod: new Date().toISOString() },
    { loc: `${baseUrl}/sitemap-practice-areas.xml`, lastmod: new Date().toISOString() },
    { loc: `${baseUrl}/sitemap-resources.xml`, lastmod: new Date().toISOString() },
    { loc: `${baseUrl}/sitemap-landing-pages.xml`, lastmod: new Date().toISOString() },
    { loc: `${baseUrl}/sitemap-es.xml`, lastmod: new Date().toISOString() },
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps
  .map(
    sitemap => `  <sitemap>
    <loc>${sitemap.loc}</loc>
    <lastmod>${sitemap.lastmod}</lastmod>
  </sitemap>`
  )
  .join('\n')}
</sitemapindex>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
