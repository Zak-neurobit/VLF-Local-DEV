#!/usr/bin/env node
import RssParser from 'rss-parser';
import { logger } from '../src/lib/safe-logger';

// Copy of all RSS feeds from enhanced-legal-blogger.ts
const RSS_FEEDS = [
  // GOVERNMENT FEEDS - Usually most reliable
  {
    name: 'Federal Register - DHS',
    url: 'https://www.federalregister.gov/api/v1/documents.rss?conditions[agencies][]=homeland-security-department',
    category: 'immigration',
    priority: 1,
  },
  {
    name: 'Federal Register - USCIS',
    url: 'https://www.federalregister.gov/api/v1/documents.rss?conditions[agencies][]=citizenship-and-immigration-services',
    category: 'immigration',
    priority: 1,
  },
  {
    name: 'Federal Register - DOJ',
    url: 'https://www.federalregister.gov/api/v1/documents.rss?conditions[agencies][]=justice-department&conditions[term]=immigration',
    category: 'immigration',
    priority: 1,
  },

  // WORKING NEWS SOURCES - Alternative to government feeds
  {
    name: 'Immigration Impact - News',
    url: 'https://immigrationimpact.com/feed/',
    category: 'immigration',
    priority: 2,
  },
  {
    name: 'American Immigration Council',
    url: 'https://www.americanimmigrationcouncil.org/rss.xml',
    category: 'immigration',
    priority: 2,
  },
  {
    name: 'Migration Policy Institute',
    url: 'https://www.migrationpolicy.org/rss.xml',
    category: 'immigration',
    priority: 2,
  },
  {
    name: 'National Immigration Forum',
    url: 'https://immigrationforum.org/feed/',
    category: 'immigration',
    priority: 2,
  },
  {
    name: 'Immigration Legal Resource Center',
    url: 'https://www.ilrc.org/rss.xml',
    category: 'immigration',
    priority: 2,
  },

  // LEGAL NEWS SOURCES
  {
    name: 'Law360 Immigration',
    url: 'https://www.law360.com/immigration/rss',
    category: 'immigration',
    priority: 2,
  },
  {
    name: 'JD Supra Immigration',
    url: 'https://www.jdsupra.com/rss/immigration.xml',
    category: 'immigration',
    priority: 2,
  },

  // SECONDARY FEEDS (lower priority but still valuable)
  // Department of Justice
  {
    name: 'DOJ Immigration',
    url: 'https://www.justice.gov/news/rss?topics=257551',
    category: 'immigration',
    priority: 2,
  },
  // ICE News
  {
    name: 'ICE News',
    url: 'https://www.ice.gov/rss/news/all.xml',
    category: 'immigration',
    priority: 2,
  },
  // CBP News
  {
    name: 'CBP Border News',
    url: 'https://www.cbp.gov/newsroom/national-media-release/rss.xml',
    category: 'immigration',
    priority: 2,
  },

  // CONGRESS & SENATE - These may have intermittent availability
  // Congressional Research Service
  {
    name: 'Congressional Research Service',
    url: 'https://crsreports.congress.gov/rss/reports.xml',
    category: 'congress',
    priority: 2,
  },
  // House Judiciary Committee (Immigration)
  {
    name: 'House Judiciary',
    url: 'https://judiciary.house.gov/news/rss.xml',
    category: 'congress',
    priority: 2,
  },
  // Senate Judiciary Committee (Immigration)
  {
    name: 'Senate Judiciary',
    url: 'https://www.judiciary.senate.gov/rss/newsroom',
    category: 'senate',
    priority: 2,
  },

  // NORTH CAROLINA STATE & LOCAL NEWS
  // NC State Bar
  {
    name: 'NC State Bar',
    url: 'https://www.ncbar.gov/news/feed/',
    category: 'state-nc',
    priority: 1,
  },
  // NC Governor's Office
  {
    name: 'NC Governor',
    url: 'https://governor.nc.gov/news/feed',
    category: 'state-nc',
    priority: 2,
  },
  // NC General Assembly
  {
    name: 'NC Legislature',
    url: 'https://www.ncleg.gov/News/RSS',
    category: 'state-nc',
    priority: 2,
  },
  // Charlotte Local News
  {
    name: 'Charlotte Observer',
    url: 'https://www.charlotteobserver.com/news/local/immigration/rss',
    category: 'local-nc',
    priority: 2,
  },
  // Raleigh News
  {
    name: 'News & Observer',
    url: 'https://www.newsobserver.com/news/local/immigration/rss',
    category: 'local-nc',
    priority: 2,
  },
  // NC Policy Watch (Immigration)
  {
    name: 'NC Policy Watch',
    url: 'https://ncpolicywatch.com/category/articles/immigration/feed/',
    category: 'state-nc',
    priority: 2,
  },

  // FLORIDA STATE & LOCAL NEWS
  // Florida Bar
  {
    name: 'Florida Bar',
    url: 'https://www.floridabar.org/news/rss-feed/',
    category: 'state-fl',
    priority: 1,
  },
  // Florida Governor
  {
    name: 'FL Governor',
    url: 'https://www.flgov.com/feed/',
    category: 'state-fl',
    priority: 2,
  },
  // Florida Legislature
  {
    name: 'FL Legislature',
    url: 'https://www.flsenate.gov/RSS/Bills',
    category: 'state-fl',
    priority: 2,
  },
  // Orlando Sentinel
  {
    name: 'Orlando Sentinel',
    url: 'https://www.orlandosentinel.com/news/immigration/rss',
    category: 'local-fl',
    priority: 2,
  },
  // Miami Herald Immigration
  {
    name: 'Miami Herald',
    url: 'https://www.miamiherald.com/news/local/immigration/rss',
    category: 'local-fl',
    priority: 2,
  },
  // Tampa Bay Times
  {
    name: 'Tampa Bay Times',
    url: 'https://www.tampabay.com/news/immigration/rss',
    category: 'local-fl',
    priority: 2,
  },
];

