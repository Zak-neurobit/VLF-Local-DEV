import { LocationPageTemplate } from '@/components/templates/LocationPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Knightdale NC Immigration Lawyer & Criminal Defense Attorney | Vasquez Law Firm`,
  description: `Experienced Knightdale attorneys serving Wake County. Immigration law, criminal defense, personal injury, family law. Hablamos español. Free consultation.`,
  keywords: `Knightdale immigration lawyer, Knightdale criminal defense attorney, Knightdale personal injury lawyer, Knightdale abogado, Knightdale DWI lawyer, Wake County attorney`,
  openGraph: {
    title: `Knightdale Immigration & Criminal Defense Lawyers - Vasquez Law Firm`,
    description: `Trusted legal representation in Knightdale, NC. Immigration, criminal defense, personal injury. Call 1-844-YO-PELEO.`,
    images: ['/og-knightdale.jpg'],
    locale: 'en_US',
    alternateLocale: 'es_ES',
  },
};

export default function KnightdalePage() {
  const locationData = {
    city: 'Knightdale',
    state: 'NC',
    heroTitle: 'Legal Services in Knightdale',
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
