"use client";

import { ArrowRight } from "lucide-react";
import type { Service } from "@/config/site";
import { SafeImage } from "@/components/ui/SafeImage";
import { useQuote } from "@/components/ui/QuoteContext";

export function ServiceCard({ service }: { service: Service }) {
  const { selectNeed } = useQuote();
  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-sm border border-navy/10 bg-white transition-shadow duration-500 hover:shadow-[0_30px_60px_-30px_rgba(15,28,46,0.35)]">
      <div className="relative aspect-[4/3] overflow-hidden bg-navy">
        <SafeImage
          src={service.image}
          alt={service.imageAlt}
          fill
          sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-7">
        <h3 className="text-2xl text-navy md:text-3xl">{service.title}</h3>
        <div className="my-4 h-px w-10 bg-brass" />
        <p className="flex-1 text-base text-charcoal/80">{service.description}</p>
        <a
          href="#quote"
          onClick={() => selectNeed(service.need)}
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-brass-dark transition-colors hover:text-navy"
        >
          Enquire about this
          <span className="sr-only">: {service.title}</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
