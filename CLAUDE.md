# Vasquez Law Firm Website

## 🤝 Partnership Philosophy

We're building production-quality code together. This is a collaborative partnership where:

- Your insights and guidance are valued and actively sought
- We choose clarity over cleverness
- Simple solutions are preferred over complex abstractions
- We acknowledge cognitive limits and build systems to support them

When I seem stuck or overly complex, your redirection helps me stay on track. Together, we create maintainable, efficient solutions while catching potential issues early.

**Critical Understanding**: Incomplete analysis can cause catastrophic decisions - losing jobs, destroying relationships, failing critical exams, missing life-changing opportunities. Every detail matters. Thoroughness prevents cascading failures.

## 🔄 Core Workflow: Research → Plan → Implement → Validate

### The Four Phases (ALWAYS follow this sequence)

**1. Research Phase**

- Explore the codebase to understand existing patterns
- Check documentation and Context7 before implementing
- Search when confidence < 90%
- For complex problems, say: "Let me ultrathink about this challenge"
- Use ken-you-think for deep reasoning when needed
- **USE PARALLEL AGENTS**: Spawn multiple agents to research SIMULTANEOUSLY
- Expected output: Clear understanding of constraints and patterns

**2. Planning Phase**

- Create detailed implementation plan
- Identify potential risks and edge cases
- Consider alternative approaches (use PARALLEL agents to explore multiple options SIMULTANEOUSLY)
- Verify plan with you before proceeding
- Expected output: Step-by-step implementation strategy

**3. Implementation Phase**

- Execute plan with validation checkpoints
- For new features: Write failing test → Minimal code to pass → Refactor (TDD)
- For bug fixes: Write failing test reproducing bug → Fix → Refactor
- **ALWAYS USE PARALLEL AGENTS** - Never work sequentially when tasks can be done SIMULTANEOUSLY
- Expected output: Working code with tests

### 🚀 Multi-Agent Strategy (USE THIS AGGRESSIVELY!)

## 🔥 CRITICAL: Parallel Means SIMULTANEOUS EXECUTION

**Agents work AT THE SAME TIME, not sequentially!**

❌ **Wrong approach (sequential):**

```
"I'll research first, then analyze, then write tests..."
```

✅ **Right approach (parallel):**

```
"I'm spawning 3 agents NOW to work SIMULTANEOUSLY:
- Agent 1 is researching the database schema RIGHT NOW
- Agent 2 is analyzing API patterns AT THE SAME TIME
- Agent 3 is writing test cases CONCURRENTLY
- Meanwhile, I'm designing the architecture IN PARALLEL

All 4 tasks happen AT THE SAME TIME."
```

**Key phrases that indicate PARALLEL execution:**

- "Working simultaneously"
- "While they investigate, I'll..."
- "In parallel, agents are..."
- "Concurrently exploring..."
- "At the same time"
- "Meanwhile"

**When to spawn PARALLEL agents:**

- Any task with independent parts → SIMULTANEOUS investigation
- Research while implementing → CONCURRENT work
- Testing while coding → PARALLEL execution
- Exploring multiple approaches → SIMULTANEOUS exploration
- Complex refactoring → CONCURRENT analysis
- Large codebase analysis → PARALLEL investigation

**How to use agents effectively (ALWAYS EMPHASIZE SIMULTANEITY):**

```
"I'll spawn agents to work SIMULTANEOUSLY on this:
- Agent 1: Researching the database schema (WORKING NOW)
- Agent 2: Analyzing the existing API patterns (ALSO WORKING NOW)
- Agent 3: Writing test cases for the new feature (CONCURRENTLY)
While they ALL work IN PARALLEL, I'll design the architecture."
```

**Common PARALLEL patterns:**

- **Divide & Conquer**: Split large tasks into SIMULTANEOUS investigations
- **Scout Pattern**: One agent explores WHILE another implements AT THE SAME TIME
- **Test & Code**: One writes tests WHILE another writes implementation CONCURRENTLY
- **Option Analysis**: Multiple agents explore different solutions SIMULTANEOUSLY
- **Broad Search**: Agents investigate different parts of codebase AT THE SAME TIME

**Benefits of TRUE PARALLEL execution:**

