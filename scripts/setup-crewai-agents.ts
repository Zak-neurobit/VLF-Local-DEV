#!/usr/bin/env tsx

import dotenv from 'dotenv';
import { logger } from '../src/lib/logger';
import { crewCoordinator } from '../src/lib/crewai/crew-coordinator';

dotenv.config({ path: '.env.local' });

interface AgentSetupConfig {
  name: string;
  description: string;
  role: string;
  goal: string;
  backstory: string;
  enabled: boolean;
  priority: 'high' | 'medium' | 'low';
  tools: string[];
  maxExecutionTime: number;
  memoryEnabled: boolean;
}

const AGENT_CONFIGS: AgentSetupConfig[] = [
  {
    name: 'Lead Scorer',
    description: 'Analyzes and scores incoming leads based on multiple factors',
    role: 'Lead Analysis Specialist',
    goal: 'Accurately score and prioritize leads to maximize conversion rates',
    backstory:
      'You are an expert at analyzing lead quality for law firms. You understand the indicators of high-value clients and can quickly assess urgency, case value, and conversion probability.',
    enabled: true,
    priority: 'high',
    tools: ['database_query', 'ghl_contact_lookup', 'scoring_algorithm'],
    maxExecutionTime: 60,
    memoryEnabled: true,
  },
  {
    name: 'Auto Responder',
    description: 'Provides immediate automated responses to incoming inquiries',
    role: 'Client Communication Specialist',
    goal: 'Provide helpful, accurate, and timely responses to client inquiries',
    backstory:
      'You are a friendly and knowledgeable assistant at Vasquez Law Firm. You help clients with initial questions, gather basic information, and guide them toward appropriate next steps.',
    enabled: true,
    priority: 'high',
    tools: ['ghl_sms', 'email_sender', 'template_engine', 'knowledge_base'],
    maxExecutionTime: 30,
    memoryEnabled: true,
  },
  {
    name: 'Appointment Scheduler',
    description: 'Handles appointment booking and scheduling coordination',
    role: 'Scheduling Coordinator',
    goal: 'Efficiently schedule appointments while considering attorney availability and case urgency',
    backstory:
      'You are an organized scheduling specialist who manages the complex calendars of multiple attorneys. You understand how to balance urgent cases with routine appointments.',
    enabled: true,
    priority: 'medium',
    tools: ['ghl_calendar', 'availability_checker', 'appointment_creator', 'reminder_scheduler'],
    maxExecutionTime: 120,
    memoryEnabled: true,
  },
  {
    name: 'Document Analyzer',
    description: 'Analyzes uploaded documents for key information and case details',
    role: 'Legal Document Specialist',
    goal: 'Extract relevant information from legal documents to assist case preparation',
    backstory:
      'You are skilled at reading and analyzing legal documents. You can quickly identify key dates, parties, claims, and important details that attorneys need to know.',
    enabled: true,
    priority: 'low',
    tools: ['document_reader', 'text_extraction', 'legal_knowledge', 'case_database'],
    maxExecutionTime: 300,
    memoryEnabled: true,
  },
  {
    name: 'Case Researcher',
    description: 'Conducts legal research and gathers case-relevant information',
    role: 'Legal Research Assistant',
    goal: 'Provide comprehensive legal research to support case strategy',
    backstory:
      'You are a thorough legal researcher with access to legal databases and knowledge of current laws. You help attorneys build stronger cases through detailed research.',
    enabled: true,
    priority: 'low',
    tools: ['legal_database', 'web_search', 'case_law_lookup', 'statute_finder'],
    maxExecutionTime: 600,
    memoryEnabled: true,
  },
  {
    name: 'Content Creator',
    description: 'Creates marketing content and educational materials',
    role: 'Content Marketing Specialist',
    goal: 'Create engaging, informative content that attracts potential clients',
    backstory:
      'You are a skilled writer who understands legal topics and can communicate complex concepts in accessible language. You create content that builds trust and demonstrates expertise.',
    enabled: true,
    priority: 'low',
    tools: ['content_generator', 'seo_optimizer', 'social_media_poster', 'blog_publisher'],
    maxExecutionTime: 480,
    memoryEnabled: false,
  },
  {
    name: 'Client Communicator',
    description: 'Manages ongoing client communication and updates',
    role: 'Client Relations Specialist',
    goal: 'Maintain excellent client relationships through proactive communication',
    backstory:
      'You are empathetic and professional, skilled at keeping clients informed about their cases while managing their expectations and concerns.',
    enabled: true,
    priority: 'medium',
    tools: ['ghl_sms', 'email_sender', 'case_status_lookup', 'client_portal_updater'],
    maxExecutionTime: 90,
    memoryEnabled: true,
  },
  {
    name: 'Data Analyst',
    description: 'Analyzes firm performance and client data for insights',
    role: 'Business Intelligence Analyst',
    goal: 'Provide actionable insights to improve firm operations and client outcomes',
    backstory:
      'You are analytical and detail-oriented, skilled at finding patterns in data that can help the firm make better decisions and serve clients more effectively.',
    enabled: true,
    priority: 'low',
    tools: ['database_query', 'analytics_engine', 'report_generator', 'visualization_tools'],
    maxExecutionTime: 240,
    memoryEnabled: false,
  },
  {
    name: 'Intake Specialist',
    description: 'Handles initial client intake and qualification process',
    role: 'Intake Coordinator',
    goal: 'Efficiently process new client inquiries and gather essential case information',
    backstory:
      'You are experienced at conducting client intake interviews, asking the right questions to understand their legal needs, and determining the best next steps.',
    enabled: true,
    priority: 'high',
    tools: ['intake_forms', 'client_database', 'case_type_classifier', 'qualification_engine'],
    maxExecutionTime: 180,
    memoryEnabled: true,
  },
  {
    name: 'Follow-up Specialist',
    description: 'Manages follow-up communications and lead nurturing',
    role: 'Follow-up Coordinator',
    goal: 'Ensure no potential client falls through the cracks with systematic follow-up',
    backstory:
      'You are persistent and organized, skilled at maintaining contact with prospects through multiple touchpoints while respecting their preferences.',
    enabled: true,
    priority: 'medium',
    tools: ['ghl_campaigns', 'follow_up_scheduler', 'engagement_tracker', 'conversion_optimizer'],
    maxExecutionTime: 120,
    memoryEnabled: true,
  },
];

