import { LocationPageTemplate } from '@/components/templates/LocationPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Pine Level NC Immigration Lawyer & Criminal Defense Attorney | Vasquez Law Firm`,
  description: `Experienced Pine Level attorneys serving Johnston County. Immigration law, criminal defense, personal injury, family law. Hablamos español. Free consultation.`,
  keywords: `Pine Level immigration lawyer, Pine Level criminal defense attorney, Pine Level personal injury lawyer, Pine Level abogado, Pine Level DWI lawyer, Johnston County attorney`,
  openGraph: {
    title: `Pine Level Immigration & Criminal Defense Lawyers - Vasquez Law Firm`,
    description: `Trusted legal representation in Pine Level, NC. Immigration, criminal defense, personal injury. Call 1-844-YO-PELEO.`,
    images: ['/og-pine-level.jpg'],
    locale: 'en_US',
    alternateLocale: 'es_ES',
  }

export default function PineLevelPage() {
  const locationData = {
    city: 'Pine Level',
    state: 'NC',
    heroTitle: 'Legal Services in Pine Level',
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
