#!/usr/bin/env tsx

import fs from 'fs/promises';
import path from 'path';
import { execSync } from 'child_process';

interface PageInfo {
  path: string;
  language: 'en' | 'es';
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

interface PagePair {
  en?: PageInfo;
  es?: PageInfo;
}

async function generateCompleteSitemaps() {
  console.log('🚀 Starting comprehensive sitemap generation...\n');

  const baseUrl = 'https://www.vasquezlawnc.com';
  const appDir = path.join(process.cwd(), 'src/app');
  const publicDir = path.join(process.cwd(), 'public');

  // Find all page files including dynamic routes
  console.log('📂 Discovering all pages...');
  const pageFiles = execSync(
    `find "${appDir}" -name "page.tsx" -type f | grep -v node_modules | sort`,
    { encoding: 'utf-8' }
  )
    .trim()
    .split('\n')
    .filter(Boolean);

  console.log(`Found ${pageFiles.length} total page files`);

  // Process pages into structured data
  const pages = new Map<string, PagePair>();
  const now = new Date().toISOString();

  // Pages to exclude from sitemap
  const excludePatterns = [
    '/api/',
    '/admin',
    '/test',
    '/socket',
    '/webhook',
    '/.well-known',
    '/sitemap',
    '/robots',
    '/_',
    '/manifest',
    '/animations-demo',
    '/portal',
    '/404',
    '/500',
    '[...catchAll]',
    '[[...segments]]',
  ];

  for (const file of pageFiles) {
    // Convert file path to URL path
    const relativePath = file.replace(appDir, '').replace('/page.tsx', '');
    let urlPath = relativePath || '/';

    // Clean up the path (remove route groups)
    urlPath = urlPath.replace(/\/\([^)]+\)/g, '');

    // Skip excluded paths
    if (excludePatterns.some(pattern => urlPath.includes(pattern))) {
      continue;
    }

    // Skip dynamic routes with brackets (we'll generate these separately)
    if (urlPath.includes('[') && urlPath.includes(']')) {
      continue;
    }

    // Determine language
    // Some Spanish pages don't use /es/ prefix but have Spanish names
    const spanishOnlyPageNames = [
      '/accesibilidad',
      '/politica-de-privacidad',
      '/politica-privacidad',
      '/terminos-servicio',
    ];

    // Check if it's a Spanish-only page (exact match at root level)
    const isSpanishOnlyPage = spanishOnlyPageNames.includes(urlPath);

    // Standard Spanish detection
    const isSpanish = urlPath.startsWith('/es') || urlPath.includes('/es/') || isSpanishOnlyPage;
    const language = isSpanish ? 'es' : 'en';

    // Normalize path for pairing (remove language prefix for Spanish pages)
    let normalizedPath = urlPath;
    if (isSpanish) {
      if (urlPath === '/es') {
        normalizedPath = '/';
      } else if (urlPath.startsWith('/es/')) {
        normalizedPath = urlPath.substring(3);
      } else if (isSpanishOnlyPage) {
        // For Spanish pages without /es/ prefix, try to find English equivalent
        const translations: Record<string, string> = {
          '/accesibilidad': '/accessibility',
          '/politica-de-privacidad': '/privacy-policy',
          '/politica-privacidad': '/privacy-policy',
          '/terminos-servicio': '/terms-of-service',
        };

        normalizedPath = translations[urlPath] || urlPath;
      }
    }

    // Create page info
    const pageInfo: PageInfo = {
      path: urlPath,
      language,
      lastmod: now,
      changefreq: getChangeFrequency(urlPath),
      priority: getPriority(urlPath),
    };

    // Store in pages map
    if (!pages.has(normalizedPath)) {
      pages.set(normalizedPath, {});
    }
    const pair = pages.get(normalizedPath)!;
    pair[language] = pageInfo;
  }

  // Add dynamic content pages (blog posts, attorneys, etc.)
  await addDynamicPages(pages, now);

