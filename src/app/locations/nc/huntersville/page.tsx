import { LocationPageTemplate } from '@/components/templates/LocationPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Huntersville NC Immigration Lawyer & Criminal Defense Attorney | Vasquez Law Firm`,
  description: `Experienced Huntersville attorneys serving Mecklenburg County. Immigration law, criminal defense, personal injury, family law. Hablamos español. Free consultation.`,
  keywords: `Huntersville immigration lawyer, Huntersville criminal defense attorney, Huntersville personal injury lawyer, Huntersville abogado, Huntersville DWI lawyer, Mecklenburg County attorney`,
  openGraph: {
    title: `Huntersville Immigration & Criminal Defense Lawyers - Vasquez Law Firm`,
    description: `Trusted legal representation in Huntersville, NC. Immigration, criminal defense, personal injury. Call 1-844-YO-PELEO.`,
    images: ['/og-huntersville.jpg'],
    locale: 'en_US',
    alternateLocale: 'es_ES',
  }

export default function HuntersvillePage() {
  const locationData = {
    city: 'Huntersville',
    state: 'NC',
    heroTitle: 'Legal Services in Huntersville',
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
