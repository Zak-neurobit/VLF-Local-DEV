const fs = require('fs').promises;
const path = require('path');

// Known pages from vasquezlawnc.com based on the site structure
const knownPages = {
  // Main pages
  home: { url: '/', title: 'Home' },
  attorneys: { url: '/attorneys/', title: 'Attorneys' },
  practiceAreas: { url: '/practice-areas/', title: 'Practice Areas' },
  media: { url: '/media-info/', title: 'Media' },
  blog: { url: '/blog/', title: 'Blog' },
  contact: { url: '/contact/', title: 'Contact' },
  scholarship: { url: '/scholarship/', title: 'Scholarship' },

  // Attorney profiles
  'william-vasquez': { url: '/william-vasquez-attorney/', title: 'William Vasquez' },
  'jillian-baucom': { url: '/attorneys/jillian-baucom/', title: 'Jillian Baucom' },
  'adrianna-ingram': { url: '/attorneys/adrianna-ingram/', title: 'Adrianna Ingram' },
  'christopher-afanador': {
    url: '/attorneys/christopher-afanador/',
    title: 'Christopher Afanador',
  },
  'mark-kelsey': { url: '/attorneys/mark-kelsey/', title: 'Mark Kelsey' },
  'roselyn-torrellas': { url: '/attorneys/roselyn-v-torrellas/', title: 'Roselyn V. Torrellas' },
  'judith-parkes': { url: '/judith-parkes/', title: 'Judith Parkes' },

  // Practice Areas - Immigration
  immigration: { url: '/immigration/', title: 'Immigration' },
  'family-based': { url: '/immigration/family-based-relative', title: 'Family-Based Immigration' },
  'fiance-visas': { url: '/immigration/fiance-k-visas', title: 'Fiancé K Visas' },
  'green-cards': { url: '/immigration/green-cards', title: 'Green Cards' },
  citizenship: {
    url: '/immigration/citizenship-naturalization',
    title: 'Citizenship & Naturalization',
  },
  deportation: { url: '/immigration/deportation-removal-defense', title: 'Deportation Defense' },
  asylum: { url: '/immigration/asylum-refugee-legal-help', title: 'Asylum & Refugee' },
  daca: { url: '/immigration/daca-deferred-action-childhood-arrivals', title: 'DACA' },
  'employment-immigration': {
    url: '/immigration/employment-based-immigration',
    title: 'Employment Immigration',
  },
  'vawa-u-visa': { url: '/immigration/vawa-u-visa-crime-victims', title: 'VAWA & U Visa' },
  't-visa': { url: '/t-visa-immigration-attorneys/', title: 'T Visa' },

  // Practice Areas - Personal Injury
  'personal-injury': { url: '/personal-injury/', title: 'Personal Injury' },
  'car-accidents': { url: '/personal-injury/car-auto-accidents', title: 'Car Accidents' },
  'truck-accidents': { url: '/personal-injury/truck-accidents', title: 'Truck Accidents' },
  'motorcycle-accidents': {
    url: '/personal-injury/motorcycle-accidents',
    title: 'Motorcycle Accidents',
  },
  'pedestrian-accidents': {
    url: '/personal-injury/pedestrian-hit-by-car',
    title: 'Pedestrian Accidents',
  },
  'drunk-driver': {
    url: '/personal-injury/drunk-driver-liability',
    title: 'Drunk Driver Accidents',
  },
  'premises-liability': { url: '/personal-injury/premises-liability', title: 'Premises Liability' },

  // Practice Areas - Workers Compensation
  'workers-comp': { url: '/workers-compensation-job-injury', title: 'Workers Compensation' },
  'construction-injuries': {
    url: '/workers-compensation-job-injury/construction-site-injuries',
    title: 'Construction Injuries',
  },
  'repetitive-stress': {
    url: '/workers-compensation-job-injury/repetitive-stress-carpal-tunnel',
    title: 'Repetitive Stress',
  },
  'third-party-claims': {
    url: '/workers-compensation-job-injury/third-party-injury-claims',
    title: 'Third Party Claims',
  },

  // Practice Areas - Criminal Defense
  'criminal-defense': { url: '/criminal-defense/', title: 'Criminal Defense' },
  dwi: { url: '/criminal-defense/dwi-drunk-driving', title: 'DWI Defense' },
  'drug-crimes': { url: '/criminal-defense/drug-crime-cases', title: 'Drug Crimes' },
  'domestic-violence': {
    url: '/criminal-defense/domestic-violence-abuse',
    title: 'Domestic Violence',
  },
  'traffic-offenses': {
    url: '/criminal-defense/traffic-offenses-tickets',
    title: 'Traffic Offenses',
  },
  expungement: { url: '/criminal-defense/expungement-expunction', title: 'Expungement' },

  // Practice Areas - Family Law
  'family-law': { url: '/family-law/', title: 'Family Law' },
  divorce: { url: '/family-law/divorce', title: 'Divorce' },
  'child-custody': { url: '/family-law/child-custody', title: 'Child Custody' },
  alimony: { url: '/family-law/alimony-spousal-support', title: 'Alimony' },
  'property-division': {
    url: '/family-law/equitable-distribution-property-debt-division',
    title: 'Property Division',
  },

  // Location Pages
  'charlotte-nc': { url: '/charlotte-nc/', title: 'Charlotte NC' },
  'raleigh-nc': { url: '/raleigh-nc/', title: 'Raleigh NC' },
  'durham-nc': { url: '/durham-nc/', title: 'Durham NC' },
  'smithfield-nc': { url: '/smithfield-nc/', title: 'Smithfield NC' },
  'winston-salem': { url: '/winston-salem/', title: 'Winston-Salem' },
  'orlando-fl': { url: '/orlando-fl/', title: 'Orlando FL' },

  // Spanish Pages
  'es-home': { url: '/es/', title: 'Inicio' },
  'es-attorneys': { url: '/es/abogados/', title: 'Abogados' },
  'es-practice-areas': { url: '/es/areas-de-practica', title: 'Áreas de Práctica' },
  'es-immigration': { url: '/es/areas-de-practica/inmigracion', title: 'Inmigración' },
  'es-personal-injury': {
    url: '/es/areas-de-practica/lesiones-personales',
    title: 'Lesiones Personales',
  },
  'es-criminal': { url: '/es/areas-de-practica/defensa-criminal', title: 'Defensa Criminal' },
  'es-workers-comp': {
    url: '/es/areas-de-practica/compensacion-laboral',
    title: 'Compensación Laboral',
  },
  'es-family-law': { url: '/es/areas-de-practica/derecho-familia', title: 'Derecho Familiar' },
  'es-contact': { url: '/es/contacto', title: 'Contacto' },
};

