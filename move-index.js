#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

const sourceFile = path.resolve('dist/public/index.html');
const targetFile = path.resolve('dist/index.html');

// Check if source file exists
if (!fs.existsSync(sourceFile)) {
  console.error('Source file does not exist:', sourceFile);
  console.log('Make sure to run "npm run build" first');
  process.exit(1);
}

// Ensure target directory exists
const targetDir = path.dirname(targetFile);
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// Move the file
try {
  fs.copyFileSync(sourceFile, targetFile);
  console.log(`Successfully moved index.html from ${sourceFile} to ${targetFile}`);
  
  // Optionally remove the original file
  fs.unlinkSync(sourceFile);
  console.log('Original file removed from dist/public/');
  
} catch (error) {
  console.error('Error moving file:', error);
  process.exit(1);
}