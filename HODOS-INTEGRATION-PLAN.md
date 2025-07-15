# HODOS + VLF Website Integration Plan

## Overview

HODOS is an AI-powered legal practice management system with multi-agent AI orchestration, while the VLF Website is the client-facing website with AI features. Here's how to integrate them:

## Key Integration Points

### 1. Shared Backend Services

- **HODOS**: Full legal practice management (cases, clients, documents, workflows)
- **VLF Website**: Public-facing site with lead capture and client portal

### 2. AI Agent Integration

- HODOS has a sophisticated multi-agent system (Lewis, Grace, Marcus, etc.)
- VLF Website has chatbot and voice agents
- **Integration**: VLF agents can delegate complex tasks to HODOS agents

### 3. Database Architecture

- **VLF Website**: PostgreSQL with Prisma ORM
- **HODOS**: MongoDB with Mongoose
- **Solution**: API-based integration or shared data layer

### 4. Authentication & Authorization

- Both systems need unified authentication
- Single sign-on (SSO) for clients and staff
- JWT tokens shared between systems

## Implementation Steps

### Phase 1: Development Environment Setup

1. **Create Workspace Configuration**

```json
{
  "folders": [
    { "path": "vasquez-law-website", "name": "VLF Website" },
    { "path": "../HODOS/HODOS", "name": "HODOS Platform" }
  ]
}
```

2. **Environment Variables**

```env
# VLF Website .env additions
HODOS_API_URL=http://localhost:3001
HODOS_API_KEY=your-api-key
HODOS_WEBSOCKET_URL=ws://localhost:3001

# HODOS .env additions
VLF_WEBSITE_URL=http://localhost:3000
VLF_API_KEY=your-api-key
```

### Phase 2: API Integration Layer

1. **Create HODOS Client in VLF Website**

```typescript
// src/lib/hodos/client.ts
export class HODOSClient {
  async createCase(data: CaseData) {}
  async getClient(id: string) {}
  async executeWorkflow(workflowId: string) {}
  async requestAgentAssistance(task: AgentTask) {}
}
```

2. **Add HODOS Routes to VLF API**

```typescript
// src/app/api/hodos/[...path]/route.ts
// Proxy selected HODOS endpoints
```

### Phase 3: Feature Integration

#### A. Case Management

- VLF Website creates leads → HODOS converts to cases
- Client portal shows case status from HODOS
- Documents uploaded in VLF → stored in HODOS

#### B. AI Agent Collaboration

```typescript
// VLF Chatbot delegates to HODOS agents
if (complexLegalQuestion) {
  const hodosResponse = await hodosClient.requestAgentAssistance({
    agent: 'Marcus', // Legal expertise agent
    task: userQuestion,
    context: conversationHistory,
  });
}
```

#### C. Scheduling Integration

- VLF appointment requests → HODOS scheduling system
- HODOS calendar availability → VLF booking widget

#### D. Document Generation

- VLF collects client info → HODOS generates legal documents
- HODOS templates → available in VLF client portal

### Phase 4: Data Synchronization

1. **Client Data Sync**

```typescript
// Webhook from VLF to HODOS on new client
POST /api/webhooks/new-client
{
  source: 'vlf-website',
  client: { ... }
}
```

2. **Case Status Updates**

```typescript
// Real-time updates via WebSocket
socket.on('case-update', data => {
  // Update client portal in real-time
});
```

### Phase 5: Unified Authentication

1. **Shared JWT Secret**
2. **User roles mapping**:

   - VLF roles: client, admin
   - HODOS roles: client, attorney, paralegal, admin

3. **SSO Implementation**:
   - Login on either platform → valid on both
   - Shared session management

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                         Internet                              │
└─────────────────┬───────────────────┬───────────────────────┘
                  │                   │
        ┌─────────▼──────────┐ ┌─────▼─────────────┐
        │   VLF Website      │ │  HODOS Portal     │
        │  (Public Face)     │ │ (Staff/Clients)   │
        │   Port: 3000       │ │   Port: 3001      │
        └─────────┬──────────┘ └─────┬─────────────┘
                  │                   │
        ┌─────────▼───────────────────▼─────────────┐
        │          API Gateway (Optional)           │
        └─────────┬───────────────────┬─────────────┘
                  │                   │
        ┌─────────▼──────────┐ ┌─────▼─────────────┐
        │  PostgreSQL (VLF)  │ │  MongoDB (HODOS)  │
        └────────────────────┘ └───────────────────┘
```

## Development Workflow

### Running Both Projects

```bash
# Terminal 1: VLF Website
cd vasquez-law-website
npm run dev

# Terminal 2: HODOS
cd ../HODOS/HODOS
npm run dev

# Terminal 3: Shared services (Redis, etc.)
docker-compose up -d
```

### Testing Integration

1. **Unit Tests**: Mock HODOS API in VLF tests
2. **Integration Tests**: Run both systems in Docker
3. **E2E Tests**: Test complete user flows

## Security Considerations

1. **API Key Management**: Rotate keys regularly
2. **CORS Configuration**: Whitelist domains
3. **Rate Limiting**: Prevent abuse
4. **Data Encryption**: TLS for all communication
5. **Audit Logging**: Track cross-system interactions

## Monitoring & Observability

1. **Shared Logging**: Centralized log aggregation
2. **Distributed Tracing**: Track requests across systems
3. **Health Checks**: Monitor both systems
4. **Metrics**: Unified dashboard in Grafana

## Deployment Strategy

### Option 1: Microservices

- Deploy separately
- API Gateway for routing
- Independent scaling

### Option 2: Monorepo

- Shared deployment pipeline
- Easier dependency management
- Consistent versioning

### Option 3: Hybrid

- Shared infrastructure
- Separate applications
- Common services layer

## Next Steps

1. Set up development environment
2. Create API integration endpoints
3. Implement authentication bridge
4. Build first integrated feature
5. Test end-to-end flow
6. Document API contracts
