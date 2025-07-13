import { LocationPageTemplate } from '@/components/templates/LocationPageTemplate';
import { Metadata } from 'next';

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
      }

export default function UptownPage() {
  const locationData = {
    city: 'Uptown',
    state: 'NC',
    heroTitle: 'Legal Services in Uptown',
    heroSubtitle: 'Trusted attorneys serving the local community',
    practiceAreas: [], // TODO: Add practice areas
    attorneys: [], // TODO: Add attorneys
    officeInfo: {
      address: '',
      phone: '1-844-YO-PELEO',
      hours: 'Monday-Friday 9AM-5PM',
    },
    language: 'en' as const,
  };

  return <LocationPageTemplate {...locationData} />;
}
