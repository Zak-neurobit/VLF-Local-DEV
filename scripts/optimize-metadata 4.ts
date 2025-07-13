import fs from 'fs';
import path from 'path';
import { glob } from 'glob';

const APP_DIR = path.join(process.cwd(), 'src/app');
const COMPONENTS_DIR = path.join(process.cwd(), 'src/components');

// Files to skip
const SKIP_PATTERNS = [
  '**/layout.tsx',
  '**/loading.tsx',
  '**/error.tsx',
  '**/not-found.tsx',
  '**/global-error.tsx',
  '**/template.tsx',
  '**/_*', // Skip private folders
];

// Metadata patterns to search for
const METADATA_PATTERNS = [
  /export\s+const\s+metadata\s*:\s*Metadata\s*=\s*{/,
  /export\s+function\s+generateMetadata/,
  /export\s+async\s+function\s+generateMetadata/,
];

interface MetadataUpdate {
  file: string;
  type: 'static' | 'dynamic';
  currentTitle?: string;
  currentDescription?: string;
  suggestedTitle?: string;
  suggestedDescription?: string;
  pageType?: string;
  updated: boolean;
}

// Detect page type from file path
function detectPageType(filePath: string): {
  type: string;
  subType?: string;
  variables?: Record<string, string>;
} {
  const relativePath = path.relative(APP_DIR, filePath).toLowerCase();

  // Practice areas
  if (relativePath.includes('practice-areas')) {
    if (relativePath.includes('immigration'))
      return { type: 'practiceArea', subType: 'immigration' };
    if (relativePath.includes('personal-injury'))
      return { type: 'practiceArea', subType: 'personalInjury' };
    if (relativePath.includes('criminal-defense'))
      return { type: 'practiceArea', subType: 'criminalDefense' };
    if (relativePath.includes('workers-compensation'))
      return { type: 'practiceArea', subType: 'workersComp' };
  }

  // Location pages
  if (relativePath.includes('locations')) {
    const cityMatch = relativePath.match(/locations\/nc\/([^\/]+)/);
    if (cityMatch) {
      return {
        type: 'location',
        subType: 'city',
        variables: { city: cityMatch[1].replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) },
      };
    }
  }

  // Neighborhood pages
  if (relativePath.includes('neighborhoods')) {
    const parts = relativePath.split('/');
    const neighborhoodIndex = parts.indexOf('neighborhoods') + 1;
    if (parts[neighborhoodIndex]) {
      return {
        type: 'location',
        subType: 'neighborhood',
        variables: {
          neighborhood: parts[neighborhoodIndex]
            .replace(/-/g, ' ')
            .replace(/\b\w/g, l => l.toUpperCase()),
          city:
            parts[neighborhoodIndex - 1]
              ?.replace(/-/g, ' ')
              .replace(/\b\w/g, l => l.toUpperCase()) || 'NC',
        },
      };
    }
  }

  // Near me pages
  if (relativePath.includes('near-me')) {
    const match = relativePath.match(/near-me\/([^\/]+)/);
    if (match) {
      const parts = match[1].split('-');
      const nearMeIndex = parts.indexOf('near');
      if (nearMeIndex > 0) {
        const city = parts
          .slice(0, nearMeIndex)
          .join(' ')
          .replace(/\b\w/g, l => l.toUpperCase());
        const service = parts
          .slice(nearMeIndex + 2)
          .join(' ')
          .replace(/\b\w/g, l => l.toUpperCase());
        return {
          type: 'location',
          subType: 'nearMe',
          variables: { city, service },
        };
      }
    }
  }

  // Attorney pages
  if (relativePath.includes('attorneys')) {
    return { type: 'attorney' };
  }

  // Main pages
  if (relativePath === 'page.tsx') return { type: 'main', subType: 'home' };
  if (relativePath.includes('about')) return { type: 'main', subType: 'about' };
  if (relativePath.includes('contact')) return { type: 'main', subType: 'contact' };

  return { type: 'general' };
}

