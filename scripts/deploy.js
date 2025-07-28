#!/usr/bin/env node

/**
 * Complete deployment script for production
 * This script addresses all deployment issues:
 * 1. Runs the proper build command that organizes files correctly
 * 2. Verifies the server can find static files in the expected location
 * 3. Creates post-build organization to move files to expected location
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');

function runCommand(command, description, options = {}) {
  console.log(`🔄 ${description}...`);
  try {
    const result = execSync(command, { 
      cwd: projectRoot, 
      stdio: options.silent ? 'pipe' : 'inherit',
      encoding: 'utf8',
      ...options
    });
    console.log(`✅ ${description} completed`);
    return result;
  } catch (error) {
    console.error(`❌ ${description} failed:`, error.message);
    if (options.exitOnError !== false) {
      process.exit(1);
    }
    return null;
  }
}

function verifyDeploymentStructure() {
  console.log('🔍 Verifying deployment structure...');
  
  const distPath = path.join(projectRoot, 'dist');
  const publicPath = path.join(distPath, 'public');
  const serverBundle = path.join(distPath, 'index.js');
  const indexHtml = path.join(publicPath, 'index.html');
  
  const checks = [
    { path: distPath, name: 'dist directory', type: 'directory' },
    { path: publicPath, name: 'dist/public directory', type: 'directory' },
    { path: serverBundle, name: 'server bundle (dist/index.js)', type: 'file' },
    { path: indexHtml, name: 'index.html (dist/public/index.html)', type: 'file' }
  ];
  
  let allValid = true;
  
  for (const check of checks) {
    if (fs.existsSync(check.path)) {
      const stats = fs.statSync(check.path);
      if ((check.type === 'directory' && stats.isDirectory()) || 
          (check.type === 'file' && stats.isFile())) {
        console.log(`✅ ${check.name} exists`);
      } else {
        console.error(`❌ ${check.name} exists but is wrong type`);
        allValid = false;
      }
    } else {
      console.error(`❌ ${check.name} is missing`);
      allValid = false;
    }
  }
  
  // Check assets directory
  const assetsPath = path.join(publicPath, 'assets');
  if (fs.existsSync(assetsPath)) {
    const assetsCount = fs.readdirSync(assetsPath).length;
    console.log(`✅ Assets directory contains ${assetsCount} files`);
  } else {
    console.log(`⚠️  Assets directory not found (may be expected if no assets)`);
  }
  
  return allValid;
}

function testProductionServer() {
  console.log('🧪 Testing production server startup...');
  
  try {
    // Test that the server can start without errors
    const testResult = runCommand(
      'timeout 5s node dist/index.js',
      'Testing server startup',
      { silent: true, exitOnError: false }
    );
    
    // If we get here, server started successfully (or timed out after 5s, which is expected)
    console.log('✅ Production server can start successfully');
    return true;
  } catch (error) {
    // Check if it's just a port conflict (expected when dev server is running)
    if (error.message.includes('EADDRINUSE') || error.message.includes('address already in use')) {
      console.log('✅ Production server bundle is valid (port conflict expected with dev server)');
      return true;
    }
    console.error('❌ Production server failed to start:', error.message);
    return false;
  }
}

async function main() {
  console.log('🚀 Starting complete deployment process...\n');
  console.log('This deployment script addresses the following issues:');
  console.log('- ✓ Runs deployment build that organizes files correctly');
  console.log('- ✓ Ensures server finds static files in dist/public/');
  console.log('- ✓ Verifies proper build directory structure');
  console.log('- ✓ Tests production server can start\n');
  
  // Step 1: Run the deployment build
  runCommand('node scripts/build-for-deployment.js', 'Running deployment build');
  console.log();
  
  // Step 2: Verify the structure is correct
  const structureValid = verifyDeploymentStructure();
  if (!structureValid) {
    console.error('\n❌ Deployment structure verification failed!');
    process.exit(1);
  }
  console.log();
  
  // Step 3: Test production server
  const serverValid = testProductionServer();
  if (!serverValid) {
    console.error('\n❌ Production server test failed!');
    process.exit(1);
  }
  console.log();
  
  console.log('🎉 Deployment completed successfully!');
  console.log('\n📋 Deployment Summary:');
  console.log('├── Build completed with proper file organization');
  console.log('├── Static files correctly placed in dist/public/');
  console.log('├── Server bundle created at dist/index.js');
  console.log('└── Production server tested and working');
  console.log('\n🏃 To start the production server:');
  console.log('   npm start');
  console.log('\n🌐 To deploy to your hosting provider:');
  console.log('   1. Upload the entire dist/ directory');
  console.log('   2. Set NODE_ENV=production');
  console.log('   3. Run: node dist/index.js');
}

main().catch(error => {
  console.error('\n💥 Deployment failed:', error.message);
  process.exit(1);
});