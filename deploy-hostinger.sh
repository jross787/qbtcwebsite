#!/bin/bash

# Hostinger Deployment Script
# This script builds the project and copies files to public_html directory

echo "Building project..."
npm run build

echo "Creating public_html directory..."
rm -rf public_html
mkdir -p public_html

echo "Copying build files to public_html..."
cp -r dist/public/* public_html/

echo "Deployment files ready in public_html directory!"
echo "Now commit and push to deploy to Hostinger."