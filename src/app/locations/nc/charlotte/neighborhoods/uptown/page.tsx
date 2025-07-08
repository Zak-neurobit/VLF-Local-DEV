import { Metadata } from 'next';
import { NeighborhoodPageTemplate } from '@/components/templates/NeighborhoodPageTemplate';
import { generateNeighborhoodMetadata, generateNeighborhoodPageContent } from '@/lib/seo/neighborhood-page-generator';

const neighborhoodData = {
  neighborhood: 'Uptown',
  slug: 'uptown',
  city: 'Charlotte',
  citySlug: 'charlotte',
  zipCodes: ['28202', '28280']
};

export const metadata: Metadata = generateNeighborhoodMetadata(neighborhoodData);

export default function UptownCharlottePage() {
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