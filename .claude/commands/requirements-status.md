---
name: requirements-status
description: Check progress of current requirement gathering and continue where left off
aliases: requirements-current
---

# Requirements Status

Shows the current requirement gathering progress and continues from where you left off.

## Usage

```
/requirements-status
/requirements-current  (alias)
```

## What it shows

1. **Active requirement name**: The feature being documented
2. **Current phase**: Discovery Questions, Analysis, Detail Questions, or Complete
3. **Progress**: Number of questions answered
4. **Next action**: The next question or step

## Example Output

```
📋 Active Requirement: user-avatar-upload
Phase: Discovery Questions
Progress: 3/5 questions answered

✓ Q1: Visual interface? YES
✓ Q2: Mobile support? YES (default)
✓ Q3: Real-time preview? NO

Next: Q4: Should uploads be validated for inappropriate content?
(Default if unknown: YES - content moderation is a best practice)
```

## States

- **ACTIVE**: Currently gathering requirements
- **ANALYZING**: AI is researching codebase
- **COMPLETE**: All questions answered, spec ready
- **NONE**: No active requirement

## Resuming

When you run this command:

1. Shows current progress
2. Repeats the last unanswered question
3. Continues gathering from that point
4. Maintains all previous context
