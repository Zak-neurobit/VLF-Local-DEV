import { LocationPageTemplate } from '@/components/templates/LocationPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Kernersville NC Immigration Lawyer & Criminal Defense Attorney | Vasquez Law Firm`,
  description: `Experienced Kernersville attorneys serving Forsyth County. Immigration law, criminal defense, personal injury, family law. Hablamos español. Free consultation.`,
  keywords: `Kernersville immigration lawyer, Kernersville criminal defense attorney, Kernersville personal injury lawyer, Kernersville abogado, Kernersville DWI lawyer, Forsyth County attorney`,
  openGraph: {
    title: `Kernersville Immigration & Criminal Defense Lawyers - Vasquez Law Firm`,
    description: `Trusted legal representation in Kernersville, NC. Immigration, criminal defense, personal injury. Call 1-844-YO-PELEO.`,
    images: ['/og-kernersville.jpg'],
    locale: 'en_US',
    alternateLocale: 'es_ES',
  }

export default function KernersvillePage() {
  const locationData = {
    city: 'Kernersville',
    state: 'NC',
    heroTitle: 'Legal Services in Kernersville',
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
