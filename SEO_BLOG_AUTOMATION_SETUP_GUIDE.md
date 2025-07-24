# VLF Website SEO Blog Automation Setup Guide

## 🚀 Overview

The VLF website has three powerful systems for automated SEO blog generation:

1. **Enhanced Legal Blogger** - RSS feed monitoring and automatic blog generation
2. **CrewAI SEO Blog Generation Agent** - AI-powered content creation with advanced SEO
3. **Content Factory** - Complete content pipeline with scheduling and syndication

All systems support **bilingual content generation** (English/Spanish) and are optimized for legal practice areas.

## 📋 System Components

### 1. Enhanced Legal Blogger (`src/agents/enhanced-legal-blogger.ts`)

**Features:**
- Monitors 30+ RSS feeds from government sources, legal news, and local outlets
- Automatically generates blog posts from feed items
- Templates for different content types (immigration updates, court decisions, etc.)
- Bilingual support built-in
- Local news monitoring for NC and FL

**RSS Feeds Monitored:**
- Federal Register (DHS, USCIS, State Dept, DOJ)
- Immigration organizations (Immigration Impact, MPI, etc.)
- Legal news (Law360, JD Supra)
- State/local sources (NC State Bar, FL Bar, local newspapers)
- Congressional/Senate feeds

### 2. CrewAI SEO Blog Generation Agent (`src/lib/crewai/agents/seo-blog-generation-agent.ts`)

