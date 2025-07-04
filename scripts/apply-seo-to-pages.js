const fs = require('fs').promises;
const path = require('path');

class SEOPageUpdater {
  constructor() {
    this.optimizedContentDir = path.join(__dirname, '../content-optimized');
    this.pagesDir = path.join(__dirname, '../src/app');
    this.componentsDir = path.join(__dirname, '../src/components');
  }

  async applyAllSEO() {
    console.log('Applying SEO optimizations to Next.js pages...\n');

    try {
      // Read optimized content
      const optimizedFiles = await this.getOptimizedContent();

      // Update homepage
      await this.updateHomepage(optimizedFiles['homepage.json']);

      // Update practice area pages
      await this.updatePracticeAreaPages(optimizedFiles);

      // Update attorney pages
      await this.updateAttorneyPages(optimizedFiles);

      // Update location pages
      await this.updateLocationPages(optimizedFiles);

      // Create SEO component
      await this.createSEOComponent();

      // Update layout with global SEO
      await this.updateRootLayout();

      // Generate dynamic sitemap
      await this.generateDynamicSitemap(optimizedFiles);

      // Generate robots.txt
      await this.generateRobotsTxt();

      console.log('\n✅ SEO Applied Successfully!');
      console.log('\nNext steps:');
      console.log('1. Run npm run build to see the changes');
      console.log('2. Test the site with Google PageSpeed Insights');
      console.log('3. Submit sitemap to Google Search Console');
      console.log('4. Monitor search rankings');
    } catch (error) {
      console.error('Error applying SEO:', error);
    }
  }

  async getOptimizedContent() {
    const files = {};
    const allFiles = await this.getAllJsonFiles(this.optimizedContentDir);

    for (const file of allFiles) {
      const content = await fs.readFile(file, 'utf-8');
      const relativePath = path.relative(this.optimizedContentDir, file);
      files[relativePath] = JSON.parse(content);
    }

    return files;
  }

  async getAllJsonFiles(dir, files = []) {
    const items = await fs.readdir(dir);

    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = await fs.stat(fullPath);

      if (stat.isDirectory()) {
        await this.getAllJsonFiles(fullPath, files);
      } else if (item.endsWith('.json')) {
        files.push(fullPath);
      }
    }