// Extract current metadata from file content
function extractCurrentMetadata(content: string): {
  title?: string;
  description?: string;
  type: 'static' | 'dynamic';
} {
  // Check if it's dynamic metadata
  if (content.includes('generateMetadata')) {
    return { type: 'dynamic' };
  }

  // Extract static metadata
  const metadataMatch = content.match(/export\s+const\s+metadata\s*:\s*Metadata\s*=\s*{([^}]+)}/s);
  if (metadataMatch) {
    const metadataContent = metadataMatch[1];

    // Extract title
    const titleMatch = metadataContent.match(/title:\s*['"`]([^'"`]+)['"`]/);
    const title = titleMatch ? titleMatch[1] : undefined;

    // Extract description
    const descMatch = metadataContent.match(/description:\s*['"`]([^'"`]+)['"`]/);
    const description = descMatch ? descMatch[1] : undefined;

    return { title, description, type: 'static' };
  }

  return { type: 'static' };
}

// Update metadata in file
async function updateMetadataInFile(filePath: string, updates: MetadataUpdate): Promise<boolean> {
  try {
    let content = fs.readFileSync(filePath, 'utf-8');
    const originalContent = content;

    // Import the optimizer if not already imported
    if (!content.includes('metadata-optimizer')) {
      const importStatement =
        "import { optimizeMetadata, generateOptimizedTitle, generateOptimizedDescription } from '@/lib/seo/metadata-optimizer';\n";

      // Add after other imports
      const lastImportIndex = content.lastIndexOf('import ');
      if (lastImportIndex !== -1) {
        const endOfImport = content.indexOf('\n', lastImportIndex);
        content =
          content.slice(0, endOfImport + 1) + importStatement + content.slice(endOfImport + 1);
      }
    }

    // Update static metadata
    if (updates.type === 'static' && updates.suggestedTitle && updates.suggestedDescription) {
      // Replace title
      content = content.replace(
        /title:\s*['"`][^'"`]+['"`]/,
        `title: '${updates.suggestedTitle.replace(/'/g, "\\'")}'`
      );

      // Replace description
      content = content.replace(
        /description:\s*['"`][^'"`]+['"`]/,
        `description: '${updates.suggestedDescription.replace(/'/g, "\\'")}'`
      );
    }

    // Add optimization comment
    if (content !== originalContent && !content.includes('// SEO Optimized')) {
      content = content.replace(
        /export\s+const\s+metadata/,
        '// SEO Optimized with power words and local modifiers\nexport const metadata'
      );
    }

    if (content !== originalContent) {
      fs.writeFileSync(filePath, content);
      return true;
    }

    return false;
  } catch (error) {
    console.error(`Error updating ${filePath}:`, error);
    return false;
  }
}

