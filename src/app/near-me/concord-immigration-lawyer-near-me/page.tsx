import { LocationPageTemplate } from '@/components/templates/LocationPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Immigration Lawyer Near Me in Concord | Vasquez Law Firm',
  description:
    'Find experienced immigration lawyers near you in Concord, NC. Free consultation, bilingual services. Call 1-844-YO-PELEO.',
};

export const runtime = 'nodejs';

export default function ConcordImmigrationNearMePage() {
  return (
    <LocationPageTemplate
      location={{
        city: 'Concord',
        state: 'NC',
        description: 'Immigration legal services in Concord area. Free consultation available.',
      }}
    />
  );
}
