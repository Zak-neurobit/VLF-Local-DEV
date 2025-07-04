import fs from 'fs';
import path from 'path';
import { ncCities } from '../src/lib/seo/local-seo-generator';

const practiceAreas = [
  { name: 'Immigration Lawyer', slug: 'immigration-lawyer' },
  { name: 'Personal Injury Attorney', slug: 'personal-injury-attorney' },
  { name: 'Workers Compensation Lawyer', slug: 'workers-compensation-lawyer' },
  { name: 'Criminal Defense Attorney', slug: 'criminal-defense-attorney' },
  { name: 'Car Accident Lawyer', slug: 'car-accident-lawyer' },
];

// Generate practice area page content
const generatePracticeAreaPage = (citySlug: string, practiceArea: any) => {
  const cityName = citySlug.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');

  return `import { Metadata } from 'next';
import { LocationPageTemplate } from '@/components/locations/LocationPageTemplate';
import { ncCities, generateLocalMetadata, generateLocalBusinessSchema, generateReviewSchema } from '@/lib/seo/local-seo-generator';

export async function generateMetadata(): Promise<Metadata> {
  return generateLocalMetadata('${citySlug}', '${practiceArea.name}');
}

export default function ${cityName.replace(/[^a-zA-Z]/g, '')}${practiceArea.name.replace(/[^a-zA-Z]/g, '')}Page() {
  const cityData = ncCities['${citySlug}'];
  
  if (!cityData) {
    return <div>City data not found</div>;
  }

  const schemas = {
    localBusiness: generateLocalBusinessSchema('${citySlug}', '${practiceArea.name}'),
    breadcrumbs: {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': [
        {
          '@type': 'ListItem',
          'position': 1,
          'name': 'Home',
          'item': 'https://www.vasquezlawnc.com'
        },
        {
          '@type': 'ListItem',
          'position': 2,
          'name': 'Locations',
          'item': 'https://www.vasquezlawnc.com/locations'
        },
        {
          '@type': 'ListItem',
          'position': 3,
          'name': 'North Carolina',
          'item': 'https://www.vasquezlawnc.com/locations/nc'
        },
        {
          '@type': 'ListItem',
          'position': 4,
          'name': cityData.city,
          'item': \`https://www.vasquezlawnc.com/locations/nc/${citySlug}\`
        },
        {
          '@type': 'ListItem',
          'position': 5,
          'name': '${practiceArea.name}',
          'item': \`https://www.vasquezlawnc.com/locations/nc/${citySlug}/${practiceArea.slug}\`
        }
      ]
    },
    faqs: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': [
        {
          '@type': 'Question',
          'name': \`How much does a ${practiceArea.name.toLowerCase()} cost in \${cityData.city}, NC?\`,
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': \`At Vasquez Law Firm, we offer transparent pricing for ${practiceArea.name.toLowerCase()} services in \${cityData.city}. We provide free consultations and flexible payment plans. Many cases are handled on a contingency basis, meaning you pay nothing unless we win.\`
          }
        },
        {
          '@type': 'Question',
          'name': \`How long does it take to resolve a ${practiceArea.name.toLowerCase().replace(' lawyer', '').replace(' attorney', '')} case in \${cityData.county} County?\`,
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': \`Case timelines vary depending on complexity. Simple cases may resolve in a few months, while complex matters can take longer. During your free consultation, we'll provide a realistic timeline for your specific situation in \${cityData.city}.\`
          }
        },
        {
          '@type': 'Question',
          'name': \`Do you speak Spanish at your \${cityData.city} office?\`,
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Yes! Our entire team is bilingual. We provide full legal services in both English and Spanish, including document translation and interpretation services. "YO PELEO POR TI™" - We fight for you!'
          }
        }
      ]
    },
    reviews: generateReviewSchema('${citySlug}')
  };

  return <LocationPageTemplate data={cityData} schemas={schemas} />;
}`;
};

