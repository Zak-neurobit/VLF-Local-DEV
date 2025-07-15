#!/usr/bin/env node

import { AgentTrainer } from '../src/lib/crewai/training/agent-trainer';
import { logger } from '../src/lib/logger';

async function trainAgents() {
  logger.info('Starting CrewAI agent training with AILA Cookbook');

  try {
    const trainer = new AgentTrainer();
    await trainer.trainAllAgents();

    logger.info('✅ Agent training completed successfully!');
    logger.info('The following agents have been enhanced:');
    logger.info('- Enhanced Affirmative Immigration Agent (Family, Naturalization, Consular)');
    logger.info('- Enhanced Humanitarian Agent (Asylum, U/T Visa, VAWA, TPS)');
    logger.info('- Enhanced Business Immigration Agent (H-1B, PERM, EB categories, L-1)');

    logger.info('\nAgents are now trained with:');
    logger.info('- Comprehensive form knowledge');
    logger.info('- Detailed procedural workflows');
    logger.info('- Accurate processing timelines');
    logger.info('- Best practices from AILA Cookbook');
    logger.info('- Common issues and solutions');
  } catch (error) {
    logger.error('Agent training failed:', error);
    process.exit(1);
  }
}

// Run training
trainAgents().catch(error => {
  logger.error('Fatal error during training:', error);
  process.exit(1);
});
