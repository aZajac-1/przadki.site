#!/bin/bash
set -e

SERVER_IP="46.62.230.247"
SERVER_USER="root"
SERVER_PATH="/var/www/wedding"

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
    -v /var/www/wedding:/usr/share/nginx/html:ro \
    nginx:alpine
  docker exec kamal-proxy kamal-proxy deploy wedding \
    --target="wedding:80" \
    --host="wedding.przadki.us" \
    --host="wedding.przadki.site" \
    --canonical-host="wedding.przadki.us" \
    --tls
'

# przadki.site is kept only so kamal-proxy can 301 it to przadki.us
# (via --canonical-host) until the domain expires 2026-10-20. After that,
# drop the --host="wedding.przadki.site" line and --canonical-host.
echo "Done! https://wedding.przadki.us"
