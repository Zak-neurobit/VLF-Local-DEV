import { LocationPageTemplate } from '@/components/templates/LocationPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Greenville NC Immigration Lawyer & Criminal Defense Attorney | Vasquez Law Firm`,
  description: `Experienced Greenville attorneys serving Pitt County. Immigration law, criminal defense, personal injury, family law. Hablamos español. Free consultation.`,
  keywords: `Greenville immigration lawyer, Greenville criminal defense attorney, Greenville personal injury lawyer, Greenville abogado, Greenville DWI lawyer, Pitt County attorney`,
  openGraph: {
    title: `Greenville Immigration & Criminal Defense Lawyers - Vasquez Law Firm`,
    description: `Trusted legal representation in Greenville, NC. Immigration, criminal defense, personal injury. Call 1-844-YO-PELEO.`,
    images: ['/og-greenville.jpg'],
    locale: 'en_US',
    alternateLocale: 'es_ES',
  },
};

export default function GreenvillePage() {
  const locationData = {
    city: 'Greenville',
    state: 'NC',
    heroTitle: 'Legal Services in Greenville',
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
