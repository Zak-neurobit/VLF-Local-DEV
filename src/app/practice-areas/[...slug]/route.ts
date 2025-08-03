// Force dynamic rendering for practice area pages
export const dynamic = 'force-dynamic';
export const revalidate = 3600; // 1 hour

// Redirect to home for now until we implement dynamic routes
import { redirect } from 'next/navigation';

export async function GET() {
  redirect('/');
}
