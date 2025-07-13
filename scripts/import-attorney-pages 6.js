const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs').promises;
const path = require('path');

const OLD_SITE_URL = 'https://www.vasquezlawnc.com';

// Known attorneys from the old site
const KNOWN_ATTORNEYS = [
  { name: 'William G. Vasquez', slug: 'william-vasquez', url: '/william-vasquez-attorney' },
  { name: 'Judith Parkes', slug: 'judith-parkes', url: '/judith-parkes' },
  { name: 'Adrianna Ingram', slug: 'adrianna-ingram', url: '/adrianna-ingram' },
  { name: 'Christopher Afanador', slug: 'christopher-afanador', url: '/christopher-afanador' },
  { name: 'Mark Kelsey', slug: 'mark-kelsey', url: '/mark-kelsey' },
  { name: 'Jillian Baucom', slug: 'jillian-baucom', url: '/jillian-baucom' },
  { name: 'Roselyn V. Torrellas', slug: 'roselyn-torrellas', url: '/roselyn-torrellas' },
];

async function fetchAttorneyData(attorneyUrl) {
  try {
    console.log(`Fetching data for: ${attorneyUrl}`);
    const response = await axios.get(`${OLD_SITE_URL}${attorneyUrl}`, {
      headers: { 'User-Agent': 'Mozilla/5.0' },
      timeout: 15000,
    });

    const $ = cheerio.load(response.data);

    // Extract attorney information
    const name =
      $('h1').first().text().trim() ||
      $('.attorney-name').text().trim() ||
      $('title').text().split('|')[0].trim();

    const title = $('.attorney-title').text().trim() || $('.position').text().trim() || 'Attorney';

    // Extract bio content
    const bioElements = $('.attorney-bio, .content-area, .entry-content, article').first();
    let bio = '';
    if (bioElements.length) {
      // Clean up the HTML
      bioElements.find('script, style').remove();
      bio = bioElements.html() || '';
    }

    // Extract education
    const education = [];
    $('.education li, .education-item').each((i, elem) => {
      const text = $(elem).text().trim();
      if (text) education.push(text);
    });

    // Extract bar admissions
    const barAdmissions = [];
    $('.bar-admissions li, .admissions li').each((i, elem) => {
      const text = $(elem).text().trim();
      if (text) barAdmissions.push(text);
    });

    // Extract practice areas
    const practiceAreas = [];
    $('.practice-areas li, .areas-of-practice li').each((i, elem) => {
      const text = $(elem).text().trim();
      if (text) practiceAreas.push(text);
    });

    // Extract languages
    const languages = [];
    $('.languages li, .language-item').each((i, elem) => {
      const text = $(elem).text().trim();
      if (text) languages.push(text);
    });

    // Extract contact info
    const email =
      $('.email a').text().trim() ||
      $('a[href^="mailto:"]').first().attr('href')?.replace('mailto:', '') ||
      '';

    const phone = $('.phone').text().trim() || $('a[href^="tel:"]').first().text().trim() || '';

    // Extract image
    const imageUrl =
      $('.attorney-photo img, .attorney-image img, .wp-post-image').first().attr('src') || '';

    return {
      name,
      title,
      bio,
      education,
      barAdmissions,
      practiceAreas,
      languages,
      email,
      phone,
      imageUrl,
      originalUrl: attorneyUrl,
    };
  } catch (error) {
    console.error(`Error fetching ${attorneyUrl}:`, error.message);
    return null;
  }
}

