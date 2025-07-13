import { LocationPageTemplate } from '@/components/templates/LocationPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Roxboro NC Immigration Lawyer & Criminal Defense Attorney | Vasquez Law Firm`,
  description: `Experienced Roxboro attorneys serving Person County. Immigration law, criminal defense, personal injury, family law. Hablamos español. Free consultation.`,
  keywords: `Roxboro immigration lawyer, Roxboro criminal defense attorney, Roxboro personal injury lawyer, Roxboro abogado, Roxboro DWI lawyer, Person County attorney`,
  openGraph: {
    title: `Roxboro Immigration & Criminal Defense Lawyers - Vasquez Law Firm`,
    description: `Trusted legal representation in Roxboro, NC. Immigration, criminal defense, personal injury. Call 1-844-YO-PELEO.`,
    images: ['/og-roxboro.jpg'],
    locale: 'en_US',
    alternateLocale: 'es_ES',
  }

export default function RoxboroPage() {
  const locationData = {
    city: 'Roxboro',
    state: 'NC',
    heroTitle: 'Legal Services in Roxboro',
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
