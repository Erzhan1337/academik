"use client";

import Link from "next/link";
import { motion } from "motion/react";
import {
  Award,
  BarChart2,
  BookOpen,
  CalendarDays,
  Clock,
  Globe2,
  MapPin,
  Star,
} from "lucide-react";
import type { Program } from "@/lib/data";
import { useCompareStore } from "@/lib/compare-store";

export function ProgramCard({ program, index = 0 }: { program: Program; index?: number }) {
  const { items, add, remove } = useCompareStore();
  const isInCompare = items.some((p) => p.id === program.id);

  const toggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isInCompare) {
      remove(program.id);
    } else {
      if (items.length >= 3) {
        alert("Вы можете сравнить максимум 3 программы одновременно.");
        return;
      }
      add(program);
    }
  };

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.35, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className="h-full"
    >
      <Link href={`/programs/${program.id}`} className="block h-full">
        <div className="group flex h-full flex-col rounded-xl border border-ink-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg dark:border-ink-800 dark:bg-ink-900">
          <div className="mb-4 flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <div className="mb-2 flex flex-wrap items-center gap-2">
                {program.bolashak && (
                  <span className="inline-flex items-center gap-1 rounded-md bg-amber-100 px-2 py-1 text-[11px] font-semibold text-amber-900 dark:bg-amber-500/15 dark:text-amber-300">
                    <Award className="h-3 w-3" />
                    Bolashak
                  </span>
                )}
                <span className="inline-flex items-center rounded-md bg-brand-50 px-2 py-1 text-[11px] font-medium text-brand-700 dark:bg-brand-500/10 dark:text-brand-300">
                  {program.field}
                </span>
              </div>

              <h3 className="min-h-[3rem] line-clamp-2 text-lg font-semibold leading-6 text-ink-950 dark:text-white">
                {program.title}
              </h3>
            </div>

            <div className="flex shrink-0 items-center gap-2">
              {program.matchPercentage && (
                <div className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-1 text-[11px] font-bold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-500/20">
                  <span>{program.matchPercentage}% совпадение</span>
                </div>
              )}
              <div className="inline-flex items-center gap-1 rounded-md bg-ink-100 px-2 py-1 text-sm font-semibold text-ink-900 dark:bg-ink-800 dark:text-white">
                <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                <span>{program.rating}</span>
              </div>
            </div>
          </div>

          <div className="mb-4 flex items-center gap-2 text-sm text-ink-600 dark:text-ink-300">
            <BookOpen className="h-4 w-4 shrink-0 text-ink-400 dark:text-ink-500" />
            <span className="truncate">{program.university}</span>
          </div>

          <div className="space-y-2.5 text-sm">
            <div className="flex items-center gap-2 text-ink-600 dark:text-ink-300">
              <MapPin className="h-4 w-4 shrink-0 text-ink-400 dark:text-ink-500" />
              <span className="w-24 shrink-0 text-ink-500 dark:text-ink-400">Город</span>
              <span className="truncate text-ink-900 dark:text-ink-100">{program.city}</span>
            </div>

            <div className="flex items-center gap-2 text-ink-600 dark:text-ink-300">
              <Clock className="h-4 w-4 shrink-0 text-ink-400 dark:text-ink-500" />
              <span className="w-24 shrink-0 text-ink-500 dark:text-ink-400">Длительность</span>
              <span className="truncate text-ink-900 dark:text-ink-100">{program.duration}</span>
            </div>

            <div className="flex items-center gap-2 text-ink-600 dark:text-ink-300">
              <Globe2 className="h-4 w-4 shrink-0 text-ink-400 dark:text-ink-500" />
              <span className="w-24 shrink-0 text-ink-500 dark:text-ink-400">Язык</span>
              <span className="truncate text-ink-900 dark:text-ink-100">{program.language.join(", ")}</span>
            </div>
          </div>

          <div className="mt-auto pt-5">
            <div className="mb-4 flex items-end justify-between gap-3 border-t border-ink-100 pt-4 dark:border-ink-800">
              <div>
                <div className="text-lg font-bold text-ink-950 dark:text-white">{program.costLabel}</div>
                <div className="mt-1 flex items-center gap-1.5 text-xs text-ink-500 dark:text-ink-400">
                  <CalendarDays className="h-3.5 w-3.5" />
                  <span>{program.deadlineLabel}</span>
                </div>
              </div>

              <div className="rounded-md bg-ink-100 px-2.5 py-1.5 text-xs font-medium text-ink-600 transition-colors group-hover:bg-brand-50 group-hover:text-brand-700 dark:bg-ink-800 dark:text-ink-300 dark:group-hover:bg-brand-500/10 dark:group-hover:text-brand-300">
                Подробнее
              </div>
            </div>

            <motion.button
              type="button"
              whileTap={{ scale: 0.97 }}
              onClick={toggle}
              className={`flex w-full items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                isInCompare
                  ? "bg-brand-600 text-white"
                  : "bg-ink-100 text-ink-700 hover:bg-brand-50 hover:text-brand-700 dark:bg-ink-800 dark:text-ink-200 dark:hover:bg-brand-500/10 dark:hover:text-brand-300"
              }`}
            >
              <BarChart2 className="h-4 w-4" />
              {isInCompare ? "В сравнении" : "Сравнить"}
            </motion.button>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
