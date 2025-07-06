# Build and Deploy Instructions

## Current Build Setup

The project is configured to build with Vite, which outputs files to `dist/public/` by default. If you need to move the `index.html` file to the root `dist/` directory, follow these steps:

## Step 1: Build the Project

```bash
npm run build
```

This will create:
- `dist/public/index.html` - Main HTML file
- `dist/public/assets/` - CSS, JS, and other assets
- `dist/index.js` - Server bundle

## Step 2: Move index.html to dist/ directory

You have two options:

### Option A: Using the bash script (recommended)
```bash
./move-index.sh
```

### Option B: Using the Node.js script
```bash
node move-index.js
```

## What the scripts do:

1. Copy `index.html` from `dist/public/` to `dist/`
2. Move the `assets/` directory to `dist/assets/`
3. Remove the original files from `dist/public/`
4. Clean up empty directories

## Final Structure

After running the move script, your dist directory will look like:
```
dist/
├── index.html          # Main HTML file (moved from dist/public/)
├── assets/             # Static assets (moved from dist/public/assets/)
│   ├── index-[hash].js
│   ├── index-[hash].css
│   └── [other assets]
└── index.js            # Server bundle
```

## Important Notes

- The current server configuration expects files in `dist/public/`
- If you move files to `dist/`, you may need to update server configurations accordingly
- Always run the build command before running the move scripts
- The scripts will overwrite existing files in the target location

