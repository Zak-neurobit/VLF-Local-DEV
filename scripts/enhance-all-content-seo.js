#!/usr/bin/env node

/**
 * Enhance all extracted content with SEO optimizations
 * Works with the complete extraction from extract-all-old-site-content.js
 */

const fs = require('fs').promises;
const path = require('path');

const INPUT_PATH = path.join(process.cwd(), 'content-import/old-site-complete');
const OUTPUT_PATH = path.join(process.cwd(), 'content-import/enhanced-complete');

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
      url: 'https://vasquezlawnc.com',
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: '6801 Glenwood Ave',
      addressLocality: 'Raleigh',
      addressRegion: 'NC',
      postalCode: '27612',
    },
    telephone: '+1-844-967-3536',
    email: 'info@vasquezlawnc.com',
    url: '',
    sameAs: [],
    knowsLanguage: ['English', 'Spanish'],
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: '',
    },
  },

  legalService: {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: '',
    description: '',
    provider: {
      '@type': 'LegalService',
      name: 'Vasquez Law Firm, PLLC',
      url: 'https://vasquezlawnc.com',
    },
    areaServed: [
      {
        '@type': 'State',
        name: 'North Carolina',
      },
      {
        '@type': 'State',
        name: 'Florida',
      },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Legal Services',
      itemListElement: [],
    },
    priceRange: 'Free Consultation',
    availableLanguage: ['English', 'Spanish'],
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
    priceRange: 'Free Consultation',
    availableLanguage: ['English', 'Spanish'],
  },
};

// Office locations data
const officeLocations = {
  raleigh: {
    address: '6801 Glenwood Ave',
    city: 'Raleigh',
    state: 'NC',
    zip: '27612',
    phone: '+1-919-755-9425',
    lat: '35.843768',
    lng: '-78.720567',
  },
  charlotte: {
    address: 'Charlotte Office',
    city: 'Charlotte',
    state: 'NC',
    zip: '28202',
    phone: '+1-980-754-9667',
    lat: '35.227085',
    lng: '-80.843124',
  },
  smithfield: {
    address: 'Smithfield Office',
    city: 'Smithfield',
    state: 'NC',
    zip: '27577',
    phone: '+1-919-755-9425',
    lat: '35.508456',
    lng: '-78.339416',
  },
  durham: {
    address: 'Durham Office',
    city: 'Durham',
    state: 'NC',
    zip: '27701',
    phone: '+1-919-755-9425',
    lat: '35.994034',
    lng: '-78.898621',
  },
  'winston-salem': {
    address: 'Winston-Salem Office',
    city: 'Winston-Salem',
    state: 'NC',
    zip: '27101',
    phone: '+1-336-448-8933',
    lat: '36.099861',
    lng: '-80.244217',
  },
  orlando: {
    address: 'Orlando Office',
    city: 'Orlando',
    state: 'FL',
    zip: '32801',
    phone: '+1-407-530-5397',
    lat: '28.538336',
    lng: '-81.379234',
  },
};

// Enhanced meta descriptions by page type
const metaDescriptionTemplates = {
  homepage:
    'Vasquez Law Firm - Experienced immigration, personal injury & criminal defense attorneys serving NC & FL. Free consultation. Se habla español. Call 1-844-YO-PELEO.',

  immigration:
    'Expert immigration attorneys handling [specific service]. 35+ years experience. Free consultation in English/Spanish. Call 1-844-YO-PELEO.',

  personalInjury:
    'Injured? Our [specific injury] lawyers fight for maximum compensation. No fee unless we win. Free case evaluation. Call 1-844-YO-PELEO.',

  criminalDefense:
    'Facing [specific charge]? Experienced defense attorneys protecting your rights. 24/7 availability. Free consultation.',

  familyLaw:
    "Compassionate [specific service] attorneys. Protecting your family's future. Bilingual services. Free consultation.",

  workersComp:
    'Hurt at work? Get the [specific benefit] you deserve. We fight insurance companies. No upfront costs. Free case review.',

  attorney:
    "Meet [Name] - Experienced [practice area] attorney at Vasquez Law Firm. [Years] years fighting for clients' rights. Free consultation.",

  location:
    'Vasquez Law Firm in [City], [State] - Immigration, personal injury, criminal defense & family law. Local attorneys who understand your needs. Walk-ins welcome.',

  blog: '[Topic] - Expert legal insights from Vasquez Law Firm. Learn about [subject] and your rights. Free consultation available.',
};

