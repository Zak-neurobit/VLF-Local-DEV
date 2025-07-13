import { LocationPageTemplate } from '@/components/templates/LocationPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Four Oaks NC Immigration Lawyer & Criminal Defense Attorney | Vasquez Law Firm`,
  description: `Experienced Four Oaks attorneys serving Johnston County. Immigration law, criminal defense, personal injury, family law. Hablamos español. Free consultation.`,
  keywords: `Four Oaks immigration lawyer, Four Oaks criminal defense attorney, Four Oaks personal injury lawyer, Four Oaks abogado, Four Oaks DWI lawyer, Johnston County attorney`,
  openGraph: {
    title: `Four Oaks Immigration & Criminal Defense Lawyers - Vasquez Law Firm`,
    description: `Trusted legal representation in Four Oaks, NC. Immigration, criminal defense, personal injury. Call 1-844-YO-PELEO.`,
    images: ['/og-four-oaks.jpg'],
    locale: 'en_US',
    alternateLocale: 'es_ES',
  }

export default function FourOaksPage() {
  const locationData = {
    city: 'Four Oaks',
    state: 'NC',
    heroTitle: 'Legal Services in Four Oaks',
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