// Generate main city page content (updated version)
const generateMainCityPage = (citySlug: string) => {
  const cityName = citySlug.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');

  return `import { Metadata } from 'next';
import { LocationPageTemplate } from '@/components/locations/LocationPageTemplate';
import { ncCities, generateLocalMetadata, generateLocalBusinessSchema, generateReviewSchema } from '@/lib/seo/local-seo-generator';

export async function generateMetadata(): Promise<Metadata> {
  return generateLocalMetadata('${citySlug}');
}

export default function ${cityName.replace(/[^a-zA-Z]/g, '')}Page() {
  const cityData = ncCities['${citySlug}'];
  
  if (!cityData) {
    return <div>City data not found</div>;
  }

  const schemas = {
    localBusiness: generateLocalBusinessSchema('${citySlug}'),
    breadcrumbs: {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': [
        {
          '@type': 'ListItem',
          'position': 1,
          'name': 'Home',
          'item': 'https://www.vasquezlawnc.com'
        },
        {
          '@type': 'ListItem',
          'position': 2,
          'name': 'Locations',
          'item': 'https://www.vasquezlawnc.com/locations'
        },
        {
          '@type': 'ListItem',
          'position': 3,
          'name': 'North Carolina',
          'item': 'https://www.vasquezlawnc.com/locations/nc'
        },
        {
          '@type': 'ListItem',
          'position': 4,
          'name': cityData.city,
          'item': \`https://www.vasquezlawnc.com/locations/nc/${citySlug}\`
        }
      ]
    },
    faqs: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': [
        {
          '@type': 'Question',
          'name': \`What legal services does Vasquez Law Firm offer in \${cityData.city}, NC?\`,
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': \`We provide comprehensive legal services in \${cityData.city} including immigration law, personal injury, workers compensation, criminal defense, and family law. Our bilingual team serves all of \${cityData.county} County with 24/7 availability.\`
          }
        },
        {
          '@type': 'Question',
          'name': \`How can I schedule a free consultation in \${cityData.city}?\`,
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': \`Call us at 1-844-YO-PELEO (1-844-967-3536) for a free consultation. We offer in-person meetings in \${cityData.city}, video consultations, and phone consultations. Hablamos español.\`
          }
        },
        {
          '@type': 'Question',
          'name': \`What courts does Vasquez Law Firm practice in near \${cityData.city}?\`,
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': \`We regularly practice in \${cityData.courtInfo.superior}, \${cityData.courtInfo.district}\${cityData.courtInfo.federal ? ', and ' + cityData.courtInfo.federal : ''}. Our attorneys have extensive experience with local judges and procedures.\`
          }
        }
      ]
    },
    reviews: generateReviewSchema('${citySlug}')
  };

  return <LocationPageTemplate data={cityData} schemas={schemas} />;
}`;
};

// Main generation function
async function generatePages() {
  const baseDir = path.join(process.cwd(), 'src/app/locations/nc');
  let generatedCount = 0;
  let skippedCount = 0;

  console.log('🚀 Starting NC location page generation...\n');

  // Get all city slugs from ncCities
  const cityEntries = Object.entries(ncCities);

  for (const [citySlug, cityData] of cityEntries) {
    const cityDir = path.join(baseDir, citySlug);
    
    // Update main city page (overwrite existing)
    const mainPagePath = path.join(cityDir, 'page.tsx');
    const mainPageContent = generateMainCityPage(citySlug);
    
    try {
      fs.writeFileSync(mainPagePath, mainPageContent);
      console.log(`✅ Updated main page: ${citySlug}/page.tsx`);
      generatedCount++;
    } catch (error) {
      console.error(`❌ Error updating ${citySlug}/page.tsx:`, error);
    }

    // Generate practice area pages
    for (const practiceArea of practiceAreas) {
      const practiceDir = path.join(cityDir, practiceArea.slug);
      const practicePagePath = path.join(practiceDir, 'page.tsx');
      
      // Check if directory exists, create if not
      if (!fs.existsSync(practiceDir)) {
        fs.mkdirSync(practiceDir, { recursive: true });
      }
      
      // Generate the page
      const pageContent = generatePracticeAreaPage(citySlug, practiceArea);
      
      try {
        fs.writeFileSync(practicePagePath, pageContent);
        console.log(`✅ Generated: ${citySlug}/${practiceArea.slug}/page.tsx`);
        generatedCount++;
      } catch (error) {
        console.error(`❌ Error generating ${citySlug}/${practiceArea.slug}/page.tsx:`, error);
      }
    }
    
    console.log(''); // Empty line between cities
  }

  console.log('\n📊 Generation Summary:');
  console.log(`✅ Total pages generated/updated: ${generatedCount}`);
  console.log(`🏆 Cities processed: ${cityEntries.length}`);
  console.log(`📁 Practice areas per city: ${practiceAreas.length}`);
  console.log(`📄 Total expected pages: ${cityEntries.length * (practiceAreas.length + 1)}`);
}

// Run the generator
generatePages().catch(console.error);