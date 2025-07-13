import { LocationPageTemplate } from '@/components/templates/LocationPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Workers Compensation Lawyer Near Me in Durham | Vasquez Law Firm',
  description:
    'Find experienced workers compensation lawyers near you in Durham, NC. Free consultation, bilingual services. Call 1-844-YO-PELEO.',
};

export const runtime = 'nodejs';

export default function DurhamWorkersCompensationNearMePage() {
  return (
    <LocationPageTemplate
      location={{
        city: 'Durham',
        state: 'NC',
        description:
          'Workers Compensation legal services in Durham area. Free consultation available.',
      }}
    />
  );
}
