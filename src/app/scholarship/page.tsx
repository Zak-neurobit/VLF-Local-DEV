import { Metadata } from 'next';
import ScholarshipPageClient from './ScholarshipPageClient';

export const metadata: Metadata = {
  title: 'Scholarship Program | Vasquez Law Firm',
  description: 'Apply for the Vasquez Law Firm Scholarship Program. Supporting future leaders in our community.',
  keywords: 'scholarship, legal scholarship, Vasquez Law Firm scholarship, student support',
};

export default function ScholarshipPage() {
  return <ScholarshipPageClient />;
}