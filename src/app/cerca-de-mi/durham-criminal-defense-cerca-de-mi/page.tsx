import { Metadata } from 'next';
import { componentLogger } from '@/lib/safe-logger';
import NearMePageClient from '@/components/cerca-de-mi/NearMePageClient';

export const metadata: Metadata = {
  title: 'Durham Criminal Defense Near Me | Vasquez Law Firm',
  description:
    'Find experienced criminal defense lawyers in Durham, NC. Free consultation, no upfront fees. We fight for your rights.',
  keywords: 'criminal defense Durham, attorney near me, Durham NC criminal defense',
  openGraph: {
    title: 'Criminal Defense Lawyers in Durham, NC - Free Consultation',
    description:
      'Need a criminal defense lawyer in Durham? Get the legal help you deserve. No fee unless we win.',
    images: ['/images/durham-criminal-defense.jpg'],
  },
};

export default function DurhamCriminalDefenseNearMePage() {
  componentLogger.info('durham-criminal-defense-cerca-de-miPage.render', {});

  const nearbyOffices = [
    {
      name: 'Durham Office',
      address: '567 Duke St, Durham, NC 27701',
      phone: '(919) 555-0124',
      distance: '0 miles',
    },
    {
      name: 'Raleigh Office',
      address: '1234 Main St, Raleigh, NC 27601',
      phone: '(919) 555-0123',
      distance: '25 miles',
    },
    {
      name: 'Charlotte Main Office',
      address: '3500 Cameron Blvd, Charlotte, NC 28211',
      phone: '(704) 555-0123',
      distance: '140 miles',
    },
  ];

  return (
    <NearMePageClient
      city="Durham"
      service="Criminal Defense"
      language="en"
      coordinates={{ lat: 35.994, lng: -78.8986 }}
      nearbyOffices={nearbyOffices}
    />
  );
}
