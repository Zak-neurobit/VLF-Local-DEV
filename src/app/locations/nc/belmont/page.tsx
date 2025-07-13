import { LocationPageTemplate } from '@/components/templates/LocationPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Belmont NC Immigration Lawyer & Criminal Defense Attorney | Vasquez Law Firm`,
  description: `Experienced Belmont attorneys serving Gaston County. Immigration law, criminal defense, personal injury, family law. Hablamos español. Free consultation.`,
  keywords: `Belmont immigration lawyer, Belmont criminal defense attorney, Belmont personal injury lawyer, Belmont abogado, Belmont DWI lawyer, Gaston County attorney`,
  openGraph: {
    title: `Belmont Immigration & Criminal Defense Lawyers - Vasquez Law Firm`,
    description: `Trusted legal representation in Belmont, NC. Immigration, criminal defense, personal injury. Call 1-844-YO-PELEO.`,
    images: ['/og-belmont.jpg'],
    locale: 'en_US',
    alternateLocale: 'es_ES',
  },
};

export default function BelmontPage() {
  const locationData = {
    city: 'Belmont',
    state: 'NC',
    heroTitle: 'Legal Services in Belmont',
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
