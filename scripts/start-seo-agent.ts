import { SEOAgent, SEOAgentConfig } from '../src/services/seo-agent';
import { ContentScraper, ScraperConfig } from '../src/services/content-scraper';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

async function startSEOAgent() {
  console.log('🚀 Starting Vasquez Law Firm SEO Agent...');

  const seoConfig: SEOAgentConfig = {
    openAIKey: process.env.OPENAI_API_KEY!,
    serpApiKey: process.env.SERP_API_KEY!,
    socialMediaKeys: {
      youtube: process.env.YOUTUBE_API_KEY!,
      tiktok: process.env.TIKTOK_SESSION_ID!,
      instagram: process.env.INSTAGRAM_ACCESS_TOKEN!,
      facebook: process.env.FACEBOOK_ACCESS_TOKEN!,
    },
    targetDA: 80,
    practiceAreas: [
      'immigration',
      'personal-injury',
      'workers-compensation',
      'criminal-defense',
      'family-law',
      'traffic-violations',
    ],
    languages: ['en', 'es'],
    competitors: (process.env.COMPETITOR_URLS || '').split(',').filter(Boolean),
  };

  const scraperConfig: ScraperConfig = {
    youtube: {
      apiKey: process.env.YOUTUBE_API_KEY!,
      channelIds: [],
    },
    tiktok: {
      sessionId: process.env.TIKTOK_SESSION_ID!,
      hashtags: ['legaladvice', 'immigrationlaw', 'knowyourrights', 'abogado'],
    },
    instagram: {
      accessToken: process.env.INSTAGRAM_ACCESS_TOKEN!,
      hashtags: ['immigrationlawyer', 'personalinjury', 'workerscomp', 'criminaldefense'],
    },
    facebook: {
      accessToken: process.env.FACEBOOK_ACCESS_TOKEN!,
      pageIds: [],
    },
  };

  try {
    // Initialize services
    const seoAgent = new SEOAgent(seoConfig);
    const contentScraper = new ContentScraper(scraperConfig);

    await contentScraper.initialize();

    console.log('✅ SEO Agent initialized successfully');
    console.log('📊 Target Domain Authority:', seoConfig.targetDA);
    console.log('🌐 Languages:', seoConfig.languages.join(', '));
    console.log('⚖️  Practice Areas:', seoConfig.practiceAreas.join(', '));
    console.log('🔍 Monitoring Competitors:', seoConfig.competitors.length);

    // Log cron job schedules
    console.log('\n📅 Scheduled Tasks:');
    console.log('- Trending News Check: Every hour');
    console.log('- Social Media Scan: Every 4 hours');
    console.log('- Competitor Analysis: Daily at 2 AM');
    console.log('- SEO Audit: Weekly on Sundays at 3 AM');

    console.log('\n🤖 SEO Agent is now running...');
    console.log('Press Ctrl+C to stop\n');

    // Handle graceful shutdown
    process.on('SIGINT', async () => {
      console.log('\n🛑 Shutting down SEO Agent...');
      await seoAgent.stop();
      await contentScraper.close();
      process.exit(0);
    });

    // Keep the process running
    process.stdin.resume();
  } catch (error) {
    console.error('❌ Failed to start SEO Agent:', error);
    process.exit(1);
  }
}

// Run the agent
startSEOAgent();
