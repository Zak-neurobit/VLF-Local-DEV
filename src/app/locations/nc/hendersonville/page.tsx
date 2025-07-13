import { LocationPageTemplate } from '@/components/templates/LocationPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Hendersonville NC Immigration Lawyer & Criminal Defense Attorney | Vasquez Law Firm`,
  description: `Experienced Hendersonville attorneys serving Henderson County. Immigration law, criminal defense, personal injury, family law. Hablamos español. Free consultation.`,
  keywords: `Hendersonville immigration lawyer, Hendersonville criminal defense attorney, Hendersonville personal injury lawyer, Hendersonville abogado, Hendersonville DWI lawyer, Henderson County attorney`,
  openGraph: {
    title: `Hendersonville Immigration & Criminal Defense Lawyers - Vasquez Law Firm`,
    description: `Trusted legal representation in Hendersonville, NC. Immigration, criminal defense, personal injury. Call 1-844-YO-PELEO.`,
    images: ['/og-hendersonville.jpg'],
    locale: 'en_US',
    alternateLocale: 'es_ES',
  },
};

export default function HendersonvillePage() {
  const locationData = {
    city: 'Hendersonville',
    state: 'NC',
    heroTitle: 'Legal Services in Hendersonville',
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
