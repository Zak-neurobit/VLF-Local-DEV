import { LocationPageTemplate } from '@/components/templates/LocationPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Oxford NC Immigration Lawyer & Criminal Defense Attorney | Vasquez Law Firm`,
  description: `Experienced Oxford attorneys serving Granville County. Immigration law, criminal defense, personal injury, family law. Hablamos español. Free consultation.`,
  keywords: `Oxford immigration lawyer, Oxford criminal defense attorney, Oxford personal injury lawyer, Oxford abogado, Oxford DWI lawyer, Granville County attorney`,
  openGraph: {
    title: `Oxford Immigration & Criminal Defense Lawyers - Vasquez Law Firm`,
    description: `Trusted legal representation in Oxford, NC. Immigration, criminal defense, personal injury. Call 1-844-YO-PELEO.`,
    images: ['/og-oxford.jpg'],
    locale: 'en_US',
    alternateLocale: 'es_ES',
  },
};

export default function OxfordPage() {
  const locationData = {
    city: 'Oxford',
    state: 'NC',
    heroTitle: 'Legal Services in Oxford',
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
