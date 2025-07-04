import axios from 'axios';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

async function importContent() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

  console.log('🔄 Starting content import from www.vasquezlawnc.com...');
  console.log(`📍 Target: ${baseUrl}`);

  try {
    // Import all content
    console.log('\n📥 Importing entire website...');
    const response = await axios.post(`${baseUrl}/api/content-import`, {
      action: 'import-all',
    });

    const result = response.data;

    console.log('\n✅ Import Complete!');
    console.log(`📄 Pages imported: ${result.pages}`);
    console.log(`📝 Blog posts imported: ${result.blogs}`);
    console.log(`🖼️  Images found: ${result.images}`);

    if (result.errors.length > 0) {
      console.log('\n⚠️  Errors encountered:');
      result.errors.forEach((error: string) => {
        console.log(`  - ${error}`);
      });
    }

    // Optimize imported content
    console.log('\n🚀 Optimizing imported content for SEO...');
    const optimizeResponse = await axios.post(`${baseUrl}/api/content-import`, {
      action: 'optimize-content',
    });

    console.log(`✨ Optimized ${optimizeResponse.data.optimized} pieces of content`);

    console.log('\n🎉 Content import and optimization complete!');
    console.log('\nNext steps:');
    console.log('1. Review imported content in the admin panel');
    console.log('2. Publish content as needed');
    console.log('3. Start the SEO agent for ongoing content generation');
  } catch (error) {
    console.error('\n❌ Import failed:', error);
    if (axios.isAxiosError(error)) {
      console.error('Response:', error.response?.data);
    }
    process.exit(1);
  }
}

// Run the import
importContent();
