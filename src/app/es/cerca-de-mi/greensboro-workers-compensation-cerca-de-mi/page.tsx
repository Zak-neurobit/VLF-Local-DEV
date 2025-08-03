import { Metadata } from 'next';
import { componentLogger } from '@/lib/safe-logger';
import NearMePageClient from '@/components/cerca-de-mi/NearMePageClient';

export const metadata: Metadata = {
  title: 'Greensboro Workers Compensation Cerca De Mi | Vasquez Law Firm',
  description:
    'Encuentra abogados de workers compensation en Greensboro, NC. Consulta gratuita, sin cargos por adelantado. Luchamos por tus derechos.',
  keywords: 'workers compensation Greensboro, abogado near me, Greensboro NC workers compensation',
  openGraph: {
    title: 'Workers Compensation Abogados in Greensboro, NC - Free Consultation',
    description:
      '¿Necesitas un abogado de workers compensation en Greensboro? Consulta gratuita. No pagas si no ganamos.',
    images: ['/images/greensboro-workers-compensation.jpg'],
  },
};

export default function GreensboroWorkersCompensationNearMePage() {
  componentLogger.info('greensboro-workers-compensation-cerca-de-miPage.render', {});

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
      service="Workers Compensation"
      language="es"
      coordinates={{ lat: 36.0726, lng: -79.792 }}
      nearbyOffices={nearbyOffices}
    />
  );
}
