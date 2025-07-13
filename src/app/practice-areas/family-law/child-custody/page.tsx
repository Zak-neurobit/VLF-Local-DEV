import { ModernPracticeAreaTemplateV2 } from '@/components/templates/ModernPracticeAreaTemplateV2';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NC Child Custody Lawyer | Custody & Visitation Attorney | Vasquez Law Firm',
  description:
    'Fighting for your parental rights in North Carolina. Our child custody attorneys handle custody disputes, modifications, and visitation issues. Se habla español.',
  keywords: [
    'child custody lawyer NC',
    'North Carolina custody attorney',
    'visitation rights lawyer',
    'joint custody attorney NC',
    'child custody modification lawyer',
    'Charlotte custody lawyer',
    'Raleigh family custody attorney',
    'abogado custodia hijos',
    'emergency custody lawyer NC',
    'parenting plan attorney',
  ],
  openGraph: {
    title: 'NC Child Custody Lawyer | Fighting for Your Children',
    description:
      "Protecting parent-child relationships with experienced custody representation. We fight for your rights and your children's best interests.",
    images: [
      {
        url: '/images/child-custody-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'North Carolina Child Custody Attorney',
      },
    ],
  },
};

export default function ChildCustodyPage() {
  const pageData = {
    practiceArea: 'Child Custody',
    heroTitle: 'Child Custody Attorneys',
    heroSubtitle: 'Experienced legal representation',
    urgencyLevel: 'medium' as const,
    emergencyMessage: '',
    services: [], // TODO: Add services
    faqs: [], // TODO: Add FAQs
    testimonials: [], // TODO: Add testimonials
    statistics: [],
    processSteps: [],
    language: 'en' as const,
  };

  return <ModernPracticeAreaTemplateV2 {...pageData} />;
}