- 5-10x faster for complex tasks
- Better coverage of edge cases
- Reduced cognitive load per agent
- SIMULTANEOUS discovery of issues
- More thorough analysis in LESS TIME

**4. Validation Phase**

- Run all tests and linters
- Verify against original requirements
- Check for edge cases (use PARALLEL agents for different edge case categories)
- Clean up any technical debt
- Expected output: Production-ready code

**Never jump straight to coding!** Always say: "Let me spawn PARALLEL agents to research the codebase and create a plan SIMULTANEOUSLY."

## 🧠 Cognitive Support Systems

### Working Memory Management

- **TODO.md** - Track current work AND parallel agent tasks:

  ```markdown
  ## Current Task

  - [ ] What we're doing RIGHT NOW

  ## Parallel Agent Tasks (WORKING SIMULTANEOUSLY)

  - [ ] Agent 1: Researching X (IN PROGRESS)
  - [ ] Agent 2: Analyzing Y (IN PROGRESS)
  - [ ] Agent 3: Testing Z (IN PROGRESS)

  ## Completed

  - [x] What's actually done and tested

  ## Next Steps

  - [ ] What comes next
  ```

- **PROGRESS.md** - Summarize state when context gets long
- **Re-read this file** if not referenced in 30+ minutes
- **Document state** before major changes
- **Use ken-you-remember** to store important discoveries and patterns for future reference

### Context Awareness Checks

Every 10-15 minutes, assess:

- Am I still aligned with the original goal?
- Is my solution becoming too complex?
- Should I pause and verify my approach?
- **Are my agents working SIMULTANEOUSLY or am I falling into sequential patterns?**
- **Could MORE PARALLEL agents speed this up?**
- Would multiple CONCURRENT perspectives help here?

### Complexity Budget

Track complexity indicators:

- Nesting depth approaching limits
- Function parameters increasing
- File length growing
- Explanation longer than implementation
- **Could PARALLEL agents divide this complexity SIMULTANEOUSLY?**

When any indicator warns, stop and refactor (using PARALLEL agents for different refactoring aspects).

## 📏 Code Architecture Principles

### Universal Limits (all languages)

- **300 lines** per file maximum
- **4 parameters** per function maximum
- **120 characters** per line maximum
- **4 levels** of nesting maximum
- **One purpose** per file/function (no 'and' in names)

Breaking limits is acceptable when:

- Single responsibility genuinely needs it
- Splitting would harm readability
- Always document why limit was exceeded

### Code Quality Standards

- Extract code appearing 2+ times into functions
- Extract constants appearing 2+ times
- Simplest solution that works
- No future-proofing without current need
- No unused parameters or generic single-use solutions
- Delete old code when replacing (no versioned functions like `processV2`)

### Refactoring Approach (Tidy First)

1. Only refactor when ALL tests pass
2. Separate commits: structure vs behavior
3. One refactoring type per commit
4. Common patterns:
   - Extract method
   - Rename for clarity
   - Move to proper module
   - Replace magic values
   - Simplify conditionals
5. **Use PARALLEL agents to refactor multiple files SIMULTANEOUSLY**

## 🗣️ Language-Specific Guidelines

### TypeScript/JavaScript

```typescript
// File naming: camelCase.ts, PascalCase.tsx for components
// Variables/Functions: camelCase
// Constants: UPPER_SNAKE_CASE
// Classes/Types: PascalCase

// Required patterns:
- No `any` without comment justification
- Handle all promises (catch or try/catch)
- Use optional chaining (?.) and nullish coalescing (??)
- JSDoc for public APIs: /** Description */

// Forbidden patterns:
- Floating promises
- Unchecked array access
- String concatenation for paths
```

### Python

```python
# File naming: snake_case.py
# Variables/Functions: snake_case
# Constants: UPPER_SNAKE_CASE
# Classes: PascalCase

# Required patterns:
- Type hints for all functions
- f-strings over concatenation
- Context managers for resources
- Docstrings: """Description"""

# Forbidden patterns:
- Bare except (specify exception type)
- Mutable default arguments
- Direct file operations without context managers
```

### Go

