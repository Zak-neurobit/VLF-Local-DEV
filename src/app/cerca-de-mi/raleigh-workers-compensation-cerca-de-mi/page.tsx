import { Metadata } from 'next';
import { componentLogger } from '@/lib/safe-logger';
import NearMePageClient from '@/components/cerca-de-mi/NearMePageClient';

export const metadata: Metadata = {
  title: 'Raleigh Workers Compensation Near Me | Vasquez Law Firm',
  description:
    'Find experienced workers compensation lawyers in Raleigh, NC. Free consultation, no upfront fees. We fight for your rights.',
  keywords: 'workers compensation Raleigh, attorney near me, Raleigh NC workers compensation',
  openGraph: {
    title: 'Workers Compensation Lawyers in Raleigh, NC - Free Consultation',
    description:
      'Need a workers compensation lawyer in Raleigh? Get the legal help you deserve. No fee unless we win.',
    images: ['/images/raleigh-workers-compensation.jpg'],
  },
};

export default function RaleighWorkersCompensationNearMePage() {
  componentLogger.info('raleigh-workers-compensation-cerca-de-miPage.render', {});

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
      service="Workers Compensation"
      language="en"
      coordinates={{ lat: 35.7796, lng: -78.6382 }}
      nearbyOffices={nearbyOffices}
    />
  );
}
