import { LocationPageTemplate } from '@/components/templates/LocationPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Albemarle NC Immigration Lawyer & Criminal Defense Attorney | Vasquez Law Firm`,
  description: `Experienced Albemarle attorneys serving Stanly County. Immigration law, criminal defense, personal injury, family law. Hablamos español. Free consultation.`,
  keywords: `Albemarle immigration lawyer, Albemarle criminal defense attorney, Albemarle personal injury lawyer, Albemarle abogado, Albemarle DWI lawyer, Stanly County attorney`,
  openGraph: {
    title: `Albemarle Immigration & Criminal Defense Lawyers - Vasquez Law Firm`,
    description: `Trusted legal representation in Albemarle, NC. Immigration, criminal defense, personal injury. Call 1-844-YO-PELEO.`,
    images: ['/og-albemarle.jpg'],
    locale: 'en_US',
    alternateLocale: 'es_ES',
  },
};

export default function AlbemarlePage() {
  const locationData = {
    city: 'Albemarle',
    state: 'NC',
    heroTitle: 'Legal Services in Albemarle',
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
