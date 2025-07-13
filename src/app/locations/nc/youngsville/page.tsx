import { LocationPageTemplate } from '@/components/templates/LocationPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Youngsville NC Immigration Lawyer & Criminal Defense Attorney | Vasquez Law Firm`,
  description: `Experienced Youngsville attorneys serving Franklin County. Immigration law, criminal defense, personal injury, family law. Hablamos español. Free consultation.`,
  keywords: `Youngsville immigration lawyer, Youngsville criminal defense attorney, Youngsville personal injury lawyer, Youngsville abogado, Youngsville DWI lawyer, Franklin County attorney`,
  openGraph: {
    title: `Youngsville Immigration & Criminal Defense Lawyers - Vasquez Law Firm`,
    description: `Trusted legal representation in Youngsville, NC. Immigration, criminal defense, personal injury. Call 1-844-YO-PELEO.`,
    images: ['/og-youngsville.jpg'],
    locale: 'en_US',
    alternateLocale: 'es_ES',
  }

export default function YoungsvillePage() {
  const locationData = {
    city: 'Youngsville',
    state: 'NC',
    heroTitle: 'Legal Services in Youngsville',
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
