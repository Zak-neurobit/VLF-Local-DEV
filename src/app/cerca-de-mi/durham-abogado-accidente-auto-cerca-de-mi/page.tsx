import { Metadata } from 'next';
import { componentLogger } from '@/lib/safe-logger';
import NearMePageClient from '@/components/cerca-de-mi/NearMePageClient';

export const metadata: Metadata = {
  title: 'Durham Car Accident Lawyer Cerca De Mi | Vasquez Law Firm',
  description:
    'Encuentra abogados de car accident lawyer en Durham, NC. Consulta gratuita, sin cargos por adelantado. Luchamos por tus derechos.',
  keywords: 'car accident lawyer Durham, abogado near me, Durham NC car accident lawyer',
  openGraph: {
    title: 'Car Accident Lawyer Abogados in Durham, NC - Free Consultation',
    description:
      '¿Necesitas un abogado de car accident lawyer en Durham? Consulta gratuita. No pagas si no ganamos.',
    images: ['/images/durham-car-accident-lawyer.jpg'],
  },
};

export default function DurhamCarAccidentLawyerNearMePage() {
  componentLogger.info('durham-abogado-accidente-auto-cerca-de-miPage.render', {});

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
      service="Car Accident Lawyer"
      language="es"
      coordinates={{ lat: 35.994, lng: -78.8986 }}
      nearbyOffices={nearbyOffices}
    />
  );
}
