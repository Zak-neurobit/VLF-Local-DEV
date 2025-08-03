import { Metadata } from 'next';
import { componentLogger } from '@/lib/safe-logger';
import NearMePageClient from '@/components/cerca-de-mi/NearMePageClient';

export const metadata: Metadata = {
  title: 'Raleigh Personal Injury Lawyer Near Me | Vasquez Law Firm',
  description:
    'Find experienced personal injury lawyer lawyers in Raleigh, NC. Free consultation, no upfront fees. We fight for your rights.',
  keywords: 'personal injury lawyer Raleigh, attorney near me, Raleigh NC personal injury lawyer',
  openGraph: {
    title: 'Personal Injury Lawyer Lawyers in Raleigh, NC - Free Consultation',
    description:
      'Need a personal injury lawyer lawyer in Raleigh? Get the legal help you deserve. No fee unless we win.',
    images: ['/images/raleigh-personal-injury-lawyer.jpg'],
  },
};

export default function RaleighPersonalInjuryLawyerNearMePage() {
  componentLogger.info('raleigh-personal-injury-cerca-de-miPage.render', {});

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
      service="Personal Injury Lawyer"
      language="en"
      coordinates={{ lat: 35.7796, lng: -78.6382 }}
      nearbyOffices={nearbyOffices}
    />
  );
}
