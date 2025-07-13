import { LocationPageTemplate } from '@/components/templates/LocationPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Goldsboro NC Immigration Lawyer & Criminal Defense Attorney | Vasquez Law Firm`,
  description: `Experienced Goldsboro attorneys serving Wayne County. Immigration law, criminal defense, personal injury, family law. Hablamos español. Free consultation.`,
  keywords: `Goldsboro immigration lawyer, Goldsboro criminal defense attorney, Goldsboro personal injury lawyer, Goldsboro abogado, Goldsboro DWI lawyer, Wayne County attorney`,
  openGraph: {
    title: `Goldsboro Immigration & Criminal Defense Lawyers - Vasquez Law Firm`,
    description: `Trusted legal representation in Goldsboro, NC. Immigration, criminal defense, personal injury. Call 1-844-YO-PELEO.`,
    images: ['/og-goldsboro.jpg'],
    locale: 'en_US',
    alternateLocale: 'es_ES',
  },
};

export default function GoldsboroPage() {
  const locationData = {
    city: 'Goldsboro',
    state: 'NC',
    heroTitle: 'Legal Services in Goldsboro',
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
