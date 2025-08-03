import { Metadata } from 'next';
import { componentLogger } from '@/lib/safe-logger';
import NearMePageClient from '@/components/cerca-de-mi/NearMePageClient';

export const metadata: Metadata = {
  title: 'Wilmington Workers Compensation Near Me | Vasquez Law Firm',
  description:
    'Find experienced workers compensation lawyers in Wilmington, NC. Free consultation, no upfront fees. We fight for your rights.',
  keywords: 'workers compensation Wilmington, attorney near me, Wilmington NC workers compensation',
  openGraph: {
    title: 'Workers Compensation Lawyers in Wilmington, NC - Free Consultation',
    description:
      'Need a workers compensation lawyer in Wilmington? Get the legal help you deserve. No fee unless we win.',
    images: ['/images/wilmington-workers-compensation.jpg'],
  },
};

export default function WilmingtonWorkersCompensationNearMePage() {
  componentLogger.info('wilmington-compensacion-laboral-cerca-de-miPage.render', {});

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
      service="Workers Compensation"
      language="en"
      coordinates={{ lat: 34.2257, lng: -77.9447 }}
      nearbyOffices={nearbyOffices}
    />
  );
}
