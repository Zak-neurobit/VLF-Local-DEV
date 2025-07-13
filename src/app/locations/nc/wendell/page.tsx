import { LocationPageTemplate } from '@/components/templates/LocationPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Wendell NC Immigration Lawyer & Criminal Defense Attorney | Vasquez Law Firm`,
  description: `Experienced Wendell attorneys serving Wake County. Immigration law, criminal defense, personal injury, family law. Hablamos español. Free consultation.`,
  keywords: `Wendell immigration lawyer, Wendell criminal defense attorney, Wendell personal injury lawyer, Wendell abogado, Wendell DWI lawyer, Wake County attorney`,
  openGraph: {
    title: `Wendell Immigration & Criminal Defense Lawyers - Vasquez Law Firm`,
    description: `Trusted legal representation in Wendell, NC. Immigration, criminal defense, personal injury. Call 1-844-YO-PELEO.`,
    images: ['/og-wendell.jpg'],
    locale: 'en_US',
    alternateLocale: 'es_ES',
  },
};

export default function WendellPage() {
  const locationData = {
    city: 'Wendell',
    state: 'NC',
    heroTitle: 'Legal Services in Wendell',
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
