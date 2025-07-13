import { LocationPageTemplate } from '@/components/templates/LocationPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Car Accident Lawyer Near Me in Wilmington | Vasquez Law Firm',
  description:
    'Find experienced car accident lawyers near you in Wilmington, NC. Free consultation, bilingual services. Call 1-844-YO-PELEO.',
};

export const runtime = 'nodejs';

export default function WilmingtonCarAccidentNearMePage() {
  return (
    <LocationPageTemplate
      location={{
        city: 'Wilmington',
        state: 'NC',
        description: 'Car Accident legal services in Wilmington area. Free consultation available.',
      }}
    />
  );
}
