import { Metadata } from 'next';
import { componentLogger } from '@/lib/safe-logger';
import NearMePageClient from '@/components/cerca-de-mi/NearMePageClient';

export const metadata: Metadata = {
  title: 'Charlotte Divorce Cerca De Mi | Vasquez Law Firm',
  description:
    'Encuentra abogados de divorce en Charlotte, NC. Consulta gratuita, sin cargos por adelantado. Luchamos por tus derechos.',
  keywords: 'divorce Charlotte, abogado near me, Charlotte NC divorce',
  openGraph: {
    title: 'Divorce Abogados in Charlotte, NC - Free Consultation',
    description:
      '¿Necesitas un abogado de divorce en Charlotte? Consulta gratuita. No pagas si no ganamos.',
    images: ['/images/charlotte-divorce.jpg'],
  },
};

export default function CharlotteDivorceNearMePage() {
  componentLogger.info('charlotte-abogado-divorcio-cerca-de-miPage.render', {});

  const nearbyOffices = [
    {
      name: 'Charlotte Main Office',
      address: '3500 Cameron Blvd, Charlotte, NC 28211',
      phone: '(704) 555-0123',
      distance: '0 miles',
    },
    {
      name: 'Raleigh Office',
      address: '1234 Main St, Raleigh, NC 27601',
      phone: '(919) 555-0123',
      distance: '165 miles',
    },
    {
      name: 'Durham Office',
      address: '567 Duke St, Durham, NC 27701',
      phone: '(919) 555-0124',
      distance: '140 miles',
    },
  ];

  return (
    <NearMePageClient
      city="Charlotte"
      service="Divorce"
      language="es"
      coordinates={{ lat: 35.2271, lng: -80.8431 }}
      nearbyOffices={nearbyOffices}
    />
  );
}
