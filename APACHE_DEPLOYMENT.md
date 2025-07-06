# Apache Server Deployment Guide

## Current Status: ✅ Ready for Apache Deployment

The site is now configured for Apache deployment with proper .htaccess configuration.

## Prerequisites

Ensure your Apache server has these modules enabled:
```bash
sudo a2enmod rewrite
sudo a2enmod headers
sudo a2enmod expires
sudo a2enmod deflate
sudo a2enmod mime
sudo systemctl restart apache2
```

## Deployment Steps

### 1. Build the Application
```bash
npm run build
```

### 2. Deploy to Apache Document Root
Copy the contents of `dist/public/` to your Apache document root:
```bash
# Example for Ubuntu/Debian
sudo cp -r dist/public/* /var/www/html/

# Or for specific virtual host
sudo cp -r dist/public/* /var/www/your-domain/public_html/
```

### 3. Set Proper Permissions
```bash
sudo chown -R www-data:www-data /var/www/html/
sudo chmod -R 755 /var/www/html/
```

## What's Included

### .htaccess Configuration
✅ **URL Rewriting**: All routes redirect to index.html for SPA routing  
✅ **Security Headers**: X-Frame-Options, CSP, XSS Protection  
✅ **Compression**: Gzip compression for all assets  
✅ **Caching**: Optimized cache headers for performance  
✅ **MIME Types**: Proper content types for all file formats  

### Key Features:
- **Client-side routing support** (wouter routes work properly)
- **Security hardened** with modern security headers
- **Performance optimized** with compression and caching
- **SEO friendly** with proper meta tags and structure

## Virtual Host Configuration (Optional)

For a dedicated virtual host, create `/etc/apache2/sites-available/qbtc.conf`:

```apache
<VirtualHost *:80>
    ServerName yoursite.com
    ServerAlias www.yoursite.com
    DocumentRoot /var/www/qbtc/public_html
    
    <Directory /var/www/qbtc/public_html>
        AllowOverride All
        Require all granted
    </Directory>
    
    # Logs
    ErrorLog ${APACHE_LOG_DIR}/qbtc_error.log
    CustomLog ${APACHE_LOG_DIR}/qbtc_access.log combined
</VirtualHost>
```

Enable the site:
```bash
sudo a2ensite qbtc.conf
sudo systemctl reload apache2
```

## SSL Configuration (Recommended)

For HTTPS, use Let's Encrypt:
```bash
sudo certbot --apache -d yoursite.com -d www.yoursite.com
```

## Testing the Deployment

After deployment, verify these features work:

### ✅ Routing Test:
- Visit `/team` - should show team page
- Visit `/technology` - should show technology page  
- Direct URL access should work (not just navigation)

### ✅ Performance Test:
- Check compression: `curl -H "Accept-Encoding: gzip" -v https://yoursite.com/`
- Verify cache headers in browser DevTools

### ✅ Security Test:
- Check security headers: `curl -I https://yoursite.com/`
- Verify CSP is working properly

## Troubleshooting

### Common Issues:

#### 404 on Routes
- Ensure `mod_rewrite` is enabled
- Check `.htaccess` file exists in document root
- Verify `AllowOverride All` in Apache config

#### Assets Not Loading
- Check file permissions (755 for directories, 644 for files)
- Verify MIME types are set correctly
- Check browser console for errors

#### Security Headers Not Working
- Ensure `mod_headers` is enabled
- Check Apache error logs: `tail -f /var/log/apache2/error.log`

#### 403 Forbidden Error (CRITICAL FIX)
If you're getting a 403 forbidden error, try these steps:

**1. Check File Permissions**
```bash
# Set correct permissions
find /var/www/html -type f -exec chmod 644 {} \;
find /var/www/html -type d -exec chmod 755 {} \;
```

**2. Verify Directory Ownership**
```bash
# Change ownership to Apache user
sudo chown -R www-data:www-data /var/www/html/
# Or for some shared hosting:
sudo chown -R apache:apache /var/www/html/
```

**3. Check .htaccess Issues**
- Ensure `.htaccess` file is uploaded to the correct directory
- The file should be in the same directory as `index.html`
- Check if `.htaccess` files are allowed by your hosting provider

**4. Minimal .htaccess Test**
If still getting 403 errors, replace `.htaccess` with minimal version:
```apache
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^.*$ /index.html [L]
```

**5. Verify Apache Configuration**
- Check if `AllowOverride All` is set in Apache config
- Ensure `mod_rewrite` is enabled
- Contact hosting provider if issues persist

## Directory Structure After Deployment

```
/var/www/html/ (or your document root)
├── .htaccess          # Apache configuration
├── index.html         # Main SPA entry point
├── favicon.png        # Site icon
└── assets/
    ├── index-[hash].js    # Application JavaScript
    ├── index-[hash].css   # Application styles
    └── [team photos]      # Team member images
```

## Performance Optimization

The Apache configuration includes:
- **Gzip compression** for 70%+ size reduction
- **Browser caching** for 1 month on static assets
- **Optimal cache headers** for performance
- **Preload hints** for critical resources

## Security Features

- **CSP (Content Security Policy)** prevents XSS attacks
- **X-Frame-Options** prevents clickjacking
- **HSTS ready** (when using HTTPS)
- **Secure file permissions** prevent unauthorized access
- **Hidden sensitive files** (.env, .git, etc.)

The site is fully production-ready for Apache deployment!

