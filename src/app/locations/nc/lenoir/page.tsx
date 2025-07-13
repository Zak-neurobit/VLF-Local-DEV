import { LocationPageTemplate } from '@/components/templates/LocationPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Lenoir NC Immigration Lawyer & Criminal Defense Attorney | Vasquez Law Firm`,
  description: `Experienced Lenoir attorneys serving Caldwell County. Immigration law, criminal defense, personal injury, family law. Hablamos español. Free consultation.`,
  keywords: `Lenoir immigration lawyer, Lenoir criminal defense attorney, Lenoir personal injury lawyer, Lenoir abogado, Lenoir DWI lawyer, Caldwell County attorney`,
  openGraph: {
    title: `Lenoir Immigration & Criminal Defense Lawyers - Vasquez Law Firm`,
    description: `Trusted legal representation in Lenoir, NC. Immigration, criminal defense, personal injury. Call 1-844-YO-PELEO.`,
    images: ['/og-lenoir.jpg'],
    locale: 'en_US',
    alternateLocale: 'es_ES',
  },
};

export default function LenoirPage() {
  const locationData = {
    city: 'Lenoir',
    state: 'NC',
    heroTitle: 'Legal Services in Lenoir',
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
