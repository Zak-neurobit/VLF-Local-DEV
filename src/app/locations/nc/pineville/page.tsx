import { LocationPageTemplate } from '@/components/templates/LocationPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Pineville NC Immigration Lawyer & Criminal Defense Attorney | Vasquez Law Firm`,
  description: `Experienced Pineville attorneys serving Mecklenburg County. Immigration law, criminal defense, personal injury, family law. Hablamos español. Free consultation.`,
  keywords: `Pineville immigration lawyer, Pineville criminal defense attorney, Pineville personal injury lawyer, Pineville abogado, Pineville DWI lawyer, Mecklenburg County attorney`,
  openGraph: {
    title: `Pineville Immigration & Criminal Defense Lawyers - Vasquez Law Firm`,
    description: `Trusted legal representation in Pineville, NC. Immigration, criminal defense, personal injury. Call 1-844-YO-PELEO.`,
    images: ['/og-pineville.jpg'],
    locale: 'en_US',
    alternateLocale: 'es_ES',
  }

export default function PinevillePage() {
  const locationData = {
    city: 'Pineville',
    state: 'NC',
    heroTitle: 'Legal Services in Pineville',
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
