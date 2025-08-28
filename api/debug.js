import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', process.env.APP_ORIGIN || '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    const debug = {
      nodeEnv: process.env.NODE_ENV,
      appOrigin: process.env.APP_ORIGIN,
      smtpHostSet: !!process.env.SMTP_HOST,
      smtpPort: process.env.SMTP_PORT,
      smtpUserSet: !!process.env.SMTP_USER,
      smtpPassSet: !!process.env.SMTP_PASS,
      mailFromSet: !!process.env.MAIL_FROM,
      schoolToEmailSet: !!process.env.SCHOOL_TO_EMAIL,
      timestamp: new Date().toISOString()
    };

    if (req.method === 'POST') {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '465'),
        secure: true,
        auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
        tls: { rejectUnauthorized: false }
      });
      await transporter.verify();
      debug.smtpConnection = 'ok';
    }

    return res.status(200).json({ ok: true, debug });
  } catch (err) {
    return res.status(500).json({ ok: false, error: err?.message, code: err?.code });
  }
}


