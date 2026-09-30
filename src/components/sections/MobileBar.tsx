import { FileText, Phone } from "lucide-react";
import { siteConfig } from "@/config/site";

export function MobileBar() {
  return (
    <div className="on-dark fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-px border-t border-brass/40 bg-brass/40 pb-[env(safe-area-inset-bottom)] md:hidden">
      <a
        href={`tel:${siteConfig.phoneTel}`}
        className="flex items-center justify-center gap-2 bg-navy py-4 text-sm font-semibold uppercase tracking-[0.14em] text-white"
      >
        <Phone className="h-4 w-4 text-brass" aria-hidden="true" />
        Call
      </a>
      <a
        href="#quote"
        className="flex items-center justify-center gap-2 bg-brass py-4 text-sm font-semibold uppercase tracking-[0.14em] text-navy"
      >
        <FileText className="h-4 w-4" aria-hidden="true" />
        Get a Quote
      </a>
    </div>
  );
}
