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

  // NC cities with Spanish support
  const ncCities = [
    'raleigh', 'charlotte', 'durham', 'greensboro', 'winston-salem',
    'cary', 'apex', 'garner', 'clayton', 'smithfield', 'wake-forest',
    'holly-springs', 'fuquay-varina', 'knightdale', 'morrisville',
    'huntersville', 'cornelius', 'matthews', 'pineville', 'gastonia',
    'concord', 'kannapolis', 'salisbury', 'mooresville', 'statesville'
  ];

  // Spanish practice area paths
  const spanishPracticeAreaPaths = [
    'abogado-inmigracion',
    'abogado-lesiones-personales', 
    'abogado-defensa-criminal',
    'abogado-compensacion-laboral',
    'abogado-derecho-familia',
    'abogado-infracciones-transito'
  ];

  // English practice area paths for hreflang
  const englishPracticeAreaPaths = [
    'immigration-lawyer',
    'personal-injury-attorney',
    'criminal-defense-lawyer', 
    'workers-compensation-attorney',
    'family-law-attorney',
    'traffic-violation-lawyer'
  ];

  const spanishLocationPages: SitemapUrl[] = [];

  // Main NC page in Spanish
  spanishLocationPages.push({
    loc: `${baseUrl}/es/ubicaciones/nc`,
    lastmod: currentDate,
    changefreq: 'monthly',
    priority: 0.8,
    hreflang: [
      { lang: 'es', href: `${baseUrl}/es/ubicaciones/nc` },
      { lang: 'en', href: `${baseUrl}/locations/nc` }
    ]
  });

  // Generate Spanish city pages with practice areas
  ncCities.forEach(city => {
    // Main city page in Spanish
    spanishLocationPages.push({
      loc: `${baseUrl}/es/ubicaciones/nc/${city}`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.7,
      hreflang: [
        { lang: 'es', href: `${baseUrl}/es/ubicaciones/nc/${city}` },
        { lang: 'en', href: `${baseUrl}/locations/nc/${city}` }
      ]
    });

    // Practice area pages for each city in Spanish
    spanishPracticeAreaPaths.forEach((spanishPractice, index) => {
      const englishPractice = englishPracticeAreaPaths[index];
      spanishLocationPages.push({
        loc: `${baseUrl}/es/ubicaciones/nc/${city}/${spanishPractice}`,
        lastmod: currentDate,
        changefreq: 'monthly',
        priority: 0.6,
        hreflang: [
          { lang: 'es', href: `${baseUrl}/es/ubicaciones/nc/${city}/${spanishPractice}` },
          { lang: 'en', href: `${baseUrl}/locations/nc/${city}/${englishPractice}` }
        ]
      });
    });
  });

  // Major location hubs in Spanish  
  const majorSpanishLocations = [
    {
      spanish: 'charlotte',
      english: 'charlotte',
      practices: [
        { es: 'abogado-inmigracion', en: 'immigration-lawyer' },
        { es: 'abogado-lesiones-personales', en: 'personal-injury-attorney' },
        { es: 'abogado-defensa-criminal', en: 'criminal-defense-lawyer' },
        { es: 'abogado-compensacion-laboral', en: 'workers-comp-attorney' }
      ]
    },
    {
      spanish: 'raleigh', 
      english: 'raleigh',
      practices: [
        { es: 'abogado-inmigracion', en: 'immigration-lawyer' },
        { es: 'abogado-lesiones-personales', en: 'personal-injury-attorney' },
        { es: 'abogado-defensa-criminal', en: 'criminal-defense-lawyer' },
        { es: 'abogado-compensacion-laboral', en: 'workers-comp-attorney' }
      ]
    }
  ];

  majorSpanishLocations.forEach(location => {
    location.practices.forEach(practice => {
      spanishLocationPages.push({
        loc: `${baseUrl}/es/ubicaciones/${location.spanish}/${practice.es}`,
        lastmod: currentDate,
        changefreq: 'monthly',
        priority: 0.8,
        hreflang: [
          { lang: 'es', href: `${baseUrl}/es/ubicaciones/${location.spanish}/${practice.es}` },
          { lang: 'en', href: `${baseUrl}/locations/${location.english}/${practice.en}` }
        ]
      });
    });
  });

  // Generate XML
  const xmlContent = generateSitemapXML(spanishLocationPages);

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
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}