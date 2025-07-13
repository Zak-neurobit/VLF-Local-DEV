import { LocationPageTemplate } from '@/components/templates/LocationPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Lexington NC Immigration Lawyer & Criminal Defense Attorney | Vasquez Law Firm`,
  description: `Experienced Lexington attorneys serving Davidson County. Immigration law, criminal defense, personal injury, family law. Hablamos español. Free consultation.`,
  keywords: `Lexington immigration lawyer, Lexington criminal defense attorney, Lexington personal injury lawyer, Lexington abogado, Lexington DWI lawyer, Davidson County attorney`,
  openGraph: {
    title: `Lexington Immigration & Criminal Defense Lawyers - Vasquez Law Firm`,
    description: `Trusted legal representation in Lexington, NC. Immigration, criminal defense, personal injury. Call 1-844-YO-PELEO.`,
    images: ['/og-lexington.jpg'],
    locale: 'en_US',
    alternateLocale: 'es_ES',
  },
};

export default function LexingtonPage() {
  const locationData = {
    city: 'Lexington',
    state: 'NC',
    heroTitle: 'Legal Services in Lexington',
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
