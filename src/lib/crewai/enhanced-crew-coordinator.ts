import { logger } from '@/lib/logger';
import { EnhancedAffirmativeImmigrationAgent } from './agents/enhanced-affirmative-immigration-agent';
import { EnhancedHumanitarianAgent } from './agents/enhanced-humanitarian-agent';
import { EnhancedBusinessImmigrationAgent } from './agents/enhanced-business-immigration-agent';
import { RemovalDefenseAgent } from './agents/removal-defense-agent';
import { CriminalDefenseAgent } from './agents/criminal-defense-agent';
import { DocumentAnalysisAgent } from './agents/document-analysis-agent';
import { AppointmentSchedulingAgent } from './agents/appointment-scheduling-agent';

export class EnhancedCrewCoordinator {
  private affirmativeAgent: EnhancedAffirmativeImmigrationAgent;
  private humanitarianAgent: EnhancedHumanitarianAgent;
  private businessAgent: EnhancedBusinessImmigrationAgent;
  private removalAgent: RemovalDefenseAgent;
  private criminalAgent: CriminalDefenseAgent;
  private documentAgent: DocumentAnalysisAgent;
  private schedulingAgent: AppointmentSchedulingAgent;

  constructor() {
    // Initialize all enhanced agents
    this.affirmativeAgent = new EnhancedAffirmativeImmigrationAgent();
    this.humanitarianAgent = new EnhancedHumanitarianAgent();
    this.businessAgent = new EnhancedBusinessImmigrationAgent();
    this.removalAgent = new RemovalDefenseAgent();
    this.criminalAgent = new CriminalDefenseAgent();
    this.documentAgent = new DocumentAnalysisAgent();
    this.schedulingAgent = new AppointmentSchedulingAgent();

    logger.info('Enhanced CrewAI agents initialized with AILA Cookbook training');
  }

  async routeQuery(query: string, context?: any): Promise<any> {
    // Analyze query to determine which agent(s) to use
    const routing = await this.analyzeQuery(query);
    
    logger.info(`Routing to ${routing.primaryAgent} agent`, { 
      query: query.substring(0, 100),
      agents: routing.agents 
    });

    // Route to appropriate agent(s)
    switch (routing.primaryAgent) {
      case 'affirmative':
        return this.handleAffirmativeQuery(query, context);
      case 'humanitarian':
        return this.handleHumanitarianQuery(query, context);
      case 'business':
        return this.handleBusinessQuery(query, context);
      case 'removal':
        return this.handleRemovalQuery(query, context);
      case 'criminal':
        return this.handleCriminalQuery(query, context);
      default:
        return this.handleGeneralQuery(query, context);
    }
  }

  private async analyzeQuery(query: string): Promise<{ primaryAgent: string; agents: string[] }> {
    const queryLower = query.toLowerCase();
    
    // Keywords for routing
    const routingRules = {
      affirmative: ['family', 'marriage', 'spouse', 'parent', 'child', 'sibling', 'k-1', 'fiancé', 
                    'naturalization', 'citizenship', 'n-400', 'n-600', 'i-130', 'i-485', 'green card',
                    'adjustment', 'consular', 'i-751', 'permanent resident'],
      humanitarian: ['asylum', 'refugee', 'persecution', 'torture', 'u visa', 't visa', 'vawa',
                     'violence', 'trafficking', 'crime victim', 'tps', 'temporary protected', 'daca',
                     'humanitarian parole', 'withholding', 'cat protection'],
      business: ['h-1b', 'h1b', 'l-1', 'l1', 'o-1', 'o1', 'e-2', 'e2', 'eb-1', 'eb1', 'eb-2', 'eb2',
                 'perm', 'labor certification', 'employment', 'work visa', 'investor', 'extraordinary',
                 'multinational', 'transfer', 'specialty occupation', 'niw', 'national interest'],
      removal: ['deportation', 'removal', 'detained', 'ice', 'immigration court', 'bond', 'judge',
                'cancellation', 'notice to appear', 'nta', 'master calendar', 'individual hearing'],
      criminal: ['arrest', 'criminal', 'charge', 'conviction', 'dui', 'dwi', 'assault', 'theft',
                 'drug', 'felony', 'misdemeanor', 'expunge', 'post-conviction'],
    };

    const matches = { affirmative: 0, humanitarian: 0, business: 0, removal: 0, criminal: 0 };
    
    for (const [agent, keywords] of Object.entries(routingRules)) {
      keywords.forEach(keyword => {
        if (queryLower.includes(keyword)) {
          matches[agent as keyof typeof matches]++;
        }
      });
    }

    // Determine primary agent
    const primaryAgent = Object.entries(matches)
      .sort(([, a], [, b]) => b - a)[0][0];

    // Get all matching agents
    const agents = Object.entries(matches)
      .filter(([, count]) => count > 0)
      .map(([agent]) => agent);

    return { primaryAgent, agents };
  }

