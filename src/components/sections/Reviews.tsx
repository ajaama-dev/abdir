"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const Stars = ({ className = "h-5 w-5" }: { className?: string }) => (
  <span className="flex" aria-hidden="true">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star key={i} className={`${className} fill-brass text-brass`} />
    ))}
  </span>
);

export function Reviews() {
  const [expanded, setExpanded] = useState(false);
  return (
    <section id="reviews" className="scroll-mt-16 bg-ivory py-24 md:py-32" aria-labelledby="reviews-heading">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="grid items-end gap-10 md:grid-cols-[1fr_auto]">
          <SectionHeading headingId="reviews-heading" eyebrow="Reviews" title="What our customers say" />
          <Reveal className="flex items-center gap-5 border-l border-brass/60 pl-6">
            <span className="font-heading text-7xl leading-none text-navy md:text-8xl">{siteConfig.rating}</span>
            <div>
              <div role="img" aria-label={`${siteConfig.rating} out of 5 stars`}>
                <Stars />
              </div>
              <p className="mt-2 text-sm text-charcoal/80">{siteConfig.reviewCount} verified Google reviews</p>
            </div>
          </Reveal>
        </div>

        <ul className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {siteConfig.reviews.map((r, i) => (
            <Reveal
              as="li"
              key={r.name}
              delay={(i % 3) * 100}
              className={i >= 3 && !expanded ? "hidden md:block" : ""}
            >
              <figure className="flex h-full flex-col rounded-sm border border-navy/10 bg-white p-8">
                <div role="img" aria-label="5 out of 5 stars">
                  <Stars className="h-4 w-4" />
                </div>
                <blockquote className="mt-5 flex-1 text-base text-charcoal/85">&ldquo;{r.text}&rdquo;</blockquote>
                <figcaption className="mt-6 border-t border-brass/40 pt-4 text-sm">
                  <span className="font-semibold text-navy">
                    {r.name}, {r.town}
                  </span>
                  <span className="block text-charcoal/70">{r.service}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>

        <div className="mt-10 text-center md:hidden">
          <button
            type="button"
            onClick={() => setExpanded((e) => !e)}
            aria-expanded={expanded}
            className="rounded-sm border border-navy px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.14em] text-navy hover:bg-navy hover:text-white"
          >
            {expanded ? "Show fewer" : "Show more reviews"}
          </button>
        </div>
      </div>
    </section>
  );
}
