# Claude Requirements Gathering System

An intelligent requirements gathering system that progressively builds context through automated discovery, asks simple yes/no questions, and generates comprehensive requirements documentation.

## 🎯 Overview

This system transforms the requirements gathering process by:

- **Codebase-Aware Questions**: AI analyzes your code first, then asks informed questions
- **Simple Yes/No Format**: All questions are yes/no with smart defaults - just say "idk" to use defaults
- **Two-Phase Questioning**: 5 high-level questions for context, then 5 expert questions after code analysis
- **Automated Documentation**: Generates comprehensive specs with specific file paths and patterns
- **Product Manager Friendly**: No code knowledge required to answer questions

## 🚀 Quick Start

```bash
# Start gathering requirements for a new feature
/requirements-start add user profile picture upload

# Check progress and continue
/requirements-status

# View current requirement details
/requirements-current

# List all requirements
/requirements-list

# End current requirement gathering
/requirements-end

# Quick reminder if AI strays off course
/remind
```

## 📁 Project Structure

```
.claude/
├── commands/                     # Claude command definitions
│   ├── requirements-start.md    # Begin new requirement
│   ├── requirements-status.md   # Check progress (alias: current)
│   ├── requirements-current.md  # View active requirement
│   ├── requirements-end.md      # Finalize requirement
│   ├── requirements-list.md     # List all requirements
│   └── requirements-remind.md   # Remind AI of rules
│
requirements/                     # Requirement documentation storage
├── .current-requirement         # Tracks active requirement
├── index.md                     # Summary of all requirements
└── YYYY-MM-DD-HHMM-name/       # Individual requirement folders
    ├── metadata.json            # Status and progress tracking
    ├── 00-initial-request.md    # User's original request
    ├── 01-discovery-questions.md # 5 context questions
    ├── 02-discovery-answers.md   # User's answers
    ├── 03-context-findings.md    # AI's code analysis
    ├── 04-detail-questions.md    # 5 expert questions
    ├── 05-detail-answers.md      # User's detailed answers
    └── 06-requirements-spec.md   # Final requirements

examples/                        # Example requirements
└── 2024-01-15-1430-dark-mode-toggle/  # Complete example
```

## 🔄 How It Works

### Phase 1: Initial Setup & Codebase Analysis

```
User: /requirements-start add export functionality to reports
```

AI analyzes the entire codebase structure to understand the architecture, tech stack, and patterns.

### Phase 2: Context Discovery Questions

The AI asks 5 yes/no questions to understand the problem space:

```
Q1: Will users interact with this feature through a visual interface?
(Default if unknown: YES - most features have UI components)

User: yes

Q2: Does this feature need to work on mobile devices?
(Default if unknown: YES - mobile-first is standard)

User: idk
AI: ✓ Using default: YES
```

### Phase 3: Targeted Context Gathering (Autonomous)

AI autonomously:

- Searches for specific files based on discovery answers
- Reads relevant code sections
- Analyzes similar features in detail
- Documents technical constraints and patterns

### Phase 4: Expert Requirements Questions

With deep context, asks 5 detailed yes/no questions:

```
Q1: Should we use the existing ExportService at services/ExportService.ts?
(Default if unknown: YES - maintains architectural consistency)

User: yes
```

### Phase 5: Requirements Documentation

Generates comprehensive spec with:

- Problem statement and solution overview
- Functional requirements from all 10 answers
- Technical requirements with specific file paths
- Implementation patterns to follow
- Acceptance criteria

## 📋 Command Reference

### `/requirements-start [description]`

Begins gathering requirements for a new feature or change.

### `/requirements-status` or `/requirements-current`

Shows current requirement progress and continues gathering.

### `/requirements-end`

Finalizes current requirement, even if incomplete.

### `/requirements-list`

Shows all requirements with their status.

### `/requirements-remind` or `/remind`

Reminds AI to follow requirements gathering rules.

## 🎯 Features

### Smart Defaults

Every question includes an intelligent default based on:

- Best practices
- Codebase patterns
- Context discovered

### Progressive Questioning

1. Analyzes codebase structure first
2. 5 high-level questions for product managers
3. Autonomous deep dive into relevant code
4. 5 expert questions based on code understanding

### Automatic File Management

- All files created automatically
- Progress tracked between sessions
- Can resume anytime

## 💡 Best Practices

### For Users

- **Be Specific**: Clear initial descriptions help AI ask better questions
- **Use Defaults**: "idk" is perfectly fine - defaults are well-reasoned
- **Stay Focused**: Use /remind if AI goes off track
- **Complete When Ready**: Don't feel obligated to answer every question

### For Requirements

- **One Feature at a Time**: Keep requirements focused
- **Think Implementation**: Consider how another AI will use this
- **Document Decisions**: The "why" is as important as the "what"
- **Link Everything**: Connect requirements to sessions and PRs

## 📚 Example

See the `examples/` directory for a complete dark mode toggle requirement that demonstrates:

- All phases of the process
- How questions build on each other
- The final comprehensive specification
- Proper file structure

## 🔧 Setup Complete

The requirements system is now installed and ready to use. Try it out:

```bash
/requirements-start add a new feature to the website
```

The system will guide you through the entire process!
