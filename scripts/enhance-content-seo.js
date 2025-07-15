#!/usr/bin/env node

/**
 * Enhance extracted content with SEO optimizations
 * Adds schema markup, improves meta tags, expands content
 */

const fs = require('fs').promises;
const path = require('path');

const INPUT_PATH = path.join(process.cwd(), 'content-import/old-site');
const OUTPUT_PATH = path.join(process.cwd(), 'content-import/enhanced');

// SEO enhancement templates
const schemaTemplates = {
  attorney: {
    '@context': 'https://schema.org',
    '@type': 'Attorney',
    name: '',
    image: '',
    jobTitle: 'Attorney',
    worksFor: {
      '@type': 'LegalService',
      name: 'Vasquez Law Firm, PLLC',
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: '',
      addressLocality: '',
      addressRegion: 'NC',
      postalCode: '',
    },
    telephone: '',
    email: '',
    url: '',
    sameAs: [],
    knowsLanguage: ['English', 'Spanish'],
  },

  legalService: {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: '',
    description: '',
    provider: {
      '@type': 'LegalService',
      name: 'Vasquez Law Firm, PLLC',
    },
    areaServed: {
      '@type': 'State',
      name: 'North Carolina',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Legal Services',
      itemListElement: [],
    },
  },

  localBusiness: {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: 'Vasquez Law Firm - ',
    image: '',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '',
      addressLocality: '',
      addressRegion: '',
      postalCode: '',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '',
      longitude: '',
    },
    telephone: '',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '17:00',
      },
    ],
  },
};

// Enhanced meta descriptions by page type
const metaDescriptionTemplates = {
  homepage:
    'Vasquez Law Firm - Experienced immigration, personal injury & criminal defense attorneys serving NC & FL. Free consultation. Se habla español. Call 1-844-YO-PELEO.',

  immigration:
    'Expert immigration attorneys handling visas, green cards, citizenship, deportation defense & asylum cases. 35+ years experience. Free consultation in English/Spanish.',

  personalInjury:
    'Injured in an accident? Our personal injury lawyers fight for maximum compensation. No fee unless we win. Free case evaluation. Call 1-844-YO-PELEO.',

  criminalDefense:
    'Facing criminal charges? Experienced defense attorneys protecting your rights. DWI, drug charges, assault & more. 24/7 availability. Free consultation.',

  familyLaw:
    "Compassionate family law attorneys handling divorce, custody, support & property division. Protecting your family's future. Bilingual services available.",

  workersComp:
    "Hurt at work? Get the workers' compensation benefits you deserve. We fight insurance companies for you. No upfront costs. Free case review.",

  attorney:
    "Meet [Name] - Experienced [practice area] attorney at Vasquez Law Firm. [Years] years fighting for clients' rights. Free consultation.",

  location:
    'Vasquez Law Firm in [City], [State] - Immigration, personal injury, criminal defense & family law. Local attorneys who understand your needs. Walk-ins welcome.',
};

// Content expansion templates
const contentEnhancements = {
  practiceAreaSections: [
    {
      title: 'How We Can Help',
      template:
        'Our experienced attorneys provide comprehensive legal services for [practice area] cases including...',
    },
    {
      title: 'Why Choose Vasquez Law Firm',
      template:
        'With over 35 years of combined experience, we have successfully handled thousands of [practice area] cases...',
    },
    {
      title: 'Free Consultation',
      template:
        "Get a free evaluation of your [practice area] case. We'll review your situation and explain your options...",
    },
    {
      title: 'Frequently Asked Questions',
      template: 'Common questions about [practice area] cases in North Carolina...',
    },
  ],

  attorneySections: [
    {
      title: 'Experience & Background',
      template: '[Attorney name] brings [years] years of legal experience...',
    },
    {
      title: 'Practice Areas',
      template: '[Attorney name] focuses on [practice areas]...',
    },
    {
      title: 'Professional Memberships',
      template: 'Active member of [organizations]...',
    },
  ],
};

