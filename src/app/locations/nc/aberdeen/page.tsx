import { LocationPageTemplate } from '@/components/templates/LocationPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Aberdeen NC Immigration Lawyer & Criminal Defense Attorney | Vasquez Law Firm`,
  description: `Experienced Aberdeen attorneys serving Moore County. Immigration law, criminal defense, personal injury, family law. Hablamos español. Free consultation.`,
  keywords: `Aberdeen immigration lawyer, Aberdeen criminal defense attorney, Aberdeen personal injury lawyer, Aberdeen abogado, Aberdeen DWI lawyer, Moore County attorney`,
  openGraph: {
    title: `Aberdeen Immigration & Criminal Defense Lawyers - Vasquez Law Firm`,
    description: `Trusted legal representation in Aberdeen, NC. Immigration, criminal defense, personal injury. Call 1-844-YO-PELEO.`,
    images: ['/og-aberdeen.jpg'],
    locale: 'en_US',
    alternateLocale: 'es_ES',
  },
};

export default function AberdeenPage() {
  const locationData = {
    city: 'Aberdeen',
    state: 'NC',
    heroTitle: 'Legal Services in Aberdeen',
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
