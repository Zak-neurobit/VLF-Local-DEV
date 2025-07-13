import { LocationPageTemplate } from '@/components/templates/LocationPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Mooresville NC Immigration Lawyer & Criminal Defense Attorney | Vasquez Law Firm`,
  description: `Experienced Mooresville attorneys serving Iredell County. Immigration law, criminal defense, personal injury, family law. Hablamos español. Free consultation.`,
  keywords: `Mooresville immigration lawyer, Mooresville criminal defense attorney, Mooresville personal injury lawyer, Mooresville abogado, Mooresville DWI lawyer, Iredell County attorney`,
  openGraph: {
    title: `Mooresville Immigration & Criminal Defense Lawyers - Vasquez Law Firm`,
    description: `Trusted legal representation in Mooresville, NC. Immigration, criminal defense, personal injury. Call 1-844-YO-PELEO.`,
    images: ['/og-mooresville.jpg'],
    locale: 'en_US',
    alternateLocale: 'es_ES',
  },
};

export default function MooresvillePage() {
  const locationData = {
    city: 'Mooresville',
    state: 'NC',
    heroTitle: 'Legal Services in Mooresville',
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
