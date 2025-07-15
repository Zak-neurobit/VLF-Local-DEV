# CrewAI & GoHighLevel Integration Implementation Guide

## 🎯 Overview

This guide provides step-by-step instructions for implementing the complete CrewAI and GoHighLevel integration for Vasquez Law Firm. The integration provides automated lead management, voice agents, SMS marketing, and appointment scheduling.

## 📋 Prerequisites

- Node.js 18+ installed
- PostgreSQL database setup
- GoHighLevel account with API access
- Retell AI account
- OpenAI API key
- Domain with SSL certificate (for webhooks)

## 🚀 Phase 1: Environment Setup

### Step 1: Configure Environment Variables

1. Copy the environment template:

   ```bash
   cp .env.example .env.local
   ```

2. Fill in the required values in `.env.local`:

#### Core Configuration

```bash
# Application
NEXT_PUBLIC_APP_URL=https://www.vasquezlawnc.com
DATABASE_URL=postgresql://username:password@localhost:5432/vlf_db
NEXTAUTH_SECRET=your-generated-secret  # Generate with: openssl rand -base64 32

# OpenAI (for CrewAI agents)
OPENAI_API_KEY=sk-your-openai-api-key
OPENAI_MODEL=gpt-4
```

#### GoHighLevel Configuration

```bash
# Core GHL Settings
GHL_API_KEY=your-ghl-api-key
GHL_LOCATION_ID=your-ghl-location-id
GHL_WEBHOOK_SECRET=your-generated-secret  # Generate with: openssl rand -base64 32

# Phone Configuration
GHL_OUTBOUND_PHONE_NUMBER=+18449673536
GHL_SMS_PHONE_NUMBER=+18449673536
```

#### Retell AI Configuration

```bash
# Core Retell Settings
RETELL_API_KEY=2996bc9f-ca4e-422a-b64e-a09a3eaa9bc0
RETELL_WEBHOOK_SECRET=2996bc9f-ca4e-422a-b64e-a09a3eaa9bc0
```

#### CrewAI Configuration

```bash
# Core CrewAI Settings
CREWAI_LOG_LEVEL=INFO
CREWAI_MAX_ITERATIONS=10
CREWAI_TASK_TIMEOUT=300
CREWAI_MEMORY_ENABLED=true

# Agent Enablement (set to true/false as needed)
CREWAI_LEAD_SCORER_ENABLED=true
CREWAI_AUTO_RESPONDER_ENABLED=true
CREWAI_APPOINTMENT_SCHEDULER_ENABLED=true
CREWAI_INTAKE_SPECIALIST_ENABLED=true
```

### Step 2: Database Setup

1. Create PostgreSQL database:

   ```bash
   createdb vlf_database
   ```

2. Run database migrations:

   ```bash
   npm run db:migrate
   ```

3. Seed initial data:
   ```bash
   npm run db:seed
   ```

## 🔗 Phase 2: GoHighLevel Configuration

### Step 1: Obtain API Credentials

1. **Get API Key:**

   - Log into GoHighLevel
   - Go to Settings → API & Webhooks
   - Generate/copy your API key
   - Set as `GHL_API_KEY` in your `.env.local`

2. **Get Location ID:**
   - Go to Settings → Company
   - Copy your Location ID
   - Set as `GHL_LOCATION_ID` in your `.env.local`

### Step 2: Create Campaigns

Run the webhook configuration script to see required campaign IDs:

```bash
npm run configure-ghl-webhooks
```

Create these campaigns in GoHighLevel → Marketing → Campaigns:

#### Core Notification Campaigns

1. **Appointment Reminder Campaign**

   - Name: "Appointment Reminders"
   - Copy campaign ID to `GHL_APPOINTMENT_REMINDER_CAMPAIGN_ID`

2. **Welcome Campaign**

   - Name: "New Contact Welcome"
   - Copy campaign ID to `GHL_WELCOME_CAMPAIGN_ID`

3. **Auto Response Campaign**
   - Name: "Immediate Auto Response"
   - Copy campaign ID to `GHL_AUTO_RESPONSE_CAMPAIGN_ID`