// Important content extracted from the site
const siteContent = {
  mainOffice: {
    address: '819 N Market Dr, Raleigh, NC 27609',
    phone: '(919) 825-1699',
    tollFree: '1-844-967-3536',
    email: 'info@vasquezlawnc.com',
  },

  offices: [
    {
      city: 'Raleigh',
      state: 'NC',
      address: '819 N Market Dr, Raleigh, NC 27609',
      phone: '(919) 825-1699',
    },
    {
      city: 'Charlotte',
      state: 'NC',
      phone: '(704) 766-5775',
    },
    {
      city: 'Smithfield',
      state: 'NC',
      phone: '(919) 934-1100',
    },
    {
      city: 'Winston-Salem',
      state: 'NC',
      phone: '(336) 448-4605',
    },
    {
      city: 'Orlando',
      state: 'FL',
      phone: '(407) 704-3688',
    },
  ],

  practiceAreas: [
    {
      name: 'Immigration Law',
      slug: 'immigration',
      services: [
        'Green Cards',
        'Citizenship & Naturalization',
        'Family-Based Immigration',
        'Employment-Based Immigration',
        'Deportation Defense',
        'DACA Applications',
        'Asylum & Refugee Protection',
        'VAWA & U Visas',
        'T Visas for Trafficking Victims',
        'Adjustment of Status',
        'Visa Process & Appeals',
        'Detention & Bond Hearings',
      ],
    },
    {
      name: 'Personal Injury',
      slug: 'personal-injury',
      services: [
        'Car Accidents',
        'Truck Accidents',
        'Motorcycle Accidents',
        'Pedestrian Accidents',
        'Drunk Driving Accidents',
        'Bicycle Accidents',
        'Premises Liability',
        'Slip and Fall',
        'Wrongful Death',
        'Uninsured Motorist Claims',
      ],
    },
    {
      name: 'Workers Compensation',
      slug: 'workers-compensation',
      services: [
        'Workplace Injuries',
        'Construction Accidents',
        'Repetitive Stress Injuries',
        'Back & Spine Injuries',
        'Mental Health Claims',
        'Third-Party Claims',
        'Denied Claims Appeals',
        'Permanent Disability Benefits',
      ],
    },
    {
      name: 'Criminal Defense',
      slug: 'criminal-defense',
      services: [
        'DWI/DUI Defense',
        'Drug Crimes',
        'Assault & Battery',
        'Domestic Violence',
        'Traffic Violations',
        'Theft & Larceny',
        'White Collar Crimes',
        'Weapons Charges',
        'Probation Violations',
        'Expungements',
      ],
    },
    {
      name: 'Family Law',
      slug: 'family-law',
      services: [
        'Divorce',
        'Child Custody',
        'Child Support',
        'Alimony/Spousal Support',
        'Property Division',
        'Separation Agreements',
        'Domestic Violence Protection',
        'Post-Divorce Modifications',
        'Name Changes',
      ],
    },
    {
      name: 'Traffic Violations',
      slug: 'traffic-violations',
      services: [
        'Speeding Tickets',
        'Reckless Driving',
        'License Restoration',
        'CDL Violations',
        'Insurance Points Reduction',
        'DMV Hearings',
      ],
    },
  ],

  attorneys: [
    {
      name: 'William Vasquez',
      title: 'CEO & Managing Attorney',
      bio: 'William Vasquez is the founder and CEO of Vasquez Law Firm, PLLC. With over 15 years of experience, he has dedicated his career to fighting for the rights of immigrants and injury victims throughout North Carolina and Florida.',
      languages: ['English', 'Spanish'],
      barAdmissions: ['North Carolina', 'Florida'],
      practiceAreas: ['Immigration Law', 'Personal Injury', 'Criminal Defense'],
    },
    {
      name: 'Jillian Baucom',
      title: 'Senior Immigration Attorney',
      bio: 'Jillian Baucom focuses her practice exclusively on immigration law. She has successfully represented hundreds of clients in removal proceedings, family-based petitions, and employment-based immigration matters.',
      languages: ['English'],
      barAdmissions: ['North Carolina'],
      practiceAreas: ['Immigration Law'],
    },
    {
      name: 'Adrianna Ingram',
      title: 'Personal Injury Attorney',
      bio: 'Adrianna Ingram represents injured workers and accident victims throughout North Carolina. Her aggressive advocacy has resulted in millions of dollars in settlements and verdicts for her clients.',
      languages: ['English', 'Spanish'],
      barAdmissions: ['North Carolina'],
      practiceAreas: ['Personal Injury', 'Workers Compensation'],
    },
  ],

  tagline: 'YO PELEO POR TI®',
  taglineEnglish: 'I FIGHT FOR YOU®',
};