  // Calculate statistics
  let totalPages = 0;
  let enPages = 0;
  let esPages = 0;
  let pairedPages = 0;
  const missingTranslations: string[] = [];

  pages.forEach((pair, normalizedPath) => {
    if (pair.en) {
      totalPages++;
      enPages++;
    }
    if (pair.es) {
      totalPages++;
      esPages++;
    }
    if (pair.en && pair.es) {
      pairedPages++;
    }

    // Check for missing translations
    if ((pair.en && !pair.es) || (!pair.en && pair.es)) {
      missingTranslations.push(normalizedPath);
    }
  });

  console.log(`\n📊 Page Statistics:`);
  console.log(`   Total pages: ${totalPages}`);
  console.log(`   English pages: ${enPages}`);
  console.log(`   Spanish pages: ${esPages}`);
  console.log(`   Pages with both languages: ${pairedPages}`);
  console.log(`   Missing translations: ${missingTranslations.length}`);

  // Generate main sitemap with all pages
  console.log('\n📝 Generating sitemaps...');
  const mainSitemap = generateSitemapXML(pages, baseUrl, true);
  await fs.writeFile(path.join(publicDir, 'sitemap-complete.xml'), mainSitemap);
  console.log('✅ Generated sitemap-complete.xml');

  // Generate language-specific sitemaps
  const enSitemap = generateLanguageSitemap(pages, 'en', baseUrl);
  const esSitemap = generateLanguageSitemap(pages, 'es', baseUrl);

  await fs.writeFile(path.join(publicDir, 'sitemap-en.xml'), enSitemap);
  await fs.writeFile(path.join(publicDir, 'sitemap-es.xml'), esSitemap);
  console.log('✅ Generated language-specific sitemaps');

  // Generate category-based sitemaps
  const categorySitemaps = [
    {
      name: 'sitemap-locations.xml',
      filter: (p: string) => p.includes('/locations') || p.includes('/ubicaciones'),
    },
    {
      name: 'sitemap-practice-areas.xml',
      filter: (p: string) => p.includes('/practice-areas') || p.includes('/areas-de-practica'),
    },
    {
      name: 'sitemap-blog.xml',
      filter: (p: string) => p.includes('/blog'),
    },
    {
      name: 'sitemap-near-me.xml',
      filter: (p: string) => p.includes('/near-me') || p.includes('/cerca-de-mi'),
    },
    {
      name: 'sitemap-attorneys.xml',
      filter: (p: string) => p.includes('/attorneys') || p.includes('/abogados'),
    },
  ];

  for (const { name, filter } of categorySitemaps) {
    const filteredPages = new Map<string, PagePair>();
    pages.forEach((pair, normalizedPath) => {
      const shouldInclude = (pair.en && filter(pair.en.path)) || (pair.es && filter(pair.es.path));
      if (shouldInclude) {
        filteredPages.set(normalizedPath, pair);
      }
    });

    const entryCount = Array.from(filteredPages.values()).reduce((count, pair) => {
      return count + (pair.en ? 1 : 0) + (pair.es ? 1 : 0);
    }, 0);

    if (filteredPages.size > 0) {
      const xml = generateSitemapXML(filteredPages, baseUrl, true);
      await fs.writeFile(path.join(publicDir, name), xml);
      console.log(`✅ Generated ${name} with ${entryCount} URLs`);
    }
  }

  // Generate sitemap index
  const sitemapIndex = generateSitemapIndex(baseUrl);
  await fs.writeFile(path.join(publicDir, 'sitemap.xml'), sitemapIndex);
  console.log('✅ Generated sitemap index');

  // Generate comprehensive report
  const report = {
    generated: new Date().toISOString(),
    statistics: {
      totalPages,
      englishPages: enPages,
      spanishPages: esPages,
      pairedPages,
      missingTranslations: missingTranslations.length,
    },
    categoryBreakdown: await getCategoryBreakdown(pages),
    targetGoal: 6562,
    completionPercentage: Math.round((totalPages / 6562) * 100),
  };

