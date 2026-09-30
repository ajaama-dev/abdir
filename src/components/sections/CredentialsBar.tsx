import { Award, BadgeCheck, ClipboardList, Droplets, Flame, ShieldCheck, type LucideIcon } from "lucide-react";
import { siteConfig } from "@/config/site";

const iconFor = (label: string): LucideIcon => {
  if (/gas/i.test(label)) return Flame;
  if (/water/i.test(label)) return Droplets;
  if (/ciphe/i.test(label)) return Award;
  if (/insur/i.test(label)) return ShieldCheck;
  return BadgeCheck;
};

export function CredentialsBar() {
  const items = [
    ...siteConfig.accreditations.map((label) => ({ label, Icon: iconFor(label) })),
    { label: `${siteConfig.guaranteeYears}-Year Workmanship Guarantee`, Icon: BadgeCheck },
    { label: "Fixed, Itemised Pricing", Icon: ClipboardList },
  ];
  return (
    <section aria-label="Accreditations and assurances" className="bg-navy py-10">
      <ul className="mx-auto grid max-w-[1200px] grid-cols-2 gap-x-6 gap-y-7 px-6 lg:grid-cols-6">
        {items.map(({ label, Icon }) => (
          <li key={label} className="flex flex-col items-center gap-3 text-center lg:flex-row lg:text-left">
            <Icon className="h-6 w-6 shrink-0 text-brass" strokeWidth={1.5} aria-hidden="true" />
            <span className="text-xs font-medium uppercase leading-snug tracking-[0.12em] text-white/85">{label}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
