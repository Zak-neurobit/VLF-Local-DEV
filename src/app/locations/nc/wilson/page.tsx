import { LocationPageTemplate } from '@/components/templates/LocationPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Wilson NC Immigration Lawyer & Criminal Defense Attorney | Vasquez Law Firm`,
  description: `Experienced Wilson attorneys serving Wilson County. Immigration law, criminal defense, personal injury, family law. Hablamos español. Free consultation.`,
  keywords: `Wilson immigration lawyer, Wilson criminal defense attorney, Wilson personal injury lawyer, Wilson abogado, Wilson DWI lawyer, Wilson County attorney`,
  openGraph: {
    title: `Wilson Immigration & Criminal Defense Lawyers - Vasquez Law Firm`,
    description: `Trusted legal representation in Wilson, NC. Immigration, criminal defense, personal injury. Call 1-844-YO-PELEO.`,
    images: ['/og-wilson.jpg'],
    locale: 'en_US',
    alternateLocale: 'es_ES',
  }

export default function WilsonPage() {
  const locationData = {
    city: 'Wilson',
    state: 'NC',
    heroTitle: 'Legal Services in Wilson',
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
