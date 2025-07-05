#!/usr/bin/env python3
"""
Gradio Interface for Vasquez Law Firm CrewAI Agents
"""

import gradio as gr
import json
import os
import sys
from datetime import datetime
from typing import Dict, List, Any
import asyncio
from pathlib import Path

# Add parent directory to path to import VLF modules
sys.path.append(str(Path(__file__).parent.parent.parent))

# Import the API bridge
from api_bridge import GradioIntegration

class VLFCrewAIInterface:
    """Interface for VLF CrewAI agents"""
    
    def __init__(self):
        self.integration = GradioIntegration()
        self.agent_descriptions = {
            "Legal Consultation Agent": {
                "description": "AI-powered legal consultation for immigration, personal injury, and criminal defense",
                "icon": "⚖️"
            },
            "Document Analysis Agent": {
                "description": "Analyze legal documents and extract key information",
                "icon": "📄"
            },
            "Case Intake Agent": {
                "description": "Automated client intake and case evaluation",
                "icon": "📋"
            },
            "SEO Content Generation Agent": {
                "description": "Generate SEO-optimized legal content and blog posts",
                "icon": "✍️"
            },
            "Appointment Scheduling Agent": {
                "description": "Schedule consultations with attorneys",
                "icon": "📅"
            },
            "Lead Validation Agent": {
                "description": "Validate and qualify potential client leads",
                "icon": "🎯"
            }
        }
        
        # Get actual agents from bridge
        self.agents = {}
        for agent_name in self.integration.get_available_agents():
            if agent_name in self.agent_descriptions:
                self.agents[agent_name] = self.agent_descriptions[agent_name]
            else:
                self.agents[agent_name] = {
                    "description": f"AI-powered {agent_name.lower()}",
                    "icon": "🤖"
                }
        
    async def process_request(self, agent_type: str, input_text: str, parameters: Dict[str, Any]) -> str:
        """Process a request through the selected agent"""
        
        try:
            return await self.integration.process_gradio_request(agent_type, input_text, parameters)
        except Exception as e:
            response = {
                "agent": agent_type,
                "timestamp": datetime.now().isoformat(),
                "input": input_text,
                "parameters": parameters,
                "result": f"Error processing request: {str(e)}",
                "status": "error"
            }
            return json.dumps(response, indent=2)

# Initialize interface
interface = VLFCrewAIInterface()

# Custom CSS for VLF branding
custom_css = """
.gradio-container {
    font-family: 'Arial', sans-serif;
}
.gr-button-primary {
    background-color: #6B1F2E !important;
    border-color: #6B1F2E !important;
}
.gr-button-primary:hover {
    background-color: #8B2635 !important;
    border-color: #8B2635 !important;
}
.header-text {
    color: #6B1F2E;
    text-align: center;
    margin-bottom: 20px;
}
.agent-card {
    border: 1px solid #C9974D;
    border-radius: 8px;
    padding: 10px;
    margin: 5px 0;
}
"""

