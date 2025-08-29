import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', process.env.APP_ORIGIN || '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { parentName, parentEmail, parentPhone, childName, childAge, preferredDate, preferredTime, additionalInfo, email, phone, notes } = req.body || {};
    
    // Validate required fields
    if (!parentName || !parentEmail || !preferredDate || !preferredTime) {
      return res.status(400).json({ error: 'Missing required fields: parentName, parentEmail, preferredDate, preferredTime' });
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

    // Create calendar event details
    const eventDate = new Date(preferredDate);
    const [hours, minutes] = preferredTime.split(':');
    eventDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);
    
    const endDate = new Date(eventDate);
    endDate.setHours(endDate.getHours() + 1); // 1 hour duration

    // Format dates for calendar
    const formatDate = (date) => {
      return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    };

    // Create iCal calendar event
    const icalEvent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Springbase Schools//Campus Tour//EN',
      'BEGIN:VEVENT',
      `UID:${Date.now()}@springbase.com.ng`,
      `DTSTAMP:${formatDate(new Date())}`,
      `DTSTART:${formatDate(eventDate)}`,
      `DTEND:${formatDate(endDate)}`,
      `SUMMARY:Campus Tour - ${childName || 'Student'}`,
      `DESCRIPTION:Campus tour request from ${parentName} for ${childName || 'student'}. Contact: ${parentEmail}${parentPhone ? ` | Phone: ${parentPhone}` : ''}${additionalInfo ? ` | Notes: ${additionalInfo}` : ''}`,
      `LOCATION:Springbase Schools, 21 Canal View Off Community Road Ago, Okota Lagos`,
      `ORGANIZER;CN=Springbase Schools:mailto:info@springbase.com.ng`,
      `ATTENDEE;ROLE=REQ-PARTICIPANT;PARTSTAT=NEEDS-ACTION;RSVP=TRUE:mailto:${parentEmail}`,
      `ATTENDEE;ROLE=REQ-PARTICIPANT;PARTSTAT=ACCEPTED:mailto:info@springbase.com.ng`,
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    // Send confirmation email to parent
    const parentEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #2c5530; color: white; padding: 20px; text-align: center;">
          <h1 style="margin: 0;">Springbase Schools</h1>
          <p style="margin: 10px 0 0 0;">Campus Tour Confirmation</p>
        </div>
        
        <div style="padding: 30px 20px;">
          <h2 style="color: #2c5530;">Tour Request Received!</h2>
          
          <p>Dear ${parentName},</p>
          
          <p>Thank you for requesting a campus tour of Springbase Schools. We have received your request and will confirm the details shortly.</p>
          
          <div style="background: #f9f9f9; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h3 style="color: #2c5530; margin-top: 0;">Tour Details</h3>
            <p><strong>Date:</strong> ${new Date(preferredDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
            <p><strong>Time:</strong> ${preferredTime}</p>
            <p><strong>Child's Name:</strong> ${childName || 'Not specified'}</p>
            <p><strong>Child's Age:</strong> ${childAge || 'Not specified'}</p>
            ${additionalInfo ? `<p><strong>Additional Information:</strong> ${additionalInfo}</p>` : ''}
          </div>
          
          <p>We will contact you within 24 hours to confirm your tour appointment. If you need to make any changes, please reply to this email or call us at <strong>0701 082 1938</strong>.</p>
          
          <p>We look forward to showing you around our campus!</p>
          
          <p>Best regards,<br>
          <strong>The Springbase Schools Team</strong></p>
        </div>
        
        <div style="background: #f5f5f5; padding: 20px; text-align: center; color: #666;">
          <p style="margin: 0;">Springbase Schools<br>
          21 Canal View Off Community Road Ago, Okota Lagos<br>
          Phone: 0701 082 1938 | Email: info@springbase.com.ng</p>
        </div>
      </div>
    `;

    // Send notification email to school
    const schoolEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2c5530;">New Campus Tour Request</h2>
        
        <div style="background: #f9f9f9; padding: 20px; border-radius: 5px;">
          <h3>Parent Information</h3>
          <p><strong>Name:</strong> ${parentName}</p>
          <p><strong>Email:</strong> ${parentEmail}</p>
          <p><strong>Phone:</strong> ${parentPhone || 'Not provided'}</p>
          
          <h3>Tour Details</h3>
          <p><strong>Preferred Date:</strong> ${new Date(preferredDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
          <p><strong>Preferred Time:</strong> ${preferredTime}</p>
          <p><strong>Child's Name:</strong> ${childName || 'Not specified'}</p>
          <p><strong>Child's Age:</strong> ${childAge || 'Not specified'}</p>
          ${additionalInfo ? `<p><strong>Additional Information:</strong> ${additionalInfo}</p>` : ''}
        </div>
        
        <p><a href="mailto:${parentEmail}?subject=Re: Campus Tour Confirmation" style="background: #2c5530; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Reply to Parent</a></p>
      </div>
    `;

    // Send emails
    const [parentResult, schoolResult] = await Promise.all([
      transporter.sendMail({
        from: process.env.MAIL_FROM || 'Springbase Schools <info@springbase.com.ng>',
        to: parentEmail,
        replyTo: 'info@springbase.com.ng',
        subject: 'Campus Tour Request Confirmation - Springbase Schools',
        html: parentEmailHtml,
        text: `Tour Request Confirmation\n\nDear ${parentName},\n\nThank you for requesting a campus tour. We will confirm your appointment shortly.\n\nTour Details:\nDate: ${new Date(preferredDate).toLocaleDateString()}\nTime: ${preferredTime}\nChild: ${childName || 'Not specified'}\n\nWe'll contact you within 24 hours to confirm.`,
        attachments: [{
          filename: 'campus-tour.ics',
          content: icalEvent,
          contentType: 'text/calendar'
        }]
      }),
      transporter.sendMail({
        from: process.env.MAIL_FROM || 'Springbase Schools <info@springbase.com.ng>',
        to: process.env.SCHOOL_TO_EMAIL || 'info@springbase.com.ng',
        replyTo: parentEmail,
        subject: `New Campus Tour Request from ${parentName}`,
        html: schoolEmailHtml,
        text: `New Campus Tour Request\n\nParent: ${parentName}\nEmail: ${parentEmail}\nPhone: ${parentPhone || 'N/A'}\n\nTour: ${new Date(preferredDate).toLocaleDateString()} at ${preferredTime}\nChild: ${childName || 'Not specified'}\n\nReply to: ${parentEmail}`
      })
    ]);

    return res.status(200).json({
      success: true,
      message: 'Tour request submitted successfully! Check your email for confirmation.',
      messageId: parentResult?.messageId,
      calendarEvent: 'Calendar invitation attached to your confirmation email'
    });

  } catch (error) {
    console.error('Tour submission error:', error);
    
    let errorMessage = 'Failed to submit tour request';
    if (error?.code === 'EAUTH') errorMessage = 'SMTP authentication failed';
    if (error?.code === 'ECONNECTION') errorMessage = 'Could not connect to email server';
    if (error?.code === 'ETIMEDOUT') errorMessage = 'Email service connection timeout';
    
    return res.status(500).json({ 
      error: errorMessage,
      details: error.message 
    });
  }
}


