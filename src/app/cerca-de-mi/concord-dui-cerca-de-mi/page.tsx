import { Metadata } from 'next';
import { componentLogger } from '@/lib/safe-logger';
import NearMePageClient from '@/components/cerca-de-mi/NearMePageClient';

export const metadata: Metadata = {
  title: 'Concord DUI DWI Near Me | Vasquez Law Firm',
  description:
    'Find experienced dui dwi lawyers in Concord, NC. Free consultation, no upfront fees. We fight for your rights.',
  keywords: 'dui dwi Concord, attorney near me, Concord NC dui dwi',
  openGraph: {
    title: 'DUI DWI Lawyers in Concord, NC - Free Consultation',
    description:
      'Need a dui dwi lawyer in Concord? Get the legal help you deserve. No fee unless we win.',
    images: ['/images/concord-dui-dwi.jpg'],
  },
};

export default function ConcordDUIDWINearMePage() {
  componentLogger.info('concord-dui-cerca-de-miPage.render', {});

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
      service="DUI DWI"
      language="en"
      coordinates={{ lat: 35.4088, lng: -80.5795 }}
      nearbyOffices={nearbyOffices}
    />
  );
}
