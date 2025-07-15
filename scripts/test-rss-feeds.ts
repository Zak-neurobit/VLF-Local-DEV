#!/usr/bin/env tsx
import RssParser from 'rss-parser';
import { logger } from '../src/lib/logger';

interface RSSFeed {
  name: string;
  url: string;
  category: string;
  priority: number;
}

// Test a subset of feeds to verify RSS parsing works
const testFeeds: RSSFeed[] = [
  {
    name: 'USCIS News',
    url: 'https://www.uscis.gov/rss/news.xml',
    category: 'immigration',
    priority: 1,
  },
  {
    name: 'Federal Register - DHS',
    url: 'https://www.federalregister.gov/api/v1/documents.rss?conditions[agencies][]=homeland-security-department',
    category: 'immigration',
    priority: 1,
  },
  {
    name: 'White House',
    url: 'https://www.whitehouse.gov/briefing-room/feed/',
    category: 'executive-orders',
    priority: 1,
  },
  {
    name: 'House Immigration Bills',
    url: 'https://www.congress.gov/rss/bills-congress-house.xml',
    category: 'congress',
    priority: 1,
  },
  {
    name: 'Senate Immigration Bills',
    url: 'https://www.congress.gov/rss/bills-congress-senate.xml',
    category: 'senate',
    priority: 1,
  },
];

async function testRSSFeeds() {
  console.log('🔍 Testing RSS Feed Parsing...\n');

  const parser = new RssParser({
    timeout: 10000,
    headers: {
      'User-Agent': 'Vasquez Law Firm News Monitor/1.0',
    },
  });

  const results = {
    successful: 0,
    failed: 0,
    totalItems: 0,
    feedResults: [] as Array<{
      name: string;
      status: 'success' | 'failed';
      itemCount: number;
      error?: string;
      sampleItems?: Array<{
        title: string;
        pubDate: string;
        link: string;
      }>;
    }>,
  };

  for (const feed of testFeeds) {
    console.log(`📡 Testing: ${feed.name}`);

    try {
      const feedData = await parser.parseURL(feed.url);

      if (feedData.items && feedData.items.length > 0) {
        results.successful++;
        results.totalItems += feedData.items.length;

        // Get sample items (first 3)
        const sampleItems = feedData.items.slice(0, 3).map(item => ({
          title: item.title || 'No title',
          pubDate: item.pubDate || 'No date',
          link: item.link || 'No link',
        }));

        results.feedResults.push({
          name: feed.name,
          status: 'success',
          itemCount: feedData.items.length,
          sampleItems,
        });

        console.log(`✅ Success: ${feedData.items.length} items found`);

        // Show first item as example
        if (feedData.items[0]) {
          console.log(`   📄 Latest: "${feedData.items[0].title?.substring(0, 80)}..."`);
          console.log(`   📅 Date: ${feedData.items[0].pubDate || 'No date'}`);
        }
      } else {
        results.failed++;
        results.feedResults.push({
          name: feed.name,
          status: 'failed',
          itemCount: 0,
          error: 'No items found',
        });
        console.log(`❌ Failed: No items found`);
      }
    } catch (error) {
      results.failed++;
      results.feedResults.push({
        name: feed.name,
        status: 'failed',
        itemCount: 0,
        error: error instanceof Error ? error.message : String(error),
      });
      console.log(`❌ Failed: ${error instanceof Error ? error.message : String(error)}`);
    }

    console.log(''); // Empty line for readability
  }

  // Summary
  console.log('📊 RSS Feed Test Results:');
  console.log(`✅ Successful feeds: ${results.successful}`);
  console.log(`❌ Failed feeds: ${results.failed}`);
  console.log(`📰 Total news items: ${results.totalItems}`);
  console.log('');

  // Show successful feeds
  const successfulFeeds = results.feedResults.filter(f => f.status === 'success');
  if (successfulFeeds.length > 0) {
    console.log('🎉 WORKING RSS FEEDS:');
    successfulFeeds.forEach(feed => {
      console.log(`  • ${feed.name}: ${feed.itemCount} items`);
      if (feed.sampleItems && feed.sampleItems.length > 0) {
        console.log(`    Latest: "${feed.sampleItems[0].title.substring(0, 60)}..."`);
      }
    });
    console.log('');
  }

  // Show failed feeds
  const failedFeeds = results.feedResults.filter(f => f.status === 'failed');
  if (failedFeeds.length > 0) {
    console.log('❌ FAILED RSS FEEDS:');
    failedFeeds.forEach(feed => {
      console.log(`  • ${feed.name}: ${feed.error}`);
    });
    console.log('');
  }

  // Test extraction of immigration-related keywords
  console.log('🔍 Testing Immigration Keyword Extraction...');
  const testItems = successfulFeeds
    .filter(f => f.sampleItems && f.sampleItems.length > 0)
    .flatMap(f => f.sampleItems || [])
    .slice(0, 5);

  testItems.forEach(item => {
    const keywords = extractImmigrationKeywords(item.title);
    if (keywords.length > 0) {
      console.log(`📄 "${item.title.substring(0, 50)}..."`);
      console.log(`   Keywords: ${keywords.join(', ')}`);
    }
  });

  console.log('');
  console.log('🎯 RSS Feed Testing Complete!');

  if (results.successful > 0) {
    console.log(
      `✅ SUCCESS: ${results.successful} feeds are working with ${results.totalItems} total items`
    );
    console.log('💡 The RSS parser is working correctly!');
  } else {
    console.log('❌ FAILURE: No feeds are working');
  }
}

function extractImmigrationKeywords(text: string): string[] {
  const keywords: string[] = [];
  const lowerText = text.toLowerCase();

  // Immigration-related keywords
  if (lowerText.includes('immigration')) keywords.push('immigration');
  if (lowerText.includes('visa')) keywords.push('visa');
  if (lowerText.includes('green card')) keywords.push('green card');
  if (lowerText.includes('citizenship')) keywords.push('citizenship');
  if (lowerText.includes('deportation')) keywords.push('deportation');
  if (lowerText.includes('asylum')) keywords.push('asylum');
  if (lowerText.includes('refugee')) keywords.push('refugee');
  if (lowerText.includes('uscis')) keywords.push('USCIS');
  if (lowerText.includes('ice')) keywords.push('ICE');
  if (lowerText.includes('daca')) keywords.push('DACA');
  if (lowerText.includes('tps')) keywords.push('TPS');
  if (lowerText.includes('h-1b') || lowerText.includes('h1b')) keywords.push('H-1B');
  if (lowerText.includes('border')) keywords.push('border');
  if (lowerText.includes('migrant')) keywords.push('migrant');

  return keywords;
}

// Run the test
if (require.main === module) {
  testRSSFeeds().catch(console.error);
}
