# Git Hooks Guide

This project uses automated git hooks to ensure code quality and consistency across all commits.

## Overview

We use [Husky](https://typicode.github.io/husky/) and [lint-staged](https://github.com/okonet/lint-staged) to automatically run checks before commits are allowed. This prevents broken code, formatting issues, or type errors from being committed to the repository.

## How It Works

### Pre-commit Hook

When you run `git commit`, the following happens automatically:

1. **Lint-staged runs on staged files only**:

   - **JavaScript/TypeScript files** (`.js`, `.jsx`, `.ts`, `.tsx`):
     - ESLint fixes any fixable issues
     - Prettier formats the code
   - **Other files** (`.json`, `.md`, `.css`, `.scss`):
     - Prettier formats the files
   - **Test files** (`.test.js`, `.spec.ts`, etc.):
     - Related Jest tests run automatically

2. **TypeScript checking runs on the entire project**:
   - Ensures no type errors exist anywhere in the codebase
   - This is important because changing one file can affect types in other files

### Commit-msg Hook

After you write your commit message, commitlint validates it against conventional commit format:

```
type(scope?): subject

body?

footer?
```

Allowed types:

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, semicolons, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `build`: Build system changes
- `ci`: CI/CD changes
- `chore`: Other changes (maintenance, dependencies, etc.)
- `revert`: Reverting a previous commit

Examples:

- ✅ `feat: add user authentication`
- ✅ `fix: resolve navigation menu bug`
- ✅ `docs: update README with installation steps`
- ❌ `Added new feature` (missing type)
- ❌ `FEAT: add feature` (type must be lowercase)

## What Happens When Checks Fail

If any check fails, the commit will be blocked:

```bash
# Example output when TypeScript errors exist:
> vasquez-law-website@1.0.0 type-check
> tsc --noEmit

src/components/dashboard/ActivityMonitor.tsx(108,25): error TS2339: Property 'details' does not exist...
husky - pre-commit script failed (code 1)
```

**You must fix all issues before the commit will succeed.**

## Common Scenarios

### Scenario 1: Formatting Issues

If your code isn't formatted correctly, lint-staged will automatically fix it:

- Your staged files will be modified
- The formatted versions will be staged
- The commit will proceed if no other issues exist

### Scenario 2: ESLint Errors

If ESLint finds fixable issues:

- They'll be fixed automatically
- If unfixable issues exist, you'll see the errors and must fix them manually

### Scenario 3: TypeScript Errors

TypeScript errors anywhere in the project will block the commit:

- You must fix all type errors
- Run `npm run type-check` to see all errors
- Fix them and try committing again

### Scenario 4: Commit Message Format

If your commit message doesn't follow the format:

- You'll see an error explaining what's wrong
- Write a new commit message following the conventional format

## Bypassing Hooks (Emergency Only!)

In rare emergency cases, you can bypass hooks:

```bash
# Skip pre-commit hooks (NOT RECOMMENDED)
git commit --no-verify -m "fix: emergency fix"

# Skip specific hooks
HUSKY=0 git commit -m "fix: emergency fix"
```

⚠️ **WARNING**: Only bypass hooks in true emergencies. This can introduce bugs and break the build.

## Troubleshooting

### Hooks Not Running

If hooks aren't running:

```bash
# Reinstall husky
npm run prepare

# Verify hooks are installed
ls -la .husky/
```

### Hooks Running Too Slowly

Large projects might have slow type checking. You can:

1. Fix type errors regularly to avoid accumulation
2. Use `npm run type-check` before committing to catch errors early

### Files Being Modified During Commit

This is normal! Prettier and ESLint are formatting your code. The formatted version will be committed.

## Benefits

1. **Consistent Code Style**: Every commit has properly formatted code
2. **No Type Errors**: TypeScript errors can't make it into the repository
3. **Working Tests**: Test failures are caught before merge
4. **Clear Commit History**: Standardized commit messages make history readable
5. **Faster PR Reviews**: Automated checks mean reviewers focus on logic, not style

## For New Developers

When you clone the repository:

```bash
# Install dependencies (this also sets up git hooks)
npm install

# Hooks are now active! Try making a commit to see them in action
```

That's it! The hooks will run automatically whenever you commit.
