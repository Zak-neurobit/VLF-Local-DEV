import { LocationPageTemplate } from '@/components/templates/LocationPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Jacksonville NC Immigration Lawyer & Criminal Defense Attorney | Vasquez Law Firm`,
  description: `Experienced Jacksonville attorneys serving Onslow County. Immigration law, criminal defense, personal injury, family law. Hablamos español. Free consultation.`,
  keywords: `Jacksonville immigration lawyer, Jacksonville criminal defense attorney, Jacksonville personal injury lawyer, Jacksonville abogado, Jacksonville DWI lawyer, Onslow County attorney`,
  openGraph: {
    title: `Jacksonville Immigration & Criminal Defense Lawyers - Vasquez Law Firm`,
    description: `Trusted legal representation in Jacksonville, NC. Immigration, criminal defense, personal injury. Call 1-844-YO-PELEO.`,
    images: ['/og-jacksonville.jpg'],
    locale: 'en_US',
    alternateLocale: 'es_ES',
  }

export default function JacksonvillePage() {
  const locationData = {
    city: 'Jacksonville',
    state: 'NC',
    heroTitle: 'Legal Services in Jacksonville',
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
