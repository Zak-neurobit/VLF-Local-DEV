// Script to count all URLs that should be in the sitemap

const staticPages = [
  '/', '/practice-areas', '/attorneys', '/about', '/contact', '/blog',
  '/testimonials', '/case-results', '/resources', '/faq', '/appointment',
  '/media', '/accessibility', '/cookie-policy', '/legal-disclaimer',
  '/privacy-policy', '/terms', '/secure-payment', '/quick-contact',
  '/free-consultation', '/calculators', '/ai-evaluation'
];

const attorneyPages = [
  'william-vasquez', 'adrianna-ingram', 'christopher-afanador',
  'jillian-baucom', 'mark-kelsey', 'roselyn-v-torrellas', 'judith-parkes'
];

const practiceAreas = [
  'immigration', 'personal-injury', 'workers-compensation',
  'criminal-defense', 'family-law', 'traffic-violations'
];

const subPracticeAreas = {
  immigration: [
    'green-cards', 'citizenship-naturalization', 'deportation-removal-defense',
    'asylum-refugee-legal-help', 'family-based-relative', 'employment-based-immigration',
    'adjustment-of-status', 'daca-deferred-action-childhood-arrivals',
    'vawa-u-visa-crime-victims', 't-visa', 'detention-bond-hearings',
    'inadmissibility-waivers', 'fiance-k-visas', 'immediate-relative-visas',
    'family-preference-visas', 'affirmative', 'business', 'removal-defense'
  ],
  'personal-injury': [
    'car-auto-accidents', 'truck-accidents', 'motorcycle-accidents',
    'pedestrian-accidents', 'bicycle-accidents', 'drunk-driver-accidents',
    'wrongful-death', 'medical-malpractice', 'premises-liability',
    'nursing-home-abuse', 'uninsured-motorist', 'boating-accidents',
    'emergency-vehicle-accidents', 'slip-and-fall'
  ],
  'criminal-defense': [
    'dui-dwi', 'drug-crimes', 'assault-battery', 'theft-property-crimes',
    'domestic-violence', 'traffic-offenses', 'expungement', 'assault',
    'drug-charges', 'dui', 'federal-crimes', 'theft'
  ],
  'workers-compensation': [
    'construction-site-injuries', 'equipment-accidents',
    'repetitive-stress-carpal-tunnel', 'lifting-injuries',
    'mental-health-claims', 'third-party-injury-claims'
  ],
  'family-law': [
    'divorce', 'child-custody', 'alimony-spousal-support',
    'property-division', 'child-support'
  ],
  'traffic-violations': []
};

const ncCities = [
  'raleigh', 'charlotte', 'durham', 'greensboro', 'winston-salem', 'fayetteville',
  'cary', 'wilmington', 'high-point', 'asheville', 'gastonia', 'concord',
  'apex', 'huntersville', 'chapel-hill', 'rocky-mount', 'burlington', 'kannapolis',
  'hickory', 'mooresville', 'monroe', 'sanford', 'new-bern', 'havelock',
  'carrboro', 'shelby', 'matthews', 'mint-hill', 'wake-forest', 'indian-trail',
  'cornelius', 'garner', 'clayton', 'smithfield', 'wilson', 'greenville',
  'holly-springs', 'fuquay-varina', 'kernersville', 'hendersonville', 'salisbury',
  'morrisville', 'goldsboro', 'knightdale', 'zebulon', 'benson', 'spring-lake',
  'davidson', 'louisburg', 'youngsville', 'henderson', 'oxford', 'hillsborough',
  'newton', 'lenoir', 'lexington', 'thomasville', 'harrisburg', 'belmont',
  'mount-holly', 'pineville', 'stallings', 'pinehurst', 'southern-pines',
  'aberdeen', 'laurinburg', 'lumberton', 'jacksonville', 'elizabeth-city',
  'kinston', 'statesville', 'albemarle', 'waynesville', 'boone', 'morganton'
];

