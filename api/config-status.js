const allowedOrigins = [
  "https://springbase.vercel.app",
  "http://springbase.com.ng",
  "https://springbase.com.ng",
  process.env.APP_ORIGIN || "",
  "http://localhost:5173",
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


