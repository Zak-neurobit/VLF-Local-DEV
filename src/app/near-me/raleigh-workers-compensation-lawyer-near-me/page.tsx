import { LocationPageTemplate } from '@/components/templates/LocationPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Workers Compensation Lawyer Near Me in Raleigh | Vasquez Law Firm',
  description:
    'Find experienced workers compensation lawyers near you in Raleigh, NC. Free consultation, bilingual services. Call 1-844-YO-PELEO.',
};

export const runtime = 'nodejs';

export default function RaleighWorkersCompensationNearMePage() {
  return (
    <LocationPageTemplate
      location={{
        city: 'Raleigh',
        state: 'NC',
        description:
          'Workers Compensation legal services in Raleigh area. Free consultation available.',
      }}
    />
  );
}