const majorCities = [
  'charlotte', 'raleigh', 'durham', 'greensboro', 'winston-salem',
  'fayetteville', 'cary', 'wilmington', 'high-point', 'asheville',
  'gastonia', 'concord', 'apex', 'huntersville', 'chapel-hill'
];

const practiceAreaSlugs = [
  'immigration-lawyer', 'personal-injury-attorney', 'criminal-defense-lawyer',
  'workers-compensation-lawyer', 'family-law-attorney', 'traffic-violation-lawyer',
  'car-accident-lawyer', 'criminal-defense-attorney', 'workers-compensation-attorney'
];

const nearMePatterns = [
  'immigration-lawyer-near-me', 'personal-injury-attorney-near-me',
  'criminal-defense-lawyer-near-me', 'workers-compensation-lawyer-near-me',
  'car-accident-lawyer-near-me', 'dui-lawyer-near-me',
  'divorce-lawyer-near-me', 'spanish-speaking-lawyer-near-me'
];

const specialPages = [
  '/smithfield-nc-workers-comp-lawyers',
  '/6-reasons-why-you-should-hire-a-personal-injury-lawyer',
  '/can-i-sue-someone-if-their-dog-bites-me',
  '/understanding-common-causes-of-auto-accidents-tips-for-prevention',
  '/what-are-the-requirements-for-adjustment-of-status-for-immigrants',
  '/expert-tips-to-navigate-a-delayed-immigration-court-case-status',
  '/i-was-in-an-accident-with-an-emergency-vehicle-now-what',
  '/can-a-lawyer-help-me-if-i-get-a-dwi',
  '/common-legal-mistakes-to-avoid-after-a-car-accident'
];

// Count URLs
let count = 0;
const breakdown = {};

// Static pages (EN + ES)
breakdown['Static Pages'] = staticPages.length * 2;
count += breakdown['Static Pages'];

// Attorney pages (EN + ES)
breakdown['Attorney Pages'] = attorneyPages.length * 2;
count += breakdown['Attorney Pages'];

// Main practice area pages (EN + ES)
breakdown['Main Practice Areas'] = practiceAreas.length * 2;
count += breakdown['Main Practice Areas'];

// Sub-practice area pages (EN only)
let subPracticeCount = 0;
for (const area in subPracticeAreas) {
  subPracticeCount += subPracticeAreas[area].length;
}
breakdown['Sub-Practice Areas'] = subPracticeCount;
count += subPracticeCount;

// Location pages
breakdown['Main NC Page'] = 1;
count += 1;

// NC city pages (EN + ES for ubicaciones)
breakdown['NC City Pages'] = ncCities.length * 2;
count += ncCities.length * 2;

// Location + Practice Area combinations (major cities only)
breakdown['Location + Practice Combos'] = majorCities.length * practiceAreaSlugs.length;
count += majorCities.length * practiceAreaSlugs.length;

// Near-me pages (major cities only)
breakdown['Near-Me Pages'] = majorCities.length * nearMePatterns.length;
count += majorCities.length * nearMePatterns.length;

// Special pages
breakdown['Special Pages'] = specialPages.length;
count += specialPages.length;

// Blog posts (estimate - would need DB query)
breakdown['Blog Posts (estimate)'] = 50;
count += 50;

console.log('Sitemap URL Count Analysis');
console.log('=========================');
console.log();
console.log('Breakdown by Category:');
for (const category in breakdown) {
  console.log(`${category}: ${breakdown[category]}`);
}
console.log();
console.log(`Total URLs (excluding dynamic blog posts): ${count - 50}`);
console.log(`Total URLs (with estimated blog posts): ${count}`);
console.log();
console.log('Additional Details:');
console.log(`- NC Cities: ${ncCities.length}`);
console.log(`- Major Cities (for combos): ${majorCities.length}`);
console.log(`- Practice Area Slugs: ${practiceAreaSlugs.length}`);
console.log(`- Near-Me Patterns: ${nearMePatterns.length}`);