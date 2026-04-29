"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Calculator, Info, MapPin } from "lucide-react";

export default function CalculatorPage() {
  const [tuition, setTuition] = useState(1500); // 1.5M KZT
  const [housing, setHousing] = useState(250); // 250k per month
  const [food, setFood] = useState(120); // 120k per month
  const [transport, setTransport] = useState(20); // 20k per month

  const getCityHousing = (city: string) => {
    if (city === "Алматы" || city === "Астана") return 350;
    return 150;
  };

  const setCityPreset = (city: string) => {
    setHousing(getCityHousing(city));
  };

  const totalMonthly = housing + food + transport;
  const totalLivingYear = totalMonthly * 10; // Assuming 10 months academic year
  const grandTotal = tuition + totalLivingYear;
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
      <div className="mb-8">
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl sm:text-4xl font-bold text-ink-900 dark:text-white mb-2"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Калькулятор бюджета
        </motion.h1>
        <p className="text-ink-500 dark:text-ink-400">Оцените примерный бюджет на один год магистратуры</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2 space-y-6"
        >
          <div className="bg-white dark:bg-ink-900 rounded-2xl border border-ink-200 dark:border-ink-800 p-6 flex flex-col gap-6">
            
            {/* Tuition */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <label className="font-semibold text-ink-900 dark:text-white">Стоимость обучения в год</label>
                <div className="text-xl font-bold text-brand-600 dark:text-brand-400">
                  {tuition.toLocaleString("ru")} 000 ₸
                </div>
              </div>
              <input
                type="range" min={0} max={5000} step={100}
                value={tuition} onChange={(e) => setTuition(Number(e.target.value))}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-ink-200 dark:bg-ink-800 accent-brand-600"
              />
              <div className="flex justify-between text-xs text-ink-400 dark:text-ink-500 mt-2">
                <span>0 ₸ (грант)</span>
                <span>Передвиньте ползунок, чтобы выбрать сумму до 5 млн ₸.</span>
              </div>
            </div>

            <div className="border-t border-ink-100 dark:border-ink-800 my-2" />

            {/* Quick cities */}
            <div>
              <label className="text-sm font-semibold text-ink-900 dark:text-white mb-3 block">Пресет по городу</label>
              <div className="flex flex-wrap gap-2">
                {["Алматы", "Астана", "Шымкент", "Караганда"].map(c => (
                  <button
                    key={c} onClick={() => setCityPreset(c)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-ink-200 dark:border-ink-700 text-sm hover:bg-ink-50 dark:hover:bg-ink-800/50 text-ink-700 dark:text-ink-300 transition-colors"
                  >
                    <MapPin className="w-3.5 h-3.5" /> {c}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Housing */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-ink-700 dark:text-ink-200">Аренда жилья / мес.</span>
                  <span className="font-bold text-ink-900 dark:text-white">{housing}к ₸</span>
                </div>
                <input
                  type="range" min={0} max={600} step={10}
                  value={housing} onChange={(e) => setHousing(Number(e.target.value))}
                  className="w-full h-1.5 rounded-lg appearance-none cursor-pointer bg-ink-200 dark:bg-ink-800 accent-amber-500"
                />
              </div>
              
              {/* Food */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-ink-700 dark:text-ink-200">Питание / мес.</span>
                  <span className="font-bold text-ink-900 dark:text-white">{food}к ₸</span>
                </div>
                <input
                  type="range" min={30} max={300} step={10}
                  value={food} onChange={(e) => setFood(Number(e.target.value))}
                  className="w-full h-1.5 rounded-lg appearance-none cursor-pointer bg-ink-200 dark:bg-ink-800 accent-emerald-500"
                />
              </div>

              {/* Transport & Leisure */}
              <div className="sm:col-span-2">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-ink-700 dark:text-ink-200">Транспорт и развлечения / мес.</span>
                  <span className="font-bold text-ink-900 dark:text-white">{transport}к ₸</span>
                </div>
                <input
                  type="range" min={0} max={150} step={5}
                  value={transport} onChange={(e) => setTransport(Number(e.target.value))}
                  className="w-full h-1.5 rounded-lg appearance-none cursor-pointer bg-ink-200 dark:bg-ink-800 accent-violet-500"
                />
              </div>
            </div>

          </div>
        </motion.div>

        {/* Total Widget */}
        <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ delay: 0.1 }}
           className="relative"
        >
          <div className="sticky top-28 bg-ink-950 text-white rounded-3xl p-6 shadow-2xl border border-ink-800 overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/20 rounded-full blur-3xl pointer-events-none" />
            
            <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-brand-400" /> Сводка расходов
            </h3>

            <div className="flex flex-col gap-4 mb-6">
              <div className="flex justify-between items-center bg-white/5 rounded-xl px-4 py-3">
                <span className="text-sm text-ink-300">Расходы в месяц</span>
                <span className="font-bold">{totalMonthly.toLocaleString("ru")} 000 ₸</span>
              </div>
              <div className="flex justify-between items-center bg-white/5 rounded-xl px-4 py-3">
                <div className="flex flex-col">
                  <span className="text-sm text-ink-300">Обучение + проживание</span>
                  <span className="text-[10px] text-ink-500">(10 месяцев учебного года)</span>
                </div>
                <span className="font-bold">{grandTotal.toLocaleString("ru")} 000 ₸</span>
              </div>
            </div>

            <div className="border-t border-ink-800 pt-6 mb-2">
              <span className="text-sm text-ink-400 block mb-1">Итого за год</span>
              <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-300 to-brand-500" style={{ fontFamily: "var(--font-display)" }}>
                {grandTotal.toLocaleString("ru")} 000 ₸
              </div>
            </div>

            <div className="mt-8 bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 flex gap-3 text-amber-100">
              <Info className="w-5 h-5 text-amber-500 shrink-0" />
              <p className="text-xs leading-relaxed">
                Стипендия <strong>Болашак</strong> может покрывать обучение ({tuition}к ₸) и расходы на проживание. При полном финансировании ваши личные расходы могут быть близки к 0 ₸.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
