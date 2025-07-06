#!/usr/bin/env node

// Hostinger deployment script
// Moves build files from dist/public/ to dist/ for Hostinger compatibility

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Source and destination paths
const sourceDir = path.join(__dirname, 'dist', 'public');
const destDir = path.join(__dirname, 'dist');

console.log('🚀 Preparing build for Hostinger deployment...');

try {
  // Check if source directory exists
  if (!fs.existsSync(sourceDir)) {
    console.error('❌ Error: dist/public/ directory not found. Run "npm run build" first.');
    process.exit(1);
  }

  // Get all files from dist/public/
  const files = fs.readdirSync(sourceDir);
  
  // Move each file/directory to dist/
  files.forEach(file => {
    const sourcePath = path.join(sourceDir, file);
    const destPath = path.join(destDir, file);
    
    // Skip if trying to move public to itself
    if (file === 'public') return;
    
    // Remove destination if it exists
    if (fs.existsSync(destPath)) {
      fs.rmSync(destPath, { recursive: true, force: true });
    }
    
    // Move the file/directory
    fs.renameSync(sourcePath, destPath);
    console.log(`✓ Moved ${file}`);
  });
  
  // Remove the now-empty public directory
  fs.rmdirSync(sourceDir);
  console.log('✓ Removed empty public/ directory');
  
  // Copy .htaccess file to dist/
  const htaccessSource = path.join(__dirname, 'client', 'public', '.htaccess');
  const htaccessDest = path.join(destDir, '.htaccess');
  
  if (fs.existsSync(htaccessSource)) {
    fs.copyFileSync(htaccessSource, htaccessDest);
    console.log('✓ Copied .htaccess file');
  }
  
  console.log('\n✅ Build prepared for Hostinger deployment!');
  console.log('📁 Files are now in dist/ directory');
  console.log('\nNext steps:');
  console.log('1. git add -A dist');
  console.log('2. git commit -m "fix: build output for Hostinger deployment"');
  console.log('3. git push');
  
} catch (error) {
  console.error('❌ Error during deployment preparation:', error.message);
  process.exit(1);
}

