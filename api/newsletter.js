import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', process.env.APP_ORIGIN || '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { email } = req.body || {};
    if (!email) return res.status(400).json({ error: 'Email is required' });

    const transporter = nodemailer.createTransport({
      host: '185.234.21.198',
      port: 465,
      secure: true,
      auth: {
        user: 'info@springbase.com.ng',
        pass: ')4}gLAU0O,(VNrI1',
      },
      tls: { rejectUnauthorized: false },
      connectionTimeout: 60000,
      greetingTimeout: 60000,
      socketTimeout: 60000,
    });

    await transporter.verify();

    const info = await transporter.sendMail({
      from: 'Springbase Schools <info@springbase.com.ng>',
      to: 'info@springbase.com.ng',
      replyTo: email,
      subject: 'New Newsletter Subscription',
      html: `<p>A new user subscribed to the newsletter.</p><p><strong>Email:</strong> ${email}</p>`,
      text: `New newsletter subscription: ${email}`
    });

    return res.status(200).json({ success: true, message: 'Subscribed successfully', messageId: info?.messageId });
  } catch (error) {
    let errorMessage = 'Failed to subscribe';
    if (error?.code === 'EAUTH') errorMessage = 'SMTP authentication failed';
    if (error?.code === 'ECONNECTION') errorMessage = 'Could not connect to SMTP server';
    if (error?.code === 'ETIMEDOUT') errorMessage = 'Email service connection timeout';
    return res.status(500).json({ error: errorMessage });
  }
}
