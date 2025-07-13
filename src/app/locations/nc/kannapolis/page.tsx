import { LocationPageTemplate } from '@/components/templates/LocationPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Kannapolis NC Immigration Lawyer & Criminal Defense Attorney | Vasquez Law Firm`,
  description: `Experienced Kannapolis attorneys serving Cabarrus County. Immigration law, criminal defense, personal injury, family law. Hablamos español. Free consultation.`,
  keywords: `Kannapolis immigration lawyer, Kannapolis criminal defense attorney, Kannapolis personal injury lawyer, Kannapolis abogado, Kannapolis DWI lawyer, Cabarrus County attorney`,
  openGraph: {
    title: `Kannapolis Immigration & Criminal Defense Lawyers - Vasquez Law Firm`,
    description: `Trusted legal representation in Kannapolis, NC. Immigration, criminal defense, personal injury. Call 1-844-YO-PELEO.`,
    images: ['/og-kannapolis.jpg'],
    locale: 'en_US',
    alternateLocale: 'es_ES',
  }

export default function KannapolisPage() {
  const locationData = {
    city: 'Kannapolis',
    state: 'NC',
    heroTitle: 'Legal Services in Kannapolis',
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