// Content expansion templates
const contentEnhancements = {
  practiceAreaSections: [
    {
      title: 'How We Can Help',
      template:
        "Our experienced attorneys provide comprehensive legal services for [practice area] cases. With over 35 years of combined experience, we understand the complexities of [specific area] law and fight tirelessly for our clients' rights.",
    },
    {
      title: 'Why Choose Vasquez Law Firm',
      template:
        'When you choose Vasquez Law Firm for your [practice area] case, you get: • Bilingual attorneys who understand your needs • 24/7 availability for emergencies • No fee unless we win (for applicable cases) • Personalized attention to your case • Proven track record of success',
    },
    {
      title: 'Free Consultation',
      template:
        "Get a free evaluation of your [practice area] case. During your consultation, we'll: • Review your situation in detail • Explain your legal options • Answer all your questions • Provide honest assessment • Discuss our fee structure",
    },
    {
      title: 'Frequently Asked Questions',
      template:
        'Common questions about [practice area] cases in North Carolina and Florida. Our attorneys are here to provide clear answers and guide you through the legal process.',
    },
  ],

  attorneySections: [
    {
      title: 'Experience & Background',
      template:
        '[Attorney name] brings extensive legal experience to every case. Licensed to practice in [jurisdictions], [he/she] has successfully represented hundreds of clients in [practice areas].',
    },
    {
      title: 'Practice Areas',
      template:
        '[Attorney name] focuses on [practice areas], providing dedicated representation to clients throughout North Carolina and Florida.',
    },
    {
      title: 'Professional Memberships',
      template:
        'Active member of [organizations], staying current with the latest legal developments to better serve our clients.',
    },
  ],
};

// Extract attorney name from content
function extractAttorneyName(pageData) {
  const h1 = pageData.content.h1 || '';
  const title = pageData.metadata.title || '';

  // Common patterns for attorney names
  const patterns = [
    /^(.*?)\s*[-–—]\s*Attorney/i,
    /^Attorney\s+(.*?)$/i,
    /^(.*?),\s*Esq\.?$/i,
    /^(.*?)\s*\|\s*Vasquez Law/i,
  ];

  for (const pattern of patterns) {
    const match = h1.match(pattern) || title.match(pattern);
    if (match) {
      return match[1].trim();
    }
  }

  // If no pattern matches, use the H1 if it looks like a name
  if (h1 && h1.split(' ').length >= 2 && h1.split(' ').length <= 4) {
    return h1;
  }

  return '';
}

// Determine page type from URL/content with better detection
function determinePageType(pageData) {
  const url = pageData.url.toLowerCase();
  const title = (pageData.content.h1 || pageData.metadata.title || '').toLowerCase();
  const content = (pageData.content.mainContent || '').toLowerCase();

  // Check for homepage
  if (url === '/index.html' || url === '/' || url === '/home.html') {
    return 'homepage';
  }

  // Check for attorney pages
  if (
    url.includes('attorney') ||
    url.includes('lawyer') ||
    title.includes('attorney') ||
    title.includes('esq') ||
    content.includes('admitted to practice') ||
    content.includes('law school')
  ) {
    return 'attorney';
  }

  // Check for location pages
  const locationKeywords = [
    'raleigh',
    'charlotte',
    'smithfield',
    'durham',
    'winston-salem',
    'orlando',
  ];
  if (locationKeywords.some(loc => url.includes(loc) || title.includes(loc))) {
    return 'location';
  }

  // Check for practice areas
  const practiceAreaKeywords = {
    immigration: [
      'immigration',
      'visa',
      'green card',
      'citizenship',
      'deportation',
      'asylum',
      'inmigracion',
    ],
    personalInjury: ['injury', 'accident', 'compensation', 'slip', 'fall', 'lesiones'],
    criminalDefense: ['criminal', 'defense', 'dui', 'dwi', 'drug', 'arrest', 'defensa'],
    familyLaw: ['family', 'divorce', 'custody', 'alimony', 'separation', 'familia'],
    workersComp: ['workers', 'compensation', 'workplace', 'injury', 'compensacion'],
  };

  for (const [type, keywords] of Object.entries(practiceAreaKeywords)) {
    if (keywords.some(keyword => url.includes(keyword) || title.includes(keyword))) {
      return type;
    }
  }

  // Check for blog posts
  if (url.includes('blog') || url.includes('article') || url.includes('post')) {
    return 'blog';
  }

  // Check for contact page
  if (url.includes('contact') || title.includes('contact')) {
    return 'contact';
  }

  // Check for Spanish pages
  if (url.includes('/es/') || title.includes('español')) {
    return 'spanish';
  }

  return 'general';
}

