# Deployment Guide for przadki.site

Simple deployment setup for your React/Vite static site to Hetzner server.

## Server Details

- **IP**: 46.62.230.247
- **Domain**: przadki.site
- **Server OS**: Ubuntu
- **Web Server**: nginx

## One-Time Server Setup

Run these steps **once** to configure your server:

### 1. Upload and run the server setup script

```bash
# From your local machine
scp server-setup.sh root@46.62.230.247:/root/
ssh root@46.62.230.247 'chmod +x /root/server-setup.sh && /root/server-setup.sh'
```

### 2. Upload nginx configuration

```bash
# From your local machine
scp nginx.conf root@46.62.230.247:/etc/nginx/sites-available/przadki.site
```

### 3. Enable the site

```bash
ssh root@46.62.230.247 'ln -s /etc/nginx/sites-available/przadki.site /etc/nginx/sites-enabled/ && nginx -t && systemctl reload nginx'
```

### 4. Set up SSL certificate (Let's Encrypt)

```bash
ssh root@46.62.230.247 'certbot --nginx -d przadki.site -d www.przadki.site --non-interactive --agree-tos -m your-email@example.com'
```

**Important**: Replace `your-email@example.com` with your actual email address.

The SSL certificate will auto-renew every 90 days.

### 5. Verify the server is ready

Visit http://przadki.site - you should see a "Coming Soon" placeholder page.

## Deploying Your Site

After the one-time setup, deploy your site anytime with:

```bash
# Make the deploy script executable (first time only)
chmod +x deploy.sh

# Deploy!
./deploy.sh
```

The deployment script will:
1. Build your Vite project (`npm run build`)
2. Upload the built files to your server
3. Set correct permissions
4. Reload nginx

Your site will be live at **https://przadki.site** in about 30 seconds!

## Team Access

### Adding Team Members

To allow other team members to deploy:

1. **Team member**: Follow the [SSH Setup Guide](SSH_SETUP_GUIDE.md) to generate and share their SSH public key

2. **Administrator**: Add their SSH key to the server:
   ```bash
   # Make the script executable (first time only)
   chmod +x add-ssh-key.sh

   # Add the team member's public key
   ./add-ssh-key.sh "ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIJl... user@example.com"

   # Or read from a file
   ./add-ssh-key.sh "$(cat teammate-key.pub)"
   ```

3. **Team member**: Test SSH connection and deploy:
   ```bash
   # Test connection
   ssh root@46.62.230.247

   # Deploy
   ./deploy.sh
   ```

That's it! All team members with SSH access can deploy using the same `./deploy.sh` script.

## Manual Deployment (Alternative)

If you prefer to deploy manually:

```bash
# Build locally
npm run build

# Upload to server
rsync -avz --delete dist/ root@46.62.230.247:/var/www/przadki.site/

# Set permissions and reload
ssh root@46.62.230.247 'chown -R www-data:www-data /var/www/przadki.site && systemctl reload nginx'
```

## Troubleshooting

### Check nginx status
```bash
ssh root@46.62.230.247 'systemctl status nginx'
```

### Check nginx logs
```bash
ssh root@46.62.230.247 'tail -f /var/log/nginx/error.log'
```

### Test nginx configuration
```bash
ssh root@46.62.230.247 'nginx -t'
```

### Check SSL certificate status
```bash
ssh root@46.62.230.247 'certbot certificates'
```

### Reload nginx after config changes
```bash
ssh root@46.62.230.247 'systemctl reload nginx'
```

## File Structure on Server

```
/var/www/przadki.site/          # Your site files
/etc/nginx/sites-available/przadki.site  # nginx config
/etc/nginx/sites-enabled/przadki.site    # symlink to above
```

## Future Backend Integration

When you're ready to add a backend:

1. **Keep this nginx setup** for serving your frontend
2. Add a new location block in nginx.conf to proxy API requests:
   ```nginx
   location /api {
       proxy_pass http://localhost:3000;
       proxy_set_header Host $host;
       proxy_set_header X-Real-IP $remote_addr;
   }
   ```
3. Deploy your backend separately (that's where Kamal could come in!)
4. Your frontend will continue to be served as static files

## Security Notes

- Firewall (ufw) is configured to allow only HTTP, HTTPS, and SSH
- SSL certificate is automatically renewed by certbot
- Security headers are configured in nginx.conf
- Hidden files (like .git, .env) are blocked by nginx

## DNS Configuration

Make sure your DNS A records point to your server:
- `przadki.site` → `46.62.230.247`
- `www.przadki.site` → `46.62.230.247`

If you just configured DNS, wait 5-60 minutes for propagation.
