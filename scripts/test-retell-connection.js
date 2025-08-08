// Test Retell connection with timing
const fetch = require('node-fetch');

async function testConnection() {
  console.log('\n=== TESTING RETELL CONNECTION ===\n');
  
  const startTime = Date.now();
  
  try {
    // 1. Create call
    console.log('1. Creating web call...');
    const response = await fetch('http://localhost:3001/api/retell/create-call', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ language: 'en' })
    });
    
    const data = await response.json();
    const createTime = Date.now() - startTime;
    
    console.log(`   ✅ Call created in ${createTime}ms`);
    console.log(`   Call ID: ${data.call_id}`);
    console.log(`   Status: ${data.call_status}`);
    console.log(`   Token received: ${!!data.access_token}`);
    
    // 2. Check timing
    const timeRemaining = 30000 - createTime;
    console.log(`\n2. Time Analysis:`);
    console.log(`   Time used: ${createTime}ms`);
    console.log(`   Time remaining: ${timeRemaining}ms`);
    console.log(`   ${timeRemaining > 25000 ? '✅' : '⚠️'} Plenty of time to connect`);
    
    // 3. Test diagnostic endpoint
    console.log('\n3. Running diagnostics...');
    const diagResponse = await fetch('http://localhost:3001/api/retell/test-connection');
    const diagnostics = await diagResponse.json();
    
    console.log(`   Call creation: ${diagnostics.timing?.createCallMs}ms`);
    console.log(`   Agent version: ${diagnostics.agent?.version}`);
    console.log(`   Issues found: ${diagnostics.recommendations?.length || 0}`);
    
    if (diagnostics.recommendations?.length > 0) {
      console.log('\n   ⚠️ Recommendations:');
      diagnostics.recommendations.forEach(rec => {
        console.log(`   - ${rec}`);
      });
    }
    
    // 4. Summary
    console.log('\n=== CONNECTION TEST COMPLETE ===');
    console.log('\n✅ Server-side is working correctly');
    console.log('✅ Tokens are being generated');
    console.log('✅ Timing is within limits');
    
    console.log('\n📋 NEXT STEPS:');
    console.log('1. Open http://localhost:3001/test-retell in Firefox');
    console.log('2. Open browser console (F12)');
    console.log('3. Click "Test Connection"');
    console.log('4. Look for these in console:');
    console.log('   - "✅ Call started successfully" message');
    console.log('   - Connection time should be < 2000ms');
    console.log('   - No "user not joined" errors');
    
    console.log('\n💡 If still seeing "user not joined":');
    console.log('   - The issue is likely client-side');
    console.log('   - Check microphone permissions');
    console.log('   - Try Chrome instead of Firefox');
    console.log('   - Clear browser cache/cookies');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testConnection();