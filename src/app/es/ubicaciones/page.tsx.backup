import { Metadata } from 'next';
import Script from 'next/script';
import LocationsPageClient from '@/app/locations/LocationsPageClient';

export const metadata: Metadata = {
  title: 'Ubicaciones - Bufete de Abogados Vasquez | Servicios Legales en NC y FL',
  description:
    'Visite nuestras 4 convenientes ubicaciones en Carolina del Norte y Florida. Smithfield, Raleigh, Charlotte y Orlando con personal bilingüe listo para servirle.',
  keywords:
    'Ubicaciones Bufete de Abogados Vasquez, oficinas legales NC, oficinas legales FL, oficinas abogado de inmigración, ubicaciones abogado de lesiones personales, bufete bilingüe',
  openGraph: {
    title: 'Ubicaciones - Bufete de Abogados Vasquez | Servicios Legales en NC y FL',
    description:
      '4 ubicaciones convenientes en NC y FL. Estacionamiento gratuito, accesible para sillas de ruedas, personal bilingüe. Programe su consulta hoy.',
    images: [{ url: '/images/locations-hero.jpg' }],
    url: 'https://www.vasquezlawnc.com/es/ubicaciones',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ubicaciones del Bufete de Abogados Vasquez | NC y FL',
    description: '4 ubicaciones convenientes con personal bilingüe. Consulta gratuita disponible.',
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones',
    },
  },
};

export default function Page() {
  return <LocationsPageClient language="es" />;
}
