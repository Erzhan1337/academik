"use client";

import { memo } from "react";
import { motion } from "motion/react";

interface ChartItem {
  name: string;
  value: number;
  color: string;
}

const BudgetChart = memo(function BudgetChart({ data }: { data: ChartItem[] }) {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  if (total === 0) return null;

  return (
    <div className="flex flex-col justify-center gap-3 h-full">
      {data.map((item, index) => {
        const pct = Math.round((item.value / total) * 100);
        return (
          <div key={item.name}>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <span
                  className="inline-block w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-xs font-semibold text-ink-600 dark:text-ink-300">{item.name}</span>
              </div>
              <span className="text-xs font-black" style={{ color: item.color }}>
                {pct}%
              </span>
            </div>
            {/* Track */}
            <div className="w-full h-2 rounded-full bg-ink-100 dark:bg-ink-800/60 overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: `linear-gradient(to right, ${item.color}99, ${item.color})`,
                  boxShadow: `0 0 8px ${item.color}66`,
                }}
                initial={{ width: "0%" }}
                animate={{ width: `${pct}%` }}
                transition={{ duration: 0.9, delay: index * 0.12, ease: [0.34, 1.56, 0.64, 1] }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
});

export default BudgetChart;
