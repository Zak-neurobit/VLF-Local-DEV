import { LocationPageTemplate } from '@/components/templates/LocationPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Criminal Defense Lawyer Near Me in Wilmington | Vasquez Law Firm',
  description:
    'Find experienced criminal defense lawyers near you in Wilmington, NC. Free consultation, bilingual services. Call 1-844-YO-PELEO.',
};

export const runtime = 'nodejs';

export default function WilmingtonCriminalDefenseNearMePage() {
  return (
    <LocationPageTemplate
      location={{
        city: 'Wilmington',
        state: 'NC',
        description:
          'Criminal Defense legal services in Wilmington area. Free consultation available.',
      }}
    />
  );
}
