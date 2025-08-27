export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({ ok: false, error: "Method Not Allowed" });
  }

  const expose = (name) => Boolean(process.env[name] && String(process.env[name]).length > 0);

  return res.json({
    ok: true,
    env: {
      SMTP_HOST: expose("SMTP_HOST"),
      SMTP_PORT: expose("SMTP_PORT"),
      SMTP_USER: expose("SMTP_USER"),
      SMTP_PASS: expose("SMTP_PASS"),
      MAIL_FROM: expose("MAIL_FROM"),
      SCHOOL_TO_EMAIL: expose("SCHOOL_TO_EMAIL"),
    },
  });
}


