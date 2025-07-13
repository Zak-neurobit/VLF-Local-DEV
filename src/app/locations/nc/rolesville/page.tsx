import { LocationPageTemplate } from '@/components/templates/LocationPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Rolesville NC Immigration Lawyer & Criminal Defense Attorney | Vasquez Law Firm`,
  description: `Experienced Rolesville attorneys serving Wake County. Immigration law, criminal defense, personal injury, family law. Hablamos español. Free consultation.`,
  keywords: `Rolesville immigration lawyer, Rolesville criminal defense attorney, Rolesville personal injury lawyer, Rolesville abogado, Rolesville DWI lawyer, Wake County attorney`,
  openGraph: {
    title: `Rolesville Immigration & Criminal Defense Lawyers - Vasquez Law Firm`,
    description: `Trusted legal representation in Rolesville, NC. Immigration, criminal defense, personal injury. Call 1-844-YO-PELEO.`,
    images: ['/og-rolesville.jpg'],
    locale: 'en_US',
    alternateLocale: 'es_ES',
  },
};

export default function RolesvillePage() {
  const locationData = {
    city: 'Rolesville',
    state: 'NC',
    heroTitle: 'Legal Services in Rolesville',
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
