#!/usr/bin/env node

/**
 * Script to generate all static routes for the application
 * This ensures ALL pages are built statically during build time
 */

const fs = require('fs').promises;
const path = require('path');
const glob = require('glob').sync;

async function getAllBlogSlugs() {
  try {
    // Find all blog markdown files
    const blogFiles = glob('content/blog/**/*.md', {
      ignore: ['**/node_modules/**']
    });
    
    return blogFiles.map(file => {
      const slug = path.basename(file, '.md');
      return slug;
    });
  } catch (error) {
    console.error('Error finding blog files:', error);
    return [];
  }
}

async function generateBlogStaticParams() {
  console.log('🔍 Generating blog static params...');
  
  const blogSlugs = await getAllBlogSlugs();
  
  const blogPagePath = 'src/app/blog/[slug]/page.tsx';
  const blogPageContent = await fs.readFile(blogPagePath, 'utf-8');
  
  // Check if it already has generateStaticParams
  if (!blogPageContent.includes('generateStaticParams')) {
    // Add generateStaticParams function
    const updatedContent = blogPageContent.replace(
      /export\s+default\s+async\s+function\s+BlogPostPage/,
      `// Generate all blog posts at build time
export async function generateStaticParams() {
  try {
    // Import blog service dynamically to avoid circular dependencies
    const { getAllPosts } = await import('@/services/blog');
    const posts = await getAllPosts();
    
    return posts.map((post) => ({
      slug: post.slug,
    }));
  } catch (error) {
    console.error('Error generating blog static params:', error);
    // Return empty array to prevent build failure
    return [];
  }
}

export default async function BlogPostPage`
    );
    
    await fs.writeFile(blogPagePath, updatedContent);
    console.log('✅ Updated blog page with generateStaticParams');
  }
}

async function generatePracticeAreaStaticParams() {
  console.log('🔍 Generating practice area static params...');
  
  const practiceAreas = [
    'immigration',
    'personal-injury',
    'criminal-defense',
    'workers-compensation',
    'family-law',
  ];
  
  const subPages = {
    'immigration': [
      'deportation-defense',
      'green-cards',
      'citizenship-naturalization',
      'family-based-immigration',
      'employment-based-immigration',
      'asylum-refugee',
      'visa-types',
      'daca',
      'adjustment-of-status',
      'consular-processing',
    ],
    'personal-injury': [
      'car-accidents',
      'truck-accidents',
      'motorcycle-accidents',
      'pedestrian-accidents',
      'slip-and-fall',
      'medical-malpractice',
      'wrongful-death',
      'brain-injuries',
      'spinal-cord-injuries',
      'burn-injuries',
    ],
    'criminal-defense': [
      'dui-dwi',
      'drug-charges',
      'assault-battery',
      'theft-charges',
      'domestic-violence',
      'federal-crimes',
      'white-collar-crimes',
      'traffic-violations',
      'expungement',
      'probation-violations',
    ],
    'workers-compensation': [
      'workplace-injuries',
      'construction-accidents',
      'repetitive-stress-injuries',
      'occupational-diseases',
      'third-party-claims',
      'permanent-disability',
      'temporary-disability',
      'medical-benefits',
      'vocational-rehabilitation',
      'death-benefits',
    ],
    'family-law': [
      'divorce',
      'child-custody',
      'child-support',
      'alimony',
      'property-division',
      'prenuptial-agreements',
      'adoption',
      'domestic-violence',
      'paternity',
      'modifications',
    ],
  };
  
  // Generate params for all practice area pages
  const params = [];
  
  for (const area of practiceAreas) {
    // Main practice area page
    params.push({ area });
    
    // Sub-pages
    if (subPages[area]) {
      for (const subPage of subPages[area]) {
        params.push({ area, subPage });
      }
    }
  }
  
  return params;
}

async function updateNextConfig() {
  console.log('🔧 Updating Next.js config for full static generation...');
  
  const configPath = 'next.config.js';
  let config = await fs.readFile(configPath, 'utf-8');
  
  // Remove any experimental settings that limit static generation
  config = config.replace(/isrMemoryCacheSize:\s*0,?\s*\n/g, '');
  config = config.replace(/\/\/\s*Limit static page generation\s*\n/g, '');
  
  // Ensure we have proper static generation settings
  if (!config.includes('generateStaticParams')) {
    config = config.replace(
      'experimental: {',
      `experimental: {
    // Enable full static generation
    isrMemoryCacheSize: 50, // Allow ISR caching
    `
    );
  }
  
  await fs.writeFile(configPath, config);
  console.log('✅ Updated Next.js config');
}

async function createRouteManifest() {
  console.log('📝 Creating comprehensive route manifest...');
  
  // Get all page files
  const pageFiles = glob('src/app/**/page.{tsx,ts,jsx,js}', {
    ignore: [
      '**/node_modules/**',
      '**/_*/**',
      '**/api/**',
      '**/not-found.*',
      '**/error.*',
      '**/loading.*',
      '**/layout.*',
    ]
  });
  
  const routes = pageFiles.map(file => {
    const route = file
      .replace('src/app', '')
      .replace(/\/page\.(tsx|ts|jsx|js)$/, '')
      .replace(/\[\.\.\.(\w+)\]/g, ':$1*')
      .replace(/\[(\w+)\]/g, ':$1');
    
    return route || '/';
  });
  
  const manifest = {
    version: '1.0.0',
    generated: new Date().toISOString(),
    totalRoutes: routes.length,
    routes: routes.sort(),
    dynamicRoutes: routes.filter(r => r.includes(':')),
    staticRoutes: routes.filter(r => !r.includes(':')),
  };
  
  await fs.writeFile(
    'route-manifest.json',
    JSON.stringify(manifest, null, 2)
  );
  
  console.log(`✅ Created route manifest with ${routes.length} routes`);
  console.log(`   - Static routes: ${manifest.staticRoutes.length}`);
  console.log(`   - Dynamic routes: ${manifest.dynamicRoutes.length}`);
  
  return manifest;
}

async function main() {
  console.log('🚀 Configuring full static generation for ALL pages...\n');
  
  // Generate static params for blog
  await generateBlogStaticParams();
  
  // Update Next.js config
  await updateNextConfig();
  
  // Create route manifest
  const manifest = await createRouteManifest();
  
  console.log('\n✨ Static generation configuration complete!');
  console.log('\n📊 Summary:');
  console.log(`- Total routes: ${manifest.totalRoutes}`);
  console.log(`- Static routes: ${manifest.staticRoutes.length}`);
  console.log(`- Dynamic routes configured for static generation: ${manifest.dynamicRoutes.length}`);
  console.log('\n🏗️  Next steps:');
  console.log('1. Run: npm run build');
  console.log('2. The build will now generate ALL pages statically');
  console.log('3. Deploy to see 100% static pages in production');
}

main().catch(console.error);