#### Practice Area Campaigns (Create for each)

1. **Immigration (English)**

   - Name: "Immigration Nurture - English"
   - Copy ID to `GHL_IMMIGRATION_NURTURE_EN`

2. **Immigration (Spanish)**

   - Name: "Immigration Nurture - Spanish"
   - Copy ID to `GHL_IMMIGRATION_NURTURE_ES`

3. **Personal Injury (English)**

   - Name: "Personal Injury Nurture - English"
   - Copy ID to `GHL_PERSONAL_INJURY_NURTURE_EN`

4. **Personal Injury (Spanish)**
   - Name: "Personal Injury Nurture - Spanish"
   - Copy ID to `GHL_PERSONAL_INJURY_NURTURE_ES`

_Repeat for all practice areas listed in the `.env.example`_

### Step 3: Configure Pipelines

1. **Create Lead Pipeline:**

   - Go to Opportunities → Pipelines
   - Create "Lead Management Pipeline"
   - Copy pipeline ID to `GHL_LEAD_PIPELINE_ID`

2. **Create Pipeline Stages:**
   - Add stage "New Lead"
   - Copy stage ID to `GHL_NEW_LEAD_STAGE_ID`

### Step 4: Set Up Webhooks

1. **Go to GoHighLevel → Settings → Webhooks**

2. **Create webhooks for these events:**

   - **URL:** `https://www.vasquezlawnc.com/api/webhooks/ghl`
   - **Events to subscribe to:**
     - ContactCreate
     - ContactUpdate
     - InboundMessage
     - OutboundMessage
     - CampaignCompleted
     - OpportunityCreate
     - OpportunityUpdate
     - AppointmentCreate
     - AppointmentUpdate

3. **Set webhook secret:**
   - Use the value from `GHL_WEBHOOK_SECRET` in your env file

## 🎙️ Phase 3: Retell AI Configuration

### Step 1: Create Voice Agents

1. **Log into Retell Dashboard:** https://dashboard.retellai.com

2. **Create these agents:**

#### English Intake Agent

- **Name:** "English Intake Specialist"
- **Voice:** Professional, warm female voice
- **Prompt:**

  ```
  You are Maria, a bilingual intake specialist at Vasquez Law Firm. You help potential clients understand their legal options and gather initial case information. You are empathetic, professional, and knowledgeable about immigration, personal injury, criminal defense, family law, workers compensation, and traffic law.

  Your goals:
  1. Make callers feel heard and understood
  2. Gather essential case information
  3. Determine urgency and practice area
  4. Schedule consultations when appropriate
  5. Provide basic information about our services

  Always be warm, professional, and helpful. If you don't know something, offer to have an attorney call them back.
  ```

- Copy agent ID to `RETELL_AGENT_ENGLISH_INTAKE`

#### Spanish Intake Agent

- **Name:** "Spanish Intake Specialist"
- **Voice:** Professional, warm female voice (Spanish)
- **Prompt:**

  ```
  Eres María, una especialista bilingüe de admisión en Vasquez Law Firm. Ayudas a clientes potenciales a entender sus opciones legales y recopilas información inicial del caso. Eres empática, profesional y conocedora de inmigración, lesiones personales, defensa criminal, derecho familiar, compensación laboral y derecho de tránsito.

  Tus objetivos:
  1. Hacer que las personas se sientan escuchadas y comprendidas
  2. Recopilar información esencial del caso
  3. Determinar urgencia y área de práctica
  4. Programar consultas cuando sea apropiado
  5. Proporcionar información básica sobre nuestros servicios

  Siempre sé cálida, profesional y útil. Si no sabes algo, ofrece que un abogado les devuelva la llamada.
  ```

- Copy agent ID to `RETELL_AGENT_SPANISH_INTAKE`

#### Appointment Scheduler Agent

- **Name:** "Appointment Scheduler"
- **Voice:** Professional, efficient
- **Prompt:**

  ```
  You are the appointment scheduler for Vasquez Law Firm. Your role is to efficiently schedule consultations and appointments while being helpful and accommodating.

  Your capabilities:
  1. Check attorney availability
  2. Schedule appointments
  3. Reschedule existing appointments
  4. Provide office location and directions
  5. Explain what to bring to consultations

  Always confirm appointment details and send confirmation messages.
  ```

