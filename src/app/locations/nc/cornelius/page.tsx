import { LocationPageTemplate } from '@/components/templates/LocationPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Cornelius NC Immigration Lawyer & Criminal Defense Attorney | Vasquez Law Firm`,
  description: `Experienced Cornelius attorneys serving Mecklenburg County. Immigration law, criminal defense, personal injury, family law. Hablamos español. Free consultation.`,
  keywords: `Cornelius immigration lawyer, Cornelius criminal defense attorney, Cornelius personal injury lawyer, Cornelius abogado, Cornelius DWI lawyer, Mecklenburg County attorney`,
  openGraph: {
    title: `Cornelius Immigration & Criminal Defense Lawyers - Vasquez Law Firm`,
    description: `Trusted legal representation in Cornelius, NC. Immigration, criminal defense, personal injury. Call 1-844-YO-PELEO.`,
    images: ['/og-cornelius.jpg'],
    locale: 'en_US',
    alternateLocale: 'es_ES',
  }

export default function CorneliusPage() {
  const locationData = {
    city: 'Cornelius',
    state: 'NC',
    heroTitle: 'Legal Services in Cornelius',
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
