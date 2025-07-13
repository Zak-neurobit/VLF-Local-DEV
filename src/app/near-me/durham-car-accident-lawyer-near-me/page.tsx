import { LocationPageTemplate } from '@/components/templates/LocationPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Car Accident Lawyer Near Me in Durham | Vasquez Law Firm',
  description:
    'Find experienced car accident lawyers near you in Durham, NC. Free consultation, bilingual services. Call 1-844-YO-PELEO.',
};

export const runtime = 'nodejs';

export default function DurhamCarAccidentNearMePage() {
  return (
    <LocationPageTemplate
      location={{
        city: 'Durham',
        state: 'NC',
        description: 'Car Accident legal services in Durham area. Free consultation available.',
      }}
    />
  );
}
