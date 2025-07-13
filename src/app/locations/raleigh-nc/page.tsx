import { LocationPageTemplate } from '@/components/templates/LocationPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Raleigh NC Immigration & Injury Lawyers | Vasquez Law Firm Office',
  description:
    'Visit our Raleigh NC law office for immigration, personal injury, workers comp & criminal defense. Free consultations. Open M-F 8:30-5:30. Call 919-755-9425.',
  keywords:
    'Raleigh immigration lawyer, Raleigh personal injury attorney, Raleigh NC law office, Vasquez Law Firm Raleigh',
  openGraph: {
    title: 'Raleigh NC Office - Vasquez Law Firm',
    description:
      'Experienced immigration & injury lawyers in Raleigh NC. Free consultations available. Serving Wake County and surrounding areas.',
    images: [{ url: '/images/offices/raleigh-office.jpg' }],
  },
};

export default function RaleighNcPage() {
  const locationData = {
    city: 'Raleigh Nc',
    state: 'NC',
    heroTitle: 'Legal Services in Raleigh Nc',
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
