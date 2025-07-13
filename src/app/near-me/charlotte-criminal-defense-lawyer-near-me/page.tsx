import { LocationPageTemplate } from '@/components/templates/LocationPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Criminal Defense Lawyer Near Me in Charlotte | Vasquez Law Firm',
  description:
    'Find experienced criminal defense lawyers near you in Charlotte, NC. Free consultation, bilingual services. Call 1-844-YO-PELEO.',
};

export const runtime = 'nodejs';

export default function CharlotteCriminalDefenseNearMePage() {
  return (
    <LocationPageTemplate
      location={{
        city: 'Charlotte',
        state: 'NC',
        description:
          'Criminal Defense legal services in Charlotte area. Free consultation available.',
      }}
    />
  );
}
