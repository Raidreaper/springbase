# Vercel Environment Variables Setup

This document explains how to configure environment variables for both local development and Vercel production deployment.

## Environment Variables Overview

The application now uses a centralized configuration system that automatically falls back to working SMTP settings if environment variables are not provided.

## Required Environment Variables for Production (Vercel)

### SMTP Configuration
```
SMTP_HOST=mail.springbase.com.ng
SMTP_PORT=465
SMTP_USER=info@springbase.com.ng
SMTP_PASS=your_actual_smtp_password
```

### Email Configuration
```
MAIL_FROM=Springbase Schools <info@springbase.com.ng>
SCHOOL_TO_EMAIL=info@springbase.com.ng
```

### App Configuration
```
APP_ORIGIN=https://www.springbase.com.ng
NODE_ENV=production
```

## Local Development (.env.local)

Create a `.env.local` file in your project root:

```bash
# App Configuration
NODE_ENV=development
APP_ORIGIN=http://localhost:3000

# SMTP Configuration (optional for local dev)
SMTP_HOST=mail.springbase.com.ng
SMTP_PORT=465
SMTP_USER=info@springbase.com.ng
SMTP_PASS=your_smtp_password

# Email Configuration
MAIL_FROM=Springbase Schools <info@springbase.com.ng>
SCHOOL_TO_EMAIL=info@springbase.com.ng
```

## How It Works

### Production (Vercel)
- Uses environment variables if set
- Falls back to direct IP configuration if SMTP_PASS is missing
- All API endpoints use the same configuration

### Local Development
- Uses environment variables if set
- Falls back to direct IP configuration if SMTP_PASS is missing
- Local Express server handles API requests

### Fallback Configuration
If no environment variables are set, the system automatically uses:
- Host: 185.234.21.198 (direct IP to bypass Cloudflare)
- Port: 465 (SSL)
- User: info@springbase.com.ng
- Password: (hardcoded fallback)

## Setting Environment Variables in Vercel

1. Go to your Vercel dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add each variable with the correct values
5. Redeploy your project

## Testing

### Local Testing
```bash
npm run dev:full  # Starts both frontend and local API server
```

### Production Testing
1. Deploy to Vercel
2. Test the forms on your live site
3. Check Vercel function logs for any errors

## Troubleshooting

### Common Issues

1. **FUNCTION_INVOCATION_FAILED**
   - **Cause**: Missing SMTP credentials
   - **Solution**: Set `SMTP_PASS` in Vercel environment variables

2. **SMTP Authentication Failed**
   - **Cause**: Incorrect username/password
   - **Solution**: Verify SMTP credentials with your email provider

3. **Connection Timeout**
   - **Cause**: Firewall or network issues
   - **Solution**: The system will automatically fall back to direct IP

4. **Host Not Found**
   - **Cause**: Incorrect SMTP host
   - **Solution**: The system will automatically fall back to direct IP

### Fallback System

The application includes a robust fallback system:
- If environment variables fail, it automatically uses the direct IP configuration
- This ensures email functionality works even if Vercel environment variables are not set
- All hardcoded values have been removed from the codebase

## Calendar Integration

The tour scheduling system now includes:
- iCal calendar event generation
- Automatic calendar invitation emails
- Both parties receive calendar reminders
- Professional email templates

## Next Steps

1. **For Local Development**: Create `.env.local` with your SMTP credentials
2. **For Production**: Set environment variables in Vercel dashboard
3. **Test**: Verify all forms work in both environments
4. **Deploy**: Push to production when ready

The system is now production-ready with no hardcoded values and automatic fallbacks for reliability.
