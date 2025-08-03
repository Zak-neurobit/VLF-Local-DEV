import { Metadata } from 'next';
import { componentLogger } from '@/lib/safe-logger';
import NearMePageClient from '@/components/cerca-de-mi/NearMePageClient';

export const metadata: Metadata = {
  title: 'Fayetteville Spanish Speaking Services Near Me | Vasquez Law Firm',
  description:
    'Find experienced spanish speaking services lawyers in Fayetteville, NC. Free consultation, no upfront fees. We fight for your rights.',
  keywords:
    'spanish speaking services Fayetteville, attorney near me, Fayetteville NC spanish speaking services',
  openGraph: {
    title: 'Spanish Speaking Services Lawyers in Fayetteville, NC - Free Consultation',
    description:
      'Need a spanish speaking services lawyer in Fayetteville? Get the legal help you deserve. No fee unless we win.',
    images: ['/images/fayetteville-spanish-speaking-services.jpg'],
  },
};

export default function FayettevilleSpanishSpeakingServicesNearMePage() {
  componentLogger.info('fayetteville-spanish-speaking-cerca-de-miPage.render', {});

  const nearbyOffices = [
    {
      name: 'Raleigh Office',
      address: '1234 Main St, Raleigh, NC 27601',
      phone: '(919) 555-0123',
      distance: '65 miles',
    },
    {
      name: 'Durham Office',
      address: '567 Duke St, Durham, NC 27701',
      phone: '(919) 555-0124',
      distance: '90 miles',
    },
    {
      name: 'Charlotte Main Office',
      address: '3500 Cameron Blvd, Charlotte, NC 28211',
      phone: '(704) 555-0123',
      distance: '130 miles',
    },
  ];

  return (
    <NearMePageClient
      city="Fayetteville"
      service="Spanish Speaking Services"
      language="en"
      coordinates={{ lat: 35.0527, lng: -78.8784 }}
      nearbyOffices={nearbyOffices}
    />
  );
}
