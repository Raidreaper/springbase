import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', process.env.APP_ORIGIN || '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { firstName, lastName, name, email, phone, gradeLevel, message, subject } = req.body || {};
    const displayName = name || [firstName, lastName].filter(Boolean).join(' ').trim();
    if (!displayName || !email || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Use environment variables for SMTP configuration
    const SMTP_CONFIG = {
      host: process.env.SMTP_HOST || 'mail.springbase.com.ng',
      port: parseInt(process.env.SMTP_PORT || '465'),
      secure: true,
      auth: {
        user: process.env.SMTP_USER || 'info@springbase.com.ng',
        pass: process.env.SMTP_PASS || '',
      },
      tls: { rejectUnauthorized: false },
      connectionTimeout: 60000,
      greetingTimeout: 60000,
      socketTimeout: 60000,
    };

    // Fallback to direct IP if no environment variables are set
    if (!process.env.SMTP_PASS) {
      SMTP_CONFIG.host = '185.234.21.198';
      SMTP_CONFIG.auth.user = 'info@springbase.com.ng';
      SMTP_CONFIG.auth.pass = ')4}gLAU0O,(VNrI1';
    }

    const transporter = nodemailer.createTransport(SMTP_CONFIG);
    await transporter.verify();

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2c5530;">New Contact Form Submission</h2>
        <div style="background: #f9f9f9; padding: 20px; border-radius: 5px;">
          <p><strong>Name:</strong> ${displayName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
          <p><strong>Grade Level:</strong> ${gradeLevel || 'Not specified'}</p>
          <hr>
          <p><strong>Message:</strong></p>
          <div style="background: white; padding: 15px; border-left: 4px solid #2c5530;">
            ${String(message).replace(/\n/g, '<br>')}
          </div>
        </div>
      </div>
    `;

    const info = await transporter.sendMail({
      from: process.env.MAIL_FROM || 'Springbase Schools <info@springbase.com.ng>',
      to: process.env.SCHOOL_TO_EMAIL || 'info@springbase.com.ng',
      replyTo: email,
      subject: subject || `New Contact Form Submission from ${displayName}`,
      html,
      text: `Name: ${displayName}\nEmail: ${email}\nPhone: ${phone || 'N/A'}\nGrade: ${gradeLevel || 'N/A'}\n\nMessage:\n${message}`
    });

    return res.status(200).json({ success: true, message: 'Email sent', messageId: info?.messageId });
  } catch (error) {
    let errorMessage = 'Failed to send message';
    if (error?.code === 'EAUTH') errorMessage = 'SMTP authentication failed';
    if (error?.code === 'ECONNECTION') errorMessage = 'Could not connect to SMTP server';
    if (error?.code === 'ETIMEDOUT') errorMessage = 'Email service connection timeout';
    return res.status(500).json({ error: errorMessage });
  }
}


