# Vercel Environment Variables Setup

To fix the "FUNCTION_INVOCATION_FAILED" error, you need to set the following environment variables in your Vercel project:

## Required Environment Variables

### SMTP Configuration
```
SMTP_HOST=mail.springbase.com.ng
SMTP_PORT=465
SMTP_USER=your_smtp_username
SMTP_PASS=your_smtp_password
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

## How to Set Environment Variables in Vercel

1. Go to your Vercel dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add each variable with the correct values
5. Redeploy your project

## Common Issues and Solutions

### 1. FUNCTION_INVOCATION_FAILED
- **Cause**: Missing SMTP credentials
- **Solution**: Set `SMTP_USER` and `SMTP_PASS` variables

### 2. SMTP Authentication Failed
- **Cause**: Incorrect username/password
- **Solution**: Verify SMTP credentials with your email provider

### 3. Connection Timeout
- **Cause**: Firewall or network issues
- **Solution**: Check if port 465 is open and accessible

### 4. Host Not Found
- **Cause**: Incorrect SMTP host
- **Solution**: Verify the SMTP host address

## Testing the Function

After setting environment variables:
1. Redeploy your project
2. Test the form submission
3. Check Vercel function logs for any remaining errors

## Alternative Email Services

If you continue having issues with your current SMTP provider, consider:
- SendGrid
- Mailgun
- AWS SES
- Resend

These services are more reliable for serverless environments like Vercel.