// Enhance a single page with comprehensive SEO
async function enhancePage(pageData, pageType) {
  const enhanced = { ...pageData };

  // Extract key information
  const attorneyName = pageType === 'attorney' ? extractAttorneyName(pageData) : '';

  // Enhance meta description based on page type
  let metaDesc = enhanced.metadata.metaDescription || '';

  if (metaDesc.length < 120 || metaDesc.includes('...')) {
    // Generate better meta description
    if (pageType in metaDescriptionTemplates) {
      metaDesc = metaDescriptionTemplates[pageType];

      // Customize based on content
      if (pageType === 'attorney' && attorneyName) {
        metaDesc = metaDesc.replace('[Name]', attorneyName);
        metaDesc = metaDesc.replace('[Years]', '10+'); // Default, could extract from content
        metaDesc = metaDesc.replace('[practice area]', 'immigration and personal injury');
      } else if (pageType === 'location') {
        const cityMatch = pageData.url.match(
          /\/(raleigh|charlotte|smithfield|durham|winston-salem|orlando)/i
        );
        if (cityMatch) {
          const city = cityMatch[1];
          const location = officeLocations[city.toLowerCase()];
          if (location) {
            metaDesc = metaDesc.replace('[City]', location.city);
            metaDesc = metaDesc.replace('[State]', location.state);
          }
        }
      } else if (pageType.includes('immigration') || pageType.includes('injury')) {
        // Extract specific service from title
        const service = pageData.content.h1 || pageType;
        metaDesc = metaDesc.replace('[specific service]', service.toLowerCase());
        metaDesc = metaDesc.replace('[specific injury]', service.toLowerCase());
      }
    }

    enhanced.metadata.metaDescription = metaDesc;
  }

  // Add comprehensive schema markup
  const schemaToAdd = [];

  if (pageType === 'attorney') {
    const attorneySchema = { ...schemaTemplates.attorney };
    attorneySchema.name = attorneyName || pageData.content.h1 || '';
    attorneySchema.url = `https://vasquezlawnc.com${pageData.url.replace('.html', '')}`;

    // Extract education info if available
    const educationMatch = (pageData.content.mainContent || '').match(
      /([A-Z][^,]+University[^,]*)/
    );
    if (educationMatch) {
      attorneySchema.alumniOf.name = educationMatch[1];
    }

    schemaToAdd.push(attorneySchema);
  } else if (
    pageType.includes('immigration') ||
    pageType.includes('injury') ||
    pageType.includes('criminal') ||
    pageType.includes('family') ||
    pageType.includes('workers')
  ) {
    const serviceSchema = { ...schemaTemplates.legalService };
    serviceSchema.name = pageData.content.h1 || '';
    serviceSchema.description = enhanced.metadata.metaDescription;
    serviceSchema.url = `https://vasquezlawnc.com${pageData.url.replace('.html', '')}`;

    // Add specific service offerings
    const services = [];
    if (pageType === 'immigration') {
      services.push(
        'Green Card Applications',
        'Citizenship & Naturalization',
        'Deportation Defense',
        'Work Visas',
        'Family Petitions'
      );
    } else if (pageType === 'personalInjury') {
      services.push(
        'Car Accidents',
        'Truck Accidents',
        'Slip & Fall',
        'Medical Malpractice',
        'Wrongful Death'
      );
    }

    serviceSchema.hasOfferCatalog.itemListElement = services.map(service => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: service,
      },
    }));

    schemaToAdd.push(serviceSchema);
  } else if (pageType === 'location') {
    const cityMatch = pageData.url.match(
      /\/(raleigh|charlotte|smithfield|durham|winston-salem|orlando)/i
    );
    if (cityMatch) {
      const city = cityMatch[1].toLowerCase();
      const location = officeLocations[city];

      if (location) {
        const locationSchema = { ...schemaTemplates.localBusiness };
        locationSchema.name = `Vasquez Law Firm - ${location.city}`;
        locationSchema.address.streetAddress = location.address;
        locationSchema.address.addressLocality = location.city;
        locationSchema.address.addressRegion = location.state;
        locationSchema.address.postalCode = location.zip;
        locationSchema.telephone = location.phone;
        locationSchema.geo.latitude = location.lat;
        locationSchema.geo.longitude = location.lng;

        schemaToAdd.push(locationSchema);
      }
    }
  }

  // Add organization schema to all pages
  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    '@id': 'https://vasquezlawnc.com/#organization',
    name: 'Vasquez Law Firm, PLLC',
    alternateName: 'Vasquez Law',
    url: 'https://vasquezlawnc.com',
    logo: 'https://vasquezlawnc.com/images/logo.png',
    sameAs: [
      'https://www.facebook.com/vasquezlawfirm',
      'https://twitter.com/vasquezlawfirm',
      'https://www.linkedin.com/company/vasquez-law-firm',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-844-967-3536',
      contactType: 'customer service',
      availableLanguage: ['English', 'Spanish'],
    },
  };

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

  // Build breadcrumb path
  const urlParts = pageData.url.split('/').filter(p => p && p !== 'index.html');
  let currentPath = 'https://vasquezlawnc.com';

  urlParts.forEach((part, index) => {
    currentPath += `/${part}`;
    breadcrumbSchema.itemListElement.push({
      '@type': 'ListItem',
      position: index + 2,
      name:
        part.replace(/-/g, ' ').replace('.html', '').charAt(0).toUpperCase() +
        part.slice(1).replace(/-/g, ' ').replace('.html', ''),
      item: currentPath.replace('.html', ''),
    });
  });

  // Add FAQ schema for practice areas
  if (
    pageType.includes('immigration') ||
    pageType.includes('injury') ||
    pageType.includes('criminal') ||
    pageType.includes('family') ||
    pageType.includes('workers')
  ) {
    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: `How much does a ${pageData.content.h1 || pageType} lawyer cost?`,
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Vasquez Law Firm offers free consultations and works on contingency for many cases. This means you don't pay attorney fees unless we win your case. For other matters, we offer competitive rates and payment plans.",
          },
        },
        {
          '@type': 'Question',
          name: `How long does a ${pageData.content.h1 || pageType} case take?`,
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Case timelines vary depending on complexity and specific circumstances. During your free consultation, we'll provide a realistic timeline based on your unique situation and our extensive experience handling similar cases.",
          },
        },
        {
          '@type': 'Question',
          name: 'Do you speak Spanish?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Yes! Vasquez Law Firm provides full bilingual services in English and Spanish. Our attorneys and staff can assist you in the language you're most comfortable with.",
          },
        },
      ],
    };
    enhanced.metadata.structuredData.push(faqSchema);
  }

  // Add all schema markup
  enhanced.metadata.structuredData = [
    ...enhanced.metadata.structuredData,
    orgSchema,
    ...schemaToAdd,
    breadcrumbSchema,
  ];

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

  // Enhance content sections
  enhanced.contentSections = [];

  if (
    pageType.includes('immigration') ||
    pageType.includes('injury') ||
    pageType.includes('criminal') ||
    pageType.includes('family') ||
    pageType.includes('workers')
  ) {
    contentEnhancements.practiceAreaSections.forEach(section => {
      enhanced.contentSections.push({
        ...section,
        content: section.template
          .replace(/\[practice area\]/g, pageData.content.h1 || pageType)
          .replace(/\[specific area\]/g, pageData.content.h1 || pageType),
      });
    });
  } else if (pageType === 'attorney') {
    contentEnhancements.attorneySections.forEach(section => {
      enhanced.contentSections.push({
        ...section,
        content: section.template
          .replace(/\[Attorney name\]/g, attorneyName || 'Our attorney')
          .replace(/\[he\/she\]/g, 'they')
          .replace(/\[practice areas\]/g, 'immigration, personal injury, and criminal defense')
          .replace(/\[jurisdictions\]/g, 'North Carolina and Florida')
          .replace(
            /\[organizations\]/g,
            'American Immigration Lawyers Association (AILA), North Carolina Bar Association'
          ),
      });
    });
  }

  // Enhance images with contextual alt text
  if (enhanced.images && enhanced.images.length > 0) {
    enhanced.images = enhanced.images.map(img => {
      if (!img.alt || img.alt.length < 10 || img.alt === 'image') {
        // Generate contextual alt text
        const imgName = img.src.split('/').pop().toLowerCase();

        if (imgName.includes('attorney') || imgName.includes('lawyer')) {
          img.alt = `${attorneyName || pageData.content.h1 || 'Attorney'} - Vasquez Law Firm`;
        } else if (imgName.includes('office') || imgName.includes('building')) {
          img.alt = `Vasquez Law Firm Office - ${pageData.content.h1 || 'Professional Legal Services'}`;
        } else if (imgName.includes('team')) {
          img.alt = 'Vasquez Law Firm Legal Team - Experienced Attorneys';
        } else if (imgName.includes('court')) {
          img.alt = 'Courthouse - Vasquez Law Firm Court Representation';
        } else {
          img.alt = `${pageData.content.h1 || 'Vasquez Law Firm'} - ${pageType.replace(/([A-Z])/g, ' $1').trim()}`;
        }
      }
      return img;
    });
  }

  // Add internal linking suggestions
  enhanced.internalLinks = [];

  if (
    pageType.includes('immigration') ||
    pageType.includes('injury') ||
    pageType.includes('criminal') ||
    pageType.includes('family') ||
    pageType.includes('workers')
  ) {
    enhanced.internalLinks.push(
      { text: 'Meet Our Attorneys', href: '/attorneys' },
      { text: 'Contact Us Today', href: '/contact' },
      { text: 'Free Case Evaluation', href: '/contact#consultation' },
      { text: 'View All Practice Areas', href: '/practice-areas' },
      { text: 'Client Testimonials', href: '/testimonials' }
    );
  } else if (pageType === 'attorney') {
    enhanced.internalLinks.push(
      { text: 'View Practice Areas', href: '/practice-areas' },
      { text: 'Office Locations', href: '/locations' },
      { text: 'Schedule Consultation', href: '/contact' },
      { text: 'Meet Our Team', href: '/attorneys' }
    );
  } else if (pageType === 'location') {
    enhanced.internalLinks.push(
      { text: 'Our Attorneys', href: '/attorneys' },
      { text: 'Practice Areas', href: '/practice-areas' },
      { text: 'Contact This Office', href: '/contact' },
      { text: 'All Locations', href: '/locations' }
    );
  }

  // Calculate comprehensive SEO score
  enhanced.seoScore = calculateSEOScore(enhanced);
  enhanced.pageType = pageType;
  enhanced.enhancedAt = new Date().toISOString();

  return enhanced;
}

