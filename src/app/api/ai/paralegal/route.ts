import { openai } from '@ai-sdk/openai';
import { apiLogger } from '@/lib/pino-logger';
import { streamText } from 'ai';
import { withAIAgentTracing } from '@/lib/telemetry/api-middleware';

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

async function handlePOST(req: Request) {
  try {
    const { messages } = await req.json();

    const result = await streamText({
      model: openai('gpt-4-turbo'),
      system: systemPrompt,
      messages,
      temperature: 0.7,
      maxTokens: 500,
    });

    return result.toDataStreamResponse();
  } catch (error) {
    apiLogger.error('Paralegal API error:', error);
    return new Response('Error processing request', { status: 500 });
  }
}

// Export with telemetry wrapper
export const POST = withAIAgentTracing(handlePOST);
