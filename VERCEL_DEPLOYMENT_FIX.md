# Vercel Deployment Fix for Springbase Website

## Problem
The website is experiencing 404 errors on all routes except the homepage when accessed via the custom domain `springbase.com.ng`. This is a common issue with SPAs deployed on Vercel.

## Root Cause
The issue is that Vercel needs proper configuration to handle client-side routing for React applications. When someone visits `https://www.springbase.com.ng/contact` directly, Vercel doesn't know to serve the React app and let React Router handle the routing.

## Solution Applied

### 1. Updated `vercel.json`
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "installCommand": "npm install",
  "framework": "vite",
  "functions": {
    "api/schedule-tour.js": {
      "maxDuration": 30
    }
  },
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "/api/$1"
    },
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "SAMEORIGIN"
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
  ],
  "cleanUrls": true,
  "trailingSlash": false
}
```

### 2. Created `_redirects` file
Created `public/_redirects` with:
```
# Handle client-side routing
/*    /index.html   200

# API routes
/api/*  /api/:splat  200
```

### 3. Updated build script
Modified `build.js` to copy the `_redirects` file to the `dist` directory.

### 4. Removed conflicting files
Removed `.htaccess` file from `dist` directory as it's Apache-specific and won't work on Vercel.

## Deployment Steps

1. **Commit and push your changes:**
   ```bash
   git add .
   git commit -m "Fix Vercel routing configuration for SPA"
   git push
   ```

2. **Redeploy on Vercel:**
   - Go to your Vercel dashboard
   - Trigger a new deployment
   - Wait for the build to complete

3. **Verify domain configuration:**
   - Ensure `springbase.com.ng` is properly configured in Vercel
   - Check that DNS records point to Vercel
   - Verify SSL certificate is active

## Testing

After deployment, test these URLs:
- ✅ `https://www.springbase.com.ng/` (homepage)
- ✅ `https://www.springbase.com.ng/about`
- ✅ `https://www.springbase.com.ng/contact`
- ✅ `https://www.springbase.com.ng/programs`
- ✅ `https://www.springbase.com.ng/facilities`
- ✅ `https://www.springbase.com.ng/admissions`
- ✅ `https://www.springbase.com.ng/student-life`
- ✅ `https://www.springbase.com.ng/schedule-tour`

## Troubleshooting

If issues persist:

1. **Check Vercel logs** for any build or deployment errors
2. **Verify domain settings** in Vercel dashboard
3. **Clear browser cache** and test in incognito mode
4. **Check DNS propagation** - changes can take up to 48 hours
5. **Verify SSL certificate** is properly configured

## Additional Notes

- The `rewrites` in `vercel.json` ensure all routes fall back to `index.html`
- The `_redirects` file provides a backup routing solution
- Both approaches together ensure maximum compatibility
- The configuration handles both client-side routing and API routes properly
