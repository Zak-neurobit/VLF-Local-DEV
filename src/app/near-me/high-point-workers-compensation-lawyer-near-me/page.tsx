import { LocationPageTemplate } from '@/components/templates/LocationPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Workers Compensation Lawyer Near Me in High | Vasquez Law Firm',
  description:
    'Find experienced workers compensation lawyers near you in High, NC. Free consultation, bilingual services. Call 1-844-YO-PELEO.',
};

export const runtime = 'nodejs';

export default function HighWorkersCompensationNearMePage() {
  return (
    <LocationPageTemplate
      location={{
        city: 'High',
        state: 'NC',
        description:
          'Workers Compensation legal services in High area. Free consultation available.',
      }}
    />
  );
}
