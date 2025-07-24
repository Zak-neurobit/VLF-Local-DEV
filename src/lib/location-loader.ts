// Location page loader - dynamically loads location page content
// This builds UP the architecture to handle thousands of pages efficiently

import { cache } from 'react';
import { Metadata } from 'next';


// Metadata loader for SEO
export const loadLocationMetadata = cache(async (state: string, city: string, service?: string): Promise<Metadata> => {
  // This could load from a database or JSON file instead of requiring all pages at build time
  const cityName = city.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
  
  const stateUpper = state.toUpperCase();
  
  const baseTitle = `${cityName}, ${stateUpper}`;
  const title = service 
    ? `${service.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} in ${baseTitle}`
    : `${baseTitle} Attorneys | Vasquez Law Firm`;
    
  const description = service
    ? `Expert ${service.replace(/-/g, ' ')} services in ${cityName}, ${stateUpper}. Free consultation: 1-844-YO-PELEO`
    : `Top-rated attorneys serving ${cityName}, ${stateUpper}. Immigration, personal injury, criminal defense, and workers' compensation. Free consultation: 1-844-YO-PELEO`;
    
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://vasquezlawnc.com/locations/${state}/${city}${service ? `/${service}` : ''}`,
    },
  };
});

// List of locations that should be statically generated at build time
// This is a small subset for performance
export const PRIORITY_LOCATIONS = [
  { state: 'nc', city: 'charlotte' },
  { state: 'nc', city: 'raleigh' },
  { state: 'nc', city: 'durham' },
  { state: 'nc', city: 'greensboro' },
  { state: 'nc', city: 'winston-salem' },
  { state: 'fl', city: 'orlando' },
  { state: 'fl', city: 'tampa' },
];

// Get all locations (for sitemap generation, etc)
export async function getAllLocations(): Promise<Array<{state: string, city: string, service?: string}>> {
  // In production, this would query a database or read from a JSON file
  // For now, return empty array to prevent build-time generation
  if (process.env.BUILD_TIME === 'true') {
    return PRIORITY_LOCATIONS;
  }
  
  // This would be populated from your data source
  return [];
}