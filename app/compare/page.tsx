"use client";

import React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { BarChart2, X, Plus, Award, Star, MapPin, Clock, Globe } from "lucide-react";
import { useCompareStore } from "@/lib/compare-store";

const ROWS = [
  { label: "Университет", key: "university" },
  { label: "Город", key: "city", icon: MapPin },
  { label: "Длительность", key: "duration", icon: Clock },
  { label: "Язык", key: "language" },
  { label: "Стоимость", key: "costLabel" },
  { label: "Дедлайн", key: "deadlineLabel" },
  { label: "Рейтинг", key: "rating" },
  { label: "Болашак", key: "bolashak" },
  { label: "Студентов", key: "students" },
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
            className="text-3xl font-bold text-ink-900"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Сравнение программ
          </motion.h1>
          <p className="text-ink-500 mt-1 text-sm">До 3 программ одновременно</p>
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
              <span className="text-sm text-ink-600">Только различия</span>
            </label>
            <button
              onClick={clear}
              className="text-sm text-red-500 hover:text-red-700 font-medium flex items-center gap-1"
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
          className="text-center py-24 bg-white rounded-2xl border border-ink-200"
        >
          <BarChart2 className="w-14 h-14 mx-auto text-ink-300 mb-4" />
          <h2 className="text-xl font-semibold text-ink-900 mb-2">Нет программ для сравнения</h2>
          <p className="text-ink-400 text-sm mb-6 max-w-xs mx-auto">
            Добавьте программы из каталога, нажав кнопку «Сравнить» на карточке
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
          className="bg-white rounded-2xl border border-ink-200 overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-ink-100">
                  <th className="text-left px-5 py-4 text-xs font-semibold text-ink-400 uppercase tracking-wider w-36">
                    Параметр
                  </th>
                  {items.map((program, i) => (
                    <th key={program.id} className="px-5 py-4 min-w-[200px]">
                      <div className="text-left">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            {program.bolashak && (
                              <div className="flex items-center gap-1 text-amber-600 text-xs font-medium mb-1">
                                <Award className="w-3 h-3" /> Болашак
                              </div>
                            )}
                            <Link href={`/programs/${program.id}`}>
                              <span className="font-semibold text-ink-900 text-sm hover:text-brand-600 transition-colors block leading-snug">
                                {program.title}
                              </span>
                            </Link>
                          </div>
                          <button
                            onClick={() => remove(program.id)}
                            className="text-ink-300 hover:text-red-500 transition-colors shrink-0 mt-0.5"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </th>
                  ))}
                  {items.length < 3 && (
                    <th className="px-5 py-4 min-w-[160px]">
                      <Link href="/programs">
                        <div className="flex flex-col items-center justify-center border-2 border-dashed border-ink-200 rounded-xl py-5 text-ink-400 hover:border-brand-400 hover:text-brand-500 transition-colors cursor-pointer">
                          <Plus className="w-5 h-5 mb-1" />
                          <span className="text-xs font-medium">Добавить</span>
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
                        className={`border-b border-ink-50 ${diff ? "bg-brand-50/40" : ""}`}
                      >
                        <td className="px-5 py-3.5 text-xs font-semibold text-ink-500 uppercase tracking-wider">
                          {row.label}
                          {diff && (
                            <span className="ml-1.5 inline-block w-1.5 h-1.5 rounded-full bg-brand-500" />
                          )}
                        </td>
                        {items.map((program) => {
                          const val = getValue(program, row.key);
                          const isBolashak = row.key === "bolashak";
                          return (
                            <td key={program.id} className="px-5 py-3.5 text-sm">
                              <span className={
                                isBolashak
                                  ? val.startsWith("✓") ? "text-amber-600 font-semibold" : "text-ink-400"
                                  : "text-ink-800"
                              }>
                                {val}
                              </span>
                            </td>
                          );
                        })}
                        {items.length < 3 && <td />}
                      </motion.tr>
                    );
                  })}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

          {/* Footer row — select */}
          <div className="border-t border-ink-100 px-5 py-3 flex items-center gap-2">
            <span className="text-xs text-ink-400">Синие точки обозначают различающиеся параметры</span>
          </div>
        </motion.div>
      )}
    </div>
  );
}