- Copy agent ID to `RETELL_AGENT_APPOINTMENT_SCHEDULER`

_Create similar agents for other specialties as needed_

### Step 2: Configure Webhooks

1. **In Retell Dashboard → Webhooks:**

   - **Webhook URL:** `https://www.vasquezlawnc.com/api/webhooks/retell`
   - **Events:** All call events (call_started, call_ended, transcript_ready, etc.)

2. **Set webhook secret:**
   - Use value from `RETELL_WEBHOOK_SECRET`

## 🤖 Phase 4: CrewAI Agent Setup

### Step 1: Configure Agents

1. **Run the agent setup script:**

   ```bash
   npm run setup:crewai-agents
   ```

2. **Review agent configuration:**
   - The script will show which agents are enabled
   - Adjust agent settings in `.env.local` as needed

### Step 2: Test Individual Agents

```bash
# Test lead scoring
npm run test:agent -- --agent="Lead Scorer"

# Test auto responder
npm run test:agent -- --agent="Auto Responder"

# Test appointment scheduler
npm run test:agent -- --agent="Appointment Scheduler"
```

### Step 3: Start Agent Coordinator

```bash
npm run start:crews
```

## 🔄 Phase 5: Integration Testing

### Step 1: Test Webhook Endpoints

1. **Test GHL webhook:**

   ```bash
   curl -X POST https://www.vasquezlawnc.com/api/webhooks/ghl \
     -H "Content-Type: application/json" \
     -d '{"type": "ContactCreate", "contact": {"id": "test"}}'
   ```

2. **Test Retell webhook:**
   ```bash
   curl -X POST https://www.vasquezlawnc.com/api/webhooks/retell \
     -H "Content-Type: application/json" \
     -d '{"event": "call_started", "call": {"call_id": "test"}}'
   ```

### Step 2: Test SMS Integration

```bash
curl -X POST https://www.vasquezlawnc.com/api/ghl/send-sms \
  -H "Content-Type: application/json" \
  -d '{
    "contactId": "your-test-contact-id",
    "message": "Test message from integration",
    "triggerType": "custom"
  }'
```

### Step 3: Test Call Triggering

```bash
curl -X POST https://www.vasquezlawnc.com/api/ghl/trigger-call \
  -H "Content-Type: application/json" \
  -d '{
    "contactId": "your-test-contact-id",
    "contact": {
      "firstName": "Test",
      "lastName": "User",
      "phone": "+1234567890"
    },
    "callType": "consultation"
  }'
```

## 📊 Phase 6: Monitoring and Optimization

### Step 1: Set Up Monitoring

1. **Configure error tracking:**

   ```bash
   # Add to .env.local
   SENTRY_DSN=your-sentry-dsn
   ```

2. **Set up log monitoring:**

   ```bash
   # Monitor application logs
   npm run logs:follow

   # Monitor agent performance
   npm run monitor:agents
   ```

### Step 2: Performance Optimization

1. **Monitor agent performance:**

   ```bash
   npm run dashboard:agents
   ```

2. **Adjust agent settings based on performance:**

   ```bash
   # Increase concurrent tasks if needed
   CREWAI_MAX_CONCURRENT_TASKS=10

   # Adjust task timeout for slow operations
   CREWAI_TASK_TIMEOUT=600
   ```

## 🔧 Phase 7: Advanced Configuration

### Step 1: Custom Agent Tools

Create custom tools for specific firm needs:

```typescript
// src/lib/crewai/tools/case-lookup.ts
export class CaseLookupTool {
  async execute(params: { caseNumber: string }) {
    // Custom case lookup logic
  }
}
```

### Step 2: Advanced GHL Automations

Set up advanced campaigns in GoHighLevel:

1. **Drip Campaigns:** Multi-step nurture sequences
2. **Behavioral Triggers:** Actions based on website behavior
3. **Dynamic Content:** Personalized messaging based on practice area

### Step 3: Retell AI Optimizations

