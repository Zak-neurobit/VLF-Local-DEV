import { LocationPageTemplate } from '@/components/templates/LocationPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Newton NC Immigration Lawyer & Criminal Defense Attorney | Vasquez Law Firm`,
  description: `Experienced Newton attorneys serving Catawba County. Immigration law, criminal defense, personal injury, family law. Hablamos español. Free consultation.`,
  keywords: `Newton immigration lawyer, Newton criminal defense attorney, Newton personal injury lawyer, Newton abogado, Newton DWI lawyer, Catawba County attorney`,
  openGraph: {
    title: `Newton Immigration & Criminal Defense Lawyers - Vasquez Law Firm`,
    description: `Trusted legal representation in Newton, NC. Immigration, criminal defense, personal injury. Call 1-844-YO-PELEO.`,
    images: ['/og-newton.jpg'],
    locale: 'en_US',
    alternateLocale: 'es_ES',
  }

export default function NewtonPage() {
  const locationData = {
    city: 'Newton',
    state: 'NC',
    heroTitle: 'Legal Services in Newton',
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