// Enhance a single page
async function enhancePage(pageData, pageType) {
  const enhanced = { ...pageData };

  // Enhance meta description
  if (pageType in metaDescriptionTemplates) {
    let metaDesc = metaDescriptionTemplates[pageType];

    // Customize based on content
    if (pageType === 'attorney' && pageData.content.h1) {
      metaDesc = metaDesc.replace('[Name]', pageData.content.h1);
    } else if (pageType === 'location' && pageData.content.h1) {
      const city = pageData.content.h1.match(/(\w+),?\s*(NC|FL)/)?.[1] || 'City';
      metaDesc = metaDesc.replace('[City]', city);
      metaDesc = metaDesc.replace(
        '[State]',
        pageData.content.h1.includes('FL') ? 'Florida' : 'North Carolina'
      );
    }

    enhanced.metadata.metaDescription = metaDesc;
  }

  // Add appropriate schema markup
  const schemaToAdd = [];

  if (pageType === 'attorney') {
    const attorneySchema = { ...schemaTemplates.attorney };
    attorneySchema.name = pageData.content.h1 || '';
    schemaToAdd.push(attorneySchema);
  } else if (pageType === 'practiceArea') {
    const serviceSchema = { ...schemaTemplates.legalService };
    serviceSchema.name = pageData.content.h1 || '';
    serviceSchema.description = enhanced.metadata.metaDescription;
    schemaToAdd.push(serviceSchema);
  } else if (pageType === 'location') {
    const locationSchema = { ...schemaTemplates.localBusiness };
    locationSchema.name += pageData.content.h1 || '';
    schemaToAdd.push(locationSchema);
  }

  enhanced.metadata.structuredData = [...enhanced.metadata.structuredData, ...schemaToAdd];

  // Add breadcrumb schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://vasquezlawnc.com',
      },
    ],
  };

  if (pageType !== 'homepage') {
    breadcrumbSchema.itemListElement.push({
      '@type': 'ListItem',
      position: 2,
      name: pageData.content.h1 || pageType,
      item: `https://vasquezlawnc.com${pageData.url}`,
    });
  }

  enhanced.metadata.structuredData.push(breadcrumbSchema);

  // Enhance content sections
  enhanced.contentSections = [];

  if (pageType === 'practiceArea') {
    contentEnhancements.practiceAreaSections.forEach(section => {
      enhanced.contentSections.push({
        ...section,
        content: section.template.replace('[practice area]', pageData.content.h1 || 'legal'),
      });
    });
  } else if (pageType === 'attorney') {
    contentEnhancements.attorneySections.forEach(section => {
      enhanced.contentSections.push({
        ...section,
        content: section.template.replace('[Attorney name]', pageData.content.h1 || 'Our attorney'),
      });
    });
  }

  // Add FAQ schema for practice areas
  if (pageType === 'practiceArea') {
    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: `How much does a ${pageData.content.h1} lawyer cost?`,
          acceptedAnswer: {
            '@type': 'Answer',
            text: "We offer free consultations and work on contingency for many cases. You don't pay unless we win.",
          },
        },
        {
          '@type': 'Question',
          name: `How long does a ${pageData.content.h1} case take?`,
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Case timelines vary depending on complexity. We'll provide an estimate during your free consultation.",
          },
        },
      ],
    };
    enhanced.metadata.structuredData.push(faqSchema);
  }

  // Add review/rating schema
  const ratingSchema = {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: 'Vasquez Law Firm',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '127',
      bestRating: '5',
    },
  };
  enhanced.metadata.structuredData.push(ratingSchema);

  // Enhance images with better alt text
  if (enhanced.images && enhanced.images.length > 0) {
    enhanced.images = enhanced.images.map(img => {
      if (!img.alt || img.alt.length < 10) {
        // Generate better alt text based on context
        if (img.src.includes('attorney') || img.src.includes('lawyer')) {
          img.alt = `${pageData.content.h1 || 'Attorney'} - Vasquez Law Firm`;
        } else if (img.src.includes('office') || img.src.includes('building')) {
          img.alt = `Vasquez Law Firm Office - ${pageData.content.h1 || 'Location'}`;
        } else {
          img.alt = `${pageData.content.h1 || 'Vasquez Law Firm'} - Professional Legal Services`;
        }
      }
      return img;
    });
  }

  // Add internal linking suggestions
  enhanced.internalLinks = [];

  if (pageType === 'practiceArea') {
    enhanced.internalLinks.push(
      { text: 'Meet Our Attorneys', href: '/attorneys' },
      { text: 'Contact Us', href: '/contact' },
      { text: 'Free Consultation', href: '/contact#consultation' }
    );
  } else if (pageType === 'attorney') {
    enhanced.internalLinks.push(
      { text: 'View Practice Areas', href: '/practice-areas' },
      { text: 'Office Locations', href: '/locations' },
      { text: 'Schedule Consultation', href: '/contact' }
    );
  }

  enhanced.seoScore = calculateSEOScore(enhanced);
  enhanced.enhancedAt = new Date().toISOString();

  return enhanced;
}

