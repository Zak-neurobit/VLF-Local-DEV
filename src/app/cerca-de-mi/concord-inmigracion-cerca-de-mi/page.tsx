import { Metadata } from 'next';
import { componentLogger } from '@/lib/safe-logger';
import NearMePageClient from '@/components/cerca-de-mi/NearMePageClient';

export const metadata: Metadata = {
  title: 'Concord Immigration Near Me | Vasquez Law Firm',
  description:
    'Find experienced immigration lawyers in Concord, NC. Free consultation, no upfront fees. We fight for your rights.',
  keywords: 'immigration Concord, attorney near me, Concord NC immigration',
  openGraph: {
    title: 'Immigration Lawyers in Concord, NC - Free Consultation',
    description:
      'Need a immigration lawyer in Concord? Get the legal help you deserve. No fee unless we win.',
    images: ['/images/concord-immigration.jpg'],
  },
};

export default function ConcordImmigrationNearMePage() {
  componentLogger.info('concord-inmigracion-cerca-de-miPage.render', {});

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
      service="Immigration"
      language="en"
      coordinates={{ lat: 35.4088, lng: -80.5795 }}
      nearbyOffices={nearbyOffices}
    />
  );
}
