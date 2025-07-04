# Chat API Migration Guide

## Overview

The chat API has been migrated from in-memory storage to database persistence using Prisma and PostgreSQL.

## Key Changes

### 1. Database Storage

- Conversations are now stored in the `Conversation` table
- Messages are stored in the `Message` table
- User sessions are properly linked to conversations

### 2. Authentication Integration

- Authenticated users have their conversations linked to their account
- Anonymous users are created automatically with unique identifiers
- Session management is handled through NextAuth

### 3. API Response Changes

- `sessionId` now returns the database conversation ID (not a generated key)
- Added `userId` to the response for tracking purposes
- Error handling includes database persistence of error messages

### 4. New Endpoints

#### GET /api/chat?conversationId={id}

Retrieve conversation history:

```json
{
  "conversation": {
    "id": "string",
    "status": "active|closed|pending",
    "language": "en|es",
    "startedAt": "ISO date",
    "endedAt": "ISO date or null",
    "messages": [
      {
        "id": "string",
        "role": "user|assistant|system",
        "content": "string",
        "createdAt": "ISO date",
        "metadata": {}
      }
    ],
    "user": {
      "id": "string",
      "name": "string or null",
      "email": "string"
    }
  }
}
```

#### DELETE /api/chat

Close a conversation:

```json
// Request
{
  "conversationId": "string"
}

// Response
{
  "success": true,
  "message": "Conversation closed successfully"
}
```

## Client Code Updates

### Before (In-Memory):

```typescript
const response = await fetch('/api/chat', {
  method: 'POST',
  body: JSON.stringify({
    message: 'Hello',
    userId: 'user123',
    language: 'en',
  }),
});
```

### After (Database):

```typescript
// First message (creates new conversation)
const response = await fetch('/api/chat', {
  method: 'POST',
  body: JSON.stringify({
    message: 'Hello',
    language: 'en',
    // userId is optional - will use session or create anonymous
  }),
});

const data = await response.json();
const conversationId = data.sessionId; // Save this for subsequent messages

// Subsequent messages (same conversation)
const response2 = await fetch('/api/chat', {
  method: 'POST',
  body: JSON.stringify({
    message: 'Follow up question',
    sessionId: conversationId, // Use the conversation ID
    language: 'en',
  }),
});
```

## Benefits

1. **Persistence**: Conversations survive server restarts
2. **Analytics**: Track user interactions and conversation metrics
3. **History**: Users can access their previous conversations
4. **Scalability**: No memory limitations for storing conversations
5. **Security**: Proper access control for conversation data

## Migration Steps

1. Ensure database migrations are run: `npx prisma migrate deploy`
2. Update client code to handle the new response format
3. Implement conversation history UI if desired
4. Clean up any local storage of conversation IDs

## Notes

- Anonymous conversations are automatically created for non-authenticated users
- Conversations are limited to the last 20 messages for performance
- System prompts are automatically added to new conversations
- Legal disclaimers are still appended to responses as before