  await fs.writeFile(
    path.join(process.cwd(), 'sitemap-generation-report.json'),
    JSON.stringify(report, null, 2)
  );

  console.log('\n📊 Final Report:');
  console.log(`   Target: 6,562 pages (3,281 EN + 3,281 ES)`);
  console.log(`   Generated: ${totalPages} pages (${enPages} EN + ${esPages} ES)`);
  console.log(`   Completion: ${report.completionPercentage}%`);

  if (totalPages < 6562) {
    console.log(`\n⚠️  Missing ${6562 - totalPages} pages from target`);
  } else if (totalPages === 6562) {
    console.log('\n✅ Target reached! All 6,562 pages included in sitemaps');
  } else {
    console.log(`\n⚠️  Generated ${totalPages - 6562} more pages than target`);
  }

  console.log('\n✨ Sitemap generation complete!');
  console.log('📄 Detailed report saved to sitemap-generation-report.json');
}

function getChangeFrequency(path: string): PageInfo['changefreq'] {
  if (path === '/' || path === '/es') return 'daily';
  if (path.includes('/blog')) return 'weekly';
  if (path.includes('/news')) return 'daily';
  if (path.includes('/attorneys') || path.includes('/abogados')) return 'monthly';
  if (path.includes('/practice-areas') || path.includes('/areas-de-practica')) return 'monthly';
  if (path.includes('/locations') || path.includes('/ubicaciones')) return 'weekly';
  if (path.includes('/near-me') || path.includes('/cerca-de-mi')) return 'weekly';
  if (path.includes('/case-results') || path.includes('/resultados-casos')) return 'weekly';
  if (path.includes('/testimonials') || path.includes('/testimonios')) return 'weekly';
  return 'weekly';
}

function getPriority(path: string): number {
  // Homepage
  if (path === '/' || path === '/es') return 1.0;

  // Main category pages
  if (path === '/practice-areas' || path === '/es/areas-de-practica') return 0.95;
  if (path === '/locations/nc' || path === '/es/ubicaciones/nc') return 0.95;

  // Contact pages
  if (path === '/contact' || path === '/es/contacto') return 0.9;

  // Main practice area pages (direct children)
  if (path.match(/^\/practice-areas\/[^/]+$/) || path.match(/^\/es\/areas-de-practica\/[^/]+$/)) {
    return 0.9;
  }

  // Major city pages
  const majorCities = [
    'charlotte',
    'raleigh',
    'durham',
    'greensboro',
    'winston-salem',
    'asheville',
    'wilmington',
  ];
  if (path.includes('/locations/') && majorCities.some(city => path.includes(city))) {
    return 0.85;
  }

  // Location + practice area combination pages
  if (
    path.includes('/locations/') &&
    (path.includes('-lawyer') || path.includes('-attorney') || path.includes('-abogado'))
  ) {
    return 0.8;
  }

  // Sub-practice area pages
  if (
    (path.includes('/practice-areas/') || path.includes('/areas-de-practica/')) &&
    path.split('/').length > 4
  ) {
    return 0.75;
  }

  // Attorney pages
  if (path.includes('/attorneys') || path.includes('/abogados')) return 0.8;

  // About pages
  if (path.includes('/about') || path.includes('/nosotros')) return 0.7;

  // Blog and resources
  if (path.includes('/blog')) return 0.7;
  if (path.includes('/resources') || path.includes('/recursos')) return 0.6;
  if (path.includes('/faq') || path.includes('/preguntas')) return 0.65;

  // Near-me pages
  if (path.includes('/near-me') || path.includes('/cerca-de-mi')) return 0.7;

  // Other city pages
  if (path.includes('/locations/') || path.includes('/ubicaciones/')) return 0.7;

  // Default
  return 0.6;
}

