import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const baseUrl = 'https://www.vasquezlawnc.com';
  
  const robotsContent = `# Robots.txt for Vasquez Law Firm
# Generated automatically for SEO optimization

User-agent: *
Allow: /

# Allow all search engines to crawl our content
Allow: /images/
Allow: /attorneys/
Allow: /practice-areas/
Allow: /locations/
Allow: /blog/
Allow: /es/

# Block access to private/admin areas
Disallow: /admin/
Disallow: /api/
Disallow: /dashboard/
Disallow: /_next/
Disallow: /node_modules/
Disallow: /dist/
Disallow: /logs/

# Block specific file types that shouldn't be indexed
Disallow: /*.json$
Disallow: /*.log$
Disallow: /*.txt$ 
Disallow: /*.xml$ 
Disallow: /*.pdf$

# Block query parameters that create duplicate content
Disallow: /*?*utm_*
Disallow: /*?*ref=
Disallow: /*?*fbclid=
Disallow: /*?*gclid=

# Special rules for different crawlers
User-agent: Googlebot
Allow: /
Crawl-delay: 1

User-agent: Bingbot
Allow: /
Crawl-delay: 2

User-agent: facebookexternalhit
Allow: /

User-agent: Twitterbot
Allow: /

User-agent: LinkedInBot
Allow: /

# Block known bad bots
User-agent: MJ12bot
Disallow: /

User-agent: AhrefsBot
Disallow: /

User-agent: SemrushBot
Disallow: /

User-agent: MajesticSEO
Disallow: /

User-agent: DotBot
Disallow: /

# Sitemaps
Sitemap: ${baseUrl}/sitemap.xml
Sitemap: ${baseUrl}/blog-sitemap.xml

# Additional information
# Contact: admin@vasquezlawnc.com
# Website: ${baseUrl}
# Last updated: ${new Date().toISOString().split('T')[0]}`;

  return new NextResponse(robotsContent, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400, must-revalidate',
    },
  });
}