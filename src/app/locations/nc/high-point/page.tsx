import { LocationPageTemplate } from '@/components/templates/LocationPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `High Point NC Immigration Lawyer & Criminal Defense Attorney | Vasquez Law Firm`,
  description: `Experienced High Point attorneys serving Guilford County. Immigration law, criminal defense, personal injury, family law. Hablamos español. Free consultation.`,
  keywords: `High Point immigration lawyer, High Point criminal defense attorney, High Point personal injury lawyer, High Point abogado, High Point DWI lawyer, Guilford County attorney`,
  openGraph: {
    title: `High Point Immigration & Criminal Defense Lawyers - Vasquez Law Firm`,
    description: `Trusted legal representation in High Point, NC. Immigration, criminal defense, personal injury. Call 1-844-YO-PELEO.`,
    images: ['/og-high-point.jpg'],
    locale: 'en_US',
    alternateLocale: 'es_ES',
  }

export default function HighPointPage() {
  const locationData = {
    city: 'High Point',
    state: 'NC',
    heroTitle: 'Legal Services in High Point',
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
