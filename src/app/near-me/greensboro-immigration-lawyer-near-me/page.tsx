import { LocationPageTemplate } from '@/components/templates/LocationPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Immigration Lawyer Near Me in Greensboro | Vasquez Law Firm',
  description:
    'Find experienced immigration lawyers near you in Greensboro, NC. Free consultation, bilingual services. Call 1-844-YO-PELEO.',
};

export const runtime = 'nodejs';

export default function GreensboroImmigrationNearMePage() {
  return (
    <LocationPageTemplate
      location={{
        city: 'Greensboro',
        state: 'NC',
        description: 'Immigration legal services in Greensboro area. Free consultation available.',
      }}
    />
  );
}
