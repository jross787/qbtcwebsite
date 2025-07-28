# Deployment Guide

This guide explains how to properly build and deploy the qBTC marketing platform.

## Build Process

The application uses a custom build process to organize files correctly for deployment:

### Quick Build for Deployment

```bash
# Run the complete deployment build
node scripts/build-for-deployment.js
```

This script will:
1. Clean any existing build files
2. Build the frontend with Vite
3. Organize static files into the correct structure
4. Build the server bundle
5. Verify the build structure

### Manual Build Steps

If you prefer to run the build steps manually:

```bash
# 1. Build frontend
npx vite build

# 2. Organize files for deployment
node scripts/organize-build.js

# 3. Build server bundle
npx esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist
```

## Expected Build Structure

After building, the directory structure should be:

```
dist/
├── index.js              # Server bundle
└── public/               # Static files directory
    ├── index.html        # Main HTML file
    └── assets/           # CSS, JS, images
        ├── index-[hash].js
        ├── index-[hash].css
        └── [other assets]
```

## Deployment Issues Fixed

### Problem
The original build configuration had a mismatch:
- Vite was building files directly into `dist/`
- The server was looking for static files in `dist/public/`
- This caused deployment failures with missing directory errors

### Solution
- Created post-build scripts to organize files correctly
- Server now looks for files in the expected `dist/public/` directory
- Added error handling and directory creation if needed

## Production Deployment

1. Build the application:
   ```bash
   node scripts/build-for-deployment.js
   ```

2. Start the production server:
   ```bash
   npm start
   ```

The server will:
- Serve static files from `dist/public/`
- Handle API routes
- Fall back to `index.html` for client-side routing

## Environment Variables

Make sure to set the following environment variables in production:
- `NODE_ENV=production`
- `PORT` (optional, defaults to 5000)

## Troubleshooting

### "Could not find the build directory" Error
- Run the build command first: `node scripts/build-for-deployment.js`
- Verify `dist/public/` directory exists and contains `index.html`

### Static Files Not Loading
- Check that `dist/public/assets/` directory exists
- Verify file permissions in production environment
- Check server logs for specific file access errors

### Server Bundle Issues
- Ensure all dependencies are installed: `npm ci`
- Check that `dist/index.js` was created successfully
- Verify Node.js version compatibility (requires ES modules support)