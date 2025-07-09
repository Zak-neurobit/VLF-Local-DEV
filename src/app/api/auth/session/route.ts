import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { NextResponse } from 'next/server';
import { isDatabaseConnected } from '@/lib/prisma';

export async function GET() {
  try {
    // Check database connection status
    const dbConnected = await isDatabaseConnected();
    
    if (!dbConnected) {
      console.warn('[Session] Database not connected, returning empty session');
      // Return empty session when database is unavailable
      return NextResponse.json({
        user: null,
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
      });
    }
    
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
    console.error('[Session] Endpoint error:', error);
    
    // Check if it's a database connection error
    if (error instanceof Error && 
        (error.message.includes('connect') || 
         error.message.includes('ECONNREFUSED') || 
         error.message.includes('DATABASE_URL'))) {
      console.warn('[Session] Database connection error, returning empty session');
    }
    
    // Return a valid session structure even on error
    return NextResponse.json({
      user: null,
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
    }, { status: 200 }); // Return 200 to prevent client errors
  }
}