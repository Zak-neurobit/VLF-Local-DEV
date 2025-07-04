const fs = require('fs').promises;
const path = require('path');

async function testBlogCreation() {
  console.log('Testing blog creation...\n');

  const srcDir = path.join(process.cwd(), 'src');
  const blogDir = path.join(srcDir, 'app', 'blog');

  // Ensure blog directory exists
  await fs.mkdir(blogDir, { recursive: true });

  // Test creating a simple blog post
  const testSlug = 'test-immigration-guide';
  const testBlogDir = path.join(blogDir, testSlug);

  try {
    await fs.mkdir(testBlogDir, { recursive: true });

    const pageContent = `import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Test Immigration Guide | Vasquez Law Firm',
  description: 'Testing blog post creation for SEO optimization',
};

export default function TestPage() {
  return (
    <div className="min-h-screen bg-white p-8">
      <h1 className="text-4xl font-bold text-[#6B1F2E] mb-4">
        Test Immigration Guide
      </h1>
      <p className="text-lg text-gray-700">
        This is a test blog post to verify the blog creation process works correctly.
      </p>
    </div>
  );
}`;

    await fs.writeFile(path.join(testBlogDir, 'page.tsx'), pageContent);
    console.log('✅ Successfully created test blog post at:', testBlogDir);

    // Check if we can read it back
    const files = await fs.readdir(blogDir);
    console.log('\nBlog posts in directory:', files);
  } catch (error) {
    console.error('❌ Error creating test blog post:', error);
  }
}

testBlogCreation().catch(console.error);
