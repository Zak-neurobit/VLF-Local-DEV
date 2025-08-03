import { Metadata } from 'next';
import { componentLogger } from '@/lib/safe-logger';
import NearMePageClient from '@/components/cerca-de-mi/NearMePageClient';

export const metadata: Metadata = {
  title: 'Raleigh Car Accident Lawyer Cerca De Mi | Vasquez Law Firm',
  description:
    'Encuentra abogados de car accident lawyer en Raleigh, NC. Consulta gratuita, sin cargos por adelantado. Luchamos por tus derechos.',
  keywords: 'car accident lawyer Raleigh, abogado near me, Raleigh NC car accident lawyer',
  openGraph: {
    title: 'Car Accident Lawyer Abogados in Raleigh, NC - Free Consultation',
    description:
      '¿Necesitas un abogado de car accident lawyer en Raleigh? Consulta gratuita. No pagas si no ganamos.',
    images: ['/images/raleigh-car-accident-lawyer.jpg'],
  },
};

export default function RaleighCarAccidentLawyerNearMePage() {
  componentLogger.info('raleigh-abogado-accidente-auto-cerca-de-miPage.render', {});

  const nearbyOffices = [
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
  ];

  return (
    <NearMePageClient
      city="Raleigh"
      service="Car Accident Lawyer"
      language="es"
      coordinates={{ lat: 35.7796, lng: -78.6382 }}
      nearbyOffices={nearbyOffices}
    />
  );
}
