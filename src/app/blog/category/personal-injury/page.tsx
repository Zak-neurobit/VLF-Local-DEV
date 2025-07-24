import CategoryPageClient from '../CategoryPageClient';

export const dynamic = 'force-dynamic';
export const dynamicParams = true;
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Personal Injury Blog - Vasquez Law Firm, PLLC',
  description: 'Legal insights on personal injury cases, car accidents, slip and fall, medical malpractice, and injury claims from experienced attorneys.',
  keywords: 'personal injury, car accident lawyer, slip and fall, medical malpractice, injury attorney, personal injury blog',
};

export const runtime = 'nodejs';

export default function PersonalInjuryCategoryPage() {
  return <CategoryPageClient category="personal-injury" language="en" />;
}
