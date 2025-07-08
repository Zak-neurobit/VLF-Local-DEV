// Comprehensive internal linking mesh generator
// Creates aggressive cross-linking between locations, services, and practice areas

import { NC_CITIES } from './city-page-generator';
import { CHARLOTTE_NEIGHBORHOODS, RALEIGH_NEIGHBORHOODS, DURHAM_NEIGHBORHOODS } from './neighborhood-page-generator';
import { NEAR_ME_SERVICES, NEAR_ME_CITIES } from './near-me-page-generator';

// Practice areas with their URLs
export const PRACTICE_AREAS = [
  { 
    name: 'Immigration Law', 
    slug: 'immigration',
    subPages: [
      { name: 'Green Cards', slug: 'green-cards' },
      { name: 'Deportation Defense', slug: 'deportation-removal-defense' },
      { name: 'Citizenship', slug: 'citizenship-naturalization' },
      { name: 'Work Visas', slug: 'employment-based-immigration' },
      { name: 'Family Immigration', slug: 'family-based-relative' },
      { name: 'DACA', slug: 'daca-deferred-action-childhood-arrivals' }
    ]
  },
  { 
    name: 'Personal Injury', 
    slug: 'personal-injury',
    subPages: [
      { name: 'Car Accidents', slug: 'car-accidents' },
      { name: 'Truck Accidents', slug: 'truck-accidents' },
      { name: 'Motorcycle Accidents', slug: 'motorcycle-accidents' },
      { name: 'Slip and Fall', slug: 'premises-liability' },
      { name: 'Medical Malpractice', slug: 'medical-malpractice' },
      { name: 'Wrongful Death', slug: 'wrongful-death' }
    ]
  },
  { 
    name: 'Criminal Defense', 
    slug: 'criminal-defense',
    subPages: [
      { name: 'DWI/DUI', slug: 'dwi-drunk-driving' },
      { name: 'Drug Crimes', slug: 'drug-crimes' },
      { name: 'Assault & Battery', slug: 'assault-battery' },
      { name: 'Theft Crimes', slug: 'theft-property-crimes' },
      { name: 'Traffic Offenses', slug: 'traffic-offenses' },
      { name: 'Expungement', slug: 'expungement' }
    ]
  },
  { 
    name: 'Workers Compensation', 
    slug: 'workers-compensation',
    subPages: [
      { name: 'Work Injuries', slug: 'work-injuries' },
      { name: 'Construction Accidents', slug: 'construction-accidents' },
      { name: 'Repetitive Stress', slug: 'repetitive-stress-injuries' },
      { name: 'Denied Claims', slug: 'denied-claims' },
      { name: 'Permanent Disability', slug: 'permanent-disability' }
    ]
  }
];

// Link types with anchor text variations
export const LINK_TYPES = {
  location: [
    '{service} in {location}',
    '{location} {service}',
    'Best {service} in {location}',
    '{service} near {location}',
    'Top {location} {service}'
  ],
  service: [
    '{service} Lawyers',
    '{service} Attorneys',
    '{service} Law Firm',
    'Expert {service}',
    '{service} Legal Help'
  ],
  nearMe: [
    '{service} Near Me',
    'Find {service} Near Me',
    '{service} Near You',
    'Local {service}',
    'Nearby {service}'
  ],
  emergency: [
    'Emergency {service}',
    '24/7 {service}',
    'Immediate {service} Help',
    'Urgent {service}',
    'Same-Day {service}'
  ]
};

