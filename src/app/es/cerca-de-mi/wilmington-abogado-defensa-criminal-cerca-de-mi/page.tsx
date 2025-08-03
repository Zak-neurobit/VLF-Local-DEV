import { Metadata } from 'next';
import { componentLogger } from '@/lib/safe-logger';
import NearMePageClient from '@/components/cerca-de-mi/NearMePageClient';

export const metadata: Metadata = {
  title: 'Wilmington Criminal Defense Cerca De Mi | Vasquez Law Firm',
  description:
    'Encuentra abogados de criminal defense en Wilmington, NC. Consulta gratuita, sin cargos por adelantado. Luchamos por tus derechos.',
  keywords: 'criminal defense Wilmington, abogado near me, Wilmington NC criminal defense',
  openGraph: {
    title: 'Criminal Defense Abogados in Wilmington, NC - Free Consultation',
    description:
      '¿Necesitas un abogado de criminal defense en Wilmington? Consulta gratuita. No pagas si no ganamos.',
    images: ['/images/wilmington-criminal-defense.jpg'],
  },
};

export default function WilmingtonCriminalDefenseNearMePage() {
  componentLogger.info('wilmington-abogado-defensa-criminal-cerca-de-miPage.render', {});

  const nearbyOffices = [
    {
      name: 'Raleigh Office',
      address: '1234 Main St, Raleigh, NC 27601',
      phone: '(919) 555-0123',
      distance: '130 miles',
    },
    {
      name: 'Durham Office',
      address: '567 Duke St, Durham, NC 27701',
      phone: '(919) 555-0124',
      distance: '155 miles',
    },
    {
      name: 'Charlotte Main Office',
      address: '3500 Cameron Blvd, Charlotte, NC 28211',
      phone: '(704) 555-0123',
      distance: '200 miles',
    },
  ];

  return (
    <NearMePageClient
      city="Wilmington"
      service="Criminal Defense"
      language="es"
      coordinates={{ lat: 34.2257, lng: -77.9447 }}
      nearbyOffices={nearbyOffices}
    />
  );
}
