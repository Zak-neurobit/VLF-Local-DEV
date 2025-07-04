const fs = require('fs').promises;
const path = require('path');

class SEOOptimizer {
  constructor() {
    this.contentDir = path.join(__dirname, '../content-import');
    this.outputDir = path.join(__dirname, '../content-optimized');

    this.keywords = {
      immigration: [
        'immigration lawyer Charlotte NC',
        'immigration attorney near me',
        'visa lawyer Charlotte',
        'green card attorney',
        'deportation defense lawyer',
        'citizenship attorney Charlotte',
        'DACA lawyer NC',
        'asylum attorney',
        'family immigration lawyer',
        'work visa attorney Charlotte',
      ],
      personalInjury: [
        'personal injury lawyer Charlotte',
        'car accident attorney NC',
        'truck accident lawyer Charlotte',
        'motorcycle accident attorney',
        'slip and fall lawyer Charlotte NC',
        'wrongful death attorney',
        'medical malpractice lawyer Charlotte',
        'injury attorney near me',
      ],
      criminalDefense: [
        'criminal defense lawyer Charlotte',
        'DUI attorney NC',
        'DWI lawyer Charlotte',
        'drug crime attorney',
        'assault defense lawyer Charlotte NC',
        'traffic ticket attorney',
        'expungement lawyer NC',
      ],
      familyLaw: [
        'divorce lawyer Charlotte NC',
        'family law attorney',
        'child custody lawyer Charlotte',
        'alimony attorney NC',
        'property division lawyer',
        'separation agreement attorney Charlotte',
      ],
      workersComp: [
        'workers compensation lawyer Charlotte',
        'work injury attorney NC',
        'workplace accident lawyer',
        'construction injury attorney Charlotte',
        'workers comp benefits lawyer NC',
      ],
    };
  }

  async optimizeAllContent() {
    try {
      await fs.mkdir(this.outputDir, { recursive: true });

      // Process all JSON files in content-import
      const files = await this.getAllJsonFiles(this.contentDir);
      console.log(`Found ${files.length} content files to optimize`);

      const results = {
        processed: 0,
        optimized: 0,
        errors: 0,
      };

      for (const file of files) {
        try {
          await this.processFile(file);
          results.processed++;
          results.optimized++;
        } catch (error) {
          console.error(`Error processing ${file}:`, error.message);
          results.errors++;
        }
      }

      // Generate comprehensive SEO assets
      await this.generateSEOAssets();

      console.log('\nSEO Optimization Complete!');
      console.log('Results:', results);

      return results;
    } catch (error) {
      console.error('Optimization failed:', error);
      throw error;
    }
  }

  async getAllJsonFiles(dir, files = []) {
    const items = await fs.readdir(dir);

    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = await fs.stat(fullPath);

      if (stat.isDirectory() && !item.includes('node_modules')) {
        await this.getAllJsonFiles(fullPath, files);
      } else if (item.endsWith('.json')) {
        files.push(fullPath);
      }
    }

