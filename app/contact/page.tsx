"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";

// ── Topic options ──────────────────────────────────────────────────────────────
const TOPICS = [
  { value: "enterprise",  label: "Enterprise — Organizational intelligence" },
  { value: "smb",         label: "SMB — AI for growing teams" },
  { value: "academia",    label: "Academia — Research & institutional use" },
  { value: "platform",    label: "Platform — Query experience & architecture" },
  { value: "api",         label: "API — Developer access & integration" },
  { value: "extension",   label: "Extension — Browser intelligence layer" },
  { value: "pricing",     label: "Pricing — Plans & enterprise agreements" },
  { value: "general",     label: "General — Something else" },
];

// ── reCAPTCHA v3 hook ──────────────────────────────────────────────────────────
// Replace YOUR_RECAPTCHA_SITE_KEY with actual key when ready
const RECAPTCHA_SITE_KEY = "YOUR_RECAPTCHA_SITE_KEY";

function useRecaptcha() {
  const loaded = useRef(false);

  useEffect(() => {
    if (loaded.current || typeof window === "undefined") return;
    if (document.querySelector(`script[src*="recaptcha"]`)) { loaded.current = true; return; }
    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;
    script.async = true;
    script.onload = () => { loaded.current = true; };
    document.head.appendChild(script);
  }, []);

  const getToken = (): Promise<string> =>
    new Promise((resolve, reject) => {
      if (!(window as any).grecaptcha) return reject("reCAPTCHA not loaded");
      (window as any).grecaptcha.ready(() => {
        (window as any).grecaptcha
          .execute(RECAPTCHA_SITE_KEY, { action: "contact_form" })
          .then(resolve)
          .catch(reject);
      });
    });

  return { getToken };
}

// ── Form state ─────────────────────────────────────────────────────────────────
type FormState = "idle" | "submitting" | "success" | "error";

// ── Main inner component (uses useSearchParams) ────────────────────────────────
function ContactFormInner() {
  const searchParams = useSearchParams();
  const fromParam = searchParams.get("from") ?? "";
  const matchedTopic = TOPICS.find((t) => t.value === fromParam.toLowerCase())?.value ?? "";

  const [topic, setTopic]       = useState(matchedTopic);
  const [name, setName]         = useState("");
  const [email, setEmail]       = useState("");
  const [org, setOrg]           = useState("");
  const [message, setMessage]   = useState("");
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const { getToken }            = useRecaptcha();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("submitting");
    setErrorMsg("");

    try {
      const recaptchaToken = await getToken();

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, org, topic, message, recaptchaToken }),
      });

      if (!res.ok) throw new Error("Server error");
      setFormState("success");
    } catch (err) {
      setFormState("error");
      setErrorMsg("Something went wrong. Please try again or email us directly.");
    }
  };

  const inputBase = [
    "w-full rounded-xl border bg-white/[0.04] px-4 py-3 text-sm text-white/90",
    "placeholder:text-white/30 outline-none transition-all duration-200",
    "border-white/10 focus:border-[rgba(96,165,250,0.6)] focus:bg-white/[0.07]",
    "focus:shadow-[0_0_0_3px_rgba(96,165,250,0.08)]",
  ].join(" ");

  const labelBase = "block text-xs font-semibold tracking-[0.12em] text-white/50 uppercase mb-2";

  if (formState === "success") {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div
          className="mb-6 flex h-16 w-16 items-center justify-center rounded-full text-2xl"
          style={{ background: "rgba(52,211,153,0.12)", border: "1px solid rgba(52,211,153,0.3)" }}
        >
          ✓
        </div>
        <h3 className="text-2xl font-semibold text-white/90 mb-3">Message received.</h3>
        <p className="text-sm text-white/55 max-w-sm leading-relaxed">
          We'll get back to you within one business day. If it's urgent, email us directly at{" "}
          <a href="mailto:info@aiunite.ai" className="text-[#60a5fa] hover:underline">
            info@aiunite.ai
          </a>
        </p>
        <button
          onClick={() => { setFormState("idle"); setName(""); setEmail(""); setOrg(""); setMessage(""); }}
          className="mt-8 text-xs text-white/40 hover:text-white/70 transition-colors underline underline-offset-2"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      {/* Topic */}
      <div>
        <label className={labelBase}>What can we help with?</label>
        <div className="relative"  suppressHydrationWarning>
          <select
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            required
            className={[
              inputBase,
              "appearance-none cursor-pointer pr-10",
              topic ? "text-white/90" : "text-white/30",
            ].join(" ")}
            style={{ colorScheme: "dark" }}
          >
            <option value="" disabled className="bg-[#0d1a2a] text-white/50">
              Select a topic...
            </option>
            {TOPICS.map((t) => (
              <option key={t.value} value={t.value} className="bg-[#0d1a2a] text-white/90">
                {t.label}
              </option>
            ))}
          </select>
          {/* Chevron */}
          <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/30">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
        {/* Auto-fill notice */}
        {matchedTopic && topic === matchedTopic && (
          <p className="mt-2 text-[11px] text-[#60a5fa]/70 flex items-center gap-1.5">
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#60a5fa", display: "inline-block" }} />
            Pre-filled based on where you came from
          </p>
        )}
      </div>

      {/* Name + Email row */}
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelBase}>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Your name"
            className={inputBase}
          />
        </div>
        <div>
          <label className={labelBase}>Work email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="you@company.com"
            className={inputBase}
          />
        </div>
      </div>

      {/* Organization */}
      <div>
        <label className={labelBase}>Organization <span className="normal-case font-normal text-white/30">(optional)</span></label>
        <input
          type="text"
          value={org}
          onChange={(e) => setOrg(e.target.value)}
          placeholder="Company or institution name"
          className={inputBase}
        />
      </div>

      {/* Message */}
      <div>
        <label className={labelBase}>Message</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          rows={5}
          placeholder="Tell us what you're trying to solve..."
          className={[inputBase, "resize-none leading-relaxed"].join(" ")}
        />
      </div>

      {/* Error */}
      {formState === "error" && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-400">
          {errorMsg}
        </div>
      )}

      {/* Submit */}
      <div className="flex items-center justify-between gap-4 pt-1">
        <p className="text-[10px] text-white/25 leading-relaxed max-w-[200px]">
          Protected by reCAPTCHA.{" "}
          <a href="https://policies.google.com/privacy" target="_blank" rel="noopener" className="underline hover:text-white/40">
            Privacy
          </a>{" "}
          &{" "}
          <a href="https://policies.google.com/terms" target="_blank" rel="noopener" className="underline hover:text-white/40">
            Terms
          </a>
        </p>
        <button
          type="submit"
          disabled={formState === "submitting"}
          className="inline-flex items-center gap-2.5 rounded-xl px-7 py-3 text-sm font-semibold transition-all duration-200 disabled:opacity-50"
          style={{
            background: formState === "submitting"
              ? "rgba(96,165,250,0.3)"
              : "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
            color: "#fff",
            boxShadow: formState === "submitting"
              ? "none"
              : "0 3px 0 0 #1d4ed8, 0 4px 14px rgba(59,130,246,0.35)",
            transform: formState === "submitting" ? "translateY(2px)" : "translateY(0)",
          }}
        >
          {formState === "submitting" ? (
            <>
              <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              Sending...
            </>
          ) : (
            <>Send message <span>→</span></>
          )}
        </button>
      </div>
    </form>
  );
}