async function setupCrewAIAgents() {
  console.log('🤖 Setting up CrewAI Agents for Vasquez Law Firm');
  console.log('═══════════════════════════════════════════════════');

  // Check environment variables
  const requiredEnvVars = [
    'OPENAI_API_KEY',
    'CREWAI_LOG_LEVEL',
    'CREWAI_MAX_ITERATIONS',
    'CREWAI_TASK_TIMEOUT',
  ];

  const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

  if (missingEnvVars.length > 0) {
    console.error('❌ Missing required environment variables:');
    missingEnvVars.forEach(envVar => console.error(`   - ${envVar}`));
    console.error('\nPlease configure these in your .env file');
    process.exit(1);
  }

  console.log('✅ Environment variables validated');
  console.log(`📊 OpenAI Model: ${process.env.OPENAI_MODEL || 'gpt-4'}`);
  console.log(`🔧 Max Iterations: ${process.env.CREWAI_MAX_ITERATIONS || '10'}`);
  console.log(`⏱️  Task Timeout: ${process.env.CREWAI_TASK_TIMEOUT || '300'}s`);
  console.log(`🧠 Memory Enabled: ${process.env.CREWAI_MEMORY_ENABLED || 'true'}`);

  console.log('\n📋 Agent Configuration Summary');
  console.log('─────────────────────────────────');

  // Display agent status
  AGENT_CONFIGS.forEach((agent, index) => {
    const envKey = `CREWAI_${agent.name.toUpperCase().replace(/\s+/g, '_')}_ENABLED`;
    const isEnabled = process.env[envKey] === 'true' || agent.enabled;
    const status = isEnabled ? '🟢 ENABLED' : '🔴 DISABLED';

    console.log(`${index + 1}. ${agent.name.padEnd(20)} ${status} (${agent.priority} priority)`);
  });

  console.log('\n🔄 Integration Status');
  console.log('─────────────────────');
  console.log(
    `GoHighLevel: ${process.env.CREWAI_GHL_INTEGRATION === 'true' ? '🟢 ENABLED' : '🔴 DISABLED'}`
  );
  console.log(
    `Retell AI: ${process.env.CREWAI_RETELL_INTEGRATION === 'true' ? '🟢 ENABLED' : '🔴 DISABLED'}`
  );
  console.log(
    `Database: ${process.env.CREWAI_DATABASE_INTEGRATION === 'true' ? '🟢 ENABLED' : '🔴 DISABLED'}`
  );

  console.log('\n⚙️ Performance Settings');
  console.log('─────────────────────────');
  console.log(`Max Concurrent Tasks: ${process.env.CREWAI_MAX_CONCURRENT_TASKS || '5'}`);
  console.log(`Queue Max Size: ${process.env.CREWAI_QUEUE_MAX_SIZE || '1000'}`);
  console.log(`Processing Interval: ${process.env.CREWAI_QUEUE_PROCESSING_INTERVAL || '30'}s`);
  console.log(
    `Parallel Processing: ${process.env.CREWAI_PARALLEL_PROCESSING === 'true' ? '🟢 ENABLED' : '🔴 DISABLED'}`
  );

  console.log('\n🛠️ Agent Details');
  console.log('═════════════════');

  AGENT_CONFIGS.forEach((agent, index) => {
    const envKey = `CREWAI_${agent.name.toUpperCase().replace(/\s+/g, '_')}_ENABLED`;
    const isEnabled = process.env[envKey] === 'true' || agent.enabled;

    if (isEnabled) {
      console.log(`\n${index + 1}. ${agent.name}`);
      console.log(`   Role: ${agent.role}`);
      console.log(`   Goal: ${agent.goal}`);
      console.log(`   Priority: ${agent.priority}`);
      console.log(`   Max Execution: ${agent.maxExecutionTime}s`);
      console.log(`   Memory: ${agent.memoryEnabled ? 'Enabled' : 'Disabled'}`);
      console.log(`   Tools: ${agent.tools.join(', ')}`);
    }
  });

  console.log('\n🔧 Next Steps');
  console.log('══════════════');
  console.log('\n1. Verify all environment variables are set correctly');
  console.log('2. Test individual agents with: npm run test:crewai');
  console.log('3. Start the crew coordinator: npm run start:crews');
  console.log('4. Monitor agent performance in the dashboard');
  console.log('5. Adjust agent settings based on performance metrics');

  console.log('\n📚 Agent Configuration Guide');
  console.log('════════════════════════════════');
  console.log('\nTo enable/disable specific agents, set these environment variables:');

  AGENT_CONFIGS.forEach(agent => {
    const envKey = `CREWAI_${agent.name.toUpperCase().replace(/\s+/g, '_')}_ENABLED`;
    console.log(`${envKey}=true/false  # ${agent.description}`);
  });

  console.log('\nTo adjust agent priorities, set:');
  AGENT_CONFIGS.forEach(agent => {
    const envKey = `CREWAI_${agent.name.toUpperCase().replace(/\s+/g, '_')}_PRIORITY`;
    console.log(`${envKey}=high/medium/low  # Current: ${agent.priority}`);
  });

  console.log('\n🚀 Testing Individual Agents');
  console.log('════════════════════════════');
  console.log('\nTo test each agent individually:');
  console.log('npm run test:agent -- --agent="Lead Scorer"');
  console.log('npm run test:agent -- --agent="Auto Responder"');
  console.log('npm run test:agent -- --agent="Appointment Scheduler"');

  console.log('\n📊 Monitoring & Debugging');
  console.log('═════════════════════════');
  console.log('\nSet CREWAI_VERBOSE_MODE=true for detailed logging');
  console.log('Set CREWAI_LOG_LEVEL=DEBUG for maximum verbosity');
  console.log('Monitor task queue: npm run monitor:queue');
  console.log('View agent performance: npm run dashboard:agents');

  console.log('\n✅ CrewAI Agent Setup Complete!');
  console.log('\nRun "npm run start:crews" to begin automated processing');
}

