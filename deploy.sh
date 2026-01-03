#!/bin/bash
set -e

SERVER_IP="46.62.230.247"
SERVER_USER="root"
SERVER_PATH="/var/www/wedding.przadki.site"

echo "Building..."
npm run build

echo "Uploading..."
rsync -avz --delete \
  --exclude '.git' \
  --exclude 'node_modules' \
  --exclude '.env' \
  dist/ ${SERVER_USER}@${SERVER_IP}:${SERVER_PATH}/

echo "Creating healthcheck file..."
ssh ${SERVER_USER}@${SERVER_IP} "echo 'OK' > ${SERVER_PATH}/up"

echo "Starting/restarting container..."
ssh ${SERVER_USER}@${SERVER_IP} '
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
'

echo "Done! https://wedding.przadki.site"
