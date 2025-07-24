import { CronJob } from 'cron';
import { generateComprehensiveSitemap } from '@/scripts/generate-sitemap';
import { getSitemapMonitor } from '@/lib/sitemap/sitemap-monitor';

export class SitemapUpdater {
  private job: CronJob;
  
  constructor() {
    // Run every day at 3 AM
    this.job = new CronJob(
      '0 3 * * *',
      async () => {
        console.log('[Sitemap Updater] Starting daily sitemap update...');
        try {
          await generateComprehensiveSitemap();
          
          // Update monitoring stats
          const monitor = getSitemapMonitor();
          await monitor.updateStats();
          
          console.log('[Sitemap Updater] Daily sitemap update completed successfully');
        } catch (error) {
          console.error('[Sitemap Updater] Failed to update sitemap:', error);
        }
      },
      null,
      false,
      'America/New_York'
    );
  }
  
  start() {
    this.job.start();
    console.log('[Sitemap Updater] Cron job started - will run daily at 3 AM ET');
  }
  
  stop() {
    this.job.stop();
    console.log('[Sitemap Updater] Cron job stopped');
  }
  
  // Manual trigger for testing
  async runNow() {
    console.log('[Sitemap Updater] Running manual sitemap update...');
    await generateComprehensiveSitemap();
    const monitor = getSitemapMonitor();
    await monitor.updateStats();
  }
}

// Singleton instance
let updater: SitemapUpdater | null = null;

export function getSitemapUpdater(): SitemapUpdater {
  if (!updater) {
    updater = new SitemapUpdater();
  }
  return updater;
}