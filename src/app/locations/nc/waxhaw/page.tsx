import { LocationPageTemplate } from '@/components/templates/LocationPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Waxhaw NC Immigration Lawyer & Criminal Defense Attorney | Vasquez Law Firm`,
  description: `Experienced Waxhaw attorneys serving Union County. Immigration law, criminal defense, personal injury, family law. Hablamos español. Free consultation.`,
  keywords: `Waxhaw immigration lawyer, Waxhaw criminal defense attorney, Waxhaw personal injury lawyer, Waxhaw abogado, Waxhaw DWI lawyer, Union County attorney`,
  openGraph: {
    title: `Waxhaw Immigration & Criminal Defense Lawyers - Vasquez Law Firm`,
    description: `Trusted legal representation in Waxhaw, NC. Immigration, criminal defense, personal injury. Call 1-844-YO-PELEO.`,
    images: ['/og-waxhaw.jpg'],
    locale: 'en_US',
    alternateLocale: 'es_ES',
  },
};

export default function WaxhawPage() {
  const locationData = {
    city: 'Waxhaw',
    state: 'NC',
    heroTitle: 'Legal Services in Waxhaw',
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
