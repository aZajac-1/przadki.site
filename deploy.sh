#!/bin/bash

# Deployment script for wedding.przadki.site
# Run this script FROM YOUR LOCAL MACHINE

set -e

SERVER_USER="root"
SERVER_IP="46.62.230.247"
SERVER_PATH="/var/www/wedding.przadki.site"
BUILD_DIR="dist"

echo "🚀 Deploying wedding.przadki.site to production..."

# Build the project
echo "📦 Building project..."
npm run build

# Check if build was successful
if [ ! -d "$BUILD_DIR" ]; then
    echo "❌ Build failed! Directory $BUILD_DIR not found."
    exit 1
fi

echo "✅ Build complete!"

# Deploy to server using rsync
echo "📤 Uploading files to server..."
rsync -avz --delete \
    --exclude '.git' \
    --exclude 'node_modules' \
    --exclude '.env' \
    "$BUILD_DIR/" "$SERVER_USER@$SERVER_IP:$SERVER_PATH/"

# Set correct permissions
echo "🔐 Setting file permissions..."
ssh "$SERVER_USER@$SERVER_IP" "chown -R www-data:www-data $SERVER_PATH"

# Reload nginx
echo "🔄 Reloading nginx..."
ssh "$SERVER_USER@$SERVER_IP" "systemctl reload nginx"

echo ""
echo "✨ Deployment complete!"
echo "🌐 Your site is live at: https://wedding.przadki.site"
echo ""
