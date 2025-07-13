import { MetadataRoute } from 'next';
import { ncCities } from '@/lib/seo/local-seo-generator';
import { HreflangGenerator } from '@/components/SEO/HreflangGenerator';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.vasquezlawnc.com';

  // Static pages
  const staticPages = [
    '',
    '/attorneys',
    '/practice-areas',
    '/contact',
    '/blog',
    '/about',
    '/testimonials',
    '/case-results',
    '/resources',
    '/faq',
    '/es',
    '/es/areas-de-practica',
    '/es/contacto',
    '/es/abogados',
    '/es/testimonios',
  ];

  // Attorney pages
  const attorneyPages = [
    '/attorneys/william-vasquez',
    '/attorneys/adrianna-ingram',
    '/attorneys/christopher-afanador',
    '/attorneys/jillian-baucom',
    '/attorneys/mark-kelsey',
    '/attorneys/roselyn-v-torrellas',
    '/attorneys/judith-parkes',
  ];

  // Main practice area pages
  const practiceAreaPages = [
    '/practice-areas/immigration',
    '/practice-areas/personal-injury',
    '/practice-areas/criminal-defense',
    '/practice-areas/workers-compensation',
    '/practice-areas/family-law',
    '/practice-areas/traffic-violations',
  ];

  // Sub-practice area pages
  const subPracticeAreaPages = [
    // Immigration
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
    // Personal Injury
    '/practice-areas/personal-injury/car-auto-accidents',
    '/practice-areas/personal-injury/truck-accidents',
    '/practice-areas/personal-injury/motorcycle-accidents',
    '/practice-areas/personal-injury/pedestrian-accidents',
    '/practice-areas/personal-injury/bicycle-accidents',
    '/practice-areas/personal-injury/drunk-driver-accidents',
    '/practice-areas/personal-injury/wrongful-death',
    '/practice-areas/personal-injury/medical-malpractice',
    '/practice-areas/personal-injury/premises-liability',
    '/practice-areas/personal-injury/nursing-home-abuse',
    '/practice-areas/personal-injury/uninsured-motorist',
    '/practice-areas/personal-injury/boating-accidents',
    '/practice-areas/personal-injury/emergency-vehicle-accidents',
    // Criminal Defense
    '/practice-areas/criminal-defense/dui-dwi',
    '/practice-areas/criminal-defense/drug-crimes',
    '/practice-areas/criminal-defense/assault-battery',
    '/practice-areas/criminal-defense/theft-property-crimes',
    '/practice-areas/criminal-defense/domestic-violence',
    '/practice-areas/criminal-defense/traffic-offenses',
    '/practice-areas/criminal-defense/expungement',
    // Workers Compensation
    '/practice-areas/workers-compensation/construction-site-injuries',
    '/practice-areas/workers-compensation/equipment-accidents',
    '/practice-areas/workers-compensation/repetitive-stress-carpal-tunnel',
    '/practice-areas/workers-compensation/lifting-injuries',
    '/practice-areas/workers-compensation/mental-health-claims',
    '/practice-areas/workers-compensation/third-party-injury-claims',
    // Family Law
    '/practice-areas/family-law/divorce',
    '/practice-areas/family-law/child-custody',
    '/practice-areas/family-law/alimony-spousal-support',
    '/practice-areas/family-law/property-division',
  ];

  // Location pages - NC cities
  const locationPages = [
    '/locations/nc',
    ...Object.keys(ncCities).map(city => `/locations/nc/${city}`),
  ];

  // Location + Practice Area combination pages (for major cities)
  const majorCities = ['charlotte', 'raleigh', 'durham', 'greensboro', 'winston-salem'];
  const practiceAreaSlugs = [
    'immigration-lawyer',
    'personal-injury-attorney',
    'criminal-defense-lawyer',
    'workers-compensation-attorney',
    'family-law-attorney',
    'traffic-violation-lawyer',
  ];

  const locationPracticeAreaPages = majorCities.flatMap(city =>
    practiceAreaSlugs.map(practice => `/locations/nc/${city}/${practice}`)
  );

  // Blog pages (you would typically fetch these from your database)
  const blogPages = [
    '/blog/immigration-law-updates-2024',
    '/blog/nc-personal-injury-settlements',
    '/blog/criminal-defense-rights-nc',
    '/blog/workers-comp-benefits-guide',
    '/blog/nc-family-law-changes',
  ];

  const allPages = [
    ...staticPages,
    ...attorneyPages,
    ...practiceAreaPages,
    ...subPracticeAreaPages,
    ...locationPages,
    ...locationPracticeAreaPages,
    ...blogPages,
  ];

  return allPages.map(page => ({
    url: `${baseUrl}${page}`,
    lastModified: new Date(),
    changeFrequency: getChangeFrequency(page),
    priority: getPriority(page),
  }));
}

function getChangeFrequency(
  page: string
): 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never' {
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
  if (
    page.includes('/practice-areas/immigration') ||
    page.includes('/practice-areas/personal-injury')
  )
    return 0.9;
  if (page.includes('/locations/nc/') && !page.includes('/locations/nc/')) return 0.9;
  if (page.includes('/practice-areas/') && page.split('/').length === 3) return 0.85;
  if (page.includes('/attorneys') || page === '/contact') return 0.8;
  if (page.includes('/locations/nc/') && page.split('/').length === 5) return 0.8;
  if (page.includes('/blog')) return 0.7;
  if (page.includes('/practice-areas/') && page.split('/').length === 4) return 0.75;
  return 0.6;
}
