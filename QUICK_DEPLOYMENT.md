# Quick Deployment Reference

## For Production Deployment

1. **Run the deployment build:**
   ```bash
   node scripts/build-for-deployment.js
   ```

2. **Start production server:**
   ```bash
   npm start
   ```

## What was Fixed

- **Problem**: Vite was building to `dist/` but server expected files in `dist/public/`
- **Solution**: Created automated scripts that organize files correctly after build
- **Result**: Server now finds all static files in the expected location

## Build Output Structure

```
dist/
├── index.js          # Server bundle
└── public/           # Static files (what server expects)
    ├── index.html
    ├── favicon.png
    ├── .htaccess
    └── assets/       # CSS, JS, images
```

## Scripts Added

- `scripts/build-for-deployment.js` - Complete deployment build process
- `scripts/organize-build.js` - File organization only (if needed separately)

The deployment issues have been resolved!