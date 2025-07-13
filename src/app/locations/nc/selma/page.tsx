import { LocationPageTemplate } from '@/components/templates/LocationPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Selma NC Immigration Lawyer & Criminal Defense Attorney | Vasquez Law Firm`,
  description: `Experienced Selma attorneys serving Johnston County. Immigration law, criminal defense, personal injury, family law. Hablamos español. Free consultation.`,
  keywords: `Selma immigration lawyer, Selma criminal defense attorney, Selma personal injury lawyer, Selma abogado, Selma DWI lawyer, Johnston County attorney`,
  openGraph: {
    title: `Selma Immigration & Criminal Defense Lawyers - Vasquez Law Firm`,
    description: `Trusted legal representation in Selma, NC. Immigration, criminal defense, personal injury. Call 1-844-YO-PELEO.`,
    images: ['/og-selma.jpg'],
    locale: 'en_US',
    alternateLocale: 'es_ES',
  },
};

export default function SelmaPage() {
  const locationData = {
    city: 'Selma',
    state: 'NC',
    heroTitle: 'Legal Services in Selma',
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
