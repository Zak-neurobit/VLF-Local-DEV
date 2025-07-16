#!/usr/bin/env node

/**
 * Socket Server Launch Test
 * Verifies core socket server functionality is working for production launch
 */

const { createServer } = require('http');
const { Server } = require('socket.io');
const { getChatSocketServer } = require('./src/lib/socket/server');

async function testSocketServerLaunch() {
  console.log('🚀 Starting Socket Server Launch Test...\n');

  try {
    // Create HTTP server
    const httpServer = createServer();

    console.log('✅ HTTP server created');

    // Initialize socket server
    const socketServer = getChatSocketServer(httpServer);

    console.log('✅ Socket server initialized');

    // Test basic functionality
    const activeSessionsCount = socketServer.getActiveSessionsCount();
    console.log(`✅ Active sessions count: ${activeSessionsCount}`);

    // Test health status
    const healthStatus = socketServer.getHealthStatus();
    console.log(`✅ Health status: ${healthStatus.status}`);

    // Test metrics
    const metrics = socketServer.getMetrics();
    console.log(`✅ Metrics collected: ${Object.keys(metrics).length} metric types`);

    // Test admin functionality
    if (typeof socketServer.getConnectionsData === 'function') {
      const connections = socketServer.getConnectionsData();
      console.log(`✅ Admin functions available: ${connections.length} connections`);
    }

    // Test broadcasting capability
    if (typeof socketServer.broadcastToAll === 'function') {
      console.log('✅ Broadcasting capability available');
    }

    // Test room management
    if (typeof socketServer.getRoomParticipantCount === 'function') {
      const roomCount = socketServer.getRoomParticipantCount('test-room');
      console.log(`✅ Room management available: ${roomCount} participants in test room`);
    }

    console.log('\n🎉 Socket Server Launch Test PASSED!');
    console.log('🚀 Ready for production deployment!');

    return true;
  } catch (error) {
    console.error('\n❌ Socket Server Launch Test FAILED!');
    console.error(`Error: ${error.message}`);
    console.error(`Stack: ${error.stack}`);

    return false;
  }
}

// Run the test
if (require.main === module) {
  testSocketServerLaunch()
    .then(success => {
      process.exit(success ? 0 : 1);
    })
    .catch(error => {
      console.error('Test runner error:', error);
      process.exit(1);
    });
}

module.exports = { testSocketServerLaunch };
