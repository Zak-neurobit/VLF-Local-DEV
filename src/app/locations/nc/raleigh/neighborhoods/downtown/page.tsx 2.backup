import { Metadata } from 'next';
import { NeighborhoodPageTemplate } from '@/components/templates/NeighborhoodPageTemplate';
import { generateNeighborhoodMetadata, generateNeighborhoodPageContent } from '@/lib/seo/neighborhood-page-generator';

const neighborhoodData = {
  neighborhood: 'Downtown',
  slug: 'downtown',
  city: 'Raleigh',
  citySlug: 'raleigh',
  zipCodes: ['27601', '27605']
};

export const metadata: Metadata = generateNeighborhoodMetadata(neighborhoodData);

export default function DowntownRaleighPage() {
  const content = generateNeighborhoodPageContent(neighborhoodData);
  
  return (
    <NeighborhoodPageTemplate
      neighborhood={{
        name: neighborhoodData.neighborhood,
        slug: neighborhoodData.slug,
        city: neighborhoodData.city,
        citySlug: neighborhoodData.citySlug,
        zipCodes: neighborhoodData.zipCodes
      }}
      content={content}
    />
  );
}