import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', process.env.APP_ORIGIN || '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    // Check if required environment variables are set
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.error('Missing SMTP credentials in environment variables');
      return res.status(500).json({ 
        error: 'Email service not configured. Please contact support.' 
      });
    }

    const { parentName, parentEmail, parentPhone, childName, childAge, preferredDate, preferredTime, additionalInfo, email, phone, notes } = req.body || {};
    const effectiveEmail = parentEmail || email;
    const effectivePhone = parentPhone || phone;
    
    if (!parentName || !effectiveEmail || !preferredDate || !preferredTime) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'mail.springbase.com.ng',
      port: parseInt(process.env.SMTP_PORT || '465'),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: { rejectUnauthorized: false }
    });

    // Test the connection
    try {
      await transporter.verify();
    } catch (verifyError) {
      console.error('SMTP connection verification failed:', verifyError);
      return res.status(500).json({ 
        error: 'Email service temporarily unavailable. Please try again later.' 
      });
    }

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2c5530;">New School Tour Request</h2>
        <div style="background: #f9f9f9; padding: 20px; border-radius: 5px;">
          <h3>Parent Information</h3>
          <p><strong>Name:</strong> ${parentName}</p>
          <p><strong>Email:</strong> ${effectiveEmail}</p>
          <p><strong>Phone:</strong> ${effectivePhone || 'Not provided'}</p>
          <h3>Child Information</h3>
          <p><strong>Name:</strong> ${childName || 'Not specified'}</p>
          <p><strong>Age:</strong> ${childAge || 'Not specified'}</p>
          <h3>Tour Preferences</h3>
          <p><strong>Preferred Date:</strong> ${preferredDate}</p>
          <p><strong>Preferred Time:</strong> ${preferredTime}</p>
          ${(additionalInfo || notes) ? `<h3>Additional Information</h3><div style="background: white; padding: 15px; border-left: 4px solid #2c5530;">${(additionalInfo || notes).replace(/\n/g, '<br>')}</div>` : ''}
        </div>
      </div>
    `;

    const info = await transporter.sendMail({
      from: process.env.MAIL_FROM || 'Springbase Schools <info@springbase.com.ng>',
      to: process.env.SCHOOL_TO_EMAIL || 'info@springbase.com.ng',
      replyTo: effectiveEmail,
      subject: `School Tour Request - ${childName || parentName}`,
      html
    });

    console.log('Tour request email sent successfully:', info.messageId);
    
    return res.status(200).json({ 
      success: true, 
      message: 'Tour request submitted successfully', 
      messageId: info?.messageId 
    });
    
  } catch (error) {
    console.error('Schedule tour API error:', error);
    
    let errorMessage = 'Failed to submit tour request';
    let statusCode = 500;
    
    if (error?.code === 'EAUTH') {
      errorMessage = 'Email service authentication failed';
      statusCode = 500;
    } else if (error?.code === 'ECONNECTION') {
      errorMessage = 'Could not connect to email service';
      statusCode = 500;
    } else if (error?.code === 'ENOTFOUND') {
      errorMessage = 'Email service host not found';
      statusCode = 500;
    } else if (error?.code === 'ETIMEDOUT') {
      errorMessage = 'Email service connection timeout';
      statusCode = 500;
    }
    
    return res.status(statusCode).json({ 
      error: errorMessage,
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}


