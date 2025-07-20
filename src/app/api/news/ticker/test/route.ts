import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    message: 'News ticker API is working',
    timestamp: new Date().toISOString(),
    testData: {
      posts: [
        {
          id: 'test-1',
          title: 'Test News Item - Immigration Update',
          titleEs: 'Artículo de Prueba - Actualización de Inmigración',
          url: '/test',
          date: new Date().toISOString(),
          category: 'immigration',
          urgent: true,
          excerpt: 'This is a test news item',
        },
      ],
      source: 'test',
      total: 1,
    },
  });
}
