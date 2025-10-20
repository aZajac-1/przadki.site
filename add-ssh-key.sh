#!/bin/bash

# Script to add SSH public key for a team member
# Run this ON YOUR LOCAL MACHINE

set -e

SERVER_USER="root"
SERVER_IP="46.62.230.247"

echo "🔑 Adding SSH key for team member to przadki.site server"
echo ""

# Check if public key was provided
if [ -z "$1" ]; then
    echo "Usage: $0 <public-key>"
    echo ""
    echo "Example:"
    echo "  $0 'ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIJl... user@example.com'"
    echo ""
    echo "Or read from file:"
    echo "  $0 \"\$(cat teammate-key.pub)\""
    echo ""
    exit 1
fi

PUBLIC_KEY="$1"

# Validate that it looks like a public key
if [[ ! "$PUBLIC_KEY" =~ ^(ssh-rsa|ssh-ed25519|ecdsa-sha2-nistp256) ]]; then
    echo "❌ Error: This doesn't look like a valid SSH public key."
    echo ""
    echo "Public keys should start with:"
    echo "  - ssh-rsa"
    echo "  - ssh-ed25519"
    echo "  - ecdsa-sha2-nistp256"
    echo ""
    echo "Make sure you're using the PUBLIC key (ending in .pub), not the private key!"
    exit 1
fi

echo "Adding key to server..."
echo ""

# Add the key to authorized_keys on the server
ssh "$SERVER_USER@$SERVER_IP" bash <<EOF
    # Create .ssh directory if it doesn't exist
    mkdir -p ~/.ssh
    chmod 700 ~/.ssh

    # Add the public key to authorized_keys
    echo "$PUBLIC_KEY" >> ~/.ssh/authorized_keys

    # Set correct permissions
    chmod 600 ~/.ssh/authorized_keys

    # Remove duplicate keys (in case it was added before)
    sort -u ~/.ssh/authorized_keys -o ~/.ssh/authorized_keys

    echo "✅ SSH key added successfully!"
EOF

echo ""
echo "✨ Done! The team member can now:"
echo "   1. Test connection: ssh $SERVER_USER@$SERVER_IP"
echo "   2. Deploy the app: ./deploy.sh"
echo ""
