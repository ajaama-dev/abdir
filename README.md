# Ashworth & Vale: premium plumbing and heating landing page

A conversion-focused, single-page site built with Next.js (App Router), TypeScript and Tailwind CSS. The demo brand is fictional. Every business detail lives in one file, so re-skinning for a real client takes minutes.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run lint
npm run build && npm start
```

The quote form works with zero setup: with no environment variables, enquiries are logged to the server console and the visitor still reaches `/thank-you`.

## Adapt it for a new client

Edit **`src/config/site.ts`**. It holds the name, phone, email, area, towns, rating, accreditations, guarantee, hours, services, reviews, FAQs, gallery, process steps, address and SEO copy. Components read from it, so nothing else needs changing for copy.

- Only publish real, verified reviews, ratings and accreditations. The demo values are placeholders.
- Update `address` and `url` (also settable via `NEXT_PUBLIC_SITE_URL`) for the LocalBusiness JSON-LD.
- Photos are Unsplash URLs in the same file. Swap in the client's own project photography where possible. Add any new hostname to `images.remotePatterns` in `next.config.ts`, or place files in `public/` and use local paths.
- Brand colours are the tokens at the top of `src/app/globals.css`.
- Form option labels (budget bands, timeframes) are in `src/lib/quote-schema.ts`.

## Environment variables

Copy `.env.example` to `.env.local`.

| Variable | Purpose |
| --- | --- |
| `RESEND_API_KEY` + `QUOTE_TO_EMAIL` | When both are set, each enquiry is emailed via the Resend REST API. Otherwise it is logged to the console. |
| `WEBHOOK_URL` | Optional. The enquiry JSON is also POSTed here (Zapier, Make, n8n, CRM). Errors are logged and ignored. |
| `QUOTE_FROM_EMAIL` | Optional sender, must use a domain verified in Resend. |
| `NEXT_PUBLIC_SITE_URL` | Optional canonical site URL. |

## Deploy to Vercel

1. Push the repository to GitHub and import it at vercel.com/new. The Next.js preset needs no configuration.
2. Add the environment variables above under Project Settings, then Environment Variables.
3. Deploy, then attach the client's domain and set `NEXT_PUBLIC_SITE_URL` to it.

## Structure

- `src/config/site.ts`: single source of truth for content
- `src/components/sections/`: one component per page section
- `src/lib/quote-schema.ts`: zod schema shared by client and server
- `src/app/api/quote/route.ts`: validation, honeypot, email, webhook
- `src/app/thank-you`, `src/app/privacy`: supporting pages
