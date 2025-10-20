#!/bin/bash

# Windows-friendly deployment script for przadki.site
# Run this script FROM YOUR LOCAL MACHINE using Git Bash
# This version uses SCP instead of rsync

set -e

SERVER_USER="root"
SERVER_IP="46.62.230.247"
SERVER_PATH="/var/www/przadki.site"
BUILD_DIR="dist"

echo "🚀 Deploying przadki.site to production..."

# Build the project
echo "📦 Building project..."
npm run build

# Check if build was successful
if [ ! -d "$BUILD_DIR" ]; then
    echo "❌ Build failed! Directory $BUILD_DIR not found."
    exit 1
fi

echo "✅ Build complete!"

# Create a temporary tarball for faster transfer
echo "📦 Preparing files for upload..."
TEMP_TAR="deploy-temp-$(date +%s).tar.gz"
tar -czf "$TEMP_TAR" -C "$BUILD_DIR" .

# Upload tarball to server
echo "📤 Uploading files to server..."
scp "$TEMP_TAR" "$SERVER_USER@$SERVER_IP:/tmp/$TEMP_TAR"

# Extract on server and clean up
echo "🔄 Extracting files on server..."
ssh "$SERVER_USER@$SERVER_IP" bash <<EOF
    # Backup old files (optional)
    # cp -r $SERVER_PATH ${SERVER_PATH}.backup-\$(date +%Y%m%d-%H%M%S)
    
    # Remove old files
    rm -rf $SERVER_PATH/*
    
    # Extract new files
    tar -xzf /tmp/$TEMP_TAR -C $SERVER_PATH
    
    # Clean up temp file
    rm /tmp/$TEMP_TAR
    
    # Set correct permissions
    chown -R www-data:www-data $SERVER_PATH
    
    # Reload nginx
    systemctl reload nginx
    
    echo "✅ Server-side deployment complete!"
EOF

# Clean up local temp file
echo "🧹 Cleaning up..."
rm "$TEMP_TAR"

echo ""
echo "✨ Deployment complete!"
echo "🌐 Your site is live at: https://przadki.site"
echo ""

