import { LocationPageTemplate } from '@/components/templates/LocationPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Wake Forest NC Immigration Lawyer & Criminal Defense Attorney | Vasquez Law Firm`,
  description: `Experienced Wake Forest attorneys serving Wake County. Immigration law, criminal defense, personal injury, family law. Hablamos español. Free consultation.`,
  keywords: `Wake Forest immigration lawyer, Wake Forest criminal defense attorney, Wake Forest personal injury lawyer, Wake Forest abogado, Wake Forest DWI lawyer, Wake County attorney`,
  openGraph: {
    title: `Wake Forest Immigration & Criminal Defense Lawyers - Vasquez Law Firm`,
    description: `Trusted legal representation in Wake Forest, NC. Immigration, criminal defense, personal injury. Call 1-844-YO-PELEO.`,
    images: ['/og-wake-forest.jpg'],
    locale: 'en_US',
    alternateLocale: 'es_ES',
  },
};

export default function WakeForestPage() {
  const locationData = {
    city: 'Wake Forest',
    state: 'NC',
    heroTitle: 'Legal Services in Wake Forest',
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