// Main optimization function
async function optimizeAllMetadata() {
  console.log('🚀 Starting metadata optimization...\n');

  // Find all page.tsx files
  const files = await glob('**/page.tsx', {
    cwd: APP_DIR,
    ignore: SKIP_PATTERNS,
  });

  const updates: MetadataUpdate[] = [];
  let optimizedCount = 0;

  for (const file of files) {
    const filePath = path.join(APP_DIR, file);
    const content = fs.readFileSync(filePath, 'utf-8');

    // Skip if no metadata
    if (!METADATA_PATTERNS.some(pattern => pattern.test(content))) {
      continue;
    }

    // Detect page type
    const pageInfo = detectPageType(filePath);

    // Extract current metadata
    const currentMeta = extractCurrentMetadata(content);

    const update: MetadataUpdate = {
      file: file,
      type: currentMeta.type,
      currentTitle: currentMeta.title,
      currentDescription: currentMeta.description,
      pageType: pageInfo.type,
      updated: false,
    };

    // Generate optimized suggestions for static metadata
    if (currentMeta.type === 'static' && currentMeta.title) {
      // Use metadata optimizer to generate suggestions
      const mockMetadata = {
        title: currentMeta.title,
        description: currentMeta.description,
      };

      // For demo, we'll create inline suggestions
      // In production, import and use the actual optimizer
      update.suggestedTitle = generateOptimizedTitleInline(pageInfo, currentMeta.title);
      update.suggestedDescription = generateOptimizedDescriptionInline(
        pageInfo,
        currentMeta.description
      );

      // Only update if suggestions are different and better
      if (
        update.suggestedTitle !== update.currentTitle ||
        update.suggestedDescription !== update.currentDescription
      ) {
        if (await updateMetadataInFile(filePath, update)) {
          update.updated = true;
          optimizedCount++;
          console.log(`✅ Optimized: ${file}`);
          console.log(`   Old title: ${update.currentTitle}`);
          console.log(`   New title: ${update.suggestedTitle}`);
          console.log('');
        }
      }
    }

    updates.push(update);
  }

  // Generate report
  console.log('\n📊 Optimization Summary:');
  console.log(`Total pages analyzed: ${files.length}`);
  console.log(`Pages optimized: ${optimizedCount}`);
  console.log(`Static metadata pages: ${updates.filter(u => u.type === 'static').length}`);
  console.log(`Dynamic metadata pages: ${updates.filter(u => u.type === 'dynamic').length}`);

  // Save detailed report
  const report = {
    timestamp: new Date().toISOString(),
    summary: {
      totalPages: files.length,
      optimized: optimizedCount,
      staticPages: updates.filter(u => u.type === 'static').length,
      dynamicPages: updates.filter(u => u.type === 'dynamic').length,
    },
    updates: updates.filter(u => u.updated),
  };

  fs.writeFileSync(
    path.join(process.cwd(), 'metadata-optimization-report.json'),
    JSON.stringify(report, null, 2)
  );

  console.log('\n✨ Metadata optimization complete!');
  console.log('📄 Detailed report saved to: metadata-optimization-report.json');
}

// Inline optimization functions (simplified versions)
function generateOptimizedTitleInline(pageInfo: any, currentTitle: string): string {
  const powerWords = {
    trust: ['Elite', 'Trusted', 'Award-Winning', '#1 Rated'],
    urgency: ['24/7', 'Immediate', 'Emergency', 'Now'],
    aggression: ['Aggressive', 'Fighting', 'Fierce', 'Relentless'],
  };

  // Add power words based on page type
  if (pageInfo.type === 'practiceArea') {
    const trustWord = powerWords.trust[Math.floor(Math.random() * powerWords.trust.length)];
    const aggressionWord =
      powerWords.aggression[Math.floor(Math.random() * powerWords.aggression.length)];
    return `${trustWord} ${aggressionWord} ${currentTitle}`;
  }

  if (pageInfo.type === 'location' && pageInfo.variables?.city) {
    const urgencyWord = powerWords.urgency[Math.floor(Math.random() * powerWords.urgency.length)];
    return currentTitle.replace(
      pageInfo.variables.city,
      `${pageInfo.variables.city} ${urgencyWord}`
    );
  }

  return currentTitle;
}

function generateOptimizedDescriptionInline(pageInfo: any, currentDesc?: string): string {
  const enhancers = [
    'Stop searching and start winning.',
    'Get immediate results.',
    'Experience the difference.',
    'Join 30,000+ satisfied clients.',
  ];

  const credibility = [
    '60+ years experience.',
    '98% success rate.',
    '$100M+ recovered.',
    '5-star Google rating.',
  ];

  const cta = [
    'Free consultation: 1-844-YO-PELEO',
    'No fee unless we win.',
    'Call now for instant help.',
    'Se habla español.',
  ];

  const opener = enhancers[Math.floor(Math.random() * enhancers.length)];
  const cred = credibility[Math.floor(Math.random() * credibility.length)];
  const action = cta[Math.floor(Math.random() * cta.length)];

  if (currentDesc) {
    // Enhance existing description
    const base = currentDesc.split('.')[0];
    return `${opener} ${base}. ${cred} ${action}`;
  }

  return `${opener} NC's most trusted law firm. ${cred} ${action}`;
}

// Run the optimizer
optimizeAllMetadata().catch(console.error);
