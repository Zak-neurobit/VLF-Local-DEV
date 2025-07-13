import { LocationPageTemplate } from '@/components/templates/LocationPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Criminal Defense Lawyer Near Me in High | Vasquez Law Firm',
  description:
    'Find experienced criminal defense lawyers near you in High, NC. Free consultation, bilingual services. Call 1-844-YO-PELEO.',
};

export const runtime = 'nodejs';

export default function HighCriminalDefenseNearMePage() {
  return (
    <LocationPageTemplate
      location={{
        city: 'High',
        state: 'NC',
        description: 'Criminal Defense legal services in High area. Free consultation available.',
      }}
    />
  );
}
