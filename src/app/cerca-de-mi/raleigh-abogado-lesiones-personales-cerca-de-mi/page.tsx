import { Metadata } from 'next';
import { componentLogger } from '@/lib/safe-logger';
import NearMePageClient from '@/components/cerca-de-mi/NearMePageClient';

export const metadata: Metadata = {
  title: 'Raleigh Personal Injury Lawyer Cerca De Mi | Vasquez Law Firm',
  description:
    'Encuentra abogados de personal injury lawyer en Raleigh, NC. Consulta gratuita, sin cargos por adelantado. Luchamos por tus derechos.',
  keywords: 'personal injury lawyer Raleigh, abogado near me, Raleigh NC personal injury lawyer',
  openGraph: {
    title: 'Personal Injury Lawyer Abogados in Raleigh, NC - Free Consultation',
    description:
      '¿Necesitas un abogado de personal injury lawyer en Raleigh? Consulta gratuita. No pagas si no ganamos.',
    images: ['/images/raleigh-personal-injury-lawyer.jpg'],
  },
};

export default function RaleighPersonalInjuryLawyerNearMePage() {
  componentLogger.info('raleigh-abogado-lesiones-personales-cerca-de-miPage.render', {});

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
      service="Personal Injury Lawyer"
      language="es"
      coordinates={{ lat: 35.7796, lng: -78.6382 }}
      nearbyOffices={nearbyOffices}
    />
  );
}
