import { LocationPageTemplate } from '@/components/templates/LocationPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Car Accident Lawyer Near Me in Cary | Vasquez Law Firm',
  description:
    'Find experienced car accident lawyers near you in Cary. Free consultation available.',
};

export const runtime = 'nodejs';

export default function NearMePage() {
  return (
    <LocationPageTemplate
      location={{
        city: 'Cary',
        state: 'NC',
        description: 'Car Accident legal services in Cary area',
      }}
    />
  );
}
