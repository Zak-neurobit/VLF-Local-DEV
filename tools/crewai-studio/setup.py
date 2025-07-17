#!/usr/bin/env python3
"""
CrewAI-Studio Setup for Vasquez Law Firm
This script sets up CrewAI-Studio and integrates it with our existing agents
"""

import os
import sys
import subprocess
import json
from pathlib import Path

def setup_crewai_studio():
    """Set up CrewAI-Studio for VLF agents"""
    
    print("🚀 Setting up CrewAI-Studio for Vasquez Law Firm...")
    
    # Create virtual environment
    print("\n📦 Creating Python virtual environment...")
    subprocess.run([sys.executable, "-m", "venv", "venv"], check=True)
    
    # Activate virtual environment
    if os.name == 'nt':  # Windows
        pip_path = "venv\\Scripts\\pip"
        python_path = "venv\\Scripts\\python"
    else:  # Unix/MacOS
        pip_path = "venv/bin/pip"
        python_path = "venv/bin/python"
    
    # Install required packages
    print("\n📦 Installing dependencies...")
    packages = [
        "crewai",
        "gradio",
        "streamlit",
        "langchain",
        "openai",
        "python-dotenv",
        "pydantic",
        "fastapi",
        "uvicorn",
        "pandas",
        "plotly"
    ]
    
    subprocess.run([pip_path, "install", "--upgrade", "pip"], check=True)
    subprocess.run([pip_path, "install"] + packages, check=True)
    
    # Clone CrewAI-Studio
    print("\n📥 Cloning CrewAI-Studio...")
    if not os.path.exists("CrewAI-Studio"):
        subprocess.run([
            "git", "clone", 
            "https://github.com/strnad/CrewAI-Studio.git"
        ], check=True)
    
    # Install CrewAI-Studio requirements
    print("\n📦 Installing CrewAI-Studio requirements...")
    studio_req_path = "CrewAI-Studio/requirements.txt"
    if os.path.exists(studio_req_path):
        subprocess.run([pip_path, "install", "-r", studio_req_path], check=True)
    
    print("\n✅ CrewAI-Studio setup complete!")
    print("\n📝 Next steps:")
    print("1. Run: source venv/bin/activate (or venv\\Scripts\\activate on Windows)")
    print("2. Run: python gradio_interface.py")
    print("3. Open: http://localhost:7860")

if __name__ == "__main__":
    setup_crewai_studio()