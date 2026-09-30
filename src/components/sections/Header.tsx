"use client";

import { useEffect, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { siteConfig } from "@/config/site";
import { btnPrimary } from "@/components/ui/styles";

const links = [
  { href: "#services", label: "Services" },
  { href: "#work", label: "Our Work" },
  { href: "#reviews", label: "Reviews" },
  { href: "#faq", label: "FAQ" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const solid = scrolled || open;

  return (
    <header
      className={`on-dark fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        solid ? "bg-navy shadow-lg shadow-black/20" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-6 md:h-20">
        <a href="#top" className="font-heading text-xl font-semibold tracking-tight text-white md:text-2xl">
          {siteConfig.shortName}
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-9 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium tracking-wide text-white/85 transition-colors hover:text-brass-light"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-6 lg:flex">
          <a
            href={`tel:${siteConfig.phoneTel}`}
            className="flex items-center gap-2 text-sm font-semibold text-white transition-colors hover:text-brass-light"
          >
            <Phone className="h-4 w-4 text-brass" aria-hidden="true" />
            {siteConfig.phone}
          </a>
          <a href="#quote" className={`${btnPrimary} !px-5 !py-3`}>
            Request a Quote
          </a>
        </div>

        <div className="flex items-center gap-1 lg:hidden">
          <a
            href={`tel:${siteConfig.phoneTel}`}
            aria-label={`Call ${siteConfig.phone}`}
            className="flex h-11 w-11 items-center justify-center rounded-sm text-brass-light"
          >
            <Phone className="h-5 w-5" aria-hidden="true" />
          </a>
          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
            className="flex h-11 w-11 items-center justify-center rounded-sm text-white"
          >
            {open ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-menu" aria-label="Mobile" className="border-t border-white/10 bg-navy px-6 pb-8 pt-4 lg:hidden">
          <ul>
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block border-b border-white/10 py-4 font-heading text-2xl text-white"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a href="#quote" onClick={() => setOpen(false)} className={`${btnPrimary} mt-6 w-full`}>
            Request a Quote
          </a>
        </nav>
      )}
    </header>
  );
}