**Features:**
- GPT-4 powered content generation
- Competitor analysis
- AI Overview optimization (for Google's AI snippets)
- Voice search optimization
- Structured content with H2/H3 headings
- FAQ section generation
- SEO scoring and readability analysis

### 3. Content Factory (`src/services/content-factory/`)

**Features:**
- Daily blog generation based on trending topics
- Location-based landing pages
- Practice area variations for A/B testing
- Content scheduling for optimal times
- Multi-platform syndication (Medium, LinkedIn, etc.)
- Performance analytics

## 🔧 Setup Instructions

### Prerequisites

1. **Environment Variables**
   Add to your `.env.local` or `.env.production`:
   ```env
   # OpenAI API for content generation
   OPENAI_API_KEY=your_openai_api_key
   
   # Database connection
   DATABASE_URL=your_postgresql_connection_string
   
   # Optional: External APIs
   GOOGLE_NEWS_API_KEY=your_google_news_key
   SERPAPI_KEY=your_serpapi_key
   
   # Content settings
   CONTENT_AUTO_PUBLISH=true
   CONTENT_LANGUAGES=en,es
   ```

2. **Database Setup**
   Ensure your Prisma database has the required tables:
   ```bash
   npx prisma migrate deploy
   ```

### Starting the Enhanced Legal Blogger

```typescript
// Create a startup script: src/scripts/start-legal-blogger.ts
import { enhancedLegalBlogger } from '@/agents/enhanced-legal-blogger';

async function startBlogger() {
  console.log('Starting Enhanced Legal Blogger...');
  await enhancedLegalBlogger.start();
  console.log('Legal Blogger is now monitoring RSS feeds');
}

startBlogger().catch(console.error);
```

Run with:
```bash
npm run ts-node src/scripts/start-legal-blogger.ts
```

### Using the Content Factory

#### Manual Trigger via API

```bash
# Trigger content generation (requires admin auth)
curl -X POST http://localhost:3000/api/content-factory/generate \
  -H "Authorization: Bearer YOUR_AUTH_TOKEN" \
  -H "Content-Type: application/json"
```

#### Programmatic Usage

```typescript
import { contentFactory } from '@/services/content-factory';

async function generateDailyContent() {
  // Initialize the factory
  await contentFactory.initialize();
  
  // Run daily content generation
  const result = await contentFactory.runDailyContentGeneration();
  
  console.log(`Generated ${result.generated} pieces of content:`, result.details);
}
```

#### Custom Configuration

```typescript
import { ContentFactory } from '@/services/content-factory';

const customFactory = new ContentFactory({
  dailyBlogTarget: 10,              // Generate 10 blogs per day
  practiceAreas: [
    'immigration',
    'personal-injury',
    'workers-compensation',
    'criminal-defense',
    'family-law',
    'traffic-violations'
  ],
  targetCities: [
    'Charlotte', 'Raleigh', 'Durham', 'Orlando'
    // Add more NC/FL cities
  ],
  languages: ['en', 'es'],          // Bilingual content
  enableAutoPublish: true,          // Auto-publish content
  syndicationPlatforms: ['medium', 'linkedin', 'facebook', 'twitter']
});
```

### Using the SEO Blog Generation Agent

```typescript
import { seoAgent } from '@/lib/crewai/agents/seo-blog-generation-agent';

async function generateSEOOptimizedBlog() {
  const result = await seoAgent.generateSEOBlog({
    practiceArea: 'immigration',
    targetKeywords: ['green card application', 'immigration lawyer NC'],
    contentType: 'blog_post',
    targetAudience: 'potential_clients',
    tone: 'professional',
    wordCount: 1500,
    language: 'en',                    // or 'es' for Spanish
    location: 'North Carolina',
    urgency: 'medium',
    includeCallToAction: true,
    competitorAnalysis: true,          // Analyze competitor content
    aiOverviewOptimization: true,      // Optimize for Google AI Overview
    voiceSearchFocus: true,            // Optimize for voice search
  });

  console.log('Generated blog:', {
    title: result.title,
    seoScore: result.seoScore,
    aiOverviewScore: result.aiOverviewScore,
    wordCount: result.wordCount
  });
}
```

## 📅 Scheduling Automation

### Option 1: Cron Job (Recommended for Production)

Create `src/scripts/content-cron.ts`:
```typescript
import { enhancedLegalBlogger } from '@/agents/enhanced-legal-blogger';
import { contentFactory } from '@/services/content-factory';

async function runContentAutomation() {
  console.log('Starting daily content automation...');
  
  // Start RSS monitoring (runs continuously)
  if (process.env.ENABLE_RSS_MONITORING === 'true') {
    await enhancedLegalBlogger.start();
  }
  
  // Run daily content generation
  if (process.env.ENABLE_CONTENT_FACTORY === 'true') {
    await contentFactory.initialize();
    await contentFactory.runDailyContentGeneration();
  }
}

// Run immediately on start
runContentAutomation().catch(console.error);
```

Add to crontab:
```bash
# Run daily at 6 AM EST
0 6 * * * cd /path/to/vlf-website && npm run content-automation
```

### Option 2: Vercel Cron (for Vercel deployments)

Add to `vercel.json`:
```json
{
  "crons": [{
    "path": "/api/content-factory/generate",
    "schedule": "0 11 * * *"  // 6 AM EST (11 UTC)
  }]
}
```

### Option 3: Background Worker

Create `src/workers/content-worker.ts`:
```typescript
import { Queue, Worker } from 'bullmq';
import { contentFactory } from '@/services/content-factory';

const contentQueue = new Queue('content-generation');

// Add job to run daily
await contentQueue.add(
  'daily-generation',
  {},
  {
    repeat: {
      pattern: '0 6 * * *'  // Daily at 6 AM
    }
  }
);

// Worker to process jobs
const worker = new Worker('content-generation', async (job) => {
  await contentFactory.initialize();
  return await contentFactory.runDailyContentGeneration();
});
```

## 🌐 Bilingual Content Configuration

### Automatic Translation

The system automatically generates content in both English and Spanish:

1. **RSS Feed Processing**: Content is generated in English first, then translated
2. **AI Generation**: Can generate directly in Spanish with `language: 'es'`
3. **Quality Control**: Spanish content uses legal terminology appropriate for Spanish-speaking clients

### Language-Specific RSS Feeds

Add Spanish-language RSS feeds to `enhanced-legal-blogger.ts`:
```typescript
private feeds: RSSFeed[] = [
  // ... existing feeds ...
  
  // Spanish-language sources
  {
    name: 'Univision Immigration News',
    url: 'https://www.univision.com/feeds/noticias/inmigracion',
    category: 'immigration-es',
    priority: 2,
  },
  // Add more Spanish sources
];
```

## 📊 Monitoring and Analytics

### View Publishing Calendar

```bash
GET /api/content-factory/calendar?start=2024-01-01&end=2024-01-31
```

### Check Performance

```bash
GET /api/content-factory/performance
```

### Monitor Agent Health

```typescript
import { AgentMonitor } from '@/lib/agents/agent-monitor';

const monitor = AgentMonitor.getInstance();
const health = await monitor.checkAgentHealth('enhanced-legal-blogger');
console.log('Agent health:', health);
```

## 🎯 Best Practices

### 1. Content Quality
- Review generated content before auto-publishing initially
- Set up quality thresholds (e.g., minimum SEO score of 70)
- Monitor user engagement metrics

### 2. SEO Optimization
- Use competitor analysis for high-value topics
- Enable AI Overview optimization for featured snippets
- Focus on long-tail keywords for voice search

### 3. Scheduling
- Publish during optimal times (9 AM, 12 PM, 3 PM EST)
- Spread content throughout the week
- Avoid publishing too much at once

### 4. Bilingual Strategy
- Ensure consistent messaging across languages
- Use native Spanish speakers to review translations
- Optimize for regional Spanish variations (Mexican, Caribbean, etc.)

### 5. Legal Compliance
- Always include disclaimers
- Avoid giving specific legal advice
- Update content when laws change

## 🚨 Troubleshooting

### RSS Feed Issues
```typescript
// Check feed status
const parser = new Parser();
try {
  const feed = await parser.parseURL(feedUrl);
  console.log('Feed working:', feed.items.length, 'items');
} catch (error) {
  console.error('Feed error:', error);
}
```

### Content Generation Failures
- Check OpenAI API key and quota
- Verify database connection
- Review error logs: `tail -f logs/content-generation.log`

### Performance Issues
- Reduce `dailyBlogTarget` if system is overloaded
- Increase worker concurrency limits
- Use caching for keyword research

## 📈 Advanced Features

### Custom Templates
Add new templates to `enhanced-legal-blogger.ts`:
```typescript
private templates: BlogTemplate[] = [
  // ... existing templates ...
  {
    category: 'case-analysis',
    template: (item: RSSItem) => ({
      title: `Legal Analysis: ${item.title}`,
      excerpt: `Expert analysis of recent legal developments...`,
      content: this.generateCaseAnalysisContent(item),
    }),
  },
];
```

### AI Model Configuration
Customize AI behavior in `seo-blog-generation-agent.ts`:
```typescript
this.model = new ChatOpenAI({
  modelName: 'gpt-4-turbo-preview',
  temperature: 0.4,  // Lower = more focused, higher = more creative
  maxTokens: 4000,   // Adjust for longer content
});
```

### Custom Syndication
Add new platforms to `content-syndicator.ts`:
```typescript
async postToCustomPlatform(content: BlogContent) {
  // Implement custom platform integration
}
```

## 🎉 Getting Started Checklist

- [ ] Set up environment variables
- [ ] Configure database with Prisma migrations
- [ ] Choose automation method (cron, Vercel, or worker)
- [ ] Start Enhanced Legal Blogger for RSS monitoring
- [ ] Configure Content Factory settings
- [ ] Test manual content generation
- [ ] Set up monitoring and alerts
- [ ] Review and approve initial generated content
- [ ] Enable auto-publishing when confident
- [ ] Monitor performance and adjust settings

## 📞 Support

For issues or questions:
1. Check logs in `/logs` directory
2. Review error messages in Sentry
3. Contact the development team

---

**Note**: This system generates high-quality, SEO-optimized legal content automatically. Always ensure compliance with legal advertising rules and maintain high quality standards for your firm's reputation.