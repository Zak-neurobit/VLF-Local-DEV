import PracticeAreaWrapper from '@/components/templates/PracticeAreaWrapper';
import { Metadata } from 'next';

// Temporarily force dynamic rendering to reduce build memory usage
export const dynamic = 'force-dynamic';
export const revalidate = 3600; // 1 hour cache
export const metadata: Metadata = {
  title: 'Medical Malpractice Lawyers NC & FL | Hospital Negligence | Vasquez Law Firm',
  description:
    'Expert medical malpractice attorneys in Raleigh, Charlotte, Smithfield & Orlando. Surgical errors, misdiagnosis, birth injuries, hospital negligence. Free consultation.',
  keywords: [
    'medical malpractice lawyer',
    'hospital negligence',
    'surgical error',
    'misdiagnosis',
    'birth injury',
    'medication error',
    'medical mistake attorney',
    'Raleigh NC',
    'Charlotte NC',
    'Orlando FL',
  ],
  openGraph: {
    title: 'Medical Malpractice Lawyers | Hospital Negligence | Vasquez Law Firm',
    description:
      'Expert medical malpractice attorneys fighting for victims of medical negligence and hospital errors.',
    type: 'website',
    images: [
      {
        url: '/images/medical-malpractice-lawyers.jpg',
        width: 1200,
        height: 630,
        alt: 'Medical Malpractice Lawyers',
      },
    ],
  },
};

export default function MedicalMalpracticePage() {
  return (
    <PracticeAreaWrapper
      practiceArea="personal-injury"
      subArea="medical-malpractice"
      language="en"
    />
  );
}
