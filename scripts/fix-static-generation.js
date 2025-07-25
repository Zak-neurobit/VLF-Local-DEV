#!/usr/bin/env node

/**
 * Script to fix static generation issues and ensure ALL pages are built
 * This removes force-dynamic exports and updates generateStaticParams
 */

const fs = require('fs').promises;
const path = require('path');
const glob = require('glob').sync;

async function removeForceDynamic() {
  console.log('🔍 Finding all files with force-dynamic...');
  
  const files = glob('src/app/**/*.{ts,tsx}', {
    ignore: ['**/node_modules/**', '**/*.test.*', '**/*.spec.*']
  });
  
  let updatedCount = 0;
  
  for (const file of files) {
    try {
      let content = await fs.readFile(file, 'utf-8');
      const originalContent = content;
      
      // Remove force-dynamic export
      content = content.replace(/export\s+const\s+dynamic\s*=\s*['"]force-dynamic['"]\s*;?\s*\n?/g, '');
      
      // Remove dynamicParams = true
      content = content.replace(/export\s+const\s+dynamicParams\s*=\s*true\s*;?\s*\n?/g, '');
      
      // Remove fetchCache = 'force-no-store'
      content = content.replace(/export\s+const\s+fetchCache\s*=\s*['"]force-no-store['"]\s*;?\s*\n?/g, '');
      
      // Change revalidate = false to revalidate = 3600 (1 hour)
      content = content.replace(/export\s+const\s+revalidate\s*=\s*false\s*;?/g, 'export const revalidate = 3600;');
      
      if (content !== originalContent) {
        await fs.writeFile(file, content);
        updatedCount++;
        console.log(`✅ Updated: ${file}`);
      }
    } catch (error) {
      console.error(`❌ Error processing ${file}:`, error.message);
    }
  }
  
  console.log(`\n✨ Updated ${updatedCount} files`);
}

async function updateCatchAllRoute() {
  console.log('\n🔧 Updating catch-all route...');
  
  const catchAllPath = 'src/app/[...catchAll]/page.tsx';
  
  const newContent = `import { Metadata } from 'next';
import { notFound } from 'next/navigation';

// Enable static generation with ISR
export const revalidate = 3600; // Revalidate every hour

// Generate all known routes at build time
export async function generateStaticParams() {
  // Return an empty array to let Next.js handle routes normally
  // This prevents the catch-all from interfering with other routes
  return [];
}

// Generate metadata dynamically
export async function generateMetadata({ params }: { params: { catchAll: string[] } }): Promise<Metadata> {
  const path = params.catchAll.join('/');
  
  // Handle location pages
  if (path.startsWith('locations/') || path.startsWith('ubicaciones/')) {
    const parts = path.split('/');
    const city = parts[2]?.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
    
    return {
      title: \`\${city} Attorneys | Vasquez Law Firm\`,
      description: \`Top-rated attorneys serving \${city}. Immigration, personal injury, criminal defense. Free consultation: 1-844-YO-PELEO\`,
    };
  }
  
  // Handle blog pages
  if (path.includes('blog/')) {
    return {
      title: 'Blog | Vasquez Law Firm',
      description: 'Legal insights and updates from Vasquez Law Firm',
    };
  }
  
  return {
    title: 'Vasquez Law Firm',
    description: 'Experienced attorneys serving North Carolina and Florida',
  };
}

// Catch-all page handler
export default async function CatchAllPage({ params }: { params: { catchAll: string[] } }) {
  // This should rarely be hit as most routes should have their own pages
  // Return 404 for truly unknown routes
  notFound();
}`;
  
  await fs.writeFile(catchAllPath, newContent);
  console.log('✅ Updated catch-all route');
}

async function updateLocationsCatchAll() {
  console.log('\n🔧 Updating locations catch-all route...');
  
  const locationsPath = 'src/app/locations/[...slug]/page.tsx';
  
  // First, let's get all the location pages that exist
  const locationFiles = glob('src/app/locations/**/*.tsx', {
    ignore: ['**/[...slug]/**', '**/layout.tsx', '**/loading.tsx', '**/error.tsx']
  });
  
  const locations = new Set();
  
  for (const file of locationFiles) {
    const relativePath = path.relative('src/app/locations', file);
    const parts = relativePath.split('/');
    
    if (parts.length >= 2) {
      const state = parts[0];
      const city = parts[1];
      if (state !== '[...slug]' && city && city.endsWith('.tsx')) {
        locations.add(`${state}/${city.replace('/page.tsx', '').replace('.tsx', '')}`);
      }
    }
  }
  
  const newContent = `import { notFound } from 'next/navigation';
import { Metadata } from 'next';

// Enable static generation with ISR
export const revalidate = 86400; // 24 hours

// Generate all known location pages at build time
export async function generateStaticParams() {
  // Get all location combinations
  const states = ['nc', 'fl'];
  const ncCities = [
    'charlotte', 'raleigh', 'durham', 'greensboro', 'winston-salem',
    'cary', 'apex', 'chapel-hill', 'concord', 'cornelius', 'davidson',
    'fayetteville', 'gastonia', 'hickory', 'high-point', 'huntersville',
    'indian-trail', 'kannapolis', 'matthews', 'mint-hill', 'monroe',
    'mooresville', 'smithfield', 'wilmington', 'asheville', 'boone',
    'burlington', 'carrboro', 'clayton', 'fuquay-varina', 'garner',
    'goldsboro', 'greenville', 'henderson', 'hendersonville', 'holly-springs',
    'hope-mills', 'jacksonville', 'kernersville', 'kinston', 'knightdale',
    'laurinburg', 'lenoir', 'lexington', 'louisburg', 'lumberton',
    'morganton', 'morrisville', 'mount-airy', 'mount-holly', 'new-bern',
    'newton', 'oxford', 'pine-level', 'pinehurst', 'pineville', 'princeton',
    'rocky-mount', 'rolesville', 'roxboro', 'salisbury', 'sanford',
    'selma', 'shelby', 'southern-pines', 'spring-lake', 'stallings',
    'statesville', 'thomasville', 'wake-forest', 'warrenton', 'waxhaw',
    'wendell', 'wilson', 'youngsville', 'zebulon', 'asheboro', 'albemarle',
    'aberdeen', 'belmont', 'benson', 'elizabeth-city', 'fort-liberty',
    'four-oaks', 'harrisburg'
  ];
  
  const flCities = [
    'orlando', 'tampa', 'miami', 'jacksonville', 'fort-lauderdale',
    'kissimmee', 'sanford', 'altamonte-springs', 'winter-park',
    'lake-mary', 'oviedo', 'apopka', 'casselberry', 'longwood',
    'maitland', 'winter-springs', 'ocoee', 'clermont', 'davenport'
  ];
  
  const services = [
    'immigration-lawyer',
    'personal-injury-attorney', 
    'criminal-defense-lawyer',
    'workers-comp-attorney',
    'car-accident-lawyer',
    'family-law-attorney',
    'dui-lawyer',
    'bankruptcy-attorney'
  ];
  
  const params = [];
  
  // Generate state/city combinations
  for (const city of ncCities) {
    params.push({ slug: ['nc', city] });
    
    // Add service pages for major cities
    if (['charlotte', 'raleigh', 'durham', 'greensboro', 'winston-salem'].includes(city)) {
      for (const service of services) {
        params.push({ slug: ['nc', city, service] });
      }
    }
  }
  
  for (const city of flCities) {
    params.push({ slug: ['fl', city] });
    
    // Add service pages for major cities
    if (['orlando', 'tampa', 'miami', 'jacksonville', 'kissimmee'].includes(city)) {
      for (const service of services) {
        params.push({ slug: ['fl', city, service] });
      }
    }
  }
  
  return params;
}

// Dynamic metadata generation
export async function generateMetadata({
  params,
}: {
  params: { slug: string[] };
}): Promise<Metadata> {
  const [state, city, service] = params.slug;

  if (!state || !city) {
    return {
      title: 'Locations | Vasquez Law Firm',
      description: 'Find Vasquez Law Firm offices near you.',
    };
  }

  const cityName = city
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  const stateUpper = state.toUpperCase();

  const baseTitle = \`\${cityName}, \${stateUpper}\`;
  const title = service
    ? \`\${service
        .split('-')
        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ')} in \${baseTitle}\`
    : \`\${baseTitle} Attorneys | Vasquez Law Firm\`;

  const description = service
    ? \`Expert \${service.replace(/-/g, ' ')} services in \${cityName}, \${stateUpper}. Free consultation: 1-844-YO-PELEO\`
    : \`Top-rated attorneys serving \${cityName}, \${stateUpper}. Immigration, personal injury, criminal defense, and workers' compensation. Free consultation: 1-844-YO-PELEO\`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: \`https://vasquezlawnc.com/locations/\${state}/\${city}\${service ? \`/\${service}\` : ''}\`,
    },
  };
}

// Location page component
export default async function LocationPage({ params }: { params: { slug: string[] } }) {
  const [state, city, service] = params.slug;

  if (!state || !city) {
    notFound();
  }

  // Import the appropriate component based on the location
  try {
    // Try to dynamically import the specific location component
    const locationModule = await import(\`@/app/locations/\${state}/\${city}/page\`);
    const LocationComponent = locationModule.default;
    return <LocationComponent />;
  } catch (error) {
    // If no specific component exists, render the generic template
    const cityName = city
      .split('-')
      .map(w => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');

    return (
      <div className="min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">
            {cityName}, {state.toUpperCase()}
          </h1>
          <p className="text-gray-600 mb-8">
            Contact Vasquez Law Firm at 1-844-YO-PELEO for legal assistance in your area.
          </p>
          
          {service && (
            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-4">
                {service
                  .split('-')
                  .map(w => w.charAt(0).toUpperCase() + w.slice(1))
                  .join(' ')} Services
              </h2>
              <p className="text-gray-600">
                Our experienced attorneys specialize in {service.replace(/-/g, ' ')} cases in {cityName}, {state.toUpperCase()}.
              </p>
            </div>
          )}

          <div className="mt-12 bg-blue-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Free Consultation</h3>
            <p className="mb-4">Get expert legal advice for your case.</p>
            <a
              href="/contact"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
            >
              Schedule Consultation
            </a>
          </div>
        </div>
      </div>
    );
  }
}`;
  
  await fs.writeFile(locationsPath, newContent);
  console.log('✅ Updated locations catch-all route');
}

async function updateBuildOverride() {
  console.log('\n🔧 Removing build override limitations...');
  
  const buildOverridePath = 'build-override.js';
  
  const newContent = `// Build override - now allows ALL pages to be statically generated
// This file no longer limits static generation

console.log('🚀 Full static generation enabled - building ALL pages');

// Export empty config to maintain compatibility
module.exports = {
  ALLOWED_STATIC_PATHS: [], // No restrictions
};`;
  
  await fs.writeFile(buildOverridePath, newContent);
  console.log('✅ Updated build-override.js');
}

async function updateProductionConfig() {
  console.log('\n🔧 Updating production config...');
  
  const prodConfigPath = 'next.config.production.js';
  
  const newContent = `// Production-optimized Next.js configuration
const baseConfig = require('./next.config.js');

module.exports = {
  ...baseConfig,
  
  // Enable full static generation
  experimental: {
    ...baseConfig.experimental,
    // Use more workers for faster builds
    workerThreads: true,
    cpus: 8,
    
    // Increase memory for large builds
    isrMemoryCacheSize: 256 * 1024 * 1024, // 256MB
    
    // Allow larger page data
    largePageDataBytes: 512 * 1024, // 512KB
  },
  
  // Custom headers for better caching
  async headers() {
    const baseHeaders = baseConfig.headers ? await baseConfig.headers() : [];
    
    return [
      ...baseHeaders,
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, stale-while-revalidate=86400',
          },
        ],
      },
    ];
  },
  
  // Generate build ID for cache busting
  generateBuildId: async () => {
    return process.env.VERCEL_GIT_COMMIT_SHA || \`build-\${Date.now()}\`;
  },
};`;
  
  await fs.writeFile(prodConfigPath, newContent);
  console.log('✅ Updated production config');
}

async function main() {
  console.log('🚀 Starting static generation fix...\n');
  
  await removeForceDynamic();
  await updateCatchAllRoute();
  await updateLocationsCatchAll();
  await updateBuildOverride();
  await updateProductionConfig();
  
  console.log('\n✨ Static generation fix complete!');
  console.log('\nNext steps:');
  console.log('1. Run: npm run build');
  console.log('2. Check the build output to verify all pages are being statically generated');
  console.log('3. Deploy to see the improvements in production');
}

main().catch(console.error);