#!/usr/bin/env node

import * as fs from 'fs/promises';
import * as path from 'path';
import { glob } from 'glob';

/**
 * Script to update all CrewAI agents to use the logging system
 * This will add the crew logger to all agent files and wrap their main execution methods
 */

interface AgentUpdate {
  file: string;
  agentName: string;
  methodsToWrap: string[];
}

const AGENT_UPDATES: AgentUpdate[] = [
  {
    file: 'legal-consultation-agent.ts',
    agentName: 'legal-consultation-agent',
    methodsToWrap: ['conductLegalConsultation'],
  },
  {
    file: 'appointment-scheduling-agent.ts',
    agentName: 'appointment-scheduling-agent',
    methodsToWrap: ['scheduleAppointment', 'findAvailableSlots'],
  },
  {
    file: 'document-analysis-agent.ts',
    agentName: 'document-analysis-agent',
    methodsToWrap: ['analyzeDocument'],
  },
  {
    file: 'competitive-analysis-agent.ts',
    agentName: 'competitive-analysis-agent',
    methodsToWrap: ['analyzeCompetitor'],
  },
  {
    file: 'social-media-monitoring-agent.ts',
    agentName: 'social-media-monitoring-agent',
    methodsToWrap: ['monitorSocialMedia'],
  },
  {
    file: 'aila-trained-removal-agent.ts',
    agentName: 'aila-removal-defense-agent',
    methodsToWrap: ['analyzeCase', 'generateStrategy'],
  },
  {
    file: 'business-immigration-agent.ts',
    agentName: 'business-immigration-agent',
    methodsToWrap: ['processVisa', 'evaluateEligibility'],
  },
  {
    file: 'criminal-defense-agent.ts',
    agentName: 'criminal-defense-agent',
    methodsToWrap: ['analyzeCase', 'generateDefenseStrategy'],
  },
  {
    file: 'enhanced-intake-agent.ts',
    agentName: 'enhanced-intake-agent',
    methodsToWrap: ['processIntake', 'evaluateCase'],
  },
  {
    file: 'removal-defense-agent.ts',
    agentName: 'removal-defense-agent',
    methodsToWrap: ['analyzeRemovalCase', 'generateDefense'],
  },
];

const SEO_DOMINATION_AGENTS: AgentUpdate[] = [
  {
    file: 'blog-content-domination-agent.ts',
    agentName: 'blog-content-domination-agent',
    methodsToWrap: ['generateBlogPost', 'optimizeContent'],
  },
  {
    file: 'competitor-spy-agent.ts',
    agentName: 'competitor-spy-agent',
    methodsToWrap: ['spyOnCompetitor', 'analyzeCompetitorSEO'],
  },
  {
    file: 'google-my-business-killer-agent.ts',
    agentName: 'gmb-killer-agent',
    methodsToWrap: ['optimizeGMBListing', 'generateReviews'],
  },
  {
    file: 'review-harvesting-agent.ts',
    agentName: 'review-harvesting-agent',
    methodsToWrap: ['harvestReviews', 'generateReviewRequests'],
  },
  {
    file: 'social-media-destroyer-agent.ts',
    agentName: 'social-media-destroyer-agent',
    methodsToWrap: ['generateSocialContent', 'schedulePosts'],
  },
];

async function updateAgentFile(agentPath: string, update: AgentUpdate): Promise<void> {
  try {
    const content = await fs.readFile(agentPath, 'utf-8');
    
    // Check if already has logging
    if (content.includes('createCrewLogger')) {
      console.log(`✅ ${update.file} already has logging`);
      return;
    }

    // Add import
    let updatedContent = content.replace(
      /(import.*from.*['"]@\/lib\/logger['"];?)/,
      `$1\nimport { createCrewLogger } from '@/lib/crews/log-execution';`
    );

    // If no logger import exists, add both
    if (!updatedContent.includes('createCrewLogger')) {
      const firstImport = updatedContent.match(/import.*from.*;/);
      if (firstImport) {
        const insertPosition = firstImport.index! + firstImport[0].length;
        updatedContent = 
          updatedContent.slice(0, insertPosition) +
          `\nimport { logger } from '@/lib/logger';\nimport { createCrewLogger } from '@/lib/crews/log-execution';` +
          updatedContent.slice(insertPosition);
      }
    }

    // Add crew logger property to class
    const classMatch = updatedContent.match(/export\s+class\s+\w+Agent\s*{/);
    if (classMatch) {
      const insertPosition = classMatch.index! + classMatch[0].length;
      updatedContent = 
        updatedContent.slice(0, insertPosition) +
        `\n  private crewLogger = createCrewLogger('${update.agentName}');` +
        updatedContent.slice(insertPosition);
    }

    // Save the updated file
    await fs.writeFile(agentPath, updatedContent);
    console.log(`✅ Updated ${update.file} with logging integration`);

  } catch (error) {
    console.error(`❌ Failed to update ${update.file}:`, error);
  }
}

async function main() {
  console.log('🚀 Updating CrewAI agents with logging integration...\n');

  // Update regular agents
  const agentsDir = path.join(process.cwd(), 'src/lib/crewai/agents');
  for (const update of AGENT_UPDATES) {
    const agentPath = path.join(agentsDir, update.file);
    await updateAgentFile(agentPath, update);
  }

  console.log('\n🚀 Updating SEO Domination agents...\n');

  // Update SEO domination agents
  const seoDominationDir = path.join(process.cwd(), 'src/lib/crewai/seo-domination');
  for (const update of SEO_DOMINATION_AGENTS) {
    const agentPath = path.join(seoDominationDir, update.file);
    await updateAgentFile(agentPath, update);
  }

  // Update the orchestrator
  const orchestratorPath = path.join(seoDominationDir, 'seo-domination-orchestrator.ts');
  if (await fs.access(orchestratorPath).then(() => true).catch(() => false)) {
    await updateAgentFile(orchestratorPath, {
      file: 'seo-domination-orchestrator.ts',
      agentName: 'seo-domination-orchestrator',
      methodsToWrap: ['startDomination', 'executeStrategy'],
    });
  }

  console.log('\n✅ Agent update complete!');
  console.log('\n📝 Next steps:');
  console.log('1. Manually review each agent file and wrap the main execution methods with crewLogger.logExecution()');
  console.log('2. Update API routes to ensure they handle logged executions properly');
  console.log('3. Test the integration with a few agent executions');
  console.log('4. Monitor logs at /admin/crew-logs');
}

main().catch(console.error);