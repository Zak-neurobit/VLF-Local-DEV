#!/usr/bin/env node
import { rssFeedMonitor } from '../src/lib/rss/feed-monitor';
import { getEnabledFeeds, FEED_CATEGORIES } from '../src/lib/rss/feeds-config';
import { logger } from '../src/lib/safe-logger';

async function monitorFeeds() {
  console.log('📡 RSS Feed Health Monitor\n');
  console.log('Starting continuous monitoring of RSS feeds...\n');

  // Initial check
  await checkAllFeeds();

  // Set up periodic checks every 30 minutes
  setInterval(
    async () => {
      console.log('\n' + '='.repeat(80) + '\n');
      console.log(`⏰ Periodic check at ${new Date().toLocaleString()}\n`);
      await checkAllFeeds();
    },
    30 * 60 * 1000
  );

  console.log('\n✅ Monitor running. Press Ctrl+C to stop.\n');
}

async function checkAllFeeds() {
  const health = await rssFeedMonitor.checkFeedHealth();

  console.log('📊 Overall Health:');
  console.log(`Total feeds: ${health.total}`);
  console.log(`Working: ${health.working} (${Math.round((health.working / health.total) * 100)}%)`);
  console.log(`Failing: ${health.failing} (${Math.round((health.failing / health.total) * 100)}%)`);

  // Show failing feeds
  if (health.failing > 0) {
    console.log('\n❌ Failing Feeds:');
    health.results
      .filter(r => r.status === 'error')
      .forEach(result => {
        console.log(`  • ${result.feed.name}: ${result.error}`);
      });
  }

  // Show category breakdown
  console.log('\n📈 Category Breakdown:');
  for (const category of FEED_CATEGORIES) {
    const categoryFeeds = getEnabledFeeds(category);
    if (categoryFeeds.length === 0) continue;

    const categoryResults = health.results.filter(r => r.feed.category === category);
    const workingCount = categoryResults.filter(r => r.status === 'success').length;

    console.log(`  ${category}: ${workingCount}/${categoryFeeds.length} working`);
  }

  // Show slow feeds
  const slowFeeds = health.results
    .filter(r => r.status === 'success' && r.fetchTime > 3000)
    .sort((a, b) => b.fetchTime - a.fetchTime);

  if (slowFeeds.length > 0) {
    console.log('\n⚠️  Slow Feeds (>3s):');
    slowFeeds.forEach(result => {
      console.log(`  • ${result.feed.name}: ${(result.fetchTime / 1000).toFixed(1)}s`);
    });
  }

  // Show top news items
  console.log('\n📰 Latest News Items:');
  const allItems = await rssFeedMonitor.fetchByCategory();
  const topItems = allItems.slice(0, 5);

  topItems.forEach((item, index) => {
    console.log(`\n${index + 1}. ${item.title}`);
    console.log(`   Source: ${item.feedName}`);
    console.log(`   Date: ${new Date(item.pubDate).toLocaleString()}`);
    console.log(`   URL: ${item.link}`);
  });

  // Log to application logger as well
  logger.info('RSS feed health check completed', {
    total: health.total,
    working: health.working,
    failing: health.failing,
    failingFeeds: health.results
      .filter(r => r.status === 'error')
      .map(r => ({ name: r.feed.name, error: r.error })),
  });
}

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n\n👋 Shutting down RSS monitor...');
  process.exit(0);
});

// Start monitoring
monitorFeeds().catch(error => {
  console.error('Failed to start RSS monitor:', error);
  process.exit(1);
});
