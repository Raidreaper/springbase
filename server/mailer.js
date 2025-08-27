import nodemailer from "nodemailer";

export function createTransporter() {
  const host = process.env.SMTP_HOST || "mail.springbase.com.ng";
  const port = Number(process.env.SMTP_PORT || 465);
  const user = process.env.SMTP_USER || "info@springbase.com.ng";
  const pass = process.env.SMTP_PASS || "";

  return nodemailer.createTransport({
    host,
    port,
    secure: true,
    auth: { user, pass },
  });
}

export async function sendEmail(transporter, { to, subject, html, replyTo, attachments }) {
  const from = process.env.MAIL_FROM || `Springbase Schools <info@springbase.com.ng>`;
  return transporter.sendMail({ from, to, subject, html, replyTo, attachments });
}


