import fs from 'fs';
import path from 'path';
import { ncCities } from '../src/lib/seo/local-seo-generator';

const practiceAreas = [
  { name: 'Immigration Lawyer', slug: 'immigration-lawyer' },
  { name: 'Personal Injury Attorney', slug: 'personal-injury-attorney' },
  { name: 'Workers Compensation Lawyer', slug: 'workers-compensation-lawyer' },
  { name: 'Criminal Defense Attorney', slug: 'criminal-defense-attorney' },
  { name: 'Car Accident Lawyer', slug: 'car-accident-lawyer' },
];

function generateLocationSitemap() {
  const baseUrl = 'https://www.vasquezlawnc.com';
  const today = new Date().toISOString().split('T')[0];
  
  const locationUrls: string[] = [];
  
  // Add main NC page
  locationUrls.push(`
    <url>
      <loc>${baseUrl}/locations/nc</loc>
      <lastmod>${today}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.9</priority>
    </url>`);
  
  // Add all city pages and practice area combinations
  Object.keys(ncCities).forEach(citySlug => {
    // Main city page
    locationUrls.push(`
    <url>
      <loc>${baseUrl}/locations/nc/${citySlug}</loc>
      <lastmod>${today}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.8</priority>
    </url>`);
    
    // Practice area pages for each city
    practiceAreas.forEach(area => {
      locationUrls.push(`
    <url>
      <loc>${baseUrl}/locations/nc/${citySlug}/${area.slug}</loc>
      <lastmod>${today}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.7</priority>
    </url>`);
    });
  });
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${locationUrls.join('')}
</urlset>`;

  // Write sitemap to public directory
  const sitemapPath = path.join(process.cwd(), 'public', 'sitemap-locations-nc.xml');
  fs.writeFileSync(sitemapPath, sitemap);
  
  console.log(`✅ Generated sitemap with ${locationUrls.length} NC location URLs`);
  console.log(`📄 Saved to: ${sitemapPath}`);
  
  // Also create a text file with all URLs for easy reference
  const urlList = locationUrls.map(url => {
    const match = url.match(/<loc>(.*?)<\/loc>/);
    return match ? match[1] : '';
  }).filter(Boolean).join('\n');
  
  const urlListPath = path.join(process.cwd(), 'nc-location-urls.txt');
  fs.writeFileSync(urlListPath, urlList);
  console.log(`📋 URL list saved to: ${urlListPath}`);
}

generateLocationSitemap();