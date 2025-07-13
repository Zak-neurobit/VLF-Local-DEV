#!/usr/bin/env node

import * as fs from 'fs/promises';
import * as path from 'path';
import { glob } from 'glob';

/**
 * Script to apply consistent templates across all page types
 * This will migrate all pages to use appropriate template components
 */

interface PageType {
  pattern: string;
  template: string;
  category: string;
}

const PAGE_TYPES: PageType[] = [
  // Blog posts - highest priority
  {
    pattern: 'src/app/**/page.tsx',
    template: 'BlogPageTemplate',
    category: 'blog-post'
  },
  // Practice area pages
  {
    pattern: 'src/app/practice-areas/**/page.tsx',
    template: 'ModernPracticeAreaTemplateV2',
    category: 'practice-area'
  },
  // Location pages
  {
    pattern: 'src/app/locations/**/page.tsx',
    template: 'LocationPageTemplate',
    category: 'location'
  },
  // Attorney pages
  {
    pattern: 'src/app/attorneys/**/page.tsx',
    template: 'AttorneyPageTemplate',
    category: 'attorney'
  },
  // Near-me pages
  {
    pattern: 'src/app/near-me/**/page.tsx',
    template: 'NearMeLandingPageTemplate',
    category: 'near-me'
  },
];

async function checkIfPageUsesTemplate(filePath: string): Promise<boolean> {
  const content = await fs.readFile(filePath, 'utf-8');
  
  // Check for common template imports
  const templateImports = [
    'MasterLayout',
    'BlogPageTemplate',
    'ModernPracticeAreaTemplate',
    'LocationPageTemplate',
    'AttorneyPageTemplate',
    'EnhancedTemplates'
  ];
  
  return templateImports.some(template => content.includes(template));
}

async function identifyPageType(filePath: string): Promise<string> {
  const content = await fs.readFile(filePath, 'utf-8');
  const fileName = path.basename(path.dirname(filePath));
  
  // Check for blog post characteristics
  if (content.includes('article') || content.includes('blog') || 
      content.includes('post') || /\d+-\w+/.test(fileName)) {
    return 'blog-post';
  }
  
  // Check path patterns
  if (filePath.includes('/practice-areas/')) return 'practice-area';
  if (filePath.includes('/locations/')) return 'location';
  if (filePath.includes('/attorneys/')) return 'attorney';
  if (filePath.includes('/near-me/')) return 'near-me';
  if (filePath.includes('/es/')) return 'spanish';
  
  // Check for service pages
  if (content.includes('service') || content.includes('consultation')) {
    return 'service';
  }
  
  return 'general';
}

async function generateTemplateCode(pageType: string, filePath: string): Promise<string> {
  const pageName = path.basename(path.dirname(filePath));
  const content = await fs.readFile(filePath, 'utf-8');
  
  // Extract metadata if exists
  const metadataMatch = content.match(/export const metadata[^}]+}/s);
  const metadata = metadataMatch ? metadataMatch[0] : '';
  
  switch (pageType) {
    case 'blog-post':
      return generateBlogPostTemplate(pageName, metadata);
    case 'practice-area':
      return generatePracticeAreaTemplate(pageName, metadata);
    case 'location':
      return generateLocationTemplate(pageName, metadata);
    case 'attorney':
      return generateAttorneyTemplate(pageName, metadata);
    case 'near-me':
      return generateNearMeTemplate(pageName, metadata);
    default:
      return generateGeneralTemplate(pageName, metadata);
  }
}

function generateBlogPostTemplate(pageName: string, metadata: string): string {
  return `import { BlogPageTemplate } from '@/components/templates/BlogPageTemplate';
import { Metadata } from 'next';

${metadata}

export default function ${toPascalCase(pageName)}Page() {
  // TODO: Fetch blog post data
  const post = {
    id: '${pageName}',
    title: '${formatTitle(pageName)}',
    slug: '${pageName}',
    excerpt: 'Blog post excerpt here',
    content: '<p>Blog content here</p>',
    practiceArea: 'immigration',
    language: 'en' as const,
    publishedAt: new Date(),
    readTime: 5,
    author: {
      name: 'Vasquez Law Firm',
    },
    tags: [],
  };

  return (
    <BlogPageTemplate
      posts={[]}
      categories={[]}
      isArticlePage={true}
      currentPost={post}
      relatedPosts={[]}
    />
  );
}
`;
}

