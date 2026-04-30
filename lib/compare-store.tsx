"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Program } from "./data";

export type CompareStore = {
  items: Program[];
  favorites: Program[];
  reminders: Record<string, number[]>;
  add: (p: Program) => void;
  remove: (id: string) => void;
  clear: () => void;
  addFavorite: (p: Program) => void;
  toggleFavorite: (p: Program) => void;
  setReminder: (p: Program, daysBefore: number[]) => void;
  clearReminder: (id: string) => void;
};

const sortByDeadline = (programs: Program[]) =>
  [...programs].sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime());

export const useCompareStore = create<CompareStore>()(
  persist(
    (set) => ({
      items: [],
      favorites: [],
      reminders: {},
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
      addFavorite: (p) =>
        set((state) => ({
          favorites: state.favorites.find((x) => x.id === p.id)
            ? state.favorites
            : sortByDeadline([...state.favorites, p]),
        })),
      toggleFavorite: (p) =>
        set((state) => {
          const isFav = state.favorites.find((x) => x.id === p.id);
          const { [p.id]: _removedReminder, ...remainingReminders } = state.reminders;
          return {
            favorites: isFav
              ? state.favorites.filter((x) => x.id !== p.id)
              : sortByDeadline([...state.favorites, p]),
            reminders: isFav ? remainingReminders : state.reminders,
          };
        }),
      setReminder: (p, daysBefore) =>
        set((state) => ({
          favorites: state.favorites.find((x) => x.id === p.id)
            ? state.favorites
            : sortByDeadline([...state.favorites, p]),
          reminders: {
            ...state.reminders,
            [p.id]: [...daysBefore].sort((a, b) => b - a),
          },
        })),
      clearReminder: (id) =>
        set((state) => {
          const { [id]: _removedReminder, ...remainingReminders } = state.reminders;
          return { reminders: remainingReminders };
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
