import { LocationPageTemplate } from '@/components/templates/LocationPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Burlington NC Immigration Lawyer & Criminal Defense Attorney | Vasquez Law Firm`,
  description: `Experienced Burlington attorneys serving Alamance County. Immigration law, criminal defense, personal injury, family law. Hablamos español. Free consultation.`,
  keywords: `Burlington immigration lawyer, Burlington criminal defense attorney, Burlington personal injury lawyer, Burlington abogado, Burlington DWI lawyer, Alamance County attorney`,
  openGraph: {
    title: `Burlington Immigration & Criminal Defense Lawyers - Vasquez Law Firm`,
    description: `Trusted legal representation in Burlington, NC. Immigration, criminal defense, personal injury. Call 1-844-YO-PELEO.`,
    images: ['/og-burlington.jpg'],
    locale: 'en_US',
    alternateLocale: 'es_ES',
  }

export default function BurlingtonPage() {
  const locationData = {
    city: 'Burlington',
    state: 'NC',
    heroTitle: 'Legal Services in Burlington',
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
