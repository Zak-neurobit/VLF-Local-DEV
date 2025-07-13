import { LocationPageTemplate } from '@/components/templates/LocationPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Stallings NC Immigration Lawyer & Criminal Defense Attorney | Vasquez Law Firm`,
  description: `Experienced Stallings attorneys serving Union County. Immigration law, criminal defense, personal injury, family law. Hablamos español. Free consultation.`,
  keywords: `Stallings immigration lawyer, Stallings criminal defense attorney, Stallings personal injury lawyer, Stallings abogado, Stallings DWI lawyer, Union County attorney`,
  openGraph: {
    title: `Stallings Immigration & Criminal Defense Lawyers - Vasquez Law Firm`,
    description: `Trusted legal representation in Stallings, NC. Immigration, criminal defense, personal injury. Call 1-844-YO-PELEO.`,
    images: ['/og-stallings.jpg'],
    locale: 'en_US',
    alternateLocale: 'es_ES',
  }

export default function StallingsPage() {
  const locationData = {
    city: 'Stallings',
    state: 'NC',
    heroTitle: 'Legal Services in Stallings',
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
