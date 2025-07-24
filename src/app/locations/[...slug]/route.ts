import { NextRequest, NextResponse } from 'next/server';

// Route handler to prevent static generation
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string[] } }
) {
  // This forces Next.js to treat this as an API route, not a page
  // preventing static generation at build time
  
  return NextResponse.json({
    message: 'This route uses dynamic rendering',
    path: params.slug.join('/'),
  });
}