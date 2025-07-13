# Global Crew Logs Integration Guide

## Overview

This guide provides step-by-step instructions for completing the global integration of crew logging across the entire VLF Website application.

## Integration Status

### ✅ Completed

1. **Core Infrastructure**

   - Created crew logs API route (`/api/crews/logs`)
   - Created TypeScript types (`/src/types/crews.ts`)
   - Created service and React hook (`crew-logs.service.ts`, `useCrewLogs.ts`)
   - Created dashboard component (`CrewLogsViewer.tsx`)
   - Created admin page (`/admin/crew-logs`)
   - Created logging utility (`log-execution.ts`)

2. **Main Coordinator**

   - Updated `crew-coordinator.ts` to log all task executions
   - All tasks routed through the coordinator are now logged

3. **Example Agent**
   - Updated `seo-blog-generation-agent.ts` as a template

### 🔄 In Progress

The following components need logging integration:

## 1. Individual Agent Updates

Each agent needs to be updated following this pattern:

```typescript
// 1. Add import
import { createCrewLogger } from '@/lib/crews/log-execution';

// 2. Add logger property to class
export class YourAgent {
  private crewLogger = createCrewLogger('your-agent-name');

  // 3. Wrap main execution methods
  async yourMainMethod(request: YourRequest): Promise<YourResult> {
    return this.crewLogger.logExecution(
      'execution-type', // e.g., 'analyze-document', 'schedule-appointment'
      async () => {
        // Your existing method logic here
        return result;
      },
      {
        input: request,
        metadata: {
          // Add relevant metadata
        },
      }
    );
  }
}
```

### Agents to Update:

#### Legal Services Agents

- [ ] `legal-consultation-agent.ts` - Methods: `conductLegalConsultation`
- [ ] `document-analysis-agent.ts` - Methods: `analyzeDocument`
- [ ] `removal-defense-agent.ts` - Methods: `analyzeRemovalCase`, `generateDefense`
- [ ] `business-immigration-agent.ts` - Methods: `processVisa`, `evaluateEligibility`
- [ ] `criminal-defense-agent.ts` - Methods: `analyzeCase`, `generateDefenseStrategy`
- [ ] `enhanced-intake-agent.ts` - Methods: `processIntake`, `evaluateCase`
- [ ] `aila-trained-removal-agent.ts` - Methods: `analyzeCase`, `generateStrategy`

#### Client Management Agents

- [ ] `appointment-scheduling-agent.ts` - Methods: `scheduleAppointment`, `findAvailableSlots`
- [ ] `competitive-analysis-agent.ts` - Methods: `analyzeCompetitor`
- [ ] `social-media-monitoring-agent.ts` - Methods: `monitorSocialMedia`

#### SEO Domination Agents

- [ ] `blog-content-domination-agent.ts` - Methods: `generateBlogPost`, `optimizeContent`
- [ ] `competitor-spy-agent.ts` - Methods: `spyOnCompetitor`, `analyzeCompetitorSEO`
- [ ] `google-my-business-killer-agent.ts` - Methods: `optimizeGMBListing`, `generateReviews`
- [ ] `review-harvesting-agent.ts` - Methods: `harvestReviews`, `generateReviewRequests`
- [ ] `social-media-destroyer-agent.ts` - Methods: `generateSocialContent`, `schedulePosts`

## 2. Orchestrator Updates

### SEO Domination Orchestrator

Update `seo-domination-orchestrator.ts`:

```typescript
export class SEODominationOrchestrator {
  private crewLogger = createCrewLogger('seo-domination-orchestrator');

  async startDomination(): Promise<void> {
    return this.crewLogger.logExecution(
      'start-domination',
      async () => {
        // Existing logic
      },
      {
        metadata: {
          action: 'start',
          timestamp: new Date(),
        },
      }
    );
  }
}
```

### Enhanced Crew Coordinator

The `enhanced-crew-coordinator.ts` should also log workflow executions:

```typescript
async executeWorkflow(workflow: Workflow): Promise<WorkflowResult> {
  return this.crewLogger.logExecution(
    'execute-workflow',
    async () => {
      // Existing workflow logic
    },
    {
      input: workflow,
      metadata: {
        workflowId: workflow.id,
        steps: workflow.steps.length,
      }
    }
  );
}
```

## 3. Background Workers and Scripts

### Background Worker

Update `scripts/background-worker.ts` to log background task executions:

```typescript
import { createCrewLogger } from '@/lib/crews/log-execution';

const backgroundLogger = createCrewLogger('background-worker');

async function runScheduledTask(taskName: string, taskFn: () => Promise<void>) {
  return backgroundLogger.logExecution(taskName, taskFn, {
    metadata: {
      scheduledTime: new Date(),
      workerPid: process.pid,
    },
  });
}
```