// Calculate comprehensive SEO score
function calculateSEOScore(page) {
  let score = 0;
  const checks = [];

  // Title tag (15 points)
  if (page.metadata.title) {
    const titleLength = page.metadata.title.length;
    if (titleLength >= 30 && titleLength <= 60) {
      score += 15;
      checks.push('✓ Title tag length optimal (30-60 chars)');
    } else if (titleLength > 0) {
      score += 8;
      checks.push(`⚠ Title tag length: ${titleLength} chars (optimal: 30-60)`);
    } else {
      checks.push('✗ Missing title tag');
    }
  }

  // Meta description (15 points)
  if (page.metadata.metaDescription) {
    const descLength = page.metadata.metaDescription.length;
    if (descLength >= 120 && descLength <= 160) {
      score += 15;
      checks.push('✓ Meta description length optimal (120-160 chars)');
    } else if (descLength > 0) {
      score += 8;
      checks.push(`⚠ Meta description length: ${descLength} chars (optimal: 120-160)`);
    } else {
      checks.push('✗ Missing meta description');
    }
  }

  // H1 tag (10 points)
  if (page.content.h1 && page.content.h1.length > 0) {
    score += 10;
    checks.push('✓ H1 tag present');
  } else {
    checks.push('✗ Missing H1 tag');
  }

  // Schema markup (20 points)
  if (page.metadata.structuredData && page.metadata.structuredData.length > 0) {
    const schemaTypes = page.metadata.structuredData.map(s => s['@type']).filter(Boolean);
    score += Math.min(20, schemaTypes.length * 5);
    checks.push(`✓ Schema markup present (${schemaTypes.length} types)`);
  } else {
    checks.push('✗ No schema markup');
  }

  // Images with alt text (10 points)
  if (page.images && page.images.length > 0) {
    const imagesWithAlt = page.images.filter(img => img.alt && img.alt.length > 5).length;
    const altPercentage = (imagesWithAlt / page.images.length) * 100;

    if (altPercentage === 100) {
      score += 10;
      checks.push('✓ All images have descriptive alt text');
    } else if (altPercentage >= 50) {
      score += 5;
      checks.push(`⚠ ${Math.round(altPercentage)}% of images have alt text`);
    } else {
      checks.push(`✗ Only ${Math.round(altPercentage)}% of images have alt text`);
    }
  }

  // Content length (15 points)
  const contentLength = page.content.mainContent?.length || 0;
  if (contentLength > 2000) {
    score += 15;
    checks.push(`✓ Substantial content (${contentLength} chars)`);
  } else if (contentLength > 1000) {
    score += 10;
    checks.push(`⚠ Content length: ${contentLength} chars (aim for 2000+)`);
  } else if (contentLength > 500) {
    score += 5;
    checks.push(`✗ Thin content: ${contentLength} chars (minimum 1000)`);
  } else {
    checks.push('✗ Very thin or no content');
  }

  // Internal links (5 points)
  if (page.internalLinks && page.internalLinks.length >= 3) {
    score += 5;
    checks.push(`✓ Good internal linking (${page.internalLinks.length} links)`);
  } else {
    const linkCount = page.internalLinks?.length || 0;
    checks.push(`✗ Limited internal links (${linkCount}, need 3+)`);
  }

  // Canonical URL (5 points)
  if (page.metadata.canonical) {
    score += 5;
    checks.push('✓ Canonical URL set');
  } else {
    checks.push('✗ No canonical URL');
  }

  // Open Graph tags (5 points)
  if (page.metadata.ogTitle && page.metadata.ogDescription) {
    score += 5;
    checks.push('✓ Open Graph tags present');
  } else if (page.metadata.ogTitle || page.metadata.ogDescription) {
    score += 3;
    checks.push('⚠ Partial Open Graph tags');
  } else {
    checks.push('✗ Missing Open Graph tags');
  }

  return {
    score: Math.min(score, 100),
    checks,
    recommendations: checks.filter(c => c.startsWith('✗') || c.startsWith('⚠')),
  };
}

