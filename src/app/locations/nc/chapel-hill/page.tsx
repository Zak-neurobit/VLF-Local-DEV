import { LocationPageTemplate } from '@/components/templates/LocationPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Chapel Hill NC Immigration Lawyer & Criminal Defense Attorney | Vasquez Law Firm`,
  description: `Experienced Chapel Hill attorneys serving Orange County. Immigration law, criminal defense, personal injury, family law. Hablamos español. Free consultation.`,
  keywords: `Chapel Hill immigration lawyer, Chapel Hill criminal defense attorney, Chapel Hill personal injury lawyer, Chapel Hill abogado, Chapel Hill DWI lawyer, Orange County attorney`,
  openGraph: {
    title: `Chapel Hill Immigration & Criminal Defense Lawyers - Vasquez Law Firm`,
    description: `Trusted legal representation in Chapel Hill, NC. Immigration, criminal defense, personal injury. Call 1-844-YO-PELEO.`,
    images: ['/og-chapel-hill.jpg'],
    locale: 'en_US',
    alternateLocale: 'es_ES',
  }

export default function ChapelHillPage() {
  const locationData = {
    city: 'Chapel Hill',
    state: 'NC',
    heroTitle: 'Legal Services in Chapel Hill',
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
