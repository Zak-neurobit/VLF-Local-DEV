import { LocationPageTemplate } from '@/components/templates/LocationPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Immigration Lawyer Near Me in Winston | Vasquez Law Firm',
  description:
    'Find experienced immigration lawyers near you in Winston, NC. Free consultation, bilingual services. Call 1-844-YO-PELEO.',
};

export const runtime = 'nodejs';

export default function WinstonImmigrationNearMePage() {
  return (
    <LocationPageTemplate
      location={{
        city: 'Winston',
        state: 'NC',
        description: 'Immigration legal services in Winston area. Free consultation available.',
      }}
    />
  );
}
