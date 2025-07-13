import { LocationPageTemplate } from '@/components/templates/LocationPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Car Accident Lawyer Near Me in Charlotte | Vasquez Law Firm',
  description:
    'Find experienced car accident lawyers near you in Charlotte, NC. Free consultation, bilingual services. Call 1-844-YO-PELEO.',
};

export const runtime = 'nodejs';

export default function CharlotteCarAccidentNearMePage() {
  return (
    <LocationPageTemplate
      location={{
        city: 'Charlotte',
        state: 'NC',
        description: 'Car Accident legal services in Charlotte area. Free consultation available.',
      }}
    />
  );
}
