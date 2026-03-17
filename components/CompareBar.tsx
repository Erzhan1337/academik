"use client";

import { motion, AnimatePresence } from "motion/react";
import { useRouter } from "next/navigation";
import { BarChart2, X } from "lucide-react";
import { useCompareStore } from "@/lib/compare-store";

export function CompareBar() {
  const { items, remove } = useCompareStore();
  const router = useRouter();

  return (
    <AnimatePresence>
      {items.length > 0 && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100vw-2rem)] max-w-2xl"
        >
          <div className="bg-ink-900 text-white rounded-2xl shadow-2xl px-4 py-3 flex items-center gap-3">
            <div className="flex items-center gap-2 flex-1 overflow-hidden">
              <BarChart2 className="w-4 h-4 text-brand-400 shrink-0" />
              <span className="text-sm font-medium text-ink-300 shrink-0">
                Сравнение ({items.length}/3):
              </span>
              <div className="flex gap-2 overflow-hidden">
                {items.map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center gap-1.5 bg-ink-800 rounded-lg px-2 py-1 text-xs font-medium max-w-[150px]"
                  >
                    <span className="truncate">{p.title}</span>
                    <button
                      onClick={() => remove(p.id)}
                      className="text-ink-400 hover:text-white transition-colors shrink-0"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push("/compare")}
              className="shrink-0 bg-brand-600 hover:bg-brand-500 text-white text-sm font-semibold px-4 py-1.5 rounded-lg transition-colors"
            >
              Сравнить →
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
