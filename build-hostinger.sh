#!/bin/bash

# Build script for Hostinger deployment
# This script builds the project and reorganizes files for Hostinger's public_html structure

echo "🚀 Building qBTC for Hostinger deployment..."

# Step 1: Clean previous builds
echo "🧹 Cleaning previous builds..."
rm -rf dist

# Step 2: Run the standard build
echo "🔨 Building project..."
npm run build

# Step 3: Check if build succeeded
if [ ! -d "dist/public" ]; then
    echo "❌ Build failed! dist/public not found."
    exit 1
fi

# Step 4: Reorganize files for Hostinger
echo "📁 Reorganizing files for Hostinger..."

# Move all contents from dist/public to dist
mv dist/public/* dist/
mv dist/public/.* dist/ 2>/dev/null || true  # Move hidden files, ignore errors

# Remove the empty public directory
rmdir dist/public

# Step 5: Copy .htaccess file to dist if it exists
if [ -f "client/public/.htaccess" ]; then
    cp client/public/.htaccess dist/
    echo "✓ Copied .htaccess file"
fi

# Step 6: Verify the structure
echo ""
echo "✅ Build complete! Structure ready for Hostinger:"
echo ""
ls -la dist/

echo ""
echo "📌 Next steps:"
echo "1. git add -A dist"
echo "2. git commit -m 'fix: build output for Hostinger deployment'"
echo "3. git push"
echo ""
echo "Hostinger will automatically deploy from dist/ to public_html/"

