# Hostinger Deployment Guide for qBTC

## Problem & Solution

### Issue: 403 Forbidden Error
- **Root Cause**: Vite builds to `dist/public/` but Hostinger serves from `public_html/`
- **Result**: `index.html` is buried in subdirectories, causing 403 errors

### Solution: Flatten the Build Structure

## Manual Deployment Steps

### 1. Build the Project
```bash
npm run build
```

### 2. Prepare Files for Hostinger
After build completes, run these commands:

```bash
# Move all files from dist/public/ to dist/
mv dist/public/* dist/
mv dist/public/.* dist/ 2>/dev/null || true

# Remove empty public directory
rmdir dist/public

# Copy .htaccess to dist
cp client/public/.htaccess dist/
```

### 3. Verify Structure
Your `dist/` folder should now look like:
```
dist/
├── index.html          # ← Must be at root level
├── favicon.png
├── .htaccess          # ← For SPA routing
└── assets/
    ├── index-[hash].js
    └── index-[hash].css
```

### 4. Deploy to Hostinger

#### Option A: Git Auto-Deploy
```bash
git add -A dist
git commit -m "fix: flatten build structure for Hostinger"
git push
```

#### Option B: Manual Upload
1. Download the `dist/` folder contents
2. Upload directly to `public_html/` via FTP/File Manager
3. Ensure `.htaccess` is included

## Critical .htaccess Content

Create/update `.htaccess` in your `public_html/`:

```apache
# Enable rewrite engine for SPA routing
RewriteEngine On

# Route all non-file requests to index.html
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^.*$ /index.html [L]

# Optional: Add compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/css application/javascript
</IfModule>
```

## Troubleshooting 403 Errors

### 1. Check File Permissions
```bash
# In Hostinger File Manager or SSH:
find public_html -type f -exec chmod 644 {} \;
find public_html -type d -exec chmod 755 {} \;
```

### 2. Verify index.html Location
- `index.html` MUST be directly in `public_html/`
- NOT in `public_html/public/` or any subdirectory

### 3. Test Minimal Setup
If still getting 403, test with minimal files:
1. Create simple `public_html/index.html`:
   ```html
   <!DOCTYPE html>
   <html>
   <body>Test</body>
   </html>
   ```
2. If this works, gradually add your build files

### 4. Contact Hostinger Support
If minimal test fails, contact support about:
- `.htaccess` permissions
- `mod_rewrite` availability
- Directory indexing settings

## Automated Build Script

Save this as `build-hostinger.sh`:

```bash
#!/bin/bash

# Clean and build
rm -rf dist
npm run build

# Reorganize for Hostinger
if [ -d "dist/public" ]; then
    mv dist/public/* dist/
    mv dist/public/.* dist/ 2>/dev/null || true
    rmdir dist/public
fi

# Copy .htaccess
[ -f "client/public/.htaccess" ] && cp client/public/.htaccess dist/

echo "✅ Build ready for Hostinger deployment!"
ls -la dist/
```

Make executable: `chmod +x build-hostinger.sh`
Run: `./build-hostinger.sh`

## Quick Fix Command

Run this one-liner after build:
```bash
mv dist/public/* dist/ && rmdir dist/public && cp client/public/.htaccess dist/
```

## Verification

After deployment, test these URLs:
- `https://yourdomain.com/` → Home page
- `https://yourdomain.com/team` → Team page (tests SPA routing)
- `https://yourdomain.com/technology` → Technology page

All should load without 403 errors.