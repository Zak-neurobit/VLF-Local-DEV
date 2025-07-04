#!/usr/bin/env node

/**
 * Extract content from VLF old site HTML files
 * Converts to structured JSON with SEO metadata
 */

const fs = require('fs').promises;
const path = require('path');
const cheerio = require('cheerio');

const OLD_SITE_PATH = '/Users/williamvasquez/Documents/vlf old site /www.vasquezlawnc.com';
const OUTPUT_PATH = path.join(process.cwd(), 'content-import/old-site');

// Ensure output directory exists
async function ensureDir(dir) {
  try {
    await fs.mkdir(dir, { recursive: true });
  } catch (error) {
    console.error(`Error creating directory ${dir}:`, error);
  }
}

// Extract content from HTML file
async function extractHTMLContent(filePath) {
  try {
    const html = await fs.readFile(filePath, 'utf-8');
    const $ = cheerio.load(html);

    // Extract metadata
    const metadata = {
      title: $('title').text() || '',
      metaDescription: $('meta[name="description"]').attr('content') || '',
      metaKeywords: $('meta[name="keywords"]').attr('content') || '',
      canonical: $('link[rel="canonical"]').attr('href') || '',
      ogTitle: $('meta[property="og:title"]').attr('content') || '',
      ogDescription: $('meta[property="og:description"]').attr('content') || '',
      ogImage: $('meta[property="og:image"]').attr('content') || '',
      structuredData: [],
    };

    // Extract structured data
    $('script[type="application/ld+json"]').each((i, elem) => {
      try {
        const jsonData = JSON.parse($(elem).html());
        metadata.structuredData.push(jsonData);
      } catch (e) {
        console.warn('Failed to parse structured data:', e.message);
      }
    });

    // Extract main content
    const content = {
      h1: $('h1').first().text() || '',
      heroSection: $('.et_pb_section_0').html() || '',
      mainContent: $('#main-content').html() || $('main').html() || '',
      sidebar: $('.sidebar').html() || '',
      breadcrumbs: $('.breadcrumbs').text() || '',
    };

    // Extract navigation
    const navigation = {
      mainMenu: [],
      footerMenu: [],
    };

    $('#top-menu a, .main-navigation a').each((i, elem) => {
      navigation.mainMenu.push({
        text: $(elem).text().trim(),
        href: $(elem).attr('href'),
      });
    });

    // Extract forms
    const forms = [];
    $('form').each((i, elem) => {
      const $form = $(elem);
      forms.push({
        id: $form.attr('id'),
        action: $form.attr('action'),
        method: $form.attr('method'),
        fields: $form
          .find('input, textarea, select')
          .map((i, field) => ({
            name: $(field).attr('name'),
            type: $(field).attr('type') || field.tagName.toLowerCase(),
            required: $(field).attr('required') !== undefined,
          }))
          .get(),
      });
    });

    // Extract images
    const images = [];
    $('img').each((i, elem) => {
      const src = $(elem).attr('src');
      if (src && !src.startsWith('data:')) {
        images.push({
          src,
          alt: $(elem).attr('alt') || '',
          title: $(elem).attr('title') || '',
        });
      }
    });

    return {
      url: filePath.replace(OLD_SITE_PATH, ''),
      metadata,
      content,
      navigation,
      forms,
      images,
      extractedAt: new Date().toISOString(),
    };
  } catch (error) {
    console.error(`Error extracting content from ${filePath}:`, error);
    return null;
  }
}

