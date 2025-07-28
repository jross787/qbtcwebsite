#!/usr/bin/env node

/**
 * Post-build script to organize files for deployment
 * Moves vite build output from dist/ to dist/public/ to match server expectations
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');

function copyDirectory(src, dest) {
  // Create destination directory
  fs.mkdirSync(dest, { recursive: true });
  
  // Read source directory
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
  console.log('🔧 Organizing build files for deployment...');
  
  const distPath = path.join(projectRoot, 'dist');
  const publicPath = path.join(distPath, 'public');
  
  // Check if dist directory exists
  if (!fs.existsSync(distPath)) {
    console.error('❌ Build directory "dist" not found. Please run "vite build" first.');
    process.exit(1);
  }
  
  // Check if public directory already exists
  if (fs.existsSync(publicPath)) {
    console.log('📁 Cleaning existing public directory...');
    fs.rmSync(publicPath, { recursive: true, force: true });
  }
  
  // Create public directory
  fs.mkdirSync(publicPath, { recursive: true });
  
  // List of files/directories to move to public/
  const itemsToMove = [];
  const distContents = fs.readdirSync(distPath, { withFileTypes: true });
  
  for (const item of distContents) {
    // Skip the public directory itself and the server bundle
    if (item.name !== 'public' && item.name !== 'index.js') {
      itemsToMove.push(item.name);
    }
  }
  
  // Move frontend files to public directory
  console.log('📦 Moving frontend files to public directory...');
  
  for (const itemName of itemsToMove) {
    const srcPath = path.join(distPath, itemName);
    const destPath = path.join(publicPath, itemName);
    
    try {
      const stat = fs.statSync(srcPath);
      
      if (stat.isDirectory()) {
        copyDirectory(srcPath, destPath);
        fs.rmSync(srcPath, { recursive: true, force: true });
        console.log(`✅ Moved directory: ${itemName}/`);
      } else {
        fs.copyFileSync(srcPath, destPath);
        fs.unlinkSync(srcPath);
        console.log(`✅ Moved file: ${itemName}`);
      }
    } catch (error) {
      console.warn(`⚠️  Could not move ${itemName}:`, error.message);
    }
  }
  
  // Verify critical files exist
  const indexHtmlPath = path.join(publicPath, 'index.html');
  if (fs.existsSync(indexHtmlPath)) {
    console.log('✅ index.html found in public directory');
  } else {
    console.error('❌ index.html not found in public directory');
    process.exit(1);
  }
  
  console.log('🎉 Build organization complete!');
  console.log(`📁 Static files are now in: ${publicPath}`);
  
} catch (error) {
  console.error('❌ Error organizing build:', error.message);
  process.exit(1);
}