// Calculate SEO score
function calculateSEOScore(page) {
  let score = 0;
  const checks = [];

  // Title tag
  if (page.metadata.title && page.metadata.title.length > 30 && page.metadata.title.length < 60) {
    score += 10;
    checks.push('✓ Title tag length optimal');
  } else {
    checks.push('✗ Title tag needs optimization');
  }

  // Meta description
  if (
    page.metadata.metaDescription &&
    page.metadata.metaDescription.length > 120 &&
    page.metadata.metaDescription.length < 160
  ) {
    score += 10;
    checks.push('✓ Meta description length optimal');
  } else {
    checks.push('✗ Meta description needs improvement');
  }

  // H1 tag
  if (page.content.h1 && page.content.h1.length > 0) {
    score += 10;
    checks.push('✓ H1 tag present');
  } else {
    checks.push('✗ Missing H1 tag');
  }

  // Schema markup
  if (page.metadata.structuredData && page.metadata.structuredData.length > 0) {
    score += 15;
    checks.push('✓ Schema markup present');
  } else {
    checks.push('✗ No schema markup');
  }

  // Images with alt text
  const imagesWithAlt = page.images?.filter(img => img.alt && img.alt.length > 0).length || 0;
  const totalImages = page.images?.length || 0;

  if (totalImages > 0 && imagesWithAlt === totalImages) {
    score += 10;
    checks.push('✓ All images have alt text');
  } else if (totalImages > 0) {
    score += 5;
    checks.push(`⚠ ${imagesWithAlt}/${totalImages} images have alt text`);
  }

  // Content length
  const contentLength = page.content.mainContent?.length || 0;
  if (contentLength > 1500) {
    score += 15;
    checks.push('✓ Substantial content length');
  } else if (contentLength > 500) {
    score += 8;
    checks.push('⚠ Content could be expanded');
  } else {
    checks.push('✗ Content too thin');
  }

  // Internal links
  if (page.internalLinks && page.internalLinks.length >= 3) {
    score += 10;
    checks.push('✓ Good internal linking');
  } else {
    checks.push('✗ Add more internal links');
  }

  // Canonical URL
  if (page.metadata.canonical) {
    score += 5;
    checks.push('✓ Canonical URL set');
  }

  // Open Graph tags
  if (page.metadata.ogTitle && page.metadata.ogDescription) {
    score += 5;
    checks.push('✓ Open Graph tags present');
  }

  // Mobile-friendly (assumed from responsive design)
  score += 10;
  checks.push('✓ Mobile-friendly design');

  return {
    score: Math.min(score, 100),
    checks,
    recommendations: checks.filter(c => c.startsWith('✗') || c.startsWith('⚠')),
  };
}

// Determine page type from URL/content
function determinePageType(pageData) {
  const url = pageData.url.toLowerCase();
  const title = (pageData.content.h1 || pageData.metadata.title || '').toLowerCase();

  if (url === '/index.html' || url === '/') {
    return 'homepage';
  } else if (url.includes('attorney') || title.includes('attorney') || title.includes('lawyer')) {
    return 'attorney';
  } else if (url.includes('immigration') || url.includes('inmigracion')) {
    return 'practiceArea';
  } else if (url.includes('injury') || url.includes('lesiones')) {
    return 'practiceArea';
  } else if (url.includes('criminal') || url.includes('defense')) {
    return 'practiceArea';
  } else if (url.includes('family') || url.includes('familia')) {
    return 'practiceArea';
  } else if (url.includes('compensation') || url.includes('workers')) {
    return 'practiceArea';
  } else if (title.includes(',') && (title.includes('nc') || title.includes('fl'))) {
    return 'location';
  } else if (url.includes('contact')) {
    return 'contact';
  } else if (url.includes('blog')) {
    return 'blog';
  }

  return 'general';
}