    return files;
  }

  async processFile(filePath) {
    const content = await fs.readFile(filePath, 'utf-8');
    const data = JSON.parse(content);

    // Skip if not a page content file
    if (!data.title && !data.content && !data.name) {
      return;
    }

    const optimized = await this.optimizeContent(data, filePath);

    // Save optimized version
    const relativePath = path.relative(this.contentDir, filePath);
    const outputPath = path.join(this.outputDir, relativePath);

    await fs.mkdir(path.dirname(outputPath), { recursive: true });
    await fs.writeFile(outputPath, JSON.stringify(optimized, null, 2));

    console.log(`Optimized: ${relativePath}`);
  }

  async optimizeContent(data, filePath) {
    const practiceArea = this.detectPracticeArea(filePath, data);
    const keywords = this.keywords[practiceArea] || this.keywords.immigration;

    // Start with original data
    const optimized = { ...data };

    // Add SEO metadata
    optimized.seo = {
      title: this.optimizeTitle(data.title || data.name || data.h1, keywords),
      metaDescription: this.optimizeDescription(data.description || data.content, keywords),
      keywords: keywords.slice(0, 10).join(', '),
      canonical: this.generateCanonicalUrl(filePath),
      robots: 'index, follow',
      og: {
        title: '',
        description: '',
        type: 'website',
        locale: data.language === 'es' ? 'es_US' : 'en_US',
      },
      twitter: {
        card: 'summary_large_image',
        site: '@VasquezLawFirm',
      },
    };

    // Set Open Graph data
    optimized.seo.og.title = optimized.seo.title;
    optimized.seo.og.description = optimized.seo.metaDescription;

    // Add structured data
    optimized.structuredData = this.generateStructuredData(data, practiceArea);

    // Add content improvements
    if (data.content) {
      optimized.optimizedContent = this.enhanceContent(data.content, keywords);
    }

    // Add internal linking suggestions
    optimized.internalLinks = this.suggestInternalLinks(practiceArea);

    // Calculate SEO score
    optimized.seoScore = this.calculateSEOScore(optimized);

    // Add call-to-action
    optimized.cta = this.generateCTA(practiceArea);

    // Add FAQs for better SEO
    optimized.faqs = this.generateFAQs(practiceArea);

    return optimized;
  }

  detectPracticeArea(filePath, data) {
    const combined = `${filePath} ${JSON.stringify(data)}`.toLowerCase();

    if (
      combined.includes('immigration') ||
      combined.includes('visa') ||
      combined.includes('citizenship')
    ) {
      return 'immigration';
    }
    if (
      combined.includes('personal-injury') ||
      combined.includes('accident') ||
      combined.includes('injury')
    ) {
      return 'personalInjury';
    }
    if (combined.includes('criminal') || combined.includes('dui') || combined.includes('dwi')) {
      return 'criminalDefense';
    }
    if (
      combined.includes('family') ||
      combined.includes('divorce') ||
      combined.includes('custody')
    ) {
      return 'familyLaw';
    }
    if (combined.includes('workers') || combined.includes('compensation')) {
      return 'workersComp';
    }

    return 'immigration'; // default
  }

  optimizeTitle(title, keywords) {
    if (!title) return keywords[0] + ' | Vasquez Law Firm';

    let optimized = title.trim();

    // Remove existing brand mentions
    optimized = optimized.replace(/[-|]?\s*Vasquez Law Firm.*$/i, '');

    // Ensure primary keyword
    const primaryKeyword = keywords[0];
    const hasKeyword = keywords.some(kw =>
      optimized.toLowerCase().includes(kw.split(' ')[0].toLowerCase())
    );

    if (!hasKeyword) {
      optimized = `${optimized} - ${primaryKeyword}`;
    }

    // Add location if missing
    if (!optimized.includes('Charlotte') && !optimized.includes('NC')) {
      optimized += ' Charlotte NC';
    }

    // Add brand
    optimized += ' | Vasquez Law Firm';

    // Optimize length (50-60 chars)
    if (optimized.length > 60) {
      const parts = optimized.split(' | ');
      parts[0] = parts[0].substring(0, 40) + '...';
      optimized = parts.join(' | ');
    }

    return optimized;
  }

  optimizeDescription(content, keywords) {
    if (!content) {
      return `${keywords[0]} services in Charlotte NC. Call 1-844-YO-PELEO for a free consultation with experienced attorneys at Vasquez Law Firm.`;
    }

    let description = typeof content === 'string' ? content : JSON.stringify(content);
    description = description.replace(/<[^>]*>/g, '').trim();

    // Ensure primary keyword
    if (!description.toLowerCase().includes(keywords[0].toLowerCase())) {
      description = `${keywords[0]}. ${description}`;
    }

    // Add call to action
    if (!description.includes('call') && !description.includes('1-844')) {
      description += ' Call 1-844-YO-PELEO for help.';
    }

    // Optimize length (150-160 chars)
    if (description.length > 160) {
      description = description.substring(0, 155) + '...';
    }

    return description;
  }

  generateCanonicalUrl(filePath) {
    const relativePath = path.relative(this.contentDir, filePath);
    const urlPath = relativePath
      .replace(/\.json$/, '')
      .replace(/\\/g, '/')
      .replace(/^pages\//, '')
      .replace(/index$/, '');

    return `https://vasquezlawnc.com/${urlPath}`.replace(/\/+$/, '');
  }

  generateStructuredData(data, practiceArea) {
    const baseData = {
      '@context': 'https://schema.org',
      '@type': 'LegalService',
      name: 'Vasquez Law Firm',
      url: 'https://vasquezlawnc.com',
      logo: 'https://vasquezlawnc.com/logo.png',
      image: 'https://vasquezlawnc.com/office.jpg',
      telephone: '+1-844-967-3536',
      email: 'info@vasquezlawnc.com',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '4801 E Independence Blvd Suite 714',
        addressLocality: 'Charlotte',
        addressRegion: 'NC',
        postalCode: '28212',
        addressCountry: 'US',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: '35.1962',
        longitude: '-80.7693',
      },
      areaServed: [
        {
          '@type': 'State',
          name: 'North Carolina',
        },
        {
          '@type': 'State',
          name: 'South Carolina',
        },
      ],
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '09:00',
          closes: '18:00',
        },
      ],
      priceRange: '$$',
      paymentAccepted: ['Cash', 'Check', 'Credit Card', 'PayPal'],
      languages: ['English', 'Spanish'],
    };

    // Add specific service schema
    if (practiceArea === 'immigration') {
      baseData.serviceType = ['Immigration Law', 'Visa Services', 'Deportation Defense'];
    } else if (practiceArea === 'personalInjury') {
      baseData.serviceType = ['Personal Injury Law', 'Car Accident Cases', 'Medical Malpractice'];
    } else if (practiceArea === 'criminalDefense') {
      baseData.serviceType = ['Criminal Defense', 'DUI Defense', 'Traffic Violations'];
    }

    // Add attorney schema if it's an attorney page
    if (data.name && data.title && data.title.includes('Attorney')) {
      return {
        '@context': 'https://schema.org',
        '@type': 'Attorney',
        name: data.name,
        jobTitle: data.title,
        worksFor: {
          '@type': 'LegalService',
          name: 'Vasquez Law Firm',
        },
        telephone: '+1-844-967-3536',
        email: data.email || 'info@vasquezlawnc.com',
        address: baseData.address,
      };
    }

    // Add FAQ schema
    if (data.faqs || practiceArea) {
      baseData.mainEntity = {
        '@type': 'FAQPage',
        mainEntity: this.generateFAQSchema(practiceArea),
      };
    }

    return baseData;
  }

  generateFAQSchema(practiceArea) {
    const faqs = this.generateFAQs(practiceArea);
    return faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    }));
  }

  enhanceContent(content, keywords) {
    let enhanced = content;

    // Add keyword variations naturally
    const keywordVariations = this.generateKeywordVariations(keywords[0]);

    // Add location-specific content
    enhanced += '\n\n## Serving Charlotte and Surrounding Areas\n';
    enhanced +=
      'Vasquez Law Firm proudly serves clients throughout Charlotte, Mecklenburg County, and the greater North Carolina area. ';
    enhanced +=
      "With offices conveniently located in Charlotte, we're here to help with all your legal needs.\n";

    // Add trust signals
    enhanced += '\n\n## Why Choose Vasquez Law Firm?\n';
    enhanced += '- **Experienced Attorneys**: Over 20 years of combined legal experience\n';
    enhanced += '- **Bilingual Services**: We speak English and Spanish\n';
    enhanced += '- **Free Consultation**: Call 1-844-YO-PELEO today\n';
    enhanced += '- **Proven Results**: Hundreds of satisfied clients\n';
    enhanced += "- **24/7 Availability**: We're here when you need us\n";

    return enhanced;
  }

  generateKeywordVariations(keyword) {
    const base = keyword.toLowerCase();
    const variations = [base];

    // Add plurals
    if (!base.endsWith('s')) {
      variations.push(base + 's');
    }

    // Add location variations
    if (!base.includes('charlotte')) {
      variations.push(base + ' charlotte');
      variations.push(base + ' charlotte nc');
    }

    // Add "near me" variations
    if (!base.includes('near me')) {
      variations.push(base + ' near me');
    }

    return variations;
  }

  suggestInternalLinks(practiceArea) {
    const links = [
      { text: 'Contact Us', url: '/contact', anchor: 'Free Consultation' },
      { text: 'Our Attorneys', url: '/attorneys', anchor: 'Meet Our Team' },
      { text: 'Practice Areas', url: '/practice-areas', anchor: 'Legal Services' },
    ];

    // Add practice area specific links
    if (practiceArea === 'immigration') {
      links.push(
        { text: 'Green Card Services', url: '/immigration/green-cards', anchor: 'Green Card Help' },
        { text: 'Citizenship', url: '/immigration/citizenship', anchor: 'Become a Citizen' },
        { text: 'Visa Services', url: '/immigration/visas', anchor: 'Visa Assistance' }
      );
    } else if (practiceArea === 'personalInjury') {
      links.push(
        {
          text: 'Car Accidents',
          url: '/personal-injury/car-accidents',
          anchor: 'Auto Accident Help',
        },
        {
          text: 'Truck Accidents',
          url: '/personal-injury/truck-accidents',
          anchor: 'Truck Crash Cases',
        }
      );
    }

    return links;
  }

  calculateSEOScore(data) {
    let score = 0;
    const factors = {
      hasTitle: 20,
      hasMetaDescription: 20,
      hasKeywords: 10,
      hasStructuredData: 15,
      hasH1: 10,
      contentLength: 15,
      hasInternalLinks: 10,
    };

    if (data.seo?.title) score += factors.hasTitle;
    if (data.seo?.metaDescription) score += factors.hasMetaDescription;
    if (data.seo?.keywords) score += factors.hasKeywords;
    if (data.structuredData) score += factors.hasStructuredData;
    if (data.h1 || data.title) score += factors.hasH1;
    if (data.content && data.content.length > 300) score += factors.contentLength;
    if (data.internalLinks?.length > 0) score += factors.hasInternalLinks;

    return score;
  }

  generateCTA(practiceArea) {
    const ctas = {
      immigration: {
        primary: 'Get Immigration Help Today',
        secondary: 'Schedule Your Free Consultation',
        urgency: "Don't wait - immigration laws are changing. Call now!",
        phone: '1-844-YO-PELEO',
      },
      personalInjury: {
        primary: 'Injured? We Can Help',
        secondary: 'Get Your Free Case Evaluation',
        urgency: 'Time limits apply - call today!',
        phone: '1-844-YO-PELEO',
      },
      criminalDefense: {
        primary: 'Arrested? Call Now',
        secondary: '24/7 Emergency Legal Help',
        urgency: 'Protect your rights - call immediately!',
        phone: '1-844-YO-PELEO',
      },
      familyLaw: {
        primary: 'Family Law Solutions',
        secondary: 'Compassionate Legal Support',
        urgency: 'Get the help you need today',
        phone: '1-844-YO-PELEO',
      },
      workersComp: {
        primary: 'Hurt at Work?',
        secondary: 'Get the Benefits You Deserve',
        urgency: "Don't let your employer deny your claim",
        phone: '1-844-YO-PELEO',
      },
    };

    return ctas[practiceArea] || ctas.immigration;
  }

  generateFAQs(practiceArea) {
    const faqs = {
      immigration: [
        {
          question: 'How long does the immigration process take?',
          answer:
            'Immigration timelines vary greatly depending on your case type. Green card applications can take 8-33 months, while citizenship typically takes 8-12 months. Contact Vasquez Law Firm for a personalized timeline assessment.',
        },
        {
          question: 'Do I need an immigration lawyer?',
          answer:
            'While not required, an immigration lawyer significantly improves your chances of success. Immigration law is complex and constantly changing. Our attorneys at Vasquez Law Firm ensure your application is complete and accurate.',
        },
        {
          question: 'How much does an immigration lawyer cost in Charlotte?',
          answer:
            'Immigration attorney fees vary by case complexity. Vasquez Law Firm offers competitive rates and payment plans. Call 1-844-YO-PELEO for a free consultation and fee quote.',
        },
      ],
      personalInjury: [
        {
          question: 'How much is my personal injury case worth?',
          answer:
            "Case values depend on injury severity, medical costs, lost wages, and pain and suffering. Vasquez Law Firm offers free case evaluations to estimate your claim's value.",
        },
        {
          question: 'How long do I have to file a personal injury claim in NC?',
          answer:
            'North Carolina has a 3-year statute of limitations for most personal injury cases. However, some cases have shorter deadlines. Contact Vasquez Law Firm immediately to protect your rights.',
        },
      ],
      criminalDefense: [
        {
          question: "What should I do if I'm arrested in Charlotte?",
          answer:
            'Remain silent and request an attorney immediately. Do not discuss your case with anyone except your lawyer. Call Vasquez Law Firm 24/7 at 1-844-YO-PELEO for emergency help.',
        },
        {
          question: 'Can a criminal record be expunged in NC?',
          answer:
            'Many criminal records can be expunged in North Carolina. Eligibility depends on the offense type and your criminal history. Vasquez Law Firm can review your record and file for expungement.',
        },
      ],
    };

    return faqs[practiceArea] || faqs.immigration;
  }

  async generateSEOAssets() {
    // Generate master schema file
    const schemaTemplates = {
      organization: this.generateOrganizationSchema(),
      localBusiness: this.generateLocalBusinessSchema(),
      breadcrumbs: this.generateBreadcrumbSchema(),
    };

    await fs.writeFile(
      path.join(this.outputDir, 'schema-templates.json'),
      JSON.stringify(schemaTemplates, null, 2)
    );

    // Generate location-specific content
    const locations = this.generateLocationPages();
    await fs.writeFile(
      path.join(this.outputDir, 'location-content.json'),
      JSON.stringify(locations, null, 2)
    );

    // Generate blog post ideas
    const blogIdeas = this.generateBlogPostIdeas();
    await fs.writeFile(
      path.join(this.outputDir, 'blog-post-ideas.json'),
      JSON.stringify(blogIdeas, null, 2)
    );
  }

  generateOrganizationSchema() {
    return {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Vasquez Law Firm',
      alternateName: 'Vasquez Law Firm, PLLC',
      url: 'https://vasquezlawnc.com',
      logo: 'https://vasquezlawnc.com/logo.png',
      sameAs: [
        'https://www.facebook.com/vasquezlawfirm',
        'https://www.linkedin.com/company/vasquez-law-firm',
        'https://www.youtube.com/@vasquezlawfirm',
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+1-844-967-3536',
        contactType: 'customer service',
        availableLanguage: ['English', 'Spanish'],
      },
    };
  }

  generateLocalBusinessSchema() {
    return {
      '@context': 'https://schema.org',
      '@type': 'Attorney',
      name: 'Vasquez Law Firm',
      image: 'https://vasquezlawnc.com/office.jpg',
      '@id': 'https://vasquezlawnc.com',
      url: 'https://vasquezlawnc.com',
      telephone: '+18449673536',
      priceRange: '$$',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '4801 E Independence Blvd Suite 714',
        addressLocality: 'Charlotte',
        addressRegion: 'NC',
        postalCode: '28212',
        addressCountry: 'US',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 35.1962,
        longitude: -80.7693,
      },
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      },
    };
  }

  generateBreadcrumbSchema() {
    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://vasquezlawnc.com',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Practice Areas',
          item: 'https://vasquezlawnc.com/practice-areas',
        },
      ],
    };
  }

  generateLocationPages() {
    const cities = [
      'Charlotte',
      'Raleigh',
      'Durham',
      'Greensboro',
      'Winston-Salem',
      'Fayetteville',
      'Cary',
      'Wilmington',
      'High Point',
      'Concord',
    ];

    return cities.map(city => ({
      city,
      title: `Immigration Lawyer ${city} NC | Vasquez Law Firm`,
      description: `Looking for an immigration lawyer in ${city}? Vasquez Law Firm provides experienced immigration, personal injury, and criminal defense services. Call 1-844-YO-PELEO.`,
      content: `Vasquez Law Firm serves ${city} and surrounding areas with comprehensive legal services...`,
    }));
  }

  generateBlogPostIdeas() {
    return {
      immigration: [
        'New Immigration Laws 2024: What You Need to Know',
        'Green Card Timeline: Step-by-Step Process Guide',
        'Common Immigration Application Mistakes to Avoid',
        'DACA Updates: Latest News and Requirements',
        'Marriage-Based Green Card: Complete Guide',
      ],
      personalInjury: [
        'What to Do After a Car Accident in Charlotte',
        'How Much is My Personal Injury Case Worth?',
        'North Carolina Car Insurance Requirements Explained',
        'Slip and Fall Accidents: Know Your Rights',
        'Hiring a Personal Injury Lawyer: What to Expect',
      ],
      general: [
        'Finding the Right Lawyer in Charlotte NC',
        'Legal Rights for Spanish Speakers in North Carolina',
        'Free Legal Consultation: What to Bring',
        'Understanding Attorney Fees and Payment Plans',
      ],
    };
  }
}

// Run the optimizer
async function main() {
  console.log('Starting SEO optimization of existing content...\n');

  const optimizer = new SEOOptimizer();
  const results = await optimizer.optimizeAllContent();

  console.log('\n✅ SEO Optimization Complete!');
  console.log('\nNext steps:');
  console.log('1. Review optimized content in content-optimized/ directory');
  console.log('2. Copy optimized metadata to your page components');
  console.log('3. Implement structured data in your layouts');
  console.log('4. Update sitemap.xml with all pages');
  console.log('5. Submit sitemap to Google Search Console');
}

// Run if called directly
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { SEOOptimizer };
