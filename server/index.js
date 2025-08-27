import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import { createTransporter, sendEmail } from "./mailer.js";
import { createTourIcs } from "./tour-ics.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
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
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      return res.status(500).json({ ok: false, error: "SMTP credentials not configured" });
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
    console.error(err);
    res.status(500).json({ ok: false, error: "Failed to send message" });
  }
});

app.post("/api/schedule-tour", async (req, res) => {
  try {
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      return res.status(500).json({ ok: false, error: "SMTP credentials not configured" });
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
    console.error(err);
    res.status(500).json({ ok: false, error: "Failed to schedule tour" });
  }
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`API server listening on http://localhost:${port}`);
});


