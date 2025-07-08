import { NextRequest, NextResponse } from 'next/server';

interface SitemapUrl {
  loc: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
  hreflang?: Array<{ lang: string; href: string }>;
}

export async function GET(request: NextRequest) {
  const baseUrl = 'https://www.vasquezlawnc.com';
  const currentDate = new Date().toISOString();

  // Static pages with high priority
  const staticPages: SitemapUrl[] = [
    {
      loc: `${baseUrl}/`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: 1.0,
      hreflang: [
        { lang: 'en', href: `${baseUrl}/` },
        { lang: 'es', href: `${baseUrl}/es` }
      ]
    },
    {
      loc: `${baseUrl}/contact`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.9,
      hreflang: [
        { lang: 'en', href: `${baseUrl}/contact` },
        { lang: 'es', href: `${baseUrl}/es/contacto` }
      ]
    },
    {
      loc: `${baseUrl}/attorneys`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.8,
      hreflang: [
        { lang: 'en', href: `${baseUrl}/attorneys` },
        { lang: 'es', href: `${baseUrl}/es/abogados` }
      ]
    },
    {
      loc: `${baseUrl}/attorneys/william-vasquez`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.8,
    },
    {
      loc: `${baseUrl}/attorneys/christopher-afanador`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.7,
    },
    {
      loc: `${baseUrl}/attorneys/jillian-baucom`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.7,
    },
    {
      loc: `${baseUrl}/blog`,
      lastmod: currentDate,
      changefreq: 'daily',
      priority: 0.8,
    },
  ];

  // Practice areas
  const practiceAreas: SitemapUrl[] = [
    {
      loc: `${baseUrl}/practice-areas/immigration`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.9,
    },
    {
      loc: `${baseUrl}/practice-areas/personal-injury`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.9,
    },
    {
      loc: `${baseUrl}/practice-areas/criminal-defense`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.8,
    },
    {
      loc: `${baseUrl}/practice-areas/criminal-defense/theft-larceny-shoplifting`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.7,
    },
    {
      loc: `${baseUrl}/practice-areas/criminal-defense/probation-violation`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.7,
    },
    {
      loc: `${baseUrl}/practice-areas/workers-compensation`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.8,
    },
    {
      loc: `${baseUrl}/practice-areas/traffic-violations`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.7,
    },
  ];

  // Main location pages
  const mainLocations: SitemapUrl[] = [
    {
      loc: `${baseUrl}/locations`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.8,
    },
    {
      loc: `${baseUrl}/locations/raleigh`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.8,
    },
    {
      loc: `${baseUrl}/locations/charlotte`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.8,
    },
    {
      loc: `${baseUrl}/locations/winston-salem`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.7,
    },
    {
      loc: `${baseUrl}/locations/smithfield`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.7,
    },
    {
      loc: `${baseUrl}/locations/durham`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.7,
    },
    {
      loc: `${baseUrl}/locations/orlando`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.7,
    },
  ];

  // NC city pages with practice areas
  const ncCities = [
    'raleigh', 'charlotte', 'durham', 'greensboro', 'winston-salem',
    'cary', 'apex', 'garner', 'clayton', 'smithfield'
  ];

  const practiceAreaPaths = [
    'car-accident-lawyer',
    'personal-injury-attorney',
    'immigration-lawyer',
    'criminal-defense-attorney',
    'workers-compensation-lawyer'
  ];

  const cityPracticePages: SitemapUrl[] = [];
  ncCities.forEach(city => {
    // Main city page
    cityPracticePages.push({
      loc: `${baseUrl}/locations/nc/${city}`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.6,
    });

    // Practice area pages for each city
    practiceAreaPaths.forEach(practice => {
      cityPracticePages.push({
        loc: `${baseUrl}/locations/nc/${city}/${practice}`,
        lastmod: currentDate,
        changefreq: 'monthly',
        priority: 0.5,
      });
    });
  });

  // NC counties
  const ncCounties = [
    'wake', 'mecklenburg', 'durham', 'guilford', 'forsyth',
    'johnston', 'union', 'cabarrus', 'orange', 'chatham'
  ];

  const countyPages: SitemapUrl[] = ncCounties.map(county => ({
    loc: `${baseUrl}/locations/nc/counties/${county}`,
    lastmod: currentDate,
    changefreq: 'monthly',
    priority: 0.4,
  }));

  // Spanish pages
  const spanishPages: SitemapUrl[] = [
    {
      loc: `${baseUrl}/es`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: 0.8,
    },
    {
      loc: `${baseUrl}/es/acerca-de`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.7,
    },
    {
      loc: `${baseUrl}/es/consulta-gratuita`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.8,
    },
    {
      loc: `${baseUrl}/es/testimonios`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.6,
    },
    {
      loc: `${baseUrl}/es/ubicaciones`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.7,
    },
    {
      loc: `${baseUrl}/es/ubicaciones/raleigh`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.6,
    },
    {
      loc: `${baseUrl}/es/ubicaciones/charlotte`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.6,
    },
    {
      loc: `${baseUrl}/es/ubicaciones/winston-salem`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.5,
    },
    {
      loc: `${baseUrl}/es/ubicaciones/orlando`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.5,
    },
    {
      loc: `${baseUrl}/es/areas-de-practica/infracciones-transito`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.6,
    },
  ];

  // Combine all URLs
  const allUrls = [
    ...staticPages,
    ...practiceAreas,
    ...mainLocations,
    ...cityPracticePages,
    ...countyPages,
    ...spanishPages,
  ];

  // Generate XML
  const xmlContent = generateSitemapXML(allUrls);

  return new NextResponse(xmlContent, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400, must-revalidate',
    },
  });
}

function generateSitemapXML(urls: SitemapUrl[]): string {
  const urlElements = urls.map(url => {
    let hreflangElements = '';
    if (url.hreflang) {
      hreflangElements = url.hreflang.map(link => 
        `<xhtml:link rel="alternate" hreflang="${link.lang}" href="${escapeXml(link.href)}" />`
      ).join('\n    ');
    }

    return `
  <url>
    <loc>${escapeXml(url.loc)}</loc>
    ${url.lastmod ? `<lastmod>${url.lastmod}</lastmod>` : ''}
    ${url.changefreq ? `<changefreq>${url.changefreq}</changefreq>` : ''}
    ${url.priority !== undefined ? `<priority>${url.priority}</priority>` : ''}
    ${hreflangElements ? `${hreflangElements}` : ''}
  </url>`;
  }).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${urlElements}
</urlset>`;
}

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '"')
    .replace(/'/g, '&#39;');
}