// Process all HTML files
async function processAllFiles() {
  console.log('🚀 Starting VLF old site content extraction...\n');

  // Key pages to extract
  const keyPages = [
    'index.html',
    'attorneys.html',
    'immigration.html',
    'personal-injury.html',
    'criminal-defense.html',
    'workers-compensation-job-injury.html',
    'contact.html',
    'es.html',
    'es/index.html',
    'es/areas-de-practica/inmigracion.html',
    'es/areas-de-practica/lesiones-personales.html',
    'es/areas-de-practica/defensa-criminal.html',
    'es/areas-de-practica/derecho-familia.html',
    'es/areas-de-practica/compensacion-laboral.html',
    'es/abogados.html',
    'es/contacto.html',
  ];

  // Ensure output directories
  await ensureDir(OUTPUT_PATH);
  await ensureDir(path.join(OUTPUT_PATH, 'pages'));
  await ensureDir(path.join(OUTPUT_PATH, 'attorneys'));
  await ensureDir(path.join(OUTPUT_PATH, 'practice-areas'));
  await ensureDir(path.join(OUTPUT_PATH, 'locations'));
  await ensureDir(path.join(OUTPUT_PATH, 'blog'));

  const results = {
    success: [],
    failed: [],
    summary: {},
  };

  // Process each key page
  for (const page of keyPages) {
    const filePath = path.join(OLD_SITE_PATH, page);
    console.log(`📄 Processing: ${page}`);

    try {
      // Check if file exists
      await fs.access(filePath);

      const content = await extractHTMLContent(filePath);
      if (content) {
        // Determine output path
        let outputDir = OUTPUT_PATH;
        if (page.includes('attorneys')) {
          outputDir = path.join(OUTPUT_PATH, 'attorneys');
        } else if (
          page.includes('immigration') ||
          page.includes('injury') ||
          page.includes('criminal') ||
          page.includes('family') ||
          page.includes('compensation')
        ) {
          outputDir = path.join(OUTPUT_PATH, 'practice-areas');
        } else {
          outputDir = path.join(OUTPUT_PATH, 'pages');
        }

        const outputFile = path.join(outputDir, page.replace('.html', '.json'));
        await fs.writeFile(outputFile, JSON.stringify(content, null, 2));

        results.success.push(page);
        console.log(`✅ Extracted: ${page}`);
      }
    } catch (error) {
      if (error.code === 'ENOENT') {
        console.log(`⚠️  File not found: ${page}`);
      } else {
        console.error(`❌ Failed to process ${page}:`, error.message);
      }
      results.failed.push(page);
    }
  }

  // Generate summary
  results.summary = {
    totalProcessed: results.success.length + results.failed.length,
    successCount: results.success.length,
    failedCount: results.failed.length,
    extractionDate: new Date().toISOString(),
  };

  // Save summary
  await fs.writeFile(
    path.join(OUTPUT_PATH, 'extraction-summary.json'),
    JSON.stringify(results, null, 2)
  );

  console.log('\n📊 Extraction Summary:');
  console.log(`✅ Successfully extracted: ${results.success.length} pages`);
  console.log(`❌ Failed: ${results.failed.length} pages`);
  console.log(`\n📁 Output saved to: ${OUTPUT_PATH}`);

  return results;
}

// Create SEO enhancement suggestions
async function generateSEOSuggestions(extractedContent) {
  const suggestions = {
    metaDescriptions: {},
    schemaMarkup: {},
    contentEnhancements: {},
  };

  // Analyze each page
  for (const [page, content] of Object.entries(extractedContent)) {
    // Check meta description length
    if (content.metadata.metaDescription.length < 120) {
      suggestions.metaDescriptions[page] =
        'Meta description too short - expand to 150-160 characters';
    }

    // Check for schema markup
    if (content.metadata.structuredData.length === 0) {
      suggestions.schemaMarkup[page] =
        'Add appropriate schema markup (Attorney, LegalService, LocalBusiness)';
    }

    // Check content length
    const contentLength = content.content.mainContent.length;
    if (contentLength < 1000) {
      suggestions.contentEnhancements[page] =
        'Content too thin - expand to at least 1500 characters';
    }
  }

  return suggestions;
}

// Main execution
async function main() {
  try {
    // First check if old site directory exists
    try {
      await fs.access(OLD_SITE_PATH);
      console.log(`✅ Found old site at: ${OLD_SITE_PATH}\n`);
    } catch (error) {
      console.error(`❌ Old site directory not found at: ${OLD_SITE_PATH}`);
      console.log('\nPlease ensure the old site is located at:');
      console.log('/Users/williamvasquez/Documents/vlf old site /www.vasquezlawnc.com/\n');
      process.exit(1);
    }

    // Extract content
    const results = await processAllFiles();

    console.log('\n✨ Content extraction complete!');
    console.log('\nNext steps:');
    console.log('1. Run: node scripts/enhance-content-seo.js');
    console.log('2. Run: node scripts/generate-enhanced-pages.js');
    console.log('3. Review extracted content in: content-import/old-site/\n');
  } catch (error) {
    console.error('Fatal error:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { extractHTMLContent, processAllFiles };
