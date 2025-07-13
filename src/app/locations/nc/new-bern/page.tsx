import { LocationPageTemplate } from '@/components/templates/LocationPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `New Bern NC Immigration Lawyer & Criminal Defense Attorney | Vasquez Law Firm`,
  description: `Experienced New Bern attorneys serving Craven County. Immigration law, criminal defense, personal injury, family law. Hablamos español. Free consultation.`,
  keywords: `New Bern immigration lawyer, New Bern criminal defense attorney, New Bern personal injury lawyer, New Bern abogado, New Bern DWI lawyer, Craven County attorney`,
  openGraph: {
    title: `New Bern Immigration & Criminal Defense Lawyers - Vasquez Law Firm`,
    description: `Trusted legal representation in New Bern, NC. Immigration, criminal defense, personal injury. Call 1-844-YO-PELEO.`,
    images: ['/og-new-bern.jpg'],
    locale: 'en_US',
    alternateLocale: 'es_ES',
  },
};

export default function NewBernPage() {
  const locationData = {
    city: 'New Bern',
    state: 'NC',
    heroTitle: 'Legal Services in New Bern',
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
