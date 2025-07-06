# Deployment Fix Guide for Hostinger

## Step 1: Clear All Caches

### Browser Cache:
- **Hard refresh**: Ctrl+Shift+R (Windows/Linux) or Cmd+Shift+R (Mac)
- **Alternative**: Open site in Incognito/Private mode
- **Nuclear option**: Clear all browser cache in settings

### Hostinger Cache:
1. Log into your Hostinger control panel
2. Look for "Cache Manager" or "Performance" settings
3. Clear all cache (CDN cache, page cache, etc.)
4. If using Cloudflare through Hostinger, purge Cloudflare cache

## Step 2: Force New Build

### Add cache-busting to vite.config.ts:
```javascript
// In vite.config.ts, add this to the build options:
build: {
  rollupOptions: {
    output: {
      entryFileNames: `[name].[hash].js`,
      chunkFileNames: `[name].[hash].js`,
      assetFileNames: `[name].[hash].[ext]`
    }
  }
}
```

## Step 3: Verify Git Changes

Run these commands locally:
```bash
# Make sure all changes are committed
git add .
git commit -m "Update team page with new members and photos"
git push origin main
```

## Step 4: Force Redeployment on Hostinger

### Option A: Manual Redeployment
1. Go to Hostinger control panel
2. Find your deployment settings
3. Trigger a manual rebuild/redeploy
4. Wait for deployment to complete

### Option B: Update deployment webhook
1. In Hostinger, check if webhook is configured
2. In GitHub, go to Settings > Webhooks
3. Find Hostinger webhook and click "Redeliver" on recent payload

## Step 5: Add Version File (Quick Fix)
Create a version file to verify deployment:
```bash
echo "Deployment: $(date)" > public/version.txt
```

Then check: `https://yoursite.com/version.txt`

## Step 6: Emergency Fix - Direct File Update

If all else fails, you can manually upload the built files:
1. Run `npm run build` locally
2. Upload the entire `dist/public` folder to Hostinger via FTP/File Manager
3. Make sure to overwrite all existing files

## Step 7: Verify Deployment

After deployment:
1. Check in incognito mode
2. Check the Network tab in DevTools - files should have new hashes
3. Verify team photos are loading from new URLs

## Common Hostinger-Specific Issues:

1. **Build Command**: Make sure Hostinger is running `npm run build`
2. **Output Directory**: Verify Hostinger serves from `dist/public`
3. **Node Version**: Ensure Hostinger uses Node 18+
4. **.htaccess**: Check if caching rules in .htaccess are too aggressive

## Quick Debug Checklist:
- [ ] Changes committed and pushed to GitHub?
- [ ] Hostinger webhook triggered?
- [ ] Build completed successfully?
- [ ] Cache cleared (browser + server)?
- [ ] Correct branch deployed (main/master)?
- [ ] Build output directory correct?