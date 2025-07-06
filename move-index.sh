#!/bin/bash

# Script to move index.html from dist/public to dist directory

SOURCE="dist/public/index.html"
TARGET="dist/index.html"

# Check if source file exists
if [ ! -f "$SOURCE" ]; then
    echo "Error: Source file $SOURCE does not exist"
    echo "Please run 'npm run build' first to create the build files"
    exit 1
fi

# Create dist directory if it doesn't exist
mkdir -p "$(dirname "$TARGET")"

# Move the file
if cp "$SOURCE" "$TARGET"; then
    echo "Successfully copied index.html from $SOURCE to $TARGET"
    rm "$SOURCE"
    echo "Original file removed from dist/public/"
    
    # Also move other static assets if needed
    if [ -d "dist/public/assets" ]; then
        mv dist/public/assets dist/
        echo "Moved assets directory to dist/"
    fi
    
    # Remove empty public directory
    if [ -d "dist/public" ] && [ -z "$(ls -A dist/public)" ]; then
        rmdir dist/public
        echo "Removed empty dist/public directory"
    fi
    
    echo "File structure reorganization complete!"
else
    echo "Error: Failed to copy file"
    exit 1
fi