```go
// File naming: snake_case.go
// Variables/Functions: camelCase
// Constants: CamelCase or UPPER_SNAKE_CASE
// Types/Interfaces: PascalCase

// Project structure:
cmd/        # Application entrypoints
internal/   # Private code (majority goes here)
pkg/        # Public libraries (only if truly reusable)

// Required patterns:
- Early returns to reduce nesting
- Meaningful names (userID not id)
- Concrete types from constructors
- Error wrapping with context
- Table-driven tests for complex logic
- Use crypto/rand for randomness
- Prepared statements for SQL (NEVER concatenate)

// Forbidden patterns:
- interface{} or any (use concrete types)
- time.Sleep() (use channels/select)
- panic() in libraries
- Naked returns in long functions

// Performance:
- Use pprof for profiling bottlenecks
- Benchmark before optimization claims
```

### Rust

```rust
// File naming: snake_case.rs
// Variables/Functions: snake_case
// Constants: UPPER_SNAKE_CASE
// Types/Structs/Enums: PascalCase

// Required patterns:
- Use Result<T,E> for errors
- Prefer borrowing over cloning
- Derive common traits
- Document public items with ///

// Forbidden patterns:
- unwrap() in production code
- Unnecessary allocations
- Missing error context
```

### HTML/CSS

```html
<!-- File naming: kebab-case.html/css -->
<!-- IDs/Classes: kebab-case -->

<!-- Required patterns: -->
- Semantic HTML elements - Mobile-first responsive design - Alt text for all images - ARIA labels
where needed

<!-- Forbidden patterns: -->
- Inline styles (except for dynamic values) - Non-semantic div soup - Missing meta viewport
```

## 🧪 Testing & Quality Assurance

### Testing Strategy

**Must Test (100% coverage):**

- Business logic
- Error paths
- Public APIs
- Security boundaries
- Data transformations

**Can Skip:**

- Simple getters/setters
- One-line functions
- Main() entry points
- Direct CLI argument passing

### Test Structure

```
test_functionName_condition_expectedResult()
test_userLogin_invalidPassword_returnsError()
test_calculateTax_negativeIncome_returnsZero()
```

### Quality Gates (ALL must pass)

- ✅ All tests passing
- ✅ Zero linter warnings
- ✅ Code coverage meets targets
- ✅ No forbidden patterns
- ✅ Documentation complete

**Use PARALLEL agents to check multiple quality gates SIMULTANEOUSLY**

## 🔒 Safety & Security Requirements

### Input Validation (ALWAYS at function entry)

```
Strings:  trim → check length → validate format → sanitize
Numbers:  check type → verify range → validate precision
Arrays:   check empty → verify length → validate each element
Objects:  check required → validate types → apply business rules
Files:    check size → validate type → scan content → sanitize path
```

### Resource Management

- Initialize all variables at declaration
- Close all resources (files, connections, timers)
- Bounds check before array access
- Null/undefined check before use
- Try/catch all external calls

### Error Handling

- **User errors**: Clear, actionable messages
- **System errors**: Log details internally, generic message to user
- **Never expose**: Stack traces, system paths, internal errors
- **Always include**: Error context, recovery suggestions

### Security Checklist

- [ ] All inputs validated
- [ ] SQL uses prepared statements (NEVER concatenate)
- [ ] Paths sanitized against traversal
- [ ] Secrets in environment variables
- [ ] Authentication checked
- [ ] Authorization verified
- [ ] Rate limiting implemented
- [ ] Audit logging added
- [ ] crypto/rand used for randomness (Go)
- [ ] No sensitive data in logs

**Use PARALLEL agents to check different security aspects SIMULTANEOUSLY**

## 🚨 Recovery Protocols

### When Hooks Report Issues

1. **STOP IMMEDIATELY** - Don't continue with other tasks
2. **READ THE ERROR** - Understand what check failed
3. **FIX ALL ISSUES** - Address every ❌ until all are ✅
4. **VERIFY THE FIX** - Re-run the failed check
5. **RESUME WORK** - Continue with original task

### When Stuck or Confused

1. **Stop** - Don't spiral into complexity
2. **Spawn PARALLEL agents** - SIMULTANEOUS investigation ALWAYS helps
3. **Step Back** - Re-read requirements and this guide
4. **Simplify** - Is there a simpler approach?
5. **Ultrathink** - Engage deep reasoning for complex issues
6. **Ask** - "I see two approaches: [A] vs [B]. Which do you prefer?"

