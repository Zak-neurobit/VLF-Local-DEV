import { Metadata } from 'next';
import { componentLogger } from '@/lib/safe-logger';
import NearMePageClient from '@/components/cerca-de-mi/NearMePageClient';

export const metadata: Metadata = {
  title: 'Cary Criminal Defense Near Me | Vasquez Law Firm',
  description:
    'Find experienced criminal defense lawyers in Cary, NC. Free consultation, no upfront fees. We fight for your rights.',
  keywords: 'criminal defense Cary, attorney near me, Cary NC criminal defense',
  openGraph: {
    title: 'Criminal Defense Lawyers in Cary, NC - Free Consultation',
    description:
      'Need a criminal defense lawyer in Cary? Get the legal help you deserve. No fee unless we win.',
    images: ['/images/cary-criminal-defense.jpg'],
  },
};

export default function CaryCriminalDefenseNearMePage() {
  componentLogger.info('cary-criminal-defense-cerca-de-miPage.render', {});

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
      service="Criminal Defense"
      language="en"
      coordinates={{ lat: 35.7915, lng: -78.7811 }}
      nearbyOffices={nearbyOffices}
    />
  );
}
