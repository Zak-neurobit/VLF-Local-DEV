#!/usr/bin/env node

/**
 * Extract all content from VLF old site HTML files
 * Automatically finds and processes all HTML files with actual content
 */

const fs = require('fs').promises;
const path = require('path');
const cheerio = require('cheerio');

const homePath = require('os').homedir();
const OLD_SITE_PATH = path.join(homePath, 'Documents/vlf old site /www.vasquezlawnc.com');
const OUTPUT_PATH = path.join(process.cwd(), 'content-import/old-site-complete');

// Ensure output directory exists
async function ensureDir(dir) {
  try {
    await fs.mkdir(dir, { recursive: true });
  } catch (error) {
    console.error(`Error creating directory ${dir}:`, error);
  }
}

// Check if file has actual content (more than just meta tag)
async function hasContent(filePath) {
  try {
    const stats = await fs.stat(filePath);
    // Files with less than 100 bytes are likely empty stubs
    return stats.size > 100;
  } catch (error) {
    return false;
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

// Recursively find all HTML files
async function findHTMLFiles(dir, fileList = []) {
  try {
    const files = await fs.readdir(dir);

    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = await fs.stat(filePath);

      if (stat.isDirectory()) {
        // Skip certain directories that are likely duplicates
        if (!file.includes('wp-json') && !file.includes('feed') && !file.includes('"')) {
          await findHTMLFiles(filePath, fileList);
        }
      } else if (file.endsWith('.html') && (await hasContent(filePath))) {
        fileList.push(filePath);
      }
    }
  } catch (error) {
    console.error(`Error reading directory ${dir}:`, error);
  }

  return fileList;
}

// Process all HTML files
async function processAllFiles() {
  console.log('🚀 Starting comprehensive VLF old site content extraction...\n');

  // Ensure output directories
  await ensureDir(OUTPUT_PATH);
  await ensureDir(path.join(OUTPUT_PATH, 'pages'));
  await ensureDir(path.join(OUTPUT_PATH, 'attorneys'));
  await ensureDir(path.join(OUTPUT_PATH, 'practice-areas'));
  await ensureDir(path.join(OUTPUT_PATH, 'locations'));
  await ensureDir(path.join(OUTPUT_PATH, 'blog'));
  await ensureDir(path.join(OUTPUT_PATH, 'spanish'));

  const results = {
    success: [],
    failed: [],
    skipped: [],
    summary: {},
  };

  // Find all HTML files
  console.log('🔍 Scanning for HTML files...');
  const htmlFiles = await findHTMLFiles(OLD_SITE_PATH);
  console.log(`📁 Found ${htmlFiles.length} HTML files with content\n`);

  // Process each file
  for (const filePath of htmlFiles) {
    const relativePath = filePath.replace(OLD_SITE_PATH + '/', '');
    console.log(`📄 Processing: ${relativePath}`);

    try {
      const content = await extractHTMLContent(filePath);
      if (content) {
        // Determine output path based on URL structure
        let outputDir = OUTPUT_PATH;
        let outputSubDir = 'pages';

        if (relativePath.includes('attorneys') || relativePath.includes('abogados')) {
          outputSubDir = 'attorneys';
        } else if (
          relativePath.includes('immigration') ||
          relativePath.includes('inmigracion') ||
          relativePath.includes('injury') ||
          relativePath.includes('lesiones') ||
          relativePath.includes('criminal') ||
          relativePath.includes('family') ||
          relativePath.includes('compensation') ||
          relativePath.includes('compensacion')
        ) {
          outputSubDir = 'practice-areas';
        } else if (relativePath.includes('blog') || relativePath.includes('post')) {
          outputSubDir = 'blog';
        } else if (relativePath.includes('-nc') || relativePath.includes('-fl')) {
          outputSubDir = 'locations';
        } else if (relativePath.startsWith('es/')) {
          outputSubDir = 'spanish';
        }

        outputDir = path.join(OUTPUT_PATH, outputSubDir);
        await ensureDir(outputDir);

        // Create safe filename
        const safeFileName = relativePath
          .replace(/\//g, '-')
          .replace(/[^\w\-\.]/g, '')
          .replace(/\.html$/, '.json');

        const outputFile = path.join(outputDir, safeFileName);
        await fs.writeFile(outputFile, JSON.stringify(content, null, 2));

        results.success.push(relativePath);
        console.log(`✅ Extracted: ${relativePath}`);
      }
    } catch (error) {
      console.error(`❌ Failed to process ${relativePath}:`, error.message);
      results.failed.push(relativePath);
    }
  }

  // Generate summary
  results.summary = {
    totalFound: htmlFiles.length,
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
  console.log(`📁 Total HTML files found: ${htmlFiles.length}`);
  console.log(`✅ Successfully extracted: ${results.success.length} pages`);
  console.log(`❌ Failed: ${results.failed.length} pages`);
  console.log(`\n📁 Output saved to: ${OUTPUT_PATH}`);

  return results;
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
      console.log(`${path.join(homePath, 'Documents/vlf old site /www.vasquezlawnc.com/')}\n`);
      process.exit(1);
    }

    // Extract content
    const results = await processAllFiles();

    console.log('\n✨ Content extraction complete!');
    console.log('\nNext steps:');
    console.log('1. Review extracted content in: content-import/old-site-complete/');
    console.log('2. Run: node scripts/enhance-content-seo.js');
    console.log('3. Run: node scripts/generate-enhanced-pages.js\n');
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
