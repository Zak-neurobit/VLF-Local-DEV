import { Metadata } from 'next';
import { componentLogger } from '@/lib/safe-logger';
import NearMePageClient from '@/components/cerca-de-mi/NearMePageClient';

export const metadata: Metadata = {
  title: 'Durham Workers Compensation Cerca De Mi | Vasquez Law Firm',
  description:
    'Encuentra abogados de workers compensation en Durham, NC. Consulta gratuita, sin cargos por adelantado. Luchamos por tus derechos.',
  keywords: 'workers compensation Durham, abogado near me, Durham NC workers compensation',
  openGraph: {
    title: 'Workers Compensation Abogados in Durham, NC - Free Consultation',
    description:
      '¿Necesitas un abogado de workers compensation en Durham? Consulta gratuita. No pagas si no ganamos.',
    images: ['/images/durham-workers-compensation.jpg'],
  },
};

export default function DurhamWorkersCompensationNearMePage() {
  componentLogger.info('durham-workers-compensation-cerca-de-miPage.render', {});

  const nearbyOffices = [
    {
      name: 'Durham Office',
      address: '567 Duke St, Durham, NC 27701',
      phone: '(919) 555-0124',
      distance: '0 miles',
    },
    {
      name: 'Raleigh Office',
      address: '1234 Main St, Raleigh, NC 27601',
      phone: '(919) 555-0123',
      distance: '25 miles',
    },
    {
      name: 'Charlotte Main Office',
      address: '3500 Cameron Blvd, Charlotte, NC 28211',
      phone: '(704) 555-0123',
      distance: '140 miles',
    },
  ];

  return (
    <NearMePageClient
      city="Durham"
      service="Workers Compensation"
      language="es"
      coordinates={{ lat: 35.994, lng: -78.8986 }}
      nearbyOffices={nearbyOffices}
    />
  );
}
