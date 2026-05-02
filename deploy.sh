#!/bin/bash
# deploy.sh — Run on the Tencent Cloud server to pull latest code and reload Nginx
set -e

REPO="https://github.com/JinBroX/opentree.git"
WEB_ROOT="/var/www/opentree"

echo "=== OpenTree Deploy ==="

if [ -d "$WEB_ROOT/.git" ]; then
  echo "Pulling latest changes..."
  cd "$WEB_ROOT"
  git pull origin main
else
  echo "Cloning repository..."
  git clone "$REPO" "$WEB_ROOT"
fi

echo "Reloading Nginx..."
sudo nginx -t && sudo systemctl reload nginx

echo "=== Deploy complete! Site is live at opentree.cc ==="
