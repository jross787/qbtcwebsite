import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

console.log('🚀 Hostinger Deployment Builder');
console.log('================================\n');

// Step 1: Clean previous builds
console.log('1. Cleaning previous builds...');
if (fs.existsSync('dist')) {
  fs.rmSync('dist', { recursive: true, force: true });
}

// Step 2: Run the build
console.log('2. Building project...');
try {
  execSync('npm run build', { stdio: 'inherit' });
} catch (error) {
  console.error('❌ Build failed!');
  process.exit(1);
}

// Step 3: Check if build succeeded
if (!fs.existsSync('dist/public')) {
  console.error('❌ Build output not found at dist/public/');
  process.exit(1);
}

console.log('\n3. Reorganizing files for Hostinger...');

// Step 4: Move files from dist/public to dist
const publicDir = path.join('dist', 'public');
const distDir = 'dist';

// Get all files and directories from dist/public
const items = fs.readdirSync(publicDir, { withFileTypes: true });

items.forEach(item => {
  const sourcePath = path.join(publicDir, item.name);
  const destPath = path.join(distDir, item.name);
  
  // Move each item
  fs.renameSync(sourcePath, destPath);
  console.log(`   ✓ Moved ${item.name}`);
});

// Step 5: Remove empty public directory
fs.rmdirSync(publicDir);

// Step 6: Copy .htaccess file
const htaccessSource = path.join('client', 'public', '.htaccess');
const htaccessDest = path.join('dist', '.htaccess');

if (fs.existsSync(htaccessSource)) {
  fs.copyFileSync(htaccessSource, htaccessDest);
  console.log('   ✓ Copied .htaccess file');
}

// Step 7: Verify the structure
console.log('\n✅ Build complete! Files ready for Hostinger:\n');
const finalFiles = fs.readdirSync('dist');
finalFiles.forEach(file => {
  const stats = fs.statSync(path.join('dist', file));
  const type = stats.isDirectory() ? 'DIR ' : 'FILE';
  console.log(`   ${type} ${file}`);
});

console.log('\n📌 Next steps:');
console.log('1. git add -A dist');
console.log('2. git commit -m "fix: build output for Hostinger deployment"');
console.log('3. git push');
console.log('\nHostinger will deploy files from dist/ to public_html/');

