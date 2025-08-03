import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { componentLogger } from '@/lib/safe-logger';
import NearMePageClient from '@/components/cerca-de-mi/NearMePageClient';

// City data with coordinates
const cityData: Record<string, { lat: number; lng: number }> = {
  charlotte: { lat: 35.2271, lng: -80.8431 },
  raleigh: { lat: 35.7796, lng: -78.6382 },
  durham: { lat: 35.994, lng: -78.8986 },
  greensboro: { lat: 36.0726, lng: -79.792 },
  'winston-salem': { lat: 36.0999, lng: -80.2442 },
  fayetteville: { lat: 35.0527, lng: -78.8784 },
  cary: { lat: 35.7915, lng: -78.7811 },
  wilmington: { lat: 34.2257, lng: -77.9447 },
  'high-point': { lat: 35.9557, lng: -80.0053 },
  concord: { lat: 35.4088, lng: -80.5795 },
};

// Service map
const serviceMap: Record<string, string> = {
  'car-accidents': 'Car Accident Lawyer',
  'personal-injury': 'Personal Injury Lawyer',
  'workers-compensation': 'Workers Compensation',
  'criminal-defense': 'Criminal Defense',
  immigration: 'Immigration',
  dui: 'DUI DWI',
  divorce: 'Divorce',
  'spanish-speaking': 'Spanish Speaking Services',
  'abogado-accidente-auto': 'Car Accident Lawyer',
  'abogado-lesiones-personales': 'Personal Injury Lawyer',
  'abogado-compensacion-laboral': 'Workers Compensation',
  'abogado-defensa-criminal': 'Criminal Defense',
  'abogado-inmigracion': 'Immigration',
  'abogado-dui': 'DUI DWI',
  'abogado-divorcio': 'Divorce',
  'compensacion-laboral': 'Workers Compensation',
  'defensa-criminal': 'Criminal Defense',
  inmigracion: 'Immigration',
  'lesiones-personales': 'Personal Injury Lawyer',
};

// Office distances
const officeDistances: Record<
  string,
  Array<{ name: string; address: string; phone: string; distance: string }>
> = {
  charlotte: [
    {
      name: 'Charlotte Main Office',
      address: '3500 Cameron Blvd, Charlotte, NC 28211',
      phone: '(704) 555-0123',
      distance: '0 miles',
    },
    {
      name: 'Raleigh Office',
      address: '1234 Main St, Raleigh, NC 27601',
      phone: '(919) 555-0123',
      distance: '165 miles',
    },
    {
      name: 'Durham Office',
      address: '567 Duke St, Durham, NC 27701',
      phone: '(919) 555-0124',
      distance: '140 miles',
    },
  ],
  raleigh: [
    {
      name: 'Raleigh Office',
      address: '1234 Main St, Raleigh, NC 27601',
      phone: '(919) 555-0123',
      distance: '0 miles',
    },
    {
      name: 'Durham Office',
      address: '567 Duke St, Durham, NC 27701',
      phone: '(919) 555-0124',
      distance: '25 miles',
    },
    {
      name: 'Charlotte Main Office',
      address: '3500 Cameron Blvd, Charlotte, NC 28211',
      phone: '(704) 555-0123',
      distance: '165 miles',
    },
  ],
  default: [
    {
      name: 'Charlotte Main Office',
      address: '3500 Cameron Blvd, Charlotte, NC 28211',
      phone: '(704) 555-0123',
      distance: 'Distance varies',
    },
    {
      name: 'Raleigh Office',
      address: '1234 Main St, Raleigh, NC 27601',
      phone: '(919) 555-0123',
      distance: 'Distance varies',
    },
    {
      name: 'Durham Office',
      address: '567 Duke St, Durham, NC 27701',
      phone: '(919) 555-0124',
      distance: 'Distance varies',
    },
  ],
};

function capitalizeCity(city: string): string {
  return city
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function parseSlug(slug: string[]): { city: string; service: string } | null {
  const fullSlug = slug.join('-');
  const parts = fullSlug.split('-');

  // Find where "cerca-de-mi" starts
  const cercaIndex = parts.indexOf('cerca');
  if (cercaIndex === -1 || cercaIndex === 0) return null;

  const city = parts[0];
  const serviceParts = parts.slice(1, cercaIndex);
  const service = serviceParts.join('-');

  return { city, service };
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string[] };
}): Promise<Metadata> {
  const parsed = parseSlug(params.slug);
  if (!parsed) return { title: 'No Encontrado' };

  const { city, service } = parsed;
  const cityName = capitalizeCity(city);
  const serviceName = serviceMap[service] || 'Servicios Legales';

  return {
    title: `${cityName} ${serviceName} Cerca De Mi | Vasquez Law Firm`,
    description: `Encuentra abogados de ${serviceName.toLowerCase()} en ${cityName}, NC. Consulta gratuita, sin cargos por adelantado. Luchamos por tus derechos.`,
    openGraph: {
      title: `${serviceName} Abogados en ${cityName}, NC - Consulta Gratuita`,
      description: `¿Necesitas un abogado de ${serviceName.toLowerCase()} en ${cityName}? Consulta gratuita. No pagas si no ganamos.`,
    },
  };
}

export default function CercaDeMiPageES({ params }: { params: { slug: string[] } }) {
  const parsed = parseSlug(params.slug);

  if (!parsed) {
    notFound();
  }

  const { city, service } = parsed;

  // Validate city and service
  if (
    !cityData[city] &&
    city !== 'durham' &&
    city !== 'greensboro' &&
    city !== 'winston-salem' &&
    city !== 'fayetteville' &&
    city !== 'cary' &&
    city !== 'wilmington' &&
    city !== 'high-point' &&
    city !== 'concord'
  ) {
    notFound();
  }

  const cityName = capitalizeCity(city);
  const serviceName = serviceMap[service] || 'Servicios Legales';
  const coordinates = cityData[city] || { lat: 35.7796, lng: -78.6382 };
  const nearbyOffices = officeDistances[city] || officeDistances['default'];

  componentLogger.info('cerca-de-mi-dynamic-page-es.render', { city, service });

  return (
    <NearMePageClient
      city={cityName}
      service={serviceName}
      language="es"
      coordinates={coordinates}
      nearbyOffices={nearbyOffices}
    />
  );
}

// Only generate a subset of pages at build time
export async function generateStaticParams() {
  // Generate only the most important Spanish pages at build time
  const priorityPages = [
    'charlotte-abogado-accidente-auto-cerca-de-mi',
    'charlotte-abogado-lesiones-personales-cerca-de-mi',
    'charlotte-abogado-compensacion-laboral-cerca-de-mi',
    'raleigh-abogado-accidente-auto-cerca-de-mi',
    'raleigh-abogado-lesiones-personales-cerca-de-mi',
    'raleigh-abogado-compensacion-laboral-cerca-de-mi',
    'durham-abogado-accidente-auto-cerca-de-mi',
    'durham-abogado-lesiones-personales-cerca-de-mi',
    'charlotte-compensacion-laboral-cerca-de-mi',
    'raleigh-defensa-criminal-cerca-de-mi',
  ];

  return priorityPages.map(page => ({
    slug: page.split('-'),
  }));
}

// Enable ISR - pages will be generated on-demand and cached
export const revalidate = 86400; // Revalidate every 24 hours
export const dynamicParams = true; // Allow pages not in generateStaticParams
