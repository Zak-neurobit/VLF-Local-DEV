const axios = require('axios');

async function testImport() {
  try {
    console.log('🚀 Starting Vasquez Law website import...');

    const response = await axios.post('http://localhost:3000/api/content-import', {
      action: 'import-all',
    });

    console.log('✅ Import initiated:', response.data);

    // Check status after 5 seconds
    setTimeout(async () => {
      try {
        const statusResponse = await axios.get('http://localhost:3000/api/content-import');
        console.log('📊 Import status:', statusResponse.data);
      } catch (error) {
        console.error('❌ Status check failed:', error.message);
      }
    }, 5000);
  } catch (error) {
    console.error('❌ Import failed:', error.response?.data || error.message);
  }
}

// Run the import
testImport();
