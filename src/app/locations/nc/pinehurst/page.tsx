import { LocationPageTemplate } from '@/components/templates/LocationPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Pinehurst NC Immigration Lawyer & Criminal Defense Attorney | Vasquez Law Firm`,
  description: `Experienced Pinehurst attorneys serving Moore County. Immigration law, criminal defense, personal injury, family law. Hablamos español. Free consultation.`,
  keywords: `Pinehurst immigration lawyer, Pinehurst criminal defense attorney, Pinehurst personal injury lawyer, Pinehurst abogado, Pinehurst DWI lawyer, Moore County attorney`,
  openGraph: {
    title: `Pinehurst Immigration & Criminal Defense Lawyers - Vasquez Law Firm`,
    description: `Trusted legal representation in Pinehurst, NC. Immigration, criminal defense, personal injury. Call 1-844-YO-PELEO.`,
    images: ['/og-pinehurst.jpg'],
    locale: 'en_US',
    alternateLocale: 'es_ES',
  }

export default function PinehurstPage() {
  const locationData = {
    city: 'Pinehurst',
    state: 'NC',
    heroTitle: 'Legal Services in Pinehurst',
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
