import nodemailer from "nodemailer";

export function createTransporter() {
  const host = process.env.SMTP_HOST || "mail.springbase.com.ng";
  const port = Number(process.env.SMTP_PORT || 465);
  const user = process.env.SMTP_USER || "info@springbase.com.ng";
  const pass = process.env.SMTP_PASS || "";

  // Use secure for 465, STARTTLS for 587
  const isSecure = port === 465;

  return nodemailer.createTransport({
    host,
    port,
    secure: isSecure,
    auth: { user, pass },
    // Some shared hosts require explicit TLS options on 587
    tls: isSecure ? undefined : { rejectUnauthorized: false },
  });
}

export async function sendEmail(transporter, { to, subject, html, replyTo, attachments }) {
  const from = process.env.MAIL_FROM || `Springbase Schools <info@springbase.com.ng>`;
  return transporter.sendMail({ from, to, subject, html, replyTo, attachments });
}


