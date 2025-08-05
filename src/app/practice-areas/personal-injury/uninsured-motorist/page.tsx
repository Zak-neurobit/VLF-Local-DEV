import PracticeAreaWrapper from '@/components/templates/PracticeAreaWrapper';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Uninsured Motorist Accident Lawyer NC | UM/UIM Claims Attorney',
  description:
    'Hit by an uninsured or underinsured driver in North Carolina? Our UM/UIM attorneys fight insurance companies for the compensation you deserve.',
  keywords: [
    'uninsured motorist lawyer NC',
    'underinsured motorist attorney North Carolina',
    'UM UIM claims lawyer',
    'uninsured driver accident NC',
    'underinsured motorist coverage',
    'Charlotte uninsured motorist attorney',
  ],
  openGraph: {
    title: 'NC Uninsured/Underinsured Motorist Claims Lawyer',
    description:
      "Hit by an uninsured driver? Don't let lack of insurance leave you without compensation. We fight for your UM/UIM benefits.",
    images: [
      {
        url: '/images/uninsured-motorist-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Uninsured Motorist Claims Attorney North Carolina',
      },
    ],
  },
};

export default function UninsuredMotoristPage() {
  return (
    <PracticeAreaWrapper
      practiceArea="personal-injury"
      subArea="uninsured-motorist"
      language="en"
    />
  );
}
