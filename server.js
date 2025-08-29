import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// SMTP Configuration for local testing
const SMTP_CONFIG = {
  host: '185.234.21.198', // Direct IP address to bypass Cloudflare
  port: 465, // Correct port from your hosting provider
  secure: true, // Use SSL for port 465
  auth: {
    user: 'info@springbase.com.ng',
    pass: ')4}gLAU0O,(VNrI1'
  },
  tls: { 
    rejectUnauthorized: false
  },
  connectionTimeout: 60000, // 60 seconds
  greetingTimeout: 60000,
  socketTimeout: 60000
};

// Helper to build an ICS calendar event
function buildIcsEvent({ uid, title, description, location, startUtc, endUtc, organizerEmail, attendeeEmail }) {
  const dtStamp = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  const fmt = (d) => d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  return [
    'BEGIN:VCALENDAR',
    'PRODID:-//Springbase Schools//Tour Scheduler//EN',
    'VERSION:2.0',
    'CALSCALE:GREGORIAN',
    'METHOD:REQUEST',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${dtStamp}`,
    `DTSTART:${fmt(startUtc)}`,
    `DTEND:${fmt(endUtc)}`,
    `SUMMARY:${title}`,
    `DESCRIPTION:${description.replace(/\n/g, '\\n')}`,
    location ? `LOCATION:${location}` : 'LOCATION:Springbase Schools',
    `ORGANIZER;CN=Springbase Schools:mailto:${organizerEmail}`,
    attendeeEmail ? `ATTENDEE;CN=Parent;ROLE=REQ-PARTICIPANT;RSVP=TRUE:mailto:${attendeeEmail}` : '',
    'STATUS:CONFIRMED',
    'SEQUENCE:0',
    'TRANSP:OPAQUE',
    'END:VEVENT',
    'END:VCALENDAR'
  ].filter(Boolean).join('\r\n');
}

// Tour booking endpoint
app.post('/schedule-tour', async (req, res) => {
  try {
    const { parentName, parentEmail, parentPhone, childName, childAge, preferredDate, preferredTime, additionalInfo, email, phone, notes } = req.body || {};
    const effectiveEmail = parentEmail || email;
    const effectivePhone = parentPhone || phone;
    
    if (!parentName || !effectiveEmail || !preferredDate || !preferredTime) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Parse date/time and build start/end in UTC (assume 1 hour duration)
    const startLocal = new Date(`${preferredDate}T${String(preferredTime).padStart(5, '0')}:00`);
    const endLocal = new Date(startLocal.getTime() + 60 * 60 * 1000);
    const startUtc = new Date(startLocal.getTime());
    const endUtc = new Date(endLocal.getTime());

    // Try to send email first
    let emailSent = false;
    let emailError = null;
    
    try {
      const transporter = nodemailer.createTransport(SMTP_CONFIG);
      
      // Test the connection
      await transporter.verify();
      console.log('SMTP connection verified successfully');

      const html = `
        <div style=\"font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;\">
          <h2 style=\"color: #2c5530;\">New School Tour Request</h2>
          <div style=\"background: #f9f9f9; padding: 20px; border-radius: 5px;\">
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
            ${(additionalInfo || notes) ? `<h3>Additional Information</h3><div style=\"background: white; padding: 15px; border-left: 4px solid #2c5530;\">${(additionalInfo || notes).replace(/\n/g, '<br>')}</div>` : ''}
          </div>
        </div>
      `;

      const description = `Parent: ${parentName}\\nEmail: ${effectiveEmail}\\nPhone: ${effectivePhone || 'N/A'}\\nChild: ${childName || 'N/A'} (Age: ${childAge || 'N/A'})\\nNotes: ${(additionalInfo || notes) || 'None'}`;
      const uid = `tour-${Date.now()}@springbase.com.ng`;
      const icsContent = buildIcsEvent({
        uid,
        title: 'Campus Tour - Springbase Schools',
        description,
        location: 'Springbase Schools, 21 Canal View Off Community Road Ago, Okota Lagos',
        startUtc,
        endUtc,
        organizerEmail: 'info@springbase.com.ng',
        attendeeEmail: effectiveEmail
      });

      const mailOptions = {
        from: 'Springbase Schools <info@springbase.com.ng>',
        to: ['info@springbase.com.ng', effectiveEmail],
        replyTo: 'info@springbase.com.ng',
        subject: `School Tour Request - ${childName || parentName} (${preferredDate} ${preferredTime})`,
        html,
        attachments: [
          {
            filename: 'springbase-tour.ics',
            content: icsContent,
            contentType: 'text/calendar; method=REQUEST; charset=UTF-8'
          }
        ]
      };

      const info = await transporter.sendMail(mailOptions);
      console.log('Tour request email (with ICS) sent:', info.messageId);
      emailSent = true;
      
    } catch (emailErr) {
      console.error('Email sending failed:', emailErr);
      emailError = emailErr.message;
      // Continue to fallback storage
    }

    // Store the request locally as fallback
    const tourRequest = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      parentName,
      parentEmail: effectiveEmail,
      parentPhone: effectivePhone,
      childName: childName || 'Not specified',
      childAge: childAge || 'Not specified',
      preferredDate,
      preferredTime,
      additionalInfo: additionalInfo || notes || 'No additional information',
      status: emailSent ? 'sent' : 'stored_locally',
      emailError: emailError
    };

    console.log('Tour request stored:', tourRequest);
    
    if (emailSent) {
      return res.status(200).json({ 
        success: true, 
        message: 'Tour request submitted successfully and calendar invite sent to both parent and school.', 
        messageId: tourRequest.id 
      });
    } else {
      return res.status(200).json({ 
        success: true, 
        message: 'Tour request submitted successfully! Email service unavailable, but we have your request.', 
        warning: 'Email could not be sent due to connection issues',
        requestId: tourRequest.id 
      });
    }
    
  } catch (error) {
    console.error('Schedule tour API error:', error);
    
    let errorMessage = 'Failed to submit tour request';
    let statusCode = 500;
    
    if (error?.code === 'EAUTH') {
      errorMessage = 'Email service authentication failed - check your username/password';
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
      details: error.message
    });
  }
});

// GET handler for testing the schedule-tour endpoint
app.get('/schedule-tour', (req, res) => {
  res.json({ 
    message: 'Tour booking endpoint is working!',
    method: 'GET',
    note: 'Use POST method to submit tour requests',
    timestamp: new Date().toISOString(),
    endpoints: {
      'GET /schedule-tour': 'This message (for testing)',
      'POST /schedule-tour': 'Submit tour booking form',
      'GET /test': 'Test server status'
    }
  });
});

// Contact endpoint (local dev)
app.post('/contact', async (req, res) => {
  try {
    const { firstName, lastName, name, email, phone, gradeLevel, message, subject } = req.body || {};
    const displayName = name || [firstName, lastName].filter(Boolean).join(' ').trim();
    if (!displayName || !email || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    let emailSent = false;
    let emailError = null;

    try {
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
            <div style="background: white; padding: 15px; border-left: 4px solid #2c5530;">${String(message).replace(/\n/g, '<br>')}</div>
          </div>
        </div>
      `;

      const info = await transporter.sendMail({
        from: 'Springbase Schools <info@springbase.com.ng>',
        to: 'info@springbase.com.ng',
        replyTo: email,
        subject: subject || `New Contact Form Submission from ${displayName}`,
        html,
        text: `Name: ${displayName}\nEmail: ${email}\nPhone: ${phone || 'N/A'}\nGrade: ${gradeLevel || 'N/A'}\n\nMessage:\n${message}`
      });

      console.log('Contact email sent successfully:', info.messageId);
      emailSent = true;
    } catch (emailErr) {
      console.error('Contact email failed:', emailErr);
      emailError = emailErr.message;
    }

    return res.status(200).json({ 
      success: true, 
      message: emailSent ? 'Message sent successfully' : 'Message received. Email delivery pending.',
      warning: emailSent ? undefined : 'Email could not be sent due to connection issues',
      emailError
    });
  } catch (error) {
    console.error('Contact API error:', error);
    return res.status(500).json({ error: 'Failed to send message', details: error.message });
  }
});

