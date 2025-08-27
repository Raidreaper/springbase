import { createTransporter, sendEmail } from "../server/mailer.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ ok: false, error: "Method Not Allowed" });
  }

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

    return res.json({ ok: true });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    return res.status(500).json({ ok: false, error: "Failed to send message" });
  }
}


