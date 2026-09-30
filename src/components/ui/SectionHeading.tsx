import { Reveal } from "./Reveal";

export function SectionHeading({
  eyebrow,
  title,
  intro,
  dark = false,
  center = false,
  headingId,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  dark?: boolean;
  center?: boolean;
  headingId?: string;
}) {
  return (
    <Reveal className={`max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      <p
        className={`text-xs font-semibold uppercase tracking-[0.28em] ${dark ? "text-brass-light" : "text-brass-dark"}`}
      >
        {eyebrow}
      </p>
      <div className={`my-5 h-px w-14 bg-brass ${center ? "mx-auto" : ""}`} />
      <h2 id={headingId} className={`text-4xl md:text-6xl ${dark ? "text-white" : "text-navy"}`}>{title}</h2>
      {intro && (
        <p className={`mt-6 text-lg ${dark ? "text-white/75" : "text-charcoal/75"}`}>{intro}</p>
      )}
    </Reveal>
  );
}
