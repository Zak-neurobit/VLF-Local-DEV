const fs = require('fs').promises;
const path = require('path');

async function createPagesFromImport() {
  console.log('🚀 Creating Next.js pages from imported content...\n');

  const contentDir = path.join(process.cwd(), 'content-import', 'pages');
  const pagesDir = path.join(process.cwd(), 'src', 'app');

  // Load all imported content
  const files = await fs.readdir(contentDir);
  const jsonFiles = files.filter(f => f.endsWith('.json'));

  let createdCount = 0;
  let skippedCount = 0;

  for (const file of jsonFiles) {
    const content = JSON.parse(await fs.readFile(path.join(contentDir, file), 'utf-8'));

    // Skip if it's the homepage or already exists
    if (content.path === '/' || content.path === '/home/') {
      skippedCount++;
      continue;
    }

    // Determine the page directory structure
    const pagePath = (content.path || '').replace(/\/$/, ''); // Remove trailing slash
    const segments = pagePath.split('/').filter(Boolean);

    if (!pagePath || pagePath === '') {
      console.log(`  ⏭️  Skipping (no path): ${file}`);
      skippedCount++;
      continue;
    }

    // Map old URLs to our new structure
    let targetPath = pagePath;
    if (pagePath.includes('/immigration/')) {
      targetPath = `/practice-areas${pagePath}`;
    } else if (pagePath.includes('/personal-injury/')) {
      targetPath = `/practice-areas${pagePath}`;
    } else if (pagePath.includes('/workers-compensation')) {
      targetPath = `/practice-areas/workers-compensation${pagePath.replace('/workers-compensation-job-injury', '')}`;
    } else if (pagePath.includes('/criminal-defense/')) {
      targetPath = `/practice-areas${pagePath}`;
    } else if (pagePath.includes('/family-law/')) {
      targetPath = `/practice-areas${pagePath}`;
    } else if (pagePath.includes('/traffic-tickets')) {
      targetPath = `/practice-areas/traffic-violations`;
    }

    // Create directory structure
    const pageDir = path.join(pagesDir, ...targetPath.split('/').filter(Boolean));
    await fs.mkdir(pageDir, { recursive: true });

    // Check if page.tsx already exists
    const pageFile = path.join(pageDir, 'page.tsx');
    try {
      await fs.access(pageFile);
      console.log(`  ⏭️  Skipping (exists): ${targetPath}`);
      skippedCount++;
      continue;
    } catch {
      // File doesn't exist, create it
    }

    // Generate page content
    const pageContent = generatePageContent(content, targetPath);
    await fs.writeFile(pageFile, pageContent);

    console.log(`  ✅ Created: ${targetPath}`);
    createdCount++;
  }

  console.log(`\n✨ Page creation complete!`);
  console.log(`   Created: ${createdCount} pages`);
  console.log(`   Skipped: ${skippedCount} pages`);
}

function generatePageContent(content, targetPath) {
  // Extract main content text
  let mainText = '';
  if (content.mainContent && content.mainContent.length > 0) {
    mainText = content.mainContent.map(section => section.content).join('\n\n');
  } else {
    mainText = content.fullText || '';
  }

  // Extract key information
  const faqs = content.faqs || [];
  const testimonials = content.testimonials || [];
  const contactInfo = content.contactInfo || { phones: [], emails: [], addresses: [] };

  // Clean up the title
  const title = content.title.replace(' - Vasquez Law Firm, PLLC', '');

  // Generate the page component
  return `import { Metadata } from 'next';
import Link from 'next/link';
import { Phone, Mail, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: '${content.title}',
  description: '${content.metaDescription}',
  openGraph: {
    title: '${content.ogTitle || content.title}',
    description: '${content.ogDescription || content.metaDescription}',
    ${content.ogImage ? `images: ['${content.ogImage}'],` : ''}
  },
};

export default function ${getComponentName(targetPath)}Page() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#6B1F2E] to-[#8B2635] text-white py-20">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            ${content.h1 || title}
          </h1>
          ${
            content.metaDescription
              ? `
          <p className="text-xl md:text-2xl max-w-3xl">
            ${content.metaDescription}
          </p>`
              : ''
          }
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            ${formatMainContent(content.mainContent || [])}
          </div>
        </div>
      </section>

      ${
        faqs.length > 0
          ? `
      {/* FAQs Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#6B1F2E] mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            ${faqs
              .map(
                faq => `
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                ${escapeQuotes(faq.question)}
              </h3>
              <p className="text-gray-700">
                ${escapeQuotes(faq.answer)}
              </p>
            </div>`
              )
              .join('')}
          </div>
        </div>
      </section>`
          : ''
      }

      ${
        testimonials.length > 0
          ? `
      {/* Testimonials Section */}
      <section className="py-16 bg-[#6B1F2E] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8 text-center">
            What Our Clients Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            ${testimonials
              .slice(0, 3)
              .map(
                testimonial => `
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <p className="italic mb-4">
                "${escapeQuotes(testimonial.quote)}"
              </p>
              <p className="font-semibold">
                — ${escapeQuotes(testimonial.author)}
              </p>
            </div>`
              )
              .join('')}
          </div>
        </div>
      </section>`
          : ''
      }

      {/* CTA Section */}
      <section className="py-16 bg-[#C9974D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Need Legal Help?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Contact our experienced attorneys today for a consultation
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            ${
              contactInfo.phones.length > 0
                ? `
            <a
              href="tel:${contactInfo.phones[0].number}"
              className="inline-flex items-center justify-center px-8 py-3 bg-white text-[#6B1F2E] font-bold rounded-lg hover:bg-gray-100 transition-all"
            >
              <Phone className="w-5 h-5 mr-2" />
              ${contactInfo.phones[0].text || contactInfo.phones[0].number}
            </a>`
                : ''
            }
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3 bg-[#6B1F2E] text-white font-bold rounded-lg hover:bg-[#8B2635] transition-all"
            >
              Schedule Consultation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}`;
}

function getComponentName(path) {
  const segments = path.split('/').filter(Boolean);
  return segments
    .map(segment =>
      segment
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join('')
    )
    .join('');
}

function formatMainContent(sections) {
  if (!sections || sections.length === 0) {
    return '<p>Contact us for more information about this practice area.</p>';
  }

  return sections
    .map(section => {
      let html = '';
      if (section.heading) {
        html += `<h2>${escapeQuotes(section.heading)}</h2>\n`;
      }
      html += `<p>${escapeQuotes(section.content)}</p>`;
      return html;
    })
    .join('\n\n');
}

function escapeQuotes(text) {
  return text.replace(/'/g, "\\'").replace(/"/g, '\\"').replace(/\n/g, ' ').trim();
}

// Run the script
createPagesFromImport().catch(console.error);
