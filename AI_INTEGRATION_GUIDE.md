# AI Integration Guide - Vasquez Law Firm

## Overview

This document outlines the enhanced AI integration system for the Vasquez Law Firm website, providing intelligent chat capabilities, translation services, and agent orchestration for real-time client communication.

## 🚀 Key Components

### 1. Enhanced Chat Service (`/src/lib/ai/enhanced-chat-service.ts`)

**Purpose**: Provides intelligent message processing with AI-powered responses, intent analysis, and escalation handling.

**Features**:

- OpenAI GPT-3.5-turbo integration with legal-specific prompts
- Circuit breaker pattern for resilience
- Intent analysis and entity extraction
- Context-aware responses
- Automatic escalation detection
- Follow-up action scheduling
- Conversation context management

**Usage**:

```typescript
import { enhancedChatService } from '@/lib/ai/enhanced-chat-service';

const response = await enhancedChatService.processMessage(message, context);
```

### 2. AI Translation Service (`/src/lib/ai/translation-service.ts`)

**Purpose**: Provides intelligent translation between English and Spanish with legal context awareness.

**Features**:

- Static translation lookup for common phrases
- AI-powered translation for dynamic content
- Legal domain specialization
- Language detection
- Translation caching
- Fallback to basic translations

**Usage**:

```typescript
import { aiTranslationService } from '@/lib/ai/translation-service';

const translation = await aiTranslationService.translateText(text, 'es');
const language = await aiTranslationService.detectLanguage(text);
```

### 3. Agent Orchestrator (`/src/lib/agents/agent-orchestrator.ts`)

**Purpose**: Routes messages to specialized legal AI agents based on intent and context.

**Features**:

- Intent-based routing to specialized agents
- Agent performance monitoring
- Inter-agent communication
- Memory management
- Parallel processing capabilities
- Health monitoring

**Available Agents**:

- Legal Consultation Agent
- Appointment Scheduling Agent
- Document Analysis Agent
- Enhanced Intake Agent
- Removal Defense Agent
- Business Immigration Agent
- Criminal Defense Agent
- Lead Validation Agent
- Follow-up Automation Agent

### 4. Socket Server Integration (`/src/lib/socket/server.ts`)

**Purpose**: Enhanced real-time chat with AI integration for instant legal assistance.

**Enhanced Features**:

- AI-powered message processing
- Automatic language detection
- Conversation history management
- Performance metrics tracking
- AI health monitoring
- Circuit breaker protection
- Escalation handling

## 🔧 Configuration

### Environment Variables

```bash
# Required for AI functionality
OPENAI_API_KEY=your_openai_api_key_here

# Optional - for enhanced features
ANTHROPIC_API_KEY=your_anthropic_key_here
```

### Circuit Breaker Settings

The system includes circuit breakers to handle service failures gracefully:

- **AI Service Circuit Breaker**:

  - Threshold: 3 failures
  - Reset time: 60 seconds
  - Fallback: Basic keyword responses

- **Database Circuit Breaker**:
  - Threshold: 5 failures
  - Reset time: 60 seconds
  - Fallback: In-memory caching

## 📊 Monitoring and Health Checks

### Health Check Endpoint

**GET** `/api/ai/health`

Query Parameters:

- `detailed=true` - Include detailed service information
- `diagnostics=true` - Run diagnostic tests

Response:

```json
{
  "status": "healthy|degraded|unhealthy",
  "timestamp": "2024-01-20T10:00:00Z",
  "uptime": 3600000,
  "services": {
    "enhancedChat": {
      "available": true,
      "openai": true,
      "orchestrator": true,
      "circuitBreaker": true
    },
    "translation": {
      "available": true,
      "aiAvailable": true,
      "staticTranslations": true,
      "cacheSize": 150
    },
    "agentOrchestrator": {
      "available": true,
      "agentCount": 9,
      "metrics": {...}
    }
  }
}
```

### Test Endpoint

**POST** `/api/ai/health/test`

Body:

```json
{
  "message": "Hello, I need help with immigration",
  "language": "en",
  "testType": "all|chat|translation|agents"
}
```

## 🎯 Usage Examples

### Basic Chat Integration

