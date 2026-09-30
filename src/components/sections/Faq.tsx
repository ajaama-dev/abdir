"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { siteConfig } from "@/config/site";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="scroll-mt-16 bg-white py-24 md:py-32" aria-labelledby="faq-heading">
      <div className="mx-auto grid max-w-[1200px] gap-14 px-6 lg:grid-cols-[1fr_1.4fr]">
        <SectionHeading
          headingId="faq-heading"
          eyebrow="FAQ"
          title="Questions, answered plainly"
          intro={`Anything else? Call ${siteConfig.phone} and speak with a member of the team.`}
        />
        <div className="border-t border-brass/50">
          {siteConfig.faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.question} className="border-b border-brass/50">
                <h3>
                  <button
                    type="button"
                    id={`faq-btn-${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left"
                  >
                    <span className="font-heading text-2xl text-navy md:text-[1.7rem]">{f.question}</span>
                    <Plus
                      className={`h-5 w-5 shrink-0 text-brass-dark transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
                      aria-hidden="true"
                    />
                  </button>
                </h3>
                <div
                  id={`faq-panel-${i}`}
                  role="region"
                  aria-labelledby={`faq-btn-${i}`}
                  className={`grid transition-[grid-template-rows] duration-300 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                >
                  <div className="overflow-hidden" inert={!isOpen}>
                    <p className="pb-6 text-charcoal/80">{f.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
