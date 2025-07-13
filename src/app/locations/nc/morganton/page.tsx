import { LocationPageTemplate } from '@/components/templates/LocationPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Morganton NC Immigration Lawyer & Criminal Defense Attorney | Vasquez Law Firm`,
  description: `Experienced Morganton attorneys serving Burke County. Immigration law, criminal defense, personal injury, family law. Hablamos español. Free consultation.`,
  keywords: `Morganton immigration lawyer, Morganton criminal defense attorney, Morganton personal injury lawyer, Morganton abogado, Morganton DWI lawyer, Burke County attorney`,
  openGraph: {
    title: `Morganton Immigration & Criminal Defense Lawyers - Vasquez Law Firm`,
    description: `Trusted legal representation in Morganton, NC. Immigration, criminal defense, personal injury. Call 1-844-YO-PELEO.`,
    images: ['/og-morganton.jpg'],
    locale: 'en_US',
    alternateLocale: 'es_ES',
  }

export default function MorgantonPage() {
  const locationData = {
    city: 'Morganton',
    state: 'NC',
    heroTitle: 'Legal Services in Morganton',
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
