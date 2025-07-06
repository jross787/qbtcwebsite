# Hostinger Deployment Configuration

## IMPORTANT: Root Cause of Old Team Page Issue

The issue was caused by old build files from July 1st in the root directory being deployed instead of the new build in `dist/public/`. These have been removed.

## Correct Hostinger Configuration

### 1. Repository Settings in Hostinger
- **Branch**: `main` (not master)
- **Root Directory**: Leave empty (repository root)
- **Build Command**: `npm run build`
- **Publish Directory**: `dist/public` ⚠️ CRITICAL - not just `/` or `/public`

### 2. Build Output Structure
After running `npm run build`, your files should be in:
```
dist/
└── public/
    ├── assets/
    │   ├── index-[hash].js  (contains team data)
    │   ├── index-[hash].css
    │   └── [team member photos]
    └── index.html
```

### 3. Verify Deployment Success
After deployment, check these URLs:
- `https://yoursite.com/` - Should show new team members (Christian, Scott, Joe, Rick, Garrett)
- Check Network tab in DevTools - JS files should have recent timestamps
- Advisory Board section should be visible below team section

### 4. Common Issues & Solutions

#### Old Files Still Showing
1. Clear Hostinger cache (in control panel)
2. Ensure NO files exist in repository root (except config files)
3. Check that `.gitignore` includes `/assets/` and `/index.html`

#### Build Not Running
1. Verify Node.js version is 18+ in Hostinger
2. Check build logs in Hostinger deployment panel
3. Ensure `package.json` has correct build script

#### Wrong Directory Deployed
- Double-check "Publish Directory" is exactly `dist/public`
- Not `/dist/public` (with leading slash)
- Not `public` or `dist` alone

### 5. Emergency Manual Deployment
If automatic deployment fails:
1. Build locally: `npm run build`
2. In Hostinger File Manager:
   - Navigate to `public_html`
   - Delete ALL existing files
   - Upload contents of `dist/public/` (not the folder itself)

### 6. Preventing Future Issues
- Never place build files in repository root
- Always use `npm run build` for production builds
- Keep `.gitignore` updated to exclude build artifacts

## Quick Checklist
- [ ] Old root files removed (`/assets/`, `/index.html`)
- [ ] Build command: `npm run build`
- [ ] Publish directory: `dist/public`
- [ ] Cache cleared in Hostinger
- [ ] Browser hard refresh (Ctrl+Shift+R)