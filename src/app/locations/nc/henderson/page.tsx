import { LocationPageTemplate } from '@/components/templates/LocationPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Henderson NC Immigration Lawyer & Criminal Defense Attorney | Vasquez Law Firm`,
  description: `Experienced Henderson attorneys serving Vance County. Immigration law, criminal defense, personal injury, family law. Hablamos español. Free consultation.`,
  keywords: `Henderson immigration lawyer, Henderson criminal defense attorney, Henderson personal injury lawyer, Henderson abogado, Henderson DWI lawyer, Vance County attorney`,
  openGraph: {
    title: `Henderson Immigration & Criminal Defense Lawyers - Vasquez Law Firm`,
    description: `Trusted legal representation in Henderson, NC. Immigration, criminal defense, personal injury. Call 1-844-YO-PELEO.`,
    images: ['/og-henderson.jpg'],
    locale: 'en_US',
    alternateLocale: 'es_ES',
  },
};

export default function HendersonPage() {
  const locationData = {
    city: 'Henderson',
    state: 'NC',
    heroTitle: 'Legal Services in Henderson',
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
