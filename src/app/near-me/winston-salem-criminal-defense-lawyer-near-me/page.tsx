import { LocationPageTemplate } from '@/components/templates/LocationPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Criminal Defense Lawyer Near Me in Winston | Vasquez Law Firm',
  description:
    'Find experienced criminal defense lawyers near you in Winston, NC. Free consultation, bilingual services. Call 1-844-YO-PELEO.',
};

export const runtime = 'nodejs';

export default function WinstonCriminalDefenseNearMePage() {
  return (
    <LocationPageTemplate
      location={{
        city: 'Winston',
        state: 'NC',
        description:
          'Criminal Defense legal services in Winston area. Free consultation available.',
      }}
    />
  );
}
