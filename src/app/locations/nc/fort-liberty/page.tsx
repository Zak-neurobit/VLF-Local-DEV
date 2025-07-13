import { LocationPageTemplate } from '@/components/templates/LocationPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Fort Liberty NC Immigration Lawyer & Criminal Defense Attorney | Vasquez Law Firm`,
  description: `Experienced Fort Liberty attorneys serving Cumberland County. Immigration law, criminal defense, personal injury, family law. Hablamos español. Free consultation.`,
  keywords: `Fort Liberty immigration lawyer, Fort Liberty criminal defense attorney, Fort Liberty personal injury lawyer, Fort Liberty abogado, Fort Liberty DWI lawyer, Cumberland County attorney`,
  openGraph: {
    title: `Fort Liberty Immigration & Criminal Defense Lawyers - Vasquez Law Firm`,
    description: `Trusted legal representation in Fort Liberty, NC. Immigration, criminal defense, personal injury. Call 1-844-YO-PELEO.`,
    images: ['/og-fort-liberty.jpg'],
    locale: 'en_US',
    alternateLocale: 'es_ES',
  }

export default function FortLibertyPage() {
  const locationData = {
    city: 'Fort Liberty',
    state: 'NC',
    heroTitle: 'Legal Services in Fort Liberty',
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
