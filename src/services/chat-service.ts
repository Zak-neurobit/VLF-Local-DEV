import { ChatMessage } from '@/types/chat';

interface SendMessageParams {
  message: string;
  language: string;
  sessionId: string;
  contactId?: string;
}

interface ChatResponse {
  message: string;
  type?: 'text' | 'document' | 'voice' | 'appointment';
  metadata?: any;
}

export async function sendChatMessage(params: SendMessageParams): Promise<ChatResponse> {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: params.message,
        language: params.language,
        sessionId: params.sessionId,
        contactId: params.contactId,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to send message');
    }

    const data = await response.json();
    return {
      message: data.response || data.message,
      type: data.type || 'text',
      metadata: data.metadata,
    };
  } catch (error) {
    console.error('Chat service error:', error instanceof Error ? error.message : String(error));
    throw error;
  }
}
