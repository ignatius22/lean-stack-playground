# 🚀 Deployment Guide

Complete guide for deploying Lean Stack Playground to various hosting platforms.

## 📋 Table of Contents

- [Netlify (Recommended)](#netlify-recommended)
- [Vercel](#vercel)
- [GitHub Pages](#github-pages)
- [Custom Server](#custom-server)
- [Security Headers](#security-headers)

## 🎯 Netlify (Recommended)

Netlify is the recommended hosting platform for this project due to its excellent static site hosting, instant deployment, and free tier.

### Method 1: Drag & Drop (Fastest)

1. **Prepare the files:**
   - Zip the entire `lean-stack-playground` folder
   - Make sure all files are included (index.html, css/, js/, etc.)

2. **Deploy:**
   - Go to [Netlify Drop](https://app.netlify.com/drop)
   - Drag and drop your zip file
   - Wait for deployment (usually < 30 seconds)
   - Your site is live! 🎉

3. **Custom domain (optional):**
   - Click "Domain settings"
   - Add your custom domain
   - Update DNS records as instructed

### Method 2: Git Integration (Best for Updates)

1. **Push to GitHub:**
```bash
git init
git add .
git commit -m "Initial commit: Lean Stack Playground"
git branch -M main
git remote add origin https://github.com/yourusername/lean-stack-playground.git
git push -u origin main
```

2. **Connect to Netlify:**
   - Log in to [Netlify](https://app.netlify.com)
   - Click "New site from Git"
   - Choose GitHub
   - Select your repository
   - Configure build settings:
     - **Build command:** (leave empty)
     - **Publish directory:** `.` (current directory)
   - Click "Deploy site"

3. **Automatic deployments:**
   - Every push to `main` branch auto-deploys
   - Preview deployments for pull requests
   - Rollback to any previous deployment

### Method 3: Netlify CLI

1. **Install Netlify CLI:**
```bash
npm install -g netlify-cli
```

2. **Login to Netlify:**
```bash
netlify login
```

3. **Deploy:**
```bash
# From project directory
cd lean-stack-playground

# Deploy to production
netlify deploy --prod --dir .

# Or deploy for preview first
netlify deploy --dir .
```

4. **Link to existing site (optional):**
```bash
netlify link
```

### Netlify Configuration File

Create `netlify.toml` in the project root for advanced configuration:

```toml
# netlify.toml

[build]
  publish = "."
  command = ""

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    X-XSS-Protection = "1; mode=block"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Content-Security-Policy = "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net; font-src 'self' https://cdn.jsdelivr.net; connect-src 'self'; frame-src 'none';"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[dev]
  command = ""
  port = 8888
  publish = "."
```

### Environment Variables (Optional)

If you want to add analytics or other services:

1. Go to Site settings > Build & deploy > Environment
2. Add variables:
   - `GA_TRACKING_ID` - Google Analytics ID
   - `SENTRY_DSN` - Sentry error tracking
   - etc.

## 🔷 Vercel

Vercel is another excellent option for static site hosting.

### Deploy with Vercel

1. **Install Vercel CLI:**
```bash
npm install -g vercel
```

2. **Deploy:**
```bash
cd lean-stack-playground
vercel --prod
```

3. **Or use Git integration:**
   - Push to GitHub
   - Import project in [Vercel Dashboard](https://vercel.com/dashboard)
   - Deploy automatically

### Vercel Configuration

Create `vercel.json`:

```json
{
  "version": 2,
  "public": true,
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ]
}
```

## 📘 GitHub Pages

Free hosting directly from your GitHub repository.

### Setup GitHub Pages

1. **Push to GitHub:**
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/lean-stack-playground.git
git push -u origin main
```

2. **Enable GitHub Pages:**
   - Go to repository Settings
   - Scroll to "Pages" section
   - Source: Deploy from branch
   - Branch: `main`, folder: `/root`
   - Save

3. **Access your site:**
   - URL: `https://yourusername.github.io/lean-stack-playground/`
   - Wait 1-2 minutes for first deployment

### Custom Domain with GitHub Pages

1. Add `CNAME` file to root:
```bash
echo "yourdomain.com" > CNAME
git add CNAME
git commit -m "Add custom domain"
git push
```

2. Configure DNS:
   - Add `A` records pointing to GitHub's IPs:
     - 185.199.108.153
     - 185.199.109.153
     - 185.199.110.153
     - 185.199.111.153
   - Or add `CNAME` record pointing to `yourusername.github.io`

## 🖥️ Custom Server

Deploy on your own server (VPS, shared hosting, etc.).

### Requirements
- Web server (Apache, Nginx, etc.)
- Support for static files
- HTTPS certificate (recommended)

### Apache Setup

1. **Upload files** via FTP/SFTP to web root

2. **Create `.htaccess`** (if not exists):
```apache
# .htaccess

# Enable rewrite engine
RewriteEngine On

# Force HTTPS
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Security headers
<IfModule mod_headers.c>
  Header set X-Frame-Options "DENY"
  Header set X-Content-Type-Options "nosniff"
  Header set X-XSS-Protection "1; mode=block"
  Header set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>

# Compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css application/javascript
</IfModule>

# Browser caching
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
  ExpiresByType text/html "access plus 1 hour"
</IfModule>
```

### Nginx Setup

1. **Upload files** to web root (e.g., `/var/www/playground`)

2. **Configure Nginx** (`/etc/nginx/sites-available/playground`):
```nginx
server {
    listen 80;
    listen [::]:80;
    server_name yourdomain.com;

    # Redirect to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name yourdomain.com;

    # SSL configuration
    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;

    root /var/www/playground;
    index index.html;

    # Security headers
    add_header X-Frame-Options "DENY" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # Gzip compression
    gzip on;
    gzip_types text/css application/javascript text/html;

    # Cache control
    location ~* \.(css|js)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

3. **Enable site and restart Nginx:**
```bash
sudo ln -s /etc/nginx/sites-available/playground /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

## 🔒 Security Headers

Regardless of platform, ensure these security headers are set:

### Required Headers

```
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
```

### Content Security Policy

For maximum security, use a strict CSP:

```
Content-Security-Policy:
  default-src 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net;
  style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net;
  font-src 'self' https://cdn.jsdelivr.net;
  connect-src 'self';
  frame-src 'none';
```

**Note:** `unsafe-inline` and `unsafe-eval` are needed for Monaco Editor. In production, consider using a nonce-based CSP.

## 📊 Analytics (Optional)

### Google Analytics

Add to `index.html` before `</head>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Plausible Analytics (Privacy-friendly)

```html
<script defer data-domain="yourdomain.com" src="https://plausible.io/js/script.js"></script>
```

## ✅ Post-Deployment Checklist

After deploying, verify:

- [ ] Site loads correctly on HTTPS
- [ ] All 6 patterns display in grid
- [ ] Monaco editors load and are editable
- [ ] "Run Code" executes both editors
- [ ] Console output displays correctly
- [ ] Performance metrics show up
- [ ] Share button creates valid URLs
- [ ] Shared URLs load correctly
- [ ] Copy buttons work
- [ ] Reset button restores original code
- [ ] Keyboard shortcuts work (Cmd/Ctrl+Enter)
- [ ] Mobile responsive layout works
- [ ] No console errors in browser dev tools
- [ ] Security headers are set (use [securityheaders.com](https://securityheaders.com))

## 🐛 Troubleshooting

### Monaco Editor Not Loading

**Problem:** Editors don't appear or show blank screens.

**Solution:**
- Check browser console for CSP errors
- Ensure CDN is accessible
- Verify `require.config` path is correct
- Check internet connection

### Share URLs Too Long

**Problem:** URLs exceed browser limits.

**Solution:**
- Implement LZString compression in `app.js`:
```javascript
// Add to compressCode() method
compressCode(code) {
  return LZString.compressToEncodedURIComponent(code);
}

decompressCode(code) {
  return LZString.decompressFromEncodedURIComponent(code);
}
```

### Console Not Showing Output

**Problem:** Code runs but console stays empty.

**Solution:**
- Check iframe sandbox permissions
- Verify postMessage is working
- Check browser console for errors
- Ensure iframes are being created

## 📞 Support

Need help with deployment?

- Check the [main README](README.md)
- Open an issue on GitHub
- Contact: codecraftie@example.com

---

**Happy Deploying! 🚀**
