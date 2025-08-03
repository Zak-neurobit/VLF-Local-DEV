import { Metadata } from 'next';
import { componentLogger } from '@/lib/safe-logger';
import NearMePageClient from '@/components/cerca-de-mi/NearMePageClient';

export const metadata: Metadata = {
  title: 'Greensboro Immigration Cerca De Mi | Vasquez Law Firm',
  description:
    'Encuentra abogados de immigration en Greensboro, NC. Consulta gratuita, sin cargos por adelantado. Luchamos por tus derechos.',
  keywords: 'immigration Greensboro, abogado near me, Greensboro NC immigration',
  openGraph: {
    title: 'Immigration Abogados in Greensboro, NC - Free Consultation',
    description:
      '¿Necesitas un abogado de immigration en Greensboro? Consulta gratuita. No pagas si no ganamos.',
    images: ['/images/greensboro-immigration.jpg'],
  },
};

export default function GreensboroImmigrationNearMePage() {
  componentLogger.info('greensboro-abogado-inmigracion-cerca-de-miPage.render', {});

  const nearbyOffices = [
    {
      name: 'Durham Office',
      address: '567 Duke St, Durham, NC 27701',
      phone: '(919) 555-0124',
      distance: '55 miles',
    },
    {
      name: 'Raleigh Office',
      address: '1234 Main St, Raleigh, NC 27601',
      phone: '(919) 555-0123',
      distance: '80 miles',
    },
    {
      name: 'Charlotte Main Office',
      address: '3500 Cameron Blvd, Charlotte, NC 28211',
      phone: '(704) 555-0123',
      distance: '90 miles',
    },
  ];

  return (
    <NearMePageClient
      city="Greensboro"
      service="Immigration"
      language="es"
      coordinates={{ lat: 36.0726, lng: -79.792 }}
      nearbyOffices={nearbyOffices}
    />
  );
}
