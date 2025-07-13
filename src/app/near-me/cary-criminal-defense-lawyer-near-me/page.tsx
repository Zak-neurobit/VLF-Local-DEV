import { LocationPageTemplate } from '@/components/templates/LocationPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Criminal Defense Lawyer Near Me in Cary | Vasquez Law Firm',
  description:
    'Find experienced criminal defense lawyers near you in Cary. Free consultation available.',
};

export const runtime = 'nodejs';

export default function NearMePage() {
  return (
    <LocationPageTemplate
      location={{
        city: 'Cary',
        state: 'NC',
        description: 'Criminal Defense legal services in Cary area',
      }}
    />
  );
}
