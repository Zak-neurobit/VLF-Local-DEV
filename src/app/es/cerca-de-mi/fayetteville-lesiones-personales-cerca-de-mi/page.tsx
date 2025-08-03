import { Metadata } from 'next';
import { componentLogger } from '@/lib/safe-logger';
import NearMePageClient from '@/components/cerca-de-mi/NearMePageClient';

export const metadata: Metadata = {
  title: 'Fayetteville Personal Injury Lawyer Cerca De Mi | Vasquez Law Firm',
  description:
    'Encuentra abogados de personal injury lawyer en Fayetteville, NC. Consulta gratuita, sin cargos por adelantado. Luchamos por tus derechos.',
  keywords:
    'personal injury lawyer Fayetteville, abogado near me, Fayetteville NC personal injury lawyer',
  openGraph: {
    title: 'Personal Injury Lawyer Abogados in Fayetteville, NC - Free Consultation',
    description:
      '¿Necesitas un abogado de personal injury lawyer en Fayetteville? Consulta gratuita. No pagas si no ganamos.',
    images: ['/images/fayetteville-personal-injury-lawyer.jpg'],
  },
};

export default function FayettevillePersonalInjuryLawyerNearMePage() {
  componentLogger.info('fayetteville-lesiones-personales-cerca-de-miPage.render', {});

  const nearbyOffices = [
    {
      name: 'Raleigh Office',
      address: '1234 Main St, Raleigh, NC 27601',
      phone: '(919) 555-0123',
      distance: '65 miles',
    },
    {
      name: 'Durham Office',
      address: '567 Duke St, Durham, NC 27701',
      phone: '(919) 555-0124',
      distance: '90 miles',
    },
    {
      name: 'Charlotte Main Office',
      address: '3500 Cameron Blvd, Charlotte, NC 28211',
      phone: '(704) 555-0123',
      distance: '130 miles',
    },
  ];

  return (
    <NearMePageClient
      city="Fayetteville"
      service="Personal Injury Lawyer"
      language="es"
      coordinates={{ lat: 35.0527, lng: -78.8784 }}
      nearbyOffices={nearbyOffices}
    />
  );
}
