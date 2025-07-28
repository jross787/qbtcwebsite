#!/usr/bin/env node

/**
 * Production Deployment Script for qBTC
 * 
 * This script addresses all the deployment issues mentioned:
 * 1. ✅ Uses deployment script that organizes files correctly
 * 2. ✅ Creates the missing public directory structure after build
 * 3. ✅ Adds post-build step to move static files to expected location
 * 4. ✅ Ensures server code looks for static files in correct directory
 * 5. ✅ Runs deployment organization before starting server
 */

import { execSync } from 'child_process';
import { existsSync } from 'fs';
import { join } from 'path';

console.log('🚀 qBTC Production Deployment');
console.log('=============================\n');

// Step 1: Run the deployment build process
console.log('1️⃣ Building application with correct file organization...');
try {
  execSync('node scripts/build-for-deployment.js', { stdio: 'inherit' });
  console.log('✅ Build completed successfully\n');
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}

// Step 2: Verify the build structure
console.log('2️⃣ Verifying deployment structure...');
const requiredPaths = [
  'dist/index.js',           // Server bundle
  'dist/public/index.html',  // Main HTML file  
  'dist/public/assets'       // Static assets
];

let allGood = true;
for (const path of requiredPaths) {
  if (existsSync(path)) {
    console.log(`✅ Found: ${path}`);
  } else {
    console.log(`❌ Missing: ${path}`);
    allGood = false;
  }
}

if (!allGood) {
  console.error('\n❌ Deployment structure verification failed');
  process.exit(1);
}

console.log('\n✅ All deployment checks passed!');

// Step 3: Start the production server
console.log('\n3️⃣ Starting production server...');
console.log('Server will serve static files from: dist/public/');
console.log('API endpoints available at: /api/*');
console.log('Frontend routes handled by: index.html\n');

try {
  process.env.NODE_ENV = 'production';
  execSync('node dist/index.js', { stdio: 'inherit' });
} catch (error) {
  console.error('❌ Server failed to start:', error.message);
  process.exit(1);
}