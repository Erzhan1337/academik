"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Program } from "./data";

export type CompareStore = {
  items: Program[];
  favorites: Program[];
  add: (p: Program) => void;
  remove: (id: string) => void;
  clear: () => void;
  toggleFavorite: (p: Program) => void;
};

export const useCompareStore = create<CompareStore>()(
  persist(
    (set) => ({
      items: [],
      favorites: [],
      add: (p) =>
        set((state) => ({
          items:
            state.items.length < 3 && !state.items.find((x) => x.id === p.id)
              ? [...state.items, p]
              : state.items,
        })),
      remove: (id) =>
        set((state) => ({
          items: state.items.filter((p) => p.id !== id),
        })),
      clear: () => set({ items: [] }),
      toggleFavorite: (p) =>
        set((state) => {
          const isFav = state.favorites.find((x) => x.id === p.id);
          return {
            favorites: isFav
              ? state.favorites.filter((x) => x.id !== p.id)
              : [...state.favorites, p].sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime()),
          };
        }),
    }),
    {
      name: "academik-user-storage",
    }
  )
);

// We keep a dummy provider just so we don't have to remove it from layout.tsx
// if we want to avoid extra file edits, but it's better to just return children.
export function CompareProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
