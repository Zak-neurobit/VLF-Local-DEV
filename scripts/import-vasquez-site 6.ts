#!/usr/bin/env node

import { VasquezSiteImporter } from '../src/services/vasquez-site-importer';
import { componentLogger } from '../src/lib/logger';

async function main() {
  componentLogger.info('Starting Vasquez Law website import process');

  const importer = new VasquezSiteImporter();

  try {
    await importer.initialize();
    await importer.importFullSite();

    componentLogger.info('Import completed successfully!');
    componentLogger.info('Check the content-import directory for all imported content');
    componentLogger.info('Check public/images/imported for all imported images');

    // Generate import summary
    const fs = require('fs').promises;
    const path = require('path');
    const contentDir = path.join(process.cwd(), 'content-import');

    const files = await fs.readdir(contentDir);
    console.log('\n📊 Import Summary:');
    console.log('==================');
    files.forEach((file: string) => {
      console.log(`✅ ${file}`);
    });
  } catch (error) {
    componentLogger.error('Import failed', error as Error);
    process.exit(1);
  } finally {
    await importer.close();
  }
}

// Run the import
main().catch(console.error);
