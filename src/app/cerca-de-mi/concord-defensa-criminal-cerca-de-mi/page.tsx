import { Metadata } from 'next';
import { componentLogger } from '@/lib/safe-logger';
import NearMePageClient from '@/components/cerca-de-mi/NearMePageClient';

export const metadata: Metadata = {
  title: 'Concord Criminal Defense Near Me | Vasquez Law Firm',
  description:
    'Find experienced criminal defense lawyers in Concord, NC. Free consultation, no upfront fees. We fight for your rights.',
  keywords: 'criminal defense Concord, attorney near me, Concord NC criminal defense',
  openGraph: {
    title: 'Criminal Defense Lawyers in Concord, NC - Free Consultation',
    description:
      'Need a criminal defense lawyer in Concord? Get the legal help you deserve. No fee unless we win.',
    images: ['/images/concord-criminal-defense.jpg'],
  },
};

export default function ConcordCriminalDefenseNearMePage() {
  componentLogger.info('concord-defensa-criminal-cerca-de-miPage.render', {});

  const nearbyOffices = [
    {
      name: 'Charlotte Main Office',
      address: '3500 Cameron Blvd, Charlotte, NC 28211',
      phone: '(704) 555-0123',
      distance: '20 miles',
    },
    {
      name: 'Durham Office',
      address: '567 Duke St, Durham, NC 27701',
      phone: '(919) 555-0124',
      distance: '120 miles',
    },
    {
      name: 'Raleigh Office',
      address: '1234 Main St, Raleigh, NC 27601',
      phone: '(919) 555-0123',
      distance: '145 miles',
    },
  ];

  return (
    <NearMePageClient
      city="Concord"
      service="Criminal Defense"
      language="en"
      coordinates={{ lat: 35.4088, lng: -80.5795 }}
      nearbyOffices={nearbyOffices}
    />
  );
}
