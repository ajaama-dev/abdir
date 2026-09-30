import { Phone, Star } from "lucide-react";
import { siteConfig } from "@/config/site";
import { btnOutlineLight, btnPrimary } from "@/components/ui/styles";
import { SafeImage } from "@/components/ui/SafeImage";

export function Hero() {
  return (
    <section id="top" className="on-dark relative isolate flex min-h-screen items-center overflow-hidden bg-navy">
      <SafeImage
        src={siteConfig.seo.heroImage}
        alt={siteConfig.seo.heroImageAlt}
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover"
      />
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-r from-navy/90 via-navy/70 to-navy/30"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-t from-navy/80 via-transparent to-navy/40"
        aria-hidden="true"
      />

      <div className="mx-auto w-full max-w-[1200px] px-6 pb-20 pt-32 md:pt-40">
        <div className="max-w-4xl">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brass-light">
            {siteConfig.area}&rsquo;s premium plumbing and heating specialists
          </p>
          <div className="my-6 h-px w-16 bg-brass" />
          <h1 className="text-5xl text-white sm:text-6xl md:text-7xl lg:text-[5.5rem]">
            Plumbing and heating, done properly the first time.
          </h1>
          <p className="mt-8 max-w-xl text-lg text-white/85 md:text-xl">
            Accredited engineers, fixed quotes and spotless workmanship, backed by a {siteConfig.guaranteeYears}-year
            guarantee.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a href="#quote" className={btnPrimary}>
              Request Your Free Quote
            </a>
            <a href={`tel:${siteConfig.phoneTel}`} className={btnOutlineLight}>
              <Phone className="h-4 w-4" aria-hidden="true" />
              Emergency? Call <span className="whitespace-nowrap">{siteConfig.phone}</span>
            </a>
          </div>

          <div className="mt-12 flex flex-col gap-4 border-t border-white/20 pt-8 text-sm text-white/90 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-8">
            <div className="flex items-center gap-3">
              <span className="flex" role="img" aria-label={`${siteConfig.rating} out of 5 stars`}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-brass-light text-brass-light" aria-hidden="true" />
                ))}
              </span>
              <span>
                <strong className="font-semibold text-white">{siteConfig.rating}</strong> from{" "}
                {siteConfig.reviewCount} Google reviews
              </span>
            </div>
            {siteConfig.accreditations.slice(0, 2).map((a) => (
              <span key={a} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-brass" aria-hidden="true" />
                {a}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
