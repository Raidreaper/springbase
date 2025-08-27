import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import { createTransporter, sendEmail } from "./mailer.js";
import { createTourIcs } from "./tour-ics.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

// Configure CORS to explicitly allow the deployed frontend and local dev
const allowedOrigins = [
  "https://springbase.vercel.app",
  "http://springbase.com.ng",
  "https://springbase.com.ng",
  process.env.APP_ORIGIN || "",
  "http://localhost:5173",
  "http://127.0.0.1:5173",
].filter(Boolean);

const corsOptions = {
  origin(origin, callback) {
    // Allow requests with no origin (like mobile apps or curl) and same-origin
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error("Not allowed by CORS"));
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Requested-With",
  ],
  credentials: false,
  optionsSuccessStatus: 204,
  maxAge: 600,
};

app.use(cors(corsOptions));
// Explicitly handle preflight for all routes
app.options("*", cors(corsOptions));
// Helpful for proxies/CDNs when varying by Origin
app.use((req, res, next) => {
  res.header("Vary", "Origin");
  next();
});
app.use(bodyParser.json());

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.get("/api/config/status", (_req, res) => {
  const hasUser = Boolean(process.env.SMTP_USER);
  const hasPass = Boolean(process.env.SMTP_PASS);
  res.json({ smtpUser: hasUser, smtpPass: hasPass });
});

app.post("/api/contact", async (req, res) => {
  try {
    // Check if we're in development mode and allow test emails
    const isDevelopment = process.env.NODE_ENV === 'development';
    
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      if (isDevelopment) {
        // In development, just log the email content and return success
        console.log('=== DEVELOPMENT MODE: Email would be sent ===');
        console.log('To:', process.env.SCHOOL_TO_EMAIL || "info@springbase.com.ng");
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
        error: "SMTP credentials not configured. Please set SMTP_USER and SMTP_PASS environment variables." 
      });
    }
    
    const { firstName, lastName, email, phone, gradeLevel, message } = req.body || {};
    const transporter = createTransporter();

    const subject = `New website inquiry from ${firstName || ""} ${lastName || ""}`.trim();
    const html = `
      <h2>New Website Inquiry</h2>
      <p><strong>Name:</strong> ${firstName || ""} ${lastName || ""}</p>
      <p><strong>Email:</strong> ${email || ""}</p>
      <p><strong>Phone:</strong> ${phone || ""}</p>
      <p><strong>Grade Level:</strong> ${gradeLevel || ""}</p>
      <p><strong>Message:</strong><br/>${(message || "").replace(/\n/g, "<br/>")}</p>
    `;

    await sendEmail(transporter, {
      to: process.env.SCHOOL_TO_EMAIL || "mailinfo@springbase.com.ng",
      replyTo: email,
      subject,
      html,
    });

    res.json({ ok: true });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Contact form error:', err);
    res.status(500).json({ ok: false, error: "Failed to send message" });
  }
});

app.post("/api/schedule-tour", async (req, res) => {
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
        error: "SMTP credentials not configured. Please set SMTP_USER and SMTP_PASS environment variables." 
      });
    }
    
    const { parentName, email, phone, preferredDate, preferredTime, notes } = req.body || {};
    const transporter = createTransporter();

    // Create ICS event for parent confirmation
    const { filename, content } = createTourIcs({ parentName, preferredDate, preferredTime });

    const subject = `Tour Request - ${parentName} (${preferredDate} ${preferredTime})`;
    const htmlSchool = `
      <h2>New Campus Tour Request</h2>
      <p><strong>Parent/Guardian:</strong> ${parentName || ""}</p>
      <p><strong>Email:</strong> ${email || ""}</p>
      <p><strong>Phone:</strong> ${phone || ""}</p>
      <p><strong>Preferred:</strong> ${preferredDate || ""} at ${preferredTime || ""}</p>
      <p><strong>Notes:</strong><br/>${(notes || "").replace(/\n/g, "<br/>")}</p>
    `;

    await sendEmail(transporter, {
      to: process.env.SCHOOL_TO_EMAIL || "mailinfo@springbase.com.ng",
      subject,
      html: htmlSchool,
      replyTo: email,
    });

    const htmlParent = `
      <p>Dear ${parentName || "Parent"},</p>
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

    res.json({ ok: true });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Tour request error:', err);
    res.status(500).json({ ok: false, error: "Failed to schedule tour" });
  }
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`API server listening on http://localhost:${port}`);
});


