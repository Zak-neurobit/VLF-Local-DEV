import { LocationPageTemplate } from '@/components/templates/LocationPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Hillsborough NC Immigration Lawyer & Criminal Defense Attorney | Vasquez Law Firm`,
  description: `Experienced Hillsborough attorneys serving Orange County. Immigration law, criminal defense, personal injury, family law. Hablamos español. Free consultation.`,
  keywords: `Hillsborough immigration lawyer, Hillsborough criminal defense attorney, Hillsborough personal injury lawyer, Hillsborough abogado, Hillsborough DWI lawyer, Orange County attorney`,
  openGraph: {
    title: `Hillsborough Immigration & Criminal Defense Lawyers - Vasquez Law Firm`,
    description: `Trusted legal representation in Hillsborough, NC. Immigration, criminal defense, personal injury. Call 1-844-YO-PELEO.`,
    images: ['/og-hillsborough.jpg'],
    locale: 'en_US',
    alternateLocale: 'es_ES',
  },
};

export default function HillsboroughPage() {
  const locationData = {
    city: 'Hillsborough',
    state: 'NC',
    heroTitle: 'Legal Services in Hillsborough',
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
