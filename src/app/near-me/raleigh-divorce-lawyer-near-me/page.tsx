import { LocationPageTemplate } from '@/components/templates/LocationPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Divorce Lawyer Near Me in Raleigh | Vasquez Law Firm',
  description:
    'Find experienced divorce lawyers near you in Raleigh, NC. Free consultation, bilingual services. Call 1-844-YO-PELEO.',
};

export const runtime = 'nodejs';

export default function RaleighDivorceNearMePage() {
  return (
    <LocationPageTemplate
      location={{
        city: 'Raleigh',
        state: 'NC',
        description: 'Divorce legal services in Raleigh area. Free consultation available.',
      }}
    />
  );
}
