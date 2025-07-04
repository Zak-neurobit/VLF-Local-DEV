# VLF Website + HODOS Integration Guide

## Working with Multiple Projects

### 1. Project Structure Options

#### Option A: Separate Repositories (Recommended)

```
VLF Website/
├── vasquez-law-website/
└── HODOS/
```

#### Option B: Monorepo

```
vlf-hodos-monorepo/
├── packages/
│   ├── website/
│   └── hodos/
└── package.json
```

### 2. Development Workflow

#### Using VS Code Workspaces

Create `.code-workspace` file:

```json
{
  "folders": [{ "path": "vasquez-law-website" }, { "path": "HODOS" }],
  "settings": {
    "terminal.integrated.cwd": "${workspaceFolder}"
  }
}
```

#### Using tmux/Terminal Tabs

- Tab 1: VLF Website development
- Tab 2: HODOS development
- Tab 3: Integration testing

### 3. Integration Patterns

#### API Integration

```typescript
// In VLF Website
const HODOS_API_URL = process.env.HODOS_API_URL || 'http://localhost:3001';

export const hodosClient = {
  async connect() {
    const response = await fetch(`${HODOS_API_URL}/api/connect`);
    return response.json();
  },
};
```

#### Shared Types

```typescript
// shared-types/index.ts
export interface SharedUser {
  id: string;
  email: string;
  role: 'client' | 'attorney' | 'admin';
}
```

### 4. Environment Configuration

#### VLF Website (.env)

```
HODOS_API_URL=http://localhost:3001
HODOS_API_KEY=your-api-key
```

#### HODOS (.env)

```
VLF_WEBSITE_URL=http://localhost:3000
ALLOWED_ORIGINS=http://localhost:3000
```

### 5. Docker Compose (Optional)

```yaml
version: '3.8'
services:
  vlf-website:
    build: ./vasquez-law-website
    ports:
      - '3000:3000'
    environment:
      - HODOS_API_URL=http://hodos:3001

  hodos:
    build: ./HODOS
    ports:
      - '3001:3001'
    environment:
      - VLF_WEBSITE_URL=http://vlf-website:3000
```

## Next Steps

1. Clone both repositories
2. Set up environment variables
3. Define integration points
4. Create shared interfaces
5. Implement API endpoints
6. Test integration
