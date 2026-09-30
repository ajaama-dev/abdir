"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import type { NeedValue } from "@/config/site";

interface QuoteContextValue {
  preselect: { need: NeedValue; nonce: number } | null;
  selectNeed: (need: NeedValue) => void;
}

const QuoteContext = createContext<QuoteContextValue>({ preselect: null, selectNeed: () => {} });

export function QuoteProvider({ children }: { children: ReactNode }) {
  const [preselect, setPreselect] = useState<QuoteContextValue["preselect"]>(null);
  const selectNeed = useCallback(
    (need: NeedValue) => setPreselect((p) => ({ need, nonce: (p?.nonce ?? 0) + 1 })),
    [],
  );
  const value = useMemo(() => ({ preselect, selectNeed }), [preselect, selectNeed]);
  return <QuoteContext.Provider value={value}>{children}</QuoteContext.Provider>;
}

export const useQuote = () => useContext(QuoteContext);
