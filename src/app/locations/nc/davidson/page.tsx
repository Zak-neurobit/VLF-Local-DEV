import { LocationPageTemplate } from '@/components/templates/LocationPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Davidson NC Immigration Lawyer & Criminal Defense Attorney | Vasquez Law Firm`,
  description: `Experienced Davidson attorneys serving Mecklenburg County. Immigration law, criminal defense, personal injury, family law. Hablamos español. Free consultation.`,
  keywords: `Davidson immigration lawyer, Davidson criminal defense attorney, Davidson personal injury lawyer, Davidson abogado, Davidson DWI lawyer, Mecklenburg County attorney`,
  openGraph: {
    title: `Davidson Immigration & Criminal Defense Lawyers - Vasquez Law Firm`,
    description: `Trusted legal representation in Davidson, NC. Immigration, criminal defense, personal injury. Call 1-844-YO-PELEO.`,
    images: ['/og-davidson.jpg'],
    locale: 'en_US',
    alternateLocale: 'es_ES',
  }

export default function DavidsonPage() {
  const locationData = {
    city: 'Davidson',
    state: 'NC',
    heroTitle: 'Legal Services in Davidson',
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
