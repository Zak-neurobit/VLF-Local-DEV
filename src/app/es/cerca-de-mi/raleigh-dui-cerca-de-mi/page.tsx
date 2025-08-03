import { Metadata } from 'next';
import { componentLogger } from '@/lib/safe-logger';
import NearMePageClient from '@/components/cerca-de-mi/NearMePageClient';

export const metadata: Metadata = {
  title: 'Raleigh DUI DWI Cerca De Mi | Vasquez Law Firm',
  description:
    'Encuentra abogados de dui dwi en Raleigh, NC. Consulta gratuita, sin cargos por adelantado. Luchamos por tus derechos.',
  keywords: 'dui dwi Raleigh, abogado near me, Raleigh NC dui dwi',
  openGraph: {
    title: 'DUI DWI Abogados in Raleigh, NC - Free Consultation',
    description:
      '¿Necesitas un abogado de dui dwi en Raleigh? Consulta gratuita. No pagas si no ganamos.',
    images: ['/images/raleigh-dui-dwi.jpg'],
  },
};

export default function RaleighDUIDWINearMePage() {
  componentLogger.info('raleigh-dui-cerca-de-miPage.render', {});

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
      service="DUI DWI"
      language="es"
      coordinates={{ lat: 35.7796, lng: -78.6382 }}
      nearbyOffices={nearbyOffices}
    />
  );
}
