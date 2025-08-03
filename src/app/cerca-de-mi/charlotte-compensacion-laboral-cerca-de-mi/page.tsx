import { Metadata } from 'next';
import { componentLogger } from '@/lib/safe-logger';
import NearMePageClient from '@/components/cerca-de-mi/NearMePageClient';

export const metadata: Metadata = {
  title: 'Charlotte Workers Compensation Near Me | Vasquez Law Firm',
  description:
    'Find experienced workers compensation lawyers in Charlotte, NC. Free consultation, no upfront fees. We fight for your rights.',
  keywords: 'workers compensation Charlotte, attorney near me, Charlotte NC workers compensation',
  openGraph: {
    title: 'Workers Compensation Lawyers in Charlotte, NC - Free Consultation',
    description:
      'Need a workers compensation lawyer in Charlotte? Get the legal help you deserve. No fee unless we win.',
    images: ['/images/charlotte-workers-compensation.jpg'],
  },
};

export default function CharlotteWorkersCompensationNearMePage() {
  componentLogger.info('charlotte-compensacion-laboral-cerca-de-miPage.render', {});

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
      service="Workers Compensation"
      language="en"
      coordinates={{ lat: 35.2271, lng: -80.8431 }}
      nearbyOffices={nearbyOffices}
    />
  );
}