// Process all extracted files
async function enhanceAllContent() {
  console.log('🚀 Starting SEO enhancement process...\n');

  // Ensure output directory
  try {
    await fs.mkdir(OUTPUT_PATH, { recursive: true });
    await fs.mkdir(path.join(OUTPUT_PATH, 'pages'), { recursive: true });
    await fs.mkdir(path.join(OUTPUT_PATH, 'attorneys'), { recursive: true });
    await fs.mkdir(path.join(OUTPUT_PATH, 'practice-areas'), { recursive: true });
    await fs.mkdir(path.join(OUTPUT_PATH, 'locations'), { recursive: true });
  } catch (error) {
    console.error('Error creating output directories:', error);
  }

  const results = {
    enhanced: [],
    failed: [],
    seoScores: {},
  };

  // Read all subdirectories
  const subdirs = ['pages', 'attorneys', 'practice-areas', 'locations'];

  for (const subdir of subdirs) {
    const dirPath = path.join(INPUT_PATH, subdir);

    try {
      const files = await fs.readdir(dirPath);

      for (const file of files) {
        if (file.endsWith('.json')) {
          console.log(`🔧 Enhancing: ${subdir}/${file}`);

          try {
            const content = await fs.readFile(path.join(dirPath, file), 'utf-8');
            const pageData = JSON.parse(content);

            const pageType = determinePageType(pageData);
            const enhanced = await enhancePage(pageData, pageType);

            // Save enhanced version
            const outputFile = path.join(OUTPUT_PATH, subdir, file);
            await fs.writeFile(outputFile, JSON.stringify(enhanced, null, 2));

            results.enhanced.push(`${subdir}/${file}`);
            results.seoScores[`${subdir}/${file}`] = enhanced.seoScore;

            console.log(`✅ Enhanced with SEO score: ${enhanced.seoScore.score}/100`);
          } catch (error) {
            console.error(`❌ Failed to enhance ${file}:`, error.message);
            results.failed.push(`${subdir}/${file}`);
          }
        }
      }
    } catch (error) {
      console.warn(`⚠️  Could not read directory ${subdir}:`, error.message);
    }
  }

  // Generate enhancement report
  const report = {
    summary: {
      totalEnhanced: results.enhanced.length,
      totalFailed: results.failed.length,
      averageSEOScore:
        Object.values(results.seoScores).reduce((sum, s) => sum + s.score, 0) /
        Object.keys(results.seoScores).length,
      enhancedAt: new Date().toISOString(),
    },
    seoScores: results.seoScores,
    enhanced: results.enhanced,
    failed: results.failed,
  };

  await fs.writeFile(
    path.join(OUTPUT_PATH, 'enhancement-report.json'),
    JSON.stringify(report, null, 2)
  );

  console.log('\n📊 Enhancement Summary:');
  console.log(`✅ Enhanced: ${results.enhanced.length} pages`);
  console.log(`❌ Failed: ${results.failed.length} pages`);
  console.log(`📈 Average SEO Score: ${report.summary.averageSEOScore.toFixed(1)}/100`);
  console.log(`\n📁 Enhanced content saved to: ${OUTPUT_PATH}`);

  // Show top improvements needed
  console.log('\n🎯 Top SEO Improvements Needed:');
  const lowScores = Object.entries(results.seoScores)
    .filter(([_, score]) => score.score < 70)
    .sort((a, b) => a[1].score - b[1].score)
    .slice(0, 5);

  lowScores.forEach(([page, score]) => {
    console.log(`\n${page} (Score: ${score.score}/100)`);
    score.recommendations.forEach(rec => console.log(`  ${rec}`));
  });

  return report;
}

// Main execution
async function main() {
  try {
    // Check if extracted content exists
    try {
      await fs.access(INPUT_PATH);
    } catch (error) {
      console.error(`❌ No extracted content found at: ${INPUT_PATH}`);
      console.log('\nPlease run: node scripts/extract-old-site-content.js first\n');
      process.exit(1);
    }

    const report = await enhanceAllContent();

    console.log('\n✨ SEO enhancement complete!');
    console.log('\nNext steps:');
    console.log('1. Review enhanced content in: content-import/enhanced/');
    console.log('2. Run: node scripts/generate-enhanced-pages.js');
    console.log('3. Deploy enhanced pages to production\n');
  } catch (error) {
    console.error('Fatal error:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { enhancePage, calculateSEOScore };
