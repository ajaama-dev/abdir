import { siteConfig } from "@/config/site";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceCard } from "./ServiceCard";

export function Services() {
  return (
    <section id="services" className="scroll-mt-16 bg-ivory py-24 md:py-32" aria-labelledby="services-heading">
      <div className="mx-auto max-w-[1200px] px-6">
        <SectionHeading
          headingId="services-heading"
          eyebrow="Our services"
          title="Specialist work, delivered to a showroom standard"
        />
        <ul className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-6">
          {siteConfig.services.map((s, i) => (
            <Reveal
              as="li"
              key={s.id}
              delay={(i % 3) * 100}
              className={i >= 3 ? "lg:col-span-3" : "lg:col-span-2"}
            >
              <ServiceCard service={s} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
