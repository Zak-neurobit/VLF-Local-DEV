import { LocationPageTemplate } from '@/components/templates/LocationPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Warrenton NC Immigration Lawyer & Criminal Defense Attorney | Vasquez Law Firm`,
  description: `Experienced Warrenton attorneys serving Warren County. Immigration law, criminal defense, personal injury, family law. Hablamos español. Free consultation.`,
  keywords: `Warrenton immigration lawyer, Warrenton criminal defense attorney, Warrenton personal injury lawyer, Warrenton abogado, Warrenton DWI lawyer, Warren County attorney`,
  openGraph: {
    title: `Warrenton Immigration & Criminal Defense Lawyers - Vasquez Law Firm`,
    description: `Trusted legal representation in Warrenton, NC. Immigration, criminal defense, personal injury. Call 1-844-YO-PELEO.`,
    images: ['/og-warrenton.jpg'],
    locale: 'en_US',
    alternateLocale: 'es_ES',
  },
};

export default function WarrentonPage() {
  const locationData = {
    city: 'Warrenton',
    state: 'NC',
    heroTitle: 'Legal Services in Warrenton',
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
