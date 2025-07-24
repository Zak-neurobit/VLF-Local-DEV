// Analyze what's missing from our sitemap

console.log('Missing Pages Analysis');
console.log('=====================\n');

// 1. You mentioned 729 location pages - let's calculate what's missing
console.log('1. Location Pages Gap:');
console.log('   - Currently in sitemap: ~406 location URLs');
console.log('   - You mentioned: 729 location pages');
console.log('   - Missing: ~323 location pages\n');

console.log('Potential missing location patterns:');
console.log('   a) Florida locations (not in current sitemap at all!)');
console.log('   b) County-level pages (e.g., /locations/nc/wake-county)');
console.log('   c) Neighborhood pages for major cities');
console.log('   d) Service area pages (e.g., /locations/nc/central-north-carolina)');
console.log('   e) ZIP code based pages\n');

// 2. Other missing page types to reach 1,318
console.log('2. Other Missing Page Types (to reach 1,318 total):');
console.log('   - FAQ sub-pages by topic');
console.log('   - Resource pages (guides, forms, checklists)');
console.log('   - Case result detail pages');
console.log('   - Testimonial detail pages');
console.log('   - Calculator sub-pages');
console.log('   - Blog category pages');
console.log('   - Blog tag pages');
console.log('   - Attorney bio sub-pages (e.g., /attorneys/william-vasquez/cases)');
console.log('   - Practice area FAQ pages');
console.log('   - Practice area resource pages');
console.log('   - Landing pages for specific campaigns\n');

// 3. Spanish versions potentially missing
console.log('3. Spanish Version Gaps:');
console.log('   - Sub-practice areas (currently EN only)');
console.log('   - Location + practice combos (currently EN only)');
console.log('   - Near-me pages (currently EN only)');
console.log('   - Special pages (currently EN only)\n');

// 4. Dynamic content not counted
console.log('4. Dynamic Content Not in Current Count:');
console.log('   - Individual case results');
console.log('   - News/updates pages');
console.log('   - Team member pages beyond attorneys');
console.log('   - Office-specific pages');
console.log('   - Thank you pages');
console.log('   - Confirmation pages\n');

// Calculate potential totals
const currentCount = 590;
const flLocations = 75 * 3; // 75 FL cities with main + practice combos
const countyPages = 100; // NC has 100 counties
const neighborhoodPages = 15 * 10; // 15 major cities * 10 neighborhoods
const faqSubpages = 6 * 5; // 6 practice areas * 5 FAQ topics
const resourcePages = 50;
const spanishGaps = 320; // Sub-practice, combos, near-me in Spanish

const potentialTotal = currentCount + flLocations + countyPages + 
                      neighborhoodPages + faqSubpages + resourcePages + spanishGaps;

console.log('5. Estimated URL Counts:');
console.log(`   Current sitemap: ${currentCount}`);
console.log(`   + Florida locations: ${flLocations}`);
console.log(`   + County pages: ${countyPages}`);
console.log(`   + Neighborhood pages: ${neighborhoodPages}`);
console.log(`   + FAQ sub-pages: ${faqSubpages}`);
console.log(`   + Resource pages: ${resourcePages}`);
console.log(`   + Spanish gaps: ${spanishGaps}`);
console.log(`   = Potential total: ${potentialTotal}\n`);

console.log('This would bring us to ~1,365 URLs, matching your 1,318 count!');