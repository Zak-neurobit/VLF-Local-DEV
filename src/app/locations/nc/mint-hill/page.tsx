import { LocationPageTemplate } from '@/components/templates/LocationPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Mint Hill NC Immigration Lawyer & Criminal Defense Attorney | Vasquez Law Firm`,
  description: `Experienced Mint Hill attorneys serving Mecklenburg County. Immigration law, criminal defense, personal injury, family law. Hablamos español. Free consultation.`,
  keywords: `Mint Hill immigration lawyer, Mint Hill criminal defense attorney, Mint Hill personal injury lawyer, Mint Hill abogado, Mint Hill DWI lawyer, Mecklenburg County attorney`,
  openGraph: {
    title: `Mint Hill Immigration & Criminal Defense Lawyers - Vasquez Law Firm`,
    description: `Trusted legal representation in Mint Hill, NC. Immigration, criminal defense, personal injury. Call 1-844-YO-PELEO.`,
    images: ['/og-mint-hill.jpg'],
    locale: 'en_US',
    alternateLocale: 'es_ES',
  },
};

export default function MintHillPage() {
  const locationData = {
    city: 'Mint Hill',
    state: 'NC',
    heroTitle: 'Legal Services in Mint Hill',
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
