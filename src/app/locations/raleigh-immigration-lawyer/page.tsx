import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';
export const dynamicParams = true;
// This page redirects to the correct URL structure
export default function RaleighImmigrationLawyerRedirect() {
  redirect('/locations/raleigh/immigration-lawyer');
}