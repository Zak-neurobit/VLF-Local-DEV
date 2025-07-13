import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

interface AgentTask {
  [key: string]: unknown;
}

// Agent execution logic
const executeAgent = async (agent: string, task: AgentTask) => {
  // Map agent names to their specific endpoints
  const agentEndpoints: Record<string, string> = {
    'Legal Consultation': '/api/crewai/legal-consultation',
    'Appointment Scheduling': '/api/crewai/appointment-scheduling',
    'Document Analysis': '/api/crewai/document-analysis',
    'SEO Blog Generator': '/api/crewai/seo-blog-generation',
    'Social Media Monitor': '/api/crewai/social-media-monitoring',
    'Competition Monitor': '/api/crewai/competitive-analysis',
  };

  const endpoint = agentEndpoints[agent];
  if (!endpoint) {
    throw new Error(`Unknown agent: ${agent}`);
  }

  // Execute the agent task
  const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task),
  });

  if (!response.ok) {
    throw new Error(`Agent execution failed: ${response.statusText}`);
  }

  return await response.json();
};

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { agent, ...taskParams } = body;

    if (!agent) {
      return NextResponse.json({ error: 'Agent name is required' }, { status: 400 });
    }

    // Execute the agent task
    const result = await executeAgent(agent, taskParams);

    // Log the execution
    console.log(`Agent ${agent} executed successfully`, {
      agent,
      params: taskParams,
      result,
      user: session.user.email,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      agent,
      result,
      executedAt: new Date().toISOString(),
      executedBy: session.user.email,
    });
  } catch (error) {
    console.error('Agent execution error:', error);
    return NextResponse.json(
      {
        error: 'Agent execution failed',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
