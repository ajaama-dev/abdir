import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `Thank you | ${siteConfig.shortName}`,
  robots: { index: false, follow: false },
};

export default async function ThankYouPage({ searchParams }: PageProps<"/thank-you">) {
  const { name } = await searchParams;
  const raw = Array.isArray(name) ? name[0] : name;
  const firstName = (raw ?? "").replace(/[^\p{L}\p{M}' -]/gu, "").trim().slice(0, 40);

  return (
    <main className="flex min-h-screen items-center justify-center bg-navy px-6 py-24 text-center">
      <div className="max-w-xl">
        <CheckCircle2 className="mx-auto h-10 w-10 text-brass" aria-hidden="true" />
        <div className="mx-auto my-8 h-px w-16 bg-brass" />
        <h1 className="text-4xl text-white md:text-6xl">
          Thank you{firstName ? `, ${firstName}` : ""}. Your enquiry is with us.
        </h1>
        <p className="mt-8 text-lg text-white/80">
          A member of our team will contact you {siteConfig.responseTime}. For anything urgent, call{" "}
          <a
            href={`tel:${siteConfig.phoneTel}`}
            className="whitespace-nowrap text-brass-light underline underline-offset-4 hover:text-white"
          >
            {siteConfig.phone}
          </a>
          .
        </p>
        <Link
          href="/"
          className="mt-10 inline-block rounded-sm bg-brass px-8 py-4 text-sm font-semibold uppercase tracking-widest text-navy transition-colors hover:bg-brass-light"
        >
          Back to home
        </Link>
      </div>
    </main>
  );
}
