"use client";

import { useState, useEffect } from "react";
import { motion, useSpring, useTransform, AnimatePresence } from "motion/react";
import { Calculator, MapPin, Sparkles, PieChart as PieChartIcon, CheckCircle2 } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

// Animated Number Component
function AnimatedNumber({ value }: { value: number }) {
  const spring = useSpring(value, { bounce: 0, duration: 1000 });
  const display = useTransform(spring, (current) => Math.round(current).toLocaleString("ru"));

  useEffect(() => {
    spring.set(value);
  }, [spring, value]);

  return <motion.span>{display}</motion.span>;
}

export default function CalculatorPage() {
  const [tuition, setTuition] = useState(1500); // 1.5M KZT
  const [housing, setHousing] = useState(250); // 250k per month
  const [food, setFood] = useState(120); // 120k per month
  const [transport, setTransport] = useState(20); // 20k per month
  const [isBolashak, setIsBolashak] = useState(false);
  const [activeCity, setActiveCity] = useState<string | null>(null);

  // City preset logic affecting multiple fields
  const applyCityPreset = (city: string) => {
    setActiveCity(city);
    if (city === "Алматы") { setHousing(350); setFood(150); setTransport(30); }
    else if (city === "Астана") { setHousing(300); setFood(130); setTransport(25); }
    else if (city === "Шымкент") { setHousing(150); setFood(90); setTransport(15); }
    else if (city === "Караганда") { setHousing(120); setFood(80); setTransport(15); }
    else if (city === "Зарубеж (US/UK)") { setHousing(800); setFood(400); setTransport(100); }
  };

  // Logic overrides
  const effectiveTuition = isBolashak ? 0 : tuition;
  const effectiveHousing = isBolashak ? 0 : housing;
  const effectiveFood = isBolashak ? 0 : food;
  const effectiveTransport = transport; // personal expenses

  const totalMonthly = effectiveHousing + effectiveFood + effectiveTransport;
  const totalLivingYear = totalMonthly * 10; // 10 months academic year
  const grandTotal = effectiveTuition + totalLivingYear;
  
  // Bolashak Savings
  const savedAmount = (tuition + ((housing + food) * 10)) - (effectiveTuition + ((effectiveHousing + effectiveFood) * 10));

  const chartData = [
    { name: "Обучение", value: effectiveTuition, color: "#3B82F6" }, // blue-500
    { name: "Жилье", value: effectiveHousing * 10, color: "#F59E0B" }, // amber-500
    { name: "Питание", value: effectiveFood * 10, color: "#10B981" }, // emerald-500
    { name: "Личное", value: effectiveTransport * 10, color: "#8B5CF6" }, // violet-500
  ].filter(item => item.value > 0);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0a0a0a] transition-colors duration-500 relative overflow-hidden">
      {/* Background Mesh */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-500/10 dark:bg-brand-500/5 rounded-full blur-3xl mix-blend-multiply dark:mix-blend-lighten" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-violet-500/10 dark:bg-violet-500/5 rounded-full blur-3xl mix-blend-multiply dark:mix-blend-lighten" />
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 relative z-10">
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-400 text-sm px-4 py-1.5 rounded-full mb-6 font-medium border border-brand-100 dark:border-brand-500/20"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Интерактивный
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-bold text-ink-950 dark:text-white mb-4 leading-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Калькулятор бюджета
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-ink-600 dark:text-ink-400"
          >
            Спланируйте свои расходы на магистратуру. Узнайте, сколько вы сэкономите, получив стипендию Болашак.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
          {/* Controls Panel */}
          <motion.div
            initial={{ opacity: 0, x: -20, filter: "blur(10px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Bolashak Premium Toggle */}
            <div 
              onClick={() => setIsBolashak(!isBolashak)}
              className={`relative overflow-hidden cursor-pointer rounded-[2rem] p-6 transition-all duration-500 shadow-[0_4px_24px_rgba(0,0,0,0.10)] dark:shadow-xl border ${
                isBolashak 
                  ? "bg-gradient-to-br from-brand-600 to-violet-700 border-transparent shadow-brand-500/30" 
                  : "bg-white dark:bg-ink-900/40 backdrop-blur-2xl border-ink-200/80 dark:border-ink-800/50 hover:border-brand-500/50"
              }`}
            >
              {isBolashak && (
                <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay pointer-events-none" />
              )}
              <div className="relative z-10 flex items-center justify-between">
                <div>
                  <h3 className={`text-xl font-bold mb-1 flex items-center gap-2 ${isBolashak ? "text-white" : "text-ink-950 dark:text-white"}`}>
                    Стипендия "Болашак" 
                    {isBolashak && <CheckCircle2 className="w-5 h-5 text-emerald-300" />}
                  </h3>
                  <p className={`text-sm ${isBolashak ? "text-brand-100" : "text-ink-500 dark:text-ink-400"}`}>
                    Покрывает обучение, проживание и питание. Вы платите только за личные нужды.
                  </p>
                </div>
                <div className={`w-14 h-8 rounded-full p-1 transition-colors duration-300 ${isBolashak ? "bg-white/30" : "bg-ink-200 dark:bg-ink-800"}`}>
                  <motion.div 
                    layout
                    className={`w-6 h-6 rounded-full shadow-md ${isBolashak ? "bg-white" : "bg-white dark:bg-ink-400"}`}
                    animate={{ x: isBolashak ? 24 : 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                </div>
              </div>
            </div>

            {/* Main Form */}
            <div className="bg-white dark:bg-ink-900/40 backdrop-blur-2xl rounded-[2rem] border border-ink-200/80 dark:border-ink-800/50 shadow-[0_4px_32px_rgba(0,0,0,0.10)] dark:shadow-[0_4px_32px_rgba(0,0,0,0.4)] p-8 flex flex-col gap-8 relative overflow-hidden">
              
              {/* Presets */}
              <div>
                <label className="text-sm font-bold text-ink-500 dark:text-ink-400 uppercase tracking-widest mb-4 block">Умные Пресеты</label>
                <div className="flex flex-wrap gap-2">
                  {["Алматы", "Астана", "Шымкент", "Караганда", "Зарубеж (US/UK)"].map(c => {
                    const isActive = activeCity === c;
                    return (
                      <button
                        key={c} onClick={() => applyCityPreset(c)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-semibold transition-all duration-300 ${
                          isActive 
                            ? "bg-brand-500 border-brand-500 text-white shadow-lg shadow-brand-500/25" 
                            : "bg-white dark:bg-ink-950 border-ink-200 dark:border-ink-800 text-ink-700 dark:text-ink-300 hover:border-brand-500/50"
                        }`}
                      >
                        <MapPin className="w-4 h-4" /> {c}
                      </button>
                    )
                  })}
                </div>
              </div>

              <div className="h-px bg-gradient-to-r from-transparent via-ink-200 dark:via-ink-800 to-transparent" />

              {/* Sliders Container */}
              <div className="flex flex-col gap-8 relative">
                
                {/* Overlay if Bolashak is active */}
                <AnimatePresence>
                  {isBolashak && (
                    <motion.div 
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      className="absolute inset-0 -mx-4 -my-4 px-4 py-4 bg-white/40 dark:bg-ink-950/60 backdrop-blur-[2px] z-10 flex items-center justify-center rounded-2xl pointer-events-none"
                    >
                      <div className="bg-emerald-500 text-white font-bold px-6 py-3 rounded-2xl shadow-xl shadow-emerald-500/20 flex items-center gap-2 text-lg transform rotate-[-2deg]">
                        <CheckCircle2 className="w-6 h-6" /> Расходы покрыты стипендией
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Tuition */}
                <div className={isBolashak ? "opacity-30 blur-[1px] pointer-events-none" : "transition-opacity"}>
                  <div className="flex items-center justify-between mb-4">
                    <label className="font-bold text-ink-950 dark:text-white">Обучение в год</label>
                    <div className="text-xl font-black text-blue-500">
                      <AnimatedNumber value={tuition} /> 000 ₸
                    </div>
                  </div>
                  <input
                    type="range" min={0} max={15000} step={100}
                    value={tuition} onChange={(e) => { setTuition(Number(e.target.value)); setActiveCity(null); }}
                    className="w-full h-3 rounded-full appearance-none cursor-pointer bg-ink-100 dark:bg-ink-950 border border-ink-200 dark:border-ink-800 accent-blue-500"
                    style={{ background: `linear-gradient(to right, #3B82F6 ${(tuition/15000)*100}%, transparent ${(tuition/15000)*100}%)` }}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {/* Housing */}
                  <div className={isBolashak ? "opacity-30 blur-[1px] pointer-events-none" : "transition-opacity"}>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-bold text-ink-950 dark:text-white">Аренда жилья / мес.</span>
                      <span className="text-lg font-black text-amber-500"><AnimatedNumber value={housing} />к ₸</span>
                    </div>
                    <input
                      type="range" min={0} max={1500} step={10}
                      value={housing} onChange={(e) => { setHousing(Number(e.target.value)); setActiveCity(null); }}
                      className="w-full h-3 rounded-full appearance-none cursor-pointer bg-ink-100 dark:bg-ink-950 border border-ink-200 dark:border-ink-800 accent-amber-500"
                      style={{ background: `linear-gradient(to right, #F59E0B ${(housing/1500)*100}%, transparent ${(housing/1500)*100}%)` }}
                    />
                  </div>
                  
                  {/* Food */}
                  <div className={isBolashak ? "opacity-30 blur-[1px] pointer-events-none" : "transition-opacity"}>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-bold text-ink-950 dark:text-white">Питание / мес.</span>
                      <span className="text-lg font-black text-emerald-500"><AnimatedNumber value={food} />к ₸</span>
                    </div>
                    <input
                      type="range" min={30} max={800} step={10}
                      value={food} onChange={(e) => { setFood(Number(e.target.value)); setActiveCity(null); }}
                      className="w-full h-3 rounded-full appearance-none cursor-pointer bg-ink-100 dark:bg-ink-950 border border-ink-200 dark:border-ink-800 accent-emerald-500"
                      style={{ background: `linear-gradient(to right, #10B981 ${(food/800)*100}%, transparent ${(food/800)*100}%)` }}
                    />
                  </div>

                  {/* Transport & Leisure (Always active) */}
                  <div className="sm:col-span-2">
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-bold text-ink-950 dark:text-white flex items-center gap-2">
                        Личные расходы / мес.
                        {isBolashak && <span className="text-[10px] bg-brand-100 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 px-2 py-0.5 rounded-full uppercase tracking-wider">Из своего кармана</span>}
                      </span>
                      <span className="text-lg font-black text-violet-500"><AnimatedNumber value={transport} />к ₸</span>
                    </div>
                    <input
                      type="range" min={0} max={500} step={5}
                      value={transport} onChange={(e) => { setTransport(Number(e.target.value)); setActiveCity(null); }}
                      className="w-full h-3 rounded-full appearance-none cursor-pointer bg-ink-100 dark:bg-ink-950 border border-ink-200 dark:border-ink-800 accent-violet-500 relative z-20"
                      style={{ background: `linear-gradient(to right, #8B5CF6 ${(transport/500)*100}%, transparent ${(transport/500)*100}%)` }}
                    />
                  </div>
                </div>

              </div>
            </div>
          </motion.div>

          {/* Right Panel - Total Dashboard */}
          <motion.div
             initial={{ opacity: 0, x: 20, filter: "blur(10px)" }} 
             animate={{ opacity: 1, x: 0, filter: "blur(0px)" }} 
             transition={{ delay: 0.1, duration: 0.5 }}
             className="relative"
          >
            <div className="sticky top-28 bg-white dark:bg-ink-950 backdrop-blur-2xl text-ink-950 dark:text-white rounded-[2rem] p-8 shadow-[0_4px_32px_rgba(0,0,0,0.12)] dark:shadow-[0_4px_32px_rgba(0,0,0,0.5)] border border-ink-200/80 dark:border-ink-800/50 overflow-hidden">
              <div className="absolute top-[-50px] right-[-50px] w-48 h-48 bg-brand-500/10 dark:bg-brand-500/20 rounded-full blur-3xl pointer-events-none" />
              
              <h3 className="font-bold text-xl mb-8 flex items-center gap-3 text-ink-950 dark:text-white">
                <PieChartIcon className="w-6 h-6 text-brand-500 dark:text-brand-400" /> Финансовый анализ
              </h3>

              {/* Chart */}
              <div className="h-[200px] w-full mb-8">
                {grandTotal > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                        stroke="none"
                      >
                        {chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value: any) => [`${Number(value).toLocaleString("ru")} 000 ₸`, '']}
                        contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '12px' }}
                        itemStyle={{ color: '#fff' }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-ink-500">
                    <Sparkles className="w-8 h-8 mb-2 opacity-20" />
                    <p className="text-sm">Расходов нет</p>
                  </div>
                )}
              </div>

              {/* Breakdown List */}
              <div className="flex flex-col gap-3 mb-8">
                <div className="flex justify-between items-center bg-ink-100/60 dark:bg-white/5 rounded-2xl px-5 py-4 border border-ink-200/50 dark:border-white/5">
                  <span className="text-sm text-ink-600 dark:text-ink-300">Расходы в месяц</span>
                  <span className="font-bold text-lg text-ink-950 dark:text-white"><AnimatedNumber value={totalMonthly} /> 000 ₸</span>
                </div>
              </div>

              <div className="border-t border-ink-200 dark:border-ink-800/50 pt-8 mb-4 relative">
                <span className="text-sm text-ink-500 dark:text-ink-400 block mb-2 font-medium tracking-wide uppercase">К оплате (за год)</span>
                <div className="text-5xl font-black text-ink-950 dark:text-white" style={{ fontFamily: "var(--font-display)" }}>
                  <AnimatedNumber value={grandTotal} /> <span className="text-3xl text-ink-400 dark:text-ink-500">000 ₸</span>
                </div>
              </div>

              {/* Savings Metric */}
              <AnimatePresence>
                {isBolashak && savedAmount > 0 && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0, y: 20 }}
                    animate={{ opacity: 1, height: "auto", y: 0 }}
                    exit={{ opacity: 0, height: 0, y: 20 }}
                    className="mt-6 bg-gradient-to-r from-emerald-500/10 to-emerald-500/5 border border-emerald-500/20 rounded-2xl p-5 flex flex-col gap-1 overflow-hidden relative"
                  >
                    <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500" />
                    <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Экономия с Болашак</span>
                    <span className="text-2xl font-black text-emerald-300">
                      <AnimatedNumber value={savedAmount} /> 000 ₸
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
