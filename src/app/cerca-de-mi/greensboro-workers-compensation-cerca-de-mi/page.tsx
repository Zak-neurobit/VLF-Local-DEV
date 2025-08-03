import { Metadata } from 'next';
import { componentLogger } from '@/lib/safe-logger';
import NearMePageClient from '@/components/cerca-de-mi/NearMePageClient';

export const metadata: Metadata = {
  title: 'Greensboro Workers Compensation Near Me | Vasquez Law Firm',
  description:
    'Find experienced workers compensation lawyers in Greensboro, NC. Free consultation, no upfront fees. We fight for your rights.',
  keywords: 'workers compensation Greensboro, attorney near me, Greensboro NC workers compensation',
  openGraph: {
    title: 'Workers Compensation Lawyers in Greensboro, NC - Free Consultation',
    description:
      'Need a workers compensation lawyer in Greensboro? Get the legal help you deserve. No fee unless we win.',
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
      language="en"
      coordinates={{ lat: 36.0726, lng: -79.792 }}
      nearbyOffices={nearbyOffices}
    />
  );
}
