// Configuration for Springbase Schools
export const config = {
  // App Configuration
  app: {
    name: 'Springbase Schools',
    origin: process.env.APP_ORIGIN || 'http://localhost:3000',
    environment: process.env.NODE_ENV || 'development',
  },
  
  // SMTP Configuration
  smtp: {
    host: process.env.SMTP_HOST || 'mail.springbase.com.ng',
    port: parseInt(process.env.SMTP_PORT || '465'),
    secure: true, // Always use SSL for port 465
    auth: {
      user: process.env.SMTP_USER || 'info@springbase.com.ng',
      pass: process.env.SMTP_PASS || '',
    },
    tls: { 
      rejectUnauthorized: false 
    },
    connectionTimeout: 60000,
    greetingTimeout: 60000,
    socketTimeout: 60000,
  },
  
  // Email Configuration
  email: {
    from: process.env.MAIL_FROM || 'Springbase Schools <info@springbase.com.ng>',
    to: process.env.SCHOOL_TO_EMAIL || 'info@springbase.com.ng',
    replyTo: 'info@springbase.com.ng',
  },
  
  // Contact Information
  contact: {
    phone: '+2348023281221',
    principalPhone: '+2348020725415',
    email: 'info@springbase.com.ng',
    address: '9/21 Canal View Off Community Road Ago, Okota Lagos, Lagos State',
    officeHours: {
      weekdays: 'Monday - Friday: 8:00 AM - 5:00 PM',
      saturday: 'Saturday: 9:00 AM - 2:00 PM'
    }
  },
  
  // Development Configuration
  dev: {
    localApiUrl: 'http://localhost:3001',
    useLocalServer: process.env.NODE_ENV === 'development',
  }
};

// Helper function to get SMTP config with fallback to direct IP if needed
export const getSmtpConfig = () => {
  const baseConfig = {
    ...config.smtp,
    auth: {
      user: config.smtp.auth.user,
      pass: config.smtp.auth.pass,
    }
  };
  
  // If we're in production and have credentials, use them
  if (config.app.environment === 'production' && config.smtp.auth.pass) {
    return baseConfig;
  }
  
  // Fallback to direct IP configuration for development or when env vars fail
  return {
    ...baseConfig,
    host: '185.234.21.198', // Direct IP to bypass Cloudflare
    port: 465,
    secure: true,
    auth: {
      user: 'info@springbase.com.ng',
      pass: ')4}gLAU0O,(VNrI1',
    }
  };
};
