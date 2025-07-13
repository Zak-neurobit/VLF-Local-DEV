import { LocationPageTemplate } from '@/components/templates/LocationPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Mount Airy NC Immigration Lawyer & Criminal Defense Attorney | Vasquez Law Firm`,
  description: `Experienced Mount Airy attorneys serving Surry County. Immigration law, criminal defense, personal injury, family law. Hablamos español. Free consultation.`,
  keywords: `Mount Airy immigration lawyer, Mount Airy criminal defense attorney, Mount Airy personal injury lawyer, Mount Airy abogado, Mount Airy DWI lawyer, Surry County attorney`,
  openGraph: {
    title: `Mount Airy Immigration & Criminal Defense Lawyers - Vasquez Law Firm`,
    description: `Trusted legal representation in Mount Airy, NC. Immigration, criminal defense, personal injury. Call 1-844-YO-PELEO.`,
    images: ['/og-mount-airy.jpg'],
    locale: 'en_US',
    alternateLocale: 'es_ES',
  }

export default function MountAiryPage() {
  const locationData = {
    city: 'Mount Airy',
    state: 'NC',
    heroTitle: 'Legal Services in Mount Airy',
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
