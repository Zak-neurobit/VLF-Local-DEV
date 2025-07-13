import { LocationPageTemplate } from '@/components/templates/LocationPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Boone NC Immigration Lawyer & Criminal Defense Attorney | Vasquez Law Firm`,
  description: `Experienced Boone attorneys serving Watauga County. Immigration law, criminal defense, personal injury, family law. Hablamos español. Free consultation.`,
  keywords: `Boone immigration lawyer, Boone criminal defense attorney, Boone personal injury lawyer, Boone abogado, Boone DWI lawyer, Watauga County attorney`,
  openGraph: {
    title: `Boone Immigration & Criminal Defense Lawyers - Vasquez Law Firm`,
    description: `Trusted legal representation in Boone, NC. Immigration, criminal defense, personal injury. Call 1-844-YO-PELEO.`,
    images: ['/og-boone.jpg'],
    locale: 'en_US',
    alternateLocale: 'es_ES',
  },
};

export default function BoonePage() {
  const locationData = {
    city: 'Boone',
    state: 'NC',
    heroTitle: 'Legal Services in Boone',
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
