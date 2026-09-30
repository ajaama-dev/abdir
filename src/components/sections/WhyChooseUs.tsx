import { siteConfig } from "@/config/site";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function WhyChooseUs() {
  return (
    <section className="bg-white py-24 md:py-32" aria-labelledby="why-heading">
      <div className="mx-auto max-w-[1200px] px-6">
        <SectionHeading headingId="why-heading" eyebrow="Why homeowners choose us" title="The standard you would expect, every time" />
        <ul className="mt-14 grid gap-x-16 gap-y-12 md:grid-cols-2">
          {siteConfig.why.map((w, i) => (
            <Reveal as="li" key={w.title} delay={(i % 2) * 120} className="flex gap-6 border-t border-brass/50 pt-8">
              <span className="font-heading text-5xl leading-none text-brass-dark" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-2xl text-navy md:text-3xl">{w.title}</h3>
                <p className="mt-3 text-charcoal/80">{w.text}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
