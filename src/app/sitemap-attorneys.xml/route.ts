import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { attorneyProfiles } from '@/data/attorneys';

export async function GET() {
  const headersList = await headers();
  const host = headersList.get('host') || 'vasquezlawfirm.com';
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
  const baseUrl = `${protocol}://${host}`;

  const entries = attorneyProfiles
    .map(attorney => {
      const urls = [
        `  <url>
    <loc>${baseUrl}/attorneys/${attorney.slug}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`,
        `  <url>
    <loc>${baseUrl}/es/abogados/${attorney.slug}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`,
      ];

      return urls.join('\n');
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
