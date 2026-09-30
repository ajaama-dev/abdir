"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { siteConfig } from "@/config/site";
import { SafeImage } from "@/components/ui/SafeImage";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Gallery() {
  const [active, setActive] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const item = active === null ? null : siteConfig.gallery[active];

  // Native <dialog>.showModal() traps focus, makes the page inert and closes on Escape.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (item && !dialog.open) {
      dialog.showModal();
      closeRef.current?.focus();
    }
  }, [item]);

  const close = () => {
    dialogRef.current?.close();
  };

  return (
    <section id="work" className="scroll-mt-16 bg-white py-24 md:py-32" aria-labelledby="work-heading">
      <div className="mx-auto max-w-[1200px] px-6">
        <SectionHeading
          headingId="work-heading"
          eyebrow="Our work"
          title="Recent projects across South West London"
        />
        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {siteConfig.gallery.map((g, i) => (
            <Reveal as="li" key={g.title} delay={(i % 3) * 100}>
              <button
                type="button"
                onClick={(e) => {
                  triggerRef.current = e.currentTarget;
                  setActive(i);
                }}
                aria-haspopup="dialog"
                className="group block w-full text-left"
              >
                <span className="relative block aspect-[4/5] overflow-hidden rounded-sm bg-navy">
                  <SafeImage
                    src={g.image}
                    alt={g.imageAlt}
                    fill
                    sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/10 to-transparent" aria-hidden="true" />
                  <span className="absolute inset-x-0 bottom-0 block p-6 text-white">
                    <span className="block text-xs font-semibold uppercase tracking-[0.22em] text-brass-light">
                      {g.type} &middot; {g.town}
                    </span>
                    <span className="mt-2 block font-heading text-2xl leading-tight">{g.title}</span>
                    <span className="mt-2 block text-sm text-white/80">{g.summary}</span>
                  </span>
                </span>
              </button>
            </Reveal>
          ))}
        </ul>
      </div>

      <dialog
        ref={dialogRef}
        aria-labelledby="lightbox-title"
        onClose={() => {
          setActive(null);
          triggerRef.current?.focus();
        }}
        onClick={(e) => e.target === dialogRef.current && close()}
        className="m-auto w-[min(1100px,94vw)] max-w-none overflow-hidden rounded-sm bg-navy p-0 text-white backdrop:bg-black/80"
      >
        {item && (
          <div className="on-dark">
            <div className="relative aspect-[4/3] w-full bg-navy-light md:aspect-[16/10]">
              <SafeImage src={item.image} alt={item.imageAlt} fill sizes="94vw" className="object-cover" />
            </div>
            <div className="flex items-start justify-between gap-6 p-6 md:p-8">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brass-light">
                  {item.type} &middot; {item.town}
                </p>
                <h3 id="lightbox-title" className="mt-2 text-3xl">
                  {item.title}
                </h3>
                <p className="mt-2 text-white/80">{item.summary}</p>
              </div>
              <button
                ref={closeRef}
                type="button"
                onClick={close}
                aria-label="Close image"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-sm border border-white/30 text-white hover:bg-white hover:text-navy"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        )}
      </dialog>
    </section>
  );
}
