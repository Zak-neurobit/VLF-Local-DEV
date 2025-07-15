# AI Chatbot Setup Guide

## Overview

The Vasquez Law Firm website now includes an AI-powered chatbot that provides:

- 24/7 legal information assistance
- Multilingual support (English/Spanish)
- Conversation memory and context
- Pre-defined questions for common legal queries
- Integration with appointment scheduling
- Proper legal disclaimers

## Setup Instructions

### 1. Configure OpenAI API Key

Add your OpenAI API key to `.env.local`:

```bash
# Copy from .env.example if needed
OPENAI_API_KEY=sk-your-openai-api-key-here
```

Get your API key from: https://platform.openai.com/api-keys

### 2. Features Implemented

#### Chat API Route (`/api/chat`)

- Handles chat messages with conversation history
- Supports English and Spanish
- Includes legal disclaimers automatically
- Falls back gracefully when API key is not configured
- Memory management for conversation history

#### Virtual Assistant Component

- Enhanced with chat interface (default mode)
- Retains voice, consultation, appointment, and document modes
- Located at: `src/components/VirtualAssistant/`

#### Chat Widget

- Floating chat button on all pages
- Minimizable chat window
- Pre-defined question suggestions
- Quick actions (call, schedule appointment, language switch)
- Located at: `src/components/ChatWidget.tsx`

#### Chat Interface

- Real-time messaging with typing indicators
- Message history with timestamps
- User and assistant message bubbles
- Loading states and error handling
- Located at: `src/components/VirtualAssistant/ChatInterface.tsx`

## Usage

### For Users

1. Click the chat bubble in the bottom-right corner
2. Type questions or select from pre-defined options
3. Switch between English/Spanish as needed
4. Schedule appointments or call directly from the chat

### For Developers

#### Customizing System Prompts

Edit the `SYSTEM_PROMPTS` object in `/api/chat/route.ts` to modify the AI's behavior and knowledge base.

#### Adding Pre-defined Questions

Update the `PREDEFINED_QUESTIONS` object in `ChatInterface.tsx` to add or modify quick question options.

#### Adjusting Common Responses

Modify the `COMMON_RESPONSES` object in `/api/chat/route.ts` for frequently asked questions.

## Architecture

```
┌─────────────────┐     ┌──────────────┐     ┌─────────────┐
│   ChatWidget    │────▶│ ChatInterface│────▶│  /api/chat  │
│ (Floating UI)   │     │  (Messages)  │     │  (OpenAI)   │
└─────────────────┘     └──────────────┘     └─────────────┘
                               │
                               ▼
                     ┌─────────────────────┐
                     │ VirtualAssistant    │
                     │ (Multi-mode panel)  │
                     └─────────────────────┘
```

## Monitoring and Maintenance

### Check API Health

```bash
curl http://localhost:3000/api/chat
```

### View Logs

The chat API logs errors to the console. Monitor server logs for:

- API key configuration issues
- OpenAI API errors
- Rate limiting issues

### Memory Management

- Conversations are stored in memory during runtime
- Limited to 20 messages per conversation
- Maximum 100 concurrent conversations
- Automatically cleans up old sessions

## Troubleshooting

### Chat not responding

1. Check if `OPENAI_API_KEY` is set in `.env.local`
2. Verify API key is valid and has credits
3. Check browser console for errors
4. Ensure the API route is accessible

### Language not switching

- The language parameter is passed through URL params (`?lang=es`)
- Check that the ChatWidget is reading the parameter correctly

### Pre-defined questions not showing

- They only appear after the welcome message
- Hidden after the first user message
- Can be re-enabled by modifying `showPredefinedQuestions` state

## Future Enhancements

1. **Persistent Storage**: Move conversation history to Redis/database
2. **Analytics**: Track common questions and user satisfaction
3. **Voice Integration**: Connect chat responses to voice synthesis
4. **Advanced Context**: Integrate with case management system
5. **Claude API**: Add support for Anthropic's Claude as alternative
6. **Fine-tuning**: Create custom model trained on legal FAQs

## Security Considerations

- Never expose API keys in client-side code
- All API keys should be in server-side environment variables
- Legal disclaimers are automatically added to responses
- No attorney-client privilege is created through chat
- User data is not permanently stored (only in memory)

## Cost Management

- Using GPT-3.5-turbo for cost efficiency
- Limited to 500 tokens per response
- Consider implementing rate limiting for production
- Monitor OpenAI usage dashboard regularly

## Support

For issues or questions about the chatbot implementation:

1. Check this documentation
2. Review the code comments in the implemented files
3. Check OpenAI API status: https://status.openai.com/
4. Contact the development team
