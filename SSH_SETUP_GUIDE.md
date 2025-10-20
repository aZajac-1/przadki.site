# SSH Setup Guide for Team Members

This guide will help you set up SSH access so you can deploy the przadki.site application.

## Prerequisites

- Git installed
- Node.js installed (v18+)
- Terminal/Command Prompt access

## Step 1: Check if You Have an SSH Key

First, check if you already have an SSH key:

### Mac/Linux:
```bash
ls -la ~/.ssh/id_*.pub
```

### Windows (PowerShell):
```powershell
dir $HOME\.ssh\id_*.pub
```

If you see files like `id_rsa.pub` or `id_ed25519.pub`, you already have a key! Skip to Step 3.

## Step 2: Generate SSH Key (if needed)

If you don't have an SSH key, generate one:

### Mac/Linux/Windows (Git Bash or PowerShell):
```bash
ssh-keygen -t ed25519 -C "your-email@example.com"
```

**Important**: Replace `your-email@example.com` with your actual email address.

When prompted:
1. Press Enter to accept the default file location
2. Enter a passphrase (optional but recommended)
3. Press Enter again to confirm

You should see:
```
Your identification has been saved in /home/username/.ssh/id_ed25519
Your public key has been saved in /home/username/.ssh/id_ed25519.pub
```

## Step 3: Get Your Public Key

You need to send your **public key** (ending in `.pub`) to the server administrator.

### Mac/Linux:
```bash
cat ~/.ssh/id_ed25519.pub
```

or if you have an RSA key:
```bash
cat ~/.ssh/id_rsa.pub
```

### Windows (PowerShell):
```powershell
type $HOME\.ssh\id_ed25519.pub
```

or if you have an RSA key:
```powershell
type $HOME\.ssh\id_rsa.pub
```

The output will look like:
```
ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIJl3dIeudNqd1YYU... your-email@example.com
```

**Copy this entire line** and send it to the server administrator (Piotr).

### Never Share Your Private Key!

- ✅ **Public key** (`.pub` file) - SAFE to share
- ❌ **Private key** (no `.pub` extension) - NEVER share this!

## Step 4: Wait for Access

The server administrator will add your public key to the server. They'll let you know when it's ready.

## Step 5: Test Your Connection

Once your key has been added, test the connection:

```bash
ssh root@46.62.230.247
```

If this is your first time connecting, you'll see:
```
The authenticity of host '46.62.230.247' can't be established.
...
Are you sure you want to continue connecting (yes/no)?
```

Type `yes` and press Enter.

If everything works, you'll be connected to the server! Type `exit` to disconnect.

## Step 6: Deploy the Application

Now you can deploy! From your local project directory:

```bash
# Make sure you have the latest code
git pull

# Deploy to production
./deploy.sh
```

The deployment script will:
1. Build the project locally
2. Upload files to the server
3. Reload nginx
4. Your changes will be live at https://przadki.site

## Troubleshooting

### "Permission denied (publickey)"

This means your SSH key isn't set up on the server yet. Contact the server administrator.

### "Bad permissions" error

Your SSH key has incorrect permissions. Fix with:

**Mac/Linux:**
```bash
chmod 600 ~/.ssh/id_ed25519
chmod 644 ~/.ssh/id_ed25519.pub
```

**Windows:**
Open PowerShell as Administrator:
```powershell
icacls $HOME\.ssh\id_ed25519 /inheritance:r
icacls $HOME\.ssh\id_ed25519 /grant:r "$($env:USERNAME):(R)"
```

### "ssh: command not found" (Windows)

Install Git for Windows (includes Git Bash with SSH): https://git-scm.com/download/win

Or use Windows Subsystem for Linux (WSL).

### Deploy script fails

Make sure:
1. You have Node.js installed: `node --version`
2. Dependencies are installed: `npm install`
3. You're in the project directory
4. The deploy script is executable: `chmod +x deploy.sh` (Mac/Linux)

## Quick Reference

```bash
# Test SSH connection
ssh root@46.62.230.247

# Deploy the app
./deploy.sh

# View your public key
cat ~/.ssh/id_ed25519.pub  # Mac/Linux
type $HOME\.ssh\id_ed25519.pub  # Windows
```

## Need Help?

Contact the server administrator (Piotr) if you encounter any issues.
