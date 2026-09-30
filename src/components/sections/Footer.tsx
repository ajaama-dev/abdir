import Link from "next/link";
import { siteConfig } from "@/config/site";

export function Footer() {
  return (
    <footer className="on-dark bg-navy pb-28 pt-20 text-white/75 md:pb-12">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <p className="font-heading text-3xl text-white">{siteConfig.name}</p>
            <div className="my-5 h-px w-12 bg-brass" />
            <p className="max-w-sm text-sm">{siteConfig.hours}</p>
            <p className="mt-2 text-sm">Serving {siteConfig.area}</p>
          </div>
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-brass-light font-sans">Contact</h2>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a href={`tel:${siteConfig.phoneTel}`} className="hover:text-white">
                  {siteConfig.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${siteConfig.email}`} className="break-all hover:text-white">
                  {siteConfig.email}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-brass-light font-sans">Accreditations</h2>
            <ul className="mt-4 space-y-2 text-sm">
              {siteConfig.accreditations.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-16 flex flex-col gap-3 border-t border-white/15 pt-8 text-xs md:flex-row md:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <Link href="/privacy" className="underline underline-offset-4 hover:text-white">
            Privacy policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