    return files;
  }

  async updateHomepage(optimizedData) {
    if (!optimizedData) return;

    const homepagePath = path.join(this.pagesDir, 'page.tsx');
    let content = await fs.readFile(homepagePath, 'utf-8');

    // Create metadata export
    const metadata = `
export const metadata: Metadata = {
  title: '${optimizedData.seo.title}',
  description: '${optimizedData.seo.metaDescription}',
  keywords: '${optimizedData.seo.keywords}',
  openGraph: {
    title: '${optimizedData.seo.og.title}',
    description: '${optimizedData.seo.og.description}',
    type: 'website',
    locale: 'en_US',
    url: 'https://vasquezlawnc.com',
    siteName: 'Vasquez Law Firm',
    images: [
      {
        url: 'https://vasquezlawnc.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Vasquez Law Firm - Immigration, Personal Injury & Criminal Defense'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: '${optimizedData.seo.twitter.title || optimizedData.seo.title}',
    description: '${optimizedData.seo.metaDescription}',
    site: '@VasquezLawFirm',
    creator: '@VasquezLawFirm'
  },
  alternates: {
    canonical: 'https://vasquezlawnc.com',
    languages: {
      'en-US': 'https://vasquezlawnc.com',
      'es-US': 'https://vasquezlawnc.com/es'
    }
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  }
};`;

    // Add or update metadata
    if (!content.includes('export const metadata')) {
      // Add import if needed
      if (!content.includes('import type { Metadata }')) {
        content = `import type { Metadata } from 'next';\n${content}`;
      }

      // Insert metadata after imports
      const importEndIndex = content.lastIndexOf('import');
      const nextLineIndex = content.indexOf('\n', importEndIndex);
      content =
        content.slice(0, nextLineIndex + 1) +
        '\n' +
        metadata +
        '\n' +
        content.slice(nextLineIndex + 1);
    } else {
      // Replace existing metadata
      const metadataStart = content.indexOf('export const metadata');
      const metadataEnd = content.indexOf('};', metadataStart) + 2;
      content = content.slice(0, metadataStart) + metadata + content.slice(metadataEnd);
    }

    // Add structured data component
    if (!content.includes('StructuredData')) {
      const structuredDataImport = `import { StructuredData } from '@/components/SEO/StructuredData';\n`;
      content = structuredDataImport + content;

      // Add to return statement
      const returnIndex = content.indexOf('return (');
      const afterReturn = content.indexOf('\n', returnIndex);
      const structuredDataComponent = `      <StructuredData data={${JSON.stringify(optimizedData.structuredData, null, 2)}} />\n`;
      content =
        content.slice(0, afterReturn + 1) +
        structuredDataComponent +
        content.slice(afterReturn + 1);
    }

    await fs.writeFile(homepagePath, content);
    console.log('✓ Updated homepage SEO');
  }

  async updatePracticeAreaPages(optimizedFiles) {
    const practiceAreas = [
      { path: 'immigration', file: 'pages/immigration.json' },
      { path: 'personal-injury', file: 'pages/personal-injury.json' },
      { path: 'criminal-defense', file: 'pages/criminal-defense.json' },
      { path: 'family-law', file: 'pages/family-law.json' },
      { path: 'workers-compensation', file: 'pages/workers-compensation-job-injury.json' },
    ];

    for (const area of practiceAreas) {
      const optimizedData = optimizedFiles[area.file];
      if (!optimizedData) continue;

      const pagePath = path.join(this.pagesDir, area.path, 'page.tsx');

      try {
        let content = await fs.readFile(pagePath, 'utf-8');

        // Update metadata
        const metadata = this.generateMetadata(optimizedData);
        content = this.updatePageMetadata(content, metadata);

        await fs.writeFile(pagePath, content);
        console.log(`✓ Updated ${area.path} page SEO`);
      } catch (error) {
        console.log(`⚠ Skipping ${area.path} - file not found`);
      }
    }
  }

  async updateAttorneyPages(optimizedFiles) {
    const attorneyFiles = Object.entries(optimizedFiles)
      .filter(([key]) => key.includes('attorney'))
      .filter(([key, data]) => data.seo);

    for (const [filename, data] of attorneyFiles) {
      // Extract attorney name from filename
      const nameMatch = filename.match(/attorneys?-(.+)\.json/);
      if (!nameMatch) continue;

      const attorneySlug = nameMatch[1];
      const pagePath = path.join(this.pagesDir, 'attorneys', attorneySlug, 'page.tsx');

      try {
        let content = await fs.readFile(pagePath, 'utf-8');

        const metadata = this.generateMetadata(data);
        content = this.updatePageMetadata(content, metadata);

        await fs.writeFile(pagePath, content);
        console.log(`✓ Updated attorney page: ${attorneySlug}`);
      } catch (error) {
        // Try alternative path
        const altPath = path.join(
          this.pagesDir,
          'attorneys',
          `${attorneySlug.replace('-', '-')}/page.tsx`
        );
        try {
          let content = await fs.readFile(altPath, 'utf-8');
          const metadata = this.generateMetadata(data);
          content = this.updatePageMetadata(content, metadata);
          await fs.writeFile(altPath, content);
          console.log(`✓ Updated attorney page: ${attorneySlug}`);
        } catch {
          console.log(`⚠ Attorney page not found: ${attorneySlug}`);
        }
      }
    }
  }

  async updateLocationPages(optimizedFiles) {
    const locations = [
      'charlotte-nc',
      'raleigh-nc',
      'durham-nc',
      'smithfield-nc',
      'winston-salem',
      'orlando-fl',
    ];

    for (const location of locations) {
      const data = optimizedFiles[`pages/${location}.json`];
      if (!data) continue;

      const pagePath = path.join(this.pagesDir, location, 'page.tsx');

      try {
        let content = await fs.readFile(pagePath, 'utf-8');

        const metadata = this.generateMetadata(data);
        content = this.updatePageMetadata(content, metadata);

        await fs.writeFile(pagePath, content);
        console.log(`✓ Updated location page: ${location}`);
      } catch (error) {
        console.log(`⚠ Location page not found: ${location}`);
      }
    }
  }

  generateMetadata(data) {
    return `export const metadata: Metadata = {
  title: '${this.escapeQuotes(data.seo.title)}',
  description: '${this.escapeQuotes(data.seo.metaDescription)}',
  keywords: '${data.seo.keywords}',
  openGraph: {
    title: '${this.escapeQuotes(data.seo.og.title)}',
    description: '${this.escapeQuotes(data.seo.og.description)}',
    type: 'website',
    locale: '${data.seo.og.locale || 'en_US'}',
    siteName: 'Vasquez Law Firm'
  },
  twitter: {
    card: 'summary_large_image',
    title: '${this.escapeQuotes(data.seo.og.title)}',
    description: '${this.escapeQuotes(data.seo.metaDescription)}'
  },
  alternates: {
    canonical: '${data.seo.canonical}'
  }
};`;
  }

  escapeQuotes(str) {
    return str.replace(/'/g, "\\'").replace(/"/g, '\\"');
  }

  updatePageMetadata(content, metadata) {
    // Add import if needed
    if (!content.includes('import type { Metadata }')) {
      content = `import type { Metadata } from 'next';\n${content}`;
    }

    // Update or add metadata
    if (content.includes('export const metadata')) {
      const start = content.indexOf('export const metadata');
      const end = content.indexOf('};', start) + 2;
      content = content.slice(0, start) + metadata + content.slice(end);
    } else {
      const importEnd = content.lastIndexOf('import');
      const nextLine = content.indexOf('\n', importEnd);
      content =
        content.slice(0, nextLine + 1) + '\n' + metadata + '\n' + content.slice(nextLine + 1);
    }

    return content;
  }

  async createSEOComponent() {
    const seoDir = path.join(this.componentsDir, 'SEO');
    await fs.mkdir(seoDir, { recursive: true });

    // Create StructuredData component
    const structuredDataComponent = `import React from 'react';
import Script from 'next/script';

interface StructuredDataProps {
  data: any;
}

export function StructuredData({ data }: StructuredDataProps) {
  return (
    <Script
      id="structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data)
      }}
      strategy="afterInteractive"
    />
  );
}`;

    await fs.writeFile(path.join(seoDir, 'StructuredData.tsx'), structuredDataComponent);

    // Create SEO utilities
    const seoUtils = `export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: 'Vasquez Law Firm',
    alternateName: 'Vasquez Law Firm, PLLC',
    url: 'https://vasquezlawnc.com',
    logo: 'https://vasquezlawnc.com/logo.png',
    telephone: '+1-844-967-3536',
    email: 'info@vasquezlawnc.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '4801 E Independence Blvd Suite 714',
      addressLocality: 'Charlotte',
      addressRegion: 'NC',
      postalCode: '28212',
      addressCountry: 'US'
    },
    sameAs: [
      'https://www.facebook.com/vasquezlawfirm',
      'https://www.linkedin.com/company/vasquez-law-firm',
      'https://www.youtube.com/@vasquezlawfirm'
    ],
    areaServed: ['North Carolina', 'South Carolina', 'Florida'],
    priceRange: '$$'
  };
}

export function generateBreadcrumbSchema(items: Array<{name: string, url: string}>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };
}

export function generateFAQSchema(faqs: Array<{question: string, answer: string}>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
}

export function generateLocalBusinessSchema(location: {
  name: string,
  address: string,
  city: string,
  state: string,
  zip: string,
  phone: string,
  lat?: number,
  lng?: number
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Attorney',
    name: 'Vasquez Law Firm - ' + location.name,
    address: {
      '@type': 'PostalAddress',
      streetAddress: location.address,
      addressLocality: location.city,
      addressRegion: location.state,
      postalCode: location.zip
    },
    telephone: location.phone,
    geo: location.lat && location.lng ? {
      '@type': 'GeoCoordinates',
      latitude: location.lat,
      longitude: location.lng
    } : undefined
  };
}`;

    await fs.writeFile(path.join(seoDir, 'schemas.ts'), seoUtils);

    console.log('✓ Created SEO components');
  }

  async updateRootLayout() {
    const layoutPath = path.join(this.pagesDir, 'layout.tsx');
    let content = await fs.readFile(layoutPath, 'utf-8');

    // Add global structured data
    if (!content.includes('StructuredData')) {
      // Add import
      const structuredImport = `import { StructuredData } from '@/components/SEO/StructuredData';\nimport { generateOrganizationSchema } from '@/components/SEO/schemas';\n`;
      content = structuredImport + content;

      // Add to body
      const bodyIndex = content.indexOf('<body');
      const bodyEnd = content.indexOf('>', bodyIndex);
      const structuredComponent = `\n        <StructuredData data={generateOrganizationSchema()} />`;
      content = content.slice(0, bodyEnd + 1) + structuredComponent + content.slice(bodyEnd + 1);
    }

    await fs.writeFile(layoutPath, content);
    console.log('✓ Updated root layout with global SEO');
  }

  async generateDynamicSitemap(optimizedFiles) {
    const sitemapPath = path.join(this.pagesDir, 'sitemap.ts');

    const sitemap = `import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://vasquezlawnc.com';
  
  // Static pages
  const staticPages = [
    '',
    '/attorneys',
    '/practice-areas',
    '/immigration',
    '/personal-injury',
    '/criminal-defense',
    '/family-law',
    '/workers-compensation',
    '/contact',
    '/blog',
    '/about',
    '/testimonials',
    '/es',
    '/es/areas-de-practica',
    '/es/contacto'
  ];
  
  // Attorney pages
  const attorneyPages = [
    '/attorneys/william-vasquez',
    '/attorneys/adrianna-ingram',
    '/attorneys/christopher-afanador',
    '/attorneys/jillian-baucom',
    '/attorneys/mark-kelsey',
    '/attorneys/roselyn-v-torrellas',
    '/attorneys/judith-parkes'
  ];
  
  // Location pages
  const locationPages = [
    '/charlotte-nc',
    '/raleigh-nc',
    '/durham-nc',
    '/winston-salem',
    '/smithfield-nc',
    '/orlando-fl'
  ];
  
  // Practice area sub-pages
  const practiceAreaPages = [
    '/immigration/green-cards',
    '/immigration/citizenship-naturalization',
    '/immigration/deportation-removal-defense',
    '/immigration/asylum-refugee-legal-help',
    '/immigration/family-based-relative',
    '/immigration/employment-based-immigration',
    '/immigration/daca-deferred-action-childhood-arrivals',
    '/immigration/fiance-k-visas',
    '/immigration/vawa-u-visa-crime-victims',
    '/personal-injury/car-auto-accidents',
    '/personal-injury/truck-accidents',
    '/personal-injury/motorcycle-accidents',
    '/personal-injury/pedestrian-hit-by-car',
    '/personal-injury/premises-liability',
    '/personal-injury/drunk-driver-liability',
    '/criminal-defense/dwi-drunk-driving',
    '/criminal-defense/drug-crime-cases',
    '/criminal-defense/traffic-offenses-tickets',
    '/criminal-defense/domestic-violence-abuse',
    '/criminal-defense/expungement-expunction',
    '/family-law/divorce',
    '/family-law/child-custody',
    '/family-law/alimony-spousal-support',
    '/family-law/equitable-distribution-property-debt-division',
    '/workers-compensation/construction-site-injuries',
    '/workers-compensation/repetitive-stress-carpal-tunnel',
    '/workers-compensation/third-party-injury-claims'
  ];
  
  const allPages = [
    ...staticPages,
    ...attorneyPages,
    ...locationPages,
    ...practiceAreaPages
  ];
  
  return allPages.map(page => ({
    url: \`\${baseUrl}\${page}\`,
    lastModified: new Date(),
    changeFrequency: page === '' || page.includes('blog') ? 'daily' : 'weekly',
    priority: page === '' ? 1.0 : 
             page.includes('practice-areas') || page.includes('immigration') ? 0.9 :
             page.includes('attorneys') || page.includes('contact') ? 0.8 :
             page.includes('blog') ? 0.7 : 0.6
  }));
}`;

    await fs.writeFile(sitemapPath, sitemap);
    console.log('✓ Generated dynamic sitemap');
  }

  async generateRobotsTxt() {
    const robotsPath = path.join(this.pagesDir, 'api', 'robots', 'route.ts');
    await fs.mkdir(path.dirname(robotsPath), { recursive: true });

    const robots = `export async function GET() {
  const robotsTxt = \`# Vasquez Law Firm Robots.txt
User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/
Disallow: /_next/
Disallow: /private/

# Sitemaps
Sitemap: https://vasquezlawnc.com/sitemap.xml

# Crawl-delay
Crawl-delay: 1

# Specific bot rules
User-agent: Googlebot
Allow: /

User-agent: Bingbot  
Allow: /

User-agent: Slurp
Allow: /

User-agent: DuckDuckBot
Allow: /\`;

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}`;

    await fs.writeFile(robotsPath, robots);
    console.log('✓ Generated robots.txt endpoint');
  }
}

// Run the updater
async function main() {
  const updater = new SEOPageUpdater();
  await updater.applyAllSEO();
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = { SEOPageUpdater };
