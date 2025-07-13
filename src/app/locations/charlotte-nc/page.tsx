import { LocationPageTemplate } from '@/components/templates/LocationPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Charlotte NC Immigration & Personal Injury Lawyers | Vasquez Law Firm, PLLC',
  description:
    'Visit our Charlotte NC flagship law office for immigration, personal injury, workers comp & criminal defense. Free consultations. Serving Mecklenburg County. Call 704-358-0470.',
  keywords: 'Charlotte immigration lawyer, Charlotte personal injury attorney, Charlotte NC law office, Vasquez Law Firm Charlotte, abogados en Charlotte NC',
  openGraph: {
    title: 'Charlotte NC Office - Vasquez Law Firm | Flagship Location',
    description:
      'Experienced immigration & injury lawyers in Charlotte NC. Free consultations, bilingual services. Serving Charlotte metro area & all of Mecklenburg County.',
    images: [{ url: '/images/offices/charlotte-office.jpg' }

export default function CharlotteNcPage() {
  const locationData = {
    city: 'Charlotte Nc',
    state: 'NC',
    heroTitle: 'Legal Services in Charlotte Nc',
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
