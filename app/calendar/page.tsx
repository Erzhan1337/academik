"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { Calendar as CalendarIcon, ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { useCompareStore } from "@/lib/compare-store";

const generateGoogleCalendarUrl = (title: string, dateStr: string) => {
  const d = new Date(dateStr);
  const start = d.toISOString().replace(/-|:|\.\d\d\d/g, "");
  // add 1 day for full day event
  const endD = new Date(d);
  endD.setDate(endD.getDate() + 1);
  const end = endD.toISOString().replace(/-|:|\.\d\d\d/g, "");
  
  const text = encodeURIComponent(`Дедлайн подачи: ${title}`);
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${start}/${end}&sf=true&output=xml`;
};

export default function CalendarPage() {
  const { favorites, toggleFavorite } = useCompareStore();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
      <div className="mb-6">
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl sm:text-4xl font-bold text-ink-900 dark:text-white mb-2"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Календарь дедлайнов
        </motion.h1>
        <p className="text-ink-500 dark:text-ink-400">Следите за датами окончания приема документов</p>
      </div>

      {favorites.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-24 bg-white dark:bg-ink-900 rounded-2xl border border-ink-200 dark:border-ink-800"
        >
          <CalendarIcon className="w-12 h-12 text-ink-300 mx-auto mb-4" />
          <h2 className="text-lg font-semibold text-ink-900 dark:text-white mb-2">Календарь пуст</h2>
          <p className="text-sm text-ink-500 dark:text-ink-400 mb-6">Вы пока не добавили ни одной программы.</p>
          <Link href="/programs">
            <div className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white px-5 py-2.5 rounded-xl font-medium transition-colors">
              Перейти к программам <ArrowRight className="w-4 h-4" />
            </div>
          </Link>
        </motion.div>
      ) : (
        <div className="flex flex-col gap-4 relative before:absolute before:inset-y-0 before:left-6 before:w-px before:bg-ink-200 dark:before:bg-ink-800">
          {favorites.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="relative pl-14"
            >
              <div className="absolute left-4 top-5 w-4 h-4 rounded-full bg-brand-600 border-4 border-white dark:border-ink-950" />
              
              <div className="bg-white dark:bg-ink-900 border border-ink-200 dark:border-ink-800 rounded-2xl p-5 card-hover flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
                <div>
                  <div className="text-brand-600 dark:text-brand-400 font-bold mb-1">
                    {p.deadlineLabel}
                  </div>
                  <Link href={`/programs/${p.id}`}>
                    <h3 className="text-lg font-semibold text-ink-900 dark:text-white hover:underline mb-1">
                      {p.title}
                    </h3>
                  </Link>
                  <p className="text-sm text-ink-500 dark:text-ink-400">{p.university} • {p.city}</p>
                </div>
                
                <div className="flex flex-wrap sm:flex-col gap-2 shrink-0">
                  <a
                    href={generateGoogleCalendarUrl(p.title, p.deadline)}
                    target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-white bg-ink-900 dark:bg-white dark:text-ink-900 hover:bg-brand-600 dark:hover:bg-brand-500 font-semibold px-3 py-2 rounded-lg transition-colors"
                  >
                    Google Календарь <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <button
                    onClick={() => toggleFavorite(p)}
                    className="flex items-center gap-1.5 text-xs text-red-600 hover:bg-red-50 dark:hover:bg-red-950 px-3 py-2 rounded-lg transition-colors font-medium border border-transparent hover:border-red-200 dark:hover:border-red-900"
                  >
                    Убрать
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
