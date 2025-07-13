import { LocationPageTemplate } from '@/components/templates/LocationPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Immigration Lawyer Near Me in Wilmington | Vasquez Law Firm',
  description:
    'Find experienced immigration lawyers near you in Wilmington, NC. Free consultation, bilingual services. Call 1-844-YO-PELEO.',
};

export const runtime = 'nodejs';

export default function WilmingtonImmigrationNearMePage() {
  return (
    <LocationPageTemplate
      location={{
        city: 'Wilmington',
        state: 'NC',
        description: 'Immigration legal services in Wilmington area. Free consultation available.',
      }}
    />
  );
}
