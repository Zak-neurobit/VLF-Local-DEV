import { Metadata } from 'next';
import { componentLogger } from '@/lib/safe-logger';
import NearMePageClient from '@/components/cerca-de-mi/NearMePageClient';

export const metadata: Metadata = {
  title: 'Concord Workers Compensation Cerca De Mi | Vasquez Law Firm',
  description:
    'Encuentra abogados de workers compensation en Concord, NC. Consulta gratuita, sin cargos por adelantado. Luchamos por tus derechos.',
  keywords: 'workers compensation Concord, abogado near me, Concord NC workers compensation',
  openGraph: {
    title: 'Workers Compensation Abogados in Concord, NC - Free Consultation',
    description:
      '¿Necesitas un abogado de workers compensation en Concord? Consulta gratuita. No pagas si no ganamos.',
    images: ['/images/concord-workers-compensation.jpg'],
  },
};

export default function ConcordWorkersCompensationNearMePage() {
  componentLogger.info('concord-compensacion-laboral-cerca-de-miPage.render', {});

  const nearbyOffices = [
    {
      name: 'Charlotte Main Office',
      address: '3500 Cameron Blvd, Charlotte, NC 28211',
      phone: '(704) 555-0123',
      distance: '20 miles',
    },
    {
      name: 'Durham Office',
      address: '567 Duke St, Durham, NC 27701',
      phone: '(919) 555-0124',
      distance: '120 miles',
    },
    {
      name: 'Raleigh Office',
      address: '1234 Main St, Raleigh, NC 27601',
      phone: '(919) 555-0123',
      distance: '145 miles',
    },
  ];

  return (
    <NearMePageClient
      city="Concord"
      service="Workers Compensation"
      language="es"
      coordinates={{ lat: 35.4088, lng: -80.5795 }}
      nearbyOffices={nearbyOffices}
    />
  );
}
