import { Metadata } from 'next';
import { componentLogger } from '@/lib/safe-logger';
import NearMePageClient from '@/components/cerca-de-mi/NearMePageClient';

export const metadata: Metadata = {
  title: 'Concord Personal Injury Lawyer Cerca De Mi | Vasquez Law Firm',
  description:
    'Encuentra abogados de personal injury lawyer en Concord, NC. Consulta gratuita, sin cargos por adelantado. Luchamos por tus derechos.',
  keywords: 'personal injury lawyer Concord, abogado near me, Concord NC personal injury lawyer',
  openGraph: {
    title: 'Personal Injury Lawyer Abogados in Concord, NC - Free Consultation',
    description:
      '¿Necesitas un abogado de personal injury lawyer en Concord? Consulta gratuita. No pagas si no ganamos.',
    images: ['/images/concord-personal-injury-lawyer.jpg'],
  },
};

export default function ConcordPersonalInjuryLawyerNearMePage() {
  componentLogger.info('concord-abogado-lesiones-personales-cerca-de-miPage.render', {});

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
      service="Personal Injury Lawyer"
      language="es"
      coordinates={{ lat: 35.4088, lng: -80.5795 }}
      nearbyOffices={nearbyOffices}
    />
  );
}
