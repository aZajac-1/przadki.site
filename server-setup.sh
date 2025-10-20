#!/bin/bash

# Server Setup Script for przadki.site
# Run this script ON YOUR HETZNER SERVER as root or with sudo

set -e

echo "🚀 Setting up przadki.site deployment environment..."

# Update system
echo "📦 Updating system packages..."
apt-get update
apt-get upgrade -y

# Install nginx
echo "🌐 Installing nginx..."
apt-get install -y nginx

# Install certbot for SSL
echo "🔒 Installing certbot for SSL certificates..."
apt-get install -y certbot python3-certbot-nginx

# Create web root directory
echo "📁 Creating web root directory..."
mkdir -p /var/www/przadki.site
chown -R www-data:www-data /var/www/przadki.site

# Create placeholder index.html
echo "📄 Creating placeholder page..."
cat > /var/www/przadki.site/index.html <<'EOF'
<!DOCTYPE html>
<html>
<head>
    <title>przadki.site - Coming Soon</title>
    <style>
        body {
            font-family: system-ui, -apple-system, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
        }
        .container {
            text-align: center;
        }
        h1 { font-size: 3em; margin: 0; }
        p { font-size: 1.2em; }
    </style>
</head>
<body>
    <div class="container">
        <h1>przadki.site</h1>
        <p>Server is ready. Deploying soon...</p>
    </div>
</body>
</html>
EOF

# Configure nginx
echo "⚙️  Configuring nginx..."
# Remove default site
rm -f /etc/nginx/sites-enabled/default

# Note: nginx config will be uploaded separately
echo "Note: Upload your nginx.conf to /etc/nginx/sites-available/przadki.site"
echo "Then run: ln -s /etc/nginx/sites-available/przadki.site /etc/nginx/sites-enabled/"

# Configure firewall
echo "🔥 Configuring firewall..."
ufw allow 'Nginx Full'
ufw allow OpenSSH
echo "y" | ufw enable || true

# Test nginx configuration
echo "✅ Testing nginx configuration..."
nginx -t

# Start nginx
echo "🎯 Starting nginx..."
systemctl enable nginx
systemctl restart nginx

echo ""
echo "✨ Server setup complete!"
echo ""
echo "Next steps:"
echo "1. Upload nginx configuration:"
echo "   scp nginx.conf root@46.62.230.247:/etc/nginx/sites-available/przadki.site"
echo ""
echo "2. Enable the site:"
echo "   ssh root@46.62.230.247 'ln -s /etc/nginx/sites-available/przadki.site /etc/nginx/sites-enabled/ && nginx -t && systemctl reload nginx'"
echo ""
echo "3. Set up SSL certificate:"
echo "   ssh root@46.62.230.247 'certbot --nginx -d przadki.site -d www.przadki.site'"
echo ""
echo "4. Deploy your site using the deploy.sh script from your local machine"
echo ""