1. **Custom Voice Training:** Train voices for specific use cases
2. **Advanced Routing:** Complex call routing based on multiple factors
3. **Integration Scripts:** Custom scripts for specific workflows

## 🚨 Troubleshooting

### Common Issues and Solutions

#### 1. Webhook Not Receiving Events

- **Check webhook URL accessibility**
- **Verify SSL certificate**
- **Test with ngrok for local development:**
  ```bash
  ngrok http 3000
  # Update webhook URLs to ngrok URL
  ```

#### 2. Agent Not Responding

- **Check OpenAI API key**
- **Verify agent is enabled in environment**
- **Check agent logs:**
  ```bash
  npm run logs:agents
  ```

#### 3. SMS Not Sending

- **Verify GHL API key and location ID**
- **Check phone number format**
- **Ensure contact exists in GHL**

#### 4. Call Routing Issues

- **Verify Retell agent IDs**
- **Check call routing configuration**
- **Test individual agents**

### Debug Commands

```bash
# Check environment configuration
npm run debug:env

# Test all integrations
npm run test:integrations

# Validate webhook signatures
npm run test:webhooks

# Check agent status
npm run status:agents
```

## 📈 Success Metrics

Monitor these KPIs to measure integration success:

### Lead Management

- Lead response time (target: < 5 minutes)
- Lead scoring accuracy (target: > 85%)
- Conversion rate improvement (target: +20%)

### Communication

- SMS engagement rate (target: > 30%)
- Call answer rate (target: > 60%)
- Client satisfaction scores (target: > 4.5/5)

### Automation Efficiency

- Agent task completion rate (target: > 95%)
- Error rate (target: < 5%)
- Response time (target: < 30 seconds)

## 🔄 Maintenance and Updates

### Daily Tasks

- Monitor error logs
- Check agent performance metrics
- Review failed tasks

### Weekly Tasks

- Analyze lead conversion data
- Update agent configurations if needed
- Review and optimize campaigns

### Monthly Tasks

- Update OpenAI models if new versions available
- Review and optimize agent prompts
- Analyze ROI and performance improvements

## 📞 Support and Resources

### Internal Support

- **Development Team:** For technical issues
- **Marketing Team:** For campaign optimization
- **Operations Team:** For workflow improvements

### External Resources

- **GoHighLevel Support:** For GHL-specific issues
- **Retell AI Support:** For voice agent issues
- **OpenAI Support:** For AI model issues

### Documentation

- **API Documentation:** `/docs/api`
- **Agent Documentation:** `/docs/agents`
- **Webhook Documentation:** `/docs/webhooks`

---

## ✅ Implementation Checklist

### Phase 1: Environment Setup

- [ ] Environment variables configured
- [ ] Database setup and migrated
- [ ] SSL certificate configured

### Phase 2: GoHighLevel

- [ ] API credentials obtained
- [ ] Campaigns created and IDs recorded
- [ ] Pipelines and stages configured
- [ ] Webhooks set up and tested

### Phase 3: Retell AI

- [ ] Voice agents created
- [ ] Agent IDs recorded
- [ ] Webhooks configured
- [ ] Test calls completed

### Phase 4: CrewAI

- [ ] Agents configured and enabled
- [ ] Individual agent tests passed
- [ ] Coordinator started and running

### Phase 5: Integration Testing

- [ ] Webhook endpoints tested
- [ ] SMS integration verified
- [ ] Call triggering tested
- [ ] End-to-end workflow validated

### Phase 6: Monitoring

- [ ] Error tracking configured
- [ ] Performance monitoring set up
- [ ] Dashboard access configured

### Phase 7: Go Live

- [ ] Production environment configured
- [ ] Team training completed
- [ ] Monitoring and alerts active
- [ ] Success metrics tracking enabled

## 🎉 Congratulations!

Your CrewAI and GoHighLevel integration is now complete! The system will automatically:

- Score and prioritize incoming leads
- Provide immediate responses to inquiries
- Schedule appointments efficiently
- Manage follow-up communications
- Route calls to appropriate agents
- Track and analyze performance

Monitor the system closely during the first few weeks and adjust settings as needed based on performance data and user feedback.
