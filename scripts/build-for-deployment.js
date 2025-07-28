#!/usr/bin/env node

/**
 * Complete build script for deployment
 * Runs vite build, organizes files, and builds server bundle
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');

function runCommand(command, description) {
  console.log(`🔄 ${description}...`);
  try {
    execSync(command, { cwd: projectRoot, stdio: 'inherit' });
    console.log(`✅ ${description} completed`);
  } catch (error) {
    console.error(`❌ ${description} failed:`, error.message);
    process.exit(1);
  }
}

function copyDirectory(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });
  
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    
    if (entry.isDirectory()) {
      copyDirectory(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

try {
  console.log('🚀 Starting deployment build process...\n');
  
  // Step 1: Clean existing build
  const distPath = path.join(projectRoot, 'dist');
  if (fs.existsSync(distPath)) {
    console.log('🧹 Cleaning existing build directory...');
    fs.rmSync(distPath, { recursive: true, force: true });
    console.log('✅ Build directory cleaned\n');
  }
  
  // Step 2: Build frontend with Vite
  runCommand('npx vite build', 'Building frontend');
  console.log();
  
  // Step 3: Organize frontend files
  console.log('📁 Organizing frontend files...');
  const publicPath = path.join(distPath, 'public');
  
  // Create public directory
  fs.mkdirSync(publicPath, { recursive: true });
  
  // Move all files from dist/ to dist/public/ except server files
  const distContents = fs.readdirSync(distPath, { withFileTypes: true });
  
  for (const item of distContents) {
    if (item.name !== 'public' && item.name !== 'index.js') {
      const srcPath = path.join(distPath, item.name);
      const destPath = path.join(publicPath, item.name);
      
      if (item.isDirectory()) {
        copyDirectory(srcPath, destPath);
        fs.rmSync(srcPath, { recursive: true, force: true });
      } else {
        fs.copyFileSync(srcPath, destPath);
        fs.unlinkSync(srcPath);
      }
      console.log(`✅ Moved: ${item.name}`);
    }
  }
  console.log();
  
  // Step 4: Build server bundle
  runCommand(
    'npx esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist',
    'Building server bundle'
  );
  console.log();
  
  // Step 5: Verify build structure
  console.log('🔍 Verifying build structure...');
  
  const requiredFiles = [
    path.join(publicPath, 'index.html'),
    path.join(distPath, 'index.js')
  ];
  
  for (const filePath of requiredFiles) {
    if (fs.existsSync(filePath)) {
      console.log(`✅ Found: ${path.relative(projectRoot, filePath)}`);
    } else {
      console.error(`❌ Missing: ${path.relative(projectRoot, filePath)}`);
      process.exit(1);
    }
  }
  
  // Check for assets directory
  const assetsPath = path.join(publicPath, 'assets');
  if (fs.existsSync(assetsPath)) {
    const assetsCount = fs.readdirSync(assetsPath).length;
    console.log(`✅ Found assets directory with ${assetsCount} files`);
  }
  
  console.log('\n🎉 Deployment build completed successfully!');
  console.log('\nBuild structure:');
  console.log('├── dist/');
  console.log('│   ├── index.js          (server bundle)');
  console.log('│   └── public/           (static files)');
  console.log('│       ├── index.html');
  console.log('│       └── assets/       (CSS, JS, images)');
  console.log('\nTo start the production server, run: npm start');
  
} catch (error) {
  console.error('\n❌ Build process failed:', error.message);
  process.exit(1);
}