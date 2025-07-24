#!/usr/bin/env node

const fs = require('fs').promises;
const path = require('path');
const { execSync } = require('child_process');

async function generateAllSitemaps() {
  console.log('Generating comprehensive sitemaps...\n');
  
  const baseUrl = 'https://www.vasquezlawnc.com';
  const appDir = path.join(process.cwd(), 'src/app');
  
  // Find all page files using shell command (more reliable)
  const pageFiles = execSync(`find "${appDir}" \\( -name "page.tsx" -o -name "page.ts" \\) | grep -v node_modules | grep -v "api/" | grep -v "_"`)
    .toString()
    .trim()
    .split('\n')
    .filter(Boolean);
  
  console.log(`Found ${pageFiles.length} page files`);
  
  // Process pages into structured data
  const pages = new Map();
  const now = new Date().toISOString();
  
  for (const file of pageFiles) {
    // Convert file path to URL path
    const relativePath = file.replace(appDir, '').replace(/\/page\.(tsx|ts)$/, '');
    let urlPath = relativePath || '/';
    
    // Clean up the path
    urlPath = urlPath.replace(/\/\([^)]+\)/g, ''); // Remove route groups
    
    // Skip API routes and other non-public routes
    if (urlPath.includes('/api/') || urlPath.includes('/_') || 
        urlPath.includes('/sitemap') || urlPath.includes('/robots') ||
        urlPath.includes('/webhook') || urlPath.includes('/.well-known')) {
      continue;
    }
    
    // Determine language
    const isSpanish = urlPath.startsWith('/es/') || urlPath.includes('/es/');
    const language = isSpanish ? 'es' : 'en';
    
    // Normalize path for pairing (remove language prefix)
    let normalizedPath = urlPath;
    if (isSpanish && urlPath.startsWith('/es/')) {
      normalizedPath = urlPath.substring(3) || '/';
    } else if (isSpanish && urlPath.startsWith('/es')) {
      normalizedPath = urlPath.substring(3) || '/';
    }
    
    // Get page info
    const pageInfo = {
      path: urlPath,
      language,
      lastmod: now,
      changefreq: getChangeFrequency(urlPath),
      priority: getPriority(urlPath),
    };
    
    // Store in pages map
    if (!pages.has(normalizedPath)) {
      pages.set(normalizedPath, {});
    }
    pages.get(normalizedPath)[language] = pageInfo;
  }
  
  console.log(`\nProcessed ${pages.size} unique page paths`);
  
  // Count statistics
  let totalPages = 0;
  let enPages = 0;
  let esPages = 0;
  let pairedPages = 0;
  
  pages.forEach(pair => {
    if (pair.en) {
      totalPages++;
      enPages++;
    }
    if (pair.es) {
      totalPages++;
      esPages++;
    }
    if (pair.en && pair.es) {
      pairedPages++;
    }
  });
  
  console.log(`Total pages: ${totalPages}`);
  console.log(`English pages: ${enPages}`);
  console.log(`Spanish pages: ${esPages}`);
  console.log(`Pages with both languages: ${pairedPages}`);
  
  // Generate main sitemap with all pages
  const mainSitemap = generateSitemapXML(pages, baseUrl, true);
  await fs.writeFile(path.join(process.cwd(), 'public', 'sitemap-complete.xml'), mainSitemap);
  console.log('\n✅ Generated sitemap-complete.xml');
  
  // Generate language-specific sitemaps
  const enSitemap = generateLanguageSitemap(pages, 'en', baseUrl);
  const esSitemap = generateLanguageSitemap(pages, 'es', baseUrl);
  
  await fs.writeFile(path.join(process.cwd(), 'public', 'sitemap-en.xml'), enSitemap);
  await fs.writeFile(path.join(process.cwd(), 'public', 'sitemap-es.xml'), esSitemap);
  console.log('✅ Generated language-specific sitemaps');
  
  // Generate category-based sitemaps
  const categorySitemaps = [
    { name: 'sitemap-locations.xml', filter: p => p.includes('/locations') || p.includes('/ubicaciones') },
    { name: 'sitemap-practice-areas.xml', filter: p => p.includes('/practice-areas') || p.includes('/areas-de-practica') },
    { name: 'sitemap-blog.xml', filter: p => p.includes('/blog') },
    { name: 'sitemap-near-me.xml', filter: p => p.includes('/near-me') || p.includes('/cerca-de-mi') },
    { name: 'sitemap-attorneys.xml', filter: p => p.includes('/attorneys') || p.includes('/abogados') },
  ];
  
  for (const { name, filter } of categorySitemaps) {
    const filteredPages = new Map();
    pages.forEach((pair, normalizedPath) => {
      const shouldInclude = (pair.en && filter(pair.en.path)) || (pair.es && filter(pair.es.path));
      if (shouldInclude) {
        filteredPages.set(normalizedPath, pair);
      }
    });
    
    if (filteredPages.size > 0) {
      const xml = generateSitemapXML(filteredPages, baseUrl, true);
      await fs.writeFile(path.join(process.cwd(), 'public', name), xml);
      console.log(`✅ Generated ${name} with ${filteredPages.size} page pairs`);
    }
  }
  
  // Generate sitemap index
  const sitemapIndex = generateSitemapIndex(baseUrl);
  await fs.writeFile(path.join(process.cwd(), 'public', 'sitemap.xml'), sitemapIndex);
  console.log('✅ Generated sitemap index');
  
  console.log('\n🎉 All sitemaps generated successfully!');
}

