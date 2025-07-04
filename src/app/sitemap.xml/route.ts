import { NextResponse } from 'next/server';
import { officeLocations } from '@/data/locations';

export async function GET() {
  const baseUrl = 'https://www.vasquezlawnc.com';
  const currentDate = new Date().toISOString();

  // Static pages with priority and change frequency
  const staticPages = [
    { path: '', priority: '1.0', changeFreq: 'daily' },
    { path: '/attorneys', priority: '0.9', changeFreq: 'weekly' },
    { path: '/practice-areas', priority: '0.9', changeFreq: 'weekly' },
    { path: '/immigration', priority: '0.9', changeFreq: 'weekly' },
    { path: '/personal-injury', priority: '0.9', changeFreq: 'weekly' },
    { path: '/criminal-defense', priority: '0.8', changeFreq: 'weekly' },
    { path: '/family-law', priority: '0.8', changeFreq: 'weekly' },
    { path: '/workers-compensation', priority: '0.8', changeFreq: 'weekly' },
    { path: '/contact', priority: '0.9', changeFreq: 'monthly' },
    { path: '/blog', priority: '0.8', changeFreq: 'daily' },
    { path: '/about', priority: '0.8', changeFreq: 'monthly' },
    { path: '/testimonials', priority: '0.7', changeFreq: 'weekly' },
    { path: '/case-results', priority: '0.7', changeFreq: 'weekly' },
    { path: '/scholarship', priority: '0.6', changeFreq: 'yearly' },
    { path: '/faqs', priority: '0.7', changeFreq: 'monthly' },
    { path: '/free-consultation', priority: '0.9', changeFreq: 'monthly' },
  ];

  // Spanish pages
  const spanishPages = [
    { path: '/es', priority: '0.9', changeFreq: 'daily' },
    { path: '/es/areas-de-practica', priority: '0.8', changeFreq: 'weekly' },
    { path: '/es/contacto', priority: '0.8', changeFreq: 'monthly' },
    { path: '/es/abogados', priority: '0.8', changeFreq: 'weekly' },
    { path: '/es/blog', priority: '0.7', changeFreq: 'daily' },
  ];

  // Attorney pages
  const attorneyPages = [
    { path: '/attorneys/william-vasquez', priority: '0.8', changeFreq: 'monthly' },
    { path: '/attorneys/adriana-ingram', priority: '0.7', changeFreq: 'monthly' },
    { path: '/attorneys/christopher-afanador', priority: '0.7', changeFreq: 'monthly' },
    { path: '/attorneys/jillian-baucom', priority: '0.7', changeFreq: 'monthly' },
    { path: '/attorneys/mark-kelsey', priority: '0.7', changeFreq: 'monthly' },
    { path: '/attorneys/roselyn-torrellas', priority: '0.7', changeFreq: 'monthly' },
    { path: '/attorneys/judith-parkes', priority: '0.7', changeFreq: 'monthly' },
  ];

  // Location pages from office data
  const locationPages = officeLocations.map(office => ({
    path: `/contact/${office.slug}`,
    priority: '0.8',
    changeFreq: 'monthly',
  }));

  // City-specific location pages
  const cityPages = [
    { path: '/locations/charlotte', priority: '0.8', changeFreq: 'monthly' },
    { path: '/locations/raleigh', priority: '0.8', changeFreq: 'monthly' },
    { path: '/locations/durham', priority: '0.7', changeFreq: 'monthly' },
    { path: '/locations/orlando', priority: '0.8', changeFreq: 'monthly' },
    { path: '/locations/smithfield', priority: '0.7', changeFreq: 'monthly' },
  ];

  // Practice area sub-pages
  const practiceAreaPages = [
    // Immigration
    { path: '/practice-areas/immigration', priority: '0.8', changeFreq: 'weekly' },
    { path: '/immigration/green-cards', priority: '0.7', changeFreq: 'monthly' },
    { path: '/immigration/citizenship-naturalization', priority: '0.7', changeFreq: 'monthly' },
    { path: '/immigration/deportation-removal-defense', priority: '0.7', changeFreq: 'monthly' },
    { path: '/immigration/asylum-refugee-legal-help', priority: '0.7', changeFreq: 'monthly' },
    { path: '/immigration/family-based-relative', priority: '0.7', changeFreq: 'monthly' },
    { path: '/immigration/employment-based-immigration', priority: '0.7', changeFreq: 'monthly' },
    {
      path: '/immigration/daca-deferred-action-childhood-arrivals',
      priority: '0.7',
      changeFreq: 'monthly',
    },
    { path: '/immigration/fiance-k-visas', priority: '0.7', changeFreq: 'monthly' },
    { path: '/immigration/vawa-u-visa-crime-victims', priority: '0.7', changeFreq: 'monthly' },

    // Personal Injury
    { path: '/practice-areas/personal-injury', priority: '0.8', changeFreq: 'weekly' },
    { path: '/personal-injury/car-auto-accidents', priority: '0.7', changeFreq: 'monthly' },
    { path: '/personal-injury/truck-accidents', priority: '0.7', changeFreq: 'monthly' },
    { path: '/personal-injury/motorcycle-accidents', priority: '0.7', changeFreq: 'monthly' },
    { path: '/personal-injury/pedestrian-hit-by-car', priority: '0.7', changeFreq: 'monthly' },
    { path: '/personal-injury/premises-liability', priority: '0.7', changeFreq: 'monthly' },
    { path: '/personal-injury/drunk-driver-liability', priority: '0.7', changeFreq: 'monthly' },

    // Criminal Defense
    { path: '/practice-areas/criminal-defense', priority: '0.8', changeFreq: 'weekly' },
    { path: '/criminal-defense/dwi-drunk-driving', priority: '0.7', changeFreq: 'monthly' },
    { path: '/criminal-defense/drug-crime-cases', priority: '0.7', changeFreq: 'monthly' },
    { path: '/criminal-defense/traffic-offenses-tickets', priority: '0.7', changeFreq: 'monthly' },
    { path: '/criminal-defense/domestic-violence-abuse', priority: '0.7', changeFreq: 'monthly' },
    { path: '/criminal-defense/expungement-expunction', priority: '0.7', changeFreq: 'monthly' },

    // Family Law
    { path: '/practice-areas/family-law', priority: '0.8', changeFreq: 'weekly' },
    { path: '/family-law/divorce', priority: '0.7', changeFreq: 'monthly' },
    { path: '/family-law/child-custody', priority: '0.7', changeFreq: 'monthly' },
    { path: '/family-law/alimony-spousal-support', priority: '0.7', changeFreq: 'monthly' },
    {
      path: '/family-law/equitable-distribution-property-debt-division',
      priority: '0.7',
      changeFreq: 'monthly',
    },

    // Workers Compensation
    { path: '/practice-areas/workers-compensation', priority: '0.8', changeFreq: 'weekly' },
    {
      path: '/workers-compensation/construction-site-injuries',
      priority: '0.7',
      changeFreq: 'monthly',
    },
    {
      path: '/workers-compensation/repetitive-stress-carpal-tunnel',
      priority: '0.7',
      changeFreq: 'monthly',
    },
    {
      path: '/workers-compensation/third-party-injury-claims',
      priority: '0.7',
      changeFreq: 'monthly',
    },
  ];

  // Combine all pages
  const allPages = [
    ...staticPages,
    ...spanishPages,
    ...attorneyPages,
    ...locationPages,
    ...cityPages,
    ...practiceAreaPages,
  ];

  // Generate XML
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${allPages
  .map(
    page => `  <url>
    <loc>${baseUrl}${page.path}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changeFreq}</changefreq>
    <priority>${page.priority}</priority>
    ${
      page.path.includes('/es/') || page.path === '/es'
        ? `
    <xhtml:link rel="alternate" hreflang="es" href="${baseUrl}${page.path}" />
    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}${page.path.replace('/es/', '/').replace('/es', '')}" />`
        : `
    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}${page.path}" />
    <xhtml:link rel="alternate" hreflang="es" href="${baseUrl}/es${page.path}" />`
    }
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
