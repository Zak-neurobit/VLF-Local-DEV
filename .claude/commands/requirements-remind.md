---
name: requirements-remind
description: Remind AI to follow requirements gathering rules
aliases: remind
---

# Requirements Remind

Quick reminder to keep AI focused on requirements gathering rules.

## Usage

```
/requirements-remind
/remind  (shorter alias)
```

## When to Use

Use this command when the AI:

- Asks open-ended questions instead of yes/no
- Starts implementing code during requirements
- Asks multiple questions at once
- Forgets to show defaults
- Skips the analysis phase
- Doesn't follow the two-phase structure

## Example

```
User: /remind

AI: 📋 Requirements Gathering Rules Reminder:

✓ Ask ONE yes/no question at a time
✓ Always show intelligent defaults
✓ Complete all 5 questions before analysis
✓ No implementation during requirements
✓ Two phases: Discovery → Analysis → Detail
✓ Record all answers before proceeding

Returning to requirements gathering...

Current: Q3: Should the export include user metadata?
(Default if unknown: NO - exports typically contain only core data)
```

## Rules Being Enforced

1. **One Question Rule**: Single yes/no question at a time
2. **Default Rule**: Every question has a smart default
3. **Phase Rule**: Complete each phase fully
4. **Analysis Rule**: Autonomous code research between phases
5. **Documentation Rule**: Generate spec only after all questions
6. **No Code Rule**: Requirements only, no implementation

## Quick Reset

This command helps reset the conversation flow without losing progress. All previous answers and context are maintained.
