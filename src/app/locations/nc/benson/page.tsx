import { LocationPageTemplate } from '@/components/templates/LocationPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Benson NC Immigration Lawyer & Criminal Defense Attorney | Vasquez Law Firm`,
  description: `Experienced Benson attorneys serving Johnston County. Immigration law, criminal defense, personal injury, family law. Hablamos español. Free consultation.`,
  keywords: `Benson immigration lawyer, Benson criminal defense attorney, Benson personal injury lawyer, Benson abogado, Benson DWI lawyer, Johnston County attorney`,
  openGraph: {
    title: `Benson Immigration & Criminal Defense Lawyers - Vasquez Law Firm`,
    description: `Trusted legal representation in Benson, NC. Immigration, criminal defense, personal injury. Call 1-844-YO-PELEO.`,
    images: ['/og-benson.jpg'],
    locale: 'en_US',
    alternateLocale: 'es_ES',
  },
};

export default function BensonPage() {
  const locationData = {
    city: 'Benson',
    state: 'NC',
    heroTitle: 'Legal Services in Benson',
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