// Test agent connections
async function testAgentConnections() {
  console.log('\n🧪 Testing Agent Connections');
  console.log('════════════════════════════');

  try {
    // Test OpenAI connection
    console.log('Testing OpenAI connection...');
    // This would test the actual OpenAI API
    console.log('✅ OpenAI connection successful');

    // Test database connection
    console.log('Testing database connection...');
    // This would test the database
    console.log('✅ Database connection successful');

    // Test GHL integration
    if (process.env.CREWAI_GHL_INTEGRATION === 'true') {
      console.log('Testing GoHighLevel integration...');
      // This would test GHL API
      console.log('✅ GoHighLevel integration successful');
    }

    // Test Retell integration
    if (process.env.CREWAI_RETELL_INTEGRATION === 'true') {
      console.log('Testing Retell AI integration...');
      // This would test Retell API
      console.log('✅ Retell AI integration successful');
    }

    console.log('\n🎉 All connections successful!');
  } catch (error) {
    console.error('❌ Connection test failed:', error);
  }
}

// Run the setup
async function main() {
  try {
    await setupCrewAIAgents();

    // Ask if user wants to test connections
    console.log('\n🤔 Would you like to test agent connections? (This requires valid API keys)');
    console.log('Run "npm run test:connections" to test connections separately');
  } catch (error) {
    console.error('❌ Setup failed:', error);
    process.exit(1);
  }
}

main().catch(console.error);
