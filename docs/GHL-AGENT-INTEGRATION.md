# GoHighLevel & AI Agent Integration Documentation

## Overview

The Vasquez Law Firm website features a powerful integration between GoHighLevel CRM and an army of AI agents powered by CrewAI. This creates an intelligent, automated lead management system that validates, nurtures, and converts leads with minimal human intervention.

## Architecture

### Agent Hierarchy

```
┌─────────────────────────────────────────────────────────────┐
│                    Agent Orchestrator                        │
│                 (Routes & Coordinates)                       │
└─────────────────────────┬───────────────────────────────────┘
                          │
        ┌─────────────────┴─────────────────┐
        │                                   │
┌───────▼─────────┐              ┌─────────▼─────────┐
│ Customer-Facing │              │   Automation      │
│    Agents       │              │    Agents         │
└───────┬─────────┘              └─────────┬─────────┘
        │                                   │
        ├─ Legal Consultation               ├─ Lead Validation
        ├─ Appointment Scheduling           ├─ Follow-Up Automation
        ├─ Document Analysis                ├─ Campaign Management
        ├─ Enhanced Intake                  ├─ Task Automation
        ├─ Removal Defense                  └─ Analytics & Reporting
        ├─ Business Immigration
        ├─ Criminal Defense
        └─ AILA-Trained Removal
```

## AI Agents

### 1. Lead Validation Agent

**Purpose**: Validates and scores incoming leads to ensure quality before entering the sales pipeline.

**Key Features**:

- Scores leads from 0-100 based on 4 factors:
  - **Urgency** (0-25 points): Detects urgent keywords, deadlines, court dates
  - **Case Value** (0-25 points): Identifies high-value practice areas
  - **Readiness** (0-25 points): Assesses decision-making language
  - **Contact Quality** (0-25 points): Validates contact information

**Lead Tiers**:

- **Hot** (75-100): Immediate action required
- **Warm** (50-74): Follow up within 48-72 hours
- **Cold** (25-49): Long-term nurture
- **Invalid** (0-24): Do not contact

**GHL Integration**:

- Creates/updates contacts with validation scores
- Assigns appropriate tags and custom fields
- Routes to pipeline stages based on tier
- Triggers tier-specific campaigns

### 2. Follow-Up Automation Agent

**Purpose**: Creates personalized follow-up sequences based on lead quality and behavior.

**Sequence Types**:

- Hot Lead Sequence (5min SMS → 10min Call → 30min Email → 24hr Task)
- Warm Lead Sequence (1hr Email → 24hr SMS → 3day Campaign)
- Cold Lead Sequence (24hr Email → 1week Newsletter)
- Post-Consultation Sequence
- Client Onboarding Sequence

**Features**:

- Dynamic content personalization
- Multi-channel communication (SMS, Email, Call, Task)
- Stop conditions (appointment booked, became client, opt-out)
- Language preference support (English/Spanish)

### 3. Appointment Scheduling Agent

**GHL Integration**:

- Checks calendar availability in real-time
- Books appointments directly in GHL calendar
- Creates/updates contact records
- Sends confirmation via GHL campaigns
- Assigns to appropriate attorney based on practice area

### 4. Legal Consultation Agent

**Capabilities**:

- Analyzes legal inquiries
- Provides preliminary guidance
- Identifies practice areas
- Assesses case complexity
- Routes to specialized agents when needed

### 5. Document Analysis Agent

**Features**:

- Analyzes uploaded legal documents
- Identifies missing information
- Checks compliance requirements
- Flags urgent items
- Creates document checklists in GHL

### 6. Enhanced Intake Agent

**Process**:

- Collects detailed client information
- Identifies all relevant practice areas
- Assesses urgency level
- Creates comprehensive intake records in GHL
- Triggers appropriate workflows

### 7. Specialized Practice Area Agents

- **Removal Defense Agent**: Expert in deportation defense
- **Business Immigration Agent**: Handles employment-based cases
- **Criminal Defense Agent**: Manages criminal immigration matters
- **AILA-Trained Removal Agent**: Advanced removal proceedings expertise

## GoHighLevel Integration Points

### 1. Contact Management

```typescript
// Create/Update Contact
await ghl.upsertContact({
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@example.com',
  phone: '+17041234567',
  tags: ['hot-lead', 'removal-defense'],
  customFields: {
    lead_score: '85',
    lead_tier: 'hot',
    priority_level: 'urgent',
    practice_areas: 'removal-defense,family-immigration',
    language_preference: 'es',
  },
});
```

### 2. Pipeline Management

```typescript
// Create Opportunity
await ghl.createOpportunity({
  contactId: 'contact_123',
  name: 'John Doe - Removal Defense',
  pipelineId: process.env.GHL_PIPELINE_ID,
  pipelineStageId: 'hot-leads-stage',
  value: 5000,
  status: 'open',
});
```

### 3. Campaign Triggers

```typescript
// Trigger Campaign
await ghl.triggerCampaign({
  contactId: 'contact_123',
  campaignId: process.env.GHL_HOT_LEAD_CAMPAIGN_ID,
});
```

