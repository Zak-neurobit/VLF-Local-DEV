import { LocationPageTemplate } from '@/components/templates/LocationPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Elizabeth City NC Immigration Lawyer & Criminal Defense Attorney | Vasquez Law Firm`,
  description: `Experienced Elizabeth City attorneys serving Pasquotank County. Immigration law, criminal defense, personal injury, family law. Hablamos español. Free consultation.`,
  keywords: `Elizabeth City immigration lawyer, Elizabeth City criminal defense attorney, Elizabeth City personal injury lawyer, Elizabeth City abogado, Elizabeth City DWI lawyer, Pasquotank County attorney`,
  openGraph: {
    title: `Elizabeth City Immigration & Criminal Defense Lawyers - Vasquez Law Firm`,
    description: `Trusted legal representation in Elizabeth City, NC. Immigration, criminal defense, personal injury. Call 1-844-YO-PELEO.`,
    images: ['/og-elizabeth-city.jpg'],
    locale: 'en_US',
    alternateLocale: 'es_ES',
  },
};

export default function ElizabethCityPage() {
  const locationData = {
    city: 'Elizabeth City',
    state: 'NC',
    heroTitle: 'Legal Services in Elizabeth City',
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
