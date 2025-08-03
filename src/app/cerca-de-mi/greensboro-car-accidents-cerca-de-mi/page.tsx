import { Metadata } from 'next';
import { componentLogger } from '@/lib/safe-logger';
import NearMePageClient from '@/components/cerca-de-mi/NearMePageClient';

export const metadata: Metadata = {
  title: 'Greensboro Car Accident Lawyer Near Me | Vasquez Law Firm',
  description:
    'Find experienced car accident lawyer lawyers in Greensboro, NC. Free consultation, no upfront fees. We fight for your rights.',
  keywords: 'car accident lawyer Greensboro, attorney near me, Greensboro NC car accident lawyer',
  openGraph: {
    title: 'Car Accident Lawyer Lawyers in Greensboro, NC - Free Consultation',
    description:
      'Need a car accident lawyer lawyer in Greensboro? Get the legal help you deserve. No fee unless we win.',
    images: ['/images/greensboro-car-accident-lawyer.jpg'],
  },
};

export default function GreensboroCarAccidentLawyerNearMePage() {
  componentLogger.info('greensboro-car-accidents-cerca-de-miPage.render', {});

  const nearbyOffices = [
    {
      name: 'Durham Office',
      address: '567 Duke St, Durham, NC 27701',
      phone: '(919) 555-0124',
      distance: '55 miles',
    },
    {
      name: 'Raleigh Office',
      address: '1234 Main St, Raleigh, NC 27601',
      phone: '(919) 555-0123',
      distance: '80 miles',
    },
    {
      name: 'Charlotte Main Office',
      address: '3500 Cameron Blvd, Charlotte, NC 28211',
      phone: '(704) 555-0123',
      distance: '90 miles',
    },
  ];

  return (
    <NearMePageClient
      city="Greensboro"
      service="Car Accident Lawyer"
      language="en"
      coordinates={{ lat: 36.0726, lng: -79.792 }}
      nearbyOffices={nearbyOffices}
    />
  );
}