// ── Page wrapper ───────────────────────────────────────────────────────────────
export default function ContactPage() {
  return (
    <main className="min-h-screen pb-24">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">

        {/* Hero */}
        <div className="pt-20 md:pt-28 pb-12">
          <div className="text-xs font-semibold tracking-[0.22em] text-[rgb(var(--primary))] mb-4 uppercase">
            Contact
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-[rgb(var(--text))] max-w-xl">
            Let's talk.
          </h1>
          <p className="mt-4 text-base leading-relaxed text-[rgb(var(--muted))] max-w-lg">
            Whether you're exploring a pilot, have a technical question, or just want to see
            the platform in action — we respond within one business day.
          </p>

          {/* Quick contact line */}
          <div className="mt-6 flex flex-wrap items-center gap-6 text-sm text-[rgb(var(--muted))]">
            <a href="mailto:info@aiunite.ai" className="flex items-center gap-2 hover:text-[rgb(var(--text))] transition-colors">
              <span className="text-[rgb(var(--primary))]">✉</span>
              info@aiunite.ai
            </a>
            <span className="flex items-center gap-2">
              <span className="text-[#34d399]">●</span>
              Typically replies within 24h
            </span>
          </div>
        </div>

        {/* Form card */}
        <div
          className="rounded-2xl border border-white/10 p-8 md:p-10"
          style={{
            background: "linear-gradient(135deg, #0a1628 0%, #0d1f3a 55%, #081420 100%)",
          }}
        >
          <Suspense fallback={<div className="text-white/40 text-sm">Loading form...</div>}>
            <ContactFormInner />
          </Suspense>
        </div>

        {/* Footer note */}
        <p className="mt-8 text-center text-xs text-[rgb(var(--muted))]">
          For enterprise pilots, we'll set up a proper discovery call.{" "}
          <a href="mailto:info@aiunite.ai" className="text-[rgb(var(--primary))] hover:underline">
            info@aiunite.ai
          </a>
        </p>

      </div>
    </main>
  );
}
