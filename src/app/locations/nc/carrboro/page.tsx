import { LocationPageTemplate } from '@/components/templates/LocationPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Carrboro NC Immigration Lawyer & Criminal Defense Attorney | Vasquez Law Firm`,
  description: `Experienced Carrboro attorneys serving Orange County. Immigration law, criminal defense, personal injury, family law. Hablamos español. Free consultation.`,
  keywords: `Carrboro immigration lawyer, Carrboro criminal defense attorney, Carrboro personal injury lawyer, Carrboro abogado, Carrboro DWI lawyer, Orange County attorney`,
  openGraph: {
    title: `Carrboro Immigration & Criminal Defense Lawyers - Vasquez Law Firm`,
    description: `Trusted legal representation in Carrboro, NC. Immigration, criminal defense, personal injury. Call 1-844-YO-PELEO.`,
    images: ['/og-carrboro.jpg'],
    locale: 'en_US',
    alternateLocale: 'es_ES',
  },
};

export default function CarrboroPage() {
  const locationData = {
    city: 'Carrboro',
    state: 'NC',
    heroTitle: 'Legal Services in Carrboro',
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
