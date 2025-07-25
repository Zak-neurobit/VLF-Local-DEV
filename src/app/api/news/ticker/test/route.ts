import { NextResponse } from 'next/server';

// Force dynamic rendering
// GET /api/news/ticker/test - Test endpoint to verify ticker API
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    testData: {
      posts: [
        {
          id: 'test-1',
          title: 'News Ticker API is Working',
          titleEs: 'La API del Ticker de Noticias Funciona',
          url: '/test',
          date: new Date().toISOString(),
          category: 'immigration',
          urgent: true,
          excerpt: 'This is a test news item to verify the ticker is working',
        },
      ],
      source: 'test',
      total: 1,
    },
  });
}
