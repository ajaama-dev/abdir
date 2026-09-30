import { Phone } from "lucide-react";
import { siteConfig } from "@/config/site";
import { btnOutlineLight, btnPrimary } from "@/components/ui/styles";
import { Reveal } from "@/components/ui/Reveal";

export function FinalCta() {
  return (
    <section className="on-dark bg-navy-light py-24 md:py-28" aria-labelledby="final-cta-heading">
      <Reveal className="mx-auto max-w-3xl px-6 text-center">
        <div className="mx-auto mb-6 h-px w-14 bg-brass" />
        <h2 id="final-cta-heading" className="text-4xl text-white md:text-6xl">
          Ready for work done properly?
        </h2>
        <p className="mt-6 text-lg text-white/75">
          Tell us about your project and we will respond {siteConfig.responseTime}.
        </p>
        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <a href="#quote" className={btnPrimary}>
            Request Your Free Quote
          </a>
          <a href={`tel:${siteConfig.phoneTel}`} className={btnOutlineLight}>
            <Phone className="h-4 w-4" aria-hidden="true" />
            Call {siteConfig.phone}
          </a>
        </div>
      </Reveal>
    </section>
  );
}
