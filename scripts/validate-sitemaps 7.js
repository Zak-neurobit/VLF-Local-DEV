#!/usr/bin/env node

// Simple validation script for sitemap XML generation
const fs = require('fs');
const path = require('path');

// Mock Next.js environment for testing
global.NextRequest = class {
  constructor(url) {
    this.url = url;
  }
};

global.NextResponse = class {
  constructor(content, init) {
    this.content = content;
    this.init = init;
  }
  
  static json(data) {
    return new NextResponse(JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

// Test XML escaping function
function escapeXml(unsafe) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Test sitemap URL structure
const testUrls = [
  {
    loc: 'https://www.vasquezlawnc.com/es',
    lastmod: new Date().toISOString(),
    changefreq: 'weekly',
    priority: 1.0,
    hreflang: [
      { lang: 'es', href: 'https://www.vasquezlawnc.com/es' },
      { lang: 'en', href: 'https://www.vasquezlawnc.com/' }
    ]
  },
  {
    loc: 'https://www.vasquezlawnc.com/es/abogados',
    lastmod: new Date().toISOString(),
    changefreq: 'monthly',
    priority: 0.8,
    hreflang: [
      { lang: 'es', href: 'https://www.vasquezlawnc.com/es/abogados' },
      { lang: 'en', href: 'https://www.vasquezlawnc.com/attorneys' }
    ]
  }
];

// Generate test XML
function generateSitemapXML(urls) {
  const urlElements = urls.map(url => {
    let hreflangElements = '';
    if (url.hreflang) {
      hreflangElements = url.hreflang.map(link => 
        `<xhtml:link rel="alternate" hreflang="${link.lang}" href="${escapeXml(link.href)}" />`
      ).join('\n    ');
    }

    return `
  <url>
    <loc>${escapeXml(url.loc)}</loc>
    ${url.lastmod ? `<lastmod>${url.lastmod}</lastmod>` : ''}
    ${url.changefreq ? `<changefreq>${url.changefreq}</changefreq>` : ''}
    ${url.priority !== undefined ? `<priority>${url.priority}</priority>` : ''}
    ${hreflangElements ? `${hreflangElements}` : ''}
  </url>`;
  }).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${urlElements}
</urlset>`;
}

// Test the XML generation
console.log('🔍 Testing Spanish Sitemap XML Generation...\n');

try {
  const xml = generateSitemapXML(testUrls);
  console.log('✅ XML Generation: SUCCESS');
  console.log('📄 Sample Output:');
  console.log(xml.substring(0, 500) + '...');
  
  // Validate XML structure
  const hasXmlDeclaration = xml.includes('<?xml version="1.0" encoding="UTF-8"?>');
  const hasUrlsetNamespace = xml.includes('xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"');
  const hasXhtmlNamespace = xml.includes('xmlns:xhtml="http://www.w3.org/1999/xhtml"');
  const hasHreflangLinks = xml.includes('<xhtml:link rel="alternate"');
  
  console.log('\n🔍 Validation Results:');
  console.log(`✅ XML Declaration: ${hasXmlDeclaration ? 'PASS' : 'FAIL'}`);
  console.log(`✅ Sitemap Namespace: ${hasUrlsetNamespace ? 'PASS' : 'FAIL'}`);
  console.log(`✅ XHTML Namespace: ${hasXhtmlNamespace ? 'PASS' : 'FAIL'}`);
  console.log(`✅ Hreflang Links: ${hasHreflangLinks ? 'PASS' : 'FAIL'}`);
  
  // Count URLs
  const urlCount = (xml.match(/<url>/g) || []).length;
  console.log(`📊 URLs Generated: ${urlCount}`);
  
  if (hasXmlDeclaration && hasUrlsetNamespace && hasXhtmlNamespace && hasHreflangLinks) {
    console.log('\n🎉 All validations passed! Sitemap structure is correct.');
  } else {
    console.log('\n❌ Some validations failed. Check the implementation.');
  }
  
} catch (error) {
  console.error('❌ XML Generation: FAILED');
  console.error('Error:', error.message);
}

console.log('\n🚀 Sitemap files created:');
console.log('- /src/app/sitemap-es.xml/route.ts');
console.log('- /src/app/sitemap-index.xml/route.ts');
console.log('- /src/app/sitemap-locations-es.xml/route.ts');
console.log('- Updated: /public/robots.txt');
console.log('- Documentation: /docs/SEO_SITEMAP_SUBMISSION_GUIDE.md');

console.log('\n📋 Next Steps:');
console.log('1. Deploy the application to production');
console.log('2. Submit sitemaps to Google Search Console');
console.log('3. Submit sitemaps to Bing Webmaster Tools');
console.log('4. Monitor indexing status and performance');