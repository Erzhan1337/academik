"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { MapPin, Clock, Star, Award, BarChart2, BookOpen } from "lucide-react";
import type { Program } from "@/lib/data";
import { useCompareStore } from "@/lib/compare-store";

export function ProgramCard({ program, index = 0 }: { program: Program; index?: number }) {
  const { items, add, remove } = useCompareStore();
  const isInCompare = items.some((p) => p.id === program.id);

  const toggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isInCompare) remove(program.id);
    else if (items.length < 3) add(program);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link href={`/programs/${program.id}`} className="block">
        <div className="bg-white dark:bg-ink-900 rounded-2xl border border-ink-200 dark:border-ink-800 p-5 card-hover cursor-pointer">
          {/* Header */}
          <div className="flex items-start justify-between mb-3 gap-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1.5">
                {program.bolashak && (
                  <span className="tag-pill-gold flex items-center gap-1">
                    <Award className="w-3 h-3" />
                    Болашак
                  </span>
                )}
                <span className="tag-pill">{program.field}</span>
              </div>
              <h3 className="font-semibold text-ink-900 dark:text-white text-base leading-snug">
                {program.title}
              </h3>
            </div>
            <div className="flex items-center gap-1 shrink-0 bg-ink-50 dark:bg-ink-800/50 px-2 py-1 rounded-lg">
              <Star className="w-3.5 h-3.5 text-gold-500 fill-gold-500" />
              <span className="text-sm font-semibold text-ink-900 dark:text-white">{program.rating}</span>
            </div>
          </div>

          {/* University */}
          <p className="text-sm text-ink-600 dark:text-ink-300 mb-4 flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-ink-400 dark:text-ink-500 shrink-0" />
            {program.university}
          </p>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-ink-500 dark:text-ink-400 mb-4">
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {program.city}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {program.duration}
            </span>
            <span>{program.language.join(", ")}</span>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-ink-100 dark:border-ink-800">
            <div>
              <div className="text-base font-bold text-ink-900 dark:text-white">{program.costLabel}</div>
              <div className="text-xs text-ink-400 dark:text-ink-500">Дедлайн: {program.deadlineLabel}</div>
            </div>
            <motion.div
              role="button"
              tabIndex={0}
              whileTap={{ scale: 0.95 }}
              onClick={toggle}
              className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                isInCompare
                  ? "bg-brand-600 text-white"
                  : "bg-ink-100 dark:bg-ink-800 text-ink-600 dark:text-ink-300 hover:bg-brand-50 dark:hover:bg-brand-500/10 hover:text-brand-600 dark:hover:text-brand-400"
              }`}
            >
              <BarChart2 className="w-3.5 h-3.5" />
              {isInCompare ? "В сравнении" : "Сравнить"}
            </motion.div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
