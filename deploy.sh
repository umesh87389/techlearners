#!/bin/bash
# Deploy ~/techlearners to github.com/umesh87389/techlearners + enable Pages hint
set -e
cd "$(dirname "$0")"
git init 2>/dev/null || true
git branch -M main 2>/dev/null || true
git add .
git commit -m "Class 10 IT Part A detailed notes - GitHub Pages site" 2>/dev/null || echo "nothing new to commit"
if ! git remote | grep -q origin; then
  git remote add origin https://github.com/umesh87389/techlearners.git
fi
echo "--- Pushing to umesh87389/techlearners (login with PAT when asked) ---"
git push -u origin main
echo "Done. Then: GitHub repo Settings -> Pages -> Deploy from branch -> main/root"
echo "Site: https://umesh87389.github.io/techlearners/"
