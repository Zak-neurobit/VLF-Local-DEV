import { LocationPageTemplate } from '@/components/templates/LocationPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Fuquay-Varina NC Immigration Lawyer & Criminal Defense Attorney | Vasquez Law Firm`,
  description: `Experienced Fuquay-Varina attorneys serving Wake County. Immigration law, criminal defense, personal injury, family law. Hablamos español. Free consultation.`,
  keywords: `Fuquay-Varina immigration lawyer, Fuquay-Varina criminal defense attorney, Fuquay-Varina personal injury lawyer, Fuquay-Varina abogado, Fuquay-Varina DWI lawyer, Wake County attorney`,
  openGraph: {
    title: `Fuquay-Varina Immigration & Criminal Defense Lawyers - Vasquez Law Firm`,
    description: `Trusted legal representation in Fuquay-Varina, NC. Immigration, criminal defense, personal injury. Call 1-844-YO-PELEO.`,
    images: ['/og-fuquay-varina.jpg'],
    locale: 'en_US',
    alternateLocale: 'es_ES',
  }

export default function FuquayVarinaPage() {
  const locationData = {
    city: 'Fuquay Varina',
    state: 'NC',
    heroTitle: 'Legal Services in Fuquay Varina',
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
