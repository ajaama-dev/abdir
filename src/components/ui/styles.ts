const base =
  "inline-flex items-center justify-center gap-2 rounded-sm px-7 py-4 text-sm font-semibold uppercase tracking-[0.14em] transition-colors duration-300 focus-visible:outline-offset-4";

export const btnPrimary = `${base} bg-brass text-navy hover:bg-brass-light`;
/** Outline button for dark backgrounds */
export const btnOutlineLight = `${base} border border-white/70 text-white hover:bg-white hover:text-navy`;
/** Navy outline button for light backgrounds */
export const btnOutlineNavy = `${base} border border-navy text-navy hover:bg-navy hover:text-white`;