function getChangeFrequency(path) {
  if (path === '/' || path === '/es') return 'daily';
  if (path.includes('/blog')) return 'weekly';
  if (path.includes('/news')) return 'daily';
  if (path.includes('/attorneys') || path.includes('/abogados')) return 'monthly';
  if (path.includes('/practice-areas') || path.includes('/areas-de-practica')) return 'monthly';
  if (path.includes('/locations') || path.includes('/ubicaciones')) return 'weekly';
  if (path.includes('/near-me') || path.includes('/cerca-de-mi')) return 'weekly';
  return 'weekly';
}

function getPriority(path) {
  if (path === '/' || path === '/es') return 1.0;
  if (path === '/practice-areas' || path === '/es/areas-de-practica') return 0.95;
  if (path === '/locations/nc' || path === '/es/ubicaciones/nc') return 0.95;
  
  // Main practice area pages
  if ((path.includes('/practice-areas/') || path.includes('/areas-de-practica/')) && path.split('/').length === 3) return 0.9;
  
  // Major city pages
  const majorCities = ['charlotte', 'raleigh', 'durham', 'greensboro', 'winston-salem'];
  if (path.includes('/locations/') && majorCities.some(city => path.includes(city))) return 0.9;
  
  // Location + practice area combos
  if (path.includes('/locations/') && (path.includes('-lawyer') || path.includes('-attorney'))) return 0.85;
  
  // Sub-practice areas
  if ((path.includes('/practice-areas/') || path.includes('/areas-de-practica/')) && path.split('/').length === 4) return 0.8;
  
  if (path.includes('/attorneys') || path.includes('/abogados')) return 0.8;
  if (path.includes('/contact') || path.includes('/contacto')) return 0.8;
  if (path.includes('/blog')) return 0.7;
  if (path.includes('/near-me') || path.includes('/cerca-de-mi')) return 0.7;
  
  return 0.6;
}

function generateSitemapXML(pages, baseUrl, includeAlternates = false) {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  
  if (includeAlternates) {
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n';
    xml += '        xmlns:xhtml="http://www.w3.org/1999/xhtml">\n';
  } else {
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  }
  
  pages.forEach((pair) => {
    // Add English page
    if (pair.en) {
      xml += '  <url>\n';
      xml += `    <loc>${baseUrl}${pair.en.path}</loc>\n`;
      xml += `    <lastmod>${pair.en.lastmod}</lastmod>\n`;
      xml += `    <changefreq>${pair.en.changefreq}</changefreq>\n`;
      xml += `    <priority>${pair.en.priority}</priority>\n`;
      
      if (includeAlternates && pair.es) {
        xml += `    <xhtml:link rel="alternate" hreflang="es" href="${baseUrl}${pair.es.path}"/>\n`;
        xml += `    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}${pair.en.path}"/>\n`;
      }
      
      xml += '  </url>\n';
    }
    
    // Add Spanish page if no English equivalent
    if (pair.es && !pair.en) {
      xml += '  <url>\n';
      xml += `    <loc>${baseUrl}${pair.es.path}</loc>\n`;
      xml += `    <lastmod>${pair.es.lastmod}</lastmod>\n`;
      xml += `    <changefreq>${pair.es.changefreq}</changefreq>\n`;
      xml += `    <priority>${pair.es.priority}</priority>\n`;
      xml += '  </url>\n';
    }
  });
  
  xml += '</urlset>';
  return xml;
}

function generateLanguageSitemap(pages, language, baseUrl) {
  const filteredPages = new Map();
  pages.forEach((pair, normalizedPath) => {
    if (pair[language]) {
      filteredPages.set(normalizedPath, { [language]: pair[language] });
    }
  });
  
  return generateSitemapXML(filteredPages, baseUrl, false);
}

function generateSitemapIndex(baseUrl) {
  const now = new Date().toISOString();
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${baseUrl}/sitemap-complete.xml</loc>
    <lastmod>${now}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}/sitemap-locations.xml</loc>
    <lastmod>${now}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}/sitemap-practice-areas.xml</loc>
    <lastmod>${now}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}/sitemap-blog.xml</loc>
    <lastmod>${now}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}/sitemap-near-me.xml</loc>
    <lastmod>${now}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}/sitemap-attorneys.xml</loc>
    <lastmod>${now}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}/sitemap-en.xml</loc>
    <lastmod>${now}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}/sitemap-es.xml</loc>
    <lastmod>${now}</lastmod>
  </sitemap>
</sitemapindex>`;
}

// Run the generator
generateAllSitemaps().catch(console.error);