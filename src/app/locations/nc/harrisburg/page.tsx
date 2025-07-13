import { LocationPageTemplate } from '@/components/templates/LocationPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Harrisburg NC Immigration Lawyer & Criminal Defense Attorney | Vasquez Law Firm`,
  description: `Experienced Harrisburg attorneys serving Cabarrus County. Immigration law, criminal defense, personal injury, family law. Hablamos español. Free consultation.`,
  keywords: `Harrisburg immigration lawyer, Harrisburg criminal defense attorney, Harrisburg personal injury lawyer, Harrisburg abogado, Harrisburg DWI lawyer, Cabarrus County attorney`,
  openGraph: {
    title: `Harrisburg Immigration & Criminal Defense Lawyers - Vasquez Law Firm`,
    description: `Trusted legal representation in Harrisburg, NC. Immigration, criminal defense, personal injury. Call 1-844-YO-PELEO.`,
    images: ['/og-harrisburg.jpg'],
    locale: 'en_US',
    alternateLocale: 'es_ES',
  }

export default function HarrisburgPage() {
  const locationData = {
    city: 'Harrisburg',
    state: 'NC',
    heroTitle: 'Legal Services in Harrisburg',
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
