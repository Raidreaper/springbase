import { createTransporter, sendEmail } from "../server/mailer.js";

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
        // In development, just log the email content and return success
        console.log('=== DEVELOPMENT MODE: Email would be sent ===');
        console.log('To:', process.env.SCHOOL_TO_EMAIL || "mailinfo@springbase.com.ng");
        console.log('Subject:', `New website inquiry from ${req.body.firstName || ""} ${req.body.lastName || ""}`);
        console.log('Body:', req.body);
        console.log('==========================================');
        
        return res.json({ 
          ok: true, 
          message: "Development mode - email logged to console",
          data: req.body 
        });
      }
      
      return res.status(500).json({ 
        ok: false, 
        error: "SMTP credentials not configured. Please set SMTP_USER and SMTP_PASS environment variables in Vercel." 
      });
    }

    const { firstName, lastName, email, phone, gradeLevel, message } = req.body || {};
    
    // Validate required fields
    if (!firstName || !email || !message) {
      return res.status(400).json({ 
        ok: false, 
        error: "Missing required fields: firstName, email, and message are required" 
      });
    }

    const transporter = createTransporter();

    const subject = `New website inquiry from ${firstName} ${lastName}`.trim();
    const html = `
      <h2>New Website Inquiry</h2>
      <p><strong>Name:</strong> ${firstName} ${lastName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
      <p><strong>Grade Level:</strong> ${gradeLevel || 'Not specified'}</p>
      <p><strong>Message:</strong><br/>${message.replace(/\n/g, "<br/>")}</p>
    `;

    await sendEmail(transporter, {
      to: process.env.SCHOOL_TO_EMAIL || "mailinfo@springbase.com.ng",
      replyTo: email,
      subject,
      html,
    });

    return res.json({ ok: true });
  } catch (err) {
    console.error('Contact form error:', err);
    return res.status(500).json({ ok: false, error: "Failed to send message" });
  }
}


