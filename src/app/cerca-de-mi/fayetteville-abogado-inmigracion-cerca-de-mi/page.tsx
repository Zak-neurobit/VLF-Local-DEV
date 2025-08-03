import { Metadata } from 'next';
import { componentLogger } from '@/lib/safe-logger';
import NearMePageClient from '@/components/cerca-de-mi/NearMePageClient';

export const metadata: Metadata = {
  title: 'Fayetteville Immigration Cerca De Mi | Vasquez Law Firm',
  description:
    'Encuentra abogados de immigration en Fayetteville, NC. Consulta gratuita, sin cargos por adelantado. Luchamos por tus derechos.',
  keywords: 'immigration Fayetteville, abogado near me, Fayetteville NC immigration',
  openGraph: {
    title: 'Immigration Abogados in Fayetteville, NC - Free Consultation',
    description:
      '¿Necesitas un abogado de immigration en Fayetteville? Consulta gratuita. No pagas si no ganamos.',
    images: ['/images/fayetteville-immigration.jpg'],
  },
};

export default function FayettevilleImmigrationNearMePage() {
  componentLogger.info('fayetteville-abogado-inmigracion-cerca-de-miPage.render', {});

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
      service="Immigration"
      language="es"
      coordinates={{ lat: 35.0527, lng: -78.8784 }}
      nearbyOffices={nearbyOffices}
    />
  );
}
