import { LocationPageTemplate } from '@/components/templates/LocationPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Rocky Mount NC Immigration Lawyer & Criminal Defense Attorney | Vasquez Law Firm`,
  description: `Experienced Rocky Mount attorneys serving Nash County. Immigration law, criminal defense, personal injury, family law. Hablamos español. Free consultation.`,
  keywords: `Rocky Mount immigration lawyer, Rocky Mount criminal defense attorney, Rocky Mount personal injury lawyer, Rocky Mount abogado, Rocky Mount DWI lawyer, Nash County attorney`,
  openGraph: {
    title: `Rocky Mount Immigration & Criminal Defense Lawyers - Vasquez Law Firm`,
    description: `Trusted legal representation in Rocky Mount, NC. Immigration, criminal defense, personal injury. Call 1-844-YO-PELEO.`,
    images: ['/og-rocky-mount.jpg'],
    locale: 'en_US',
    alternateLocale: 'es_ES',
  }

export default function RockyMountPage() {
  const locationData = {
    city: 'Rocky Mount',
    state: 'NC',
    heroTitle: 'Legal Services in Rocky Mount',
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