# Create Gradio interface
with gr.Blocks(css=custom_css, title="VLF CrewAI Studio") as app:
    gr.HTML("""
        <div class="header-text">
            <h1>⚖️ Vasquez Law Firm - CrewAI Studio</h1>
            <p>AI-Powered Legal Assistance - YO PELEO POR TI™</p>
        </div>
    """)
    
    with gr.Tabs():
        # Agent Execution Tab
        with gr.TabItem("🤖 Execute Agents"):
            with gr.Row():
                with gr.Column(scale=1):
                    agent_selector = gr.Dropdown(
                        choices=list(interface.agents.keys()),
                        label="Select Agent",
                        value="Legal Consultation Agent" if "Legal Consultation Agent" in interface.agents else list(interface.agents.keys())[0] if interface.agents else None
                    )
                    
                    # Display agent description
                    agent_info = gr.Markdown("")
                    
                    def update_agent_info(agent_name):
                        agent = interface.agents.get(agent_name, {})
                        return f"**{agent.get('icon', '')} {agent_name}**\n\n{agent.get('description', '')}"
                    
                    agent_selector.change(
                        update_agent_info,
                        inputs=[agent_selector],
                        outputs=[agent_info]
                    )
                    
                with gr.Column(scale=2):
                    input_text = gr.Textbox(
                        label="Input",
                        placeholder="Enter your query or paste document text here...",
                        lines=10
                    )
                    
                    with gr.Accordion("Advanced Parameters", open=False):
                        language = gr.Radio(
                            choices=["English", "Spanish"],
                            label="Language",
                            value="English"
                        )
                        
                        temperature = gr.Slider(
                            minimum=0.0,
                            maximum=1.0,
                            value=0.7,
                            step=0.1,
                            label="Creativity (Temperature)"
                        )
                        
                        max_iterations = gr.Number(
                            value=3,
                            label="Max Iterations",
                            precision=0
                        )
                    
                    execute_btn = gr.Button("🚀 Execute Agent", variant="primary")
                    
                    output = gr.Code(
                        label="Agent Response",
                        language="json",
                        lines=15
                    )
            
            # Connect execute button
            async def execute_agent(agent_type, input_text, language, temperature, max_iterations):
                parameters = {
                    "language": language,
                    "temperature": temperature,
                    "max_iterations": int(max_iterations)
                }
                return await interface.process_request(agent_type, input_text, parameters)
            
            execute_btn.click(
                execute_agent,
                inputs=[agent_selector, input_text, language, temperature, max_iterations],
                outputs=[output]
            )
        
        # Agent Management Tab
        with gr.TabItem("⚙️ Agent Configuration"):
            gr.Markdown("""
            ### Configure CrewAI Agents
            
            This section allows you to configure and customize the behavior of each agent.
            """)
            
            config_agent = gr.Dropdown(
                choices=list(interface.agents.keys()),
                label="Select Agent to Configure",
                value=list(interface.agents.keys())[0] if interface.agents else None
            )
            
            with gr.Row():
                with gr.Column():
                    gr.Markdown("#### Agent Settings")
                    role = gr.Textbox(label="Role", value="Legal Assistant")
                    goal = gr.Textbox(label="Goal", lines=3)
                    backstory = gr.Textbox(label="Backstory", lines=5)
                    
                with gr.Column():
                    gr.Markdown("#### Tools & Capabilities")
                    tools = gr.CheckboxGroup(
                        choices=[
                            "Web Search",
                            "Document Analysis",
                            "Database Query",
                            "Email Integration",
                            "Calendar Access",
                            "CRM Integration"
                        ],
                        label="Available Tools"
                    )
                    
                    llm_model = gr.Dropdown(
                        choices=["gpt-4", "gpt-3.5-turbo", "claude-3", "llama-2"],
                        label="LLM Model",
                        value="gpt-4"
                    )
            
            save_config_btn = gr.Button("💾 Save Configuration")
            config_status = gr.Markdown("")
        
        # Workflow Builder Tab
        with gr.TabItem("🔄 Workflow Builder"):
            gr.Markdown("""
            ### Create Multi-Agent Workflows
            
            Design complex workflows that combine multiple agents to handle sophisticated legal tasks.
            """)
            
            workflow_name = gr.Textbox(label="Workflow Name", placeholder="e.g., Complete Immigration Case Processing")
            
            with gr.Row():
                agent_sequence = gr.CheckboxGroup(
                    choices=list(interface.agents.keys()),
                    label="Select Agents (in execution order)"
                )
            
            workflow_description = gr.Textbox(
                label="Workflow Description",
                lines=3,
                placeholder="Describe what this workflow accomplishes..."
            )
            
            create_workflow_btn = gr.Button("🔨 Create Workflow")
            workflow_status = gr.Markdown("")
        
        # Analytics Tab
        with gr.TabItem("📊 Analytics & Monitoring"):
            gr.Markdown("""
            ### Agent Performance Analytics
            
            Monitor agent performance, success rates, and resource usage.
            """)
            
            with gr.Row():
                with gr.Column():
                    gr.Markdown("#### Performance Metrics")
                    # Placeholder for performance chart
                    gr.HTML("""
                        <div style="border: 1px solid #ddd; padding: 20px; text-align: center;">
                            <p>Performance charts will be displayed here</p>
                            <p>📈 Success Rate: 95%</p>
                            <p>⏱️ Avg Response Time: 2.3s</p>
                            <p>📊 Total Requests: 1,234</p>
                        </div>
                    """)
                
                with gr.Column():
                    gr.Markdown("#### Recent Activities")
                    activities = gr.Dataframe(
                        headers=["Timestamp", "Agent", "Status", "Duration"],
                        datatype=["str", "str", "str", "str"],
                        value=[
                            ["2024-01-04 10:30", "Legal Consultation", "✅ Success", "1.8s"],
                            ["2024-01-04 10:25", "Document Analysis", "✅ Success", "3.2s"],
                            ["2024-01-04 10:20", "Case Intake", "✅ Success", "2.1s"],
                        ]
                    )
        
        # Training Tab
        with gr.TabItem("🎓 Agent Training"):
            gr.Markdown("""
            ### Train Agents with Legal Data
            
            Upload legal documents, case studies, and examples to improve agent performance.
            """)
            
            training_agent = gr.Dropdown(
                choices=list(interface.agents.keys()),
                label="Select Agent to Train",
                value=list(interface.agents.keys())[0] if interface.agents else None
            )
            
            training_data = gr.File(
                label="Upload Training Data",
                file_types=[".txt", ".pdf", ".json", ".csv"]
            )
            
            training_type = gr.Radio(
                choices=["Supervised", "Reinforcement", "Few-Shot"],
                label="Training Type",
                value="Few-Shot"
            )
            
            start_training_btn = gr.Button("🏋️ Start Training")
            training_progress = gr.Progress()
            training_status = gr.Markdown("")
    
    gr.HTML("""
        <div style="text-align: center; margin-top: 40px; color: #666;">
            <p>Powered by CrewAI | Vasquez Law Firm, PLLC | 1-844-YO-PELEO</p>
        </div>
    """)

def main():
    """Launch the Gradio interface"""
    print("🚀 Launching VLF CrewAI Studio...")
    print("📍 Access at: http://localhost:7860")
    
    app.launch(
        server_name="0.0.0.0",
        server_port=7860,
        share=False,
        inbrowser=True
    )

if __name__ == "__main__":
    main()