// Generate contextual internal links
export function generateContextualLinks(
  currentPage: { type: string; location?: string; service?: string },
  maxLinks: number = 5
): Array<{ text: string; href: string; title: string }> {
  const links: Array<{ text: string; href: string; title: string }> = [];
  
  // Based on current page type, generate relevant links
  if (currentPage.type === 'location') {
    // On location pages, link to services in that location
    PRACTICE_AREAS.forEach(area => {
      if (links.length < maxLinks) {
        const anchorVariation = LINK_TYPES.location[Math.floor(Math.random() * LINK_TYPES.location.length)];
        const text = anchorVariation
          .replace('{service}', area.name)
          .replace('{location}', currentPage.location || 'North Carolina');
        
        links.push({
          text,
          href: `/locations/nc/${currentPage.location?.toLowerCase().replace(/ /g, '-')}/${area.slug}`,
          title: `${area.name} services available in ${currentPage.location}`
        });
      }
    });
    
    // Add near me links
    if (currentPage.location && links.length < maxLinks) {
      const nearMeVariation = LINK_TYPES.nearMe[Math.floor(Math.random() * LINK_TYPES.nearMe.length)];
      const service = NEAR_ME_SERVICES[Math.floor(Math.random() * NEAR_ME_SERVICES.length)];
      const text = nearMeVariation.replace('{service}', service.service);
      
      links.push({
        text,
        href: `/near-me/${currentPage.location.toLowerCase().replace(/ /g, '-')}-${service.slug}-near-me`,
        title: `Find ${service.service} near you in ${currentPage.location}`
      });
    }
  }
  
  if (currentPage.type === 'service') {
    // On service pages, link to locations where service is available
    const topCities = NC_CITIES.slice(0, 5);
    topCities.forEach(city => {
      if (links.length < maxLinks) {
        const locationVariation = LINK_TYPES.location[Math.floor(Math.random() * LINK_TYPES.location.length)];
        const text = locationVariation
          .replace('{service}', currentPage.service || 'Legal Services')
          .replace('{location}', city.name);
        
        links.push({
          text,
          href: `/locations/nc/${city.slug}`,
          title: `${currentPage.service} available in ${city.name}, NC`
        });
      }
    });
  }
  
  // Add emergency links
  if (links.length < maxLinks) {
    const emergencyVariation = LINK_TYPES.emergency[Math.floor(Math.random() * LINK_TYPES.emergency.length)];
    const randomService = PRACTICE_AREAS[Math.floor(Math.random() * PRACTICE_AREAS.length)];
    const text = emergencyVariation.replace('{service}', randomService.name);
    
    links.push({
      text,
      href: `/practice-areas/${randomService.slug}?emergency=true`,
      title: `Get immediate ${randomService.name} help - Available 24/7`
    });
  }
  
  return links;
}

// Generate footer mega-links section
export function generateFooterMegaLinks() {
  const sections = [];
  
  // Major cities section
  const citiesSection = {
    title: 'Legal Services by City',
    links: NC_CITIES.slice(0, 10).map(city => ({
      text: `Lawyers in ${city.name}`,
      href: `/locations/nc/${city.slug}`,
      priority: city.population > 100000
    }))
  };
  sections.push(citiesSection);
  
  // Practice areas section
  const practiceSection = {
    title: 'Practice Areas',
    links: PRACTICE_AREAS.flatMap(area => [
      {
        text: area.name,
        href: `/practice-areas/${area.slug}`,
        priority: true
      },
      ...area.subPages.slice(0, 2).map(sub => ({
        text: sub.name,
        href: `/practice-areas/${area.slug}/${sub.slug}`,
        priority: false
      }))
    ])
  };
  sections.push(practiceSection);
  
  // Near me section
  const nearMeSection = {
    title: 'Find Lawyers Near You',
    links: NEAR_ME_CITIES.slice(0, 5).flatMap(city => 
      NEAR_ME_SERVICES.slice(0, 2).map(service => ({
        text: `${service.service} Near ${city.name}`,
        href: `/near-me/${city.slug}-${service.slug}-near-me`,
        priority: false
      }))
    )
  };
  sections.push(nearMeSection);
  
  // Emergency section
  const emergencySection = {
    title: '24/7 Emergency Legal Help',
    links: [
      { text: '🚨 Deportation Emergency', href: '/practice-areas/immigration/deportation-removal-defense?emergency=true', priority: true },
      { text: '🚗 Car Accident Emergency', href: '/practice-areas/personal-injury/car-accidents?emergency=true', priority: true },
      { text: '⚖️ Criminal Arrest Help', href: '/practice-areas/criminal-defense?emergency=true', priority: true },
      { text: '🏥 Work Injury Emergency', href: '/practice-areas/workers-compensation?emergency=true', priority: true },
      { text: '📞 Call Now: 1-844-YO-PELEO', href: 'tel:18449673536', priority: true }
    ]
  };
  sections.push(emergencySection);
  
  return sections;
}

// Generate breadcrumb with rich snippets
export function generateSmartBreadcrumbs(
  currentPath: string,
  customLabels?: Record<string, string>
): Array<{ name: string; href: string; current: boolean }> {
  const breadcrumbs = [
    { name: 'Home', href: '/', current: false }
  ];
  
  const pathParts = currentPath.split('/').filter(Boolean);
  let currentHref = '';
  
  pathParts.forEach((part, index) => {
    currentHref += `/${part}`;
    const isLast = index === pathParts.length - 1;
    
    // Smart label generation
    let label = customLabels?.[part] || part
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    
    // Special handling for known sections
    if (part === 'nc') label = 'North Carolina';
    if (part === 'practice-areas') label = 'Practice Areas';
    if (part === 'near-me') label = 'Near Me';
    
    breadcrumbs.push({
      name: label,
      href: currentHref,
      current: isLast
    });
  });
  
  return breadcrumbs;
}