function generatePracticeAreaTemplate(pageName: string, metadata: string): string {
  return `import { ModernPracticeAreaTemplateV2 } from '@/components/templates/ModernPracticeAreaTemplateV2';
import { Metadata } from 'next';

${metadata}

export default function ${toPascalCase(pageName)}Page() {
  const pageData = {
    practiceArea: '${formatTitle(pageName)}',
    heroTitle: '${formatTitle(pageName)} Attorneys',
    heroSubtitle: 'Experienced legal representation for your needs',
    urgencyLevel: 'medium' as const,
    emergencyMessage: '',
    services: [],
    faqs: [],
    testimonials: [],
    statistics: [],
    processSteps: [],
    language: 'en' as const,
  };

  return <ModernPracticeAreaTemplateV2 {...pageData} />;
}
`;
}

function generateLocationTemplate(pageName: string, metadata: string): string {
  return `import { LocationPageTemplate } from '@/components/templates/LocationPageTemplate';
import { Metadata } from 'next';

${metadata}

export default function ${toPascalCase(pageName)}Page() {
  const locationData = {
    city: '${formatTitle(pageName)}',
    state: 'NC',
    heroTitle: 'Legal Services in ${formatTitle(pageName)}',
    heroSubtitle: 'Trusted attorneys serving the local community',
    practiceAreas: [],
    attorneys: [],
    officeInfo: {
      address: '',
      phone: '1-844-YO-PELEO',
      hours: 'Monday-Friday 9AM-5PM',
    },
    language: 'en' as const,
  };

  return <LocationPageTemplate {...locationData} />;
}
`;
}

function generateAttorneyTemplate(pageName: string, metadata: string): string {
  return `import { AttorneyPageTemplate } from '@/components/templates/AttorneyPageTemplate';
import { Metadata } from 'next';

${metadata}

export default function ${toPascalCase(pageName)}Page() {
  const attorneyData = {
    name: '${formatTitle(pageName)}',
    title: 'Attorney',
    bio: '',
    practiceAreas: [],
    education: [],
    barAdmissions: [],
    awards: [],
    languages: ['English'],
    image: '',
  };

  return <AttorneyPageTemplate {...attorneyData} />;
}
`;
}

function generateNearMeTemplate(pageName: string, metadata: string): string {
  return `import { NearMeLandingPageTemplate } from '@/components/templates/NearMeLandingPageTemplate';
import { Metadata } from 'next';

${metadata}

export default function ${toPascalCase(pageName)}Page() {
  const pageData = {
    service: '${formatTitle(pageName)}',
    location: 'Your Area',
    heroTitle: '${formatTitle(pageName)} Near You',
    heroSubtitle: 'Find experienced attorneys in your area',
    features: [],
    testimonials: [],
    faqs: [],
    language: 'en' as const,
  };

  return <NearMeLandingPageTemplate {...pageData} />;
}
`;
}

function generateGeneralTemplate(pageName: string, metadata: string): string {
  return `import { MasterLayout } from '@/design-system/templates/MasterLayout';
import { Metadata } from 'next';

${metadata}

export default function ${toPascalCase(pageName)}Page() {
  return (
    <MasterLayout variant="default" showBreadcrumbs={true}>
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8">${formatTitle(pageName)}</h1>
        {/* Page content here */}
      </div>
    </MasterLayout>
  );
}
`;
}

