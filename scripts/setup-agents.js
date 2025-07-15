#!/usr/bin/env node

const axios = require('axios');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../.env.local') });

const RETELL_API_KEY = process.env.RETELL_API_KEY;
const RETELL_API_URL = 'https://api.retellai.com/v1';

if (!RETELL_API_KEY) {
  console.error('❌ RETELL_API_KEY not found in environment variables');
  process.exit(1);
}

// Agent configurations
const agentConfigs = [
  {
    type: 'general_intake',
    name: 'General Intake Specialist',
    prompt: `You are a professional legal intake specialist for Vasquez Law Firm. Your role is to:
1. Warmly greet potential clients
2. Identify their legal needs
3. Ask qualifying questions
4. Route them to the appropriate specialized agent
5. Collect basic contact information

Always be empathetic, professional, and efficient. If someone needs immediate help (detained, arrested, injured), prioritize accordingly.`,
    voice_id: 'eleven_monolingual_v1',
    language: 'en-US',
  },
  {
    type: 'removal_defense',
    name: 'Deportation Defense Attorney',
    prompt: `You are an experienced deportation defense attorney. Your priorities:
1. Assess urgency - Is the person detained? Do they have a court date?
2. Identify defenses - Criminal history, time in US, family ties, asylum eligibility
3. Explain the removal process clearly
4. Provide immediate action steps
5. Schedule urgent consultations for detained individuals

Be compassionate but realistic about outcomes. Always emphasize the importance of attending all court dates.`,
    voice_id: 'eleven_monolingual_v1',
    language: 'en-US',
  },
  {
    type: 'spanish_language',
    name: 'Especialista Legal Bilingüe',
    prompt: `Eres un especialista legal bilingüe de Vasquez Law Firm. Tu función es:
1. Atender a clientes hispanohablantes con calidez y profesionalismo
2. Identificar sus necesidades legales específicas
3. Explicar procesos legales en español claro y sencillo
4. Conectarlos con el abogado apropiado
5. Asegurar que entiendan completamente sus opciones

Sé empático y cultural. Muchos clientes pueden tener miedo o desconfianza del sistema legal.`,
    voice_id: 'eleven_multilingual_v1',
    language: 'es-ES',
  },
  {
    type: 'criminal_defense',
    name: 'NC Criminal Defense Attorney',
    prompt: `You are a North Carolina criminal defense attorney. Your priorities:
1. Understand the charges and arrest circumstances
2. Advise on immediate steps (bail, court dates, evidence preservation)
3. Explain potential consequences and defenses
4. Discuss NC-specific laws and sentencing guidelines
5. Emphasize the importance of legal representation

Never advise clients to speak to police without an attorney. Be supportive but realistic about outcomes.`,
    voice_id: 'eleven_monolingual_v1',
    language: 'en-US',
  },
  {
    type: 'personal_injury',
    name: 'NC Personal Injury Attorney',
    prompt: `You are a North Carolina personal injury attorney. Focus on:
1. Understanding the accident/injury details and current medical treatment
2. Identifying all potentially liable parties
3. Explaining NC contributory negligence rules (harsh but important)
4. Discussing evidence preservation (photos, witnesses, medical records)
5. Setting realistic expectations about case value and timeline

Always advise seeking immediate medical treatment. Never guarantee outcomes.`,
    voice_id: 'eleven_monolingual_v1',
    language: 'en-US',
  },
];

async function createRetellAgent(config) {
  try {
    const response = await axios.post(
      `${RETELL_API_URL}/agents`,
      {
        name: config.name,
        prompt: config.prompt,
        voice_id: config.voice_id,
        language: config.language,
        response_speed: 1.0,
        interruption_sensitivity: 0.8,
        backchannel_frequency: 0.8,
        backchannel_words: ['hmm', 'yeah', 'okay', 'I see', 'right', 'understood'],
        reminder_trigger_ms: 10000,
        reminder_prompt: 'Are you still there? How can I help you?',
      },
      {
        headers: {
          Authorization: `Bearer ${RETELL_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(`Failed to create agent ${config.name}:`, error.response?.data || error.message);
    throw error;
  }
}

async function setupAllAgents() {
  console.log('🚀 Starting agent setup for Vasquez Law Firm...\n');

  const results = [];

  for (const config of agentConfigs) {
    console.log(`📞 Creating ${config.name}...`);
    try {
      const agent = await createRetellAgent(config);
      results.push({
        type: config.type,
        name: config.name,
        agent_id: agent.agent_id,
        status: 'created',
      });
      console.log(`✅ Successfully created ${config.name} (ID: ${agent.agent_id})\n`);
    } catch (error) {
      results.push({
        type: config.type,
        name: config.name,
        agent_id: null,
        status: 'failed',
        error: error.message,
      });
      console.log(`❌ Failed to create ${config.name}\n`);
    }
  }

  // Save results to file
  const outputPath = path.join(__dirname, '../agent-setup-results.json');
  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));

  console.log('\n📊 Setup Summary:');
  console.log(`Total agents: ${results.length}`);
  console.log(`Successful: ${results.filter(r => r.status === 'created').length}`);
  console.log(`Failed: ${results.filter(r => r.status === 'failed').length}`);
  console.log(`\nResults saved to: ${outputPath}`);

  // Update environment variables file with agent IDs
  const envPath = path.join(__dirname, '../.env.local');
  let envContent = fs.readFileSync(envPath, 'utf-8');

  results
    .filter(r => r.status === 'created')
    .forEach(result => {
      const envKey = `RETELL_AGENT_${result.type.toUpperCase()}_ID`;
      const envLine = `${envKey}=${result.agent_id}`;

      if (!envContent.includes(envKey)) {
        envContent += `\n${envLine}`;
      }
    });

  fs.writeFileSync(envPath, envContent);
  console.log('\n✅ Updated .env.local with agent IDs');
}

// Run the setup
setupAllAgents().catch(error => {
  console.error('Setup failed:', error);
  process.exit(1);
});
