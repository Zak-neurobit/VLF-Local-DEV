# Crew Logs Integration Guide

## Overview

The Crew Logs system provides comprehensive logging, monitoring, and analytics for all CrewAI agent executions in the VLF Website. This guide explains how to integrate crew logging into your agents and use the monitoring dashboard.

## Architecture

```
┌─────────────────┐     ┌──────────────────┐     ┌────────────────┐
│  CrewAI Agents  │────▶│  Log Execution   │────▶│  PostgreSQL    │
└─────────────────┘     └──────────────────┘     └────────────────┘
                                │                          │
                                ▼                          ▼
                        ┌──────────────────┐     ┌────────────────┐
                        │  Logs API Route  │◀────│  Admin Dashboard│
                        └──────────────────┘     └────────────────┘
```

## Quick Start

### 1. Import the Crew Logger

```typescript
import { createCrewLogger } from '@/lib/crews/log-execution';
```

### 2. Create a Logger for Your Agent

```typescript
const logger = createCrewLogger('your-agent-name');
```

### 3. Wrap Your Executions

```typescript
const result = await logger.logExecution(
  'task-type', // e.g., 'generate-blog', 'analyze-document'
  async () => {
    // Your agent logic here
    return await performTask();
  },
  {
    input: {
      /* input data */
    },
    metadata: {
      /* additional context */
    },
  }
);
```

## Integration Examples

### Example 1: SEO Blog Generation Agent

```typescript
import { createCrewLogger } from '@/lib/crews/log-execution';

export class SEOBlogAgent {
  private logger = createCrewLogger('seo-blog-agent');

  async generateBlogPost(topic: string, keywords: string[]) {
    return await this.logger.logExecution(
      'generate-blog-post',
      async () => {
        // Actual blog generation logic
        const content = await this.llm.generate({
          prompt: `Write a blog post about ${topic}`,
          keywords,
        });

        return {
          title: content.title,
          body: content.body,
          meta: content.meta,
        };
      },
      {
        input: { topic, keywords },
        metadata: {
          wordCount: content.body.split(' ').length,
          seoScore: calculateSEOScore(content),
        },
      }
    );
  }
}
```

### Example 2: Document Analysis Agent

```typescript
import { createCrewLogger } from '@/lib/crews/log-execution';

export class DocumentAnalysisAgent {
  private logger = createCrewLogger('document-analysis-agent');

  async analyzeDocument(documentId: string, analysisType: string) {
    return await this.logger.logExecution(
      analysisType,
      async () => {
        const document = await this.getDocument(documentId);
        const analysis = await this.performAnalysis(document, analysisType);

        return analysis;
      },
      {
        input: { documentId, analysisType },
        metadata: {
          documentSize: document.size,
          processingSteps: analysis.steps.length,
        },
      }
    );
  }
}
```

### Example 3: Legal Consultation Agent

```typescript
import { createCrewLogger } from '@/lib/crews/log-execution';

export class LegalConsultationAgent {
  private logger = createCrewLogger('legal-consultation-agent');

  async conductConsultation(query: string, context: any) {
    return await this.logger.logExecution(
      'legal-consultation',
      async () => {
        // Multi-step consultation process
        const legalAnalysis = await this.analyzeLegalQuery(query);
        const relevantLaws = await this.findRelevantLaws(legalAnalysis);
        const recommendation = await this.generateRecommendation(
          query,
          legalAnalysis,
          relevantLaws
        );

        return {
          analysis: legalAnalysis,
          laws: relevantLaws,
          recommendation,
        };
      },
      {
        input: { query, context },
        metadata: {
          practiceArea: legalAnalysis.practiceArea,
          confidence: recommendation.confidence,
          citedLaws: relevantLaws.length,
        },
      }
    );
  }
}
```

## Viewing Logs

### Admin Dashboard

1. Navigate to `/admin/agent-monitoring`
2. Click "View Logs" button
3. Or directly visit `/admin/crew-logs`

### Features

- **Real-time Updates**: Enable auto-refresh for live monitoring
- **Filtering**: Filter by agent, time range, status, and execution type
- **Analytics**: View success rates, average durations, and agent performance
- **Export**: Export logs for external analysis
- **Cleanup**: Remove old logs to manage storage

### Log Details Include

- Execution timestamp and duration
- Success/failure status
- Input parameters
- Output results
- Error messages (if failed)
- Custom metadata

## API Integration

### Fetching Logs Programmatically

