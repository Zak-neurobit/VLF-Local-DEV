import { LocationPageTemplate } from '@/components/templates/LocationPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Salisbury NC Immigration Lawyer & Criminal Defense Attorney | Vasquez Law Firm`,
  description: `Experienced Salisbury attorneys serving Rowan County. Immigration law, criminal defense, personal injury, family law. Hablamos español. Free consultation.`,
  keywords: `Salisbury immigration lawyer, Salisbury criminal defense attorney, Salisbury personal injury lawyer, Salisbury abogado, Salisbury DWI lawyer, Rowan County attorney`,
  openGraph: {
    title: `Salisbury Immigration & Criminal Defense Lawyers - Vasquez Law Firm`,
    description: `Trusted legal representation in Salisbury, NC. Immigration, criminal defense, personal injury. Call 1-844-YO-PELEO.`,
    images: ['/og-salisbury.jpg'],
    locale: 'en_US',
    alternateLocale: 'es_ES',
  }

export default function SalisburyPage() {
  const locationData = {
    city: 'Salisbury',
    state: 'NC',
    heroTitle: 'Legal Services in Salisbury',
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
