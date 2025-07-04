# CrewAI Agent Training System

## Overview
The CrewAI agents have been successfully trained using the AILA Cookbook of Essential Practice Materials (4th Edition). This comprehensive training enhances the agents' expertise with real-world immigration law knowledge, forms, procedures, and best practices.

## Trained Agents

### 1. Enhanced Affirmative Immigration Agent
**Expertise**: Family-based immigration, naturalization, and affirmative applications

**Specializations**:
- I-130/I-485 family petitions
- K-1 fiancé visas
- N-400 naturalization
- N-600 certificates of citizenship
- Consular processing
- I-751 removal of conditions
- I-90 green card renewals

**Key Methods**:
- `analyzeFamilyPetition()` - Evaluates family-based cases
- `prepareNaturalization()` - Assesses citizenship eligibility
- `analyzeConsularProcess()` - Guides through embassy/consulate procedures

### 2. Enhanced Humanitarian Agent
**Expertise**: Humanitarian relief, asylum, and victim protection

**Specializations**:
- Asylum and refugee protection
- U visa for crime victims
- T visa for trafficking victims
- VAWA self-petitions
- TPS applications
- DACA renewals
- Humanitarian parole
- Cancellation of removal
- Withholding and CAT protection

**Key Methods**:
- `analyzeAsylumClaim()` - Evaluates persecution claims
- `prepareUVisa()` - Assesses crime victim eligibility
- `assessTPS()` - Reviews Temporary Protected Status
- `analyzeVAWA()` - Handles domestic violence cases

### 3. Enhanced Business Immigration Agent
**Expertise**: Employment-based immigration and business visas

**Specializations**:
- H-1B specialty occupation
- L-1 intracompany transfers
- O-1 extraordinary ability
- E-1/E-2 treaty traders/investors
- PERM labor certification
- EB-1 extraordinary ability/multinational managers
- EB-2 NIW national interest waivers
- EB-5 investor visas
- TN NAFTA professionals
- R-1 religious workers

**Key Methods**:
- `analyzeH1B()` - H-1B eligibility and strategy
- `preparePERM()` - Labor certification planning
- `assessEB1()` - Extraordinary ability evaluation
- `analyzeL1()` - Intracompany transfer assessment

## Knowledge Base Components

Each agent has been trained with:

### 1. Forms Knowledge
- Complete list of required USCIS forms for each visa type
- Supporting documentation requirements
- Form-specific instructions and tips

### 2. Procedural Workflows
- Step-by-step processes for each application type
- Critical deadlines and timing considerations
- Government agency interactions

### 3. Processing Timelines
- Current USCIS processing times
- Premium processing availability
- Factors affecting timeline variations

### 4. Requirements Database
- Detailed eligibility criteria
- Documentary evidence needs
- Legal standards and precedents

### 5. Best Practices
- Common pitfalls to avoid
- Success strategies from experienced practitioners
- Document preparation tips

### 6. Common Issues & Solutions
- Frequent RFE triggers
- Denial reasons and how to avoid them
- Complex case scenarios

## Implementation Details

### Training Data Structure
```typescript
{
  affirmative: {
    expertise: string,
    knowledge: {
      forms: string[],
      procedures: string[],
      timelines: string[],
      requirements: string[],
      bestPractices: string[],
      commonIssues: string[]
    },
    specializations: string[]
  },
  // Similar structure for humanitarian and business
}
```

### Agent Architecture
- Each agent extends a base class with OpenAI GPT-4 integration
- System prompts include comprehensive AILA Cookbook knowledge
- Specialized methods for common case types
- Fallback mock responses for testing/demo purposes

## Usage Examples

### Family Petition Analysis
```typescript
const result = await affirmativeAgent.analyzeFamilyPetition({
  petitioner: 'John Smith',
  beneficiary: 'Maria Garcia',
  relationship: 'spouse',
  petitionerStatus: 'USC',
  beneficiaryLocation: 'abroad'
});
```

### H-1B Assessment
```typescript
const result = await businessAgent.analyzeH1B({
  position: 'Software Engineer',
  degree: 'Bachelor in Computer Science',
  salary: '$85,000',
  jobDuties: 'Design and develop software',
  employerType: 'Technology company',
  capSubject: true
});
```

### Asylum Evaluation
```typescript
const result = await humanitarianAgent.analyzeAsylumClaim({
  clientName: 'Client Name',
  countryOfOrigin: 'Venezuela',
  persecutionType: 'Political opinion',
  protectedGround: 'Political opinion',
  entryDate: '2024-01-15'
});
```

## Testing & Verification

### Test Script
Run `npm run test:agents` or `npx tsx scripts/test-trained-agents.ts`

### Test Coverage
- Family-based immigration scenarios
- Business visa applications
- Humanitarian protection cases
- Complex multi-issue cases
- Edge cases and exceptions

## Maintenance & Updates

### Adding New Knowledge
1. Update the `CookbookExtractor` class with new categories
2. Run the training script: `npx tsx scripts/train-agents.ts`
3. Test the updated agents

### Updating Processing Times
- Modify timeline data in the training system
- Re-run training to update all agents

### Adding New Visa Categories
1. Add to appropriate category in `categoryMappings`
2. Include in knowledge extraction methods
3. Add specialized methods if needed

## Integration with Main System

The enhanced agents are integrated through:
1. `EnhancedCrewCoordinator` - Routes queries to appropriate agents
2. Query analysis system - Identifies keywords and routes intelligently
3. Context passing - Maintains conversation state across agents

## Best Practices for Developers

1. **Always use context**: Pass relevant context when calling agent methods
2. **Handle fallbacks**: Agents return mock data when AI is unavailable
3. **Log interactions**: All agent calls are logged for debugging
4. **Test thoroughly**: Use the test script after any changes

## Future Enhancements

1. **Real-time updates**: Connect to USCIS processing time API
2. **Case precedent database**: Include BIA and AAO decisions
3. **Multi-language support**: Extend training for Spanish language
4. **Document generation**: Create draft petitions and letters
5. **Case timeline tracking**: Monitor case progress automatically

## Troubleshooting

### Common Issues
1. **API key not configured**: Set OPENAI_API_KEY in .env
2. **Mock responses only**: Check API key and network connection
3. **Routing errors**: Verify keywords in routing rules

### Debug Mode
Set `LOG_LEVEL=debug` for detailed agent decision logging

## Security Considerations

1. **No sensitive data in training**: Only public legal information used
2. **Client data isolation**: Each query is stateless
3. **API key protection**: Never expose in client code
4. **Rate limiting**: Implemented in API safety wrapper

---

Last Updated: January 2025
Training Source: AILA Cookbook of Essential Practice Materials (4th Edition)