# Vasquez Law Firm Website

**MANDATORY**: This project uses Requirements-First Development. ALWAYS gather requirements before implementing ANY feature.

**Project**: Modern AI-powered legal services website with voice agents and real-time chat  
**Stack**: Next.js 14, TypeScript, React, Tailwind CSS, Node.js, PostgreSQL, WebSockets

## 🚨 Requirements Gathering System (MANDATORY)

Before implementing ANY feature:

1. **Start requirements**: `/requirements-start [feature description]`
2. **Answer questions**: Yes/No only (or "idk" for defaults)
3. **Complete all phases**: 10 questions total
4. **Review spec**: Generated requirements document
5. **Then implement**: Only after requirements are complete

### Available Commands

- `/requirements-start` - Begin gathering requirements
- `/requirements-status` - Check progress and continue
- `/requirements-list` - View all requirements
- `/requirements-end` - Finalize current requirement
- `/remind` - Remind Claude to follow rules

### MCP Tools Integration

This project works with RepoPrompt tools:

- Use `mcp_codemaps` during structure analysis
- Use `mcp_search` for pattern discovery
- Use `mcp_batch_read` for file analysis

## Project Overview

- **Architecture**: Full-stack Next.js app with AI integrations (chatbot, voice agents), real-time features, and multi-language support
- **Key dependencies**:
  - `next`: SSR/SSG framework for SEO optimization
  - `react/react-dom`: UI library
  - `typescript`: Type safety
  - `tailwindcss`: Utility-first CSS
  - `winston/pino`: Comprehensive logging
  - `@sentry/nextjs`: Error tracking
  - `prisma`: Database ORM
  - `socket.io`: Real-time communication
- **Directory structure**:
  ```
  src/
  ├── app/          # Next.js 14 app router pages
  ├── components/   # Reusable UI components
  ├── lib/          # Utilities, logger, API clients
  ├── hooks/        # Custom React hooks
  ├── services/     # Business logic & external services
  ├── types/        # TypeScript type definitions
  └── styles/       # Global styles and Tailwind config
  ```

## Development Commands

```bash
# Core commands
build: npm run build
test: npm test
lint: npm run lint
format: npm run format
typecheck: npm run type-check
run: npm start
dev: npm run dev

# Git workflow
pre-commit: npm run lint && npm run type-check && npm test
```

## Code Standards

- **Files**: Max 300 lines, split into focused modules, one class/component per file
- **Functions**: Max 50 lines, single responsibility, max 5 params, early returns
- **Testing**: Write tests FIRST (TDD), mirror source file names, independent tests
- **Errors**: Explicit handling, proper logging, clear messages, never silent catches
- **Documentation**: Document all public APIs, explain "why" not "what"
- **Security**: No hardcoded secrets, validate all inputs, use env vars

## Development Workflow

1. Write failing test first
2. Implement minimal code to pass
3. Run linting and type checking
4. Commit with clear message
5. Never commit: commented code, debug logs, generated files

## Stack-Specific Guidelines

- **Next.js**: Use app router, implement metadata for SEO, optimize images with next/image
- **React**: Functional components only, use hooks for state, memo for performance
- **TypeScript**: Strict mode enabled, no `any` types, define interfaces for all props
- **Tailwind**: Use utility classes, create custom components for repeated patterns
- **Logging**: Use appropriate log levels, sanitize sensitive data, include request IDs
- **Testing**: Jest for unit tests, React Testing Library for components, Playwright for E2E

## Critical Rules

- **NEVER SIMPLIFY** - We build up, not down. Find proper fixes, work triple hard
- **ALWAYS TEST** - Test before, during, and after every change
- **NO DUPLICATING WORK** - Always double-check existing code before making changes
- **FOREFRONT OF TECH** - We set the standard, others follow
- Run ALL tests before saying "done"
- Check linting and formatting before commits
- Ask before installing new dependencies
- Follow existing patterns in the codebase
- When fixing issues, verify the fix works
- Make it EPIC - every feature must be best-in-class

## Project-Specific Context

- **Multi-language**: Support English/Spanish with i18n, AI translation for real-time content
- **AI Features**: Chatbot for initial consultation, voice agent for appointments, document analysis
- **SEO Priority**: SSR for all public pages, structured data, local SEO for office locations
- **Security**: Attorney-client privilege considerations, secure document handling, HIPAA-like compliance
- **Performance**: Target 95+ Lighthouse score, <3s initial load, real-time features with fallbacks
- **Integrations**: Twilio for voice, OpenAI/Claude for AI, Stripe for payments, Google Maps for locations
