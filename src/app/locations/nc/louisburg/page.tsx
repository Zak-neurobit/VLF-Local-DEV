import { LocationPageTemplate } from '@/components/templates/LocationPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Louisburg NC Immigration Lawyer & Criminal Defense Attorney | Vasquez Law Firm`,
  description: `Experienced Louisburg attorneys serving Franklin County. Immigration law, criminal defense, personal injury, family law. Hablamos español. Free consultation.`,
  keywords: `Louisburg immigration lawyer, Louisburg criminal defense attorney, Louisburg personal injury lawyer, Louisburg abogado, Louisburg DWI lawyer, Franklin County attorney`,
  openGraph: {
    title: `Louisburg Immigration & Criminal Defense Lawyers - Vasquez Law Firm`,
    description: `Trusted legal representation in Louisburg, NC. Immigration, criminal defense, personal injury. Call 1-844-YO-PELEO.`,
    images: ['/og-louisburg.jpg'],
    locale: 'en_US',
    alternateLocale: 'es_ES',
  },
};

export default function LouisburgPage() {
  const locationData = {
    city: 'Louisburg',
    state: 'NC',
    heroTitle: 'Legal Services in Louisburg',
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
