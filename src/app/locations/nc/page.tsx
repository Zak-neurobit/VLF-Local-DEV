import { LocationPageTemplate } from '@/components/templates/LocationPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'North Carolina Locations | Vasquez Law Firm - Immigration & Personal Injury Attorneys',
  description:
    'Vasquez Law Firm serves all major cities in North Carolina. Find experienced immigration lawyers and personal injury attorneys near you. Free consultation. Se habla español.',
  keywords:
    'North Carolina lawyer, NC attorney, immigration lawyer North Carolina, personal injury attorney NC, abogado Carolina del Norte',
};

export default function NcPage() {
  const locationData = {
    city: 'Nc',
    state: 'NC',
    heroTitle: 'Legal Services in Nc',
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
