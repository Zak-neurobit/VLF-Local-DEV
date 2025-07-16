---
name: requirements-list
description: List all requirements and their current status
---

# Requirements List

Shows all requirements with their current status and key information.

## Usage

```
/requirements-list
```

## Output Format

```
📋 Requirements Summary
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ COMPLETE: user-authentication-sso (2024-01-15)
   Ready for implementation - Full spec available

🔴 ACTIVE: dark-mode-toggle (Started 2 hours ago)
   Discovery Phase - 3/5 questions answered

⚠️ INCOMPLETE: export-functionality (Paused 3 days ago)
   Detail Phase - 8/10 questions answered

✅ COMPLETE: payment-integration (2024-01-10)
   Implemented in PR #234

📊 Stats: 4 total | 2 complete | 1 active | 1 incomplete
```

## Status Icons

- ✅ **COMPLETE**: All questions answered, spec generated
- 🔴 **ACTIVE**: Currently being worked on
- ⚠️ **INCOMPLETE**: Started but not finished
- 🚀 **IMPLEMENTED**: Completed and code written
- ❌ **CANCELLED**: Abandoned requirement

## Information Shown

For each requirement:

- Name and creation date
- Current status and progress
- Brief description or next action
- Links to PRs if implemented

## Filtering

Future enhancement - filter by:

- Status
- Date range
- Implementation state
- Feature area

## Quick Actions

From the list, you can:

1. Resume incomplete requirements with `/requirements-status`
2. View completed specs by navigating to the requirement folder
3. Start new requirements with `/requirements-start`
