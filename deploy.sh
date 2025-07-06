#!/bin/bash
# ---------- Hostinger auto-deploy script ----------
set -e

cd "$HOME/public_html"

# optional: clean previous output
rm -rf dist assets index.html

# install production dependencies
npm ci

# build the site
npm run build            # vite now writes dist/index.html + assets/

# copy bundle to web root
rsync -a --delete dist/ .

# ensure SPA routes work (only add once)
if ! grep -q "FallbackResource" .htaccess 2>/dev/null; then
  echo "FallbackResource /index.html" >> .htaccess
fi

