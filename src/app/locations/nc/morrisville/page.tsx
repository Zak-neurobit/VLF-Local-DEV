import { LocationPageTemplate } from '@/components/templates/LocationPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Morrisville NC Immigration Lawyer & Criminal Defense Attorney | Vasquez Law Firm`,
  description: `Experienced Morrisville attorneys serving Wake County. Immigration law, criminal defense, personal injury, family law. Hablamos español. Free consultation.`,
  keywords: `Morrisville immigration lawyer, Morrisville criminal defense attorney, Morrisville personal injury lawyer, Morrisville abogado, Morrisville DWI lawyer, Wake County attorney`,
  openGraph: {
    title: `Morrisville Immigration & Criminal Defense Lawyers - Vasquez Law Firm`,
    description: `Trusted legal representation in Morrisville, NC. Immigration, criminal defense, personal injury. Call 1-844-YO-PELEO.`,
    images: ['/og-morrisville.jpg'],
    locale: 'en_US',
    alternateLocale: 'es_ES',
  }

export default function MorrisvillePage() {
  const locationData = {
    city: 'Morrisville',
    state: 'NC',
    heroTitle: 'Legal Services in Morrisville',
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
