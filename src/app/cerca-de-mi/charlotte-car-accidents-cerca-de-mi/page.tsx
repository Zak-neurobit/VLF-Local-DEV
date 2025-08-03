import { Metadata } from 'next';
import { componentLogger } from '@/lib/safe-logger';
import NearMePageClient from '@/components/cerca-de-mi/NearMePageClient';

export const metadata: Metadata = {
  title: 'Charlotte Car Accident Lawyer Near Me | Vasquez Law Firm',
  description:
    'Find experienced car accident lawyer lawyers in Charlotte, NC. Free consultation, no upfront fees. We fight for your rights.',
  keywords: 'car accident lawyer Charlotte, attorney near me, Charlotte NC car accident lawyer',
  openGraph: {
    title: 'Car Accident Lawyer Lawyers in Charlotte, NC - Free Consultation',
    description:
      'Need a car accident lawyer lawyer in Charlotte? Get the legal help you deserve. No fee unless we win.',
    images: ['/images/charlotte-car-accident-lawyer.jpg'],
  },
};

export default function CharlotteCarAccidentLawyerNearMePage() {
  componentLogger.info('charlotte-car-accidents-cerca-de-miPage.render', {});

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
      service="Car Accident Lawyer"
      language="en"
      coordinates={{ lat: 35.2271, lng: -80.8431 }}
      nearbyOffices={nearbyOffices}
    />
  );
}
