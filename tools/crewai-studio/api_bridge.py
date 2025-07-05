#!/usr/bin/env python3
"""
API Bridge for VLF CrewAI Agents
Connects the TypeScript agents to the Python Gradio interface
"""

import os
import sys
import json
import asyncio
import aiohttp
from typing import Dict, Any, Optional
from datetime import datetime
from pathlib import Path

# Add parent directory to path
sys.path.append(str(Path(__file__).parent.parent.parent))

class VLFAgentBridge:
    """Bridge between TypeScript agents and Python interface"""
    
    def __init__(self, base_url: str = "http://localhost:3000"):
        self.base_url = base_url
        self.agents = self._load_agent_config()
        
    def _load_agent_config(self) -> Dict[str, Any]:
        """Load agent configuration from JSON file"""
        config_path = Path(__file__).parent / "agent_config.json"
        with open(config_path, 'r') as f:
            return json.load(f)
    
    async def execute_agent(self, agent_name: str, input_data: Dict[str, Any]) -> Dict[str, Any]:
        """Execute an agent through the TypeScript API"""
        
        # Find agent configuration
        agent_key = agent_name.lower().replace(' ', '_')
        agent_config = None
        
        for key, config in self.agents['agents'].items():
            if config['name'] == agent_name:
                agent_config = config
                break
        
        if not agent_config:
            return {
                "status": "error",
                "message": f"Agent '{agent_name}' not found"
            }
        
        # Make API request to TypeScript endpoint
        try:
            async with aiohttp.ClientSession() as session:
                url = f"{self.base_url}{agent_config['endpoint']}"
                
                # Prepare request data
                request_data = {
                    "input": input_data.get("input", ""),
                    "language": input_data.get("language", "en"),
                    "parameters": {
                        "temperature": input_data.get("temperature", agent_config['temperature']),
                        "max_iterations": input_data.get("max_iterations", agent_config['max_iterations']),
                        "model": agent_config['model']
                    }
                }
                
                async with session.post(url, json=request_data) as response:
                    if response.status == 200:
                        result = await response.json()
                        return {
                            "status": "success",
                            "agent": agent_name,
                            "timestamp": datetime.now().isoformat(),
                            "input": input_data,
                            "result": result
                        }
                    else:
                        return {
                            "status": "error",
                            "message": f"API request failed with status {response.status}",
                            "details": await response.text()
                        }
                        
        except Exception as e:
            return {
                "status": "error",
                "message": f"Error executing agent: {str(e)}"
            }
    
    async def execute_workflow(self, workflow_name: str, initial_input: Dict[str, Any]) -> Dict[str, Any]:
        """Execute a multi-agent workflow"""
        
        workflow = self.agents['workflows'].get(workflow_name)
        if not workflow:
            return {
                "status": "error",
                "message": f"Workflow '{workflow_name}' not found"
            }
        
        results = []
        current_input = initial_input
        
        for step in workflow['steps']:
            agent_name = None
            for key, config in self.agents['agents'].items():
                if key == step['agent']:
                    agent_name = config['name']
                    break
            
            if not agent_name:
                return {
                    "status": "error",
                    "message": f"Agent '{step['agent']}' not found in workflow"
                }
            
            # Execute agent
            result = await self.execute_agent(agent_name, current_input)
            results.append(result)
            
            if result['status'] == 'error':
                return {
                    "status": "error",
                    "message": f"Workflow failed at step {step['agent']}",
                    "details": result
                }
            
            # Use output as input for next step
            if 'result' in result:
                current_input = {
                    "input": result['result'],
                    "previous_step": step['agent']
                }
        
        return {
            "status": "success",
            "workflow": workflow_name,
            "timestamp": datetime.now().isoformat(),
            "steps": results
        }
    
    async def get_agent_status(self) -> Dict[str, Any]:
        """Get status of all agents"""
        
        status = {
            "timestamp": datetime.now().isoformat(),
            "agents": {}
        }
        
        for key, config in self.agents['agents'].items():
            try:
                async with aiohttp.ClientSession() as session:
                    url = f"{self.base_url}/health"
                    async with session.get(url) as response:
                        if response.status == 200:
                            status['agents'][config['name']] = "online"
                        else:
                            status['agents'][config['name']] = "offline"
            except:
                status['agents'][config['name']] = "offline"
        
        return status

# Integration with Gradio interface
class GradioIntegration:
    """Integration layer for Gradio interface"""
    
    def __init__(self):
        self.bridge = VLFAgentBridge()
    
    async def process_gradio_request(self, agent_type: str, input_text: str, parameters: Dict[str, Any]) -> str:
        """Process request from Gradio interface"""
        
        input_data = {
            "input": input_text,
            "language": parameters.get("language", "English").lower()[:2],
            "temperature": parameters.get("temperature", 0.7),
            "max_iterations": parameters.get("max_iterations", 3)
        }
        
        result = await self.bridge.execute_agent(agent_type, input_data)
        return json.dumps(result, indent=2)
    
    async def process_workflow_request(self, workflow_name: str, initial_input: str) -> str:
        """Process workflow request from Gradio interface"""
        
        input_data = {
            "input": initial_input
        }
        
        result = await self.bridge.execute_workflow(workflow_name, input_data)
        return json.dumps(result, indent=2)
    
    def get_available_agents(self) -> list:
        """Get list of available agents for Gradio dropdown"""
        return [config['name'] for config in self.bridge.agents['agents'].values()]
    
    def get_available_workflows(self) -> list:
        """Get list of available workflows for Gradio dropdown"""
        return [config['name'] for config in self.bridge.agents['workflows'].values()]

# Standalone test function
async def test_bridge():
    """Test the agent bridge"""
    print("Testing VLF Agent Bridge...")
    
    bridge = VLFAgentBridge()
    
    # Test agent execution
    test_input = {
        "input": "I need help with my immigration case",
        "language": "en"
    }
    
    print("\nTesting Legal Consultation Agent...")
    result = await bridge.execute_agent("Legal Consultation Agent", test_input)
    print(json.dumps(result, indent=2))
    
    # Test workflow
    print("\nTesting Complete Client Onboarding workflow...")
    workflow_input = {
        "input": "John Doe, john@example.com, immigration case"
    }
    
    workflow_result = await bridge.execute_workflow("complete_client_onboarding", workflow_input)
    print(json.dumps(workflow_result, indent=2))
    
    # Test status
    print("\nChecking agent status...")
    status = await bridge.get_agent_status()
    print(json.dumps(status, indent=2))

if __name__ == "__main__":
    asyncio.run(test_bridge())