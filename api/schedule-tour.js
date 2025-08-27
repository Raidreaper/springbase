import { createTransporter, sendEmail } from "../server/mailer.js";
import { createTourIcs } from "../server/tour-ics.js";

const allowedOrigins = [
  "https://springbase.vercel.app",
  "http://springbase.com.ng",
  "https://springbase.com.ng",
  process.env.APP_ORIGIN || "",
  "http://localhost:5173",
  "http://localhost:4173",
  "http://127.0.0.1:5173",
].filter(Boolean);

function applyCors(req, res) {
  const requestOrigin = req.headers.origin;
  if (requestOrigin && allowedOrigins.includes(requestOrigin)) {
    res.setHeader("Access-Control-Allow-Origin", requestOrigin);
  }
  res.setHeader("Vary", "Origin");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Requested-With"
  );
}

export default async function handler(req, res) {
  applyCors(req, res);

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ ok: false, error: "Method Not Allowed" });
  }

  try {
    // Check if we're in development mode and allow test emails
    const isDevelopment = process.env.NODE_ENV === 'development';
    
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      if (isDevelopment) {
        // In development, just log the tour request and return success
        console.log('=== DEVELOPMENT MODE: Tour request would be sent ===');
        console.log('To:', process.env.SCHOOL_TO_EMAIL || "mailinfo@springbase.com.ng");
        console.log('Subject:', `Tour Request - ${req.body.parentName} (${req.body.preferredDate} ${req.body.preferredTime})`);
        console.log('Body:', req.body);
        console.log('==========================================');
        
        return res.json({ 
          ok: true, 
          message: "Development mode - tour request logged to console",
          data: req.body 
        });
      }
      
      return res.status(500).json({ 
        ok: false, 
        error: "SMTP credentials not configured. Please set SMTP_USER and SMTP_PASS environment variables in Vercel." 
      });
    }

    const { parentName, email, phone, preferredDate, preferredTime, notes } = req.body || {};
    
    // Validate required fields
    if (!parentName || !email || !preferredDate || !preferredTime) {
      return res.status(400).json({ 
        ok: false, 
        error: "Missing required fields: parentName, email, preferredDate, and preferredTime are required" 
      });
    }

    const transporter = createTransporter();

    // Create ICS event for parent confirmation
    const { filename, content } = createTourIcs({ parentName, preferredDate, preferredTime });

    const subject = `Tour Request - ${parentName} (${preferredDate} ${preferredTime})`;
    const htmlSchool = `
      <h2>New Campus Tour Request</h2>
      <p><strong>Parent/Guardian:</strong> ${parentName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
      <p><strong>Preferred:</strong> ${preferredDate} at ${preferredTime}</p>
      <p><strong>Notes:</strong><br/>${(notes || 'No additional notes').replace(/\n/g, "<br/>")}</p>
    `;

    await sendEmail(transporter, {
      to: process.env.SCHOOL_TO_EMAIL || "mailinfo@springbase.com.ng",
      subject,
      html: htmlSchool,
      replyTo: email,
    });

    const htmlParent = `
      <p>Dear ${parentName},</p>
      <p>Thank you for scheduling a campus tour at Springbase Schools. We have received your request for ${preferredDate} at ${preferredTime}. An administrator will confirm shortly.</p>
      <p>We attached a calendar invite for your convenience.</p>
      <p>Best regards,<br/>Springbase Schools</p>
    `;

    await sendEmail(transporter, {
      to: email,
      subject: "Springbase Schools - Campus Tour Request Received",
      html: htmlParent,
      attachments: [
        { filename, content, contentType: "text/calendar" },
      ],
    });

    return res.json({ ok: true });
  } catch (err) {
    console.error('Tour request error:', err);
    return res.status(500).json({ ok: false, error: "Failed to schedule tour" });
  }
}


