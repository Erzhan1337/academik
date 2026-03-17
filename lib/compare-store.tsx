"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import type { Program } from "./data";

type CompareStore = {
  items: Program[];
  add: (p: Program) => void;
  remove: (id: string) => void;
  clear: () => void;
};

const CompareCtx = createContext<CompareStore>({
  items: [],
  add: () => {},
  remove: () => {},
  clear: () => {},
});

export function CompareProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Program[]>([]);
  const add = (p: Program) =>
    setItems((prev) => (prev.length < 3 && !prev.find((x) => x.id === p.id) ? [...prev, p] : prev));
  const remove = (id: string) => setItems((prev) => prev.filter((p) => p.id !== id));
  const clear = () => setItems([]);
  return <CompareCtx.Provider value={{ items, add, remove, clear }}>{children}</CompareCtx.Provider>;
}

export const useCompareStore = () => useContext(CompareCtx);
