import { LocationPageTemplate } from '@/components/templates/LocationPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Princeton NC Immigration Lawyer & Criminal Defense Attorney | Vasquez Law Firm`,
  description: `Experienced Princeton attorneys serving Johnston County. Immigration law, criminal defense, personal injury, family law. Hablamos español. Free consultation.`,
  keywords: `Princeton immigration lawyer, Princeton criminal defense attorney, Princeton personal injury lawyer, Princeton abogado, Princeton DWI lawyer, Johnston County attorney`,
  openGraph: {
    title: `Princeton Immigration & Criminal Defense Lawyers - Vasquez Law Firm`,
    description: `Trusted legal representation in Princeton, NC. Immigration, criminal defense, personal injury. Call 1-844-YO-PELEO.`,
    images: ['/og-princeton.jpg'],
    locale: 'en_US',
    alternateLocale: 'es_ES',
  }

export default function PrincetonPage() {
  const locationData = {
    city: 'Princeton',
    state: 'NC',
    heroTitle: 'Legal Services in Princeton',
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
