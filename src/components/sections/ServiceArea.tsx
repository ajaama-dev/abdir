import { MapPin } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function ServiceArea() {
  return (
    <section className="bg-ivory py-24 md:py-32" aria-labelledby="area-heading">
      <div className="mx-auto grid max-w-[1200px] items-center gap-12 px-6 lg:grid-cols-2">
        <SectionHeading
          headingId="area-heading"
          eyebrow="Service area"
          title={`Proudly serving ${siteConfig.area}`}
          intro={`Our engineers are based locally, which means fast response times and a familiarity with the period and contemporary homes of the area. We work across ${siteConfig.towns.length} neighbourhoods and the streets between.`}
        />
        <Reveal delay={150}>
          <ul className="flex flex-wrap gap-3">
            {siteConfig.towns.map((t) => (
              <li
                key={t}
                className="inline-flex items-center gap-2 rounded-sm border border-brass/70 bg-white px-5 py-3 font-heading text-xl text-navy"
              >
                <MapPin className="h-4 w-4 text-brass-dark" aria-hidden="true" />
                {t}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
