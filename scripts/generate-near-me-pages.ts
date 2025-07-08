import fs from 'fs';
import path from 'path';
import { NEAR_ME_SERVICES, NEAR_ME_CITIES } from '../src/lib/seo/near-me-page-generator';

const NEAR_ME_DIR = path.join(process.cwd(), 'src/app/near-me');

// Template for near-me page
const nearMePageTemplate = (service: any, city: any) => {
  const componentName = `${city.name.replace(/[\s-]/g, '')}${service.service.replace(/[\s]/g, '')}NearMePage`;
  
  return `import { Metadata } from 'next';
import { NearMeLandingPageTemplate } from '@/components/templates/NearMeLandingPageTemplate';
import { generateNearMeMetadata, generateNearMeContent } from '@/lib/seo/near-me-page-generator';

const pageData = {
  service: '${service.service}',
  serviceSlug: '${service.slug}',
  city: '${city.name}',
  citySlug: '${city.slug}',
  state: 'NC',
  county: '${city.county}'
};

export const metadata: Metadata = generateNearMeMetadata(pageData);

export default function ${componentName}() {
  const content = generateNearMeContent(pageData);
  
  return (
    <NearMeLandingPageTemplate
      service={pageData.service}
      location={pageData.city}
      state={pageData.state}
      content={content}
    />
  );
}`;
};

// Generate all near-me pages
async function generateNearMePages() {
  console.log('🔍 Generating "Near Me" landing pages...\n');
  
  // Create near-me directory if it doesn't exist
  if (!fs.existsSync(NEAR_ME_DIR)) {
    fs.mkdirSync(NEAR_ME_DIR, { recursive: true });
    console.log('✅ Created near-me directory');
  }
  
  let totalCreated = 0;
  let totalSkipped = 0;
  
  for (const service of NEAR_ME_SERVICES) {
    console.log(`\n📋 Processing "${service.service}" pages...`);
    
    for (const city of NEAR_ME_CITIES) {
      const pageName = `${city.slug}-${service.slug}-near-me`;
      const pageDir = path.join(NEAR_ME_DIR, pageName);
      const pageFile = path.join(pageDir, 'page.tsx');
      
      // Create directory
      if (!fs.existsSync(pageDir)) {
        fs.mkdirSync(pageDir, { recursive: true });
      }
      
      // Check if page already exists
      if (fs.existsSync(pageFile)) {
        console.log(`⏭️  Skipping ${city.name} ${service.service} - page already exists`);
        totalSkipped++;
        continue;
      }
      
      // Generate and write the page
      const pageContent = nearMePageTemplate(service, city);
      fs.writeFileSync(pageFile, pageContent);
      console.log(`✅ Generated: ${service.service} Near Me in ${city.name}`);
      totalCreated++;
    }
  }
  
  // Create near-me hub page
  const hubFile = path.join(NEAR_ME_DIR, 'page.tsx');
  if (!fs.existsSync(hubFile)) {
    const hubContent = generateNearMeHubPage();
    fs.writeFileSync(hubFile, hubContent);
    console.log('\n✅ Generated Near Me hub page');
  }
  
  console.log(`\n✨ Near Me page generation complete!`);
  console.log(`Total pages created: ${totalCreated}`);
  console.log(`Total pages skipped: ${totalSkipped}`);
  console.log(`- ${NEAR_ME_SERVICES.length} services x ${NEAR_ME_CITIES.length} cities = ${NEAR_ME_SERVICES.length * NEAR_ME_CITIES.length} total pages`);
}

function generateNearMeHubPage() {
  return `import { Metadata } from 'next';
import Link from 'next/link';
import { Search, MapPin, Phone } from 'lucide-react';
import { NEAR_ME_SERVICES, NEAR_ME_CITIES } from '@/lib/seo/near-me-page-generator';

export const metadata: Metadata = {
  title: 'Lawyers Near Me in North Carolina | Find Legal Help Near You | Vasquez Law Firm',
  description: 'Find the best lawyers near you in NC. Immigration, personal injury, criminal defense, workers comp. 24/7 availability. Free consultation. Se habla español.',
  keywords: 'lawyers near me, attorneys near me, law firm near me, abogado cerca de mi, legal help near me'
};

export default function NearMeHubPage() {
  return (
    <div className="min-h-screen bg-black">
      <section className="py-20 bg-gradient-to-br from-primary/20 via-black to-secondary/10">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6">
              Find Legal Help Near You in North Carolina
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Top-rated attorneys available 24/7 across NC. Free consultation. 
              Se habla español. Choose your service and location below.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <a
                href="tel:1-844-967-3536"
                className="inline-flex items-center px-8 py-4 bg-primary text-black font-bold rounded-lg hover:bg-primary-300 transition-all"
              >
                <Phone className="mr-2" />
                Call Now: 1-844-YO-PELEO
              </a>
              <a
                href="/contact"
                className="inline-flex items-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-bold rounded-lg hover:bg-white/20 transition-all border border-white/20"
              >
                <MapPin className="mr-2" />
                Schedule Consultation
              </a>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-white text-center mb-12">
              Select Your Legal Service
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {NEAR_ME_SERVICES.map((service) => (
                <div key={service.slug} className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
                  <h3 className="text-2xl font-bold text-primary mb-4">{service.service}</h3>
                  <p className="text-gray-300 mb-6">
                    Find the best {service.service.toLowerCase()} near you in North Carolina.
                  </p>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-400">Available in:</p>
                    <div className="flex flex-wrap gap-2">
                      {NEAR_ME_CITIES.slice(0, 3).map((city) => (
                        <Link
                          key={city.slug}
                          href={\`/near-me/\${city.slug}-\${service.slug}-near-me\`}
                          className="text-sm px-3 py-1 bg-white/10 rounded-full hover:bg-primary hover:text-black transition-all"
                        >
                          {city.name}
                        </Link>
                      ))}
                      <span className="text-sm px-3 py-1 text-gray-400">
                        +{NEAR_ME_CITIES.length - 3} more
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <h2 className="text-3xl font-bold text-white text-center mb-12">
              Browse by City
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {NEAR_ME_CITIES.map((city) => (
                <div key={city.slug} className="text-center">
                  <h4 className="font-semibold text-white mb-3">{city.name}</h4>
                  <div className="space-y-2">
                    {NEAR_ME_SERVICES.slice(0, 3).map((service) => (
                      <Link
                        key={service.slug}
                        href={\`/near-me/\${city.slug}-\${service.slug}-near-me\`}
                        className="block text-sm text-gray-400 hover:text-primary transition-colors"
                      >
                        {service.service}
                      </Link>
                    ))}
                    <Link
                      href={\`/locations/nc/\${city.slug}\`}
                      className="block text-sm text-primary hover:text-primary-300 transition-colors font-semibold"
                    >
                      View All Services →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-gradient-to-r from-primary to-primary-300">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-black text-black mb-6">
              Can't Find What You're Looking For?
            </h2>
            <p className="text-xl text-black/80 mb-8">
              We serve all of North Carolina with every type of legal service. 
              Call us now for immediate help.
            </p>
            <a
              href="tel:1-844-967-3536"
              className="inline-flex items-center px-8 py-4 bg-black text-primary font-bold rounded-lg hover:bg-gray-900 transition-all"
            >
              <Phone className="mr-2" />
              Call 24/7: 1-844-YO-PELEO
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}`;
}

// Run the generator
generateNearMePages().catch(console.error);