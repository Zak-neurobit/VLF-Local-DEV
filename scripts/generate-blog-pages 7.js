const fs = require('fs').promises;
const path = require('path');

const contentDir = path.join(process.cwd(), 'content-import/blog-posts');
const blogDir = path.join(process.cwd(), 'src/app/blog');

// Blog post page template
const blogPageTemplate = slug => `import React from 'react';
import BlogPostPage from '../\\[slug\\]/page';

export default function ${slug
  .split('-')
  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
  .join('')}Page() {
  return <BlogPostPage />;
}

export async function generateMetadata() {
  try {
    const response = await fetch(\`\${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/blog/${slug}\`);
    const data = await response.json();
    
    if (data.post) {
      return {
        title: data.post.title + ' | Vasquez Law Firm, PLLC - YO PELEO POR TI',
        description: data.post.metaDescription || data.post.excerpt,
        keywords: data.post.keywords?.join(', ') || '',
        openGraph: {
          title: data.post.title,
          description: data.post.metaDescription || data.post.excerpt,
          type: 'article',
          publishedTime: data.post.publishedAt,
          authors: [data.post.author],
          images: data.post.featuredImage ? [data.post.featuredImage] : [],
        },
        twitter: {
          card: 'summary_large_image',
          title: data.post.title,
          description: data.post.metaDescription || data.post.excerpt,
          images: data.post.featuredImage ? [data.post.featuredImage] : [],
        },
        alternates: {
          canonical: \`\${process.env.NEXT_PUBLIC_BASE_URL}/blog/${slug}\`,
        },
      };
    }
  } catch (error) {
    console.error('Error generating metadata:', error);
  }
  
  return {
    title: 'Blog Post | Vasquez Law Firm, PLLC - YO PELEO POR TI',
    description: 'Legal insights and news from Vasquez Law Firm',
  };
}`;

function generateSlug(filename) {
  return filename
    .replace('.json', '')
    .replace('.md', '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

async function isValidBlogPost(filename) {
  try {
    const filePath = path.join(contentDir, filename);
    const content = await fs.readFile(filePath, 'utf-8');
    const data = JSON.parse(content);

    // Skip category pages and non-blog posts
    if (data.type !== 'blog-post' || data.url?.includes('/category/')) {
      return false;
    }

    // Must have a title or headline
    if (!data.title && !data.headline) {
      return false;
    }

    return true;
  } catch (error) {
    return false;
  }
}

async function generateBlogPages() {
  try {
    console.log('🚀 Starting blog page generation...');

    // Read all JSON files from blog posts directory
    const files = await fs.readdir(contentDir);
    const jsonFiles = files.filter(file => file.endsWith('.json'));

    console.log(`📁 Found ${jsonFiles.length} JSON files to process`);

    let created = 0;
    let skipped = 0;

    for (const file of jsonFiles) {
      try {
        // Check if it's a valid blog post
        const isValid = await isValidBlogPost(file);
        if (!isValid) {
          skipped++;
          continue;
        }

        const slug = generateSlug(file);
        const pageDir = path.join(blogDir, slug);
        const pagePath = path.join(pageDir, 'page.tsx');

        // Check if page already exists
        try {
          await fs.access(pagePath);
          console.log(`⚠️  Page already exists: ${slug}`);
          skipped++;
          continue;
        } catch (error) {
          // File doesn't exist, we can create it
        }

        // Create directory
        await fs.mkdir(pageDir, { recursive: true });

        // Create page file
        const pageContent = blogPageTemplate(slug);
        await fs.writeFile(pagePath, pageContent);

        console.log(`✅ Created page: ${slug}`);
        created++;
      } catch (error) {
        console.error(`❌ Error processing ${file}:`, error.message);
        skipped++;
      }
    }

    console.log(`\n📊 Generation complete:`);
    console.log(`   ✅ Created: ${created} pages`);
    console.log(`   ⚠️  Skipped: ${skipped} files`);
    console.log(`   📝 Total processed: ${jsonFiles.length} files`);

    // Also generate Spanish blog pages if needed
    await generateSpanishBlogPages();
  } catch (error) {
    console.error('❌ Error generating blog pages:', error);
    process.exit(1);
  }
}

async function generateSpanishBlogPages() {
  console.log('\n🌍 Checking for Spanish blog posts...');

  const files = await fs.readdir(contentDir);
  const jsonFiles = files.filter(file => file.endsWith('.json'));

  let spanishCount = 0;

  for (const file of jsonFiles) {
    try {
      const isValid = await isValidBlogPost(file);
      if (!isValid) continue;

      const filePath = path.join(contentDir, file);
      const content = await fs.readFile(filePath, 'utf-8');
      const data = JSON.parse(content);

      // Detect Spanish content
      const title = data.title || data.headline || '';
      const text = title.toLowerCase();

      const spanishIndicators = [
        'cómo',
        'qué',
        'dónde',
        'cuándo',
        'por qué',
        'el',
        'la',
        'los',
        'las',
        'de',
        'para',
        'inmigración',
        'abogado',
        'ley',
        'derechos',
      ];

      const spanishMatches = spanishIndicators.filter(word => text.includes(word)).length;

      if (spanishMatches >= 3) {
        spanishCount++;
        const slug = generateSlug(file);

        // Create Spanish version in es/blog directory
        const esPageDir = path.join(process.cwd(), 'src/app/es/blog', slug);
        const esPagePath = path.join(esPageDir, 'page.tsx');

        try {
          await fs.access(esPagePath);
          // Already exists
        } catch (error) {
          await fs.mkdir(esPageDir, { recursive: true });
          const esPageContent = blogPageTemplate(slug);
          await fs.writeFile(esPagePath, esPageContent);
          console.log(`🌍 Created Spanish page: es/blog/${slug}`);
        }
      }
    } catch (error) {
      // Continue with next file
    }
  }

  if (spanishCount > 0) {
    console.log(`🌍 Found ${spanishCount} Spanish blog posts`);
  }
}

// Run the script
if (require.main === module) {
  generateBlogPages();
}

module.exports = { generateBlogPages };
