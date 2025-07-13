import { LocationPageTemplate } from '@/components/templates/LocationPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Zebulon NC Immigration Lawyer & Criminal Defense Attorney | Vasquez Law Firm`,
  description: `Experienced Zebulon attorneys serving Wake County. Immigration law, criminal defense, personal injury, family law. Hablamos español. Free consultation.`,
  keywords: `Zebulon immigration lawyer, Zebulon criminal defense attorney, Zebulon personal injury lawyer, Zebulon abogado, Zebulon DWI lawyer, Wake County attorney`,
  openGraph: {
    title: `Zebulon Immigration & Criminal Defense Lawyers - Vasquez Law Firm`,
    description: `Trusted legal representation in Zebulon, NC. Immigration, criminal defense, personal injury. Call 1-844-YO-PELEO.`,
    images: ['/og-zebulon.jpg'],
    locale: 'en_US',
    alternateLocale: 'es_ES',
  },
};

export default function ZebulonPage() {
  const locationData = {
    city: 'Zebulon',
    state: 'NC',
    heroTitle: 'Legal Services in Zebulon',
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
