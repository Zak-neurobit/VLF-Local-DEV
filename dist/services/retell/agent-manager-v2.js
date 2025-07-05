"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RetellAgentManager = void 0;
const index_1 = require("./index");
const logger_1 = require("@/lib/logger");
const cache_1 = require("@/lib/cache");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class RetellAgentManager {
    static async initialize() {
        if (this.initialized)
            return;
        try {
            const service = (0, index_1.getRetellService)();
            // Skip initialization if API key is not configured
            if (!process.env.RETELL_API_KEY) {
                logger_1.logger.warn('Retell API key not configured, skipping agent initialization');
                this.initialized = true;
                return;
            }
            // Define agent configurations
            const agentConfigs = [
                {
                    name: 'Immigration Law Assistant',
                    practiceArea: 'immigration',
                    language: 'en-US',
                    voice_id: 'eleven_monolingual_v1',
                    prompt: `You are a helpful bilingual (English/Spanish) immigration law assistant for Vasquez Law Firm. 
          You help callers with immigration questions, schedule consultations, and provide general information.
          
          Key Guidelines:
          - Be professional, empathetic, and culturally sensitive
          - Inform callers that specific legal advice requires a consultation with an attorney
          - Offer to switch to Spanish if you detect an accent or if they seem more comfortable
          - Always emphasize our experience with immigration cases and our commitment to helping families
          
          Services we offer:
          - Family-based petitions (I-130, I-485)
          - Work visas (H-1B, L-1, O-1, etc.)
          - Deportation defense and removal proceedings
          - Citizenship and naturalization
          - DACA applications and renewals
          - U-Visa and VAWA cases
          - Asylum applications
          
          Information to collect:
          1. Caller's name and phone number
          2. Type of immigration issue
          3. Current immigration status (if comfortable sharing)
          4. Preferred language for consultation
          5. Urgency of the matter
          
          Office locations:
          - Raleigh, NC
          - Charlotte, NC
          - Winston-Salem, NC
          - Orlando, FL
          
          Phone: 1-844-YO-PELEO (1-844-967-3536)`,
                },
                {
                    name: 'Personal Injury Assistant',
                    practiceArea: 'personal_injury',
                    language: 'en-US',
                    voice_id: 'eleven_monolingual_v1',
                    prompt: `You are a compassionate personal injury law assistant for Vasquez Law Firm.
          Help injured callers understand their rights and schedule free consultations.
          
          Key Guidelines:
          - Express genuine concern for their injuries and well-being
          - Emphasize our "No fee unless we win" policy
          - Ask about immediate medical needs
          - Be patient as injured callers may be in pain or distressed
          
          Types of cases we handle:
          - Auto accidents (cars, trucks, motorcycles)
          - Workplace injuries
          - Slip and fall accidents
          - Medical malpractice
          - Product liability
          - Wrongful death
          
          Information to collect:
          1. Name and phone number
          2. Type and date of accident/injury
          3. Current medical treatment status
          4. Insurance information (if available)
          5. Whether a police report was filed
          6. If they've spoken to insurance companies
          
          Important reminders:
          - Advise not to give statements to insurance without attorney
          - Statute of limitations in NC is generally 3 years
          - We work on contingency - no upfront costs`,
                },
                {
                    name: 'Criminal Defense Assistant',
                    practiceArea: 'criminal_defense',
                    language: 'en-US',
                    voice_id: 'eleven_monolingual_v1',
                    prompt: `You are a professional criminal defense assistant for Vasquez Law Firm.
          Help callers facing criminal charges understand their options.
          
          Key Guidelines:
          - Be non-judgmental and reassuring
          - Emphasize attorney-client privilege
          - Stress the importance of acting quickly
          - Never ask for details about the alleged crime over the phone
          
          Types of cases we handle:
          - DWI/DUI charges
          - Drug offenses
          - Assault and violent crimes
          - Theft and property crimes
          - White collar crimes
          - Traffic violations
          - Expungements
          
          Information to collect:
          1. Name and phone number
          2. Type of charges
          3. Court date (if any)
          4. Whether they're currently in custody or out
          5. County where charges were filed
          
          Important notes:
          - If calling for someone in jail, get facility info
          - Offer immediate consultation for urgent matters
          - Explain we can often appear in court for them`,
                },
                {
                    name: 'General Reception Assistant',
                    practiceArea: 'general',
                    language: 'en-US',
                    voice_id: 'eleven_monolingual_v1',
                    prompt: `You are the main reception assistant for Vasquez Law Firm, a full-service law firm.
          Route callers to the appropriate department or schedule consultations.
          
          Our practice areas:
          1. Immigration Law
          2. Personal Injury
          3. Workers' Compensation
          4. Criminal Defense
          5. Family Law
          6. Traffic Violations
          
          Key tasks:
          - Determine the caller's legal needs
          - Route to appropriate department
          - Schedule consultations
          - Provide basic information
          - Handle general inquiries
          
          Be professional, friendly, and helpful. If unsure, offer to have an attorney call back.
          
          Office hours: Monday-Friday 9 AM - 5 PM
          Emergency line available 24/7 for urgent matters`,
                },
                {
                    name: 'Asistente de Inmigración',
                    practiceArea: 'immigration_es',
                    language: 'es-ES',
                    voice_id: 'eleven_multilingual_v1',
                    prompt: `Eres un asistente legal bilingüe de inmigración para Vasquez Law Firm.
          Ayudas a personas con preguntas de inmigración y programas consultas en español.
          
          Directrices clave:
          - Sé profesional, empático y culturalmente sensible
          - Informa que consejos legales específicos requieren consulta con un abogado
          - Enfatiza nuestra experiencia ayudando a familias latinas
          - Usa un tono cálido y acogedor
          
          Servicios que ofrecemos:
          - Peticiones familiares (I-130, I-485)
          - Visas de trabajo
          - Defensa contra deportación
          - Ciudadanía y naturalización
          - DACA
          - Visa U y VAWA
          - Asilo
          
          Información a recolectar:
          1. Nombre y teléfono
          2. Tipo de problema migratorio
          3. Estatus actual (si se siente cómodo compartiendo)
          4. Urgencia del asunto
          
          Oficinas en: Raleigh, Charlotte, Winston-Salem (NC) y Orlando (FL)
          Teléfono: 1-844-YO-PELEO`,
                },
            ];
            // Create or update agents
            for (const config of agentConfigs) {
                try {
                    const agentId = await this.createOrUpdateAgent(config);
                    if (agentId) {
                        this.agents.set(config.practiceArea, agentId);
                    }
                }
                catch (error) {
                    logger_1.logger.error(`Failed to create/update agent for ${config.practiceArea}:`, error);
                    // Continue with other agents even if one fails
                }
            }
            // Store agent IDs in environment variables
            process.env.RETELL_IMMIGRATION_AGENT_ID = this.agents.get('immigration');
            process.env.RETELL_PERSONAL_INJURY_AGENT_ID = this.agents.get('personal_injury');
            process.env.RETELL_CRIMINAL_DEFENSE_AGENT_ID = this.agents.get('criminal_defense');
            process.env.RETELL_GENERAL_AGENT_ID = this.agents.get('general');
            this.initialized = true;
            logger_1.logger.info('Retell agents initialized', {
                count: this.agents.size,
                practiceAreas: Array.from(this.agents.keys()),
            });
        }
        catch (error) {
            logger_1.logger.error('Failed to initialize Retell agents:', error);
        }
    }
    static async createOrUpdateAgent(config) {
        try {
            const service = (0, index_1.getRetellService)();
            // Check if agent already exists
            const cacheKey = `retell:agent:${config.practiceArea}`;
            const cachedId = await cache_1.cache.get(cacheKey);
            if (cachedId) {
                // Update existing agent
                await service.updateAgent(cachedId, {
                    agent_name: config.name,
                    language: config.language,
                    voice_id: config.voice_id,
                    response_engine: {
                        type: 'llm_custom',
                        llm_id: process.env.RETELL_LLM_ID || 'gpt-4',
                        system_prompt: config.prompt,
                    },
                    webhook_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/webhooks/retell`,
                    interruption_sensitivity: 0.6,
                    ambient_sound: true,
                    responsiveness: 0.8,
                    voice_temperature: config.voice_settings?.temperature || 0.7,
                    voice_speed: config.voice_settings?.speed || 1.0,
                    enable_backchannel: true,
                    reminder_trigger_ms: 10000,
                    reminder_max_count: 2,
                });
                logger_1.logger.info('Updated Retell agent', {
                    agentId: cachedId,
                    practiceArea: config.practiceArea,
                });
                return cachedId;
            }
            else {
                // Create new agent
                const agent = await service.createAgent({
                    agent_name: config.name,
                    language: config.language,
                    voice_id: config.voice_id,
                    response_engine: {
                        type: 'llm_custom',
                        llm_id: process.env.RETELL_LLM_ID || 'gpt-4',
                        system_prompt: config.prompt,
                    },
                    webhook_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/webhooks/retell`,
                    interruption_sensitivity: 0.6,
                    ambient_sound: true,
                    responsiveness: 0.8,
                    voice_temperature: config.voice_settings?.temperature || 0.7,
                    voice_speed: config.voice_settings?.speed || 1.0,
                    enable_backchannel: true,
                    reminder_trigger_ms: 10000,
                    reminder_max_count: 2,
                });
                const agentId = agent.agent_id;
                // Cache the agent ID
                await cache_1.cache.set(cacheKey, agentId, cache_1.CacheTTL.EXTRA_LONG);
                logger_1.logger.info('Created new Retell agent', {
                    agentId,
                    practiceArea: config.practiceArea,
                });
                return agentId;
            }
        }
        catch (error) {
            // Log detailed error information
            if (error.response?.status === 404) {
                logger_1.logger.error('Retell API endpoint not found. Please check API version and endpoints.', {
                    endpoint: error.config?.url,
                    method: error.config?.method,
                });
            }
            else {
                logger_1.logger.error('Failed to create/update agent:', {
                    error: error.message,
                    status: error.response?.status,
                    data: error.response?.data,
                });
            }
            return null;
        }
    }
    static async getAgentForPracticeArea(practiceArea) {
        if (!this.initialized) {
            await this.initialize();
        }
        return this.agents.get(practiceArea) || this.agents.get('general') || null;
    }
    static async createAgent(config) {
        try {
            const service = (0, index_1.getRetellService)();
            const agent = await service.createAgent(config);
            return { agentId: agent.agent_id };
        }
        catch (error) {
            logger_1.logger.error('Failed to create agent:', error);
            throw error;
        }
    }
    static async updateAgent(agentId, config) {
        try {
            const service = (0, index_1.getRetellService)();
            await service.updateAgent(agentId, config);
            return { success: true };
        }
        catch (error) {
            logger_1.logger.error('Failed to update agent:', error);
            throw error;
        }
    }
    static async deleteAgent(agentId) {
        try {
            const service = (0, index_1.getRetellService)();
            await service.deleteAgent(agentId);
            // Remove from cache
            for (const [practiceArea, id] of this.agents) {
                if (id === agentId) {
                    this.agents.delete(practiceArea);
                    await cache_1.cache.delete(`retell:agent:${practiceArea}`);
                }
            }
            return { success: true };
        }
        catch (error) {
            logger_1.logger.error('Failed to delete agent:', error);
            throw error;
        }
    }
}
exports.RetellAgentManager = RetellAgentManager;
RetellAgentManager.agents = new Map();
RetellAgentManager.initialized = false;
// Initialize agents on module load if API key is available
if (process.env.RETELL_API_KEY) {
    RetellAgentManager.initialize().catch(err => logger_1.logger.error('Failed to auto-initialize Retell agents:', err));
}
// Export statement removed - class is already exported
