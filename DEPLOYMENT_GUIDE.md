# Vercel Deployment Guide for Vite React App

## 🚀 Quick Fix for Build Issues

Your Vite app is failing to build on Vercel because of missing dependencies and configuration issues. Here's how to fix it:

## ✅ What I Fixed

1. **Moved Build Dependencies**: Moved `vite`, `@vitejs/plugin-react`, `typescript`, `tailwindcss`, `postcss`, and `autoprefixer` from `devDependencies` to `dependencies`
2. **Updated Vercel Config**: Added proper build configuration in `vercel.json`
3. **Created Build Scripts**: Added alternative build methods
4. **Added .vercelignore**: Excluded unnecessary files from deployment

## 🔧 Manual Steps Required

### 1. Update Dependencies
Run this command locally to ensure all dependencies are properly installed:
```bash
npm install
```

### 2. Test Build Locally
Test the build process locally before deploying:
```bash
npm run build
```

### 3. Commit and Push Changes
```bash
git add .
git commit -m "Fix Vercel deployment configuration"
git push origin main
```

### 4. Redeploy on Vercel
- Go to your Vercel dashboard
- Select your project
- Click "Redeploy" or trigger a new deployment from Git

## 🐛 Troubleshooting

### If Build Still Fails:

1. **Check Vercel Logs**: Look at the build logs for specific error messages
2. **Verify Dependencies**: Ensure all packages are in `dependencies`, not `devDependencies`
3. **Clear Cache**: Try clearing Vercel's build cache
4. **Use Alternative Build**: The `build:vercel` script as a fallback

### Common Issues:

- **"vite: command not found"**: Dependencies not properly installed
- **"Module not found"**: Missing packages in production build
- **"Build timeout"**: Increase `maxDuration` in `vercel.json`

## 📁 File Structure

```
├── api/
│   ├── schedule-tour.js    # Tour booking API
│   └── test.js            # Test endpoint
├── src/                    # React source code
├── vercel.json            # Vercel configuration
├── package.json           # Dependencies and scripts
├── vite.config.ts         # Vite configuration
└── .vercelignore          # Files to exclude from deployment
```

## 🔑 Environment Variables

Don't forget to set these in Vercel:
- `SMTP_USER`
- `SMTP_PASS`
- `SMTP_HOST`
- `SMTP_PORT`
- `MAIL_FROM`
- `SCHOOL_TO_EMAIL`

## 📞 Support

If you continue having issues:
1. Check Vercel's build logs
2. Verify all dependencies are properly installed
3. Test the build locally first
4. Consider using the alternative build script: `npm run build:vercel`
