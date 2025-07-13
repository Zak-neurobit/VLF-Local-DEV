import { LocationPageTemplate } from '@/components/templates/LocationPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Sanford NC Immigration Lawyer & Criminal Defense Attorney | Vasquez Law Firm`,
  description: `Experienced Sanford attorneys serving Lee County. Immigration law, criminal defense, personal injury, family law. Hablamos español. Free consultation.`,
  keywords: `Sanford immigration lawyer, Sanford criminal defense attorney, Sanford personal injury lawyer, Sanford abogado, Sanford DWI lawyer, Lee County attorney`,
  openGraph: {
    title: `Sanford Immigration & Criminal Defense Lawyers - Vasquez Law Firm`,
    description: `Trusted legal representation in Sanford, NC. Immigration, criminal defense, personal injury. Call 1-844-YO-PELEO.`,
    images: ['/og-sanford.jpg'],
    locale: 'en_US',
    alternateLocale: 'es_ES',
  }

export default function SanfordPage() {
  const locationData = {
    city: 'Sanford',
    state: 'NC',
    heroTitle: 'Legal Services in Sanford',
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
