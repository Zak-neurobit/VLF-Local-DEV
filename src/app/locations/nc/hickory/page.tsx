import { LocationPageTemplate } from '@/components/templates/LocationPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Hickory NC Immigration Lawyer & Criminal Defense Attorney | Vasquez Law Firm`,
  description: `Experienced Hickory attorneys serving Catawba County. Immigration law, criminal defense, personal injury, family law. Hablamos español. Free consultation.`,
  keywords: `Hickory immigration lawyer, Hickory criminal defense attorney, Hickory personal injury lawyer, Hickory abogado, Hickory DWI lawyer, Catawba County attorney`,
  openGraph: {
    title: `Hickory Immigration & Criminal Defense Lawyers - Vasquez Law Firm`,
    description: `Trusted legal representation in Hickory, NC. Immigration, criminal defense, personal injury. Call 1-844-YO-PELEO.`,
    images: ['/og-hickory.jpg'],
    locale: 'en_US',
    alternateLocale: 'es_ES',
  },
};

export default function HickoryPage() {
  const locationData = {
    city: 'Hickory',
    state: 'NC',
    heroTitle: 'Legal Services in Hickory',
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
