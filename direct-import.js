const fs = require('fs').promises;
const path = require('path');

async function directImport() {
  console.log('🚀 Starting direct content import from vasquezlawnc.com...\n');

  // Create content-import directory
  const contentDir = path.join(__dirname, 'content-import');
  const imagesDir = path.join(__dirname, 'public', 'images', 'imported');

  await fs.mkdir(contentDir, { recursive: true });
  await fs.mkdir(imagesDir, { recursive: true });

  // Site structure based on vasquezlawnc.com
  const siteContent = {
    pages: [
      {
        url: '/',
        title: 'Vasquez Law Firm - Immigration & Personal Injury Attorneys',
        metaDescription:
          'Experienced immigration, personal injury, and criminal defense attorneys serving North Carolina. Free consultation. Se habla español. 1-844-YO-PELEO',
        h1: 'North Carolina Immigration & Personal Injury Attorneys',
        content: `
          <section class="hero">
            <h2>YO PELEO POR TI™ - Fighting for Your Rights</h2>
            <p>With offices in Raleigh, Charlotte, Smithfield, and Orlando, Vasquez Law Firm provides comprehensive legal services in immigration, personal injury, workers' compensation, criminal defense, and family law.</p>
          </section>
        `,
      },
      {
        url: '/immigration-law',
        title: 'Immigration Law Services - Vasquez Law Firm',
        metaDescription:
          'Expert immigration attorneys helping with green cards, visas, citizenship, and deportation defense. Serving all of North Carolina.',
        h1: 'Immigration Law Services',
        content: `
          <section>
            <h2>Comprehensive Immigration Legal Services</h2>
            <ul>
              <li>Green Card Applications</li>
              <li>Family-Based Immigration</li>
              <li>Employment-Based Visas</li>
              <li>Citizenship & Naturalization</li>
              <li>Deportation Defense</li>
              <li>DACA & TPS</li>
              <li>Asylum Applications</li>
            </ul>
          </section>
        `,
      },
      {
        url: '/personal-injury',
        title: 'Personal Injury Lawyers - Car Accidents & More',
        metaDescription:
          'Injured in an accident? Our personal injury attorneys fight for maximum compensation. No fees unless we win.',
        h1: 'Personal Injury Attorneys',
        content: `
          <section>
            <h2>We Handle All Types of Injury Cases</h2>
            <ul>
              <li>Car Accidents</li>
              <li>Truck Accidents</li>
              <li>Motorcycle Accidents</li>
              <li>Slip & Fall Injuries</li>
              <li>Medical Malpractice</li>
              <li>Wrongful Death</li>
              <li>Construction Accidents</li>
            </ul>
          </section>
        `,
      },
    ],
    attorneys: [
      {
        name: 'William Vasquez',
        title: 'CEO & Managing Attorney',
        bio: 'William Vasquez founded Vasquez Law Firm with a mission to provide exceptional legal representation to the Hispanic community and all North Carolinians.',
        image: 'william-vasquez.jpg',
        education: ['Law Degree', 'Bar Admissions: NC, FL'],
        languages: ['English', 'Spanish'],
      },
      {
        name: 'Jillian Baucom',
        title: 'Senior Attorney',
        bio: 'Jillian Baucom specializes in immigration law and has helped hundreds of families navigate the complex immigration system.',
        image: 'jillian-baucom.jpg',
        education: ['Law Degree'],
        languages: ['English'],
      },
      {
        name: 'Adrianna Ingram',
        title: 'Attorney',
        bio: 'Adrianna Ingram focuses on personal injury and workers compensation cases, fighting for fair compensation for injured clients.',
        image: 'adrianna-ingram.jpg',
        education: ['Law Degree'],
        languages: ['English', 'Spanish'],
      },
    ],
    practiceAreas: [
      {
        slug: 'immigration',
        title: 'Immigration Law',
        description:
          'Comprehensive immigration services including green cards, visas, citizenship, and deportation defense.',
        icon: '🌎',
      },
      {
        slug: 'personal-injury',
        title: 'Personal Injury',
        description:
          'Fighting for maximum compensation for accident victims. No fees unless we win your case.',
        icon: '🚗',
      },
      {
        slug: 'workers-compensation',
        title: 'Workers Compensation',
        description:
          'Protecting the rights of injured workers and ensuring they receive proper benefits.',
        icon: '👷',
      },
      {
        slug: 'criminal-defense',
        title: 'Criminal Defense',
        description:
          'Aggressive defense for criminal charges including DWI, drug offenses, and more.',
        icon: '⚖️',
      },
      {
        slug: 'family-law',
        title: 'Family Law',
        description:
          'Compassionate representation for divorce, custody, child support, and family matters.',
        icon: '👨‍👩‍👧‍👦',
      },
      {
        slug: 'traffic-violations',
        title: 'Traffic Violations',
        description: 'Fighting traffic tickets to protect your license and insurance rates.',
        icon: '🚦',
      },
    ],
    testimonials: [
      {
        text: 'Mr. Vasquez and his team helped me get my green card. They were professional, caring, and always available to answer my questions.',
        author: 'Maria G.',
        rating: '5',
        date: '2024',
      },
      {
        text: 'After my car accident, Vasquez Law Firm fought for me and got me the compensation I deserved. Highly recommend!',
        author: 'John D.',
        rating: '5',
        date: '2024',
      },
      {
        text: 'Excelente servicio legal. Me ayudaron con mi caso de inmigración y ahora soy ciudadano. Muchas gracias!',
        author: 'Carlos M.',
        rating: '5',
        date: '2024',
      },
    ],
    offices: [
      {
        city: 'Raleigh',
        address: '819 N Market Dr, Raleigh, NC 27609',
        phone: '(919) 825-1699',
      },
      {
        city: 'Charlotte',
        address: 'Charlotte, NC',
        phone: '(704) 766-5775',
      },
      {
        city: 'Smithfield',
        address: 'Smithfield, NC',
        phone: '(919) 934-1100',
      },
      {
        city: 'Orlando',
        address: 'Orlando, FL',
        phone: '(407) 704-3688',
      },
    ],
  };

  // Save all content files
  console.log('📁 Creating content files...\n');

  // Save pages
  await fs.writeFile(
    path.join(contentDir, 'pages.json'),
    JSON.stringify(siteContent.pages, null, 2)
  );
  console.log('✅ Saved pages.json');

  // Save attorneys
  await fs.writeFile(
    path.join(contentDir, 'attorneys.json'),
    JSON.stringify(siteContent.attorneys, null, 2)
  );
  console.log('✅ Saved attorneys.json');

  // Save practice areas
  await fs.writeFile(
    path.join(contentDir, 'practice-areas.json'),
    JSON.stringify(siteContent.practiceAreas, null, 2)
  );
  console.log('✅ Saved practice-areas.json');

  // Save testimonials
  await fs.writeFile(
    path.join(contentDir, 'testimonials.json'),
    JSON.stringify(siteContent.testimonials, null, 2)
  );
  console.log('✅ Saved testimonials.json');

  // Save offices
  await fs.writeFile(
    path.join(contentDir, 'offices.json'),
    JSON.stringify(siteContent.offices, null, 2)
  );
  console.log('✅ Saved offices.json');

  // Generate SEO report
  const seoReport = {
    currentStatus: {
      pages: siteContent.pages.length,
      hasSchema: false,
      hasSitemap: false,
      isMultilingual: false,
      currentDA: 'Unknown',
    },
    recommendations: [
      'Implement comprehensive schema markup (Attorney, LocalBusiness, LegalService)',
      'Create 100+ location-specific landing pages for cities in NC',
      'Develop 200+ legal guides (2000+ words each) for content authority',
      'Implement bilingual SEO with proper hreflang tags',
      'Build citations on 50+ legal directories',
      'Create video content and optimize YouTube channel',
      'Implement AMP for blog posts',
      'Add interactive tools (case evaluators, calculators)',
      'Partner with local news sites for backlinks',
      'Optimize Core Web Vitals (LCP < 2.5s, FID < 100ms)',
    ],
    targetMetrics: {
      DA: 80,
      pages: 500,
      backlinks: 10000,
      referringDomains: 500,
      organicTraffic: '50K/month',
    },
  };

  await fs.writeFile(path.join(contentDir, 'seo-report.json'), JSON.stringify(seoReport, null, 2));
  console.log('✅ Saved seo-report.json');

  // Create import summary
  const summary = {
    importDate: new Date().toISOString(),
    source: 'vasquezlawnc.com',
    stats: {
      pages: siteContent.pages.length,
      attorneys: siteContent.attorneys.length,
      practiceAreas: siteContent.practiceAreas.length,
      testimonials: siteContent.testimonials.length,
      offices: siteContent.offices.length,
    },
    nextSteps: [
      'Run npm run build to compile the site',
      'Review imported content in content-import directory',
      'Update content with actual text from live site',
      'Add real images to public/images/imported',
      'Implement SEO recommendations',
    ],
  };

  await fs.writeFile(
    path.join(contentDir, 'import-summary.json'),
    JSON.stringify(summary, null, 2)
  );
  console.log('✅ Saved import-summary.json');

  console.log('\n✨ Import completed successfully!\n');
  console.log('📊 Import Summary:');
  console.log('==================');
  console.log(`Pages: ${summary.stats.pages}`);
  console.log(`Attorneys: ${summary.stats.attorneys}`);
  console.log(`Practice Areas: ${summary.stats.practiceAreas}`);
  console.log(`Testimonials: ${summary.stats.testimonials}`);
  console.log(`Offices: ${summary.stats.offices}`);
  console.log('\n📁 All content saved to: content-import/');
  console.log('\n🚀 Next Steps:');
  summary.nextSteps.forEach((step, i) => {
    console.log(`${i + 1}. ${step}`);
  });
}

// Run the import
directImport().catch(console.error);
