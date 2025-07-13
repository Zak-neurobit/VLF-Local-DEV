import { LocationPageTemplate } from '@/components/templates/LocationPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Mount Holly NC Immigration Lawyer & Criminal Defense Attorney | Vasquez Law Firm`,
  description: `Experienced Mount Holly attorneys serving Gaston County. Immigration law, criminal defense, personal injury, family law. Hablamos español. Free consultation.`,
  keywords: `Mount Holly immigration lawyer, Mount Holly criminal defense attorney, Mount Holly personal injury lawyer, Mount Holly abogado, Mount Holly DWI lawyer, Gaston County attorney`,
  openGraph: {
    title: `Mount Holly Immigration & Criminal Defense Lawyers - Vasquez Law Firm`,
    description: `Trusted legal representation in Mount Holly, NC. Immigration, criminal defense, personal injury. Call 1-844-YO-PELEO.`,
    images: ['/og-mount-holly.jpg'],
    locale: 'en_US',
    alternateLocale: 'es_ES',
  },
};

export default function MountHollyPage() {
  const locationData = {
    city: 'Mount Holly',
    state: 'NC',
    heroTitle: 'Legal Services in Mount Holly',
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
