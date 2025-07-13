import { LocationPageTemplate } from '@/components/templates/LocationPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Laurinburg NC Immigration Lawyer & Criminal Defense Attorney | Vasquez Law Firm`,
  description: `Experienced Laurinburg attorneys serving Scotland County. Immigration law, criminal defense, personal injury, family law. Hablamos español. Free consultation.`,
  keywords: `Laurinburg immigration lawyer, Laurinburg criminal defense attorney, Laurinburg personal injury lawyer, Laurinburg abogado, Laurinburg DWI lawyer, Scotland County attorney`,
  openGraph: {
    title: `Laurinburg Immigration & Criminal Defense Lawyers - Vasquez Law Firm`,
    description: `Trusted legal representation in Laurinburg, NC. Immigration, criminal defense, personal injury. Call 1-844-YO-PELEO.`,
    images: ['/og-laurinburg.jpg'],
    locale: 'en_US',
    alternateLocale: 'es_ES',
  }

export default function LaurinburgPage() {
  const locationData = {
    city: 'Laurinburg',
    state: 'NC',
    heroTitle: 'Legal Services in Laurinburg',
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
