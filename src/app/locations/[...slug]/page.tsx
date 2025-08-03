import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import LocationPageClient from '@/components/locations/LocationPageClient';

// Enable ISR with 24-hour cache
export const revalidate = 86400;
export const dynamicParams = true;

// Generate only the most important location pages at build time
export async function generateStaticParams() {
  // Only pre-generate 5 major city pages to minimize build memory usage
  const priorityLocations = [
    { slug: ['nc', 'charlotte'] },
    { slug: ['nc', 'raleigh'] },
    { slug: ['nc', 'durham'] },
    { slug: ['fl', 'orlando'] },
    { slug: ['fl', 'kissimmee'] },
  ];

  return priorityLocations;
}

// Dynamic metadata generation
export async function generateMetadata({
  params,
}: {
  params: { slug: string[] };
}): Promise<Metadata> {
  const [state, city, service] = params.slug;

  if (!state || !city) {
    return {
      title: 'Locations | Vasquez Law Firm',
      description: 'Find Vasquez Law Firm offices near you.',
    };
  }

  const cityName = city
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  const stateUpper = state.toUpperCase();

  const baseTitle = `${cityName}, ${stateUpper}`;
  const title = service
    ? `${service
        .split('-')
        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ')} in ${baseTitle}`
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
}

// Map of valid states and cities
const validLocations = {
  nc: [
    'charlotte',
    'raleigh',
    'durham',
    'greensboro',
    'winston-salem',
    'fayetteville',
    'cary',
    'wilmington',
    'high-point',
    'concord',
    'gastonia',
    'apex',
    'huntersville',
    'kannapolis',
    'chapel-hill',
    'rocky-mount',
    'burlington',
    'sanford',
    'hickory',
    'goldsboro',
  ],
  fl: [
    'orlando',
    'kissimmee',
    'tampa',
    'miami',
    'jacksonville',
    'st-petersburg',
    'hialeah',
    'tallahassee',
    'fort-lauderdale',
    'port-st-lucie',
    'cape-coral',
    'pembroke-pines',
    'hollywood',
    'miramar',
    'gainesville',
    'coral-springs',
    'palm-bay',
    'lakeland',
    'pompano-beach',
    'west-palm-beach',
  ],
};

// Location page component
export default function LocationPage({ params }: { params: { slug: string[] } }) {
  const [state, city, service] = params.slug;

  if (!state || !city || !validLocations[state]?.includes(city)) {
    notFound();
  }

  const cityName = city
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  const stateUpper = state.toUpperCase();

  return <LocationPageClient state={stateUpper} city={cityName} service={service} language="en" />;
}
