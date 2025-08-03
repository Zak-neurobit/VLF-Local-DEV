import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import LocationPageClient from '@/components/locations/LocationPageClient';

// Enable ISR with 24-hour cache
export const revalidate = 86400;
export const dynamicParams = true;

// Generate only the most important Spanish location pages at build time
export async function generateStaticParams() {
  // Only pre-generate 5 major Spanish location pages
  const priorityLocations = [
    { slug: ['charlotte'] },
    { slug: ['raleigh'] },
    { slug: ['durham'] },
    { slug: ['orlando'] },
    { slug: ['kissimmee'] },
  ];

  return priorityLocations;
}

// Dynamic metadata generation
export async function generateMetadata({
  params,
}: {
  params: { slug: string[] };
}): Promise<Metadata> {
  const [city, service] = params.slug;

  if (!city) {
    return {
      title: 'Ubicaciones | Vasquez Law Firm',
      description: 'Encuentre oficinas de Vasquez Law Firm cerca de usted.',
    };
  }

  const cityName = city
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  const serviceNames: Record<string, string> = {
    'abogado-espanol': 'Abogado Que Habla Español',
    'accidentes-de-auto': 'Accidentes de Auto',
    'lesiones-personales': 'Lesiones Personales',
    'compensacion-laboral': 'Compensación Laboral',
    'defensa-criminal': 'Defensa Criminal',
    inmigracion: 'Inmigración',
    'derecho-familiar': 'Derecho Familiar',
    dui: 'DUI',
    bancarrota: 'Bancarrota',
  };

  const serviceName = service ? serviceNames[service] || 'Servicios Legales' : '';

  const title = service
    ? `${serviceName} en ${cityName} | Vasquez Law Firm`
    : `Abogados en ${cityName} | Vasquez Law Firm`;

  const description = service
    ? `Abogados expertos en ${serviceName.toLowerCase()} sirviendo ${cityName}. Consulta gratuita: 1-844-YO-PELEO`
    : `Abogados calificados sirviendo ${cityName}. Inmigración, lesiones personales, defensa criminal, y compensación laboral. Consulta gratuita: 1-844-YO-PELEO`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://vasquezlawnc.com/es/ubicaciones/${city}${service ? `/${service}` : ''}`,
    },
  };
}

// Valid cities for Spanish locations
const validCities = [
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
  'huntersville',
  'kannapolis',
  'chapel-hill',
  'hickory',
  'orlando',
  'kissimmee',
  'oviedo',
  'winter-park',
  'sanford',
  'burlington',
  'cornelius',
  'davidson',
  'indian-trail',
  'matthews',
  'mint-hill',
  'monroe',
  'mooresville',
  'pineville',
  'rocky-mount',
  'smithfield',
  'wilson',
];

// Location page component
export default function UbicacionesPage({ params }: { params: { slug: string[] } }) {
  const [city, service] = params.slug;

  if (!city || !validCities.includes(city)) {
    notFound();
  }

  const cityName = city
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  // Determine state based on city
  const floridaCities = ['orlando', 'kissimmee', 'oviedo', 'winter-park', 'sanford'];
  const state = floridaCities.includes(city) ? 'FL' : 'NC';

  return <LocationPageClient state={state} city={cityName} service={service} language="es" />;
}
