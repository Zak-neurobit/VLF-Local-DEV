import { LocationPageTemplate } from '@/components/templates/LocationPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Immigration Lawyer Near Me in Cary | Vasquez Law Firm',
  description:
    'Find experienced immigration lawyers near you in Cary, NC. Free consultation, bilingual services. Call 1-844-YO-PELEO.',
};

export const runtime = 'nodejs';

export default function CaryImmigrationNearMePage() {
  return (
    <LocationPageTemplate
      location={{
        city: 'Cary',
        state: 'NC',
        description: 'Immigration legal services in Cary area. Free consultation available.',
      }}
    />
  );
}
