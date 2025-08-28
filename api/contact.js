export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', process.env.APP_ORIGIN || '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const nodemailer = (await import('nodemailer')).default;
    const { name, subject, firstName, lastName, email, phone, gradeLevel, message } = req.body || {};

    const derivedName = name || [firstName, lastName].filter(Boolean).join(' ').trim();

    if (!derivedName || !email || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

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

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2c5530;">New Contact Form Submission</h2>
        <div style="background: #f9f9f9; padding: 20px; border-radius: 5px;">
          <p><strong>Name:</strong> ${derivedName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
          <p><strong>Grade Level:</strong> ${gradeLevel || 'Not specified'}</p>
          <hr>
          <p><strong>Message:</strong></p>
          <div style="background: white; padding: 15px; border-left: 4px solid #2c5530;">
            ${String(message).replace(/\n/g, '<br>')}
          </div>
        </div>
        <p style="color: #666; font-size: 12px; margin-top: 20px;">This message was sent from the Springbase Schools website contact form.</p>
      </div>
    `;

    const mailOptions = {
      from: process.env.MAIL_FROM,
      to: process.env.SCHOOL_TO_EMAIL,
      subject: subject || `New Contact Form Submission from ${derivedName}`,
      html,
      text: `New Contact Form Submission\n\nName: ${derivedName}\nEmail: ${email}\nPhone: ${phone || 'Not provided'}\nGrade Level: ${gradeLevel || 'Not specified'}\n\nMessage:\n${message}`
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('SMTP contact email sent:', info?.messageId);
    return res.status(200).json({ success: true, message: 'Email sent successfully', messageId: info?.messageId });
  } catch (error) {
    console.error('Contact form error:', error);
    let errorMessage = 'Failed to send message';
    if (error?.code === 'EAUTH') errorMessage = 'SMTP authentication failed';
    if (error?.code === 'ECONNECTION') errorMessage = 'Could not connect to SMTP server';
    return res.status(500).json({ error: errorMessage, details: process.env.NODE_ENV === 'development' ? error?.message : undefined });
  }
}