```typescript
// In your React component
import { useSocket } from '@/hooks/useSocket';

const ChatComponent = () => {
  const { socket, sendMessage, messages } = useSocket();

  const handleSendMessage = async (message: string) => {
    // Message will be processed by enhanced AI system
    await sendMessage(message);
  };

  return (
    <div>
      {messages.map(msg => (
        <div key={msg.id}>
          <strong>{msg.sender}:</strong> {msg.content}
          {msg.metadata?.suggestions && (
            <div>
              {msg.metadata.suggestions.map(suggestion => (
                <button onClick={() => handleSendMessage(suggestion)}>
                  {suggestion}
                </button>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
```

### Custom Agent Integration

```typescript
import { AgentOrchestrator } from '@/lib/agents/agent-orchestrator';

const orchestrator = AgentOrchestrator.getInstance();

// Route a message to the appropriate agent
const response = await orchestrator.routeMessage('I need help with my deportation case', {
  userId: 'user123',
  sessionId: 'session456',
  language: 'en',
  history: [],
  metadata: { urgencyLevel: 'high' },
});
```

### Translation Service Usage

```typescript
import { aiTranslationService } from '@/lib/ai/translation-service';

// Translate legal disclaimer
const disclaimer = await aiTranslationService.translateLegalDisclaimer(
  'This is not legal advice',
  'es'
);

// Translate chat message
const response = await aiTranslationService.translateChatMessage(
  'Hello, how can I help you?',
  'es',
  false // isUserMessage
);
```

## 🔒 Security and Compliance

### Data Handling

1. **Conversation Data**: Stored temporarily in memory, not persisted to database
2. **AI Requests**: Sanitized and validated before processing
3. **User Information**: PII detection and masking
4. **Legal Disclaimers**: Automatically added to AI responses

### Rate Limiting

- **Per User**: 60 messages per minute
- **Per IP**: 100 messages per minute
- **AI Processing**: Circuit breaker protection

### Error Handling

- Graceful degradation when AI services are unavailable
- Fallback to rule-based responses
- Automatic escalation for critical failures
- Comprehensive logging for debugging

## 📈 Performance Optimization

### Caching Strategy

1. **Translation Cache**: 1-hour TTL for translated content
2. **Agent Response Cache**: 5-minute TTL for similar queries
3. **Static Translations**: In-memory lookup for common phrases

### Response Time Targets

- **Basic Responses**: < 100ms
- **AI Processing**: < 2000ms
- **Translation**: < 500ms
- **Agent Routing**: < 1000ms

## 🧪 Testing

### Running Tests

```bash
# Test AI integration
npm run test:ai-integration

# Or manually
npx ts-node src/scripts/test-ai-integration.ts
```

### Test Coverage

- ✅ Enhanced Chat Service
- ✅ Translation Service
- ✅ Agent Orchestrator
- ✅ Health Check System
- ✅ End-to-End Flow

## 🚨 Troubleshooting

### Common Issues

1. **AI Service Unavailable**

   - Check OpenAI API key configuration
   - Verify network connectivity
   - Check circuit breaker status

2. **Poor Response Quality**

   - Review system prompts
   - Check conversation context
   - Verify intent analysis

3. **Translation Errors**
   - Check language detection
   - Verify static translations
   - Review AI translation context

### Debugging

Enable debug logging:

```bash
DEBUG=ai-chat,ai-translation,agent-orchestrator npm run dev
```

Check health status:

```bash
curl http://localhost:3000/api/ai/health?detailed=true&diagnostics=true
```

## 🔮 Future Enhancements

### Planned Features

1. **Advanced NLP**: Emotion detection and sentiment analysis
2. **Multi-modal Support**: Document upload and analysis
3. **Voice Integration**: Real-time voice-to-text processing
4. **Analytics Dashboard**: AI performance and usage metrics
5. **A/B Testing**: Response optimization and personalization

### Scalability Considerations

1. **Horizontal Scaling**: Load balancing across multiple instances
2. **Caching Layer**: Redis for distributed caching
3. **Queue System**: Background processing for complex requests
4. **Database Optimization**: Conversation data archival strategy

## 📞 Support

For issues or questions regarding the AI integration:

1. Check health endpoints for service status
2. Review logs for error details
3. Run diagnostic tests
4. Contact development team with specific error messages

---

**Note**: This AI integration system is designed to enhance client communication while maintaining legal compliance and data security. Always ensure proper disclaimers are included in AI-generated responses.
