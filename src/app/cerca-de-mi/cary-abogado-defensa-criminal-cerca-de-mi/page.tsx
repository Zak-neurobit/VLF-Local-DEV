import { Metadata } from 'next';
import { componentLogger } from '@/lib/safe-logger';
import NearMePageClient from '@/components/cerca-de-mi/NearMePageClient';

export const metadata: Metadata = {
  title: 'Cary Criminal Defense Cerca De Mi | Vasquez Law Firm',
  description:
    'Encuentra abogados de criminal defense en Cary, NC. Consulta gratuita, sin cargos por adelantado. Luchamos por tus derechos.',
  keywords: 'criminal defense Cary, abogado near me, Cary NC criminal defense',
  openGraph: {
    title: 'Criminal Defense Abogados in Cary, NC - Free Consultation',
    description:
      '¿Necesitas un abogado de criminal defense en Cary? Consulta gratuita. No pagas si no ganamos.',
    images: ['/images/cary-criminal-defense.jpg'],
  },
};

export default function CaryCriminalDefenseNearMePage() {
  componentLogger.info('cary-abogado-defensa-criminal-cerca-de-miPage.render', {});

  const nearbyOffices = [
    {
      name: 'Raleigh Office',
      address: '1234 Main St, Raleigh, NC 27601',
      phone: '(919) 555-0123',
      distance: '10 miles',
    },
    {
      name: 'Durham Office',
      address: '567 Duke St, Durham, NC 27701',
      phone: '(919) 555-0124',
      distance: '30 miles',
    },
    {
      name: 'Charlotte Main Office',
      address: '3500 Cameron Blvd, Charlotte, NC 28211',
      phone: '(704) 555-0123',
      distance: '160 miles',
    },
  ];

  return (
    <NearMePageClient
      city="Cary"
      service="Criminal Defense"
      language="es"
      coordinates={{ lat: 35.7915, lng: -78.7811 }}
      nearbyOffices={nearbyOffices}
    />
  );
}
