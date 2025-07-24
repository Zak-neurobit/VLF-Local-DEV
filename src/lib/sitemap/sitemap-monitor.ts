import { FileSystemPageDiscovery } from './page-discovery';
import { prisma } from '../prisma';
import { Server } from 'socket.io';
import chokidar from 'chokidar';
import path from 'path';

export class SitemapMonitor {
  private discovery: FileSystemPageDiscovery;
  private io?: Server;
  private watcher?: chokidar.FSWatcher;
  private lastStats: any = null;
  
  constructor(io?: Server) {
    this.discovery = new FileSystemPageDiscovery();
    this.io = io;
  }
  
  async start() {
    console.log('🔍 Starting sitemap monitoring...');
    
    // Initial scan
    await this.updateStats();
    
    // Watch for file changes
    const appDir = path.join(process.cwd(), 'src/app');
    this.watcher = chokidar.watch(['**/page.tsx', '**/page.ts'], {
      cwd: appDir,
      ignored: ['**/node_modules/**', '**/_*/**'],
      persistent: true,
    });
    
    this.watcher
      .on('add', () => this.handleFileChange('added'))
      .on('unlink', () => this.handleFileChange('removed'))
      .on('change', () => this.handleFileChange('modified'));
    
    // Periodic updates every 5 minutes
    setInterval(() => this.updateStats(), 5 * 60 * 1000);
  }
  
  private async handleFileChange(type: string) {
    console.log(`📄 Page ${type}, updating sitemap stats...`);
    await this.updateStats();
  }
  
  async updateStats() {
    try {
      const pages = await this.discovery.discoverAllPages();
      
      // Calculate statistics
      let totalPages = 0;
      const missingPages: string[] = [];
      const parityIssues: Array<{
        path: string;
        hasEn: boolean;
        hasEs: boolean;
      }> = [];
      
      for (const [path, pair] of pages) {
        if (pair.en) totalPages++;
        if (pair.es) totalPages++;
        
        if (pair.en && !pair.es) {
          parityIssues.push({ path, hasEn: true, hasEs: false });
        } else if (!pair.en && pair.es) {
          parityIssues.push({ path, hasEn: false, hasEs: true });
        }
      }
      
      // Add dynamic content
      const [blogCount, attorneyCount] = await Promise.all([
        prisma.blogPost.count({ where: { published: true } }).catch(() => 0),
        prisma.attorney.count().catch(() => 0),
      ]);
      
      totalPages += (blogCount + attorneyCount) * 2; // EN + ES
      
      const indexedPages = totalPages - missingPages.length;
      const coverage = totalPages > 0 ? (indexedPages / totalPages) * 100 : 0;
      
      this.lastStats = {
        totalPages,
        indexedPages,
        missingPages,
        parityIssues: parityIssues.slice(0, 50),
        lastUpdated: new Date().toISOString(),
        coverage,
      };
      
      // Emit to connected clients
      if (this.io) {
        this.io.emit('sitemap:stats', this.lastStats);
      }
      
      // Alert on critical issues
      if (coverage < 95) {
        console.warn(`⚠️  Sitemap coverage below 95%: ${coverage.toFixed(1)}%`);
      }
      
      if (parityIssues.length > 10) {
        console.warn(`⚠️  ${parityIssues.length} pages missing translations`);
      }
      
    } catch (error) {
      console.error('Failed to update sitemap stats:', error);
    }
  }
  
  getLastStats() {
    return this.lastStats;
  }
  
  stop() {
    if (this.watcher) {
      this.watcher.close();
    }
  }
}

// Singleton instance
let monitor: SitemapMonitor | null = null;

export function getSitemapMonitor(io?: Server): SitemapMonitor {
  if (!monitor) {
    monitor = new SitemapMonitor(io);
  }
  return monitor;
}