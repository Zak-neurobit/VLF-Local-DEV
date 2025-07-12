# CrewAI Agents Guide - Vasquez Law Firm

## Overview

Our CrewAI agent system automates various legal service tasks, improving efficiency and client experience. Each agent is specialized for specific tasks and integrates with our existing tools (GHL, Retell, database).

## Available Agents

### 1. Legal Consultation Agent

- **Purpose**: Initial client consultations and case assessments
- **Capabilities**:
  - Analyze client situations
  - Provide preliminary legal guidance
  - Identify case type and urgency
  - Recommend appropriate attorneys
  - Schedule follow-up consultations

### 2. Appointment Scheduling Agent

- **Purpose**: Manage client appointments and calendar
- **Capabilities**:
  - Check attorney availability
  - Schedule consultations
  - Send appointment reminders (via GHL)
  - Handle rescheduling requests
  - Coordinate multi-attorney meetings

### 3. Document Analysis Agent

- **Purpose**: Review and analyze legal documents
- **Capabilities**:
  - Contract review and analysis
  - Immigration form validation
  - Court document summarization
  - Identify missing information
  - Flag potential legal issues

### 4. SEO Blog Generator Agent

- **Purpose**: Create SEO-optimized legal content
- **Capabilities**:
  - Research trending legal topics
  - Generate blog posts
  - Optimize for target keywords
  - Create meta descriptions
  - Schedule publishing

### 5. Social Media Monitor Agent

- **Purpose**: Track online presence and engagement
- **Capabilities**:
  - Monitor brand mentions
  - Track competitor activity
  - Analyze sentiment
  - Generate engagement reports
  - Suggest response strategies

### 6. Competition Monitor Agent

- **Purpose**: Track competitor activities
- **Capabilities**:
  - Monitor competitor websites
  - Track service offerings
  - Analyze pricing changes
  - Identify market opportunities
  - Generate competitive reports

## How Agents Work

### Architecture

```
User Request → API Gateway → CrewAI Router → Specific Agent → Task Execution → Response
                                                    ↓
                                            External Services
                                        (GHL, Retell, Database)
```

### Integration Points

1. **GoHighLevel (GHL)**

   - Agents can create contacts
   - Schedule appointments
   - Send SMS messages
   - Update client records

2. **Retell Voice AI**

   - Agents can initiate calls
   - Process voice transcripts
   - Handle voice-based intake

3. **Database**
   - Store agent interactions
   - Track performance metrics
   - Maintain conversation history

## Using the Gradio Interface

### Access

Navigate to `/agents` to access the control center.

### Features

1. **Agent Control Tab**

   - Execute specific tasks
   - Provide parameters in JSON format
   - View execution results

2. **Agent Training Tab**

   - Upload new training data
   - Select training type
   - Monitor training progress

3. **Integration Testing Tab**

   - Test GHL integration
   - Test Retell integration
   - Verify connectivity

4. **Agent Status Tab**
   - View all agent statuses
   - Check performance metrics
   - Monitor system health

## Training Agents

### Running the Training Script

```bash
npm run train-agents
# or
npx ts-node scripts/setup-agents.ts
```

### Training Data Format

```json
{
  "category": "Immigration",
  "patterns": ["I need help with my visa", "Can you help me get a green card?"],
  "responses": ["I can help with your immigration case.", "We specialize in all types of visas."]
}
```

### Custom Training

1. Add training data to `agent-training/` directory
2. Use the Gradio interface to upload data
3. Select agent and training type
4. Monitor training progress

## API Usage

### Execute Agent Task

```typescript
// POST /api/crewai/execute
{
  "agent": "Legal Consultation",
  "taskType": "analyze",
  "parameters": {
    "client": "John Doe",
    "issue": "visa expired",
    "urgency": "high"
  }
}
```

### Get Agent Status

```typescript
// GET /api/crewai/status/:agentName
Response: {
  "status": "active",
  "lastActivity": "2024-01-12T10:30:00Z",
  "tasksCompleted": 156,
  "successRate": 0.98
}
```

## Best Practices

1. **Task Specificity**: Provide clear, specific parameters for better results
2. **Error Handling**: Always handle agent failures gracefully
3. **Monitoring**: Regularly check agent performance metrics
4. **Training**: Update training data based on client interactions
5. **Integration**: Test integrations regularly to ensure connectivity

## Troubleshooting

### Common Issues

1. **Agent Not Responding**

   - Check agent status in Gradio interface
   - Verify API endpoints are accessible
   - Check server logs for errors

2. **Integration Failures**

   - Verify API keys are configured
   - Test individual integrations
   - Check network connectivity

3. **Poor Agent Performance**
   - Review recent training data
   - Check for conflicting patterns
   - Retrain with improved data

## Security Considerations

1. **Authentication**: All agent endpoints require authentication
2. **Data Privacy**: Agent interactions are logged but PII is protected
3. **Access Control**: Admin-only access to training and configuration
4. **Audit Trail**: All agent actions are logged for compliance

## Future Enhancements

1. **Multi-language Support**: Spanish language processing
2. **Voice Integration**: Direct voice command support
3. **Advanced Analytics**: Predictive case outcome analysis
4. **Workflow Automation**: Complex multi-agent workflows
5. **Client Portal Integration**: Direct client access to certain agents

## Support

For issues or questions:

- Check logs at `/logs/crewai/`
- Use Gradio interface diagnostics
- Contact technical support

Remember: Agents are tools to enhance, not replace, human legal expertise. Always have attorney oversight for critical decisions.
