import { LocationPageTemplate } from '@/components/templates/LocationPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Divorce Lawyer Near Me in Wilmington | Vasquez Law Firm',
  description:
    'Find experienced divorce lawyers near you in Wilmington, NC. Free consultation, bilingual services. Call 1-844-YO-PELEO.',
};

export const runtime = 'nodejs';

export default function WilmingtonDivorceNearMePage() {
  return (
    <LocationPageTemplate
      location={{
        city: 'Wilmington',
        state: 'NC',
        description: 'Divorce legal services in Wilmington area. Free consultation available.',
      }}
    />
  );
}