```typescript
// Using the service
import { crewLogsService } from '@/services/crews/crew-logs.service';

const logs = await crewLogsService.getLogs({
  agent: 'seo-blog-agent',
  timeRange: '24h',
  status: 'success',
  page: 1,
  pageSize: 50,
});

// Using the hook in React components
import { useCrewLogs } from '@/hooks/useCrewLogs';

function MyComponent() {
  const { logs, analytics, loading, updateFilters } = useCrewLogs({
    agent: 'seo-blog-agent',
    timeRange: '24h',
  });

  return (
    <div>
      {logs.map(log => (
        <LogItem key={log.id} log={log} />
      ))}
    </div>
  );
}
```

### Direct API Access

```typescript
// GET logs with filters
const response = await fetch('/api/crews/logs?agent=seo-blog-agent&timeRange=24h');
const data = await response.json();

// DELETE specific logs
await fetch('/api/crews/logs', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    action: 'delete',
    logIds: ['log-id-1', 'log-id-2'],
  }),
});

// Export logs
await fetch('/api/crews/logs', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    action: 'export',
    logIds: ['log-id-1', 'log-id-2'], // optional, exports all if not provided
  }),
});
```

## Best Practices

### 1. Consistent Naming

Use consistent agent names and execution types:

```typescript
// Good
const logger = createCrewLogger('seo-blog-agent');
await logger.logExecution('generate-blog-post', ...);
await logger.logExecution('optimize-content', ...);

// Bad - inconsistent naming
const logger = createCrewLogger('SEO_Agent');
await logger.logExecution('Blog Generation', ...);
await logger.logExecution('content-opt', ...);
```

### 2. Meaningful Metadata

Include relevant metadata for better analytics:

```typescript
await logger.logExecution(
  'process-document',
  async () => {
    /* ... */
  },
  {
    input: { documentId, userId },
    metadata: {
      documentType: 'legal-brief',
      pageCount: 42,
      processingModel: 'gpt-4',
      clientId: 'client-123',
      billableHours: 0.5,
    },
  }
);
```

### 3. Error Handling

Errors are automatically logged, but add context:

```typescript
try {
  await logger.logExecution('risky-operation', async () => {
    // Operation that might fail
  });
} catch (error) {
  // Error is already logged, but you can add additional handling
  notifyAdmins(error);
  throw error; // Re-throw if needed
}
```

### 4. Performance Considerations

- Logs are written asynchronously, so they don't block execution
- Use batch operations for multiple related tasks
- Consider log retention policies for large-scale deployments

## Advanced Features

### Custom Dashboards

Create custom views using the logs data:

```typescript
import { useCrewLogs } from '@/hooks/useCrewLogs';

function AgentPerformanceDashboard({ agentName }) {
  const { analytics, logs } = useCrewLogs({
    agent: agentName,
    timeRange: '7d',
  });

  // Custom visualizations
  const hourlyPerformance = useMemo(() => {
    return calculateHourlyMetrics(logs);
  }, [logs]);

  return (
    <Dashboard>
      <SuccessRateChart data={analytics.successRate} />
      <HourlyActivityHeatmap data={hourlyPerformance} />
      <ErrorPatternAnalysis logs={logs.filter(l => l.status === 'failure')} />
    </Dashboard>
  );
}
```

### Real-time Monitoring

For real-time updates, enable WebSocket integration:

```typescript
// Coming soon: WebSocket integration for live log streaming
import { useCrewLogsRealtime } from '@/hooks/useCrewLogsRealtime';

function LiveMonitor() {
  const { logs, connected } = useCrewLogsRealtime({
    agents: ['seo-blog-agent', 'legal-consultation-agent'],
  });

  return (
    <LiveFeed logs={logs} status={connected ? 'live' : 'reconnecting'} />
  );
}
```

### Alerts and Notifications

Set up alerts based on log patterns:

```typescript
// In your monitoring service
import { crewLogsService } from '@/services/crews/crew-logs.service';

async function checkAgentHealth() {
  const { analytics } = await crewLogsService.getLogs({
    timeRange: '1h',
  });

  for (const agent of analytics.agentActivity) {
    if (agent.successRate < 0.8) {
      await notifyOps({
        type: 'agent-degraded',
        agent: agent.agent,
        successRate: agent.successRate,
      });
    }
  }
}
```

## Troubleshooting

### Common Issues

1. **Logs not appearing**: Ensure the agent name is consistent and the database migration has run
2. **Performance impact**: Use appropriate time ranges and pagination
3. **Missing metadata**: Check that metadata is serializable to JSON

### Debug Mode

Enable detailed logging:

```typescript
const logger = createCrewLogger('my-agent');
logger.debug = true; // Adds console output for debugging
```

## Future Enhancements

- WebSocket support for real-time log streaming
- Advanced analytics with ML-based anomaly detection
- Integration with external monitoring tools (Datadog, New Relic)
- Automated performance optimization recommendations
- Cost tracking for LLM API calls

## Support

For issues or questions:

- Check existing logs at `/admin/crew-logs`
- Review error logs in the application logs
- Contact the development team for assistance
