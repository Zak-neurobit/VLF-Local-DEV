import { LocationPageTemplate } from '@/components/templates/LocationPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'DUI Lawyer Near Me in Greensboro | Vasquez Law Firm',
  description:
    'Find experienced dui lawyers near you in Greensboro, NC. Free consultation, bilingual services. Call 1-844-YO-PELEO.',
};

export const runtime = 'nodejs';

export default function GreensboroDUINearMePage() {
  return (
    <LocationPageTemplate
      location={{
        city: 'Greensboro',
        state: 'NC',
        description: 'DUI legal services in Greensboro area. Free consultation available.',
      }}
    />
  );
}
