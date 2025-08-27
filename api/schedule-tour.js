import { createTransporter, sendEmail } from "../server/mailer.js";
import { createTourIcs } from "../server/tour-ics.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ ok: false, error: "Method Not Allowed" });
  }

  try {
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      return res.status(500).json({ ok: false, error: "SMTP credentials not configured" });
    }

    const { parentName, email, phone, preferredDate, preferredTime, notes } = req.body || {};
    const transporter = createTransporter();

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

    return res.json({ ok: true });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    return res.status(500).json({ ok: false, error: "Failed to schedule tour" });
  }
}


