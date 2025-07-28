import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { prisma } from '@/lib/prisma';
import { logger, errorToLogMeta } from '@/lib/safe-logger';

export async function GET() {
  const headersList = await headers();
  const host = headersList.get('host') || 'vasquezlawfirm.com';
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
  const baseUrl = `${protocol}://${host}`;

  try {
    // Fetch all published blog posts
    const posts = await prisma.blogPost.findMany({
      where: { publishedAt: { not: null } },
      select: {
        slug: true,
        updatedAt: true,
        createdAt: true,
        metadata: true,
      },
      orderBy: { updatedAt: 'desc' },
    });

    const entries = posts
      .map(post => {
        const lastmod = (post.updatedAt || post.createdAt).toISOString();
        const metadata = post.metadata as any;
        const hasSpanish = metadata?.translations?.es;

        const urls = [
          `  <url>
    <loc>${baseUrl}/blog/${post.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`,
        ];

        if (hasSpanish) {
          urls.push(`  <url>
    <loc>${baseUrl}/es/blog/${post.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`);
        }

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
  } catch (error) {
    logger.error('Error generating blog sitemap', errorToLogMeta(error));

    // Return empty sitemap on error
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
</urlset>`;

    return new NextResponse(xml, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=300',
      },
    });
  }
}
