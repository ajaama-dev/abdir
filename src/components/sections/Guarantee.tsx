import { HeartHandshake, ReceiptText, ShieldCheck, type LucideIcon } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Reveal } from "@/components/ui/Reveal";
import { btnPrimary } from "@/components/ui/styles";

export function Guarantee() {
  const items: { Icon: LucideIcon; title: string; text: string }[] = [
    {
      Icon: ShieldCheck,
      title: `${siteConfig.guaranteeYears}-year workmanship guarantee`,
      text: "Every installation is covered in writing. If our workmanship fails, we return and correct it at no cost to you.",
    },
    {
      Icon: ReceiptText,
      title: "Fixed, itemised pricing",
      text: "The price you approve is the price you pay. No hourly creep and no unexplained extras.",
    },
    {
      Icon: HeartHandshake,
      title: "Respect for your home",
      text: "Floors protected, dust contained and every surface cleaned before we leave.",
    },
  ];
  return (
    <section className="on-dark bg-navy py-24 md:py-32" aria-labelledby="promise-heading">
      <div className="mx-auto max-w-[1200px] px-6">
        <Reveal className="border border-brass/60 p-3">
          <div className="border border-brass/30 px-6 py-16 md:px-16 md:py-20">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brass-light">Our guarantee</p>
              <div className="mx-auto my-5 h-px w-14 bg-brass" />
              <h2 id="promise-heading" className="text-4xl text-white md:text-6xl">
                Our promise to you
              </h2>
            </div>
            <ul className="mt-14 grid gap-10 md:grid-cols-3">
              {items.map(({ Icon, title, text }) => (
                <li key={title} className="text-center">
                  <Icon className="mx-auto h-9 w-9 text-brass" strokeWidth={1.25} aria-hidden="true" />
                  <h3 className="mt-5 text-2xl text-white">{title}</h3>
                  <p className="mt-3 text-base text-white/75">{text}</p>
                </li>
              ))}
            </ul>
            <div className="mt-14 text-center">
              <a href="#quote" className={btnPrimary}>
                Request Your Free Quote
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
