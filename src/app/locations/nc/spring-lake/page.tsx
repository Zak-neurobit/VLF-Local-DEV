import { LocationPageTemplate } from '@/components/templates/LocationPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Spring Lake NC Immigration Lawyer & Criminal Defense Attorney | Vasquez Law Firm`,
  description: `Experienced Spring Lake attorneys serving Cumberland County. Immigration law, criminal defense, personal injury, family law. Hablamos español. Free consultation.`,
  keywords: `Spring Lake immigration lawyer, Spring Lake criminal defense attorney, Spring Lake personal injury lawyer, Spring Lake abogado, Spring Lake DWI lawyer, Cumberland County attorney`,
  openGraph: {
    title: `Spring Lake Immigration & Criminal Defense Lawyers - Vasquez Law Firm`,
    description: `Trusted legal representation in Spring Lake, NC. Immigration, criminal defense, personal injury. Call 1-844-YO-PELEO.`,
    images: ['/og-spring-lake.jpg'],
    locale: 'en_US',
    alternateLocale: 'es_ES',
  }

export default function SpringLakePage() {
  const locationData = {
    city: 'Spring Lake',
    state: 'NC',
    heroTitle: 'Legal Services in Spring Lake',
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
