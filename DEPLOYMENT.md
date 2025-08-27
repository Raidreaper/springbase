# Springbase Schools - Vercel Deployment Guide

## Prerequisites
- Vercel account (free tier available)
- Domain: `springbase.com.ng`
- SMTP credentials for email functionality

## Quick Deploy to Vercel

### 1. Connect Your Repository
1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "New Project"
3. Import your GitHub/GitLab repository
4. Select the repository and click "Deploy"

### 2. Configure Environment Variables
In your Vercel project dashboard, go to **Settings** → **Environment Variables** and add:

```bash
# SMTP Configuration
SMTP_HOST=mail.springbase.com.ng
SMTP_PORT=465
SMTP_USER=info@springbase.com.ng
SMTP_PASS=your_actual_smtp_password
MAIL_FROM=Springbase Schools <info@springbase.com.ng>
SCHOOL_TO_EMAIL=mailinfo@springbase.com.ng

# App Configuration
APP_ORIGIN=https://springbase.com.ng
NODE_ENV=production
```

### 3. Deploy
- Vercel will automatically build and deploy your project
- Your site will be available at `https://your-project.vercel.app`

## Custom Domain Setup

### 1. Add Custom Domain
1. In Vercel dashboard, go to **Settings** → **Domains**
2. Add your domain: `springbase.com.ng`
3. Vercel will provide DNS records to configure

### 2. Configure DNS
Add these DNS records at your domain registrar:

```
Type: A
Name: @
Value: 76.76.19.0

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### 3. Verify Domain
- Vercel will automatically provision SSL certificates
- Wait for DNS propagation (can take up to 48 hours)

## API Endpoints

Your Vercel functions will be available at:
- **Contact Form**: `https://springbase.com.ng/api/contact`
- **Schedule Tour**: `https://springbase.com.ng/api/schedule-tour`
- **Config Status**: `https://springbase.com.ng/api/config-status`

## Testing

### 1. Test API Endpoints
Use the included `test-api.html` file to test your forms:
- Upload it to your Vercel deployment
- Test contact form submission
- Test tour scheduling
- Verify email delivery

### 2. Check Vercel Function Logs
- Go to **Functions** tab in Vercel dashboard
- Check logs for any errors
- Monitor function execution times

## Environment Variables Reference

| Variable | Description | Required |
|----------|-------------|----------|
| `SMTP_HOST` | SMTP server hostname | Yes |
| `SMTP_PORT` | SMTP server port (465 for SSL) | Yes |
| `SMTP_USER` | SMTP username/email | Yes |
| `SMTP_PASS` | SMTP password | Yes |
| `MAIL_FROM` | From email address | Yes |
| `SCHOOL_TO_EMAIL` | Recipient email for inquiries | Yes |
| `APP_ORIGIN` | Your domain for CORS | Yes |
| `NODE_ENV` | Environment (production) | Yes |

## Troubleshooting

### Common Issues

1. **Emails not sending**
   - Check SMTP credentials in environment variables
   - Verify SMTP server allows external connections
   - Check Vercel function logs for errors

2. **CORS errors**
   - Ensure `APP_ORIGIN` is set correctly
   - Check that your domain is in the allowed origins list

3. **Function timeouts**
   - Default timeout is 10 seconds
   - Email functions are configured for 30 seconds
   - Check SMTP server response times

### Debugging

1. **Check Function Logs**
   - Vercel dashboard → Functions → View logs

2. **Test Locally**
   - Use `vercel dev` to test locally
   - Set `NODE_ENV=development` for console logging

3. **Environment Variables**
   - Verify all variables are set in Vercel
   - Check for typos in variable names

## Performance Optimization

- **Edge Functions**: Consider converting to Edge Functions for faster response times
- **Caching**: Implement caching for static content
- **CDN**: Vercel automatically provides global CDN

## Security

- **Environment Variables**: Never commit sensitive data to your repository
- **CORS**: Properly configured for your domain only
- **Input Validation**: All form inputs are validated and sanitized
- **Rate Limiting**: Consider implementing rate limiting for forms

## Maintenance

- **Monitoring**: Use Vercel Analytics to monitor performance
- **Updates**: Keep dependencies updated
- **Backups**: Your code is backed up in your Git repository
- **SSL**: Vercel automatically manages SSL certificates

## Support

- **Vercel Documentation**: [vercel.com/docs](https://vercel.com/docs)
- **Vercel Support**: Available in dashboard
- **Community**: [github.com/vercel/vercel/discussions](https://github.com/vercel/vercel/discussions)