### 4. Task Creation

```typescript
// Create Task
await ghl.createTask({
  contactId: 'contact_123',
  title: 'Urgent: Follow up on removal case',
  description: 'Client facing deportation proceedings',
  dueDate: new Date(),
  assignedTo: process.env.GHL_SENIOR_USER_ID,
  priority: 'high',
});
```

### 5. SMS Messaging

```typescript
// Send SMS
await ghl.sendSMS({
  contactId: 'contact_123',
  message: 'Hi John, this is Vasquez Law. Your case is urgent. Can we talk now?',
});
```

## API Endpoints

### Lead Validation Endpoint

**POST** `/api/agents/lead-validation`

**Request Body**:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+17041234567",
  "message": "I need help with removal proceedings...",
  "source": "website",
  "language": "en",
  "practiceArea": "removal-defense"
}
```

**Response**:

```json
{
  "success": true,
  "validation": {
    "score": 85,
    "tier": "hot",
    "priorityLevel": "urgent",
    "practiceAreas": ["removal-defense"],
    "languagePreference": "en",
    "estimatedCaseValue": 5000,
    "followUpStrategy": "Immediate phone call + SMS + email within 5 minutes",
    "ghlContactId": "contact_123"
  },
  "message": "Lead validated successfully - hot tier"
}
```

### Agent Health Check

**GET** `/api/agents/lead-validation`

**Response**:

```json
{
  "success": true,
  "agents": {
    "lead-validation": "operational",
    "follow-up-automation": "operational"
  },
  "stats": {
    "totalExecutions": 156,
    "successRate": 98.5,
    "averageDuration": 342
  },
  "leadDistribution": [
    { "tier": "hot", "_count": { "tier": 23 } },
    { "tier": "warm", "_count": { "tier": 45 } },
    { "tier": "cold", "_count": { "tier": 67 } }
  ]
}
```

## Environment Variables

```bash
# GoHighLevel Configuration
GHL_API_KEY=your-api-key
GHL_LOCATION_ID=your-location-id
GHL_API_URL=https://rest.gohighlevel.com/v1
GHL_PIPELINE_ID=main-sales-pipeline-id
GHL_HOT_LEAD_CAMPAIGN_ID=hot-lead-nurture-campaign
GHL_WARM_LEAD_CAMPAIGN_ID=warm-lead-education-campaign
GHL_SENIOR_USER_ID=senior-attorney-user-id
GHL_DEFAULT_USER_ID=default-team-member-id
GHL_CALENDAR_ID=consultation-calendar-id
GHL_NEW_LEADS_STAGE_ID=new-leads-stage-id
```

## Database Schema

### LeadValidation Table

- Stores all lead validation results
- Tracks scoring history
- Analytics and reporting

### FollowUpSequence Table

- Manages active follow-up sequences
- Tracks step completion
- Stores personalization data

### AgentExecutionLog Table

- Logs all agent executions
- Performance metrics
- Error tracking

## Best Practices

### 1. Lead Quality Management

- Always validate leads before adding to pipeline
- Use appropriate tier-based follow-up strategies
- Monitor conversion rates by tier

### 2. Campaign Management

- Create separate campaigns for each lead tier
- Use dynamic content based on practice area
- Implement A/B testing for messages

### 3. Agent Coordination

- Use Agent Orchestrator for complex workflows
- Implement proper error handling
- Log all agent interactions

### 4. GHL API Usage

- Cache contact lookups when possible
- Batch operations where available
- Implement retry logic for failed requests

### 5. Monitoring & Analytics

- Track agent performance metrics
- Monitor lead conversion by source
- Analyze follow-up sequence effectiveness

## Deployment Checklist

1. **Environment Variables**

   - [ ] All GHL API credentials configured
   - [ ] Campaign IDs set correctly
   - [ ] Pipeline and stage IDs verified

2. **Database**

   - [ ] Run Prisma migrations
   - [ ] Verify indexes are created
   - [ ] Test database connectivity

3. **Redis**

   - [ ] Redis configured or MOCK_REDIS=true
   - [ ] Cache keys properly namespaced
   - [ ] TTLs set appropriately

4. **Agent Testing**

   - [ ] Test lead validation with various scores
   - [ ] Verify GHL contact creation
   - [ ] Test follow-up sequence triggers
   - [ ] Confirm campaign activations

5. **Monitoring**
   - [ ] Error logging configured
   - [ ] Performance metrics tracked
   - [ ] Health check endpoint verified

## Future Enhancements

1. **Additional Agents**

   - Document Generation Agent
   - Case Strategy Agent
   - Compliance Monitoring Agent
   - Client Communication Agent

2. **Advanced Features**

   - Multi-agent collaboration workflows
   - Machine learning for lead scoring
   - Predictive analytics for case outcomes
   - Voice-to-text integration for calls

3. **Integration Expansions**
   - Zapier webhooks
   - Slack notifications
   - Email parsing
   - Calendar optimization

This integration creates a powerful, AI-driven lead management system that ensures no opportunity is missed while maintaining high-quality client interactions.
