---
name: requirements-start
description: Begin gathering requirements for a new feature or change
---

# Requirements Start

Begins a new requirements gathering session using the intelligent two-phase questioning system.

## Usage

```
/requirements-start [description]
```

## Process

When you run this command, I will:

1. **Create requirement folder**: Generate a timestamped folder for this requirement
2. **Analyze codebase**: Understand the project structure, tech stack, and patterns
3. **Begin Phase 1**: Ask 5 high-level yes/no questions about the feature
4. **Autonomous analysis**: Deep dive into relevant code based on your answers
5. **Begin Phase 2**: Ask 5 expert yes/no questions with technical context
6. **Generate spec**: Create comprehensive requirements documentation

## Question Format

All questions are yes/no with smart defaults:

- Answer "yes" or "no" for definitive responses
- Answer "idk" or "unknown" to use the default
- Each question includes a default based on best practices

## Example

```
User: /requirements-start add user avatar upload feature

AI: 📋 Starting requirements gathering for: add user avatar upload feature

Analyzing codebase structure...
✓ Found Next.js 14 with TypeScript
✓ Identified existing user profile at src/components/UserProfile
✓ Located file upload patterns in src/services/FileUploadService

Phase 1: Discovery Questions (1/5)

Q1: Will users interact with this feature through a visual interface?
(Default if unknown: YES - most features have UI components)

User: yes

Q2: Does this feature need to work on mobile devices?
(Default if unknown: YES - mobile-first is standard)

User: idk

AI: ✓ Using default: YES

[Continues through all 5 questions...]
```

## Rules

1. Ask ONE question at a time
2. Record all answers before proceeding
3. Always show defaults and reasoning
4. Complete each phase before moving to next
5. No implementation until requirements are complete
