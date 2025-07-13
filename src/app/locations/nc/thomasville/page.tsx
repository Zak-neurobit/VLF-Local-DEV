import { LocationPageTemplate } from '@/components/templates/LocationPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Thomasville NC Immigration Lawyer & Criminal Defense Attorney | Vasquez Law Firm`,
  description: `Experienced Thomasville attorneys serving Davidson County. Immigration law, criminal defense, personal injury, family law. Hablamos español. Free consultation.`,
  keywords: `Thomasville immigration lawyer, Thomasville criminal defense attorney, Thomasville personal injury lawyer, Thomasville abogado, Thomasville DWI lawyer, Davidson County attorney`,
  openGraph: {
    title: `Thomasville Immigration & Criminal Defense Lawyers - Vasquez Law Firm`,
    description: `Trusted legal representation in Thomasville, NC. Immigration, criminal defense, personal injury. Call 1-844-YO-PELEO.`,
    images: ['/og-thomasville.jpg'],
    locale: 'en_US',
    alternateLocale: 'es_ES',
  },
};

export default function ThomasvillePage() {
  const locationData = {
    city: 'Thomasville',
    state: 'NC',
    heroTitle: 'Legal Services in Thomasville',
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
