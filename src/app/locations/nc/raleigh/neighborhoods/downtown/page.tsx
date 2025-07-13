import { LocationPageTemplate } from '@/components/templates/LocationPageTemplate';
import { Metadata } from 'next';

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
      }

export default function DowntownPage() {
  const locationData = {
    city: 'Downtown',
    state: 'NC',
    heroTitle: 'Legal Services in Downtown',
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
