import { LocationPageTemplate } from '@/components/templates/LocationPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Kinston NC Immigration Lawyer & Criminal Defense Attorney | Vasquez Law Firm`,
  description: `Experienced Kinston attorneys serving Lenoir County. Immigration law, criminal defense, personal injury, family law. Hablamos español. Free consultation.`,
  keywords: `Kinston immigration lawyer, Kinston criminal defense attorney, Kinston personal injury lawyer, Kinston abogado, Kinston DWI lawyer, Lenoir County attorney`,
  openGraph: {
    title: `Kinston Immigration & Criminal Defense Lawyers - Vasquez Law Firm`,
    description: `Trusted legal representation in Kinston, NC. Immigration, criminal defense, personal injury. Call 1-844-YO-PELEO.`,
    images: ['/og-kinston.jpg'],
    locale: 'en_US',
    alternateLocale: 'es_ES',
  },
};

export default function KinstonPage() {
  const locationData = {
    city: 'Kinston',
    state: 'NC',
    heroTitle: 'Legal Services in Kinston',
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
