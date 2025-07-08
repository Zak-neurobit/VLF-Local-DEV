import { NextResponse } from 'next/server';
import { HreflangUtils } from '@/lib/seo/hreflang-utils';

interface HreflangSitemapUrl {
  loc: string;
  alternates: Array<{
    hreflang: string;
    href: string;
  }>;
  lastmod?: string;
  changefreq?: string;
  priority?: string;
}

export async function GET() {
  const baseUrl = 'https://www.vasquezlawnc.com';

  // Define all pages that have bilingual versions
  const bilingualPages = [
    // Main pages
    '/',
    '/about',
    '/contact',
    '/attorneys',
    '/practice-areas',
    '/testimonials',
    '/case-results',
    '/scholarship',
    '/free-consultation',
    '/payment',
    '/make-payment',
    '/privacy-policy',
    '/terms-of-service',
    '/sitemap',
    '/blog',
    
    // Practice areas - main categories
    '/practice-areas/immigration',
    '/practice-areas/personal-injury',
    '/practice-areas/criminal-defense',
    '/practice-areas/workers-compensation',
    '/practice-areas/family-law',
    '/practice-areas/traffic-violations',
    
    // Attorney pages
    '/attorneys/william-vasquez',
    '/attorneys/adrianna-ingram',
    '/attorneys/christopher-afanador',
    '/attorneys/jillian-baucom',
    '/attorneys/mark-kelsey',
    '/attorneys/roselyn-v-torrellas',
    '/attorneys/judith-parkes',
    
    // Location pages - main offices
    '/locations/charlotte',
    '/locations/raleigh',
    '/locations/orlando',
    '/locations/smithfield',
    '/locations/durham',
    '/locations/winston-salem',
    
    // Contact location pages
    '/contact/charlotte-nc-office-location',
    '/contact/raleigh-nc-office-location',
    '/contact/orlando-fl-office-location',
    '/contact/smithfield-office-location',

    // Sub-practice areas that have Spanish versions
    '/practice-areas/immigration/green-cards',
    '/practice-areas/immigration/citizenship-naturalization',
    '/practice-areas/immigration/deportation-removal-defense',
    '/practice-areas/immigration/asylum-refugee-legal-help',
    '/practice-areas/immigration/family-based-relative',
    '/practice-areas/immigration/employment-based-immigration',
    '/practice-areas/immigration/adjustment-of-status',
    '/practice-areas/immigration/daca-deferred-action-childhood-arrivals',
    '/practice-areas/immigration/vawa-u-visa-crime-victims',
    '/practice-areas/immigration/t-visa',
    '/practice-areas/immigration/detention-bond-hearings',
    '/practice-areas/immigration/inadmissibility-waivers',
    '/practice-areas/immigration/fiance-k-visas',
    '/practice-areas/immigration/immediate-relative-visas',
    '/practice-areas/immigration/family-preference-visas',

    // Personal injury pages
    '/practice-areas/personal-injury/car-auto-accidents',
    '/practice-areas/personal-injury/truck-accidents',
    '/practice-areas/personal-injury/motorcycle-accidents',
    '/practice-areas/personal-injury/pedestrian-accidents',
    '/practice-areas/personal-injury/bicycle-accidents',
    '/practice-areas/personal-injury/drunk-driver-accidents',
    '/practice-areas/personal-injury/wrongful-death',
    '/practice-areas/personal-injury/medical-malpractice',
    '/practice-areas/personal-injury/premises-liability',

    // Criminal defense pages
    '/practice-areas/criminal-defense/dui-dwi',
    '/practice-areas/criminal-defense/drug-crimes',
    '/practice-areas/criminal-defense/assault-battery',
    '/practice-areas/criminal-defense/theft-property-crimes',
    '/practice-areas/criminal-defense/domestic-violence',
    '/practice-areas/criminal-defense/traffic-offenses',
    '/practice-areas/criminal-defense/expungement',

    // Workers compensation pages
    '/practice-areas/workers-compensation/construction-site-injuries',
    '/practice-areas/workers-compensation/equipment-accidents',
    '/practice-areas/workers-compensation/mental-health-claims',
    '/practice-areas/workers-compensation/third-party-injury-claims',

    // Family law pages
    '/practice-areas/family-law/divorce',
    '/practice-areas/family-law/child-custody',
    '/practice-areas/family-law/alimony-spousal-support',
  ];

  // Generate sitemap URLs with hreflang annotations
  const sitemapUrls: HreflangSitemapUrl[] = [];

  for (const page of bilingualPages) {
    const hreflangEntries = HreflangUtils.generateHreflangEntries(page);
    
    // Add entry for each language version
    const englishEntry = hreflangEntries.find(entry => entry.hreflang === 'en');
    const spanishEntry = hreflangEntries.find(entry => entry.hreflang === 'es');

    if (englishEntry) {
      sitemapUrls.push({
        loc: englishEntry.href,
        alternates: hreflangEntries,
        lastmod: new Date().toISOString(),
        changefreq: getChangeFrequency(page),
        priority: getPriority(page).toString(),
      });
    }

    if (spanishEntry && spanishEntry.href !== englishEntry?.href) {
      sitemapUrls.push({
        loc: spanishEntry.href,
        alternates: hreflangEntries,
        lastmod: new Date().toISOString(),
        changefreq: getChangeFrequency(page),
        priority: getPriority(page).toString(),
      });
    }
  }

  // Generate XML sitemap with hreflang annotations
  const xml = generateHreflangSitemapXML(sitemapUrls);

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}

function generateHreflangSitemapXML(urls: HreflangSitemapUrl[]): string {
  const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>';
  const sitemapStart = '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">';
  const sitemapEnd = '</urlset>';

  const urlEntries = urls.map(url => {
    const alternateLinks = url.alternates
      .filter(alt => alt.hreflang !== 'x-default') // x-default doesn't go in sitemap
      .map(alt => `    <xhtml:link rel="alternate" hreflang="${alt.hreflang}" href="${alt.href}" />`)
      .join('\n');

    return `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
${alternateLinks}
  </url>`;
  }).join('\n');

  return `${xmlHeader}
${sitemapStart}
${urlEntries}
${sitemapEnd}`;
}

function getChangeFrequency(page: string): string {
  if (page === '' || page === '/blog') return 'daily';
  if (page.includes('/blog/')) return 'weekly';
  if (page.includes('/locations/')) return 'weekly';
  if (page.includes('/practice-areas/')) return 'monthly';
  if (page.includes('/attorneys/')) return 'monthly';
  return 'monthly';
}

function getPriority(page: string): number {
  if (page === '') return 1.0;
  if (page === '/practice-areas' || page === '/locations/nc') return 0.95;
  if (page.includes('/practice-areas/immigration') || page.includes('/practice-areas/personal-injury')) return 0.9;
  if (page.includes('/locations/nc/') && !page.includes('/locations/nc/')) return 0.9;
  if (page.includes('/practice-areas/') && page.split('/').length === 3) return 0.85;
  if (page.includes('/attorneys') || page === '/contact') return 0.8;
  if (page.includes('/locations/nc/') && page.split('/').length === 5) return 0.8;
  if (page.includes('/blog')) return 0.7;
  if (page.includes('/practice-areas/') && page.split('/').length === 4) return 0.75;
  return 0.6;
}