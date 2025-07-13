import { LocationPageTemplate } from '@/components/templates/LocationPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'DUI Lawyer Near Me in Raleigh | Vasquez Law Firm',
  description:
    'Find experienced dui lawyers near you in Raleigh, NC. Free consultation, bilingual services. Call 1-844-YO-PELEO.',
};

export const runtime = 'nodejs';

export default function RaleighDUINearMePage() {
  return (
    <LocationPageTemplate
      location={{
        city: 'Raleigh',
        state: 'NC',
        description: 'DUI legal services in Raleigh area. Free consultation available.',
      }}
    />
  );
}
