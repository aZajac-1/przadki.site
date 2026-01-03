#!/bin/bash

# Windows-friendly deployment script for wedding.przadki.site
# Run this script FROM YOUR LOCAL MACHINE using Git Bash
# This version uses SCP instead of rsync

set -e

SERVER_USER="root"
SERVER_IP="46.62.230.247"
SERVER_PATH="/var/www/wedding.przadki.site"
BUILD_DIR="dist"

echo "Building..."
npm run build

if [ ! -d "$BUILD_DIR" ]; then
    echo "Build failed! Directory $BUILD_DIR not found."
    exit 1
fi

echo "Build complete!"

# Create a temporary tarball for faster transfer
echo "Preparing files for upload..."
TEMP_TAR="deploy-temp-$(date +%s).tar.gz"
tar -czf "$TEMP_TAR" -C "$BUILD_DIR" .

# Upload tarball to server
echo "Uploading files to server..."
scp "$TEMP_TAR" "$SERVER_USER@$SERVER_IP:/tmp/$TEMP_TAR"

# Extract on server and restart container
echo "Extracting files and restarting container..."
ssh "$SERVER_USER@$SERVER_IP" bash <<EOF
    # Remove old files
    rm -rf $SERVER_PATH/*

    # Extract new files
    tar -xzf /tmp/$TEMP_TAR -C $SERVER_PATH

    # Clean up temp file
    rm /tmp/$TEMP_TAR

    # Create healthcheck file
    echo 'OK' > $SERVER_PATH/up

    # Restart container and register with kamal-proxy
    docker rm -f wedding 2>/dev/null || true
    docker run -d \
      --name wedding \
      --network kamal \
      --restart unless-stopped \
      -v /var/www/wedding.przadki.site:/usr/share/nginx/html:ro \
      nginx:alpine
    docker exec kamal-proxy kamal-proxy deploy wedding \
      --target="wedding:80" \
      --host="wedding.przadki.site" \
      --tls

    echo "Server-side deployment complete!"
EOF

# Clean up local temp file
echo "Cleaning up..."
rm "$TEMP_TAR"

echo "Done! https://wedding.przadki.site"
