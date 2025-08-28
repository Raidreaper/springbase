import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', process.env.APP_ORIGIN || '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET' && req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const envCheck = {
      nodeEnv: process.env.NODE_ENV,
      smtpHost: process.env.SMTP_HOST,
      smtpPort: process.env.SMTP_PORT,
      smtpUser: process.env.SMTP_USER ? 'Set' : 'Missing',
      smtpPass: process.env.SMTP_PASS ? 'Set' : 'Missing',
      mailFrom: process.env.MAIL_FROM,
      schoolToEmail: process.env.SCHOOL_TO_EMAIL,
      appOrigin: process.env.APP_ORIGIN,
      timestamp: new Date().toISOString(),
      method: req.method,
      url: req.url
    };

    if (req.method === 'POST') {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '465'),
        secure: true,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
        tls: { rejectUnauthorized: false }
      });

      await transporter.verify();
      envCheck.smtpConnectionTest = 'SUCCESS';
    }

    console.log('Debug endpoint hit:', envCheck);
    return res.status(200).json({ success: true, debug: envCheck });
  } catch (error) {
    console.error('Debug error:', error);
    return res.status(500).json({ 
      error: error.message || 'Internal server error',
      code: error.code,
      debug: {
        hasRequiredEnvVars: !!(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS)
      }
    });
  }
}


