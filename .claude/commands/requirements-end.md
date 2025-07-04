---
name: requirements-end
description: Finalize or cancel current requirement gathering
---

# Requirements End

Finalizes the current requirement gathering session, even if incomplete.

## Usage

```
/requirements-end
```

## Options

When ending a requirement session, you can:

1. **Complete**: Generate spec with current information
2. **Pause**: Save progress for later continuation
3. **Cancel**: Delete the requirement entirely

## Behavior by State

### If all questions answered:

- Automatically generates final requirements spec
- Marks requirement as COMPLETE
- Updates requirements index

### If partially complete:

```
⚠️ Requirement "user-avatar-upload" is incomplete (7/10 questions answered)

How would you like to proceed?
1. Generate spec with available info
2. Save as incomplete for later
3. Cancel and delete

User: 1

AI: ✓ Generating requirements spec with available information...
Note: Some technical details may be missing due to incomplete questioning.
```

### If just started:

```
⚠️ Requirement "user-avatar-upload" has minimal progress (1/10 questions)

This will delete the requirement. Continue? (yes/no)
```

## Generated Files

When completing a requirement:

- `06-requirements-spec.md` - Final requirements document
- `metadata.json` - Updated with completion timestamp
- `index.md` - Updated with requirement summary

## Clean End

Always run this command when:

- Switching to a different requirement
- Pausing work on requirements
- Completing a requirement session