interface FeedTestResult {
  name: string;
  url: string;
  category: string;
  status: 'success' | 'error';
  error?: string;
  itemCount?: number;
  statusCode?: number;
  suggestedFix?: string;
}

async function testFeed(feed: (typeof RSS_FEEDS)[0]): Promise<FeedTestResult> {
  const parser = new RssParser({
    timeout: 5000,
    headers: {
      'User-Agent': 'Mozilla/5.0 (compatible; Vasquez Law Firm News Monitor/1.0)',
      Accept: 'application/rss+xml, application/xml, text/xml, */*',
    },
  });

  try {
    const feedData = await parser.parseURL(feed.url);
    return {
      name: feed.name,
      url: feed.url,
      category: feed.category,
      status: 'success',
      itemCount: feedData.items?.length || 0,
    };
  } catch (error: any) {
    let statusCode: number | undefined;
    let suggestedFix: string | undefined;

    if (error.message?.includes('403')) {
      statusCode = 403;
      suggestedFix =
        'Feed requires authentication or blocks automated access. Consider using their API or finding an alternative source.';
    } else if (error.message?.includes('404')) {
      statusCode = 404;
      suggestedFix = 'Feed URL no longer exists. Check the website for an updated RSS feed URL.';
    } else if (error.message?.includes('timeout')) {
      suggestedFix = 'Feed is timing out. May be temporarily down or require longer timeout.';
    } else if (error.message?.includes('ENOTFOUND')) {
      suggestedFix = 'Domain not found. Check if the website still exists.';
    }

    return {
      name: feed.name,
      url: feed.url,
      category: feed.category,
      status: 'error',
      error: error.message || 'Unknown error',
      statusCode,
      suggestedFix,
    };
  }
}

async function main() {
  console.log('🔍 Testing RSS Feeds Health Check\n');
  console.log(`Testing ${RSS_FEEDS.length} feeds...\n`);

  const results: FeedTestResult[] = [];

  // Test feeds in batches to avoid overwhelming
  const batchSize = 5;
  for (let i = 0; i < RSS_FEEDS.length; i += batchSize) {
    const batch = RSS_FEEDS.slice(i, i + batchSize);
    const batchResults = await Promise.all(batch.map(testFeed));
    results.push(...batchResults);

    // Progress indicator
    console.log(
      `Progress: ${Math.min(i + batchSize, RSS_FEEDS.length)}/${RSS_FEEDS.length} feeds tested`
    );
  }

  // Separate results
  const workingFeeds = results.filter(r => r.status === 'success');
  const failingFeeds = results.filter(r => r.status === 'error');

  // Display results
  console.log('\n✅ WORKING FEEDS:');
  console.log('='.repeat(80));
  workingFeeds.forEach(feed => {
    console.log(`✓ ${feed.name} (${feed.category}) - ${feed.itemCount} items`);
    console.log(`  URL: ${feed.url}`);
  });

  console.log('\n❌ FAILING FEEDS:');
  console.log('='.repeat(80));
  failingFeeds.forEach(feed => {
    console.log(`✗ ${feed.name} (${feed.category})`);
    console.log(`  URL: ${feed.url}`);
    console.log(`  Error: ${feed.error}`);
    if (feed.statusCode) {
      console.log(`  Status Code: ${feed.statusCode}`);
    }
    if (feed.suggestedFix) {
      console.log(`  Suggested Fix: ${feed.suggestedFix}`);
    }
    console.log('');
  });

  // Summary
  console.log('\n📊 SUMMARY:');
  console.log('='.repeat(80));
  console.log(`Total Feeds: ${RSS_FEEDS.length}`);
  console.log(
    `Working: ${workingFeeds.length} (${Math.round((workingFeeds.length / RSS_FEEDS.length) * 100)}%)`
  );
  console.log(
    `Failing: ${failingFeeds.length} (${Math.round((failingFeeds.length / RSS_FEEDS.length) * 100)}%)`
  );

  // Category breakdown
  console.log('\n📈 CATEGORY BREAKDOWN:');
  const categories = [...new Set(RSS_FEEDS.map(f => f.category))];
  categories.forEach(category => {
    const categoryFeeds = results.filter(r => r.category === category);
    const workingCount = categoryFeeds.filter(r => r.status === 'success').length;
    console.log(`${category}: ${workingCount}/${categoryFeeds.length} working`);
  });

  // Export failing feeds for fixing
  if (failingFeeds.length > 0) {
    const failingFeedsList = failingFeeds.map(f => ({
      name: f.name,
      url: f.url,
      category: f.category,
      error: f.error,
      suggestedFix: f.suggestedFix,
    }));

    console.log('\n💡 FEEDS NEEDING FIXES:');
    console.log(JSON.stringify(failingFeedsList, null, 2));
  }
}

main().catch(console.error);