function toPascalCase(str: string): string {
  return str
    .split(/[-_\s]+/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}

function formatTitle(str: string): string {
  return str
    .split(/[-_]+/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

async function analyzePages() {
  console.log('🔍 Analyzing all pages in the project...\n');
  
  const allPages = await glob('src/app/**/page.tsx');
  const results = {
    total: allPages.length,
    withTemplate: 0,
    withoutTemplate: 0,
    byType: {} as Record<string, number>,
    needsMigration: [] as Array<{ file: string; type: string }>,
  };
  
  for (const page of allPages) {
    // Skip API routes and special pages
    if (page.includes('/api/') || page.includes('/_')) continue;
    
    const hasTemplate = await checkIfPageUsesTemplate(page);
    const pageType = await identifyPageType(page);
    
    if (hasTemplate) {
      results.withTemplate++;
    } else {
      results.withoutTemplate++;
      results.needsMigration.push({ file: page, type: pageType });
    }
    
    results.byType[pageType] = (results.byType[pageType] || 0) + 1;
  }
  
  console.log('📊 Analysis Results:');
  console.log(`Total pages: ${results.total}`);
  console.log(`Pages with templates: ${results.withTemplate} ✅`);
  console.log(`Pages without templates: ${results.withoutTemplate} ❌`);
  console.log('\nPages by type:');
  Object.entries(results.byType).forEach(([type, count]) => {
    console.log(`  ${type}: ${count}`);
  });
  console.log(`\n${results.needsMigration.length} pages need migration\n`);
  
  return results;
}

async function createMigrationPlan() {
  const results = await analyzePages();
  const migrationPlan = path.join(process.cwd(), 'TEMPLATE_MIGRATION_PLAN.md');
  
  let planContent = `# Template Migration Plan

Generated on: ${new Date().toISOString()}

## Summary
- Total pages: ${results.total}
- Pages with templates: ${results.withTemplate} ✅
- Pages needing migration: ${results.withoutTemplate} ❌

## Migration Priority

### 1. Blog Posts (Highest Priority)
${results.needsMigration
  .filter(p => p.type === 'blog-post')
  .map(p => `- [ ] ${p.file}`)
  .join('\n')}

### 2. Practice Area Pages
${results.needsMigration
  .filter(p => p.type === 'practice-area')
  .map(p => `- [ ] ${p.file}`)
  .join('\n')}

### 3. Location Pages
${results.needsMigration
  .filter(p => p.type === 'location')
  .map(p => `- [ ] ${p.file}`)
  .join('\n')}

### 4. Other Pages
${results.needsMigration
  .filter(p => !['blog-post', 'practice-area', 'location'].includes(p.type))
  .map(p => `- [ ] ${p.file} (${p.type})`)
  .join('\n')}

## Migration Steps

1. Run \`npm run migrate-templates\` to automatically migrate pages
2. Review each migrated page for content accuracy
3. Update page-specific data and content
4. Test each page for functionality
5. Commit changes in batches by page type
`;
  
  await fs.writeFile(migrationPlan, planContent);
  console.log(`✅ Migration plan created: ${migrationPlan}`);
}

async function migratePages(dryRun = true) {
  const results = await analyzePages();
  
  if (dryRun) {
    console.log('🔄 DRY RUN - No files will be modified\n');
  }
  
  let migrated = 0;
  let failed = 0;
  
  for (const { file, type } of results.needsMigration) {
    try {
      const newContent = await generateTemplateCode(type, file);
      
      if (!dryRun) {
        // Backup original file
        const backupPath = `${file}.backup`;
        await fs.copyFile(file, backupPath);
        
        // Write new content
        await fs.writeFile(file, newContent);
      }
      
      console.log(`✅ ${dryRun ? 'Would migrate' : 'Migrated'}: ${file} (${type})`);
      migrated++;
    } catch (error) {
      console.error(`❌ Failed to migrate ${file}:`, error);
      failed++;
    }
  }
  
  console.log(`\n📊 Migration Summary:`);
  console.log(`${migrated} pages ${dryRun ? 'would be' : 'were'} migrated`);
  console.log(`${failed} pages failed`);
  
  if (dryRun) {
    console.log('\n💡 Run with --migrate flag to perform actual migration');
  }
}

async function main() {
  const args = process.argv.slice(2);
  const command = args[0];
  
  switch (command) {
    case '--analyze':
      await analyzePages();
      break;
    case '--plan':
      await createMigrationPlan();
      break;
    case '--migrate':
      await migratePages(false);
      break;
    case '--dry-run':
    default:
      await migratePages(true);
      break;
  }
}

main().catch(console.error);