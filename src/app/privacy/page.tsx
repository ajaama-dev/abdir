import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `Privacy policy | ${siteConfig.shortName}`,
  description: `How ${siteConfig.name} collects and uses your personal information.`,
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-24">
      <Link href="/" className="text-sm font-semibold uppercase tracking-[0.14em] text-brass-dark hover:text-navy">
        &larr; {siteConfig.shortName}
      </Link>
      <h1 className="mt-8 text-5xl text-navy md:text-6xl">Privacy policy</h1>
      <div className="my-6 h-px w-14 bg-brass" />
      <p className="text-sm text-charcoal/70">Last updated {siteConfig.privacyUpdated}</p>

      <div className="mt-10 space-y-6 [&_h2]:mt-12 [&_h2]:text-3xl [&_h2]:text-navy [&_ul]:list-disc [&_ul]:pl-6">
        <p>
          {siteConfig.name} (&ldquo;we&rdquo;, &ldquo;us&rdquo;) respects your privacy. This policy explains what
          personal information we collect through this website and how we use it.
        </p>
        <h2>What we collect</h2>
        <p>When you request a quote we collect the details you submit:</p>
        <ul>
          <li>Your name, phone number, email address and postcode</li>
          <li>The type of work, property, timeframe and budget you select</li>
          <li>Any message you choose to include</li>
        </ul>
        <h2>How we use it</h2>
        <p>
          We use your details only to respond to your enquiry, arrange a survey and prepare a quote. We do not sell
          your information and we never share it with third parties for marketing.
        </p>
        <h2>Who processes it</h2>
        <p>
          Enquiries may be delivered to us by email through a trusted service provider acting on our instructions. We
          may retain enquiry records for up to 24 months so we can follow up on quotes and honour our guarantee.
        </p>
        <h2>Your rights</h2>
        <p>
          Under UK data protection law you may ask to see, correct or delete the personal information we hold about
          you, or object to how we use it. You also have the right to complain to the Information Commissioner&rsquo;s
          Office (ico.org.uk).
        </p>
        <h2>Contact us</h2>
        <p>
          Email{" "}
          <a className="text-brass-dark underline underline-offset-4" href={`mailto:${siteConfig.email}`}>
            {siteConfig.email}
          </a>{" "}
          or call{" "}
          <a className="text-brass-dark underline underline-offset-4" href={`tel:${siteConfig.phoneTel}`}>
            {siteConfig.phone}
          </a>
          .
        </p>
        <p className="text-sm text-charcoal/60">
          Demo content: have this policy reviewed and completed by the business before launch.
        </p>
      </div>
    </main>
  );
}