async function addDynamicPages(pages: Map<string, PagePair>, lastmod: string) {
  // Add attorney pages
  const attorneys = [
    'william-vasquez',
    'adrianna-ingram',
    'christopher-afanador',
    'jillian-baucom',
    'mark-kelsey',
    'roselyn-v-torrellas',
    'judith-parkes',
  ];

  attorneys.forEach(attorney => {
    pages.set(`/attorneys/${attorney}`, {
      en: {
        path: `/attorneys/${attorney}`,
        language: 'en',
        lastmod,
        changefreq: 'monthly',
        priority: 0.7,
      },
      es: {
        path: `/es/abogados/${attorney}`,
        language: 'es',
        lastmod,
        changefreq: 'monthly',
        priority: 0.7,
      },
    });
  });

  // Add more comprehensive blog posts
  const blogPosts = [
    'immigration-law-changes-2025',
    'personal-injury-claim-guide',
    'workers-compensation-rights',
    'family-law-updates',
    'criminal-defense-tips',
    'dui-consequences-north-carolina',
    'green-card-process-explained',
    'car-accident-settlement-timeline',
    'divorce-mediation-benefits',
    'citizenship-test-preparation',
    'workplace-injury-reporting',
    'traffic-ticket-defense-strategies',
    'asylum-application-process',
    'motorcycle-accident-liability',
    'child-custody-factors',
    'deportation-defense-options',
    'truck-accident-investigation',
    'domestic-violence-resources',
    'visa-application-tips',
    'slip-fall-injury-claims',
    'expungement-eligibility-guide',
    'h1b-visa-requirements',
    'medical-malpractice-basics',
    'alimony-calculation-factors',
    'drug-charge-penalties',
    'pedestrian-accident-rights',
    'immigration-court-preparation',
    'wrongful-death-claims',
    'property-division-divorce',
    'criminal-record-expungement',
    'workers-comp-denial-appeals',
    'immigration-detention-rights',
    'bicycle-accident-safety',
    'child-support-modifications',
    'theft-charge-defenses',
    'nursing-home-abuse-signs',
    'visa-overstay-consequences',
    'premises-liability-explained',
    'divorce-process-timeline',
    'assault-charge-defenses',
  ];

  blogPosts.forEach(post => {
    pages.set(`/blog/${post}`, {
      en: {
        path: `/blog/${post}`,
        language: 'en',
        lastmod,
        changefreq: 'monthly',
        priority: 0.6,
      },
      es: {
        path: `/es/blog/${post}`,
        language: 'es',
        lastmod,
        changefreq: 'monthly',
        priority: 0.6,
      },
    });
  });

  // Add case results pages
  const caseResults = [
    'million-dollar-settlement-car-accident',
    'dui-charges-dismissed',
    'green-card-approval-complex-case',
    'workers-comp-maximum-benefits',
    'custody-victory-father',
    'personal-injury-verdict-2m',
    'deportation-case-won',
    'drug-charges-reduced',
    'truck-accident-settlement-3m',
    'divorce-favorable-settlement',
    'asylum-granted-family',
    'assault-charges-dropped',
    'motorcycle-accident-recovery',
    'immigration-appeal-success',
    'medical-malpractice-settlement',
  ];

  caseResults.forEach(result => {
    pages.set(`/case-results/${result}`, {
      en: {
        path: `/case-results/${result}`,
        language: 'en',
        lastmod,
        changefreq: 'monthly',
        priority: 0.65,
      },
      es: {
        path: `/es/resultados-casos/${result}`,
        language: 'es',
        lastmod,
        changefreq: 'monthly',
        priority: 0.65,
      },
    });
  });
}

