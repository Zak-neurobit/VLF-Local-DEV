import { Metadata } from 'next';
import { componentLogger } from '@/lib/safe-logger';
import NearMePageClient from '@/components/cerca-de-mi/NearMePageClient';

export const metadata: Metadata = {
  title: 'Wilmington Divorce Cerca De Mi | Vasquez Law Firm',
  description:
    'Encuentra abogados de divorce en Wilmington, NC. Consulta gratuita, sin cargos por adelantado. Luchamos por tus derechos.',
  keywords: 'divorce Wilmington, abogado near me, Wilmington NC divorce',
  openGraph: {
    title: 'Divorce Abogados in Wilmington, NC - Free Consultation',
    description:
      '¿Necesitas un abogado de divorce en Wilmington? Consulta gratuita. No pagas si no ganamos.',
    images: ['/images/wilmington-divorce.jpg'],
  },
};

export default function WilmingtonDivorceNearMePage() {
  componentLogger.info('wilmington-divorce-cerca-de-miPage.render', {});

  const nearbyOffices = [
    {
      name: 'Raleigh Office',
      address: '1234 Main St, Raleigh, NC 27601',
      phone: '(919) 555-0123',
      distance: '130 miles',
    },
    {
      name: 'Durham Office',
      address: '567 Duke St, Durham, NC 27701',
      phone: '(919) 555-0124',
      distance: '155 miles',
    },
    {
      name: 'Charlotte Main Office',
      address: '3500 Cameron Blvd, Charlotte, NC 28211',
      phone: '(704) 555-0123',
      distance: '200 miles',
    },
  ];

  return (
    <NearMePageClient
      city="Wilmington"
      service="Divorce"
      language="es"
      coordinates={{ lat: 34.2257, lng: -77.9447 }}
      nearbyOffices={nearbyOffices}
    />
  );
}
