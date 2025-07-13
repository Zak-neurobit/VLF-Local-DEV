import { LocationPageTemplate } from '@/components/templates/LocationPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Southern Pines NC Immigration Lawyer & Criminal Defense Attorney | Vasquez Law Firm`,
  description: `Experienced Southern Pines attorneys serving Moore County. Immigration law, criminal defense, personal injury, family law. Hablamos español. Free consultation.`,
  keywords: `Southern Pines immigration lawyer, Southern Pines criminal defense attorney, Southern Pines personal injury lawyer, Southern Pines abogado, Southern Pines DWI lawyer, Moore County attorney`,
  openGraph: {
    title: `Southern Pines Immigration & Criminal Defense Lawyers - Vasquez Law Firm`,
    description: `Trusted legal representation in Southern Pines, NC. Immigration, criminal defense, personal injury. Call 1-844-YO-PELEO.`,
    images: ['/og-southern-pines.jpg'],
    locale: 'en_US',
    alternateLocale: 'es_ES',
  },
};

export default function SouthernPinesPage() {
  const locationData = {
    city: 'Southern Pines',
    state: 'NC',
    heroTitle: 'Legal Services in Southern Pines',
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
