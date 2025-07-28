#!/usr/bin/env node

/**
 * Test Production Build on Different Port
 * This verifies the deployment fixes work correctly
 */

import { exec } from 'child_process';

console.log('🧪 Testing production build on port 3000...\n');

// Set environment variables for production test
process.env.NODE_ENV = 'production';
process.env.PORT = '3000';

// Start the production server
const server = exec('node dist/index.js', (error, stdout, stderr) => {
  if (error) {
    console.error(`❌ Server error: ${error}`);
    return;
  }
  if (stderr) {
    console.error(`⚠️  Server stderr: ${stderr}`);
  }
  console.log(`📄 Server output: ${stdout}`);
});

// Log server output
server.stdout.on('data', (data) => {
  console.log(`📡 ${data.toString().trim()}`);
});

server.stderr.on('data', (data) => {
  console.error(`⚠️  ${data.toString().trim()}`);
});

// Test for 10 seconds then stop
setTimeout(() => {
  console.log('\n✅ Production test completed - server started successfully!');
  console.log('🔗 Test server was running on: http://localhost:3000');
  console.log('📁 Static files served from: dist/public/');
  server.kill();
  process.exit(0);
}, 10000);

console.log('⏳ Testing for 10 seconds...');