  private async handleAffirmativeQuery(query: string, context?: any): Promise<any> {
    // Extract relevant parameters from query
    if (query.toLowerCase().includes('naturalization') || query.toLowerCase().includes('n-400')) {
      return this.affirmativeAgent.prepareNaturalization({
        clientName: context?.clientName || 'Client',
        greenCardDate: context?.greenCardDate || 'Unknown',
        physicalPresence: context?.physicalPresence || 'To be determined',
        continuousResidence: context?.continuousResidence || 'To be determined',
        criminalHistory: context?.criminalHistory,
        englishAbility: context?.englishAbility || 'To be assessed',
      });
    } else if (query.toLowerCase().includes('family') || query.toLowerCase().includes('i-130')) {
      return this.affirmativeAgent.analyzeFamilyPetition({
        petitioner: context?.petitioner || 'Petitioner',
        beneficiary: context?.beneficiary || 'Beneficiary',
        relationship: context?.relationship || 'To be determined',
        petitionerStatus: context?.petitionerStatus || 'USC',
        beneficiaryLocation: context?.beneficiaryLocation || 'abroad',
      });
    } else {
      return this.affirmativeAgent.analyzeConsularProcess({
        caseType: context?.caseType || 'Family-based',
        beneficiaryCountry: context?.beneficiaryCountry || 'Unknown',
        documentReadiness: context?.documentReadiness || 'To be assessed',
        previousDenials: context?.previousDenials,
        unlawfulPresence: context?.unlawfulPresence,
      });
    }
  }

  private async handleHumanitarianQuery(query: string, context?: any): Promise<any> {
    if (query.toLowerCase().includes('asylum')) {
      return this.humanitarianAgent.analyzeAsylumClaim({
        clientName: context?.clientName || 'Client',
        countryOfOrigin: context?.countryOfOrigin || 'Unknown',
        persecutionType: context?.persecutionType || 'To be determined',
        protectedGround: context?.protectedGround || 'To be determined',
        entryDate: context?.entryDate || 'Unknown',
        previousApplications: context?.previousApplications,
      });
    } else if (query.toLowerCase().includes('u visa')) {
      return this.humanitarianAgent.prepareUVisa({
        clientName: context?.clientName || 'Client',
        crimeType: context?.crimeType || 'To be determined',
        harmSuffered: context?.harmSuffered || 'To be documented',
        lawEnforcementCooperation: context?.lawEnforcementCooperation || 'To be assessed',
        certificationStatus: context?.certificationStatus || 'Not yet obtained',
      });
    } else {
      return this.humanitarianAgent.assessTPS({
        clientName: context?.clientName || 'Client',
        country: context?.country || 'Unknown',
        entryDate: context?.entryDate || 'Unknown',
        continuousPresence: context?.continuousPresence || 'To be documented',
        criminalHistory: context?.criminalHistory,
      });
    }
  }

  private async handleBusinessQuery(query: string, context?: any): Promise<any> {
    if (query.toLowerCase().includes('h-1b') || query.toLowerCase().includes('h1b')) {
      return this.businessAgent.analyzeH1B({
        position: context?.position || 'Position',
        degree: context?.degree || 'Degree',
        salary: context?.salary || 'TBD',
        jobDuties: context?.jobDuties || 'To be detailed',
        employerType: context?.employerType || 'Private company',
        capSubject: context?.capSubject !== false,
      });
    } else if (query.toLowerCase().includes('perm') || query.toLowerCase().includes('labor certification')) {
      return this.businessAgent.preparePERM({
        position: context?.position || 'Position',
        requirements: context?.requirements || 'To be determined',
        salary: context?.salary || 'TBD',
        location: context?.location || 'Location',
        foreignNational: context?.foreignNational || 'Employee',
        recruitmentReady: context?.recruitmentReady || false,
      });
    } else if (query.toLowerCase().includes('l-1') || query.toLowerCase().includes('l1')) {
      return this.businessAgent.analyzeL1({
        category: context?.category || 'L-1A',
        foreignEntity: context?.foreignEntity || 'Foreign Company',
        usEntity: context?.usEntity || 'US Company',
        position: context?.position || 'Position',
        timeAbroad: context?.timeAbroad || 'To be verified',
        relationship: context?.relationship || 'To be documented',
      });
    } else {
      return this.businessAgent.assessEB1({
        category: context?.category || 'EB-1A',
        achievements: context?.achievements || 'To be documented',
        evidence: context?.evidence || 'To be gathered',
        field: context?.field || 'Field of expertise',
        currentPosition: context?.currentPosition,
      });
    }
  }

  private async handleRemovalQuery(query: string, context?: any): Promise<any> {
    return this.removalAgent.analyzeCase({
      clientName: context?.clientName || 'Client',
      isDetained: context?.isDetained || false,
      detentionCenter: context?.detentionCenter,
      hasCourtDate: context?.hasCourtDate || false,
      courtDate: context?.courtDate,
      criminalHistory: context?.criminalHistory,
      timeInUS: context?.timeInUS,
      familyTies: context?.familyTies,
      previousApplications: context?.previousApplications,
    });
  }

  private async handleCriminalQuery(query: string, context?: any): Promise<any> {
    return this.criminalAgent.analyzeCase({
      charges: context?.charges || 'To be specified',
      jurisdiction: 'North Carolina',
      arrestDate: context?.arrestDate,
      courtDate: context?.courtDate,
      priorRecord: context?.priorRecord,
      immigrationStatus: context?.immigrationStatus,
    });
  }

  private async handleGeneralQuery(query: string, context?: any): Promise<any> {
    // For general queries, provide routing information
    return {
      message: 'Please specify your legal need for appropriate assistance',
      availableServices: [
        'Family Immigration & Citizenship (I-130, N-400, Consular Processing)',
        'Humanitarian Protection (Asylum, U/T Visas, VAWA, TPS)',
        'Business Immigration (H-1B, L-1, O-1, PERM, EB categories)',
        'Removal Defense & Immigration Court',
        'Criminal Defense & Immigration Consequences',
      ],
      recommendation: 'For immediate assistance, please provide more details about your situation.',
    };
  }
}

// Export singleton instance
export const enhancedCrewCoordinator = new EnhancedCrewCoordinator();
