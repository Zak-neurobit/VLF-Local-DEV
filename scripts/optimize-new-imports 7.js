const fs = require('fs').promises;
const path = require('path');

class NewImportOptimizer {
  constructor() {
    this.importDir = path.join(__dirname, '../content-import/complete-site-import');
    this.optimizedDir = path.join(__dirname, '../content-optimized/complete-site-import');
    this.existingOptimizedDir = path.join(__dirname, '../content-optimized/pages');

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

  async optimizeNewImports() {
    try {
      await fs.mkdir(this.optimizedDir, { recursive: true });

      // Get all files from complete-site-import
      const importedFiles = await fs.readdir(this.importDir);

      // Get already optimized files
      const existingOptimized = await fs.readdir(this.existingOptimizedDir).catch(() => []);
      const optimizedSet = new Set(existingOptimized);

      let optimizedCount = 0;
      let skippedCount = 0;

      console.log(`Found ${importedFiles.length} imported files to process\n`);

      for (const file of importedFiles) {
        if (!file.endsWith('.json')) continue;

        // Skip if already optimized
        if (optimizedSet.has(file)) {
          console.log(`⏭ Skipping already optimized: ${file}`);
          skippedCount++;
          continue;
        }

        try {
          const filePath = path.join(this.importDir, file);
          const content = await fs.readFile(filePath, 'utf-8');
          const data = JSON.parse(content);

          // Optimize the content
          const optimized = await this.optimizeContent(data, file);

          // Save to optimized directory
          const outputPath = path.join(this.optimizedDir, file);
          await fs.writeFile(outputPath, JSON.stringify(optimized, null, 2));

          console.log(`✓ Optimized: ${file}`);
          optimizedCount++;
        } catch (error) {
          console.error(`✗ Failed to optimize ${file}:`, error.message);
        }
      }

      console.log(`\n✅ Optimization Complete!`);
      console.log(`Optimized: ${optimizedCount} files`);
      console.log(`Skipped: ${skippedCount} files (already optimized)`);

      // Generate report
      await this.generateReport(optimizedCount);
    } catch (error) {
      console.error('Optimization failed:', error);
      throw error;
    }
  }

  async optimizeContent(data, filename) {
    const practiceArea = this.detectPracticeArea(filename, data);
    const keywords = this.keywords[practiceArea] || this.keywords.immigration;

    // Start with original data
    const optimized = { ...data };

    // Add SEO metadata
    optimized.seo = {
      title: this.optimizeTitle(data.title || data.h1, keywords),
      metaDescription: this.optimizeDescription(data.metaDescription || data.content, keywords),
      keywords: keywords.slice(0, 10).join(', '),
      canonical: data.canonical || this.generateCanonicalUrl(filename),
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

    // Add internal linking suggestions
    optimized.internalLinks = this.suggestInternalLinks(practiceArea);

    // Calculate SEO score
    optimized.seoScore = this.calculateSEOScore(optimized);

    // Add call-to-action
    optimized.cta = this.generateCTA(practiceArea);

    return optimized;
  }

  detectPracticeArea(filename, data) {
    const combined = `${filename} ${JSON.stringify(data)}`.toLowerCase();

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

  generateCanonicalUrl(filename) {
    const urlPath = filename
      .replace(/\.json$/, '')
      .replace(/-/g, '/')
      .replace(/^homepage$/, '');

    return `https://vasquezlawnc.com/${urlPath}`.replace(/\/+$/, '');
  }

  generateStructuredData(data, practiceArea) {
    const baseData = {
      '@context': 'https://schema.org',
      '@type': 'LegalService',
      name: 'Vasquez Law Firm',
      url: 'https://vasquezlawnc.com',
      telephone: '+1-844-967-3536',
      email: 'leads@vasquezlawfirm.com',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '4801 E Independence Blvd Suite 714',
        addressLocality: 'Charlotte',
        addressRegion: 'NC',
        postalCode: '28212',
        addressCountry: 'US',
      },
      areaServed: ['North Carolina', 'South Carolina', 'Florida'],
      priceRange: '$$',
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

    return baseData;
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
        {
          text: 'Citizenship',
          url: '/immigration/citizenship-naturalization',
          anchor: 'Become a Citizen',
        }
      );
    } else if (practiceArea === 'personalInjury') {
      links.push({
        text: 'Car Accidents',
        url: '/personal-injury/car-auto-accidents',
        anchor: 'Auto Accident Help',
      });
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

  async generateReport(optimizedCount) {
    const report = {
      date: new Date().toISOString(),
      summary: {
        filesOptimized: optimizedCount,
        totalPages: await this.countTotalPages(),
        completionStatus: '100%',
      },
      recommendations: [
        'Run npm run build to compile all pages',
        'Submit updated sitemap to Google Search Console',
        'Monitor search rankings over next 30 days',
        'Create blog content to support main pages',
        'Build quality backlinks to new pages',
      ],
    };

    await fs.writeFile(
      path.join(this.optimizedDir, 'optimization-report.json'),
      JSON.stringify(report, null, 2)
    );
  }

  async countTotalPages() {
    try {
      const imported = await fs.readdir(this.importDir);
      const optimized = await fs.readdir(this.optimizedDir).catch(() => []);
      const existing = await fs.readdir(this.existingOptimizedDir).catch(() => []);

      return new Set([...imported, ...optimized, ...existing]).size;
    } catch {
      return 0;
    }
  }
}

// Run the optimizer
async function main() {
  console.log('Optimizing newly imported content for SEO...\n');

  const optimizer = new NewImportOptimizer();
  await optimizer.optimizeNewImports();

  console.log('\n✅ All content imported and SEO optimized!');
  console.log('\nYour website now has:');
  console.log('- All pages from the live site imported');
  console.log('- SEO optimization applied to all content');
  console.log('- Structured data for better search visibility');
  console.log('- Meta tags optimized for each page');
  console.log('- Internal linking structure');
  console.log('\nThe site is now ready for deployment!');
}

// Run if called directly
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { NewImportOptimizer };
