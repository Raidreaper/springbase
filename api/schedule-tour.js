import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { parentName, email, phone, preferredDate, preferredTime, notes } = req.body;

    // Validate required fields
    if (!parentName || !email || !preferredDate || !preferredTime) {
      return res.status(400).json({
        error: 'Missing required fields: parentName, email, preferredDate, and preferredTime are required'
      });
    }

    // Create transporter
    const transporter = nodemailer.createTransporter({
      host: process.env.SMTP_HOST || 'mail.springbase.com.ng',
      port: parseInt(process.env.SMTP_PORT) || 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    // Email content
    const mailOptions = {
      from: process.env.MAIL_FROM || 'Springbase Schools <info@springbase.com.ng>',
      to: process.env.SMTP_USER || 'info@springbase.com.ng',
      subject: `Tour Request from ${parentName}`,
      html: `
        <h2>New Tour Request</h2>
        <p><strong>Parent Name:</strong> ${parentName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Preferred Date:</strong> ${preferredDate}</p>
        <p><strong>Preferred Time:</strong> ${preferredTime}</p>
        <p><strong>Notes:</strong><br/>${notes || 'No additional notes'}</p>
      `
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ success: true, message: 'Tour request sent successfully' });
  } catch (error) {
    console.error('Tour scheduling error:', error);
    res.status(500).json({
      error: 'Failed to schedule tour. Please try again or contact us directly.'
    });
  }
}


