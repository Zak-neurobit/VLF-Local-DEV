import { LocationPageTemplate } from '@/components/templates/LocationPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Workers Compensation Lawyer Near Me in Charlotte | Vasquez Law Firm',
  description:
    'Find experienced workers compensation lawyers near you in Charlotte, NC. Free consultation, bilingual services. Call 1-844-YO-PELEO.',
};

export const runtime = 'nodejs';

export default function CharlotteWorkersCompensationNearMePage() {
  return (
    <LocationPageTemplate
      location={{
        city: 'Charlotte',
        state: 'NC',
        description:
          'Workers Compensation legal services in Charlotte area. Free consultation available.',
      }}
    />
  );
}
