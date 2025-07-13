import { LocationPageTemplate } from '@/components/templates/LocationPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Car Accident Lawyer Near Me in Concord | Vasquez Law Firm',
  description:
    'Find experienced car accident lawyers near you in Concord, NC. Free consultation, bilingual services. Call 1-844-YO-PELEO.',
};

export const runtime = 'nodejs';

export default function ConcordCarAccidentNearMePage() {
  return (
    <LocationPageTemplate
      location={{
        city: 'Concord',
        state: 'NC',
        description: 'Car Accident legal services in Concord area. Free consultation available.',
      }}
    />
  );
}
