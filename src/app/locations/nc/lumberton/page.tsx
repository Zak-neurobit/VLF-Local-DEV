import { LocationPageTemplate } from '@/components/templates/LocationPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Lumberton NC Immigration Lawyer & Criminal Defense Attorney | Vasquez Law Firm`,
  description: `Experienced Lumberton attorneys serving Robeson County. Immigration law, criminal defense, personal injury, family law. Hablamos español. Free consultation.`,
  keywords: `Lumberton immigration lawyer, Lumberton criminal defense attorney, Lumberton personal injury lawyer, Lumberton abogado, Lumberton DWI lawyer, Robeson County attorney`,
  openGraph: {
    title: `Lumberton Immigration & Criminal Defense Lawyers - Vasquez Law Firm`,
    description: `Trusted legal representation in Lumberton, NC. Immigration, criminal defense, personal injury. Call 1-844-YO-PELEO.`,
    images: ['/og-lumberton.jpg'],
    locale: 'en_US',
    alternateLocale: 'es_ES',
  }

export default function LumbertonPage() {
  const locationData = {
    city: 'Lumberton',
    state: 'NC',
    heroTitle: 'Legal Services in Lumberton',
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