async function generatePageManifest() {
  const contentDir = path.join(process.cwd(), 'content-import', 'vasquez-pages');
  await fs.mkdir(contentDir, { recursive: true });

  console.log('📄 Generating Vasquez Law website page manifest...\n');

  // Save page structure
  await fs.writeFile(
    path.join(contentDir, 'site-structure.json'),
    JSON.stringify(
      {
        baseUrl: 'https://www.vasquezlawnc.com',
        pages: knownPages,
        totalPages: Object.keys(knownPages).length,
        lastUpdated: new Date().toISOString(),
      },
      null,
      2
    )
  );

  // Save content data
  await fs.writeFile(
    path.join(contentDir, 'site-content.json'),
    JSON.stringify(siteContent, null, 2)
  );

  // Generate page mapping for our new site
  const pageMapping = {};
  Object.entries(knownPages).forEach(([key, page]) => {
    const vasquezUrl = `https://www.vasquezlawnc.com${page.url}`;
    let ourUrl = page.url;

    // Map to our URL structure
    if (page.url.includes('/attorneys/')) {
      ourUrl = page.url;
    } else if (page.url.includes('/immigration/')) {
      ourUrl = `/practice-areas${page.url}`;
    } else if (page.url.includes('/personal-injury/')) {
      ourUrl = `/practice-areas${page.url}`;
    } else if (page.url.includes('/workers-compensation')) {
      ourUrl = `/practice-areas/workers-compensation`;
    } else if (page.url.includes('/criminal-defense/')) {
      ourUrl = `/practice-areas${page.url}`;
    } else if (page.url.includes('/family-law/')) {
      ourUrl = `/practice-areas${page.url}`;
    }

    pageMapping[vasquezUrl] = {
      originalUrl: vasquezUrl,
      newUrl: ourUrl,
      title: page.title,
      needsImport: true,
    };
  });

  await fs.writeFile(
    path.join(contentDir, 'page-mapping.json'),
    JSON.stringify(pageMapping, null, 2)
  );

  console.log('✅ Page manifest generated successfully!');
  console.log(`\n📊 Summary:`);
  console.log(`  - Total pages identified: ${Object.keys(knownPages).length}`);
  console.log(`  - Practice areas: ${siteContent.practiceAreas.length}`);
  console.log(`  - Attorneys: ${siteContent.attorneys.length}`);
  console.log(`  - Office locations: ${siteContent.offices.length}`);
  console.log(`\n📁 Files created in: content-import/vasquez-pages/`);
  console.log(`  - site-structure.json`);
  console.log(`  - site-content.json`);
  console.log(`  - page-mapping.json`);

  console.log(`\n✨ Next steps:`);
  console.log(`  1. Review the page mapping`);
  console.log(`  2. Create corresponding pages in our Next.js app`);
  console.log(`  3. Import actual content from each page`);
  console.log(`  4. Implement redirects from old URLs to new`);
}

// Run the extraction
generatePageManifest().catch(console.error);