async function getCategoryBreakdown(pages: Map<string, PagePair>) {
  const breakdown: Record<string, number> = {
    static: 0,
    locations: 0,
    practiceAreas: 0,
    blog: 0,
    nearMe: 0,
    attorneys: 0,
    resources: 0,
    other: 0,
  };

  pages.forEach(pair => {
    [pair.en, pair.es].forEach(page => {
      if (!page) return;

      if (page.path.includes('/locations') || page.path.includes('/ubicaciones')) {
        breakdown.locations++;
      } else if (
        page.path.includes('/practice-areas') ||
        page.path.includes('/areas-de-practica')
      ) {
        breakdown.practiceAreas++;
      } else if (page.path.includes('/blog')) {
        breakdown.blog++;
      } else if (page.path.includes('/near-me') || page.path.includes('/cerca-de-mi')) {
        breakdown.nearMe++;
      } else if (page.path.includes('/attorneys') || page.path.includes('/abogados')) {
        breakdown.attorneys++;
      } else if (
        page.path.includes('/resources') ||
        page.path.includes('/recursos') ||
        page.path.includes('/faq') ||
        page.path.includes('/preguntas')
      ) {
        breakdown.resources++;
      } else if (
        page.path === '/' ||
        page.path === '/es' ||
        page.path.includes('/contact') ||
        page.path.includes('/contacto') ||
        page.path.includes('/about') ||
        page.path.includes('/nosotros')
      ) {
        breakdown.static++;
      } else {
        breakdown.other++;
      }
    });
  });

  return breakdown;
}

function generateSitemapXML(
  pages: Map<string, PagePair>,
  baseUrl: string,
  includeAlternates: boolean = false
): string {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';

  if (includeAlternates) {
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n';
    xml += '        xmlns:xhtml="http://www.w3.org/1999/xhtml">\n';
  } else {
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  }

  pages.forEach(pair => {
    // Add English page
    if (pair.en) {
      xml += '  <url>\n';
      xml += `    <loc>${baseUrl}${pair.en.path}</loc>\n`;
      xml += `    <lastmod>${pair.en.lastmod}</lastmod>\n`;
      xml += `    <changefreq>${pair.en.changefreq}</changefreq>\n`;
      xml += `    <priority>${pair.en.priority}</priority>\n`;

      // Add hreflang alternates if Spanish version exists
      if (includeAlternates && pair.es) {
        xml += `    <xhtml:link rel="alternate" hreflang="es" href="${baseUrl}${pair.es.path}"/>\n`;
        xml += `    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}${pair.en.path}"/>\n`;
        xml += `    <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}${pair.en.path}"/>\n`;
      }

      xml += '  </url>\n';
    }

    // Add Spanish page if no English equivalent
    if (pair.es && !pair.en) {
      xml += '  <url>\n';
      xml += `    <loc>${baseUrl}${pair.es.path}</loc>\n`;
      xml += `    <lastmod>${pair.es.lastmod}</lastmod>\n`;
      xml += `    <changefreq>${pair.es.changefreq}</changefreq>\n`;
      xml += `    <priority>${pair.es.priority}</priority>\n`;
      xml += '  </url>\n';
    }
  });

  xml += '</urlset>';
  return xml;
}

function generateLanguageSitemap(
  pages: Map<string, PagePair>,
  language: 'en' | 'es',
  baseUrl: string
): string {
  const filteredPages = new Map<string, PagePair>();
  pages.forEach((pair, normalizedPath) => {
    if (pair[language]) {
      filteredPages.set(normalizedPath, { [language]: pair[language] });
    }
  });

  return generateSitemapXML(filteredPages, baseUrl, false);
}

function generateSitemapIndex(baseUrl: string): string {
  const now = new Date().toISOString();

  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${baseUrl}/sitemap-complete.xml</loc>
    <lastmod>${now}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}/sitemap-locations.xml</loc>
    <lastmod>${now}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}/sitemap-practice-areas.xml</loc>
    <lastmod>${now}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}/sitemap-blog.xml</loc>
    <lastmod>${now}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}/sitemap-near-me.xml</loc>
    <lastmod>${now}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}/sitemap-attorneys.xml</loc>
    <lastmod>${now}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}/sitemap-en.xml</loc>
    <lastmod>${now}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}/sitemap-es.xml</loc>
    <lastmod>${now}</lastmod>
  </sitemap>
</sitemapindex>`;
}

// Run the generator
generateCompleteSitemaps().catch(console.error);
