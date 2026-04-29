"use client";

import React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { BarChart2, X, Plus, Award, MapPin, Clock } from "lucide-react";
import { useCompareStore } from "@/lib/compare-store";

const ROWS = [
  { label: "Университет", key: "university" },
  { label: "Город", key: "city" },
  { label: "Длительность", key: "duration" },
  { label: "Язык", key: "language" },
  { label: "Стоимость", key: "costLabel" },
  { label: "Срок подачи", key: "deadlineLabel" },
  { label: "Рейтинг", key: "rating" },
  { label: "Болашак", key: "bolashak" },
  { label: "Количество студентов", key: "students" },
];

export default function ComparePage() {
  const { items, remove, clear } = useCompareStore();

  const getValue = (item: any, key: string): string => {
    const val = item[key];
    if (key === "language") return Array.isArray(val) ? val.join(", ") : val;
    if (key === "bolashak") return val ? "✓ Да" : "✗ Нет";
    if (key === "students") return val.toLocaleString("ru");
    if (key === "rating") return `★ ${val}`;
    return String(val);
  };

  // Find differing rows
  const isDifferent = (key: string) => {
    if (items.length < 2) return false;
    const vals = items.map((p) => getValue(p, key));
    return new Set(vals).size > 1;
  };

  const [showOnlyDiff, setShowOnlyDiff] = React.useState(false);

  const visibleRows = showOnlyDiff
    ? ROWS.filter((r) => isDifferent(r.key))
    : ROWS;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 gap-4 flex-wrap">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-ink-900 dark:text-white"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Сравнение программ
          </motion.h1>
          <p className="text-ink-500 dark:text-ink-400 mt-1 text-sm">Сравнивайте до 3 программ одновременно</p>
        </div>
        {items.length > 0 && (
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showOnlyDiff}
                onChange={(e) => setShowOnlyDiff(e.target.checked)}
                className="w-4 h-4 rounded accent-brand-600"
              />
              <span className="text-sm text-ink-600 dark:text-ink-300">Только различия</span>
            </label>
            <button
              onClick={clear}
              className="text-sm text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium flex items-center gap-1"
            >
              <X className="w-3.5 h-3.5" /> Очистить
            </button>
          </div>
        )}
      </div>

      {items.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-24 bg-white dark:bg-ink-900 rounded-2xl border border-ink-200 dark:border-ink-800"
        >
          <BarChart2 className="w-14 h-14 mx-auto text-ink-300 dark:text-ink-600 mb-4" />
          <h2 className="text-xl font-semibold text-ink-900 dark:text-white mb-2">Нет программ для сравнения</h2>
          <p className="text-ink-400 dark:text-ink-500 text-sm mb-6 max-w-xs mx-auto">
            Добавьте программы из каталога через кнопку «Сравнить» на карточке
          </p>
          <Link href="/programs">
            <div className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold px-6 py-3 rounded-xl transition-colors cursor-pointer">
              <Plus className="w-4 h-4" />
              Выбрать программы
            </div>
          </Link>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-ink-900 rounded-2xl border border-ink-200 dark:border-ink-800 shadow-sm relative z-0 flex flex-col"
        >
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="sticky left-0 top-0 z-20 bg-ink-50 dark:bg-ink-900/95 backdrop-blur-md px-5 py-4 text-left text-xs font-bold text-ink-500 dark:text-ink-400 uppercase tracking-wider w-40 border-b border-r border-ink-200 dark:border-ink-800">
                    Критерии
                  </th>
                  {items.map((program, i) => (
                    <th key={program.id} className="sticky top-0 z-10 bg-white dark:bg-ink-900 px-5 py-4 min-w-[240px] border-b border-r border-ink-100 dark:border-ink-800 align-top last:border-r-0 shadow-[0_1px_0_0_rgba(0,0,0,0.05)] dark:shadow-[0_1px_0_0_rgba(255,255,255,0.05)]">
                      <div className="text-left relative">
                        <button
                          onClick={() => remove(program.id)}
                          className="absolute -top-1 -right-1 text-ink-300 dark:text-ink-600 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-full p-1 transition-colors"
                          title="Убрать из сравнения"
                        >
                          <X className="w-4 h-4" />
                        </button>
                        {program.bolashak && (
                          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 text-[10px] font-bold uppercase tracking-wider mb-2 border border-amber-200/50 dark:border-amber-500/20">
                            <Award className="w-3 h-3" /> Болашак
                          </div>
                        )}
                        <Link href={`/programs/${program.id}`} className="block pr-6">
                          <span className="font-bold text-ink-900 dark:text-white text-base hover:text-brand-600 dark:hover:text-brand-400 transition-colors leading-tight">
                            {program.title}
                          </span>
                        </Link>
                      </div>
                    </th>
                  ))}
                  {items.length < 3 && (
                    <th className="sticky top-0 z-10 bg-ink-50/50 dark:bg-ink-900/50 px-5 py-4 min-w-[200px] border-b border-ink-100 dark:border-ink-800 align-top">
                      <Link href="/programs">
                        <div className="flex flex-col items-center justify-center border-2 border-dashed border-ink-300 dark:border-ink-700 rounded-xl py-6 text-ink-400 dark:text-ink-500 hover:border-brand-400 hover:text-brand-500 dark:hover:text-brand-400 hover:bg-brand-50 dark:hover:bg-brand-900/10 transition-colors cursor-pointer group">
                          <div className="w-10 h-10 rounded-full bg-ink-100 dark:bg-ink-800 flex items-center justify-center mb-2 group-hover:bg-brand-100 dark:group-hover:bg-brand-500/20 transition-colors">
                            <Plus className="w-5 h-5" />
                          </div>
                          <span className="text-sm font-semibold">Добавить программу</span>
                        </div>
                      </Link>
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {visibleRows.map((row, ri) => {
                    const diff = isDifferent(row.key);
                    return (
                      <motion.tr
                        key={row.key}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ delay: ri * 0.03 }}
                        className={`border-b border-ink-100 dark:border-ink-800/80 group transition-colors ${diff ? "bg-brand-50/30 dark:bg-brand-900/10" : "hover:bg-ink-50/50 dark:hover:bg-ink-800/20"}`}
                      >
                        <td className={`sticky left-0 z-10 px-5 py-4 text-sm font-semibold border-r border-ink-200 dark:border-ink-800 transition-colors ${diff ? "bg-brand-50/50 dark:bg-brand-900/20 text-brand-900 dark:text-brand-200 backdrop-blur-md" : "bg-white/95 dark:bg-ink-900/95 backdrop-blur-md text-ink-600 dark:text-ink-300 group-hover:bg-ink-50 dark:group-hover:bg-ink-800/50"}`}>
                          <div className="flex items-center justify-between gap-2">
                            <span>{row.label}</span>
                            {diff && (
                              <span className="inline-block w-1.5 h-1.5 shrink-0 rounded-full bg-brand-500 ring-2 ring-white dark:ring-ink-900" title="Есть отличия" />
                            )}
                          </div>
                        </td>
                        {items.map((program) => {
                          const val = getValue(program, row.key);
                          const isBolashak = row.key === "bolashak";
                          return (
                            <td key={program.id} className="px-5 py-4 text-sm border-r border-ink-100 dark:border-ink-800 last:border-r-0">
                              <span className={
                                isBolashak
                                  ? val.startsWith("✓") ? "inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-500/10 px-2 py-1 rounded-md" : "text-ink-400 dark:text-ink-500"
                                  : diff ? "text-ink-950 dark:text-white font-medium" : "text-ink-700 dark:text-ink-300"
                              }>
                                {val}
                              </span>
                            </td>
                          );
                        })}
                        {items.length < 3 && <td className="bg-ink-50/30 dark:bg-ink-900/30 border-t border-ink-100 dark:border-ink-800" />}
                      </motion.tr>
                    );
                  })}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

          {/* Footer hint */}
          <div className="bg-ink-50 dark:bg-ink-900/50 border-t border-ink-200 dark:border-ink-800 px-5 py-3 flex items-center justify-between text-xs text-ink-500 dark:text-ink-400 mt-auto">
            <div className="flex items-center gap-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-brand-500" />
              Синий индикатор отмечает параметры с отличиями
            </div>
            <div className="hidden sm:block">Используйте горизонтальную прокрутку для просмотра всех программ</div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
