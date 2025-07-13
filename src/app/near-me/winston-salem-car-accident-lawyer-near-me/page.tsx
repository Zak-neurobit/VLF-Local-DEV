import { LocationPageTemplate } from '@/components/templates/LocationPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Car Accident Lawyer Near Me in Winston | Vasquez Law Firm',
  description:
    'Find experienced car accident lawyers near you in Winston, NC. Free consultation, bilingual services. Call 1-844-YO-PELEO.',
};

export const runtime = 'nodejs';

export default function WinstonCarAccidentNearMePage() {
  return (
    <LocationPageTemplate
      location={{
        city: 'Winston',
        state: 'NC',
        description: 'Car Accident legal services in Winston area. Free consultation available.',
      }}
    />
  );
}
