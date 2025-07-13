import { LocationPageTemplate } from '@/components/templates/LocationPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Concord NC Immigration Lawyer & Criminal Defense Attorney | Vasquez Law Firm`,
  description: `Experienced Concord attorneys serving Cabarrus County. Immigration law, criminal defense, personal injury, family law. Hablamos español. Free consultation.`,
  keywords: `Concord immigration lawyer, Concord criminal defense attorney, Concord personal injury lawyer, Concord abogado, Concord DWI lawyer, Cabarrus County attorney`,
  openGraph: {
    title: `Concord Immigration & Criminal Defense Lawyers - Vasquez Law Firm`,
    description: `Trusted legal representation in Concord, NC. Immigration, criminal defense, personal injury. Call 1-844-YO-PELEO.`,
    images: ['/og-concord.jpg'],
    locale: 'en_US',
    alternateLocale: 'es_ES',
  },
};

export default function ConcordPage() {
  const locationData = {
    city: 'Concord',
    state: 'NC',
    heroTitle: 'Legal Services in Concord',
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
