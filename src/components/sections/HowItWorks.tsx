import { siteConfig } from "@/config/site";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function HowItWorks() {
  return (
    <section className="bg-ivory py-24 md:py-32" aria-labelledby="how-heading">
      <div className="mx-auto max-w-[1200px] px-6">
        <SectionHeading headingId="how-heading" eyebrow="How it works" title="A clear process from first call to final polish" />
        <ol className="mt-16 grid gap-10 md:grid-cols-4 md:gap-6">
          {siteConfig.steps.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 120} className="relative flex gap-6 md:block">
              {i < siteConfig.steps.length - 1 && (
                <>
                  <span className="absolute left-[27px] top-14 h-[calc(100%-2rem)] w-px bg-brass/50 md:hidden" aria-hidden="true" />
                  <span className="absolute left-16 right-[-1.5rem] top-[27px] hidden h-px bg-brass/50 md:block" aria-hidden="true" />
                </>
              )}
              <span className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-brass bg-ivory font-heading text-2xl text-brass-dark">
                {i + 1}
              </span>
              <div className="md:mt-6">
                <h3 className="text-2xl text-navy">{s.title}</h3>
                <p className="mt-2 text-base text-charcoal/80">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
