import { LocationPageTemplate } from '@/components/templates/LocationPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Criminal Defense Lawyer Near Me in Raleigh | Vasquez Law Firm',
  description:
    'Find experienced criminal defense lawyers near you in Raleigh, NC. Free consultation, bilingual services. Call 1-844-YO-PELEO.',
};

export const runtime = 'nodejs';

export default function RaleighCriminalDefenseNearMePage() {
  return (
    <LocationPageTemplate
      location={{
        city: 'Raleigh',
        state: 'NC',
        description:
          'Criminal Defense legal services in Raleigh area. Free consultation available.',
      }}
    />
  );
}