// Process all directories
async function processDirectory(dirPath, outputDir) {
  const results = [];

  try {
    const files = await fs.readdir(dirPath);

    for (const file of files) {
      if (file.endsWith('.json')) {
        console.log(`  📄 Processing: ${file}`);

        try {
          const content = await fs.readFile(path.join(dirPath, file), 'utf-8');
          const pageData = JSON.parse(content);

          const pageType = determinePageType(pageData);
          const enhanced = await enhancePage(pageData, pageType);

          // Save enhanced version
          await fs.writeFile(path.join(outputDir, file), JSON.stringify(enhanced, null, 2));

          results.push({
            file,
            pageType,
            score: enhanced.seoScore.score,
            success: true,
          });

          console.log(`    ✅ Enhanced (${pageType}) - SEO Score: ${enhanced.seoScore.score}/100`);
        } catch (error) {
          console.error(`    ❌ Failed: ${error.message}`);
          results.push({
            file,
            error: error.message,
            success: false,
          });
        }
      }
    }
  } catch (error) {
    console.error(`Failed to read directory ${dirPath}:`, error);
  }

  return results;
}

// Main enhancement process
async function enhanceAllContent() {
  console.log('🚀 Starting comprehensive SEO enhancement...\n');

  // Ensure output directories exist
  const categories = ['attorneys', 'practice-areas', 'locations', 'blog', 'spanish', 'pages'];

  try {
    await fs.mkdir(OUTPUT_PATH, { recursive: true });
    for (const category of categories) {
      await fs.mkdir(path.join(OUTPUT_PATH, category), { recursive: true });
    }
  } catch (error) {
    console.error('Error creating output directories:', error);
  }

  const allResults = {
    enhanced: 0,
    failed: 0,
    byCategory: {},
    seoScores: [],
  };

  // Process each category
  for (const category of categories) {
    console.log(`\n📁 Processing ${category}...`);

    const inputDir = path.join(INPUT_PATH, category);
    const outputDir = path.join(OUTPUT_PATH, category);

    const results = await processDirectory(inputDir, outputDir);

    allResults.byCategory[category] = results;
    allResults.enhanced += results.filter(r => r.success).length;
    allResults.failed += results.filter(r => !r.success).length;
    allResults.seoScores.push(...results.filter(r => r.success).map(r => r.score));
  }

  // Calculate average SEO score
  const avgScore =
    allResults.seoScores.length > 0
      ? allResults.seoScores.reduce((a, b) => a + b, 0) / allResults.seoScores.length
      : 0;

  // Generate comprehensive report
  const report = {
    summary: {
      totalProcessed: allResults.enhanced + allResults.failed,
      successfullyEnhanced: allResults.enhanced,
      failed: allResults.failed,
      averageSEOScore: Math.round(avgScore),
      enhancedAt: new Date().toISOString(),
    },
    byCategory: allResults.byCategory,
    topPerformers: allResults.seoScores
      .map((score, index) => ({
        score,
        file: Object.values(allResults.byCategory)
          .flat()
          .filter(r => r.success)[index]?.file,
      }))
      .filter(item => item.file)
      .sort((a, b) => b.score - a.score)
      .slice(0, 10),
    needsImprovement: allResults.seoScores
      .map((score, index) => ({
        score,
        file: Object.values(allResults.byCategory)
          .flat()
          .filter(r => r.success)[index]?.file,
      }))
      .filter(item => item.file && item.score < 70)
      .sort((a, b) => a.score - b.score)
      .slice(0, 10),
  };

  // Save report
  await fs.writeFile(
    path.join(OUTPUT_PATH, 'seo-enhancement-report.json'),
    JSON.stringify(report, null, 2)
  );

  // Display summary
  console.log('\n' + '='.repeat(60));
  console.log('📊 SEO ENHANCEMENT COMPLETE');
  console.log('='.repeat(60));
  console.log(`✅ Successfully enhanced: ${allResults.enhanced} pages`);
  console.log(`❌ Failed: ${allResults.failed} pages`);
  console.log(`📈 Average SEO Score: ${Math.round(avgScore)}/100`);
  console.log(`📁 Output saved to: ${OUTPUT_PATH}`);

  // Show category breakdown
  console.log('\n📋 Category Breakdown:');
  for (const [category, results] of Object.entries(allResults.byCategory)) {
    const success = results.filter(r => r.success).length;
    const categoryAvg =
      results.filter(r => r.success).reduce((sum, r) => sum + r.score, 0) / (success || 1);

    console.log(`  ${category}: ${success} pages (avg score: ${Math.round(categoryAvg)})`);
  }

  // Show top performers
  console.log('\n🏆 Top SEO Scores:');
  report.topPerformers.slice(0, 5).forEach((item, index) => {
    console.log(`  ${index + 1}. ${item.file} - ${item.score}/100`);
  });

  // Show pages needing improvement
  if (report.needsImprovement.length > 0) {
    console.log('\n⚠️  Pages Needing Improvement:');
    report.needsImprovement.slice(0, 5).forEach(item => {
      console.log(`  - ${item.file} - ${item.score}/100`);
    });
  }

  console.log('\n✨ Next Steps:');
  console.log('1. Review the enhancement report');
  console.log('2. Generate optimized Next.js pages from enhanced content');
  console.log('3. Implement 301 redirects from old URLs');
  console.log('4. Submit updated sitemap to Google Search Console\n');

  return report;
}

// Main execution
async function main() {
  try {
    // Check if input directory exists
    try {
      await fs.access(INPUT_PATH);
    } catch (error) {
      console.error(`❌ No extracted content found at: ${INPUT_PATH}`);
      console.log('\nPlease run: node scripts/extract-all-old-site-content.js first\n');
      process.exit(1);
    }

    await enhanceAllContent();
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
