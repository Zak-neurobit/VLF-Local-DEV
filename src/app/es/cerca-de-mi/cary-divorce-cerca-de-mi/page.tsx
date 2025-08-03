import { Metadata } from 'next';
import { componentLogger } from '@/lib/safe-logger';
import NearMePageClient from '@/components/cerca-de-mi/NearMePageClient';

export const metadata: Metadata = {
  title: 'Cary Divorce Cerca De Mi | Vasquez Law Firm',
  description:
    'Encuentra abogados de divorce en Cary, NC. Consulta gratuita, sin cargos por adelantado. Luchamos por tus derechos.',
  keywords: 'divorce Cary, abogado near me, Cary NC divorce',
  openGraph: {
    title: 'Divorce Abogados in Cary, NC - Free Consultation',
    description:
      '¿Necesitas un abogado de divorce en Cary? Consulta gratuita. No pagas si no ganamos.',
    images: ['/images/cary-divorce.jpg'],
  },
};

export default function CaryDivorceNearMePage() {
  componentLogger.info('cary-divorce-cerca-de-miPage.render', {});

  const nearbyOffices = [
    {
      name: 'Raleigh Office',
      address: '1234 Main St, Raleigh, NC 27601',
      phone: '(919) 555-0123',
      distance: '10 miles',
    },
    {
      name: 'Durham Office',
      address: '567 Duke St, Durham, NC 27701',
      phone: '(919) 555-0124',
      distance: '30 miles',
    },
    {
      name: 'Charlotte Main Office',
      address: '3500 Cameron Blvd, Charlotte, NC 28211',
      phone: '(704) 555-0123',
      distance: '160 miles',
    },
  ];

  return (
    <NearMePageClient
      city="Cary"
      service="Divorce"
      language="es"
      coordinates={{ lat: 35.7915, lng: -78.7811 }}
      nearbyOffices={nearbyOffices}
    />
  );
}
