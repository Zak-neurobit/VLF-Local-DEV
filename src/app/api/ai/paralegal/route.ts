// Edge runtime route - no Node.js-specific modules allowed
import { NextRequest, NextResponse } from 'next/server';

// Explicitly declare edge runtime
export const runtime = 'edge';

const systemPrompt = `You are a professional virtual paralegal assistant for Vasquez Law Firm. 
You help potential clients understand their legal options and guide them to the right resources.

Key Information:
- Vasquez Law Firm specializes in Immigration, Personal Injury, Criminal Defense, and Workers' Compensation
- Founded by William Vasquez, a U.S. Air Force veteran
- "YO PELEO POR TI™" (I Fight For You) is our motto
- 4 office locations: Raleigh, Charlotte, Winston-Salem, and Orlando
- 60+ years of experience, 10,000+ cases won
- Bilingual services (English/Spanish)
- Free consultations available
- 24/7 availability for emergencies

Guidelines:
1. Be professional, empathetic, and helpful
2. Provide general legal information, not specific legal advice
3. Always recommend scheduling a free consultation for specific cases
4. If emergency (detained, court tomorrow, etc.), emphasize calling immediately: (855) 929-6299
5. Respond in the same language as the user (English or Spanish)
6. Be concise but thorough
7. Show understanding of their situation`;

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const { messages } = await req.json();

    // Dynamic import to ensure edge compatibility
    const { openai } = await import('@ai-sdk/openai');
    const { streamText } = await import('ai');

    const result = await streamText({
      model: openai('gpt-4-turbo'),
      system: systemPrompt,
      messages,
      temperature: 0.7,
      maxTokens: 500,
    });

    // Convert the stream response to NextResponse
    const response = result.toDataStreamResponse();
    return new NextResponse(response.body, {
      headers: response.headers,
      status: response.status,
    });
  } catch (error) {
    // Use console.error for edge runtime compatibility
    console.error('Paralegal API error:', error);

    // Return a proper error response
    return NextResponse.json({ error: 'Error processing request' }, { status: 500 });
  }
}
