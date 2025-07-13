import { LocationPageTemplate } from '@/components/templates/LocationPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Neighborhood Page',
  description: 'Neighborhood information and services',
};

export const runtime = 'nodejs';

export default function NeighborhoodPage() {
  return (
    <LocationPageTemplate
      location={{
        city: 'Charlotte',
        state: 'NC',
        description: 'Neighborhood page content',
      }}
    />
  );
}
