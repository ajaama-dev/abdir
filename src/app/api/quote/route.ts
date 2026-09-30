import { NextResponse } from "next/server";
import { siteConfig } from "@/config/site";
import {
  budgetOptions,
  labelFor,
  needOptions,
  propertyOptions,
  quoteSchema,
  timeframeOptions,
  type QuoteData,
} from "@/lib/quote-schema";

export const runtime = "nodejs";

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function summarise(q: QuoteData) {
  return [
    ["Service", labelFor(needOptions, q.need)],
    ["Property", labelFor(propertyOptions, q.property)],
    ["Timeframe", labelFor(timeframeOptions, q.timeframe)],
    ["Budget", labelFor(budgetOptions, q.budget)],
    ["Name", q.name],
    ["Phone", q.phone],
    ["Email", q.email],
    ["Postcode", q.postcode],
    ["Message", q.message || "None"],
  ] as const;
}

async function sendEmail(q: QuoteData) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.QUOTE_TO_EMAIL;
  if (!key || !to) return false;

  const rows = summarise(q);
  const html = `<div style="font-family:Arial,sans-serif;color:#1e1e1e">
<h2 style="color:#0f1c2e">New quote request</h2>
<table cellpadding="8" style="border-collapse:collapse">${rows
    .map(
      ([k, v]) =>
        `<tr><td style="border-bottom:1px solid #eee;color:#7a5c2b"><strong>${k}</strong></td><td style="border-bottom:1px solid #eee">${escapeHtml(v)}</td></tr>`,
    )
    .join("")}</table></div>`;
  const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.QUOTE_FROM_EMAIL || `${siteConfig.shortName} <onboarding@resend.dev>`,
      to: to.split(",").map((s) => s.trim()),
      reply_to: q.email,
      subject: `New quote request: ${labelFor(needOptions, q.need)} in ${q.postcode}`,
      html,
      text,
    }),
  });
  if (!res.ok) throw new Error(`Resend responded ${res.status}: ${await res.text()}`);
  return true;
}

async function sendWebhook(q: QuoteData) {
  const url = process.env.WEBHOOK_URL;
  if (!url) return;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...q, receivedAt: new Date().toISOString(), source: siteConfig.url }),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) console.error(`[quote] webhook responded ${res.status}`);
  } catch (err) {
    console.error("[quote] webhook failed", err);
  }
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  // Honeypot: pretend success so bots learn nothing, but do nothing.
  if (
    typeof body === "object" &&
    body !== null &&
    typeof (body as { company?: unknown }).company === "string" &&
    (body as { company: string }).company.length > 0
  ) {
    return NextResponse.json({ ok: true });
  }

  const parsed = quoteSchema.safeParse(body);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      fieldErrors[key] ??= issue.message;
    }
    return NextResponse.json({ ok: false, error: "Validation failed", fieldErrors }, { status: 422 });
  }

  const quote = parsed.data;
  let emailed = false;
  try {
    emailed = await sendEmail(quote);
  } catch (err) {
    console.error("[quote] email failed", err);
  }
  if (!emailed) {
    console.log("[quote] New enquiry (email not configured or failed):\n", JSON.stringify(quote, null, 2));
  }
  await sendWebhook(quote);

  return NextResponse.json({ ok: true });
}
