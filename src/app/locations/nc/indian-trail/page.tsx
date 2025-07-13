import { LocationPageTemplate } from '@/components/templates/LocationPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Indian Trail NC Immigration Lawyer & Criminal Defense Attorney | Vasquez Law Firm`,
  description: `Experienced Indian Trail attorneys serving Union County. Immigration law, criminal defense, personal injury, family law. Hablamos español. Free consultation.`,
  keywords: `Indian Trail immigration lawyer, Indian Trail criminal defense attorney, Indian Trail personal injury lawyer, Indian Trail abogado, Indian Trail DWI lawyer, Union County attorney`,
  openGraph: {
    title: `Indian Trail Immigration & Criminal Defense Lawyers - Vasquez Law Firm`,
    description: `Trusted legal representation in Indian Trail, NC. Immigration, criminal defense, personal injury. Call 1-844-YO-PELEO.`,
    images: ['/og-indian-trail.jpg'],
    locale: 'en_US',
    alternateLocale: 'es_ES',
  }

export default function IndianTrailPage() {
  const locationData = {
    city: 'Indian Trail',
    state: 'NC',
    heroTitle: 'Legal Services in Indian Trail',
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
