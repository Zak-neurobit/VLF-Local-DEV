import { LocationPageTemplate } from '@/components/templates/LocationPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Hope Mills NC Immigration Lawyer & Criminal Defense Attorney | Vasquez Law Firm`,
  description: `Experienced Hope Mills attorneys serving Cumberland County. Immigration law, criminal defense, personal injury, family law. Hablamos español. Free consultation.`,
  keywords: `Hope Mills immigration lawyer, Hope Mills criminal defense attorney, Hope Mills personal injury lawyer, Hope Mills abogado, Hope Mills DWI lawyer, Cumberland County attorney`,
  openGraph: {
    title: `Hope Mills Immigration & Criminal Defense Lawyers - Vasquez Law Firm`,
    description: `Trusted legal representation in Hope Mills, NC. Immigration, criminal defense, personal injury. Call 1-844-YO-PELEO.`,
    images: ['/og-hope-mills.jpg'],
    locale: 'en_US',
    alternateLocale: 'es_ES',
  },
};

export default function HopeMillsPage() {
  const locationData = {
    city: 'Hope Mills',
    state: 'NC',
    heroTitle: 'Legal Services in Hope Mills',
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
