import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      // Return a valid but empty session response
      return NextResponse.json({
        user: null,
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
      });
    }
    
    return NextResponse.json(session);
  } catch (error) {
    console.error('Session endpoint error:', error);
    
    // Return a valid session structure even on error
    return NextResponse.json({
      user: null,
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      error: 'Session unavailable'
    }, { status: 200 }); // Return 200 to prevent client errors
  }
}