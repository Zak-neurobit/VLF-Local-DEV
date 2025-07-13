import { LocationPageTemplate } from '@/components/templates/LocationPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Monroe NC Immigration Lawyer & Criminal Defense Attorney | Vasquez Law Firm`,
  description: `Experienced Monroe attorneys serving Union County. Immigration law, criminal defense, personal injury, family law. Hablamos español. Free consultation.`,
  keywords: `Monroe immigration lawyer, Monroe criminal defense attorney, Monroe personal injury lawyer, Monroe abogado, Monroe DWI lawyer, Union County attorney`,
  openGraph: {
    title: `Monroe Immigration & Criminal Defense Lawyers - Vasquez Law Firm`,
    description: `Trusted legal representation in Monroe, NC. Immigration, criminal defense, personal injury. Call 1-844-YO-PELEO.`,
    images: ['/og-monroe.jpg'],
    locale: 'en_US',
    alternateLocale: 'es_ES',
  },
};

export default function MonroePage() {
  const locationData = {
    city: 'Monroe',
    state: 'NC',
    heroTitle: 'Legal Services in Monroe',
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