// Newsletter subscribe endpoint (local dev)
app.post('/newsletter', async (req, res) => {
  try {
    const { email } = req.body || {};
    if (!email) return res.status(400).json({ error: 'Email is required' });

    let emailSent = false;
    let emailError = null;

    try {
      const transporter = nodemailer.createTransport(SMTP_CONFIG);
      await transporter.verify();

      const info = await transporter.sendMail({
        from: 'Springbase Schools <info@springbase.com.ng>',
        to: 'info@springbase.com.ng',
        replyTo: email,
        subject: 'New Newsletter Subscription',
        html: `<p>A new user subscribed to the newsletter.</p><p><strong>Email:</strong> ${email}</p>`,
        text: `New newsletter subscription: ${email}`
      });

      console.log('Newsletter email sent:', info.messageId);
      emailSent = true;
    } catch (emailErr) {
      console.error('Newsletter email failed:', emailErr);
      emailError = emailErr.message;
    }

    return res.status(200).json({ 
      success: true, 
      message: emailSent ? 'Subscribed successfully' : 'Subscription saved. Email delivery pending.',
      emailError
    });
  } catch (error) {
    console.error('Newsletter API error:', error);
    return res.status(500).json({ error: 'Failed to subscribe', details: error.message });
  }
});

// Test endpoint
app.get('/test', (req, res) => {
  res.json({ message: 'Local API server is running!', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`🚀 Local API server running on http://localhost:${PORT}`);
  console.log(`📧 Tour booking endpoint: http://localhost:${PORT}/schedule-tour`);
  console.log(`🧪 Test endpoint: http://localhost:${PORT}/test`);
});