async function generateAttorneyPage(attorneyData, slug) {
  const {
    name,
    title,
    bio,
    education,
    barAdmissions,
    practiceAreas,
    languages,
    email,
    phone,
    imageUrl,
  } = attorneyData;

  // Convert HTML bio to clean text
  const $ = cheerio.load(bio);
  const cleanBio = $('p')
    .map((i, elem) => $(elem).text().trim())
    .get()
    .join('\n\n');

  const pageContent = `import { Metadata } from 'next';
import PageLayout from '@/components/Layout/PageLayout';
import Section from '@/components/UI/Section';
import { Card, CardContent } from '@/components/UI/Card';
import { Phone, Mail, Globe, Scale, GraduationCap, Award, Building } from 'lucide-react';

export const metadata: Metadata = {
  title: '${name} | ${title} | Vasquez Law Firm, PLLC',
  description: 'Learn about ${name}, ${title} at Vasquez Law Firm. ${practiceAreas.length > 0 ? `Practicing in ${practiceAreas.slice(0, 3).join(', ')}.` : 'Experienced attorney serving North Carolina and Florida.'}',
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/attorneys/${slug}'
  }
};

export default function ${name.replace(/[^a-zA-Z]/g, '')}AttorneyPage() {
  return (
    <PageLayout>
      <Section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Attorney Photo and Contact Card */}
              <div className="lg:col-span-1">
                <Card className="sticky top-24">
                  <CardContent className="p-6">
                    ${
                      imageUrl
                        ? `
                    <div className="mb-6">
                      <img 
                        src="${imageUrl}" 
                        alt="${name}"
                        className="w-full rounded-lg shadow-md"
                      />
                    </div>
                    `
                        : `
                    <div className="mb-6 bg-gray-200 rounded-lg aspect-[3/4] flex items-center justify-center">
                      <div className="text-6xl text-gray-400">👤</div>
                    </div>
                    `
                    }
                    
                    <h1 className="text-2xl font-bold text-brand-charcoal mb-2">${name}</h1>
                    <p className="text-brand-crimson font-semibold mb-6">${title}</p>
                    
                    {/* Contact Information */}
                    <div className="space-y-3 mb-6">
                      ${
                        phone
                          ? `
                      <a 
                        href="tel:${phone.replace(/[^0-9]/g, '')}" 
                        className="flex items-center text-gray-700 hover:text-brand-skyblue transition-colors"
                      >
                        <Phone className="w-4 h-4 mr-3 text-brand-skyblue" />
                        <span>${phone}</span>
                      </a>
                      `
                          : ''
                      }
                      
                      ${
                        email
                          ? `
                      <a 
                        href="mailto:${email}" 
                        className="flex items-center text-gray-700 hover:text-brand-skyblue transition-colors"
                      >
                        <Mail className="w-4 h-4 mr-3 text-brand-skyblue" />
                        <span className="break-all">${email}</span>
                      </a>
                      `
                          : ''
                      }
                      
                      ${
                        languages.length > 0
                          ? `
                      <div className="flex items-start">
                        <Globe className="w-4 h-4 mr-3 text-brand-skyblue mt-0.5" />
                        <div>
                          <span className="text-gray-700">${languages.join(', ')}</span>
                        </div>
                      </div>
                      `
                          : ''
                      }
                    </div>
                    
                    <a
                      href="/free-consultation"
                      className="block w-full bg-brand-crimson text-white text-center py-3 rounded-lg font-semibold hover:bg-brand-crimson/90 transition-colors"
                    >
                      Schedule Consultation
                    </a>
                  </CardContent>
                </Card>
              </div>
              
              {/* Attorney Bio and Details */}
              <div className="lg:col-span-2">
                <Card>
                  <CardContent className="p-8">
                    <h2 className="text-3xl font-bold text-brand-charcoal mb-6">
                      About ${name.split(' ')[0]}
                    </h2>
                    
                    <div className="prose prose-lg max-w-none text-gray-700 mb-8">
                      ${cleanBio
                        .split('\n\n')
                        .map(p => `<p>${p}</p>`)
                        .join('\n                      ')}
                    </div>
                    
                    ${
                      practiceAreas.length > 0
                        ? `
                    {/* Practice Areas */}
                    <div className="mb-8">
                      <h3 className="text-xl font-bold text-brand-charcoal mb-4 flex items-center">
                        <Scale className="w-5 h-5 mr-2 text-brand-skyblue" />
                        Practice Areas
                      </h3>
                      <div className="grid md:grid-cols-2 gap-3">
                        ${practiceAreas
                          .map(
                            area => `
                        <div className="flex items-center">
                          <div className="w-2 h-2 bg-brand-skyblue rounded-full mr-3"></div>
                          <span className="text-gray-700">${area}</span>
                        </div>
                        `
                          )
                          .join('')}
                      </div>
                    </div>
                    `
                        : ''
                    }
                    
                    ${
                      education.length > 0
                        ? `
                    {/* Education */}
                    <div className="mb-8">
                      <h3 className="text-xl font-bold text-brand-charcoal mb-4 flex items-center">
                        <GraduationCap className="w-5 h-5 mr-2 text-brand-skyblue" />
                        Education
                      </h3>
                      <ul className="space-y-2">
                        ${education
                          .map(
                            edu => `
                        <li className="text-gray-700">• ${edu}</li>
                        `
                          )
                          .join('')}
                      </ul>
                    </div>
                    `
                        : ''
                    }
                    
                    ${
                      barAdmissions.length > 0
                        ? `
                    {/* Bar Admissions */}
                    <div className="mb-8">
                      <h3 className="text-xl font-bold text-brand-charcoal mb-4 flex items-center">
                        <Award className="w-5 h-5 mr-2 text-brand-skyblue" />
                        Bar Admissions
                      </h3>
                      <ul className="space-y-2">
                        ${barAdmissions
                          .map(
                            bar => `
                        <li className="text-gray-700">• ${bar}</li>
                        `
                          )
                          .join('')}
                      </ul>
                    </div>
                    `
                        : ''
                    }
                  </CardContent>
                </Card>
                
                {/* Call to Action */}
                <Card className="mt-8 bg-brand-skyblue text-white">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold mb-4">
                      Ready to Discuss Your Case?
                    </h3>
                    <p className="mb-6 text-white/90">
                      ${name.split(' ')[0]} is ready to provide the experienced legal representation you need. 
                      Contact us today to schedule your consultation.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <a
                        href="/free-consultation"
                        className="bg-white text-brand-skyblue px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-center"
                      >
                        Schedule Consultation
                      </a>
                      <a
                        href="tel:7043580470"
                        className="bg-brand-skyblue text-white px-6 py-3 rounded-lg font-semibold border-2 border-white hover:bg-brand-skyblue/80 transition-colors text-center"
                      >
                        Call (704) 358-0470
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </PageLayout>
  );
}`;

  return pageContent;
}

