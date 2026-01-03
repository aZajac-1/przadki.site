# Deployment Guide for wedding.przadki.site

Deployment for React/Vite static site using Docker + kamal-proxy.

## Server Details

- **IP**: 46.62.230.247
- **Domain**: wedding.przadki.site
- **Proxy**: kamal-proxy (handles TLS automatically)
- **Container**: nginx:alpine serving static files

## Deploying Your Site

Deploy your site anytime with:

```bash
# Make the deploy script executable (first time only)
chmod +x deploy.sh

# Deploy!
./deploy.sh
```

The deployment script will:
1. Build your Vite project (`npm run build`)
2. Upload the built files to your server
3. Create healthcheck file (`/up`)
4. Start/restart Docker container
5. Register with kamal-proxy (with automatic TLS)

Your site will be live at **https://wedding.przadki.site**

## Team Access

### Adding Team Members

To allow other team members to deploy:

1. **Team member**: Follow the [SSH Setup Guide](SSH_SETUP_GUIDE.md) to generate and share their SSH public key

2. **Administrator**: Add their SSH key to the server:
   ```bash
   chmod +x add-ssh-key.sh
   ./add-ssh-key.sh "ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIJl... user@example.com"
   ```

3. **Team member**: Test SSH connection and deploy:
   ```bash
   ssh root@46.62.230.247
   ./deploy.sh
   ```

## Manual Deployment (Alternative)

If you prefer to deploy manually:

```bash
# Build locally
npm run build

# Upload to server
rsync -avz --delete dist/ root@46.62.230.247:/var/www/wedding.przadki.site/

# Create healthcheck
ssh root@46.62.230.247 "echo 'OK' > /var/www/wedding.przadki.site/up"

# Restart container and register with proxy
ssh root@46.62.230.247 '
  docker rm -f wedding 2>/dev/null || true
  docker run -d --name wedding --network kamal --restart unless-stopped \
    -v /var/www/wedding.przadki.site:/usr/share/nginx/html:ro nginx:alpine
  docker exec kamal-proxy kamal-proxy deploy wedding \
    --target="wedding:80" --host="wedding.przadki.site" --tls
'
```

## Troubleshooting

### Check container status
```bash
ssh root@46.62.230.247 'docker ps -a | grep wedding'
```

### Check container logs
```bash
ssh root@46.62.230.247 'docker logs wedding'
```

### Check kamal-proxy status
```bash
ssh root@46.62.230.247 'docker exec kamal-proxy kamal-proxy list'
```

### Restart container manually
```bash
ssh root@46.62.230.247 'docker restart wedding'
```

### Remove from kamal-proxy and re-register
```bash
ssh root@46.62.230.247 '
  docker exec kamal-proxy kamal-proxy remove wedding
  docker exec kamal-proxy kamal-proxy deploy wedding \
    --target="wedding:80" --host="wedding.przadki.site" --tls
'
```

## Architecture

```
Internet
    |
    v
kamal-proxy (port 443, TLS termination)
    |
    v
wedding container (nginx:alpine, port 80)
    |
    v
/var/www/wedding.przadki.site (static files)
```

## DNS Configuration

Make sure your DNS A record points to your server:
- `wedding.przadki.site` -> `46.62.230.247`
