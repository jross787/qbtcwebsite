#!/usr/bin/env node

/**
 * Production build script for qBTC
 * This script builds the project and organizes files for deployment
 */

import { execSync } from 'child_process';
import { existsSync, mkdirSync, renameSync, copyFileSync } from 'fs';
import { join } from 'path';

console.log('🚀 Starting production build...');

try {
  // Clean dist directory
  execSync('rm -rf dist', { stdio: 'inherit' });
  
  // Build frontend with Vite
  console.log('📦 Building frontend...');
  execSync('vite build', { stdio: 'inherit' });
  
  // Create public directory structure
  console.log('📁 Creating directory structure...');
  mkdirSync('dist/public', { recursive: true });
  
  // Move frontend files to public directory
  console.log('📂 Moving frontend files...');
  if (existsSync('dist/index.html')) {
    renameSync('dist/index.html', 'dist/public/index.html');
  }
  if (existsSync('dist/assets')) {
    renameSync('dist/assets', 'dist/public/assets');
  }
  if (existsSync('dist/favicon.png')) {
    renameSync('dist/favicon.png', 'dist/public/favicon.png');
  }
  
  // Build backend with esbuild
  console.log('🔧 Building backend...');
  execSync('esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist', { stdio: 'inherit' });
  
  console.log('✅ Production build completed successfully!');
  console.log('📍 Frontend files: dist/public/');
  console.log('📍 Backend file: dist/index.js');
  
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}