async function importAttorneyPages() {
  console.log('🚀 Starting attorney page import...\n');

  const importResults = [];

  for (const attorney of KNOWN_ATTORNEYS) {
    console.log(`\n📋 Processing: ${attorney.name}`);

    // Check if page already exists
    const pagePath = path.join(process.cwd(), 'src/app/attorneys', attorney.slug, 'page.tsx');

    try {
      await fs.access(pagePath);
      console.log(`  ✅ Page already exists for ${attorney.name}`);
      importResults.push({
        attorney: attorney.name,
        status: 'exists',
        path: pagePath,
      });
      continue;
    } catch (err) {
      // Page doesn't exist, proceed with import
    }

    // Fetch attorney data
    const attorneyData = await fetchAttorneyData(attorney.url);

    if (!attorneyData) {
      console.log(`  ❌ Failed to fetch data for ${attorney.name}`);
      importResults.push({
        attorney: attorney.name,
        status: 'failed',
        error: 'Could not fetch data',
      });
      continue;
    }

    // Generate page content
    const pageContent = await generateAttorneyPage(attorneyData, attorney.slug);

    // Create directory
    const dirPath = path.join(process.cwd(), 'src/app/attorneys', attorney.slug);
    await fs.mkdir(dirPath, { recursive: true });

    // Write page file
    await fs.writeFile(pagePath, pageContent);

    console.log(`  ✅ Created page for ${attorney.name}`);
    importResults.push({
      attorney: attorney.name,
      status: 'created',
      path: pagePath,
      data: attorneyData,
    });

    // Save metadata
    const metadataPath = path.join(dirPath, 'metadata.json');
    await fs.writeFile(metadataPath, JSON.stringify(attorneyData, null, 2));

    // Rate limiting
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  // Summary report
  console.log('\n' + '='.repeat(60));
  console.log('\n📊 Import Summary:');
  console.log(`   Total attorneys: ${KNOWN_ATTORNEYS.length}`);
  console.log(`   Already exists: ${importResults.filter(r => r.status === 'exists').length}`);
  console.log(`   Created: ${importResults.filter(r => r.status === 'created').length}`);
  console.log(`   Failed: ${importResults.filter(r => r.status === 'failed').length}`);

  // Save report
  const reportPath = path.join(process.cwd(), 'attorney-import-report.json');
  await fs.writeFile(
    reportPath,
    JSON.stringify(
      {
        importDate: new Date().toISOString(),
        results: importResults,
      },
      null,
      2
    )
  );

  console.log(`\n📄 Full report saved to: ${reportPath}`);
}

// Run import
importAttorneyPages().catch(console.error);
