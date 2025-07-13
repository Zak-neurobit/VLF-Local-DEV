import { LocationPageTemplate } from '@/components/templates/LocationPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Matthews NC Immigration Lawyer & Criminal Defense Attorney | Vasquez Law Firm`,
  description: `Experienced Matthews attorneys serving Mecklenburg County. Immigration law, criminal defense, personal injury, family law. Hablamos español. Free consultation.`,
  keywords: `Matthews immigration lawyer, Matthews criminal defense attorney, Matthews personal injury lawyer, Matthews abogado, Matthews DWI lawyer, Mecklenburg County attorney`,
  openGraph: {
    title: `Matthews Immigration & Criminal Defense Lawyers - Vasquez Law Firm`,
    description: `Trusted legal representation in Matthews, NC. Immigration, criminal defense, personal injury. Call 1-844-YO-PELEO.`,
    images: ['/og-matthews.jpg'],
    locale: 'en_US',
    alternateLocale: 'es_ES',
  },
};

export default function MatthewsPage() {
  const locationData = {
    city: 'Matthews',
    state: 'NC',
    heroTitle: 'Legal Services in Matthews',
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
