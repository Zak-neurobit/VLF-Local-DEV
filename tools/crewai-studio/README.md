# VLF CrewAI-Studio

AI Agent Management Interface for Vasquez Law Firm

## Overview

This is a Gradio-based interface for managing and executing the VLF CrewAI agents. It provides a user-friendly web interface to:

- Execute individual AI agents
- Configure agent parameters
- Build multi-agent workflows
- Monitor agent performance
- Train agents with legal data

## Installation

1. **Install dependencies** (already done):
   ```bash
   python3 setup.py
   ```

2. **Activate virtual environment**:
   ```bash
   source venv/bin/activate  # On macOS/Linux
   # or
   venv\Scripts\activate  # On Windows
   ```

## Usage

### Quick Start

1. **Start the main VLF website** (required for agent API endpoints):
   ```bash
   cd ../..  # Go to VLF Website root
   npm run dev
   ```

2. **Launch CrewAI-Studio**:
   ```bash
   ./launch.sh
   ```

3. **Access the interface**:
   Open http://localhost:7860 in your browser

### Available Agents

- **Legal Consultation Agent** - Provides legal advice for immigration, personal injury, and criminal defense
- **Document Analysis Agent** - Analyzes legal documents and extracts key information
- **Case Intake Agent** - Handles client intake and case evaluation
- **SEO Content Generation Agent** - Creates SEO-optimized legal content
- **Appointment Scheduling Agent** - Schedules consultations with attorneys
- **Lead Validation Agent** - Validates and qualifies potential client leads

### Features

#### 1. Execute Agents Tab
- Select an agent from the dropdown
- Enter your query or document text
- Configure advanced parameters (language, temperature, iterations)
- Execute and view results in JSON format

#### 2. Agent Configuration Tab
- Customize agent roles, goals, and backstories
- Select available tools for each agent
- Choose LLM models (GPT-4, GPT-3.5, Claude, etc.)
- Save configurations

#### 3. Workflow Builder Tab
- Create multi-agent workflows
- Define agent execution sequences
- Describe workflow purposes
- Save and execute workflows

#### 4. Analytics & Monitoring Tab
- View agent performance metrics
- Monitor success rates and response times
- Track recent activities
- Analyze usage patterns

#### 5. Agent Training Tab
- Upload training data (PDF, TXT, JSON, CSV)
- Select training types (Supervised, Reinforcement, Few-Shot)
- Train specific agents with legal documents
- Improve agent performance

## API Integration

The CrewAI-Studio integrates with the existing TypeScript/Next.js agents through the API bridge:

- **API Bridge**: `api_bridge.py` - Connects Python interface to TypeScript agents
- **Endpoints**: Uses existing `/api/crewai/*` endpoints from the main website
- **Real-time**: Supports WebSocket connections for real-time agent responses

## Configuration

Agent configurations are stored in `agent_config.json`:

```json
{
  "agents": {
    "legal_consultation": {
      "name": "Legal Consultation Agent",
      "endpoint": "/api/crewai/legal-consultation",
      "model": "gpt-4",
      "temperature": 0.7
    }
  }
}
```

## Development

To modify the interface:

1. Edit `gradio_interface.py` for UI changes
2. Update `api_bridge.py` for API integration changes
3. Modify `agent_config.json` for agent configurations

## Troubleshooting

1. **"VLF website doesn't appear to be running"**
   - Start the main website: `npm run dev` in the VLF Website root

2. **"Module not found" errors**
   - Activate the virtual environment: `source venv/bin/activate`

3. **Agent execution fails**
   - Check that the API endpoints are accessible
   - Verify agent configurations in `agent_config.json`

## Security Notes

- The interface runs locally on port 7860
- API requests are sent to localhost:3000
- No external connections unless explicitly configured
- All agent interactions are logged for audit purposes

## Support

For issues or questions:
- Check the logs in `../../logs/`
- Review agent configurations
- Ensure all services are running