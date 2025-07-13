CLAUDE.md - Ultimate Development Guidelines (v8)
Mandatory guidelines for secure, scalable, performant code. Violations risk outages or breaches. Follow for zero-defect, self-healing systems.
Role: Deliver resilient, observable solutions. I’ll guide when stuck.
Principles

Clarity: Self-documenting.
Simplicity: Minimal abstractions.
Observability: Full telemetry.
Security: Zero-trust, quantum-safe.
Automation: CI/CD, tests, self-healing.

Tools

Think: Problem analysis.
Remember: Context storage.
Observe: OpenTelemetry.
Review: AI reviews.
Optimize: AI tuning.
Heal: Self-healing systems.

🚨 Checks
Failures BLOCK. Fix to ✅ GREEN. Zero tolerance.
Metrics

Coverage: ≥99% unit, ≥95% integration.
Complexity: ≤4.
Debt: None.
MTTR: ≤5 minutes.
p99: ≤50ms APIs.

Workflow
Research → Plan → Code → Validate → Monitor
No code without plan:

Research: Reuse patterns.
Plan: Metrics, trade-offs; confirm.
Code: Tests/linters.
Validate: Functionality, security, performance.
Monitor: Metrics, self-healing.

Implementing: "Researching, planning, confirming."
Parallel Agents
MANDATORY: Parallel tasks in one message.
Agents:
- DB
- API
- Frontend
[3 Task calls]

Hook Failures
For exit code 2:

Stop.
Fix ❌.
Verify.
Resume (TodoWrite).
Never ignore.

Fixes:

Formatting.
Linting.
Forbidden (any, panic()).
Security.
Performance.

Recovery: Log in PROGRESS.md.
Memory

Re-read CLAUDE.md every 10 minutes.
Summarize in PROGRESS.md.
Track tasks.
Archive daily.

Language Rules
TypeScript/JavaScript
FORBIDDEN:

any, // @ts-ignore.
Callbacks.
var.
No types.
Non-null assertions.
DOM manipulation.
Mutable exports.
Secrets.
Unhandled promises.

REQUIRED:

zod.
Pino.
Result.
AI reviews.
Strict.

Python
FORBIDDEN:

Bare except:.
Mutable defaults.
type: ignore.
global.
String paths.
eval().
import *.
No type hints.
No context managers.

REQUIRED:

pydantic.
mypy --strict.
structlog.
Context managers.

Go
FORBIDDEN:

interface{}.
time.Sleep().
panic().
Empty interfaces.
init() side effects.
Global state.
No context.
Unhandled errors.

REQUIRED:

errgroup.
context.
zerolog.
Error wrapping.

Universal

Delete old code.
Names (userID).
Early returns.
Explicit errors.
Injection.
Logging.
Telemetry.
Zero-trust.

Enforcement: ken-script.
Standards
Complete when:

✅ Linters.
✅ Coverage: ≥99%/95%.
✅ Tests.
✅ Feature (telemetry).
✅ No old code.
✅ Docs.
✅ Security.
✅ p99 <50ms.

Testing

TDD (complex).
Post-code (CRUD).
Benchmarks, chaos (critical).
Skip trivial.
Property-based.
Chaos.

Structure
# All Languages
src/           # Source
tests/         # Tests
observability/ # Telemetry
scripts/       # CI/CD

Performance & Security
Performance

Benchmark.
Profile.
p99 <50ms.
Optimize throughput.

Security

Validate.
Secure randoms.
Parameterized queries.
Hashing.
HTTPS.
Sanitize.
Rotate secrets.
Zero-trust.
Quantum-safe.
Scan dependencies.

Observability

OpenTelemetry.
Structured logging.
Monitor all.
Alert (>50ms).
Correlate traces.

Communication
Updates
✅ Auth (99%, p99 <50ms)
✅ Rate limit
❌ Token (fixing)

Improvements
"Works, but [issue]. Fix?"
Organization

api: Fastify
publisher/*.ts
observability/*.ts


web: Next.js
observability/*.ts


shared:
social.ts
observability.ts


api-schema: TypeBox
scripts/: CI/CD

Practices
Coding

C-1: TDD.

C-2: Domain names.

C-3: No classes.

C-4: Simple.

C-5: Branded:
type UserId = Brand<string, 'UserId'>;


C-6: import type.

C-7: No comments.

C-8: type.

C-9: Extract if reused.

C-10: Telemetry.

C-11: Immutable.

C-12: AI review.


Testing

T-1: Colocate.

T-2: Integration.

T-3: Separate unit/integration.

T-4: Integration over mocks.

T-5: Property-based:
test('concat', () => fc.assert(fc.property(fc.string(), fc.string(), (a, b) =>
  getCharacterCount(a + b) === getCharacterCount(a) + getCharacterCount(b)
)));


T-6: Single assertions.

T-7: ≥99%/95%.

T-8: Chaos.

T-9: No type-checker.


Database

D-1: Type KyselyDatabase.
D-2: Override types.
D-3: Parameterized.
D-4: Index.
D-5: Transactions.

Organization

O-1: shared for ≥2.
O-2: Modular.
O-3: Separate.
O-4: Microservices.

Tooling

G-1: prettier.
G-2: turbo.
G-3: Security.
G-4: Docker.
G-5: Coverage.

Git

GH-1: Conventional.
GH-2: No Claude.
GH-3: Atomic.

Matrix



Scenario
Steps



Feature
Plan → TDD → Code → Validate → Monitor


Bug
Reproduce → Test → Fix → Verify → Monitor


Refactor
Test → Refactor → Validate → Delete


Performance
Profile → Optimize → Verify → Monitor


CI/CD

Linters, tests, security, coverage.
Auto-deploy staging.
Health checks.
Canary.
Rollback.
Serverless/WebAssembly.

Future-Proofing

WebAssembly.
Serverless.
Versioned APIs.
AI reviews.
Quantum-safe.
AI-native.
Circuit breakers.
Self-healing.

Function Practices

Readable?
Complexity ≤4?
Simplifiable?
Testable?
Explicit dependencies?
Best name?
Telemetry?
Immutable?

Refactor if: Reused, testable.
Test Practices

Parameterized.
Real defects.
Clear.
Independent.
Parity.
Property-based.
Grouped.
expect.any.
Strong.
Edge/unexpected.
No type-checker.
≥99%/95%.
Chaos.

Shortcuts
QNEW
Follow CLAUDE.md.

QPLAN
Plan, confirm.

QCODE
Code, ≥99%, `prettier`, `turbo`, security.

QCHECK
Analyze all.

QCHECKF
Analyze functions.

QCHECKT
Analyze tests.

QUX
UX scenarios.

QGIT
Commit, push.

Notes

Feature branches.
Clarity, observability.
Re-read every 10 minutes.
Ask: "[A] vs [B]?"
No debt.
Monitor metrics.
Version: Final, polished for perfection.

Maintained by William Vásquez