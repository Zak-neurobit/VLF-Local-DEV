import { promises as fs } from 'fs';
import path from 'path';

interface LinkFix {
  file: string;
  oldLink: string;
  newLink: string;
  reason: string;
}

async function fixInvalidLinks() {
  const fixes: LinkFix[] = [];

  // Fix 1: Missing manifest.json
  await fs.writeFile(
    path.join(process.cwd(), 'public/manifest.json'),
    JSON.stringify(
      {
        name: 'Vasquez Law Firm',
        short_name: 'VLF',
        description: 'Immigration & Personal Injury Attorneys',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#6B1F2E',
        icons: [
          {
            src: '/icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
      null,
      2
    )
  );
  console.log('✅ Created manifest.json');

  // Fix 2: Create missing icon files directory
  await fs.mkdir(path.join(process.cwd(), 'public/icons'), { recursive: true });
  console.log('✅ Created icons directory');

  // Fix 3: Fix attorneys slug issue
  const attorneysFile = path.join(process.cwd(), 'src/components/AttorneysPageContent.tsx');
  let attorneysContent = await fs.readFile(attorneysFile, 'utf-8');

  // Add slug mapping for attorneys
  if (!attorneysContent.includes('const attorneySlugMap')) {
    const slugMapping = `
const attorneySlugMap: Record<string, string> = {
  'william-vasquez': 'william-vasquez',
  'adrianna-ingram': 'adrianna-ingram',
  'christopher-afanador': 'christopher-afanador',
  'jillian-baucom': 'jillian-baucom',
  'kelly-vega': 'kelly-vega',
  'mark-kelsey': 'mark-kelsey',
  'rebecca-sommer': 'rebecca-sommer',
  'roselyn-torrellas': 'roselyn-v-torrellas', // Note the different slug
  'judith-parkes': 'judith-parkes'
};
`;

    // Find where to insert the mapping
    const insertIndex = attorneysContent.indexOf('export default function AttorneysPageContent');
    attorneysContent =
      attorneysContent.slice(0, insertIndex) +
      slugMapping +
      '\n' +
      attorneysContent.slice(insertIndex);

    // Update the link generation
    attorneysContent = attorneysContent.replace(
      'href={`/attorneys/${attorney.slug}`}',
      'href={`/attorneys/${attorneySlugMap[attorney.slug] || attorney.slug}`}'
    );

    await fs.writeFile(attorneysFile, attorneysContent);
    fixes.push({
      file: 'src/components/AttorneysPageContent.tsx',
      oldLink: '/attorneys/${attorney.slug}',
      newLink: '/attorneys/${attorneySlugMap[attorney.slug] || attorney.slug}',
      reason: 'Fixed attorney slug mapping',
    });
  }

  // Fix 4: Update practice areas to use correct slugs
  const practiceAreaFiles = [
    'src/design-system/examples/ConsistentHomePage.tsx',
    'src/components/HomePage/PracticeAreasShowcase.tsx',
    'src/app/practice-areas/page-with-chat.tsx',
    'src/app/practice-areas/PracticeAreasContent.tsx',
  ];

  const practiceAreaMapping = {
    immigration: 'immigration',
    'personal-injury': 'personal-injury',
    'workers-compensation': 'workers-compensation',
    'criminal-defense': 'criminal-defense',
    'family-law': 'family-law',
    'traffic-violations': 'traffic-violations',
  };

  for (const file of practiceAreaFiles) {
    try {
      let content = await fs.readFile(path.join(process.cwd(), file), 'utf-8');

      // Replace dynamic practice area links with static mapping
      if (content.includes('/practice-areas/${area.id}')) {
        content = content.replace(
          '/practice-areas/${area.id}',
          '/practice-areas/${area.slug || area.id}'
        );

        await fs.writeFile(path.join(process.cwd(), file), content);
        fixes.push({
          file,
          oldLink: '/practice-areas/${area.id}',
          newLink: '/practice-areas/${area.slug || area.id}',
          reason: 'Use slug instead of id for practice areas',
        });
      }
    } catch (error) {
      console.log(`Skipping ${file}: ${error.message}`);
    }
  }

  // Fix 5: Create missing auth pages
  const authPages = ['signup', 'forgot-password'];
  for (const page of authPages) {
    const pagePath = path.join(process.cwd(), 'src/app/auth', page, 'page.tsx');
    await fs.mkdir(path.dirname(pagePath), { recursive: true });

    if (page === 'signup') {
      await fs.writeFile(
        pagePath,
        `export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Sign up feature coming soon
          </p>
        </div>
      </div>
    </div>
  );
}`
      );
    } else {
      await fs.writeFile(
        pagePath,
        `export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Reset your password
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Password reset feature coming soon
          </p>
        </div>
      </div>
    </div>
  );
}`
      );
    }

    console.log(`✅ Created /auth/${page} page`);
  }

  // Fix 6: Create missing location-specific service pages
  const cities = [
    'winston-salem',
    'wilmington',
    'raleigh',
    'greensboro',
    'fayetteville',
    'durham',
    'charlotte',
    'asheville',
  ];
  const services = [
    'immigration-lawyer',
    'personal-injury-attorney',
    'criminal-defense-attorney',
    'workers-compensation-lawyer',
  ];

  for (const city of cities) {
    for (const service of services) {
      const pagePath = path.join(process.cwd(), 'src/app/locations/nc', city, service, 'page.tsx');
      await fs.mkdir(path.dirname(pagePath), { recursive: true });

      const cityName = city
        .split('-')
        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');
      const serviceTitle = service
        .split('-')
        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');

      await fs.writeFile(
        pagePath,
        `export default function ${cityName.replace(/\s/g, '')}${serviceTitle.replace(/\s/g, '')}Page() {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          ${serviceTitle} in ${cityName}
        </h1>
        <p className="text-lg text-gray-700">
          Find experienced ${service.replace(/-/g, ' ')} services in ${cityName}, NC.
        </p>
      </div>
    </div>
  );
}`
      );
    }
  }

  console.log(`✅ Created ${cities.length * services.length} location-specific service pages`);

  // Fix 7: Create blog category pages for Spanish
  const spanishCategories = [
    { slug: 'inmigracion', name: 'Inmigración' },
    { slug: 'lesiones-personales', name: 'Lesiones Personales' },
    { slug: 'compensacion-laboral', name: 'Compensación Laboral' },
    { slug: 'defensa-criminal', name: 'Defensa Criminal' },
    { slug: 'derecho-familiar', name: 'Derecho Familiar' },
    { slug: 'infracciones-transito', name: 'Infracciones de Tránsito' },
  ];

  for (const category of spanishCategories) {
    const pagePath = path.join(
      process.cwd(),
      'src/app/es/blog/categoria',
      category.slug,
      'page.tsx'
    );
    await fs.mkdir(path.dirname(pagePath), { recursive: true });

    await fs.writeFile(
      pagePath,
      `export default function ${category.name.replace(/\s/g, '')}CategoryPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Blog de ${category.name}
        </h1>
        <p className="text-lg text-gray-700">
          Artículos y recursos sobre ${category.name.toLowerCase()}.
        </p>
      </div>
    </div>
  );
}`
    );
  }

  console.log(`✅ Created ${spanishCategories.length} Spanish blog category pages`);

  // Generate summary report
  console.log('\n📊 Link Fix Summary:');
  console.log(`✅ Fixed ${fixes.length} file references`);
  console.log(`✅ Created manifest.json and icons directory`);
  console.log(`✅ Created auth pages (signup, forgot-password)`);
  console.log(`✅ Created location-specific service pages`);
  console.log(`✅ Created Spanish blog category pages`);

  // Save fix report
  await fs.writeFile(
    'link-fixes-report.json',
    JSON.stringify(
      {
        timestamp: new Date().toISOString(),
        fixes,
        created: {
          files: [
            'public/manifest.json',
            'public/icons/',
            'src/app/auth/signup/page.tsx',
            'src/app/auth/forgot-password/page.tsx',
            ...cities.flatMap(city =>
              services.map(service => `src/app/locations/nc/${city}/${service}/page.tsx`)
            ),
            ...spanishCategories.map(cat => `src/app/es/blog/categoria/${cat.slug}/page.tsx`),
          ],
        },
      },
      null,
      2
    )
  );

  console.log('\n📄 Fix report saved to link-fixes-report.json');
}

// Run the fixes
fixInvalidLinks().catch(console.error);
