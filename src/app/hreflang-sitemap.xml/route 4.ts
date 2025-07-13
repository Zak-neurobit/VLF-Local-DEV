import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  // Redirect to the actual hreflang sitemap API route
  return NextResponse.redirect(
    new URL(
      '/api/hreflang-sitemap',
      process.env.NEXT_PUBLIC_APP_URL || 'https://www.vasquezlawnc.com'
    )
  );
}
