import { Metadata } from 'next';
import { componentLogger } from '@/lib/safe-logger';
import NearMePageClient from '@/components/cerca-de-mi/NearMePageClient';

export const metadata: Metadata = {
  title: 'Fayetteville Divorce Cerca De Mi | Vasquez Law Firm',
  description:
    'Encuentra abogados de divorce en Fayetteville, NC. Consulta gratuita, sin cargos por adelantado. Luchamos por tus derechos.',
  keywords: 'divorce Fayetteville, abogado near me, Fayetteville NC divorce',
  openGraph: {
    title: 'Divorce Abogados in Fayetteville, NC - Free Consultation',
    description:
      '¿Necesitas un abogado de divorce en Fayetteville? Consulta gratuita. No pagas si no ganamos.',
    images: ['/images/fayetteville-divorce.jpg'],
  },
};

export default function FayettevilleDivorceNearMePage() {
  componentLogger.info('fayetteville-divorce-cerca-de-miPage.render', {});

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
      service="Divorce"
      language="es"
      coordinates={{ lat: 35.0527, lng: -78.8784 }}
      nearbyOffices={nearbyOffices}
    />
  );
}