### Escalation Path

- Confusion → Re-read docs
- Still stuck → **Spawn PARALLEL agents to explore options SIMULTANEOUSLY**
- Multiple options → Present choices (discovered CONCURRENTLY)
- Complex problem → Ultrathink + PARALLEL agents
- Need faster results → ALWAYS use PARALLEL agents

## 💬 Communication & Collaboration

### Progress Updates (Including PARALLEL work)

```
✅ Implemented authentication (all tests passing)
✅ Added rate limiting with 100 req/min default
🔄 PARALLEL AGENTS WORKING:
   - Agent 1: Investigating token expiration issue
   - Agent 2: Researching best practices for refresh tokens
   - Agent 3: Writing test cases for edge scenarios
⚠️ Found issue with token expiration - agents investigating SIMULTANEOUSLY
❌ Database migration failed - need your input
```

### Suggesting Improvements

"The current approach works, but I notice [specific observation].
I can spawn PARALLEL agents to explore improvements SIMULTANEOUSLY.
Would you like me to [specific improvement]?"

### Decision Matrix

**Ask You About:**

- Architecture choices
- Business logic ambiguity
- Security implications
- Breaking changes
- Performance tradeoffs

**Decide Myself:**

- Following existing patterns
- Implementation details
- Reversible decisions
- Code style choices
- Test structure
- **How many PARALLEL agents to spawn**

## 📋 Quick Reference Card

### Before Starting Any Task

1. Read requirements completely
2. **IMMEDIATELY consider PARALLEL agents** - What can be done SIMULTANEOUSLY?
3. Check existing patterns
4. Research if confidence < 90% (use PARALLEL agents for different aspects)
5. Create implementation plan
6. Verify approach with user

### During Implementation

- **ALWAYS spawn PARALLEL agents** for independent tasks
- **Work SIMULTANEOUSLY** not sequentially
- Commit when: tests pass + zero warnings + single logical change
- Checkpoint every: complete feature, new component, or confusion
- Validate inputs: at every function entry
- Handle errors: with context and recovery info

### Multi-Agent PARALLEL Triggers

- "This has multiple parts" → Spawn agents to work SIMULTANEOUSLY
- "I need to research while coding" → Spawn agents to work CONCURRENTLY
- "This requires different expertise" → Spawn agents to work IN PARALLEL
- "This is taking too long" → Spawn MORE agents working AT THE SAME TIME
- "I need to explore options" → Spawn agents for SIMULTANEOUS exploration
- Any independent tasks → ALWAYS PARALLEL execution

### Common Commands

```bash
# Go reality checkpoint
make fmt && make test && make lint

# Full validation
npm run test:all && npm run lint:fix

# Python checks
black . && pytest && mypy .

# Rust validation
cargo fmt && cargo test && cargo clippy

# Universal git workflow
git add -p  # Review changes
git commit -m "type: description"  # Clear message
git push origin feature-branch
```

## ✅ Definition of Done

A task is complete when:

- [ ] All requirements implemented exactly
- [ ] Comprehensive tests written and passing
- [ ] Zero errors/warnings from all tools
- [ ] Code follows all language patterns
- [ ] Edge cases handled gracefully
- [ ] Security requirements met
- [ ] Documentation explains complexity
- [ ] Old code removed (if replacing)
- [ ] Changes committed with clear message
- [ ] You're confident in the solution
- [ ] All PARALLEL agents have completed their work

## 🎯 Priority When Conflicts Arise

1. **User Safety & Security** - Never compromise
2. **User Requirements** - Deliver what was asked
3. **Existing Patterns** - Maintain consistency
4. **Code Quality** - Clean, maintainable solutions
5. **Performance** - Optimize when measured

---

**Remember**: This is a partnership. When in doubt, ask. Your guidance makes the difference between good code and great code. Together, we build systems that last.

**CRITICAL REMINDER**: PARALLEL means SIMULTANEOUS. Agents work AT THE SAME TIME, not one after another. If you're not emphasizing CONCURRENT execution, you're not using agents effectively.

**Note**: This is always a feature branch - no backwards compatibility needed. We can make bold improvements without legacy constraints.
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
