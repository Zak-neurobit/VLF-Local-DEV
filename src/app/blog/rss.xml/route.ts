import { NextResponse } from 'next/server';

export const dynamic = 'force-static';

export async function GET() {
  // Redirect to the actual RSS API route
  return NextResponse.redirect(
    new URL('/api/blog/rss', process.env.NEXT_PUBLIC_APP_URL || 'https://www.vasquezlawnc.com')
  );
}
