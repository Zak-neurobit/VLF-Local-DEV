import { LocationPageTemplate } from '@/components/templates/LocationPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Shelby NC Immigration Lawyer & Criminal Defense Attorney | Vasquez Law Firm`,
  description: `Experienced Shelby attorneys serving Cleveland County. Immigration law, criminal defense, personal injury, family law. Hablamos español. Free consultation.`,
  keywords: `Shelby immigration lawyer, Shelby criminal defense attorney, Shelby personal injury lawyer, Shelby abogado, Shelby DWI lawyer, Cleveland County attorney`,
  openGraph: {
    title: `Shelby Immigration & Criminal Defense Lawyers - Vasquez Law Firm`,
    description: `Trusted legal representation in Shelby, NC. Immigration, criminal defense, personal injury. Call 1-844-YO-PELEO.`,
    images: ['/og-shelby.jpg'],
    locale: 'en_US',
    alternateLocale: 'es_ES',
  },
};

export default function ShelbyPage() {
  const locationData = {
    city: 'Shelby',
    state: 'NC',
    heroTitle: 'Legal Services in Shelby',
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
