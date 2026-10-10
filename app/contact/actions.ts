"use server";

import { headers } from "next/headers";
import { siteConfig } from "../../lib/site";

export type ContactField = "name" | "email" | "message";

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Partial<Record<ContactField, string>>;
  // Echoed back on errors so the form keeps what the visitor typed
  values?: Record<ContactField, string>;
};

const LIMITS = {
  name: { min: 2, max: 100 },
  email: { max: 254 },
  message: { min: 10, max: 5000 },
};

const EMAIL_PATTERN = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[^\s@<>()[\]\\,;:"]{2,}$/;

// Best-effort spam guard. Serverless instances don't share memory, so this
// limits bursts per instance rather than acting as a global quota.
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 5;
const recentSubmissions = new Map<string, number[]>();

function isRateLimited(key: string) {
  const now = Date.now();
  const hits = (recentSubmissions.get(key) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  const limited = hits.length >= RATE_MAX;
  if (!limited) hits.push(now);
  recentSubmissions.set(key, hits);

  if (recentSubmissions.size > 500) {
    for (const [k, times] of recentSubmissions) {
      if (times.every((t) => now - t >= RATE_WINDOW_MS)) recentSubmissions.delete(k);
    }
  }
  return limited;
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);
}

function field(formData: FormData, key: string) {
  const value = formData.get(key);
  // Form encoding turns each line break into CRLF; normalize so lengths match the browser's count
  return typeof value === "string" ? value.replace(/\r\n?/g, "\n").trim() : "";
}

const SUCCESS_MESSAGE = "Thanks for reaching out! Your message landed in my inbox and I'll get back to you soon.";

export async function sendContactMessage(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const values = {
    name: field(formData, "name"),
    email: field(formData, "email"),
    message: field(formData, "message"),
  };

  // Honeypot: real visitors never see or fill this field
  if (field(formData, "company")) {
    return { status: "success", message: SUCCESS_MESSAGE };
  }

  const fieldErrors: ContactState["fieldErrors"] = {};
  if (values.name.length < LIMITS.name.min || values.name.length > LIMITS.name.max) {
    fieldErrors.name = `Please enter your name (${LIMITS.name.min} to ${LIMITS.name.max} characters).`;
  }
  if (values.email.length > LIMITS.email.max || !EMAIL_PATTERN.test(values.email)) {
    fieldErrors.email = "Please enter a valid email address so I can reply.";
  }
  if (values.message.length < LIMITS.message.min || values.message.length > LIMITS.message.max) {
    fieldErrors.message = `Your message should be ${LIMITS.message.min} to ${LIMITS.message.max} characters long.`;
  }
  if (Object.keys(fieldErrors).length > 0) {
    return { status: "error", message: "Please fix the highlighted fields.", fieldErrors, values };
  }

  const requestHeaders = await headers();
  const ip = requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() || requestHeaders.get("x-real-ip") || "unknown";
  if (isRateLimited(ip)) {
    return {
      status: "error",
      message: "You've sent a few messages already. Please wait a bit and try again.",
      values,
    };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[contact] RESEND_API_KEY is not set, so the contact form cannot send email.");
    return {
      status: "error",
      message: `The contact form isn't set up yet. Please email me directly at ${siteConfig.email}.`,
      values,
    };
  }

  const to = process.env.CONTACT_TO_EMAIL || siteConfig.email;
  const from = process.env.CONTACT_FROM_EMAIL || "Portfolio Contact <onboarding@resend.dev>";
  const safeName = values.name.replace(/[\u0000-\u001f\u007f]+/g, " ");

  const text = [`Name: ${safeName}`, `Email: ${values.email}`, "", values.message].join("\n");
  const html = `
    <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;line-height:1.6;color:#18181b;max-width:560px">
      <p style="margin:0 0 4px;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#71717a">New message from your portfolio</p>
      <h2 style="margin:0 0 20px;font-size:20px">${escapeHtml(safeName)}</h2>
      <p style="margin:0 0 20px"><a href="mailto:${escapeHtml(encodeURIComponent(values.email).replace(/%40/g, "@"))}" style="color:#4d7c0f">${escapeHtml(values.email)}</a></p>
      <div style="white-space:pre-wrap;border-left:3px solid #c8f45a;padding:4px 0 4px 14px">${escapeHtml(values.message)}</div>
      <p style="margin:24px 0 0;font-size:12px;color:#71717a">Hit reply to answer ${escapeHtml(safeName)} directly.</p>
    </div>`;

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: values.email,
        subject: `Portfolio message from ${safeName}`,
        text,
        html,
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      console.error(`[contact] Resend rejected the email (${response.status}):`, await response.text());
      return {
        status: "error",
        message: `Something went wrong while sending. Please try again, or email me at ${siteConfig.email}.`,
        values,
      };
    }
  } catch (error) {
    console.error("[contact] Failed to reach Resend:", error);
    return {
      status: "error",
      message: `I couldn't send your message right now. Please try again, or email me at ${siteConfig.email}.`,
      values,
    };
  }

  return { status: "success", message: SUCCESS_MESSAGE };
}
