import { LocationPageTemplate } from '@/components/templates/LocationPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Holly Springs NC Immigration Lawyer & Criminal Defense Attorney | Vasquez Law Firm`,
  description: `Experienced Holly Springs attorneys serving Wake County. Immigration law, criminal defense, personal injury, family law. Hablamos español. Free consultation.`,
  keywords: `Holly Springs immigration lawyer, Holly Springs criminal defense attorney, Holly Springs personal injury lawyer, Holly Springs abogado, Holly Springs DWI lawyer, Wake County attorney`,
  openGraph: {
    title: `Holly Springs Immigration & Criminal Defense Lawyers - Vasquez Law Firm`,
    description: `Trusted legal representation in Holly Springs, NC. Immigration, criminal defense, personal injury. Call 1-844-YO-PELEO.`,
    images: ['/og-holly-springs.jpg'],
    locale: 'en_US',
    alternateLocale: 'es_ES',
  }

export default function HollySpringsPage() {
  const locationData = {
    city: 'Holly Springs',
    state: 'NC',
    heroTitle: 'Legal Services in Holly Springs',
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
