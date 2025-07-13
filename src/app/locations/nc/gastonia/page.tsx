import { LocationPageTemplate } from '@/components/templates/LocationPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Gastonia NC Immigration Lawyer & Criminal Defense Attorney | Vasquez Law Firm`,
  description: `Experienced Gastonia attorneys serving Gaston County. Immigration law, criminal defense, personal injury, family law. Hablamos español. Free consultation.`,
  keywords: `Gastonia immigration lawyer, Gastonia criminal defense attorney, Gastonia personal injury lawyer, Gastonia abogado, Gastonia DWI lawyer, Gaston County attorney`,
  openGraph: {
    title: `Gastonia Immigration & Criminal Defense Lawyers - Vasquez Law Firm`,
    description: `Trusted legal representation in Gastonia, NC. Immigration, criminal defense, personal injury. Call 1-844-YO-PELEO.`,
    images: ['/og-gastonia.jpg'],
    locale: 'en_US',
    alternateLocale: 'es_ES',
  }

export default function GastoniaPage() {
  const locationData = {
    city: 'Gastonia',
    state: 'NC',
    heroTitle: 'Legal Services in Gastonia',
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