// Generate related content links
export function generateRelatedLinks(
  contentType: string,
  currentSlug: string,
  limit: number = 6
): Array<{ text: string; href: string; description: string }> {
  const related = [];
  
  if (contentType === 'practice-area') {
    // Find current practice area
    const currentArea = PRACTICE_AREAS.find(area => 
      area.slug === currentSlug || 
      area.subPages.some(sub => sub.slug === currentSlug)
    );
    
    if (currentArea) {
      // Add sub-pages from same practice area
      currentArea.subPages.forEach(sub => {
        if (sub.slug !== currentSlug && related.length < limit / 2) {
          related.push({
            text: sub.name,
            href: `/practice-areas/${currentArea.slug}/${sub.slug}`,
            description: `Learn about ${sub.name} services`
          });
        }
      });
      
      // Add related practice areas
      PRACTICE_AREAS.filter(area => area.slug !== currentArea.slug)
        .slice(0, limit - related.length)
        .forEach(area => {
          related.push({
            text: area.name,
            href: `/practice-areas/${area.slug}`,
            description: `Explore our ${area.name} services`
          });
        });
    }
  }
  
  if (contentType === 'location') {
    // Add nearby locations
    const majorCities = ['Charlotte', 'Raleigh', 'Greensboro', 'Durham', 'Winston-Salem'];
    majorCities.forEach(city => {
      if (city.toLowerCase() !== currentSlug && related.length < limit) {
        related.push({
          text: `Legal Services in ${city}`,
          href: `/locations/nc/${city.toLowerCase().replace(/ /g, '-')}`,
          description: `Find lawyers in ${city}, NC`
        });
      }
    });
  }
  
  return related;
}

// Generate SEO-friendly anchor text
export function generateAnchorText(
  targetType: string,
  targetName: string,
  variation: number = 0
): string {
  const variations = {
    'practice-area': [
      `${targetName} Lawyers`,
      `${targetName} Attorneys`,
      `Best ${targetName} Law Firm`,
      `Expert ${targetName} Legal Help`,
      `Top-Rated ${targetName} Services`
    ],
    'location': [
      `${targetName} Legal Services`,
      `Lawyers in ${targetName}`,
      `${targetName} Law Firm`,
      `Find Attorneys in ${targetName}`,
      `${targetName} Legal Help`
    ],
    'attorney': [
      `${targetName}, Esq.`,
      `Attorney ${targetName}`,
      `${targetName} - Legal Expert`,
      `Meet ${targetName}`,
      `${targetName}'s Profile`
    ]
  };
  
  const options = variations[targetType] || [`${targetName}`];
  return options[variation % options.length];
}

// Generate hub page links
export function generateHubPageLinks(hubType: string): Array<{ category: string; links: Array<{ text: string; href: string }> }> {
  const hubLinks = [];
  
  if (hubType === 'locations') {
    // Group by region
    const regions = {
      'Major Cities': ['Charlotte', 'Raleigh', 'Greensboro', 'Durham', 'Winston-Salem'],
      'Triangle Area': ['Cary', 'Chapel Hill', 'Apex', 'Holly Springs', 'Wake Forest'],
      'Coastal Region': ['Wilmington', 'Jacksonville', 'New Bern', 'Morehead City'],
      'Piedmont Region': ['High Point', 'Burlington', 'Concord', 'Gastonia', 'Kannapolis']
    };
    
    Object.entries(regions).forEach(([region, cities]) => {
      hubLinks.push({
        category: region,
        links: cities.map(city => ({
          text: city,
          href: `/locations/nc/${city.toLowerCase().replace(/ /g, '-')}`
        }))
      });
    });
  }
  
  if (hubType === 'practice-areas') {
    PRACTICE_AREAS.forEach(area => {
      hubLinks.push({
        category: area.name,
        links: [
          { text: `${area.name} Overview`, href: `/practice-areas/${area.slug}` },
          ...area.subPages.map(sub => ({
            text: sub.name,
            href: `/practice-areas/${area.slug}/${sub.slug}`
          }))
        ]
      });
    });
  }
  
  return hubLinks;
}