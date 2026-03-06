// app/api/contact/route.ts
// ─────────────────────────────────────────────────────────────────────────────
// Stub: wire up your email backend here (Resend, SendGrid, Nodemailer, etc.)
// Replace the TODO sections when ready.
// ─────────────────────────────────────────────────────────────────────────────

import { NextRequest, NextResponse } from "next/server";

const RECAPTCHA_SECRET = process.env.RECAPTCHA_SECRET_KEY ?? "";
const TO_EMAIL = "info@aiunite.ai"; // change if needed

async function verifyRecaptcha(token: string): Promise<boolean> {
  const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `secret=${RECAPTCHA_SECRET}&response=${token}`,
  });
  const data = await res.json();
  // v3: score >= 0.5 is human. Adjust threshold if needed.
  return data.success && data.score >= 0.5;
}

export async function POST(req: NextRequest) {
  try {
    const { name, email, org, topic, message, recaptchaToken } = await req.json();

    // 1. Validate required fields
    if (!name || !email || !topic || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // 2. Verify reCAPTCHA
    const human = await verifyRecaptcha(recaptchaToken);
    if (!human) {
      return NextResponse.json({ error: "reCAPTCHA failed" }, { status: 400 });
    }

    // 3. TODO: Send email — plug in your provider here
    // ── Resend example ──────────────────────────────────────────────────────
    // import { Resend } from "resend";
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: "AI Unite Contact <no-reply@aiunite.ai>",
    //   to: TO_EMAIL,
    //   subject: `[Contact] ${topic} — ${name}`,
    //   text: `Name: ${name}\nEmail: ${email}\nOrg: ${org}\nTopic: ${topic}\n\n${message}`,
    // });
    // ────────────────────────────────────────────────────────────────────────

    // ── SendGrid example ────────────────────────────────────────────────────
    // import sgMail from "@sendgrid/mail";
    // sgMail.setApiKey(process.env.SENDGRID_API_KEY!);
    // await sgMail.send({
    //   to: TO_EMAIL,
    //   from: "no-reply@aiunite.ai",
    //   subject: `[Contact] ${topic} — ${name}`,
    //   text: `Name: ${name}\nEmail: ${email}\nOrg: ${org}\nTopic: ${topic}\n\n${message}`,
    // });
    // ────────────────────────────────────────────────────────────────────────

    console.log("Contact form submission:", { name, email, org, topic, message });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