### Cron Jobs

Each cron job should log its execution:

```typescript
// Example for blog generation cron
schedule.scheduleJob('0 */2 * * *', async () => {
  await runScheduledTask('scheduled-blog-generation', async () => {
    await generateScheduledBlogs();
  });
});
```

## 4. API Route Updates

Most API routes already use the CrewCoordinator, which now has logging. However, direct agent calls should be updated:

### Direct Agent Execution Routes

For routes that directly instantiate and call agents:

```typescript
// Before
const agent = new SomeAgent();
const result = await agent.execute(request);

// After - the agent itself now logs, so no changes needed in routes
const agent = new SomeAgent();
const result = await agent.execute(request); // Logging happens inside
```

## 5. Webhook Handlers

Update webhook handlers to log crew triggers:

### GoHighLevel Webhook

```typescript
// In /api/webhooks/ghl/route.ts
import { createCrewLogger } from '@/lib/crews/log-execution';

const webhookLogger = createCrewLogger('ghl-webhook');

export async function POST(request: Request) {
  return webhookLogger.logExecution(
    'process-ghl-webhook',
    async () => {
      // Existing webhook logic
    },
    {
      input: await request.json(),
      metadata: {
        webhookType: headers.get('x-ghl-webhook-type'),
      },
    }
  );
}
```

## 6. Testing the Integration

### Manual Testing

1. Execute a crew task through the UI or API
2. Navigate to `/admin/crew-logs`
3. Verify the execution appears with:
   - Correct agent name
   - Execution type
   - Status (success/failure)
   - Duration
   - Input/output data

### Automated Testing

Create a test script:

```typescript
// scripts/test-crew-logging.ts
import { createCrewLogger } from '@/lib/crews/log-execution';

async function testLogging() {
  const testLogger = createCrewLogger('test-agent');

  // Test successful execution
  await testLogger.logExecution(
    'test-success',
    async () => {
      return { success: true, data: 'test' };
    },
    {
      input: { test: true },
      metadata: { testRun: true },
    }
  );

  // Test failed execution
  try {
    await testLogger.logExecution(
      'test-failure',
      async () => {
        throw new Error('Test error');
      },
      {
        input: { test: true, expectFailure: true },
      }
    );
  } catch (e) {
    console.log('Expected failure logged');
  }

  console.log('✅ Test complete - check /admin/crew-logs');
}

testLogging();
```

## 7. Monitoring and Alerts

### Set Up Monitoring

1. **Performance Alerts**: Monitor average execution times
2. **Error Rate Alerts**: Alert when failure rate exceeds threshold
3. **Agent Health**: Track individual agent performance

### Example Alert Configuration

```typescript
// In a monitoring service
async function checkAgentHealth() {
  const { analytics } = await crewLogsService.getLogs({
    timeRange: '1h',
  });

  for (const agent of analytics.agentActivity) {
    if (agent.successRate < 0.8) {
      // Send alert
      await sendAlert({
        type: 'agent-degraded',
        agent: agent.agent,
        successRate: agent.successRate,
      });
    }
  }
}

// Run every 5 minutes
setInterval(checkAgentHealth, 5 * 60 * 1000);
```

## 8. Migration Checklist

- [ ] Run the update script: `npm run update-agents-logging`
- [ ] Manually review and update each agent's main methods
- [ ] Update background workers and cron jobs
- [ ] Update webhook handlers
- [ ] Test each agent type with sample executions
- [ ] Verify logs appear in dashboard
- [ ] Set up monitoring alerts
- [ ] Document any custom logging patterns

## 9. Best Practices

1. **Consistent Naming**: Use kebab-case for agent names and execution types
2. **Meaningful Metadata**: Include data that helps with debugging and analytics
3. **Error Context**: Ensure errors include enough context to debug
4. **Performance**: Logging is async and non-blocking
5. **Privacy**: Don't log sensitive client data in plain text

## 10. Rollback Plan

If issues arise:

1. Logging failures don't block execution (errors are caught)
2. To disable logging temporarily, set env var: `DISABLE_CREW_LOGGING=true`
3. Remove logging wrapper from specific methods if needed

## Next Steps

1. Complete agent updates using the provided patterns
2. Test thoroughly in development
3. Monitor performance impact (should be minimal)
4. Enable real-time updates via WebSocket (future enhancement)

## Support

For questions or issues:

- Check logs at `/admin/crew-logs`
- Review application logs for logging errors
- Contact the development team

---

This integration will provide comprehensive visibility into all crew operations, enabling better monitoring, debugging, and optimization of the AI agent system.
